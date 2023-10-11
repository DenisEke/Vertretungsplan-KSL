import React, {useState} from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {Paper} from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";


function Home(props) {

    let [subs, setSubs] = useState(JSON.parse(testSubs));
    const date = "2020-01-29";

    if (!subs) {
        const url = `https://api-dot-substitutions-ksl.appspot.com/api/subs?date=` + date;
        fetch(url).then(response => response.json())
            .then(response => {

                console.log(response);
                setSubs(response);

            });
        return (<div>No User found</div>);
    }

    console.log(subs);

    return (
        <Paper className={props.style.subPaper} elevation={3}>
            <TableContainer className={props.style.table}>
                <Table className={props.style.table} size="small" stickyHeader aria-label="sticky table">
                    <caption>Alle Angaben ohne Gewähr.</caption>
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Klasse</TableCell>
                            <TableCell align="right">Position</TableCell>
                            <TableCell align="right">Lehrer</TableCell>
                            <TableCell align="right">Fach</TableCell>
                            <TableCell align="right">Raum</TableCell>
                            <TableCell align="right">Vertretungslehrer</TableCell>
                            <TableCell align="right">Vertretungsraum</TableCell>
                            <TableCell align="right">Info</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {subs.map(row => (
                            <TableRow key={row._id}>
                                <TableCell align="right">{row.grade}</TableCell>
                                <TableCell align="right">{row.class}</TableCell>
                                <TableCell align="right">{row.teacher}</TableCell>
                                <TableCell align="right">{row.subject}</TableCell>
                                <TableCell align="right">{row.room}</TableCell>
                                <TableCell align="right">{row.subTeacher}</TableCell>
                                <TableCell align="right">{row.subRoom}</TableCell>
                                <TableCell align="right">{row.info}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

export default Home;

const testSubs = "[{\"_id\":\"5e2de369cf08b300070e0533\",\"grade\":\"5\",\"class\":\" 1\",\"teacher\":\"Lach\",\"subject\":\"Ma\",\"room\":\"OG-305\",\"subTeacher\":\"*Frei\",\"subRoom\":\"\",\"info\":\"\"},{\"_id\":\"5e2de369cf08b300070e0534\",\"grade\":\"6\",\"class\":\" 1\",\"teacher\":\"Ti\",\"subject\":\"Ma\",\"room\":\"EG-205\",\"subTeacher\":\"\",\"subRoom\":\"\",\"info\":\"verschoben auf\\nMo  3 [27.01.]\"},{\"_id\":\"5e2de369cf08b300070e0535\",\"grade\":\"6\",\"class\":\" 3\",\"teacher\":\"Nie\",\"subject\":\"De\",\"room\":\"EG-205\",\"subTeacher\":\"Frau Tisch\",\"subRoom\":\"EG-205\",\"info\":\"anstatt Mo  1 \\n[27.01.]\"},{\"_id\":\"5e2de369cf08b300070e0536\",\"grade\":\"6\",\"class\":\" 4\",\"teacher\":\"Nie\",\"subject\":\"De\",\"room\":\"EG-205\",\"subTeacher\":\"Frau Jablonski-Schmechel\",\"subRoom\":\"\",\"info\":\"\"},{\"_id\":\"5e2de369cf08b300070e0537\",\"grade\":\"7a\",\"class\":\" 7\",\"teacher\":\"Tre\",\"subject\":\"La\",\"room\":\"EGN-204\",\"subTeacher\":\"\",\"subRoom\":\"\",\"info\":\"verschoben auf\\nDo  3 [30.01.]\"},{\"_id\":\"5e2de369cf08b300070e0538\",\"grade\":\"7b\",\"class\":\" 7\",\"teacher\":\"Hu\",\"subject\":\"Ph\",\"room\":\"PH2\",\"subTeacher\":\"\",\"subRoom\":\"\",\"info\":\"verschoben auf\\nDo  5 [30.01.]\"},{\"_id\":\"5e2de369cf08b300070e0539\",\"grade\":\"7d\",\"class\":\" 2\",\"teacher\":\"Wed\",\"subject\":\"ITG\",\"room\":\"ITG\",\"subTeacher\":\"Herr P.Breuer\",\"subRoom\":\"\",\"info\":\"\"},{\"_id\":\"5e2de369cf08b300070e053a\",\"grade\":\"8b\",\"class\":\" 3\",\"teacher\":\"Helf\",\"subject\":\"WpfSpa\",\"room\":\"UG-102\",\"subTeacher\":\"Herr Bienert\",\"subRoom\":\"\",\"info\":\"\"},{\"_id\":\"5e2de369cf08b300070e053b\",\"grade\":\"8a\",\"class\":\" 3\",\"teacher\":\"Helf\",\"subject\":\"WpfSpa\",\"room\":\"UG-102\",\"subTeacher\":\"Herr Bienert\",\"subRoom\":\"\",\"info\":\"\"},{\"_id\":\"5e2de369cf08b300070e053c\",\"grade\":\"8c\",\"class\":\" 3\",\"teacher\":\"Helf\",\"subject\":\"WpfSpa\",\"room\":\"UG-102\",\"subTeacher\":\"Herr Bienert\",\"subRoom\":\"\",\"info\":\"\"},{\"_id\":\"5e2de369cf08b300070e053d\",\"grade\":\"8d\",\"class\":\" 3\",\"teacher\":\"Helf\",\"subject\":\"WpfSpa\",\"room\":\"UG-102\",\"subTeacher\":\"Herr Bienert\",\"subRoom\":\"\",\"info\":\"\"},{\"_id\":\"5e2de369cf08b300070e053e\",\"grade\":\"8b\",\"class\":\" 4\",\"teacher\":\"Helf\",\"subject\":\"WpfSpa\",\"room\":\"UG-102\",\"subTeacher\":\"Frau Hielscher\",\"subRoom\":\"\",\"info\":\"\"},{\"_id\":\"5e2de369cf08b300070e053f\",\"grade\":\"8a\",\"class\":\" 4\",\"teacher\":\"Helf\",\"subject\":\"WpfSpa\",\"room\":\"UG-102\",\"subTeacher\":\"Frau Hielscher\",\"subRoom\":\"\",\"info\":\"\"},{\"_id\":\"5e2de369cf08b300070e0540\",\"grade\":\"8c\",\"class\":\" 4\",\"teacher\":\"Helf\",\"subject\":\"WpfSpa\",\"room\":\"UG-102\",\"subTeacher\":\"Frau Hielscher\",\"subRoom\":\"\",\"info\":\"\"},{\"_id\":\"5e2de369cf08b300070e0541\",\"grade\":\"8d\",\"class\":\" 4\",\"teacher\":\"Helf\",\"subject\":\"WpfSpa\",\"room\":\"UG-102\",\"subTeacher\":\"Frau Hielscher\",\"subRoom\":\"\",\"info\":\"\"},{\"_id\":\"5e2de369cf08b300070e0542\",\"grade\":\"8b\",\"class\":\" 3\",\"teacher\":\"Tre\",\"subject\":\"WpfSW\",\"room\":\"UG-105\",\"subTeacher\":\"Raumänderung\",\"subRoom\":\"EG-202\",\"info\":\"\"},{\"_id\":\"5e2de369cf08b300070e0543\",\"grade\":\"8c\",\"class\":\" 3\",\"teacher\":\"Tre\",\"subject\":\"WpfSW\",\"room\":\"UG-105\",\"subTeacher\":\"Raumänderung\",\"subRoom\":\"EG-202\",\"info\":\"\"},{\"_id\":\"5e2de369cf08b300070e0544\",\"grade\":\"8d\",\"class\":\" 3\",\"teacher\":\"Tre\",\"subject\":\"WpfSW\",\"room\":\"UG-105\",\"subTeacher\":\"Raumänderung\",\"subRoom\":\"EG-202\",\"info\":\"\"},{\"_id\":\"5e2de369cf08b300070e0545\",\"grade\":\"8b\",\"class\":\" 4\",\"teacher\":\"Tre\",\"subject\":\"WpfSW\",\"room\":\"UG-105\",\"subTeacher\":\"Raumänderung\",\"subRoom\":\"KR1\",\"info\":\"\"},{\"_id\":\"5e2de369cf08b300070e0546\",\"grade\":\"8c\",\"class\":\" 4\",\"teacher\":\"Tre\",\"subject\":\"WpfSW\",\"room\":\"UG-105\",\"subTeacher\":\"Raumänderung\",\"subRoom\":\"KR1\",\"info\":\"\"},{\"_id\":\"5e2de369cf08b300070e0547\",\"grade\":\"8d\",\"class\":\" 4\",\"teacher\":\"Tre\",\"subject\":\"WpfSW\",\"room\":\"UG-105\",\"subTeacher\":\"Raumänderung\",\"subRoom\":\"KR1\",\"info\":\"\"},{\"_id\":\"5e2de369cf08b300070e0548\",\"grade\":\"8d\",\"class\":\" 6\",\"teacher\":\"Nel\",\"subject\":\"Mu\",\"room\":\"KR8\",\"subTeacher\":\"*Frei\",\"subRoom\":\"\",\"info\":\"\"},{\"_id\":\"5e2de369cf08b300070e0549\",\"grade\":\"8c\",\"class\":\" 6\",\"teacher\":\"Nel\",\"subject\":\"Mu\",\"room\":\"KR8\",\"subTeacher\":\"*Frei\",\"subRoom\":\"\",\"info\":\"\"},{\"_id\":\"5e2de369cf08b300070e054a\",\"grade\":\"8d\",\"class\":\" 7\",\"teacher\":\"Nel\",\"subject\":\"Mu\",\"room\":\"KR8\",\"subTeacher\":\"*Frei\",\"subRoom\":\"\",\"info\":\"\"},{\"_id\":\"5e2de369cf08b300070e054b\",\"grade\":\"8c\",\"class\":\" 7\",\"teacher\":\"Nel\",\"subject\":\"Mu\",\"room\":\"KR8\",\"subTeacher\":\"*Frei\",\"subRoom\":\"\",\"info\":\"\"},{\"_id\":\"5e2de369cf08b300070e054c\",\"grade\":\"9b\",\"class\":\" 7\",\"teacher\":\"Tja\",\"subject\":\"En\",\"room\":\"EGN-206\",\"subTeacher\":\"\",\"subRoom\":\"\",\"info\":\"verschoben auf\\nDo  4 [23.01.]\"},{\"_id\":\"5e2de369cf08b300070e054d\",\"grade\":\"9c\",\"class\":\" 3\",\"teacher\":\"Nel\",\"subject\":\"Sp\",\"room\":\"SPH\",\"subTeacher\":\"Frau Roer\",\"subRoom\":\"UG-105\",\"info\":\"anstatt Mo  7 \\n[27.01.]\"},{\"_id\":\"5e2de369cf08b300070e054e\",\"grade\":\"9c\",\"class\":\" 4\",\"teacher\":\"Nel\",\"subject\":\"Sp\",\"room\":\"SPH\",\"subTeacher\":\"Frau Dr. Kielpinski\",\"subRoom\":\"UG-105\",\"info\":\"anstatt Di  7 \\n[28.01.]\"},{\"_id\":\"5e2de369cf08b300070e054f\",\"grade\":\"9c\",\"class\":\" 7\",\"teacher\":\"Roer\",\"subject\":\"De\",\"room\":\"UG-105\",\"subTeacher\":\"\",\"subRoom\":\"\",\"info\":\"verschoben auf\\nMo  3 [27.01.]\"},{\"_id\":\"5e2de369cf08b300070e0550\",\"grade\":\"10a\",\"class\":\" 2\",\"teacher\":\"Lach\",\"subject\":\"Ma\",\"room\":\"EGN-203\",\"subTeacher\":\"Frau Schulz\",\"subRoom\":\"\",\"info\":\"\"},{\"_id\":\"5e2de369cf08b300070e0551\",\"grade\":\"10a\",\"class\":\" 6\",\"teacher\":\"Nie\",\"subject\":\"Kl\",\"room\":\"EGN-203\",\"subTeacher\":\"Frau Kießig\",\"subRoom\":\"\",\"info\":\"\"},{\"_id\":\"5e2de369cf08b300070e0552\",\"grade\":\"10a\",\"class\":\" 7\",\"teacher\":\"Helf\",\"subject\":\"WpfSpa\",\"room\":\"EG-206\",\"subTeacher\":\"*Frei\",\"subRoom\":\"\",\"info\":\"\"},{\"_id\":\"5e2de369cf08b300070e0553\",\"grade\":\"10b\",\"class\":\" 7\",\"teacher\":\"Helf\",\"subject\":\"WpfSpa\",\"room\":\"EG-206\",\"subTeacher\":\"*Frei\",\"subRoom\":\"\",\"info\":\"\"},{\"_id\":\"5e2de369cf08b300070e0554\",\"grade\":\"10d\",\"class\":\" 4\",\"teacher\":\"Witt\",\"subject\":\"Mu\",\"room\":\"KR6\",\"subTeacher\":\"Raumänderung\",\"subRoom\":\"KR9\",\"info\":\"\"},{\"_id\":\"5e2de369cf08b300070e0555\",\"grade\":\"11\",\"class\":\" 1\",\"teacher\":\"Rei\",\"subject\":\"ch\",\"room\":\"CH2\",\"subTeacher\":\"*Stillarbeit\",\"subRoom\":\"\",\"info\":\"\"},{\"_id\":\"5e2de369cf08b300070e0556\",\"grade\":\"11\",\"class\":\" 2\",\"teacher\":\"Rei\",\"subject\":\"ch\",\"room\":\"CH2\",\"subTeacher\":\"*Stillarbeit\",\"subRoom\":\"\",\"info\":\"\"},{\"_id\":\"5e2de369cf08b300070e0557\",\"grade\":\"11\",\"class\":\" 3\",\"teacher\":\"Lach\",\"subject\":\"MA\",\"room\":\"KR2\",\"subTeacher\":\"*Stillarbeit\",\"subRoom\":\"\",\"info\":\"\"},{\"_id\":\"5e2de369cf08b300070e0558\",\"grade\":\"11\",\"class\":\" 3\",\"teacher\":\"Gö\",\"subject\":\"MU\",\"room\":\"KR6\",\"subTeacher\":\"*Frei\",\"subRoom\":\"\",\"info\":\"\"},{\"_id\":\"5e2de369cf08b300070e0559\",\"grade\":\"11\",\"class\":\" 6\",\"teacher\":\"Wed\",\"subject\":\"IN\",\"room\":\"ITG\",\"subTeacher\":\"*Stillarbeit\",\"subRoom\":\"\",\"info\":\"\"},{\"_id\":\"5e2de369cf08b300070e055a\",\"grade\":\"11\",\"class\":\" 6\",\"teacher\":\"Mal\",\"subject\":\"CH\",\"room\":\"CH1\",\"subTeacher\":\"*Stillarbeit\",\"subRoom\":\"\",\"info\":\"\"},{\"_id\":\"5e2de369cf08b300070e055b\",\"grade\":\"11\",\"class\":\" 7\",\"teacher\":\"Wed\",\"subject\":\"in\",\"room\":\"ITG\",\"subTeacher\":\"*Stillarbeit\",\"subRoom\":\"\",\"info\":\"\"},{\"_id\":\"5e2de369cf08b300070e055c\",\"grade\":\"11\",\"class\":\" 7\",\"teacher\":\"Mal\",\"subject\":\"bio\",\"room\":\"BIO1\",\"subTeacher\":\"*Stillarbeit\",\"subRoom\":\"\",\"info\":\"\"},{\"_id\":\"5e2de369cf08b300070e055d\",\"grade\":\"12\",\"class\":\" 3\",\"teacher\":\"Rei\",\"subject\":\"sp-th\",\"room\":\"EG-203\",\"subTeacher\":\"*Stillarbeit\",\"subRoom\":\"\",\"info\":\"\"},{\"_id\":\"5e2de369cf08b300070e055e\",\"grade\":\"12\",\"class\":\" 4\",\"teacher\":\"Wed\",\"subject\":\"in\",\"room\":\"ITG\",\"subTeacher\":\"*Stillarbeit\",\"subRoom\":\"\",\"info\":\"\"},{\"_id\":\"5e2de369cf08b300070e055f\",\"grade\":\"12\",\"class\":\" 4\",\"teacher\":\"Rei\",\"subject\":\"ch\",\"room\":\"CH1\",\"subTeacher\":\"*Stillarbeit\",\"subRoom\":\"\",\"info\":\"\"},{\"_id\":\"5e2de369cf08b300070e0560\",\"grade\":\"12\",\"class\":\" 6\",\"teacher\":\"Lach\",\"subject\":\"ma\",\"room\":\"EG-205\",\"subTeacher\":\"*Stillarbeit\",\"subRoom\":\"\",\"info\":\"\"},{\"_id\":\"5e2de369cf08b300070e0561\",\"grade\":\"12\",\"class\":\" 6\",\"teacher\":\"Brink\",\"subject\":\"rel\",\"room\":\"KR10\",\"subTeacher\":\"*Stillarbeit\",\"subRoom\":\"\",\"info\":\"\"},{\"_id\":\"5e2de369cf08b300070e0562\",\"grade\":\"12\",\"class\":\" 7\",\"teacher\":\"Lach\",\"subject\":\"MA\",\"room\":\"EG-205\",\"subTeacher\":\"*Stillarbeit\",\"subRoom\":\"\",\"info\":\"\"},{\"_id\":\"5e2de369cf08b300070e0563\",\"grade\":\"12\",\"class\":\" 7\",\"teacher\":\"Brink\",\"subject\":\"REL\",\"room\":\"KR10\",\"subTeacher\":\"*Stillarbeit\",\"subRoom\":\"\",\"info\":\"\"}]";
