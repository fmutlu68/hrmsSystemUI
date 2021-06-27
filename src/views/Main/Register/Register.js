import React, { useEffect, useState } from "react";

import { useFormik } from "formik";
import * as yup from "yup";

import { Container, Button as SButton } from "semantic-ui-react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import SnackBar from "@material-ui/core/SnackBar";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ToggleButton from "@material-ui/lab/ToggleButton";
import MuiAlert from "@material-ui/lab/Alert";

import bgImage from "assets/img/mountain_1.jpg";
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
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "90%",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formGrid: {
    backgroundColor: "#495c49",
  },
  input: {
    color: "white",
  },
}));

const validation = yup.object({
  email: yup
    .string("E-Posta'nızı Giriniz")
    .required("E-Postanızı Girmeniz Gerekmektedir.")
    .email("E-Posta Kriterlerine Uyulmalıdır."),
  password: yup
    .string("Şifrenizi Giriniz")
    .required("Şifrenizi Girmeniz Gerekmektedir."),
  passwordAgain: yup
    .string("Şifrenizi Giriniz")
    .required("Şifrenizi Girmeniz Gerekmektedir."),
});

export default function Register() {
  const history = useHistory();
  const classes = useStyles();
  const [alertDetail, setAlertDetail] = useState({ message: "", severity: "", vertical: "top", horizontal: "right", duration: 6000 });
  const { message, severity, vertical, horizontal, duration } = alertDetail;
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    Object.freeze(RegisterType);
  }, []);

  let checkRegister = (register) => {
    if (register.passwordAgain !== register.password) {
      setAlertDetail({
        ...alertDetail,
        message: "Girilen Şifreler Birbiriyle Uyuşmuyor.",
        severity: "error",
      });
      setAlertOpen(true);
      return false;
    }
    if (register.registerType === RegisterType.NoSelected){
      console.log("No Selected");
      setAlertDetail({
        ...alertDetail,
        message: "Bir Kullanıcı Tipi Seçilmelidir. (İş Veren/İşçi)",
        severity: "error",
      });
      setAlertOpen(true);
      return false;
    }
    setAlertOpen(false);
    return true;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordAgain: "",
      registerType: RegisterType.NoSelected,
    },
    validationSchema: validation,
    onSubmit: (values) => {
      var result = checkRegister(values);
      if (result === true) {
        setAlertDetail({
          ...alertDetail,
          message: "Yönlendiriliyorsunuz...",
          severity: "info",
          duration: 3000,
        });
        setAlertOpen(true);
        if (values.registerType === RegisterType.Employer){
          history.push("/main/register/employer", values);
        }else {
          history.push("/main/register/employee", values);
        }
      }
    },
  });

  return (
    <div className="mt-3">
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
                Kayıt
              </Typography>
              <form className={classes.form} onSubmit={formik.handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="email"
                  label="E-Posta"
                  name="email"
                  InputProps={{
                    className: classes.input,
                  }}
                  InputLabelProps={{
                    style: { color: "#fff" },
                  }}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Şifre"
                  type="password"
                  id="password"
                  InputProps={{
                    className: classes.input,
                  }}
                  InputLabelProps={{
                    style: { color: "#fff" },
                  }}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="passwordAgain"
                  label="Şifre Tekrar"
                  type="password"
                  id="passwordAgain"
                  InputProps={{
                    className: classes.input,
                  }}
                  InputLabelProps={{
                    style: { color: "#fff" },
                  }}
                  value={formik.values.passwordAgain}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.passwordAgain &&
                    Boolean(formik.errors.passwordAgain)
                  }
                  helperText={
                    formik.touched.passwordAgain && formik.errors.passwordAgain
                  }
                />
                <Grid>
                  <SButton
                    value={RegisterType.Employer}
                    size="large"
                    as={ToggleButton}
                    margin="normal"
                    toggle
                    active={
                      formik.values.registerType === RegisterType.Employer
                    }
                    color="teal"
                    onClick={() =>
                      formik.setFieldValue(
                        "registerType",
                        RegisterType.Employer
                      )
                    }
                  >
                    İş Veren
                  </SButton>
                  <SButton
                    value={RegisterType.Employee}
                    size="large"
                    as={ToggleButton}
                    margin="normal"
                    toggle
                    active={
                      formik.values.registerType === RegisterType.Employee
                    }
                    color="teal"
                    onClick={() =>
                      formik.setFieldValue(
                        "registerType",
                        RegisterType.Employee
                      )
                    }
                  >
                    İşçi
                  </SButton>
                </Grid>
                <MuiAlert
                    elevation={1}
                    variant="filled"
                    severity="info"
                    className="mt-2"
                  >
                    E-Posta'nıza Hesabınızın Doğrulanması İçin
                    Bir Şifre Gönderilecektir. E-Posta'nızın 
                    Doğruluğuna Dikkat Ediniz.
                  </MuiAlert>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={classes.submit}
                  size="large"
                >
                  DEVAM
                </Button>
                <SnackBar
                  open={alertOpen}
                  autoHideDuration={duration}
                  onClose={() => setAlertOpen(false)}
                  anchorOrigin={{vertical, horizontal}}
                >
                  <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={() => setAlertOpen(false)}
                    severity={severity}
                  >
                    {message}
                  </MuiAlert>
                </SnackBar>
              </form>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

const RegisterType = {
  NoSelected: 0,
  Employer: 1,
  Employee: 2,
};
