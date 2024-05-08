import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';
import useScrollRestore from '../hooks/useScrollRestore';
import ViewAllBooks from '../pages/ViewAllBooks';
import ViewCurrentBooks from "../pages/ViewCurrentBooks"
import Home from '../pages/Home';
import ErrorPage from '../pages/ErrorPage';
import ResetPassword from '../pages/ResetPassword';
import UpdateProfilePage from '../pages/UpdateProfile';
import SessionManager from '../pages/SessionManager';
import AboutUs from '../staticPages/AboutUs';
import ContactUs from '../staticPages/ContactUs';
import CompletedProducts from '../pages/ViewCompletedBooks';
import PlantoRead from "../pages/ViewPlanToRead";
import AddBook from '../pages/Addbook';
const RouterRoutes = () => {
    useScrollRestore();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if user is logged in by checking for the token
        const token = localStorage.getItem("BOOK_BUDDY");
        setIsLoggedIn(!!token);
        
    }, []);

    return (
        <>
            {/* <SessionManager/> */}
            <Routes>
                <Route path="/" element={isLoggedIn ? <Home />:null} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/all-books" element={isLoggedIn ? <ViewAllBooks /> : <ErrorPage />} />
                <Route path="/current-books" element={isLoggedIn ? <ViewCurrentBooks /> : <ErrorPage />} />
                <Route path="/completed-books" element={isLoggedIn ? <CompletedProducts /> : <ErrorPage />} />
                <Route path="/plan-to-read" element={isLoggedIn ? <PlantoRead /> : <ErrorPage />} />
                <Route path="/update-profile" element={isLoggedIn ? <UpdateProfilePage /> : <ErrorPage />} />
                <Route path="*" element={<ErrorPage />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/add-book" element={<AddBook />} />
            </Routes>
        </>
    );
};

export default RouterRoutes;
