import React, { useState, useEffect } from "react";

import Table from "components/EmployerUser/Table/Table.js";
import Card from "components/EmployerUser/Card/Card.js";
import CardHeader from "components/EmployerUser/Card/CardHeader.js";
import CardBody from "components/EmployerUser/Card/CardBody.js";

import { Container, makeStyles, Chip, Button } from "@material-ui/core";

import JobPostingService from "services/jobPostingService";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

export default function MyPostings() {
  const classes = makeStyles(styles);
  const [postings, setPostings] = useState([])
  useEffect(()=> {
      let postingService = new JobPostingService();
      postingService.getPostingsByUserId(4).then(result=>setPostings(result.data.data));
  }, [])
  return (
    <div>
      <Container>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>İş İlanlarım</h4>
            <p className={classes.cardCategoryWhite}>
              İlanlar Listelendi.
            </p>
          </CardHeader>
          <CardBody>
              <Table
                tableHeaderColor="info"
                tableHead={["İş Tanımı", "Eklenme Tarihi", "Son Başvuru Tarihi", "Aktif Mi ?", "Onaylandı Mı ?", "Güncelle"]}
                tableData={postings.map((posting, key) => {
                    posting.addedDate = new Date(posting.addedDate);
                    posting.deadline = new Date(posting.deadline);
                    return [
                        posting.jobDescription.substring(0,21) + "...",
                        `${posting.addedDate.getDate() +
                            "-" +
                            (parseInt(posting.addedDate.getMonth()) + 1) +
                            "-" +
                            posting.addedDate.getUTCFullYear()}`,
                        `${posting.deadline.getDate() +
                            "-" +
                            (parseInt(posting.deadline.getMonth()) + 1) +
                            "-" +
                            posting.deadline.getUTCFullYear()}`,
                        posting.active ? <Chip label="Aktif" color="primary"/> : <Chip label="Aktif Değil" color="secondary" />,
                        posting.activated ? <Chip label="Onaylandı" color="primary"/> : <Chip label="Beklemede" color="secondary" />,
                        <Button variant="contained" color="primary">Güncelle</Button>
                    ]
                })}
              />
          </CardBody>
        </Card>
      </Container>
    </div>
  );
}
