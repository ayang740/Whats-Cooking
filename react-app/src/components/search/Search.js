import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useHistory } from 'react-router-dom'
import './search.css'

export default function Search() {

    const [searchInput, setSearchInput] = useState("");
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault()
        history.push(`/recipes/searched/${searchInput.toLowerCase()}`)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='search-input-wrapper'>
                <div className='search-symbol'>
                    <FaSearch className='search-symbol'></FaSearch>
                </div>
                <input 
                    className='search-input'
                    type='text'
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
            </div>
        </form>
    )
}