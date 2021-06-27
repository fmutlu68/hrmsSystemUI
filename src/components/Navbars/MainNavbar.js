import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Container, Button, Icon } from "semantic-ui-react";

export default function MainNavbar({ getFixed }) {
  return (
    <div>
      <Menu
        fixed={getFixed.fixed ? "top" : null}
        inverted={!getFixed.fixed}
        pointing={!getFixed.fixed}
        secondary={!getFixed.fixed}
        size="large"
      >
        <Container>
          <Menu.Item as={NavLink} to="/main/welcome">
            Ana Sayfa
          </Menu.Item>
          <Menu.Item as={NavLink} to="/employer/home">
            Sık Sorulan Sorular
          </Menu.Item>
          <Menu.Item position="right">
            <Button
              primary
              icon
              labelPosition="left"
              as={NavLink}
              to="/main/login"
            >
              <Icon name="sign in" />
              Giriş Yap
            </Button>

            <Button
              color="green"
              icon
              labelPosition="right"
              className="ml-2"
              as={NavLink}
              to="/main/register"
            >
              <Icon name="sign in alternate" />
              Kayıt Ol
            </Button>
          </Menu.Item>
        </Container>
      </Menu>
    </div>
  );
}
