import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {useForm} from 'react-hook-form'
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import axios from "axios";

export default function Register(props) {
    const {register, handleSubmit, watch, errors} = useForm();
    const onSubmit = data => {
        registerUser(data);
        console.log(data);
    };

    const classes = props.style;
    return (

        <Paper className={classes.paper} elevation={3}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div className={classes.wrapper}><Typography variant="h4" component="h1"
                                                                 style={{align: "center"}}>Registrierung</Typography>
                    </div>

                    { /* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <TextField
                            className={classes.textfield}
                            id="outlined-basic"
                            label="Name"
                            name="name"
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
                            name="mail"
                            fullWidth={true}
                            size="small"
                            autoComplete="email"
                            variant="outlined"
                            error={!!errors.mail}
                            helperText={errors.mail && errors.mail.message}
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

                        <FormControlLabel
                            control={<Checkbox color="primary"/>}
                            label="Ich bin damit einverstanden sehr selten Werbung über neue Produkte des Entwicklers zu bekommen"
                            labelPlacement="end"
                            name="ads"
                            size="small"
                            variant="outlined"
                            error={!!errors.ads}
                            inputRef={register({
                                required: {
                                    value: true,
                                    message: "Dieses Feld darf nicht frei bleiben."
                                },
                            })}
                        />
                        {errors.ads && <span>Dieses Feld darf nicht frei bleiben</span>}

                        <div className={classes.wrapper}><Button type="submit" variant="contained" color="primary">
                            Registrieren
                        </Button></div>
                    </form>
                </Grid>
            </Grid>
        </Paper>
    )
}

async function registerUser(user) {
    axios.post('https://api-dot-substitutions-ksl.appspot.com/api/register', user)
        .then(function (response) {
            window.open("../user/" + response.data.insertedId, "_self");
        })
        .catch(function (error) {
            console.log(error);
        });
}