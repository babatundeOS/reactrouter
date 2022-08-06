import { Link } from "react-router-dom";

const Missing = () => {
    return (
        <main className="Missing">
            <h1>Page not Found</h1>
            <p>
                <Link to='/'>Visit our homepage</Link>
            </p>
        </main>
    )
}

export default Missing