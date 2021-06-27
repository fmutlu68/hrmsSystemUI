import React from "react";
import NotificationAlert from "react-notification-alert";

import { useFormik } from "formik";
import * as yup from "yup";

import { Container } from "semantic-ui-react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import AccountCircle from "@material-ui/icons/AccountCircle";

import MuiAlert from "@material-ui/lab/Alert";

import bgImage from "assets/img/view_1.jpg";
import EmployeeUserService from "services/employeeUserService";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "80vh",
    width: "100%",
  },
  image: {
    backgroundImage: `url(${bgImage})`,
    backgroundRepeat: "no-repeat",
    backgroundColor: "transparent",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(5, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  avatar: {
    margin: theme.spacing(0.5),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "90%",
  },
  submit: {
    marginTop: theme.spacing(1),
  },
  formGrid: {
    backgroundColor: "#495c49",
  },
  input: {
    color: "white",
  },
}));

const validation = yup.object({
  identityNo: yup
    .string("Türkiye Cumhuriyeti Kimlik No")
    .required("T.C. No Zorunludur.")
    .min(11, "T.C. No 11 Karakterden Oluşmalıdır.")
    .max(11, "T.C. No 11 Karakterden Oluşmalıdır."),
  name: yup
    .string("İsminiz")
    .required("İsim Girilmesi Zorunludur.")
    .min(2, "İsminiz En Az 2 Karakterden Oluşmalıdır."),
  surname: yup
    .string("Soyisminiz")
    .required("Soyisim Girilmesi Zorunludur.")
    .min(2, "Soyisim En Az 2 Karakter Olmalıdır."),
  birthDate: yup
    .date("Doğum Tarihiniz")
    .required("Doğum Tarihi Zorunludur."),
});
export default function EmployeeRegister(props) {
  const notificationAlertRef = React.useRef(null);
  const classes = useStyles();
  const history = useHistory();
  const employeeService = new EmployeeUserService();
  let submit = ({name, surname, identityNo, birthDate}) => {
    var user = {
      firstname: name,
      lastname: surname,
      email: props.location.state.email,
      password: props.location.state.password,
      birthDate: birthDate,
      identityNo: identityNo
    }
    employeeService.addUser(user).then((result) => {
      console.log(result.data.success);
      if (result.data.success === true){
        console.log("İf");
        history.push("/main/login", {isRegistered: result.data.message });
      }else{
        if (result.data.message !== undefined){
          createAlert(false, result.data.message);
        }else {
          createAlert(false, result.message);
        }
      }
    }).catch(ex=> {
      console.log(ex.response.data.message);
      createAlert(false, ex.response.data.message);
    });
  }
  let createAlert = (success, message) => {
    var color = success === true ? "success" : "danger";
    var options = {
      place: "tr",
      message: <div>{message}</div>,
      type: color,
      icon: "tim-icons icon-bell-55",
      autoDismiss: 10,
    };
    notificationAlertRef.current.notificationAlert(options);
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      identityNo: "",
      birthDate: ""
    },
    validationSchema: validation,
    onSubmit: (values) => {
      submit(values);
    },
  });
  return (
    <div className="mt-3">
    <div className="react-notification-alert-container">
      <NotificationAlert ref={notificationAlertRef} />
    </div>
      <Container>
        <Grid container component="main" className={classes.root}>
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
            className={classes.formGrid}
          >
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <AccountCircle />
              </Avatar>
              <Typography component="h1" variant="h5">
                İşçi Kayıt - Devam
              </Typography>
              <form className={classes.form} onSubmit={formik.handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="identityNo"
                  name="identityNo"
                  label="Türkiye Cumhuriyeti Kimlik No"
                  InputProps={{
                    className: classes.input,
                  }}
                  InputLabelProps={{
                    style: { color: "#fff" },
                  }}
                  value={formik.values.identityNo}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.identityNo &&
                    Boolean(formik.errors.identityNo)
                  }
                  helperText={
                    formik.touched.identityNo && formik.errors.identityNo
                  }
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="name"
                  id="name"
                  label="İsminiz"
                  InputProps={{
                    className: classes.input,
                  }}
                  InputLabelProps={{
                    style: { color: "#fff" },
                  }}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="surname"
                  id="surname"
                  label="Soyisminiz"
                  InputProps={{
                    className: classes.input,
                  }}
                  InputLabelProps={{
                    style: { color: "#fff" },
                  }}
                  value={formik.values.surname}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.surname && Boolean(formik.errors.surname)
                  }
                  helperText={formik.touched.surname && formik.errors.surname}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="birthDate"
                  id="birthDate"
                  type="date"
                  label="Doğum Tarihiniz"
                  InputProps={{
                    className: classes.input,
                    placeholder: "",
                  }}
                  InputLabelProps={{
                    style: { color: "#fff" },
                    shrink: true,
                  }}
                  value={formik.values.birthDate}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.birthDate && Boolean(formik.errors.birthDate)
                  }
                  helperText={formik.touched.birthDate && formik.errors.birthDate}
                />
                <MuiAlert elevation={2} variant="filled" severity="info" className="mt-3">
                  Gireceğiniz Bilgiler Resmiyette Kayıtlı Olduğu Şekilde
                  Girilmelidir.
                </MuiAlert>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={classes.submit}
                >
                  TAMAMLA
                </Button>
              </form>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
