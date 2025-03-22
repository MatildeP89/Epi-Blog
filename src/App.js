import './App.css';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import PostDetails from './pages/PostDetails';

function App () {

  return (

<Router>
<AuthProvider>
<Navbar/>
<Container>
<Routes>
<Route path="/" element={<Home />} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/posts/create" element={<CreatePost />} />
<Route path="/posts/:id" element={<PostDetails />} />

</Routes>
</Container>
</AuthProvider>
</Router>

  )};

export default App;
