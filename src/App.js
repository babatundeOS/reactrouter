import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import About from './About';
import PostPage from './PostPage';
import EditPost from './EditPost';
import Missing from './Missing';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { DataProvider } from './context/DataContext';

function App() {

  return (
    <div className='App'>
      <Header title="React JS Blog" />
      <DataProvider>
        <Nav />
        <Router>
          <nav>
            <Link to="/"> Home </Link>
            <Link to="/new-post"> New Post </Link>
            <Link to="/about"> About </Link>
          </nav>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/new-post" element={<NewPost />} />
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Missing />} />
          </Routes>
        </Router>
      </DataProvider>
      <Footer />
    </div>
  );
}

export default App;
