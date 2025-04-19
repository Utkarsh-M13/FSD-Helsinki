import React from 'react'

const Search = ({search, setSearch}) => {
  return (
    <div>Search: <input type="text" value={search} onChange={(event) => setSearch(event.target.value)}/></div>
  )
}

export default Search