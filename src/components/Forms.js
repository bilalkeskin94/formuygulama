import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from "reactstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
// const initialValues = {
//   first: "",
//   last: "",
//   phone: "",
//   email: "",
//   url: "",
//   company: "",
//   am: false,
//   pm: false,
//   pref: "",
//   send: "",
//   ok: false,
// };
const validationSchema = Yup.object().shape({
  first: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  last: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
  url: Yup.string()
    .matches(
      /^((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Enter correct url!"
    )
    .required("Please enter website"),
});

class Forms extends Component {
  render() {
    return (
      <div>
        <Formik
          initialValues={{
            first: "",
            last: "",
            phone: "",
            email: "",
            url: "",
            company: "",
            am: false,
            pm: false,
            pref: "",
            send: "",
            ok: false,
          }}
          validationSchema={validationSchema}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            resetForm({});
          }}
        >
          {({
            values,
            errors,
            touched,
            resetForm,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
            setSubmitting,

            /* and other goodies */
          }) => (
            <Form onSubmit={handleSubmit}>
              <Container>
                <h2>Contact Us</h2>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="first">First Name</Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="first"
                        name="first"
                        value={values.first}
                        onChange={handleChange}
                        invalid={errors.first}
                      />
                      {errors.first && (
                        <FormFeedback>
                          İsminiz 1'den fazla 50 karakterden az olmalı
                        </FormFeedback>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="last">Last Name</Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="last"
                        value={values.last}
                        onChange={handleChange}
                        invalid={errors.last}
                      />
                      {errors.last && (
                        <FormFeedback>
                          Lütfen geçerli bir telefon numarası girin.
                        </FormFeedback>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="company">Company</Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder=""
                        id="company"
                        value={values.company}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="phone">Phone Number</Label>
                      <Input
                        type="tel"
                        className="form-control"
                        id="phone"
                        value={values.phone}
                        onChange={handleChange}
                        invalid={errors.phone}
                      />
                      {errors.phone && (
                        <FormFeedback>
                          Lütfen geçerli bir telefon numarası girin.
                        </FormFeedback>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="email">Email address</Label>
                      <Input
                        type="email"
                        className="form-control"
                        id="email"
                        value={values.email}
                        onChange={handleChange}
                        invalid={errors.email}
                      />
                      {errors.email && (
                        <FormFeedback>
                          Lütfen geçerli bir e-mail adresi girin.
                        </FormFeedback>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="url">
                        Your Website <small>Please include http://</small>
                      </Label>
                      <Input
                        type="url"
                        className="form-control"
                        id="url"
                        value={values.url}
                        onChange={handleChange}
                        invalid={errors.url}
                      />
                      {errors.url && (
                        <FormFeedback>
                          Lütfen geçerli bir web sitesi girin.
                        </FormFeedback>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Label for="contact-preference" className="radio">
                  When is the best time of day to reach you?
                  <div className="radio">
                    <Label>
                      <Input
                        type="radio"
                        name="contact-preference"
                        id="contact-preference"
                        value={values.am}
                        onChange={() => setFieldValue("am", true)}
                        checked
                      />{" "}
                      Morning
                    </Label>
                  </div>
                  <Label for="contact-preference" className="radio">
                    <div className="radio">
                      <Label>
                        <Input
                          type="radio"
                          name="contact-preference"
                          id="contact-preference"
                          value={values.pref}
                          onChange={() => setFieldValue("am", true)}
                          checked
                        />{" "}
                        Evening
                      </Label>
                    </div>
                  </Label>
                </Label>
                <Row>
                  <Col>
                    <Label for="newsletter">
                      Would you like to receive our email newsletter?
                    </Label>
                    <div className="checkbox">
                      <Label>
                        <Input
                          type="checkbox"
                          value={values.ok}
                          id="newsletter"
                          onChange={() => {
                            setFieldValue("ok", true);
                          }}
                        />
                        Sure!
                      </Label>
                    </div>
                    <Button
                      type="submit"
                      className="btn btn-primary"
                      onChange={handleChange}
                      value={values.send}
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default Forms;
