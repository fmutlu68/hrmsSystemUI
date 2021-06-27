import React from "react";

import * as Yup from "yup";
import {Formik, Form} from "formik";

import {useSelector} from "react-redux";

import GridContainer from "../../../components/EmployerUser/Grid/GridContainer";
import GridItem from "../../../components/EmployerUser/Grid/GridItem";
import Card from "../../../components/EmployerUser/Card/Card";
import CardHeader from "../../../components/EmployerUser/Card/CardHeader";
import CardBody from "../../../components/EmployerUser/Card/CardBody";
import CardFooter from "../../../components/EmployerUser/Card/CardFooter";
import Button from "components/CustomButtons/Button.js";
import SnackbarContent from "components/EmployerUser/Snackbar/SnackbarContent.js";

import HrmsSystemMaterialCustomInput from "../../../components/CustomInput/HrmsSystemMaterialCustomInput"

import {makeStyles} from "@material-ui/core/styles";

import styles from "assets/materialDashboard/jss/material-dashboard-react/components/cardWhiteTextStyle";
import UserOperationService from "../../../services/userOperationService";

export default function EditProfile() {
    const operationService = new UserOperationService();
    const classes = makeStyles(styles);
    const [lastUpdate, setLastUpdate] = React.useState(undefined);

    const {user} = useSelector(state => state.user);
    const [editableUser, setEditableUser] = React.useState(user);

    React.useEffect(() => {
        console.log(`user.userId: ${user.userId}`);
        operationService.lastUpdateIsActivated(user.userId).then(result => {
            setLastUpdate(result.data);
        });
    }, []);


    const validationSchema = Yup.object({
        companyName: Yup.string().required("Şirket Adı Zorunludur."),
        companyWebSite: Yup.string(),
        companyPhone: Yup.string().required("Şirket Telefonu Zorunludur.")
    });

    const initialValues = {
        companyName: editableUser.companyName,
        companyWebSite: editableUser.companyWebSite,
        companyPhone: editableUser.companyPhone
    }

    let handleSubmit = (values) => {
        const updateOperation = {
            newUser: {...editableUser, ...values},
            oldUser: user,
        }
        console.log(updateOperation);
        operationService.updateUser(updateOperation).then(result => {
            console.log(result);
        });
    }

    let handleChange = (e, formikChangeHandler) => {
        formikChangeHandler(e);
        setEditableUser({...editableUser, [e.target.id] : e.target.value});
        console.log(editableUser);
    }
    return (
        <div>
            <Formik validationSchema={validationSchema} initialValues={initialValues}
                    onSubmit={handleSubmit}>
                {formProps => (
                    <Form>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={8}>
                                <Card>
                                    <CardHeader color="primary">
                                        <h4 className={classes.cardTitleWhite}>Profilinizi Güncelleyebilirsiniz</h4>
                                    </CardHeader>
                                    <CardBody>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <SnackbarContent
                                                    message={lastUpdate !== undefined ? lastUpdate.message : "Bekleyiniz"}
                                                    color={lastUpdate !== undefined ? lastUpdate.success === true ? "success" : "danger" : "info"}
                                                    close/>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <HrmsSystemMaterialCustomInput labelText="Şirket İsmi"
                                                                               name="companyName"
                                                                               id="companyName" formControlProps={{}}
                                                                               inputProps={{
                                                                                   onChange: (e) => handleChange(e, formProps.handleChange),
                                                                                   value: formProps.values.companyName,
                                                                                   error: formProps.touched.companyName && Boolean(formProps.errors.companyName),
                                                                                   helperText: formProps.touched.companyName && formProps.errors.companyName
                                                                               }}/>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <HrmsSystemMaterialCustomInput labelText="Şirket Telefonu"
                                                                               name="companyPhone"
                                                                               id="companyPhone" formControlProps={{}}
                                                                               inputProps={{
                                                                                   onChange: (e) => handleChange(e, formProps.handleChange),
                                                                                   value: formProps.values.companyPhone,
                                                                                   error: formProps.touched.companyPhone && Boolean(formProps.errors.companyPhone),
                                                                                   helperText: formProps.touched.companyPhone && formProps.errors.companyPhone
                                                                               }}/>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <HrmsSystemMaterialCustomInput labelText="Şirket Web Sitesi"
                                                                               name="comapanyWebSite"
                                                                               id="comapanyWebSite"
                                                                               formControlProps={{}}
                                                                               inputProps={{
                                                                                   onChange: (e) => handleChange(e, formProps.handleChange),
                                                                                   value: formProps.values.comapanyWebSite,
                                                                                   error: formProps.touched.comapanyWebSite && Boolean(formProps.errors.comapanyWebSite),
                                                                                   helperText: formProps.touched.comapanyWebSite && formProps.errors.comapanyWebSite
                                                                               }}/>
                                            </GridItem>
                                        </GridContainer>
                                    </CardBody>
                                </Card>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                                <Card>
                                    <CardHeader>
                                        <h3 className="text-dark text-center">Bilgileriniz</h3>
                                    </CardHeader>
                                    <CardBody>
                                        <h4 className="text-dark">İsim: {editableUser.companyName}</h4>
                                        <h4 className="text-dark">Tel: {editableUser.companyPhone}</h4>
                                        <h4 className="text-dark">Site: {editableUser.companyWebSite}</h4>
                                    </CardBody>
                                    <CardFooter>
                                        <Button round color="info" onClick={(e) => handleSubmit(formProps.values)}
                                                fullWidth>DEĞİŞİKLİKLERİ KAYDET</Button>
                                    </CardFooter>
                                </Card>
                            </GridItem>
                        </GridContainer>
                    </Form>
                )}
            </Formik>
        </div>
    );
}