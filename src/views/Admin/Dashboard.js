import React from "react";
import { Line } from "react-chartjs-2";

import { Card, CardHeader, CardTitle, Row, Col, CardBody } from "reactstrap";
import { Icon } from "semantic-ui-react";

import { chartExample1 } from "variables/charts.js";

export default function Dashboard() {
  return (
    <>
      <div className="content">
        <Row>
          <Col lg="6">
            <Card>
              <CardHeader>
                <Icon name="users" />
                Toplam Kullanıcı Sayısı
                <CardTitle tag="h3">
                  <Icon name="star" />
                  50 (Test)
                </CardTitle>
              </CardHeader>
            </Card>
          </Col>
          <Col lg="6">
            <Card>
              <CardHeader>
                <Icon name="users" />
                Toplam Aktif Kullanıcı Sayısı
                <CardTitle tag="h3">
                  <Icon name="star" />
                  50 (Test)
                </CardTitle>
              </CardHeader>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Tüm Özgeçmişlerin Görüntülenme Sayıları</h5>
                <CardTitle tag="h2">Son 7 Gün</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartExample1.data1}
                    options={chartExample1.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
