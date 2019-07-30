import React from "react";
import TestEditor from "./TestEditor";
import {
  CssBaseline,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Theme,
  Paper,
  useTheme
} from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/styles";
import StringInput from "./StringInput";

// const useStyle = makeStyles((theme: Theme) =>
//   createStyles({
//     mainContainer: {
//       marginTop: "10px"
//     },
//     paper: {
//       padding: theme.spacing(1)
//     }
//   })
// );

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      marginTop: "10px"
    },
    paper: {
      padding: theme.spacing(2)
    }
  })
);

interface AppProps {
  theme: Theme;
}

const App: React.FC = () => {
  const theme = useTheme();
  const classes = useStyle(theme);
  return (
    <div>
      <CssBaseline />
      <AppBar color="primary" position="relative">
        <Toolbar>
          <Typography variant="h5">Text editor</Typography>
        </Toolbar>
      </AppBar>
      <Container className={classes.mainContainer} maxWidth="md">
        <Paper classes={{ root: classes.paper }}>
          <TestEditor label="Centrering" />
          <TestEditor label="Prioriteringsinformation" />
          <StringInput label="Centrering" inputId="ct-center" />
        </Paper>
      </Container>
    </div>
  );
};

export default App;
