import React from "react";
import {
  Button,
  useTheme,
  makeStyles,
  createStyles,
  Theme,
  Tooltip
} from "@material-ui/core";
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatListBulleted,
  FormatListNumbered,
  Undo,
  Redo
} from "@material-ui/icons";
import { OrderedSet } from "immutable";
import { EditorReducer } from "./TestEditor";

interface TTProps {
  editorReducer: ({  }: EditorReducer) => void;
  currentInlineType: OrderedSet<string>;
  currentBlockType: string;
}

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2)
    },
    button: {
      // padding: "5px 3px"
      minWidth: "20px"
    },
    btnToolbar: {
      marginBottom: theme.spacing(1),
      background: "#eee",
      padding: "5px 10px",
      borderRadius: theme.shape.borderRadius
    }
  })
);

const TextToolbar = ({
  editorReducer,
  currentBlockType,
  currentInlineType
}: TTProps) => {
  const theme = useTheme();
  const classes = useStyle(theme);

  const activeBlockType = (type: string): string => {
    if (currentBlockType === type) return "lightgrey";
    return "inherit";
  };

  return (
    <div className={classes.btnToolbar}>
      {/* <ButtonGroup color="default" variant="text"> */}
      <Tooltip title="Fetstilt">
        <Button
          className={classes.button}
          variant="text"
          onClick={() =>
            editorReducer({ action: "InlineFormat", payload: "BOLD" })
          }
          style={{
            background: currentInlineType.has("BOLD") ? "lightgrey" : "inherit",
            fontWeight: "bolder"
          }}
        >
          <b>F</b>
        </Button>
      </Tooltip>
      <Tooltip title="Kursiv">
        <Button
          className={classes.button}
          variant="text"
          onClick={() =>
            editorReducer({ action: "InlineFormat", payload: "ITALIC" })
          }
          style={{
            background: currentInlineType.has("ITALIC")
              ? "lightgrey"
              : "inherit"
          }}
        >
          <i>K</i>
        </Button>
      </Tooltip>
      <Tooltip title="Understruken">
        <Button
          className={classes.button}
          variant="text"
          onClick={() =>
            editorReducer({ action: "InlineFormat", payload: "ITALIC" })
          }
          style={{
            background: currentInlineType.has("UNDERLINE")
              ? "lightgrey"
              : "inherit",
            textDecoration: "underline"
          }}
        >
          U
        </Button>
      </Tooltip>
      {/* </ButtonGroup> */}
      {/* <ButtonGroup color="default"> */}
      <Button
        variant="text"
        onClick={() =>
          editorReducer({ action: "BlockFormat", payload: "header-three" })
        }
        style={{ background: activeBlockType("header-three") }}
      >
        Rubrik
      </Button>
      <Button
        variant="text"
        onClick={() =>
          editorReducer({ action: "BlockFormat", payload: "paragraph" })
        }
        style={{ background: activeBlockType("paragraph") }}
      >
        Normal
      </Button>
      <Tooltip title="Onumererad lista">
        <Button
          variant="text"
          className={classes.button}
          onClick={() =>
            editorReducer({
              action: "BlockFormat",
              payload: "unordered-list-item"
            })
          }
          style={{ background: activeBlockType("unordered-list-item") }}
        >
          <FormatListBulleted />
        </Button>
      </Tooltip>
      <Tooltip title="Numererad lista">
        <Button
          variant="text"
          className={classes.button}
          onClick={() =>
            editorReducer({
              action: "BlockFormat",
              payload: "ordered-list-item"
            })
          }
          style={{ background: activeBlockType("ordered-list-item") }}
        >
          <FormatListNumbered />
        </Button>
      </Tooltip>
      {/* </ButtonGroup> */}
      {/* <Button
      variant="outlined"
      onClick={() =>
        console.log(
          JSON.stringify(
            convertToRaw(editorState.getCurrentContent()),
            null,
            2
          )
        )
      }
    >
      Logga JSON
    </Button> */}
      <Tooltip title="Ångra">
        <Button
          variant="text"
          className={classes.button}
          onClick={() => editorReducer({ action: "UNDO" })}
        >
          <Undo />
        </Button>
      </Tooltip>
      <Tooltip title="Gör om">
        <Button
          variant="text"
          className={classes.button}
          onClick={() => editorReducer({ action: "REDO" })}
        >
          <Redo />
        </Button>
      </Tooltip>
    </div>
  );
};

export default TextToolbar;
