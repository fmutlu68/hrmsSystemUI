import React from "react";
import NotificationAlert from "react-notification-alert";

import GridItem from "../../components/EmployerUser/Grid/GridItem";
import GridContainer from "../../components/EmployerUser/Grid/GridContainer";
import Card from "../../components/EmployerUser/Card/Card";
import CardHeader from "../../components/EmployerUser/Card/CardHeader";

import JobPostingService from "../../services/jobPostingService";

import {Chip, makeStyles} from "@material-ui/core";

import styles from "assets/materialDashboard/jss/material-dashboard-react/components/cardWhiteTextStyle";
import CardBody from "../../components/EmployerUser/Card/CardBody";

import AccordionSummary from "@material-ui/core/AccordionSummary";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";

import {ExpandMore} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import HrmsSystemMaterialCustomInput from "../../components/CustomInput/HrmsSystemMaterialCustomInput";
import RegularButton from "../../components/CustomButtons/Button";
import JobPositionService from "../../services/jobPositionService";
import Table from "components/EmployerUser/Table/Table.js";
import FavoriteJobPostingService from "../../services/favoriteJobPostingService";
import CardFooter from "../../components/EmployerUser/Card/CardFooter";
import {Pagination} from "@material-ui/lab";

export default function JobPostings() {
    const notificationAlertRef = React.useRef(null);
    const [paginationSettings, setPaginationSettings] = React.useState({pageNo: 1, pageSize: 4});
    const [lastPostingDataAction, setLastPostingDataAction] = React.useState("all");

    const [ratedPostings, setRatedPostings] = React.useState([]);
    const [positions, setPositions] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState({content: []});
    const [filterInputs, setFilterInputs] = React.useState({
        companyName: "",
        maxPay: 0,
        minPay: 0,
        deadline: null,
        jobPositionId: ""
    });

    const postingsService = new JobPostingService();
    const positionService = new JobPositionService();
    const favoriteService = new FavoriteJobPostingService();

    const classes = makeStyles(styles);

    const loadPostings = (pageNo = paginationSettings.pageNo) => {
        if (pageNo === 0){
            setPaginationSettings({...paginationSettings, pageNo: 1});
        }else {
            setPaginationSettings({...paginationSettings, pageNo: pageNo +1});
        }
        postingsService.getPostings(pageNo, paginationSettings.pageSize).then(result => {
            console.log(result.data.data);
            setCurrentPage(result.data.data);
        });
    }

    React.useEffect(() => {
        loadPostings(0);
        positionService.getPositions().then(result => {
            setPositions(result.data.data);
        })
    }, []);

    const handleFilterInputChange = (event) => {
        if (event.target.name === undefined || event.target.name === null || event.target.name === "") {
            setFilterInputs({...filterInputs, [event.target.id]: event.target.value});
        } else {
            setFilterInputs({...filterInputs, [event.target.name]: event.target.value});
        }
    }

    const addFavorites = (posting) => {
        if (ratedPostings.indexOf(posting) === -1) {
            setRatedPostings([...ratedPostings, posting]);
            favoriteService.addFavorites({jobPostingId: posting.id, userId: 9}).then(result => {
                console.log(result);
            });
        } else {
            setRatedPostings([...ratedPostings.filter(r => r !== posting)]);
        }
    }

    const loadPostingsByDeadline = (pageNo = paginationSettings.pageNo) => {
        if (pageNo === 0){
            setPaginationSettings({...paginationSettings, pageNo: 1});
        }else {
            setPaginationSettings({...paginationSettings, pageNo: pageNo +1});
        }
        postingsService.getPostingsByDeadline(filterInputs.deadline, pageNo, paginationSettings.pageSize).then(result => {
            setCurrentPage(result.data.data);
            createAlert(result.data.success, result.data.message);
        });
    }

    const loadPostingsByMaxAndMinPay = (pageNo = paginationSettings.pageNo) => {
        if (pageNo === 0){
            setPaginationSettings({...paginationSettings, pageNo: 1});
        }else {
            setPaginationSettings({...paginationSettings, pageNo: pageNo +1});
        }
        postingsService.getPostingsByMaxAndMinPay(filterInputs.maxPay, filterInputs.minPay, pageNo, paginationSettings.pageSize).then(result => {
            setCurrentPage(result.data.data);
            createAlert(result.data.success, result.data.message);
        });
    }

    const loadPostingsByCompanyName = (pageNo = paginationSettings.pageNo) => {
        if (pageNo === 0){
            setPaginationSettings({...paginationSettings, pageNo: 1});
        }else {
            setPaginationSettings({...paginationSettings, pageNo: pageNo +1});
        }
        postingsService.getPostingsByCompanyName(filterInputs.companyName, pageNo, paginationSettings.pageSize).then(result => {
            setCurrentPage(result.data.data);
            createAlert(result.data.success, result.data.message);
        });
    }

    const loadPostingsByJobPositionId = (pageNo = paginationSettings.pageNo) => {
        if (pageNo === 0){
            setPaginationSettings({...paginationSettings, pageNo: 1});
        }else {
            setPaginationSettings({...paginationSettings, pageNo: pageNo +1});
        }
        postingsService.getPostingsByJobPositionId(filterInputs.jobPositionId, pageNo, paginationSettings.pageSize).then(result => {
            setCurrentPage(result.data.data);
            createAlert(result.data.success, result.data.message);
        });
    }

    const filterPostings = (actionType) => {
        switch (actionType) {
            case "pay":
                setLastPostingDataAction("pay");
                loadPostingsByMaxAndMinPay(0);
                break;
            case "companyName":
                setLastPostingDataAction("companyName");
                loadPostingsByCompanyName(0);
                break;
            case "jobPositionId":
                setLastPostingDataAction("jobPositionId");
                loadPostingsByJobPositionId(0);
                break;
            case "deadline":
                setLastPostingDataAction("deadline");
                loadPostingsByDeadline(0);
                break;
        }
    }

    const createAlert = (color, message) => {
        if (color === true) {
            color = "success";
        } else if (color === false) {
            color = "danger";
        }
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

    const refreshPostingData = (pageNo) => {
        setPaginationSettings({...paginationSettings, pageNo: pageNo});
        console.log("Pageno" , pageNo);
        switch (lastPostingDataAction) {
            case "all":
                loadPostings(pageNo -1);
                break;
            case "pay":
                loadPostingsByMaxAndMinPay(pageNo -1);
                break;
            case "companyName":
                loadPostingsByCompanyName(pageNo -1);
                break;
            case "jobPositionId":
                loadPostingsByJobPositionId(pageNo -1);
                break;
            case "deadline":
                loadPostingsByDeadline(pageNo -1);
                break;
        }
    }
    return (
        <div>
            <GridContainer>
                <div className="react-notification-alert-container">
                    <NotificationAlert ref={notificationAlertRef}/>
                </div>
                <GridItem xs={12} sm={12} md={3}>
                    <Card>
                        <CardHeader color="info" className="text-center">
                            <h4 className={classes.cardTitleWhite}>Filtreleme</h4>
                        </CardHeader>
                        <CardBody>
                            <Accordion className="bg-info">
                                <AccordionSummary expandIcon={<ExpandMore/>}>
                                    <Typography>Maaş Skalası</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <HrmsSystemMaterialCustomInput
                                                name="maxPay"
                                                id="maxPay"
                                                labelText="Maximum"
                                                formControlProps={{}}
                                                inputProps={{
                                                    onChange: (e) => handleFilterInputChange(e),
                                                    value: filterInputs.maxPay,
                                                }}/>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <HrmsSystemMaterialCustomInput
                                                name="minPay"
                                                id="minPay"
                                                labelText="Minimum"
                                                formControlProps={{}}
                                                inputProps={{
                                                    onChange: (e) => handleFilterInputChange(e),
                                                    value: filterInputs.minPay,
                                                    type: "number"
                                                }}/>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <RegularButton id="pay" color="success"
                                                           onClick={() => filterPostings("pay")}>FİLTRELE</RegularButton>
                                        </GridItem>
                                    </GridContainer>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion className="bg-info">
                                <AccordionSummary expandIcon={<ExpandMore/>}>
                                    <Typography>Firma Adı</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <HrmsSystemMaterialCustomInput
                                                name="companyName"
                                                id="companyName"
                                                labelText="Firma Adı"
                                                formControlProps={{}}
                                                inputProps={{
                                                    onChange: (e) => handleFilterInputChange(e),
                                                    value: filterInputs.companyName,
                                                }}/>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <RegularButton id="companyName" color="primary"
                                                           onClick={() => filterPostings("companyName")}>FİLTRELE</RegularButton>
                                        </GridItem>
                                    </GridContainer>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion className="bg-info">
                                <AccordionSummary expandIcon={<ExpandMore/>}>
                                    <Typography>Son Başvuru Tarihi</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <HrmsSystemMaterialCustomInput
                                                name="deadline"
                                                id="deadline"
                                                labelText="Son Başvuru Tarihi"
                                                formControlProps={{}}
                                                inputProps={{
                                                    onChange: (e) => handleFilterInputChange(e),
                                                    value: filterInputs.deadline,
                                                    type: "date"
                                                }}/>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <RegularButton id="deadline" color="success"
                                                           onClick={() => filterPostings("deadline")}>FİLTRELE</RegularButton>
                                        </GridItem>
                                    </GridContainer>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion className="bg-info">
                                <AccordionSummary expandIcon={<ExpandMore/>}>
                                    <Typography>İş Pozisyonu</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <Select
                                                fullWidth
                                                labelId="jobPositionSelect"
                                                name="jobPositionId"
                                                value={filterInputs.jobPositionId}
                                                onChange={handleFilterInputChange}
                                            >
                                                {positions.map((position, _) => {
                                                    return (
                                                        <MenuItem value={position.id}
                                                                  selected={filterInputs.jobPositionId === position.id}>{position.jobPositionName}</MenuItem>
                                                    );
                                                })}
                                            </Select>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <RegularButton id="jobPositionId" color="success"
                                                           onClick={() => filterPostings("jobPositionId")}>FİLTRELE</RegularButton>
                                        </GridItem>
                                    </GridContainer>
                                </AccordionDetails>
                            </Accordion>
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={9}>
                    <Card>
                        <CardHeader color="rose">
                            <h4 className={classes.cardTitleWhite}>İş İlanları Listelendi.</h4>
                        </CardHeader>
                        <CardBody>

                            <Table
                                tableHeaderColor="rose"
                                tableHead={["Favorilere Ekle", "Firma Adı", "Son Başvuru Tarihi", "Maximum Maaş"]}
                                tableData={currentPage.content.map(posting => {
                                    posting.deadline = new Date(posting.deadline);
                                    return [
                                        <Chip color="primary"
                                              label={ratedPostings.find(r => r.id === posting.id) === undefined ? "Favorilere Ekle" : "Favorilere Eklendi"}
                                              clickable onClick={() => addFavorites(posting)}/>,
                                        posting.user === undefined ? posting.companyName : posting.user.companyName,
                                        posting.deadline.getDate() +
                                        "-" +
                                        (parseInt(posting.deadline.getMonth()) + 1) +
                                        "-" +
                                        posting.deadline.getUTCFullYear(),
                                        posting.maxPay === undefined ? "Girilmemiş" : posting.maxPay
                                    ]
                                })}
                            />
                        </CardBody>
                        <CardFooter>
                            <Pagination
                                color="secondary"
                                variant="outlined"
                                shape="rounded"
                                size="large"
                                count={currentPage.totalPages}
                                showFirstButton
                                showLastButton
                                page={paginationSettings.pageNo}
                                onChange={(e,pageNo) => refreshPostingData(pageNo)}
                            />
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}