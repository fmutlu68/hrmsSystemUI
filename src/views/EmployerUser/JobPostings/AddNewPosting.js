import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  TextField,
  makeStyles,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";

import Card from "components/EmployerUser/Card/Card.js";
import CardHeader from "components/EmployerUser/Card/CardHeader.js";
import CardIcon from "components/EmployerUser/Card/CardIcon.js";
import CardBody from "components/EmployerUser/Card/CardBody.js";
import CardFooter from "components/EmployerUser/Card/CardFooter.js";
import SnackBar from "components/EmployerUser/Snackbar/Snackbar";

import { Add } from "@material-ui/icons";

import style from "assets/materialDashboard/jss/material-dashboard-react/views/dashboardStyle";
import JobPositionService from "services/jobPositionService";
import JobPostingService from "services/jobPostingService";
import CityService from "services/cityService";

const validation = yup.object({
  jobDescription: yup
    .string("İş Detaylarını Giriniz.")
    .required("İş Detaylarının Girilmesi Zorunludur.")
    .min(10, "İş Detayı Minimum 10 Karakterden Oluşmalıdır.")
    .max(2000, "İş Detayı Maximum 2000 Karakterden Oluşmalıdır."),
  max: yup.string("Maximum Maaş "),
  min: yup.string("Minimum Maaş "),
  payType: yup.string("Maaşın Para Birimi "),
  vacancy: yup.string("Boş Pozisyon Sayısı").required("Bu Alan Zorunludur."),
  deadline: yup.date("Son Başvuru Tarihi").required("Bu Alan Zorunludur."),
  workPlace: yup.string("Çalışma Şekli").required("Bu Alan Zorunludur."),
  workTime: yup.string("Çalışma Süresi").required("Bu Alan Zorunludur."),
  jobPositionId: yup.number("İş Pozisyonu").required("Bu Alan Zorunludur."),
  cityId: yup
    .number("İş İçin Çalışılacak Şehir")
    .required("Bu Alan Zorunludur."),
});

const useStyles = makeStyles(style);

const buttonStyle = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    width: "100%",
  },
}));

