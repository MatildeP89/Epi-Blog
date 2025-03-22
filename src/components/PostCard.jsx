import { Card, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PostCard = ({ post }) => {

    const navigate = useNavigate();
    
 // Formatta il nome dell'autore
  const authorName = post.author ? `${post.author.firstName} ${post.author.lastName}` : 'Autore sconosciuto';


    return (
        <Card className="h-100 shadow-sm" style={{cursor: 'pointer'}} onClick={ () => navigate(`/posts/${post._id}`)} >
            <Card.Img variant="top" src={post.cover} style={{maxHeight:"200px", objectFit:"cover"}}/>
            <Card.Body>
                <div className='d-flex justify-content-between'>
                    <Badge bg="secondary"> {post.category} </Badge>
                    <small className="text-muted"> {post.readTime.value} {post.readTime.unit} </small>  
                </div> 

           <Card.Title>{post.title}</Card.Title>
           <Card.Text>{post.content.substring(0,150)}...</Card.Text>
           <Button variant="primary">Read More</Button>
           <Badge bg="dark" className='ms-2'> {authorName} </Badge>
            </Card.Body>
        </Card>
    );
}


export default PostCard;