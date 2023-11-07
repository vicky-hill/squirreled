import React, { useContext, useState, useEffect } from 'react'
import ItemContext from '@/context/ItemContext'

const Search = ({ }) => {
  const [value, setValue] = useState("");
  const { setSearch, items } = useContext(ItemContext);

  const onChange = e => {
    setValue(e.target.value);
  }

  useEffect(() => {
    if (value && items.length) {
      setSearch(items.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase()) || 
        item.description.toLowerCase().includes(value.toLowerCase()) ||
        item.category.toLowerCase().includes(value.toLowerCase()) ||
        item.location?.name.toLowerCase().includes(value.toLocaleLowerCase()) ||
        item.location?.description.toLowerCase().includes(value.toLocaleLowerCase())
      ))
    } else {
      setSearch(null);
    }
  }, [value])

  return (
    <input
      placeholder='Find anything...'
      type="text"
      className='shadow-sm text-black font-normal rounded-full focus:outline-none py-2 px-5 w-72 lg:w-96 ml-64'
      onChange={onChange}
      value={value}
    />
  )
}

export default Search;