import React, { useState } from "react";
import { Editor, EditorState, RichUtils, ContentState } from "draft-js";
import { Typography, makeStyles, Theme, Collapse } from "@material-ui/core";

import "draft-js/dist/Draft.css";
import TextToolbar from "./TextToolbar";

interface EditorProps {
  label: string;
}

export type EditorReducer =
  | ToggleBlockFormat
  | ToggleInlineFormat
  | UndoAction
  | RedoAction;

type ToggleBlockFormat = {
  action: "BlockFormat";
  payload:
    | "header-three"
    | "paragraph"
    | "unordered-list-item"
    | "ordered-list-item";
};

type ToggleInlineFormat = {
  action: "InlineFormat";
  payload: "BOLD" | "ITALIC" | "UNDERLINE";
};

type UndoAction = {
  action: "UNDO";
};
type RedoAction = {
  action: "REDO";
};

const useStyle = makeStyles((theme: Theme) => ({
  paper: {
    padding: theme.spacing(2)
  },
  btnGroup: {
    // verticalAlign: "middle"
  },
  rootDiv: {
    marginBottom: theme.spacing(1)
  },
  btnToolbar: {
    // marginTop: theme.spacing(1),
    marginBottom: theme.spacing(0.5)
  }
}));

const MyEditor = ({ label }: EditorProps) => {
  const classes = useStyle();

  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      ContentState.createFromText(`hej hopp
  hopp igen`)
    )
  );
  const [focus, setFocus] = useState(false);

  const editorReducer = (input: EditorReducer): void => {
    switch (input.action) {
      case "BlockFormat":
        if (input.payload) {
          setEditorState(RichUtils.toggleBlockType(editorState, input.payload));
        }
        break;
      case "InlineFormat":
        if (input.payload) {
          setEditorState(
            RichUtils.toggleInlineStyle(editorState, input.payload)
          );
        }
        break;
      case "UNDO":
        setEditorState(EditorState.undo(editorState));
        break;
      case "REDO":
        setEditorState(EditorState.redo(editorState));
        break;
      default:
        console.log("Unallowed action");
        break;
    }
  };

  const toggleCharFormat = (format: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, format));
  };

  const toggleBlockFormat = (format: string) => {
    setEditorState(RichUtils.toggleBlockType(editorState, format));
  };

  const logUndoStack = () => {
    return editorState.getUndoStack();
  };

  const undo = () => {
    setEditorState(EditorState.undo(editorState));
  };

  // const currentInlineType = editorState.getCurrentInlineStyle().has("BOLD");

  return (
    <div
      className={classes.rootDiv}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    >
      {/* <Paper classes={{ root: classes.paper }}> */}
      <Typography variant="h6">{label}</Typography>
      <hr style={{ borderTop: "0.5px solid lightgrey" }} />
      <Collapse in={focus}>
        <TextToolbar
          currentBlockType={RichUtils.getCurrentBlockType(editorState)}
          currentInlineType={editorState.getCurrentInlineStyle()}
          editorReducer={editorReducer}
        />
      </Collapse>
      <Editor
        editorState={editorState}
        onChange={editorState => {
          setEditorState(editorState);
          // console.log(currentInlineType);
        }}
        placeholder="Skriv något"
        // onFocus={() => setFocus(true)}
        // onBlur={() => setFocus(false)}
      />
      {/* </Paper> */}
    </div>
  );
};

export default MyEditor;
