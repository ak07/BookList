import { useEffect, useState } from 'react';


const preProcessFetchResult = (jsonResult) =>{

    if(jsonResult.items?.length > 0){
        let resultItems = jsonResult.items;
        let processedResult = resultItems.map(resultItem => {
            let {title, authors, imageLinks, description, publisher, publishedDate } = resultItem.volumeInfo;
            return {
                title, 
                authors, 
                imageLinks, 
                description, 
                publisher, 
                publishedDate
            }
        });
        return processedResult;
    }

    return [];

}

const useBookApi = (query) => {
    let url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${import.meta.env.VITE_API_KEY}`;

    const [bookData, setBookData] = useState([]);
    const [isloading, setIsLoading] = useState(false);
   
    useEffect(()=>{
        if(query == null || query == ""){
            setBookData([]);
            return
        }
        setIsLoading(true)        
        let abortController = new AbortController()
        fetch(url,{
            signal:abortController.signal
        })
        .then(result => result.json())
        .then(jsonResult => {
            setBookData(preProcessFetchResult(jsonResult));
            setIsLoading(false);
        })
        .catch(err => {
            console.log(err);
            setIsLoading(false);
        });
        return () => abortController.abort();
    },[query]);

    return [isloading, bookData];
}

export default useBookApi;