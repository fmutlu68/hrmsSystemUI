import React from "react";
import { useHistory } from "react-router";

import * as Yup from "yup";
import {Formik, Form as FForm} from "formik";

import {useDispatch, useSelector} from "react-redux";

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    FormGroup,
    Form,
    Input,
    Row,
    Col, Badge, CardText,
} from "reactstrap";

import CustomButton from "../../components/CustomButtons/Button";

import {Chip} from "@material-ui/core";
import SystemUserService from "../../services/systemUserService";
import NotificationAlert from "react-notification-alert";
import {updateUser} from "../../store/actions/userActions";

export default function EditAdminProfile() {
    const notificationAlertRef = React.useRef(null);

    const {user} = useSelector(state => state.user);
    const dispatch = useDispatch();

    const history = useHistory();

    const validationSchema = Yup.object({
        firstName: Yup.string().required("İsim Zorunludur."),
        lastName: Yup.string().required("Soyisim Zorunludur."),
        birthDate: Yup.string().required("Doğum Tarihi Zorunludur."),
        identityNo: Yup.string().required("Kimlik No Zorunludur.")
            .min(11, "T.C. No 11 Karakterden Oluşmalıdır.")
            .max(11, "T.C. No 11 Karakterden Oluşmalıdır."),
    });

    const initialStates = () => {
        let convertedToDate = new Date(user.birthDate);
        return {
            firstName: user.firstName,
            lastName: user.lastName,
            birthDate: `${convertedToDate.getUTCFullYear()}-${convertedToDate.getMonth() + 1 < 10 ? `0${convertedToDate.getMonth() + 1}` : convertedToDate.getMonth() + 1}-${convertedToDate.getDate() < 10 ? `0${convertedToDate.getDate()}` : convertedToDate.getDate()}`,
            identityNo: user.identityNo
        };
    };

    const handleSubmit = (values) => {
        values.email = user.email;
        values.jobPositionId = user.jobPositionId;
        values.userId = user.userId;
        createAlert("info", "Bekleyiniz")
        console.log(values);
        let service = new SystemUserService();
        service.updateUser(values).then(result => {
            if (result.data.success === true){
                dispatch(updateUser(result.data.data));
                createAlert(result.data.success, result.data.message);
            }else {
                createAlert(false, result.data.message)
            }
        })
    }


    let createAlert = (type, message) => {
        let color = type === true ? "success" : "danger";
        color = type === "info" ? "info" : color;
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

    return (
        <div className="content">
            <div className="react-notification-alert-container">
                <NotificationAlert ref={notificationAlertRef} />
            </div>
            <Formik validationSchema={validationSchema} initialValues={initialStates()}
                    onSubmit={(values) => handleSubmit(values)}>
                {formProps => (
                    <FForm>
                        <Row>
                            <Col md="8">
                                <Card>
                                    <CardHeader>
                                        <h5 className="title">Bilgileri Güncelle</h5>
                                    </CardHeader>
                                    <CardBody>
                                        <Form>
                                            <Row>
                                                <Col md="12">
                                                    <FormGroup>
                                                        <label>T.C. No</label>
                                                        <Input
                                                            defaultValue={formProps.initialValues.identityNo}
                                                            onChange={formProps.handleChange}
                                                            name="identityNo"

                                                            placeholder="Kimlik Numarası"
                                                            type="text"
                                                        />
                                                        {formProps.touched.identityNo && Boolean(formProps.errors.identityNo) ? <Badge  color="danger">{formProps.errors.identityNo}</Badge> : null}
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <label>İsim</label>
                                                        <Input
                                                            defaultValue={formProps.initialValues.firstName}
                                                            onChange={formProps.handleChange}
                                                            name="firstName"
                                                            placeholder="İsim"
                                                            type="text"
                                                        />
                                                        {formProps.touched.firstName && Boolean(formProps.errors.firstName) ? <Badge  color="danger">{formProps.errors.firstName}</Badge> : null}
                                                    </FormGroup>
                                                </Col>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <label>
                                                            Soyisim
                                                        </label>
                                                        <Input
                                                            defaultValue={formProps.initialValues.lastName}
                                                            onChange={formProps.handleChange}
                                                            name="lastName"
                                                            placeholder="Soyisim"
                                                            type="text"
                                                        />
                                                        {formProps.touched.lastName && Boolean(formProps.errors.lastName) ? <Badge  color="danger">{formProps.errors.lastName}</Badge> : null}
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md="12">
                                                    <FormGroup>
                                                        <label>Doğum Tarihi</label>
                                                        <Input
                                                            defaultValue={formProps.initialValues.birthDate}
                                                            onChange={formProps.handleChange}
                                                            name="birthDate"
                                                            color="light"
                                                            placeholder="Doğum Tarihi"
                                                            type="date"
                                                        />
                                                        {formProps.touched.birthDate && Boolean(formProps.errors.birthDate) ? <Badge  color="danger">{formProps.errors.birthDate}</Badge> : null}
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col md="4">
                                <Card className="card-user">
                                    <CardHeader>
                                        <CardText defaultValue="Bilgiler" className="text-center" />
                                        <div className="author">
                                            <div className="block block-one"/>
                                            <div className="block block-two"/>
                                            <div className="block block-three"/>
                                            <div className="block block-four"/>
                                        </div>
                                    </CardHeader>
                                    <CardBody>
                                        <Row>
                                            <Col md={6} className="text-left">
                                                <Chip color="secondary" label="İsim-Soyisim" />
                                                <Chip color="secondary" label="Kimlik No" className="mt-2"/>
                                                <Chip color="secondary" label="Doğum Tarihi" className="mt-2"/>
                                            </Col>
                                            <Col md={6} className="text-right">
                                                <Chip color="primary" label={formProps.values.firstName + " " + formProps.values.lastName}/>
                                                <Chip color="primary" label={formProps.values.identityNo} className="mt-2"/>
                                                <Chip color="primary" label={formProps.values.birthDate} className="mt-2"/>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                    <CardFooter className="text-center">
                                        <CustomButton color="info" size="lg" type="submit">Kaydet</CustomButton>
                                    </CardFooter>
                                </Card>
                            </Col>
                        </Row>
                    </FForm>
                )}
            </Formik>
        </div>
    );
}