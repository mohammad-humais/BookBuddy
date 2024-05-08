import React, { useContext, useState, useEffect } from "react";
import useDocTitle from "../hooks/useDocTitle";
import ProductCard from "../components/book/BookCard";
import { Api } from "../utils/Api";
import commonContext from "../contexts/common/commonContext";
import { getAllBooksEndpoint } from "../utils/Endpoint";

const AllBooks = () => {
  const [state, setState] = useState({
    products: [],
    filteredProducts: [],
    searchOpen: false,
    currentPage: 1,
    loadMoreVisible: true,
    isResetComplete: false,
  });

  const {
    products,
    filteredProducts,
    searchOpen,
    currentPage,
    loadMoreVisible,
    isResetComplete,
  } = state;

  useDocTitle("All Products");
  const searchedProduct = useContext(commonContext);
  const handleResetProducts = () => {
    resetProducts();
    setState((prevState) => ({ ...prevState, isResetComplete: true }));
  };

  const resetProducts = () => {
    setState((prevState) => ({
      ...prevState,
      currentPage: 1,
      products: [],
      loadMoreVisible: true,
    }));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (
      searchedProduct.searchResults &&
      searchedProduct.searchResults.length > 0
    ) {
      setState((prevState) => ({
        ...prevState,
        filteredProducts: searchedProduct.searchResults,
      }));
    } else if (
      searchedProduct.searchResults &&
      searchedProduct.searchResults.length === 0
    ) {
      setState((prevState) => ({ ...prevState, filteredProducts: [] }));
    }

    if (
      searchedProduct.searchResults &&
      searchedProduct.searchResults.categoriesData &&
      searchedProduct.searchResults.categoriesData.length > 0
    ) {
      setState((prevState) => ({
        ...prevState,
        filteredProducts: searchedProduct.searchResults.categoriesData,
      }));
    } else if (
      searchedProduct.searchResults &&
      searchedProduct.searchResults.categoriesData &&
      searchedProduct.searchResults.categoriesData.length === 0
    ) {
      setState((prevState) => ({ ...prevState, filteredProducts: [] }));
    }

    setState((prevState) => ({
      ...prevState,
      searchOpen: searchedProduct.isSearchOpen,
    }));
  }, [searchedProduct]);

  useEffect(() => {
    if (filteredProducts.length > 0) {
      if (searchOpen !== true) {
        setState((prevState) => ({ ...prevState, isResetComplete: false }));
        handleResetProducts();
      }
    }
  }, [searchOpen]);

  useEffect(() => {
    if (isResetComplete) {
      loadProducts();
    }
  }, [isResetComplete]);

  const loadProducts = async () => {
    try {
      const { statusCode, data } = await Api.getAllBooks(
        `${getAllBooksEndpoint}?page=${currentPage}`,
        {}
      );
      if (statusCode === true) {
        if (products.length === 0) {
          setState((prevState) => ({
            ...prevState,
            products: data.categoriesData,
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            products: [...prevState.products, ...data.categoriesData],
          }));
        }
        if (data.hasMore === true) {
          setState((prevState) => ({
            ...prevState,
            currentPage: prevState.currentPage + 1,
          }));
        } else {
          setState((prevState) => ({ ...prevState, loadMoreVisible: false }));
        }
      }
    } catch (error) {
      // Handle error
    } finally {
      // Finally block
    }
  };

  const handleLoadMore = () => {
    loadProducts();
  };

  return (
    <>
      <div className="container">
        <div className="wrapper products_wrapper">
          {filteredProducts.length > 0 && searchOpen
            ? filteredProducts.map((item) => (
                <ProductCard key={item.id} {...item} />
              ))
            : !searchOpen &&
              products.map((item) => <ProductCard key={item.id} {...item} />)}
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

export default AllBooks;
