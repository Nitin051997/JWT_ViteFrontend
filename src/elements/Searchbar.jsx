import React, { useRef } from 'react';
import '../css/Searchbar.css';
import SearchIcon from '@mui/icons-material/Search';

const Searchbar = (props) => {

    const inputRef = useRef(null);

    const handleClick = () => {
        inputRef?.current?.focus();
    }

  return (
    <div className='app-search-bar' onClick={handleClick} title={props?.title}>
        <SearchIcon className='app-search-bar-icon'/>
        <input value={props?.value} onChange={(event) => props?.onChange({type: "handleSearch", value: event.target.value })} ref={inputRef} className='app-search-bar-input' type='text' placeholder={props?.placeholder || 'Search...'} />
    </div>
  )
}

export default Searchbar;