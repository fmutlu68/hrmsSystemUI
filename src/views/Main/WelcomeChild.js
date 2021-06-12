import React from "react";
import { NavLink } from "react-router-dom";
import { Segment, Grid, Header, Image, Button } from "semantic-ui-react";

import png from "../../assets/img/career_2.jpg";
export default function WelcomeChild() {
  return (
    <div>
      <Segment style={{ padding: "8em 0em" }} vertical>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as="h3" style={{ fontSize: "2em" }}>
                Kariyerinizi İnşa Edebileceğiniz En İyi Yer!
              </Header>
              <p style={{ fontSize: "1.33em", color: "black" }}>
                Geniş İş Veren Ağımızla Hayalinizideki İşe Ulaşabileceğiniz En
                İyi Yer. Kariyerinizin Basamaklarını Birlkte Tırmanalım.
              </p>
              <Grid.Row textAlign="center">
                <Button size="huge" color="teal" as={NavLink} to="/main/postings">
                    İş İlanlarını Listele
                </Button>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column floated="right" width={6}>
              <Image bordered rounded size="large" src={png} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
}
