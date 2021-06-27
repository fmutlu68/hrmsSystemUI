import React from "react";

import Table from "components/EmployerUser/Table/Table.js";
import Card from "components/EmployerUser/Card/Card.js";
import CardHeader from "components/EmployerUser/Card/CardHeader.js";
import CardBody from "components/EmployerUser/Card/CardBody.js";

import { Container, makeStyles, Button, Avatar } from "@material-ui/core";
import {Delete,HourglassEmpty, Update} from "@material-ui/icons";


import BackgroundService from "services/backgroundService";
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";

import styles from "assets/materialDashboard/jss/material-dashboard-react/components/cardWhiteTextStyle"

export default function MyBackgrounds() {
    const [backgrounds, setBackgrounds] = React.useState([]);
    const {user} = useSelector(state => state.user);
    const classes = makeStyles(styles);
    React.useEffect(() => {
        let service = new BackgroundService();
        service.getBackgroundByUserId(user.userId === undefined ? 9 : user.userId).then(result => {
            setBackgrounds(result.data.data);
        });
    }, []);
    return (
        <div>
            <Container>
                <Card>
                    <CardHeader color="info">
                        <h4 className={classes.cardTitleWhite}>Özgeçmişlerim</h4>
                        <p className={classes.cardCategoryWhite}>
                            Özgeçmişleriniz Listelendi.
                        </p>
                    </CardHeader>
                    <CardBody>
                        <Table
                            tableHeaderColor="info"
                            tableHead={["Fotoğraf", "İş Tecrübeleri", "Ön Bilgi","İşlemler"]}
                            tableData={backgrounds.map((cv, key) => {
                                return [
                                    cv.userPhoto != null ? <Avatar src={cv.userPhoto} /> : <HourglassEmpty/>,
                                    cv.jobExperiences.length + " Adet",
                                    cv.foreground !== null && cv.foreground.length > 50 ? cv.foreground.substring(0, 50) : cv.foreground === null ? "Girilmemiş" : cv.foreground,
                                    <div>
                                        <Button className="mr-2" variant="contained" color="secondary" className="mr-2">
                                            <Delete/> {" "} Sil</Button>
                                        <NavLink  to={{
                                            pathname: "/employee/background/update",
                                            state: {background: cv}
                                        }} >
                                            <Button variant="contained" color="primary">
                                                <Update/>
                                                Güncelle</Button>
                                        </NavLink>
                                    </div>
                                ]
                            })}
                        />
                    </CardBody>
                </Card>
            </Container>
        </div>
    );
}