export default function AddNewPosting() {
  const [jobPositions, setJobPositions] = useState([]);
  const [isJobPositionsLoaded, setIsJobPositionsLoaded] = useState(false);

  const [cities, setCities] = useState([]);
  const [isCitiesLoaded, setIsCitiesLoaded] = useState(false);
  const [postingAdded, setPostingAdded] = useState("no");

  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const classes = useStyles();
  const buttonStyles = buttonStyle();

  useEffect(() => {
    let positionService = new JobPositionService();
    positionService.getPositions().then((result) => {
      setJobPositions(result.data.data);
      setIsJobPositionsLoaded(true);
    });
    let cityService = new CityService();
    cityService.getCities().then((result) => {
      setCities(result.data.data);
      setIsCitiesLoaded(true);
    });
  }, []);

  let savePosting = (values) => {
    if (values.max === "") {
      values.max = 0;
    }
    if (values.min === "") {
      values.min = 0;
    }
    let posting = {
      jobDescription: values.jobDescription,
      maxPay: values.max,
      minPay: values.min,
      vacancy: values.vacancy,
      payType: values.payType,
      active: false,
      addedDate: new Date(Date.now()),
      deadline: values.deadline,
      workPlace: values.workPlace,
      workTime: values.workTime,
      jobPosition: {
        id: values.jobPositionId,
      },
      city: {
        id: values.cityId,
      },
      user: {
        userId: 4,
      },
    };
    let jobPostingService = new JobPostingService();
    jobPostingService.addPosting(posting).then((result) => {
      console.log(result.data);
      setSnackbarMessage(result.data.message);
      if (result.data.success) {
        setPostingAdded("yes");
      } else {
        setPostingAdded("no");
      }
      showNotification();
    });
  };

  const formik = useFormik({
    initialValues: {
      jobDescription: "",
      max: "",
      min: "",
      payType: "",
      vacancy: "",
      deadline: "",
      workPlace: null,
      workTime: "",
      jobPositionId: "",
      cityId: "",
    },
    validationSchema: validation,
    onSubmit: (values) => {
      console.log(values);
      savePosting(values);
    },
  });

  const showNotification = () => {
    if (!snackbar) {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 10000);
    }
  };
  return (
    <div>
      <Card>
        <form onSubmit={formik.handleSubmit}>
          <CardHeader color="info" stats icon>
            <CardIcon color="info">
              <Add />
            </CardIcon>
            <p className={classes.cardCategory}>İş İlanı</p>
            <h3 className={classes.cardTitle}>İş İlanı Ekleme</h3>
          </CardHeader>
          <CardBody>
            <TextField
              fullWidth
              id="jobDescription"
              name="jobDescription"
              label="İş Tanımı"
              value={formik.values.jobDescription}
              onChange={formik.handleChange}
              error={
                formik.touched.jobDescription &&
                Boolean(formik.errors.jobDescription)
              }
              helperText={
                formik.touched.jobDescription && formik.errors.jobDescription
              }
              variant="outlined"
            />
            <TextField
              fullWidth
              id="max"
              name="max"
              label="Bu İş İçin Düşündüğünüz Maximum Maaş"
              value={formik.values.max}
              onChange={formik.handleChange}
              error={formik.touched.max && Boolean(formik.errors.max)}
              helperText={formik.touched.max && formik.errors.max}
              variant="outlined"
              className="mt-3"
            />
            <TextField
              fullWidth
              id="min"
              name="min"
              label="Bu İş İçin Düşündüğünüz Minimum Maaş"
              value={formik.values.min}
              onChange={formik.handleChange}
              error={formik.touched.min && Boolean(formik.errors.min)}
              helperText={formik.touched.min && formik.errors.min}
              variant="outlined"
              className="mt-3"
            />
            <TextField
              fullWidth
              id="payType"
              name="payType"
              label="Bu İş İçin Düşündüğünüz Maaşın Para Birimi"
              value={formik.values.payType}
              onChange={formik.handleChange}
              error={formik.touched.payType && Boolean(formik.errors.payType)}
              helperText={formik.touched.payType && formik.errors.payType}
              variant="outlined"
              className="mt-3"
            />
            <TextField
              fullWidth
              id="vacancy"
              name="vacancy"
              label="Bu İş İçin İşe Almak İstediğiniz Kişi Sayısı"
              value={formik.values.vacancy}
              onChange={formik.handleChange}
              error={formik.touched.vacancy && Boolean(formik.errors.vacancy)}
              helperText={formik.touched.vacancy && formik.errors.vacancy}
              variant="outlined"
              className="mt-4"
            />
            <TextField
              fullWidth
              id="deadline"
              name="deadline"
              label="Bu İş İçin Son Başvuru Tarihi"
              value={formik.values.deadline}
              onChange={formik.handleChange}
              error={formik.touched.deadline && Boolean(formik.errors.deadline)}
              helperText={formik.touched.deadline && formik.errors.deadline}
              variant="outlined"
              className="mt-3"
              type="date"
              InputLabelProps={{ shrink: true, placeholder: "" }}
            />
            <InputLabel htmlFor="jobPositionId" className="mt-3">
              İş Pozisyonu
            </InputLabel>
            <Select
              fullWidth
              id="jobPositionId"
              name="jobPositionId"
              value={formik.values.jobPositionId}
              onChange={formik.handleChange}
              error={
                formik.touched.jobPositionId &&
                Boolean(formik.errors.jobPositionId)
              }
              helperText={
                formik.touched.jobPositionId && formik.errors.jobPositionId
              }
              variant="outlined"
            >
              {isJobPositionsLoaded ? null : (
                <MenuItem selected>İş Pozisyonları Yükleniyor...</MenuItem>
              )}
              {jobPositions.map((position, _) => {
                return (
                  <MenuItem value={position.id}>
                    {position.jobPositionName}
                  </MenuItem>
                );
              })}
            </Select>

            <InputLabel htmlFor="cityId" className="mt-3">
              İşin Konumu
            </InputLabel>
            <Select
              fullWidth
              id="cityId"
              name="cityId"
              value={formik.values.cityId}
              onChange={formik.handleChange}
              error={formik.touched.cityId && Boolean(formik.errors.cityId)}
              helperText={formik.touched.cityId && formik.errors.cityId}
              variant="outlined"
            >
              {isCitiesLoaded ? null : (
                <MenuItem selected>Şehirler Yükleniyor...</MenuItem>
              )}
              {cities.map((city, _) => {
                return (
                  <MenuItem value={city.id}>
                    {city.name + " ---- " + city.country.name}
                  </MenuItem>
                );
              })}
            </Select>
            <InputLabel htmlFor="workPlace" className="mt-3">
              İş Çalışma Şekli
            </InputLabel>
            <Select
              fullWidth
              id="workPlace"
              name="workPlace"
              value={formik.values.workPlace}
              onChange={formik.handleChange}
              error={
                formik.touched.workPlace && Boolean(formik.errors.workPlace)
              }
              helperText={formik.touched.workPlace && formik.errors.workPlace}
              variant="outlined"
            >
              <MenuItem selected>Seçiniz</MenuItem>
              <MenuItem value="Evden">Evden Çalışma</MenuItem>
              <MenuItem value="Uzaktan">Uzaktan Çalışma</MenuItem>
            </Select>
            <InputLabel htmlFor="workTime" className="mt-3">
              İş Çalışma Süresi
            </InputLabel>
            <Select
              fullWidth
              id="workTime"
              name="workTime"
              value={formik.values.workTime}
              onChange={formik.handleChange}
              error={formik.touched.workTime && Boolean(formik.errors.workTime)}
              helperText={formik.touched.workTime && formik.errors.workTime}
              variant="outlined"
            >
              <MenuItem value="Yarı">Yarı Zamanlı Çalışma</MenuItem>
              <MenuItem value="Tam">Tam Zamanlı Çalışma</MenuItem>
            </Select>
          </CardBody>
          <CardFooter stats>
            <Button
              variant="contained"
              color="primary"
              className={buttonStyles.button}
              type="submit"
              size="large"
            >
              Kaydet
            </Button>
            <SnackBar
              place="tr"
              color={postingAdded === "yes" ? "success" : "danger"}
              message={snackbarMessage}
              open={snackbar}
              closeNotification={() => setSnackbar(false)}
              close
            />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
