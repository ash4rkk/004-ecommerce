import { Search } from 'lucide-react'
import React from 'react'

function SearchBar() {
  return (
    <div className='bg-surface active:scale-95 hover:bg-surface-2 p-2 md:p-3 md:rounded-xl rounded-md hover:cursor-pointer'>
      <Search className='w-4 text-ink  hoverEffect h-4 hover:text-accent-p'/>
    </div>
  )
}

export default SearchBar