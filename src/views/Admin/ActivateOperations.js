import React from "react";
import NotificationAlert from "react-notification-alert";

import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col,
} from "reactstrap";

import {Button} from "@material-ui/core";

import UserOperationService from "../../services/userOperationService";

export default function ActivateOperations() {
    const notificationAlertRef = React.useRef(null);
    let operationService = new UserOperationService();
    const [operations, setOperations] = React.useState([]);

    React.useEffect(() => {
        operationService = new UserOperationService();
        loadOperations();
    }, []);

    let loadOperations = () => {
        operationService.getOperationWhichIsNoActivated().then(result => {
            setOperations(result.data.data);
            console.log(result.data.data);
        })
    }
    let createAlert = (success, message) => {
        let color = success === true ? "success" : "danger";
        let options = {
            place: "tr",
            message: (
                <div>
                    {message}
                </div>
            ),
            type: color,
            icon: "tim-icons icon-bell-55",
            autoDismiss: 10,
        }
        notificationAlertRef.current.notificationAlert(options);
    }

    let activate = (operation) => {
        operationService.activateOperation(operation.id).then(result => {
            if (result.data.success === true){
                loadOperations();
            }
            createAlert(result.data.success, result.data.message);
        });
    }

    let deactivate = (operation) => {
        operationService.deactivateOperation(operation.id).then(result => {
            if (result.data.success === true){
                loadOperations();
            }
            createAlert(result.data.success, result.data.message);
        });
    }

    return (
        <div className="content">
            <div className="react-notification-alert-container">
                <NotificationAlert ref={notificationAlertRef}/>
            </div>
            <Row>
                <Col md="12">
                    <Card>
                        <CardHeader>
                            <CardTitle tag="h4">
                                Onaylanmamış Tüm İş Veren İşlemleri Listelendi
                            </CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Table className="tablesorter" responsive>
                                <thead className="text-info">
                                <th>İşlem</th>
                                <th>İşlem Yapılmamış Olan Kullanıcı Id</th>
                                <th>İşlem Yapılmış Olan Kullanıcı Id</th>
                                <th>İşlem Tarihi</th>
                                <th>İşlemler</th>
                                </thead>
                                <tbody className="text-white">
                                {operations.map((operation, key) => {
                                    operation.actionDate = new Date(operation.actionDate);
                                    return (
                                        <tr key={key}>
                                            <td>
                                                {operation.operationType.name}
                                            </td>
                                            <td>
                                                {operation.oldUserId}
                                            </td>
                                            <td>
                                                {operation.newUserId}
                                            </td>
                                            <td>
                                                {operation.actionDate.getDate() +
                                                "-" +
                                                (parseInt(operation.actionDate.getMonth()) + 1) +
                                                "-" +
                                                operation.actionDate.getUTCFullYear()}
                                            </td>
                                            <td>
                                                <Button variant="contained" color="primary" onClick={() => activate(operation)}>
                                                    ONAYLA
                                                </Button>
                                                <Button
                                                    className="ml-2" variant="contained" onClick={() => deactivate(operation)}
                                                    color="secondary">ONAYLAMA</Button>
                                                <Button
                                                    variant="contained"
                                                    className="ml-2"
                                                >
                                                    İŞLEM DETAYI
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>

    );
}