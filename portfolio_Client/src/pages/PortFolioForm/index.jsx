import React from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import "./style.css";

const PortfolioForm = () => {

    const navigate = useNavigate();

    const initialValues = {
        firstName: "",
        lastName: "",
        birthdate: null,
        gender: "",
        location: "",
        education: "",
        experience: "",
        university: "",
        email: "",
        currentPosition: "",
        skills: [{ skill: "", description: "" }],
    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, "Minimum 2 characters required")
            .max(50, "Maximum 50 characters allowed")
            .required("Required First name"),
        lastName: Yup.string()
            .min(2, "Minimum 2 characters required")
            .max(50, "Maximum 50 characters allowed")
            .required("Required Last name"),
        birthdate: Yup.date().nullable().required("Please select Date"),
        gender: Yup.string().required("Please select gender"),
        location: Yup.string().required("Required Location"),
        education: Yup.string().required("Required Education"),
        university: Yup.string()
            .min(2, "Minimum 2 characters required")
            .max(50, "Maximum 50 characters allowed")
            .required("Required university"),
        experience: Yup.string().required("Please Enter Experience"),
        email: Yup.string().email("Invalid email").required("Required Email"),
        currentPosition: Yup.string()
            .min(2, "Minimum 2 characters")
            .max(50, "Maximum 50 characters")
            .required("Please Enter current position"),
        skills: Yup.array()
            .of(
                Yup.object().shape({
                    skill: Yup.string()
                        .min(2, "Minimum 2 characters")
                        .max(50, "Maximum 50 characters")
                        .required("Please Enter Your Skill"),
                    description: Yup.string()
                        .min(2, "Minimum 2 characters")
                        .max(500, "Maximum 500 characters")
                        .required("Required Description"),
                })
            )
            .min(1, "At least one skill is required")
            .required("Please enter skills"),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values, action) => {
            action.resetForm();
            axios
                .post("http://localhost:3001/portfolio", values)
                .then((res) => {
                    // console.log(res.data);
                    // console.log(res.data.data.portfolio._id)
                    const id = res.data.data.portfolio._id;
                    navigate(`/success/${id}`);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    });

    const addSkill = () => {
        formik.setFieldValue("skills", [
            ...formik.values.skills,
            { skill: "", description: "" },
        ]);
    };

    const handleSkillChange = (index, field, event) => {
        const updatedSkills = [...formik.values.skills];
        updatedSkills[index][field] = event.target.value;
        formik.setFieldValue("skills", updatedSkills);
    };

    const removeSkill = (index) => {
        const updatedSkills = [...formik.values.skills];
        updatedSkills.splice(index, 1);
        formik.setFieldValue("skills", updatedSkills);
    };

    return (
        <div className="text-dark bg-container py-5">
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} md={6}>
                        <Form
                            onSubmit={formik.handleSubmit}
                            className="bg-light p-4 rounded shadow"
                        >
                            <Row>
                                <Col xs={12} md={6}>
                                    <Form.Group controlId="firstName">
                                        <Form.Label>First name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="First name"
                                            name="firstName"
                                            value={formik.values.firstName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            isInvalid={
                                                formik.touched.firstName && formik.errors.firstName
                                            }
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.firstName}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Group controlId="lastName">
                                        <Form.Label>Last name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Last name"
                                            name="lastName"
                                            value={formik.values.lastName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            isInvalid={
                                                formik.touched.lastName && formik.errors.lastName
                                            }
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.lastName}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={6}>
                                    <Form.Group controlId="birthdate">
                                        <Form.Label>Birthdate</Form.Label>
                                        <DatePicker
                                            selected={formik.values.birthdate}
                                            onChange={(date) =>
                                                formik.setFieldValue("birthdate", date)
                                            }
                                            dateFormat="dd-MM-yyyy"
                                            className="form-control"
                                            placeholderText="Select birthdate"
                                            // showYearDropdown
                                            // scrollableYearDropdown
                                            yearDropdownItemNumber={100}
                                            maxDate={new Date()}
                                        />
                                        {formik.touched.birthdate && formik.errors.birthdate && (
                                            <div className="invalid-feedback d-block">
                                                {formik.errors.birthdate}
                                            </div>
                                        )}
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Group controlId="gender">
                                        <Form.Label>Gender</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="gender"
                                            value={formik.values.gender}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            isInvalid={formik.touched.gender && formik.errors.gender}
                                        >
                                            <option value="">Select gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.gender}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={6}>

                                    <Form.Group controlId="education">
                                        <Form.Label>Education</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Education"
                                            name="education"
                                            value={formik.values.education}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            isInvalid={
                                                formik.touched.education && formik.errors.education
                                            }
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.education}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Group controlId="university">
                                        <Form.Label>University</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="University"
                                            name="university"
                                            value={formik.values.university}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            isInvalid={
                                                formik.touched.university &&
                                                formik.errors.university
                                            }
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.university}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={6}>
                                    <Form.Group controlId="currentPosition">
                                        <Form.Label>Current position</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Current position"
                                            name="currentPosition"
                                            value={formik.values.currentPosition}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            isInvalid={
                                                formik.touched.currentPosition &&
                                                formik.errors.currentPosition
                                            }
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.currentPosition}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                </Col>
                                <Col xs={12} md={6}>

                                    <Form.Group controlId="experience">
                                        <Form.Label>Experience</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Experience"
                                            name="experience"
                                            value={formik.values.experience}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            isInvalid={
                                                formik.touched.experience && formik.errors.experience
                                            }
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.experience}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={6}>
                                    <Form.Group controlId="email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Email"
                                            name="email"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            isInvalid={formik.touched.email && formik.errors.email}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Group controlId="location">
                                        <Form.Label>Location</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Location"
                                            name="location"
                                            value={formik.values.location}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            isInvalid={
                                                formik.touched.location && formik.errors.location
                                            }
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.location}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group controlId="skills">
                                <Form.Label>Skills</Form.Label>
                                {formik.values.skills.map((skill, index) => (
                                    <Row key={index} className="skill-field">
                                        <Col xs={12} md={4} className="mb-3">
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter skill"
                                                name={`skills[${index}].skill`}
                                                value={skill.skill}
                                                onChange={(event) =>
                                                    handleSkillChange(index, "skill", event)
                                                }
                                                onBlur={formik.handleBlur}
                                                isInvalid={
                                                    formik.touched.skills &&
                                                    formik.errors.skills &&
                                                    formik.errors.skills[index] &&
                                                    formik.errors.skills[index].skill
                                                }
                                            />

                                        </Col>
                                        <Col xs={12} md={4} className="mb-3">
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter description"
                                                name={`skills[${index}].description`}
                                                value={skill.description}
                                                onChange={(event) =>
                                                    handleSkillChange(index, "description", event)
                                                }
                                                onBlur={formik.handleBlur}
                                                isInvalid={
                                                    formik.touched.skills &&
                                                    formik.errors.skills &&
                                                    formik.errors.skills[index] &&
                                                    formik.errors.skills[index].description
                                                }
                                            />

                                        </Col>
                                        <Col xs={12} md={2}>
                                            {index >= 0 && (
                                                <Button
                                                    variant="danger"
                                                    onClick={() => removeSkill(index)}
                                                    className="mb-2"
                                                >
                                                    Remove
                                                </Button>
                                            )}
                                        </Col>
                                    </Row>
                                ))}
                                <Button variant="success" onClick={addSkill} className="mt-3">
                                    Add Skill
                                </Button>
                            </Form.Group>
                            <div className="d-flex justify-content-center">
                                <Button variant="primary" type="submit" className="mt-3">
                                    Submit form
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default PortfolioForm;
