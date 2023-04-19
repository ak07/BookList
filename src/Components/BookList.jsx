import React, { useRef, useState } from 'react';

import BookCard from "./BookCard";
import useBookApi from '../CustomHooks/useBookApi';
import {Loading, EmptyResult, ErrorResult } from './Messages';

import "./BookList.css";

function BookList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryType, setSearchQueryType] = useState("");
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const searchTypeRef = useRef();
  const searchTextRef = useRef();

  const [isDataLoading, isLoadingErrored, bookData] = useBookApi(searchQuery, searchQueryType);
  

  const onSearchClicked = (e) => {
    e.preventDefault();
    setSearchQuery(() => searchTextRef.current.value);
    setSearchQueryType(() => searchTypeRef.current.value);
    setIsSearchClicked(() => true);
  }

  const onResetClicked = () => {
    setSearchQuery("");
    setIsSearchClicked(false);
  }

  const getResultPageContents = () => {
    if(isSearchClicked){
      if(isDataLoading){
        return <Loading/>
      }else{
        if(isLoadingErrored){
          return <ErrorResult/>
        }else if(bookData.length <= 0){
          return <EmptyResult/>
        }else{
          return bookData.map((bookInfo,index) => <BookCard key={index} bookInfo={bookInfo}/>);
        }
      }
    }else{
      return "";
    }
  }

  return (
    <div className='bookList'>
      <div className="bookList_Searchbar">
        <form onSubmit={onSearchClicked} onReset={onResetClicked} method="post">
            <input type="text" name="query"  ref={searchTextRef} />
            <select name="searchType" id="" ref={searchTypeRef}>
              <option value="intitle">Title</option>
              <option value="inauthor">Author</option>
              <option value="isbn">ISBN</option>
            </select>
            <button type="submit">Search</button>
            <button type="reset">Clear</button>
        </form>
      </div>
      <div className='bookList_Searchresult'>
        {getResultPageContents()}
      </div>
    </div>
  )
}

export default BookList




