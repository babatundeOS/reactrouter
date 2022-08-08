import { useParams, Link } from "react-router-dom";
import { useContext } from 'react';
import DataContext from './context/DataContext';

const PostPage = () => {
    const { post, handleDelete } = useContext(DataContext);

    const { id } = useParams();
    const postal = post.find(post => (post.id).toString() === id);
    return (
        <main className="PostPage">
            <article className="post">
                {postal &&
                    <>
                        <h2>{post.title}</h2>
                        <p className="postDate">{postal.datetime}</p>
                        <p className="postBody">{postal.body}</p>
                        <Link to={`/edit/${postal.id}`}> <button className="editButton"> Edit Post</button></Link>
                        <button onClick={() => handleDelete(postal.id)}>
                            Delete Post
                        </button>
                    </>
                }
                {!postal &&
                    <>
                        <h2>Post Not found</h2>
                        <p>
                            <Link to='/'>Visit Our Home Page</Link>
                        </p>
                    </>
                }
            </article>
        </main>
    )
}

export default PostPage