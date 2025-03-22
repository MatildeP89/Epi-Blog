import { useAuth } from "../contexts/AuthContext.js";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
    const { user, logout } = useAuth();

    return (
        <Navbar bg="light" expand="lg">

            <Container>
                <Navbar.Brand href="/"> Epi Blogs </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/" className="nav-link"> Home </Link>
                        <Link to="/users" className="nav-link"> Users </Link>
                    </Nav>
                    <Nav>
                        {user && (
                        <Nav.Link as={Link} to="/posts/create"> Create new post </Nav.Link>
                        )}
                    </Nav>
                    <Nav>
                        {user ? (
                            <>
                                <span className="nav-link"> Benvenuto, {user.firstName} </span>
                                <Link to="/" className="nav-link" onClick={logout}> Log me out</Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login" > Login </Nav.Link>
                                <Nav.Link as={Link} to="/register" > Register </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;