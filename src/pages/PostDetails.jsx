import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";

const PostDetails = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [post, setPost] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:3001/posts/${id}`);
                setPost(response.data);
                setError(null);
            } catch (err) {
                console.error("Error fetching post:", err);
                setError('Error while loading the page');
                setPost({});
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, [id]);

    return (
        <Container className="mt-5">
            {loading && <p>Loading post...</p>}
            {error && <p className="text-danger">{error}</p>}
            {post && post._id && (
                <Row>
                    <Col md={8}>
                        <h1>{post.title}</h1>
                        <p>{post.content}</p>

                    </Col>
                    <Col md={4}>
                        <img src={post.cover} alt={post.title} className="img-fluid rounded shadow" />
                    </Col>
                </Row>
            )}
        </Container>

    );
};

export default PostDetails;