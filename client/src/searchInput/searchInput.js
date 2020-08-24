import React from "react";

export default function SearchInput({ handleSubmit, textValue, setTextValue }) {
  return (
    <div className='Searchbar'>
      <form onSubmit={(e) => handleSubmit(e)} className='SearchForm'>
        <button type='submit' className='SearchForm-button'>
          <span className='SearchForm-button-label'>Search</span>
        </button>
        <input
          className='SearchForm-input'
          type='text'
          autoComplete='off'
          autoFocus
          placeholder='Search images and photos'
          value={textValue ?? ""}
          onChange={(e) => setTextValue(e.target.value)}
        />
      </form>
    </div>
  );
}
