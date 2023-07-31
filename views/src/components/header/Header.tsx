// import React from 'react'

const Header = () => {
  return (
    <div className='flex items-center justify-between flex-wrap space-x-2 w-full'>
      {/* logo */}
      <h1 className='text-white font-borel h-3'>SHOPEDIA</h1>
      {/* search */}
      <input
        className='outline-none hidden rounded-md px-2 md:block md:grow'
        type='text'
        name='search'
        placeholder='Search videos you are looking for'
        id='search'
      />
      <img
        className='w-7 h-7 cursor-pointer hover:bg-slate-500 rounded-md transition duration-150 ease-in-out p-1'
        src='/search/search-icon.png'
        alt='search'
      />
      {/* profile */}
      <img
        className='w-7 hidden md:block'
        src='/profile-pictures/pp.png'
        alt='profile-picture'
      />
    </div>
  );
};

export default Header;
