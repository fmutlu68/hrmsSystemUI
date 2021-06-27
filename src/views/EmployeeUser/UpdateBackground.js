import React, {useState} from "react";

import * as Yup from "yup";
import {Formik, Form} from "formik";

import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";

import {makeStyles} from "@material-ui/core/styles"

import GridItem from "components/EmployerUser/Grid/GridItem.js";
import GridContainer from "components/EmployerUser/Grid/GridContainer.js";
import HrmsSystemMaterialCustomInput from "components/CustomInput/HrmsSystemMaterialCustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/EmployerUser/Card/Card.js";
import CardHeader from "components/EmployerUser/Card/CardHeader.js";
import CardAvatar from "components/EmployerUser/Card/CardAvatar.js";
import CardBody from "components/EmployerUser/Card/CardBody.js";
import HrmsSystemCustomMultiInput from "../../components/CustomInput/HrmsSystemCustomMultiInput";

import styles from "assets/materialDashboard/jss/material-dashboard-react/components/cardWhiteTextStyle";
import BackgroundService from "../../services/backgroundService";
import SnackBar from "../../components/EmployerUser/Snackbar/Snackbar";

export default function UpdateBackground() {
    const {state} = useLocation();

    const backgroundService = new BackgroundService();

    const [cv, setCv] = React.useState(state.background);
    const [photo, setPhoto] = React.useState(undefined);

    const {user} = useSelector(state => state.user);

    const classes = makeStyles(styles);

    const [snackbar, setSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackBarStatus, setSnackBarStatus] = useState("");

    const validationSchema = Yup.object({
        linkedin: Yup.string(),
        github: Yup.string(),
        foreground: Yup.string()
    });

    const initialValues = {
        linkedin: cv.linkedin === null ? "" : cv.linkedin,
        github: cv.github === null ? "" : cv.github,
        foreground: cv.foreground === null ? "" : cv.foreground
    };

    let handleInputPhoto = (value) => {
        setPhoto(value.target.files[0]);
        loadImage(value.target.files[0]);
    }

    const showNotification = (time = 10000) => {
        if (!snackbar) {
            setSnackbar(true);
            setTimeout(() => {
                setSnackbar(false);
            }, time);
        }
    };

    let mapCvIdToExperiences = (experiences) => {
        experiences = experiences.map((value, key) => {
            value.backgroundId = cv.id;
            value.id = undefined;
            return value;
        })
    }

    let loadImage = (image=photo) => {
        setSnackBarStatus("info")
        setSnackbar(false);
        setSnackbarMessage("Resim Güncelleniyor.");
        showNotification();
        backgroundService.addImageToCv(image, cv.id).then(imgResult => {
            console.log(imgResult);
            if (imgResult.data.success === true){
                setSnackBarStatus("success")
                setSnackbar(false);
                setSnackbarMessage(imgResult.data.message);
                showNotification();
            }else {
                setSnackBarStatus("danger")
                setSnackbar(false);
                setSnackbarMessage(imgResult.data.message);
                showNotification();
            }
        }).catch(error=> {
            console.log(error);
        });
    }

    let handleUpdateSubmit = (values) => {
        setSnackbarMessage("İşleminiz Gerçekleştiriliyor.")
        setSnackBarStatus("info")
        showNotification(3000);

        mapCvIdToExperiences(cv.jobExperiences);
        mapCvIdToExperiences(cv.languageExperiences);
        mapCvIdToExperiences(cv.schools);

        let newBackground = {
            id: cv.id,
            foreground: values.foreground,
            github: values.github,
            userPhoto: cv.userPhoto,
            linkedin: values.linkedin,
            jobExperiences: cv.jobExperiences,
            languageExperiences: cv.languageExperiences,
            schools: cv.schools,
            user: {
                userId: user.userId
            },
        }
        console.log(newBackground);
        backgroundService.updateBackground(newBackground).then((result) => {
            console.log(result);
            if (result.data.success === true){
                setSnackbar(false);
                setSnackBarStatus("success")
                setSnackbarMessage(result.data.message + " Özgeçmiş Resmi Güncelleniyor...");
                showNotification();
                console.log(photo);
                if (photo !== undefined){

                }
            }else {
                setSnackBarStatus("danger")
                setSnackbar(false);
                setSnackbarMessage(result.data.message);
                showNotification();
            }
        })
    }
    return (
        <div>
            <Formik validationSchema={validationSchema} initialValues={initialValues}
                    onSubmit={handleUpdateSubmit}>
                {formProps => (
                    <Form className="form">
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={8}>
                                <Card>
                                    <CardHeader color="primary">
                                        <h4 className={classes.cardTitleWhite}>Özgeçmişinizi Güncelleyin</h4>
                                        <p className={classes.cardCategoryWhite}>Özgeçmişinizi Güncelleyebilirsiniz</p>
                                    </CardHeader>
                                    <CardBody>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <HrmsSystemMaterialCustomInput
                                                    labelText="Github Hesabınız"
                                                    id="github"
                                                    name="github"
                                                    formControlProps={{}}
                                                    inputProps={{
                                                        onChange: formProps.handleChange,
                                                        value: formProps.values.github,
                                                        error: formProps.touched.github && Boolean(formProps.errors.github),
                                                        helperText: formProps.touched.github && formProps.errors.github
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <HrmsSystemMaterialCustomInput
                                                    labelText="Linkedin Hesabınız"
                                                    id="linkedin"
                                                    name="linkedin"
                                                    formControlProps={{}}
                                                    inputProps={{
                                                        onChange: formProps.handleChange,
                                                        value: formProps.values.linkedin,
                                                        error: formProps.touched.linkedin && Boolean(formProps.errors.linkedin),
                                                        helperText: formProps.touched.linkedin && formProps.errors.linkedin
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <HrmsSystemMaterialCustomInput
                                                    labelText="Özgeçmişinize Ekleyebilceğiniz Ön Bilgi"
                                                    name="foreground"
                                                    id="foreground"
                                                    formControlProps={{}}
                                                    inputProps={{
                                                        multiline: true,
                                                        rows: 5,
                                                        onChange: formProps.handleChange,
                                                        value: formProps.values.foreground,
                                                        error: formProps.touched.foreground && Boolean(formProps.errors.foreground),
                                                        helperText: formProps.touched.foreground && formProps.errors.foreground
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                        <HrmsSystemCustomMultiInput
                                            title="İş Tecrübeleri"
                                            styles={classes}
                                            handleSubmit={(values) => {
                                                cv.jobExperiences = [...cv.jobExperiences, values]
                                            }}
                                            validationSchema={{
                                                workplaceName: Yup.string().required("İş Yeri Zorunlu"),
                                                jobPosition: Yup.string().required("İş Pozisyonu Zorunlu"),
                                                beginningYear: Yup.string().required("İşe Başlama Yılı Zorunlu"),
                                                endingYear: Yup.string()
                                            }}
                                            initialValues={{
                                                workplaceName: "",
                                                jobPosition: "",
                                                beginningYear: "",
                                                endingYear: ""
                                            }}
                                            selectedItems={cv.jobExperiences}
                                            inputComponents={[
                                                {name: "workplaceName", placeHolder: "İş Yeriniz"},
                                                {name: "jobPosition", placeHolder: "İş Pozisyonunuz"},
                                                {name: "beginningYear", placeHolder: "İşe Başlama Yılınız"},
                                                {name: "endingYear", placeHolder: "İşden Çıkış Yılınız"},
                                            ]}
                                            accordions={(experiences) => {
                                                if (experiences !== undefined && experiences !== null){
                                                    cv.jobExperiences = experiences;
                                                }
                                                return experiences.map((experience, key) => {
                                                    return {
                                                        name: `İş Tecrübesi: ${experience.jobPosition}`,
                                                        value: experience
                                                    };
                                                })
                                            }}
                                        />
                                        <HrmsSystemCustomMultiInput
                                            title="Dil Tecrübeleri"
                                            styles={classes}
                                            handleSubmit={(values) => {
                                                cv.languageExperiences = [...cv.languageExperiences, values]
                                            }}
                                            validationSchema={{
                                                languageName: Yup.string().required("Dil İsmi Zorunlu"),
                                                languageGrade: Yup.string().required("Dil Seviyesi Zorunlu"),
                                            }}
                                            initialValues={{
                                                languageName: "",
                                                languageGrade: "",
                                            }}
                                            selectedItems={cv.languageExperiences}
                                            inputComponents={[
                                                {name: "languageName", placeHolder: "Dil İsmi"},
                                                {name: "languageGrade", placeHolder: "Dil Seviyesi"},
                                            ]}
                                            accordions={(languages) => {
                                                if (languages !== undefined && languages !== null){
                                                    cv.languageExperiences = languages;
                                                }
                                                return languages.map((language, key) => {
                                                    return {name: `Dil: ${language.languageName}`, value: language};
                                                })
                                            }}
                                        />
                                        <HrmsSystemCustomMultiInput
                                            title="Okul Tecrübeleri"
                                            styles={classes}
                                            handleSubmit={(values) => {
                                                cv.schools = [...cv.schools, values]
                                            }}
                                            validationSchema={{
                                                schoolName: Yup.string().required("Okul İsmi Zorunlu"),
                                                graduationYear: Yup.string()
                                            }}
                                            initialValues={{
                                                schoolName: "",
                                                graduationYear: "",
                                            }}
                                            selectedItems={cv.schools}
                                            inputComponents={[
                                                {name: "schoolName", placeHolder: "Okul İsmi"},
                                                {name: "graduationYear", placeHolder: "Mezuniyet Yılı"},
                                            ]}
                                            accordions={(schools) => {
                                                if (schools !== undefined && schools !== null){
                                                    cv.schools = schools;
                                                }
                                                return schools.map((school) => {
                                                    return {name: `Okul: ${school.schoolName}`, value: school};
                                                })
                                            }}
                                        />
                                    </CardBody>
                                </Card>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                                <Card profile>
                                    <CardAvatar>
                                        <img src={photo === undefined ? cv.userPhoto : URL.createObjectURL(photo)} alt="..."/><HrmsSystemMaterialCustomInput
                                        labelText="Fotoğraf"
                                        id="userPhoto"
                                        formControlProps={{}}
                                        inputProps={{
                                            onChange: handleInputPhoto,
                                            value: "",
                                            defaultValue: "",
                                            type: "file",
                                            hidden: true,
                                            accept: "image/*"
                                        }}
                                    />
                                        <label htmlFor="userPhoto">
                                            <Button component="span" className="mt-2"
                                                    color="rose">RESMİ GÜNCELLE</Button>
                                        </label>
                                    </CardAvatar>
                                    <CardBody profile>
                                        <h4 className="text-dark">{user.firstName + " " + user.lastName}</h4>
                                        <h6 className="text-dark">ÖN BİLGİ</h6>
                                        <p className="text-dark">
                                            {cv.foreground != null ? cv.foreground : "Ön Bilgi Girilmemiş"}
                                        </p>
                                        <Button color="danger" round>
                                            ÖZGEÇMİŞİ SİL
                                        </Button>
                                        <Button color="info" round type="submit">
                                            ÖZGEÇMİŞİ GÜNCELLE
                                        </Button>
                                        <SnackBar
                                            place="tr"
                                            color={snackBarStatus}
                                            message={snackbarMessage}
                                            open={snackbar}
                                            closeNotification={() => setSnackbar(false)}
                                            close
                                        />
                                    </CardBody>
                                </Card>
                            </GridItem>
                        </GridContainer>
                    </Form>
                )}
            </Formik>
        </div>
    );
}