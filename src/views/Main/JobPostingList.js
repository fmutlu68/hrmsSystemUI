import React, { useState, useEffect } from "react";
import {
  Table,
  Grid,
  Menu,
  Button,
  Accordion,
  Icon,
  Label,
  Input,
  Select,
} from "semantic-ui-react";
import JobPostingService from "services/jobPostingService";
import JobPositionService from "services/jobPositionService";

export default function JobPostingList() {
  const [activeIndex, setActiveIndex] = useState(null);

  const [postings, setPostings] = useState([]);
  const [positions, setPositions] = useState([]);

  const [isPositionsLoaded, setIsPositionsLoaded] = useState(false);

  // let {companyName, maxSalary, minSalary, deadline, jobPositionId} = ["","","","",null]
  useEffect(() => {
    let postingService = new JobPostingService();
    let positionService = new JobPositionService();
    postingService
      .getPostings()
      .then((result) => setPostings(result.data.data));
    positionService
      .getPositions()
      .then((result) => setPositions(result.data.data))
      .then((_) => setIsPositionsLoaded(true));
    window.scrollTo(0, 0);
  }, []);

  let handleMenuClick = (index) => {
    if (index === activeIndex) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  let handleInput = (event, data) => {
    console.log(data);
    console.log(event);
  }
  return (
    <div>
      <Grid container className="mt-2">
        <Grid.Row>
          <Grid.Column width={4}>
            <Menu vertical inverted color="teal" as={Accordion} className="pt-1">
              <Menu.Header as={Label} className="text-left" color="violet">
                Filtreleme
              </Menu.Header>
              <Menu.Item>
                <Accordion.Title
                  index={0}
                  active={activeIndex === 0}
                  onClick={() => handleMenuClick(0)}
                >
                  <Icon name="dropdown" />
                  Firma Adı
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 0}>
                  <Input
                    placeholder="Firma Adını Giriniz"
                    size="small"
                    className="mt-2"
                    onChange={handleInput}
                    name="companyName"
                  />
                  <Button color="blue" className="mt-2">
                    Getir
                  </Button>
                </Accordion.Content>
              </Menu.Item>
              <Menu.Item>
                <Accordion.Title
                  index={1}
                  active={activeIndex === 1}
                  onClick={() => handleMenuClick(1)}
                >
                  <Icon name="dropdown" />
                  Maaş Skalası
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 1}>
                  <Input placeholder="Minimum" className="mt-2" name="minSalary"/>
                  <Input placeholder="Maximum" className="mt-2" name="maxSalary"/>
                  <Button color="blue" className="mt-2">
                    Getir
                  </Button>
                </Accordion.Content>
              </Menu.Item>
              <Menu.Item>
                <Accordion.Title
                  index={2}
                  active={activeIndex === 2}
                  onClick={() => handleMenuClick(2)}
                >
                  <Icon name="dropdown" />
                  Son Başvuru Tarihi
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 2}>
                  <Input className="mt-2" type="date" name="deadline" />
                  <Button color="blue" className="mt-2">
                    Getir
                  </Button>
                </Accordion.Content>
              </Menu.Item>
              <Menu.Item>
                <Accordion.Title
                  index={3}
                  active={activeIndex === 3}
                  onClick={() => handleMenuClick(3)}
                >
                  <Icon name="dropdown" />
                  İş Pozisyonu
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 3}>
                  <Select
                    placeholder={isPositionsLoaded ? "İş Pozisyonu" : "Pozisyonlar Yükleniyor..."}
                    as={Input}
                    size="small"
                    loading={!isPositionsLoaded}
                    options={positions.map((position, _) => {
                      return {
                        key: position.id,
                        value: position.id,
                        text: position.jobPositionName,
                      };
                    })}
                    
                  />
                  <Button color="blue" className="mt-2">
                    Getir
                  </Button>
                </Accordion.Content>
              </Menu.Item>
            </Menu>
          </Grid.Column>
          <Grid.Column width={12}>
            <Table celled inverted>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Firma Adı</Table.HeaderCell>
                  <Table.HeaderCell>Pozisyonu</Table.HeaderCell>
                  <Table.HeaderCell>Boş Pozisyon</Table.HeaderCell>
                  <Table.HeaderCell>
                    Son Başvuru Tarihi (GG-AA-YYYY)
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {postings.map((posting) => {
                  posting.deadline = new Date(posting.deadline);
                  return (
                    <Table.Row key={posting.id}>
                      <Table.Cell>{posting.companyName}</Table.Cell>
                      <Table.Cell>{posting.jobPositionName}</Table.Cell>
                      <Table.Cell>{posting.vacancy}</Table.Cell>
                      <Table.Cell>
                        {posting.deadline.getDate() +
                          "-" +
                          (parseInt(posting.deadline.getMonth()) + 1) +
                          "-" +
                          posting.deadline.getUTCFullYear()}
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
