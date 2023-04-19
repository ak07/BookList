import React from 'react';
import "./Messages.css";

export const Loading = () => {
  return (
    <div className='center-message'>
        Loading...
    </div>
  )
}

export const EmptyResult = () => {
  return (
    <div className='center-message'>
        No results to display.
    </div>
  )
}

export const ErrorResult = () => {
  return (
    <div className='center-message'>
        Some Error happened. Please refresh and try again.
    </div>
  )
}

