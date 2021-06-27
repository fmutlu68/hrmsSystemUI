import React from "react";
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

import bgImage from "assets/img/bg5.jpg";

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

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const validation = yup.object({
  companyName: yup
    .string("Şirketinizin Adı")
    .required("Şirket Adı Boş Geçilemez."),
  companyWebSite: yup
    .string("Şirketinizin Web Sitesi")
    .nullable()
    .url("Şirket Web Sitesi URL (Link) Formatında Olmalıdır. http..."),
  companyPhone: yup
    .string()
    .matches(phoneRegExp, "Telefon Numarası Yazım Şekline Göre Yazılmalıdır.")
    .required("Şirket Telefonunun Girilmesi Mecburidir."),
  
});

export default function EmployerRegister(props) {
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      companyName: "",
      companyWebSite: "",
      companyPhone: "",
    },
    validationSchema: validation,
    onSubmit: (values)=>{
      console.log(values);
    }
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
            <div className={classes.paper} onSubmit={formik.handleSubmit}>
              <Avatar className={classes.avatar}>
                <AccountCircle />
              </Avatar>
              <Typography component="h1" variant="h5">
                İş Veren Kayıt - Devam
              </Typography>
              <form className={classes.form}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="companyName"
                  label="Şirket Adı"
                  name="companyName"
                  InputProps={{
                    className: classes.input,
                  }}
                  InputLabelProps={{
                    style: { color: "#fff" },
                  }}
                  value={formik.values.companyName}
                  onChange={formik.handleChange}
                  error={formik.touched.companyName && Boolean(formik.errors.companyName)}
                  helperText={formik.touched.companyName && formik.errors.companyName}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="companyWebSite"
                  label="Şirketinizin İnternet Sitesi"
                  id="companyWebSite"
                  InputProps={{
                    className: classes.input,
                  }}
                  InputLabelProps={{
                    style: { color: "#fff" },
                  }}
                  value={formik.values.companyWebSite}
                  onChange={formik.handleChange}
                  error={formik.touched.companyWebSite && Boolean(formik.errors.companyWebSite)}
                  helperText={formik.touched.companyWebSite && formik.errors.companyWebSite}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="companyPhone"
                  label="Şirket Telefonu"
                  id="companyPhone"
                  InputProps={{
                    className: classes.input,
                  }}
                  InputLabelProps={{
                    style: { color: "#fff" },
                  }}
                  value={formik.values.companyPhone}
                  onChange={formik.handleChange}
                  error={formik.touched.companyPhone && Boolean(formik.errors.companyPhone)}
                  helperText={formik.touched.companyPhone && formik.errors.companyPhone}
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={classes.submit}
                  size="large"
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
