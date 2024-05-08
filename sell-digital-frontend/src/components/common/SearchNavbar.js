import React, { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart, AiOutlineSearch } from "react-icons/ai";
import Select from "react-select";
import "./SearchNavbar.css";
import { Api } from "../../utils/Api";
import { getToken } from "../../utils/localstorage"; // Import getToken function
import {
  searchedEndpoint,
  getAllBooksEndpoint,
} from "../../utils/Endpoint";

const SearchNavbar = () => {
  const searchInputRef = useRef(null);
  const searchTextRef = useRef("");

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 50; // Adjust this threshold as needed
      const topOffset = window.scrollY;

      setIsSticky(topOffset > threshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const token = getToken(); // Get the token from localStorage
  // const handleInputChange = (e) => {
  //   searchTextRef.current = e.target.value;
  //   searchInputRef.current = e.target.value;
  // };
  // const handleClearSearch = async () => {
  //   // Clear the search text in the ref
  //   searchTextRef.current = "";
  //   searchInputRef.current = "";
  //   const { statusCode, data } = await Api.getAllBooks(
  //     getAllBooksEndpoint,
  //     {}
  //   );

  // };

  // const handleSearch = async () => {
  
  //   const parameters = {
  //     searchText: searchTextRef.current !== "" ? searchTextRef.current : null,
  //   };
  //   const queryParameters = new URLSearchParams(Object.entries(parameters));
  //   const { statusCode, data } = await Api.getSearchProducts(
  //     `${searchedEndpoint}?${queryParameters}`,
  //     {}
  //   );
  // };


  const dropdownStyles = {
    control: (provided) => ({
      ...provided,
      height: "45px",
      borderRadius: 0,
      boxShadow: "none",
      border: "1px solid #ccc",
      borderRadius: "5px",
    }),
    menu: (provided) => ({
      ...provided,
      width: "max-content",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
  };

  const [btnSt, setBtnSt] = useState(true);

  const handleClick = () => {
    if (btnSt) {
      document.querySelector(".side_toggle span")?.classList.add("toggle");
      document
        .getElementById("side_sidebar")
        ?.classList.add("side_sidebarshow");
      setBtnSt(false);
    } else {
      document.querySelector(".side_toggle span")?.classList.remove("toggle");
      document
        .getElementById("side_sidebar")
        ?.classList.remove("side_sidebarshow");
      setBtnSt(true);
    }
  };

  return (
    <>
      <nav id="second-navbar" className={isSticky ? "sticky" : ""}>
        <header id="searchNavbar">
          <div className="outer-padding">
            <nav className="second-nav">
              <header style={{ display: "none" }}>
                <div>
                  <button
                    type="button"
                    className="side_toggle"
                    id="toggle"
                    onClick={handleClick}
                  >
                    <span></span>
                  </button>
                </div>
              </header>
              <div className="big-potion">
                <div className=" site-title" style={{"marginRight": "65%"}}>
                  {" "}
                  <Link to="/">Book Buddy</Link>
                </div>

                {/* <div className="search-bar display-none" style={{width: "650px"}}>
                  <div className="search-bar-wrapper" style={{width: "650px"}}>
                    <input
                      type="text"
                      placeholder="Search here"
                      defaultValue={searchTextRef.current}
                      onChange={handleInputChange}
                      ref={searchInputRef}
                    />
                  </div>
                </div>

                <div className="display-none">
                  <button className="search-button" onClick={handleSearch}>
                    Search
                  </button>
                </div>

                <div className="display-none">
                  <button
                    type="submit"
                    className="btn"
                    onClick={handleClearSearch}
                  >
                    Clear
                  </button>
                </div> */}

                <div className="">
                  {/* <button className="search-button" onClick={''}>
                    Add Book
                  </button> */}
                  <Link to="/add-book" >
                  <p className="search-button">Add Book</p>
                </Link>
                </div>
              </div>

              <div
                className="cart_action Icon-props small-portion2 icon-hover-color"
                style={{ "font-size": "2rem" }}
              >
                <div
                  className="display-visible toggle-btn"
                  style={{ marginRight: "25px" }}
                  onClick={handleClick}
                >
                  <AiOutlineSearch />
                </div>

              </div>
            </nav>
          </div>
        </header>
      </nav>

      <div>
        <div className="side_sidebar" id="side_sidebar">
          <div className="side_cancel_btn" onClick={handleClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              class="bi bi-x"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </div>

          <div style={{ padding: "20px", width: "100px" }}>
            {/* <div className="search-bar display-visible">
              <div className="search-bar-wrapper-inner">
                 <input
                      type="text"
                      placeholder="Search here"
                      defaultValue={searchTextRef.current}
                      onChange={handleInputChange}
                      ref={searchInputRef}
                    />
              </div>
            </div> */}

     

        
      

   
            {/* <div className="inner-buttons">
              <div className="display-no">
                <button className="search-button" onClick={handleSearch}>
                  Search
                </button>
              </div>

              <div className="displ">
                <button
                  type="submit"
                  className="btn"
                  onClick={handleClearSearch}
                >
                  Clear
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchNavbar;
