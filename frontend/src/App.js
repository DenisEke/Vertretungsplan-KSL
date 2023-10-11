import React from 'react';
import {makeStyles} from "@material-ui/styles";
import Register from "./views/Register";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import User from "./views/User";
import Home from "./views/Home";

function App() {

    const classes = useStyles();

    return (
        <Router>
            <Switch>
                <Route path="/register">
                    <div className={classes.app}>
                        <Register style={classes}/>
                    </div>
                </Route>
                <Route path="/user/:id">
                    <div className={classes.app}>
                        <User style={classes}/>
                    </div>
                </Route>
                <Route path="/">
                    <Home style={classes}/>
                </Route>
            </Switch>
        </Router>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    table: {
        maxWidth: 900,
        maxHeight: 500,
    },
    app: {
        justifyContent: "center",
        alignItems: "center",
    },
    paper: {
        margin: 'auto',
        marginTop: '20vh',
        maxWidth: 500,
        padding: 20,
    },
    subPaper: {
        margin: 'auto',
        marginTop: '10vh',
        maxWidth: 900,
        maxHeight: 500,
    },
    textfield: {
        marginBottom: 10,
        marginTop: 10,
    },
    wrapper: {
        textAlign: "center",
        marginTop: 10,
        marginBottom: 10,
    }
}));

export default App;
