import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {useForm} from 'react-hook-form'
import axios from "axios";
import {useParams} from "react-router-dom";

export default function User(props) {
    const {register, handleSubmit, errors} = useForm();
    let [user, setUser] = useState();
    const id = useParams().id;

    if (!user) {
        const url = `https://api-dot-substitutions-ksl.appspot.com/api/user?id=` + id;
        fetch(url).then(response => response.json())
            .then(response => {

                console.log(response);
                setUser(response);

            });
        return (<div>No User found</div>);
    }

    const onSubmit = data => {
        updateUser(user._id, data);
        console.log(data);
    };

    const onDelete = data => {
        deleteUser(user._id);
        console.log("Delete " + data);
    };

    const classes = props.style;
    const handleName = (event) => {
        setUser({_id: user._id, name: event.target.value, mail: user.mail, grade: user.grade});
    };
    const handleGrade = (event) => {
        setUser({_id: user._id, name: user.name, mail: user.mail, grade: event.target.value});
    };
    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div className={classes.wrapper}><Typography variant="h4" component="h1" style={{align: "center"}}>Dein
                        Profil:</Typography></div>

                    { /* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <TextField
                            className={classes.textfield}
                            id="outlined-basic"
                            label="Name"
                            name="name"
                            value={user.name}
                            onChange={handleName}
                            fullWidth={true}
                            size="small"
                            autoComplete="name"
                            variant="outlined"
                            error={!!errors.name}
                            helperText={errors.name && errors.name.message}
                            inputRef={register({
                                required: {
                                    value: true,
                                    message: "Dieses Feld darf nicht frei bleiben."
                                },
                            })}
                        />
                        <TextField
                            className={classes.textfield}
                            id="outlined-basic"
                            label="Mail"
                            type="email"
                            disabled={true}
                            value={user.mail}
                            name="mail"
                            fullWidth={true}
                            size="small"
                            autoComplete="email"
                            variant="outlined"
                            error={!!errors.mail}
                            inputRef={register({
                                required: {value: true, message: "Dieses Feld darf nicht frei bleiben"},
                                pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: "Dieses Feld darf nicht frei bleiben"
                                },
                            })}
                        />
                        <TextField
                            className={classes.textfield}
                            id="outlined-basic"
                            label="Klasse"
                            value={user.grade}
                            onChange={handleGrade}
                            name="grade"
                            fullWidth={true}
                            size="small"
                            variant="outlined"
                            error={!!errors.grade}
                            helperText={errors.grade && errors.grade.message}
                            inputRef={register({
                                required: {
                                    value: true,
                                    message: "Dieses Feld darf nicht frei bleiben."
                                },
                            })}
                        />

                        <div className={classes.wrapper}><Button type="submit" variant="contained" color="primary">
                            Aktualisieren
                        </Button><Button type="button" variant="contained" color="secondary" onClick={onDelete}>
                            Löschen
                        </Button></div>
                    </form>
                </Grid>
            </Grid>
        </Paper>
    )
}

async function updateUser(id, user) {
    axios.post('https://api-dot-substitutions-ksl.appspot.com/api/update', {id: id, user: user})
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

async function deleteUser(id) {
    axios.delete('https://api-dot-substitutions-ksl.appspot.com/api/delete', {data: {id: id},})
        .then(function (response) {
            console.log(response);
            window.open("../register", "_self");
        })
        .catch(function (error) {
            console.log(error);
        });
}
