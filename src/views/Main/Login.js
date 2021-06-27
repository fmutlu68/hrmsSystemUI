import React from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import NotificationAlert from "react-notification-alert";

import * as yup from "yup";
import { useFormik } from "formik";

import { Container } from "semantic-ui-react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import loginImage from "assets/img/header.jpg";
import { loginUser } from "store/actions/userActions";
import AuthService from "../../services/authService";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "80vh",
    width: "100%",
  },
  image: {
    backgroundImage: `url(${loginImage})`,
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
    backgroundColor: "#1a2e28",
  },
  input: {
    color: "white",
  },
}));

const validation = yup.object({
  email: yup
    .string("Email")
    .required("Email Girişi Zorunludur.")
    .email("Email Kriterlerine Uyulmalıdır."),
  password: yup.string("Şifre").required("Şifre Girişi Zorunludur."),
});

export default function Login(props) {
  const notificationAlertRef = React.useRef(null);
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  React.useEffect(() => {
    console.log(props.location);
    if (props.location.state !== null && props.location.state !== undefined) {
      createAlert(true, props.location.state.isRegistered);
    }
  }, [props.location.state]);

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validation,
    onSubmit: (values) => {
      login(values);
    },
  });
  let login = (values) => {
    let authService = new AuthService();
    authService.login(values).then(result=> {
      console.log(result.data);
      if (result.data.success === true){
        dispatch(loginUser(result.data.data));
        if (result.data.data.jobPositionId){
          history.push("/admin/home");
        }else if (result.data.data.firstName){
          history.push("/employee/home");
        }else {
          history.push("/employer/home");
        }
      }else {
        createAlert(false, result.data.message);
      }
    });
  };
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
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Giriş
              </Typography>
              <form className={classes.form} onSubmit={formik.handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="email"
                  label="E-Posta"
                  name="email"
                  autoComplete="email"
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
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Şifre"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  InputProps={{
                    className: classes.input,
                  }}
                  InputLabelProps={{
                    style: { color: "#fff" },
                  }}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}        
                />
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  size="large"
                >
                  GİRİŞ YAP
                </Button>
              </form>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
