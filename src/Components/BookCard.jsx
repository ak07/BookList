import React, { useState } from 'react'
import useToggle from '../CustomHooks/UseToggle';
import placeholder from "../assets/book-cover-placeholder.png"
import "./BookCard.css"

function BookCard(props) {
  const [expandDetails, setExpandDetails] = useToggle();
  let {title, authors, description, imageLinks, publishedDate, publisher} = props.bookInfo;
  console.log(props.bookInfo);
  let authorString = authors?.reduce((prev, curr)=>{
    return prev+", "+curr;
  });
  console.log(authorString);
  let coverImage = imageLinks? imageLinks.smallThumbnail:null;


  return (
    <div className='bookCard'>
      <div className="bookCard_img">
       <img src={coverImage?coverImage:placeholder} alt="Cover Image" className="coverImage" />
      </div>
      <div className="bookCard_details">
        <h2 className="title">{title}</h2>
        <p className="author">Authors :{authorString}</p>
        <p className='bookCard_button' onClick={setExpandDetails}>{expandDetails?"Hide ":"Show "}Details</p>
        {
          expandDetails && 
          <div className="details">
            {description && <span className="desc">Description: {description}</span>}
            {publisher && <span className="publisher">Publisher: {publisher}</span>}
            {publishedDate && <span className="publishedDate">Published Date: {publishedDate}</span>}
          </div>
        }
      </div>
    </div>
  )
}

export default BookCard