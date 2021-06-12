import React, { useEffect, useState } from "react";
import NotificationAlert from "react-notification-alert";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

import { Button } from "@material-ui/core";

import JobPostingService from "../../services/jobPostingService";

export default function ActivatePostings() {
  const notificationAlertRef = React.useRef(null);
  const [postings, setPostings] = useState([]);
  const postingService = new JobPostingService();

  useEffect(() => {
    loadPostings();
  }, []);

  let loadPostings = () => {
    postingService
    .getPostingsNoActivated()
    .then((result) => setPostings(result.data.data));
  }
  let remove = (posting) => {
    postingService.deletePosting(posting).then((result) => {
      loadPostings();
      createAlert(result.data.success, result.data.message);
    });
  };

  let activate = (id) => {
    loadPostings();
    postingService.activatePosting(id).then(result => {
      loadPostings();
      createAlert(result.data.success, result.data.message);
    })
  };

  let createAlert = (success, message) => {
    var color = success === true ? "success" : "danger";
    var options = {
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
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">
                Onaylanmamış Tüm İlanlar Listelendi
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Table className="tablesorter" responsive>
                <thead className="text-info">
                  <tr>
                    <th>İş İlanı</th>
                    <th>Eklenme Tarihi</th>
                    <th>İşlemler</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  {postings.map((posting, key) => {
                    posting.addedDate = new Date(posting.addedDate);
                    posting.deadline = new Date(posting.deadline);
                    return (
                      <tr key={key}>
                        <td>
                          {posting.jobDescription.length > 20
                            ? posting.jobDescription.substing(0, 21) + "..."
                            : posting.jobDescription}
                        </td>
                        <td>
                          {posting.addedDate.getDate() +
                            "-" +
                            (parseInt(posting.addedDate.getMonth()) + 1) +
                            "-" +
                            posting.addedDate.getUTCFullYear()}
                        </td>
                        <td>
                          <Button variant="contained" color="primary" onClick={() => activate(posting.id)}>
                            ONAYLA
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            className="ml-2"
                            onClick={() => remove(posting)}
                          >
                            İLANI SİL
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
