import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import BookCard from "../components/book/BookCard";
import { useEffect, useState, useContext } from "react";
import { Api } from "../utils/Api";
import { completedPBooksEndpoint } from "../utils/Endpoint";
import commonContext from "../contexts/common/commonContext";

const CompletedBooks = () => {
  const [state, setState] = useState({
    featuredBooks: [],
    filteredBooks: [],
    searchOpen: false,
  });
  const searchedBooks = useContext(commonContext);

  const completedBooksRequest = async () => {
    const { statusCode, data } = await Api.getCompletedBooks(
      completedPBooksEndpoint,
      {}
    );
    console.log("data complete",data)
    if (statusCode === true) {
      setState((prevState) => ({
        ...prevState,
        featuredBooks: data?.productsData,
      }));
    }
  };

  useEffect(() => {
    completedBooksRequest();
  }, []);

  useEffect(() => {
    if (
      searchedBooks.searchResults &&
      searchedBooks.searchResults.length > 0
    ) {
  
      setState((prevState) => ({
        ...prevState,
        filteredBooks: searchedBooks.searchResults.filter(
          (item) => item.products.productTag === "completed"
        ),
      }));
    } else if (
      searchedBooks.searchResults &&
      searchedBooks.searchResults.length === 0 &&
      searchedBooks.isSearchOpen === true
    ) {
 
      setState((prevState) => ({ ...prevState, filteredBooks: [] }));
    }
    if (
      searchedBooks.searchResults &&
      searchedBooks.searchResults.categoriesData &&
      searchedBooks.searchResults.categoriesData.length > 0
    ) {
   
      setState((prevState) => ({
        ...prevState,
        filteredBooks: searchedBooks.searchResults.categoriesData.filter(
          (item) => item.products.productTag === "completed"
        ),
      }));
    } else if (
      searchedBooks.searchResults &&
      searchedBooks.searchResults.categoriesData &&
      searchedBooks.searchResults.categoriesData.length === 0
    ) {
      setState((prevState) => ({ ...prevState, filteredBooks: [] }));
    }
    setState((prevState) => ({
      ...prevState,
      searchOpen: searchedBooks.isSearchOpen,
    }));
  }, [searchedBooks]);

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
            <Link to="/completed-books">
              Show all Completed <br /> Books <BsArrowRight />
            </Link>
          </div>
       
      </div>
    </>
  );
};

export default CompletedBooks;
