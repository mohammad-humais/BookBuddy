import React, { useContext, useState, useEffect } from "react";
import useDocTitle from "../hooks/useDocTitle";
import ProductCard from "../components/book/BookCard";
import { Api } from "../utils/Api";
import commonContext from "../contexts/common/commonContext";
import { planToReadEndpoint } from "../utils/Endpoint";

const ViewPlanToRead = () => {
  const [state, setState] = useState({
    books: [],
    filteredBooks: [],
    searchOpen: false,
    currentPage: 1,
    loadMoreVisible: true,
    isResetComplete: false,
  });

  const { books, filteredBooks, searchOpen, currentPage, loadMoreVisible, isResetComplete } = state;

  useDocTitle("All books");
  const searchedProduct = useContext(commonContext);

  const handleResetbooks = () => {
    resetbooks();
    setState(prevState => ({ ...prevState, isResetComplete: true }));
  };

  const resetbooks = () => {
    setState(prevState => ({
      ...prevState,
      currentPage: 1,
      books: [],
      loadMoreVisible: true,
    }));
  };

  useEffect(() => {
    loadbooks();
  }, []);

  useEffect(() => {
    if (searchedProduct.searchResults && searchedProduct.searchResults.length > 0) {
      setState(prevState => ({
        ...prevState,
        filteredBooks: searchedProduct.searchResults.filter(
          item => item.books.productTag === "wishlist"
        ),
      }));
    } else if (searchedProduct.searchResults && searchedProduct.searchResults.length === 0) {
      setState(prevState => ({ ...prevState, filteredBooks: [] }));
    }

    if (
      searchedProduct.searchResults &&
      searchedProduct.searchResults.categoriesData &&
      searchedProduct.searchResults.categoriesData.length > 0
    ) {
      setState(prevState => ({
        ...prevState,
        filteredBooks: searchedProduct.searchResults.categoriesData.filter(
          item => item.books.productTag === "wishlist"
        ),
      }));
    } else if (
      searchedProduct.searchResults &&
      searchedProduct.searchResults.categoriesData &&
      searchedProduct.searchResults.categoriesData.length === 0
    ) {
      setState(prevState => ({ ...prevState, filteredBooks: [] }));
    }

    setState(prevState => ({ ...prevState, searchOpen: searchedProduct.isSearchOpen }));
  }, [searchedProduct]);

  useEffect(() => {
    if (filteredBooks.length > 0) {
      if (searchOpen === true) {
        setState(prevState => ({ ...prevState, isResetComplete: false }));
        handleResetbooks();
      }
    }
  }, [searchOpen]);

  useEffect(() => {
    if (isResetComplete) {
      loadbooks();
    }
  }, [isResetComplete]);

  const loadbooks = async () => {
    try {
      const { statusCode, data } = await Api.getPlanToReadBooks(
        `${planToReadEndpoint}?page=${currentPage}`,
        {}
      );
      console.log('data completed...',data)
      if (statusCode === true) {
        if (books.length === 0) {
          setState(prevState => ({ ...prevState, books: data?.productsData }));
        } else {
          setState(prevState => ({
            ...prevState,
            books: [...prevState.books, ...data?.productsData],
          }));
        }

        if (data.hasMore === true) {
          setState(prevState => ({ ...prevState, currentPage: prevState.currentPage + 1 }));
        } else {
          setState(prevState => ({ ...prevState, loadMoreVisible: false }));
        }
      }
    } catch (error) {
      // Handle error
    } finally {
      // Finally block
    }
  };

  const handleLoadMore = () => {
    loadbooks();
  };
  return (
    <>
      <div className="container">
        <div className="wrapper books_wrapper">
          {filteredBooks.length > 0 && searchOpen
            ? filteredBooks.map(item => <ProductCard key={item.id} {...item} />)
            : !searchOpen &&
              books.map(item => <ProductCard key={item.id} {...item} />)}
        </div>
      </div>
      {!searchOpen && loadMoreVisible && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "40px",
          }}
        >
          <button onClick={handleLoadMore} className="btn">
            Load More
          </button>
        </div>
      )}
    </>
  );
};

export default ViewPlanToRead;
