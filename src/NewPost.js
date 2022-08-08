import { useNavigate, useParams } from "react-router-dom";
import { useContext } from 'react';
import DataContext from './context/DataContext';

const NewPost = () => {
    const { handleSubmit, postTitle, setPostTitle, postBody, setPostBody } = useContext(DataContext);

    let navigate = useNavigate();
    let { postname } = useParams();
    return (
        <main className="NewPost">
            <h1>NewPost for {postname}</h1>
            <button onClick={() => {
                navigate("/about");
            }}>Change to about page</button>

            <form className="newPostForm" onSubmit={handleSubmit}>
                <label htmlFor="postTitle">Title:</label>
                <input
                    id="postTitle"
                    type="text"
                    required
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                />
                <label htmlFor="postBody">Post:</label>
                <textarea
                    id="postBody"
                    required
                    value={postBody}
                    onChange={(e) => setPostBody(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
        </main>
    )
}

export default NewPost