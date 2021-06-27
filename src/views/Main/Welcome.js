import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Header } from "semantic-ui-react";
export default function Welcome() {
  return (
    <div>
      <Container text>
        <Header
          as="h5"
          content="Hoş Geldiniz"
          inverted
          style={{
            fontSize: "3em",
            marginBottom: 0,
            marginTop: "3em",
          }}
        />
        <Header
          as="h2"
          content="Hayalinizdeki İş İçin En Uygun Yer"
          inverted
          style={{
            fontSize: "1.7em",
            fontWeight: "normal",
            marginTop: "1.5em",
          }}
        />
        <Button primary size="huge" onClick={() => window.scrollTo(0, 701)} as={NavLink} to="/admin/home">
          Haydi Başlıyalım
        </Button>
      </Container>
    </div>
  );
}
