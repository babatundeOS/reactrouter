import { useContext } from 'react';
import DataContext from './context/DataContext';

const Nav = () => {
    const { search, setSearch } = useContext(DataContext);
    return (
        <header>
            <h1 className="Nav">Nav</h1>
            <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="search">Search Posts</label>
                <input
                    id="search"
                    type="text"
                    placeholder="Search Posts"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
        </header>
    )
}

export default Nav