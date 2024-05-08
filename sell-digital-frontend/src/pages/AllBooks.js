import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import BookCard from "../components/book/BookCard";
import { useEffect, useState } from "react";
import { Api } from "../utils/Api";
import { getAllBooksEndpoint } from "../utils/Endpoint";
import commonContext from "../contexts/common/commonContext";
import { useContext } from "react";

const AllProducts = () => {
  const [state, setState] = useState({
    products: [],
    filteredProducts: [],
    searchOpen: false,
  });
  const searchedProduct = useContext(commonContext);
  const productsRequest = async () => {
    const { statusCode, data } = await Api.getAllBooks(
      getAllBooksEndpoint,
      {}
    );
    if (statusCode === true) {
      setState((prevState) => ({
        ...prevState,
        products: data.categoriesData,
      }));
    }
  };

  useEffect(() => {
    productsRequest();
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
      searchedProduct.searchResults.length === 0 &&
      searchedProduct.isSearchOpen === true
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

  const { products, filteredProducts, searchOpen } = state;

  return (
    <>
      <div className="wrapper products_wrapper">
        {searchOpen === true && filteredProducts.length === 0 ? (
          <></>
        ) : (
          <>
            {filteredProducts.length > 0
              ? filteredProducts.map((item) => (
                  <BookCard key={item.id} {...item} />
                ))
              : products &&
                products
                  .slice(0, 11)
                  .map((item) => <BookCard key={item.id} {...item} />)}
          </>
        )}

        <div className="card products_card browse_card">
          <Link to="/all-products">
            Browse All <br /> Products <BsArrowRight />
          </Link>
        </div>
      </div>
    </>
  );
};

export default AllProducts;
