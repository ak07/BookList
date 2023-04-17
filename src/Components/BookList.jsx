import React, { useRef, useState } from 'react';

import BookCard from "./BookCard";
import useBookApi from '../CustomHooks/useBookApi';
import "./BookList.css";

function BookList() {
  const [searchQuery, setSearchQuery] = useState("");
  const searchTextRef = useRef();
  const [bookData] = useBookApi(searchQuery);
  const bookList = bookData.map((bookInfo,index) => {
    return <BookCard key={index} bookInfo={bookInfo}/>
  });

  const onSearchClicked = (e) => {
    e.preventDefault();
    setSearchQuery(searchTextRef.current.value);
    console.log(searchTextRef.current.value);
  }

  const onResetClicked = () => {
    setSearchQuery("");
  }

  return (
    <div className='bookList'>
      <div className="bookList_Searchbar">
        <form onSubmit={onSearchClicked} onReset={onResetClicked} method="post">
            <input type="text" name="query"  ref={searchTextRef} />
            <button type="submit">Search</button>
            <button type="reset">Reset</button>
        </form>
      </div>
      <div className='bookList_Searchresult'>
        {bookList}
      </div>
    </div>
  )
}

export default BookList




