import React from "react";
import {
  Card,
  Row,
  CardHeader,
  Col,
  CardTitle,
  CardBody,
  Label,
} from "reactstrap";
import { ButtonGroup, Button } from "@material-ui/core";

import { BackgroundColorContext } from "contexts/BackgroundColorContext";
import { backgroundColors } from "contexts/BackgroundColorContext";

import { ThemeContext } from "contexts/ThemeContext";
import { themes } from "contexts/ThemeContext";
import { Brightness4, Brightness7 } from "@material-ui/icons";
export default function Settings() {

  let getCurrentBackgroundTheme = (color) => {
    console.log(color);
    if (color === backgroundColors.primary){
      return "Pembe";
    }else if(color === backgroundColors.blue){
      return "Mavi";
    }else if (color === backgroundColors.green){
      return "Yeşil";
    }else return "Hata";
  }
  return (
    <>
      <div className="content">
        <Card>
          <CardHeader>
            <Row>
              <Col xs="6" className="text-left">
                <h5 className="card-category">Ayarlar</h5>
              </Col>
              <Col xs="6" className="text-right">
                <CardTitle tag="h3">Tema Ayarları</CardTitle>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <ThemeContext.Consumer>
              {({ theme, changeTheme }) => (
                <Row>
                  <Col xs="4" className="text-left">
                    <Label tag="h3">Uygulama Teması ({theme === themes.dark ? "Karanlık" : "Aydınlık"})</Label>
                  </Col>
                  <Col xs="8" className="text-center">
                    <ButtonGroup
                      aria-label="outlined primary button group"
                      variant="contained"
                    >
                      <Button
                        color={theme === themes.light ? "secondary" : "primary"}
                        startIcon={<Brightness7 />}
                        onClick={() => changeTheme(themes.light)}
                      >
                        Aydınlık
                      </Button>
                      <Button
                        color={theme === themes.dark ? "secondary" : "primary"}
                        startIcon={<Brightness4 />}
                        onClick={() => changeTheme(themes.dark)}
                      >
                        Karanlık
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              )}
            </ThemeContext.Consumer>
            <BackgroundColorContext.Consumer>
              {({color, changeColor}) => (
                <Row className="mt-3">
                  <Col xs="4" className="text-left">
                    <Label tag="h3">Uygulama Yan Teması ({getCurrentBackgroundTheme(color)})</Label>
                  </Col>
                  <Col xs="8" className="text-center">
                    <ButtonGroup
                      aria-label="outlined primary button group"
                      variant="contained"
                    >
                      <Button
                        color={color === backgroundColors.primary ? "secondary" : "primary"}
                        onClick={() => changeColor(backgroundColors.primary)}
                      >
                        Pembe
                      </Button>
                      <Button
                        color={color === backgroundColors.blue ? "secondary" : "primary"}
                        onClick={() => changeColor(backgroundColors.blue)}
                      >
                        Mavi
                      </Button>
                      <Button
                        color={color === backgroundColors.green ? "secondary" : "primary"}
                        onClick={() => changeColor(backgroundColors.green)}
                      >
                        Turkuaz
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              )}
            </BackgroundColorContext.Consumer>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
