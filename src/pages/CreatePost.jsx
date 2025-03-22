import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import PostCard from "../components/PostCard";

const CreatePost = () => {

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        cover: "",
        content: "",
        readTime: {
            value: "",
            unit: "minutes"
        }
    });

    const { user } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const postData = {
                ...formData,
                author: user._id
            };
            await axios.post("http://localhost:3001/posts", postData);

            navigate("/");
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    return (

        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col xs={12} md={6}>
                    <h2> Create a new post </h2>
                    {error && <Alert variant="danger"> {error} </Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter title"
                                value={formData.title}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    title: e.target.value
                                })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label> Category </Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.category}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    category: e.target.value
                                })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label> Cover </Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.cover}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    cover: e.target.value
                                })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.content}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    content: e.target.value
                                })} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Read time</Form.Label>
                            <Row>
                                <Col xs={8}>
                                    <Form.Control
                                        type="number"
                                        value={formData.readTime.value}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            readTime: {
                                                ...formData.readTime,
                                                value: e.target.value
                                            }
                                        })}
                                    />
</Col>
                                    <Col xs={4}>
                                        <Form.Select
                                            value={formData.readTime.unit}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                readTime: {
                                                    ...formData.readTime,
                                                    unit: e.target.value
                                                }
                                            })}>


                                            <option value="minutes"> minutes </option>
                                            <option value="hours"> hours </option>
                                        </Form.Select>


                                    </Col>
                            </Row>
                            </Form.Group>

                        <Button variant="primary" type="submit"> Create Post </Button>
                        </Form>
                        </Col>
                        </Row>
                        </Container>
                  )};


                  export default CreatePost;