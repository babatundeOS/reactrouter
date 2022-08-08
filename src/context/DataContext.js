import { createContext, useState, useEffect } from "react";
import { format } from 'date-fns';
import api from '../api/posts';
import useAxiosFetch from '../hooks/useAxiosFetch';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [post, setPost] = useState([]);
    const [searchResults, setSearchResults] = useState([])
    const [search, setSearch] = useState('');
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');

    const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');

    useEffect(() => {
        setPost(data);
    }, [data])

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
        <DataContext.Provider value={{
            search, setSearch, searchResults, fetchError, isLoading,
            handleSubmit, postTitle, setPostTitle, postBody, setPostBody,
            post, handleEdit, editBody, setEditBody, editTitle, setEditTitle,
            handleDelete
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;