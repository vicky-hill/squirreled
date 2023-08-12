import React from 'react'

const Search = ({ onChange, value }) => {

    return (
        <input
          placeholder='Check existing nail polish'
          type="text"
          className='border border-stone-200 rounded-full focus:outline-none py-2 px-5 w-72 lg:w-96'
          onChange={onChange}
          value={value}
        />
    )
}

export default Search;