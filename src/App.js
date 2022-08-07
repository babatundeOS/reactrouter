import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import About from './About';
import Missing from './Missing';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PostPage from './PostPage';
import { format } from 'date-fns';
import api from './api/posts';
import EditPost from './EditPost';
import useWindowSize from './hooks/useWindowSize';
import useAxiosFetch from './hooks/useAxiosFetch';

function App() {
  const [post, setPost] = useState([]);
  const [searchResults, setSearchResults] = useState([])
  const [search, setSearch] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const { width } = useWindowSize();

  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts')


  useEffect(() => {
    setPost(data);
  }, [data])

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await api.get('/posts');
  //       setPost(response.data);
  //     } catch (error) {
  //       if (error.response) {
  //         console.log(error.response.data);
  //         console.log(error.response.status);
  //         console.log(error.response.headers);
  //       } else {
  //         console.log(`Error: ${error.message}`)
  //       }
  //     }
  //   }
  //   fetchPosts();
  // }, [])

  useEffect(() => {
    const filteredResults = post.filter((post) =>
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()));

    setSearchResults(filteredResults.reverse());
  }, [post, search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = post.length ? post[post.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody }
    try {
      const response = await api.post('/posts', newPost);
      const allPosts = [...post, response.data];
      setPost(allPosts);
      setPostTitle('');
      setPostBody('');
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }

  }

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = { id, title: editTitle, datetime, body: editBody }
    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPost(post.map(post => post.id === id ? { ...response.data } : post));
      setEditTitle('');
      setEditBody('');
      // history.pushState('/');
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }


  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const postsList = post.filter(post => post.id !== id);
      setPost(postsList);
      // <Route path="/post/:id" element={<Navigate to="/" />} />
      // navigate('/');
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }

  }

  return (
    <div className='App'>
      <Header title="React JS Blog" width={width} />
      <Nav search={search} setSearch={setSearch} />
      <Router>
        <nav>
          <Link to="/"> Home </Link>
          <Link to="/new-post"> New Post </Link>
          <Link to="/about"> About </Link>
        </nav>
        <Routes>
          <Route path="/"
            element={
              <Home
                posts={searchResults}
                fetchError={fetchError}
                isLoading={isLoading}
              />
            }
          />
          {/* <Route path="/new-post/:postname" element={<NewPost />} /> */}
          <Route path="/new-post"
            element={
              <NewPost
                handleSubmit={handleSubmit}
                postTitle={postTitle}
                setPostTitle={setPostTitle}
                postBody={postBody}
                setPostBody={setPostBody}
              />
            }
          />
          <Route path="/edit/:id"
            element={
              <EditPost
                posts={post}
                handleEdit={handleEdit}
                editTitle={editTitle}
                setEditTitle={setEditTitle}
                editBody={editBody}
                setEditBody={setEditBody}
              />
            }
          />
          <Route path="/post/:id" element={<PostPage posts={post} handleDelete={handleDelete} />} />
          <Route path="/edit/:id" element={<EditPost posts={post} handleDelete={handleDelete} />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
