import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import BookCard from "../components/book/BookCard";
import { useEffect, useState, useContext } from "react";
import { Api } from "../utils/Api";
import {  currentBooksEndpoint } from "../utils/Endpoint";
import commonContext from "../contexts/common/commonContext";

const CurrentBooks = () => {
  const [state, setState] = useState({
    featuredBooks: [],
    filteredBooks: [],
    searchOpen: false,
  });
  const searchedBook = useContext(commonContext);

  const currentProductsRequest = async () => {
    const { statusCode, data } = await Api.getCurrentBooks(
      currentBooksEndpoint,
      {}
    );
    if (statusCode === true) {
      setState((prevState) => ({
        ...prevState,
        featuredBooks: data?.productsData,
      }));
    }
  };

  useEffect(() => {
    currentProductsRequest();
  }, []);

  useEffect(() => {
    if (
      searchedBook.searchResults &&
      searchedBook.searchResults.length > 0
    ) {
  
      setState((prevState) => ({
        ...prevState,
        filteredBooks: searchedBook.searchResults.filter(
          (item) => item.products.productTag === "reading"
        ),
      }));
    } else if (
      searchedBook.searchResults &&
      searchedBook.searchResults.length === 0 &&
      searchedBook.isSearchOpen === true
    ) {
 
      setState((prevState) => ({ ...prevState, filteredBooks: [] }));
    }
    if (
      searchedBook.searchResults &&
      searchedBook.searchResults.categoriesData &&
      searchedBook.searchResults.categoriesData.length > 0
    ) {
   
      setState((prevState) => ({
        ...prevState,
        filteredBooks: searchedBook.searchResults.categoriesData.filter(
          (item) => item.products.productTag === "reading"
        ),
      }));
    } else if (
      searchedBook.searchResults &&
      searchedBook.searchResults.categoriesData &&
      searchedBook.searchResults.categoriesData.length === 0
    ) {
      setState((prevState) => ({ ...prevState, filteredBooks: [] }));
    }
    setState((prevState) => ({
      ...prevState,
      searchOpen: searchedBook.isSearchOpen,
    }));
  }, [searchedBook]);

  const { featuredBooks, filteredBooks, searchOpen } = state;

  useEffect(() => {
  }, [filteredBooks]);
  return (
    <>
      <div className="wrapper products_wrapper">
        {searchOpen === true && filteredBooks.length === 0 ? (
          <></>
        ) : (
          <>
            {filteredBooks && filteredBooks.length > 0
              ? filteredBooks.map((item) => (
                  <BookCard key={item.id} {...item} />
                ))
              : featuredBooks &&
                featuredBooks
                  .slice(0, 11)
                  .map((item) => <BookCard key={item.id} {...item} />)}
          </>
        )}
        
          <div className="card products_card browse_card">
            <Link to="/current-books">
              Show all Current <br /> books <BsArrowRight />
            </Link>
          </div>
       
      </div>
    </>
  );
};

export default CurrentBooks;
