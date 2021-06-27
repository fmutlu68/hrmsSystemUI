import React from "react";

import PropTypes from "prop-types";

import * as Yup from "yup";
import {Formik, Form} from "formik";

import GridContainer from "../EmployerUser/Grid/GridContainer";
import GridItem from "../EmployerUser/Grid/GridItem";
import Card from "../EmployerUser/Card/Card";
import CardHeader from "../EmployerUser/Card/CardHeader";
import CardBody from "../EmployerUser/Card/CardBody";
import Button from "components/CustomButtons/Button.js";

import HrmsSystemCustomInput from "./HrmsSystemCustomInput";

import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import {AccordionDetails} from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";


export default function HrmsSystemCustomMultiInput({...props}) {
    let {inputComponents, initialValues, selectedItems, styles, validationSchema, accordions, handleSubmit, title} = props;
    const [selectedStates, setSelectedStates] = React.useState(selectedItems);
    const schema = Yup.object(validationSchema);
    return (
        <Card>
            <CardHeader color="rose">
                <h4 className={styles.cardTitleWhite}>{title}</h4>
            </CardHeader>
            <CardBody>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={5}>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={schema}
                            onSubmit={(values => {
                                handleSubmit(values);
                                setSelectedStates([...selectedStates, values]);
                            })}
                        >
                            {formProps => {
                                return (
                                    <Form className="ui form">
                                        {inputComponents.map((component) => {
                                            return <HrmsSystemCustomInput name={component.name}
                                                                          placeholder={component.placeHolder}/>
                                        })}
                                        <Button variant="contained" color="primary" onClick={(e) => formProps.handleSubmit(e)}>Ekle</Button>
                                        <Button variant="contained" color="primary" onClick={() => formProps.resetForm()}>Alanları Temizle</Button>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                        <div>
                            {accordions(selectedStates).map(accordion => {
                                return (
                                    <Accordion className="bg-info">
                                        <AccordionSummary>
                                            <Typography>{accordion.name}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Button
                                                onClick={() => setSelectedStates(selectedStates.filter(item => item !== accordion.value))}
                                                color="danger">SİL</Button>
                                        </AccordionDetails>
                                    </Accordion>
                                );
                            })}
                        </div>
                    </GridItem>
                </GridContainer>
            </CardBody>
        </Card>
    );
}
HrmsSystemCustomMultiInput.propTypes = {
    inputComponents: PropTypes.array,
    initialValues: PropTypes.object,
    selectedItems: PropTypes.array,
    styles: PropTypes.object,
    validationSchema: PropTypes.object,
    handleSubmit: PropTypes.func,
    accordions: PropTypes.func
}
