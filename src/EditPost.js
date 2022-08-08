import { useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import DataContext from './context/DataContext';


const EditPost = () => {
    const { post, handleEdit, editBody, setEditBody, editTitle, setEditTitle } = useContext(DataContext);
    const { id } = useParams();
    const postal = post.find(post => (post.id).toString() === id);

    useEffect(() => {
        if (postal) {
            setEditTitle(postal.title);
            setEditBody(postal.body);
        }
    }, [postal, setEditTitle, setEditBody])

    return (
        <main className="NewPost">
            {editTitle &&
                <>
                    {/* <h1>NewPost for {postname}</h1> */}
                    <button onClick={() => {
                        // navigate("/about");
                    }}>Change to about page</button>

                    <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="editTitle">Title:</label>
                        <input
                            id="editTitle"
                            type="text"
                            required
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <label htmlFor="postBody">Post:</label>
                        <textarea
                            id="editBody"
                            required
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                        />
                        <button type="submit" onClick={() => handleEdit(postal.id)}>Submit</button>
                    </form>
                </>
            }
            {!editTitle &&
                <>
                    <h2>Post Not Found</h2>
                    <p>Well, that's dissapointing.</p>
                    <p>
                        <Link to='/'>Visit Our Homepage</Link>
                    </p>
                </>
            }
        </main>
    )
}

export default EditPost