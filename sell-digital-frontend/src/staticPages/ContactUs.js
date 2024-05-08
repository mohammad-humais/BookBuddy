import React from 'react';
import './ContactUs.css'; 
import "./static_pages.css";


const ContactUs = () => {
  return (
    <>
<div className="contact-page-heading">
    <p>Contact Us</p>
  </div>
    <div className="contact-container contact-bg-color">
    <div className="content">
      <div className="contact-left-side">
        <div className="contact-details">
          <i className="fas fa-map-marker-alt"></i>
          <div className="contact-topic">Address</div>
          <div className="contact-text-one">Main Township, Confiz Limited</div>
          <div className="contact-text-two">Lahore, Pakistan</div>
        </div>
        <div className="contact-details">
          <i className="fas fa-phone-alt"></i>
          <div className="contact-topic">Phone</div>
          <div className="contact-text-one">+92 12345678</div>
          <div className="contact-text-two">+92 12345678</div>
        </div>
        <div className="contact-details">
          <i className="fas fa-envelope"></i>
          <div className="contact-topic">Email</div>
          <div className="contact-text-one">example1@gmail.com</div>
          <div className="contact-text-two">example2@gmail.com</div>
        </div>
      </div>
      <div className="contact-right-side">
        <div className="contact-topic-text">Send us a message</div>
        <p>
          If you have any types of queries related to this website or you want to share your feedback. It's my pleasure to
          help you.
        </p>
        <form action="#">
          <div className="contact-input-box">
            <input type="text" placeholder="Enter your name" />
          </div>
          <div className="contact-input-box">
            <input type="text" placeholder="Enter your email" />
          </div>
          <div className="contact-input-box message-box">
            <textarea placeholder="Enter your message"></textarea>
          </div>
          <div className="contact-button">
            <input type="button" value="Send Now" />
          </div>
        </form>
      </div>
    </div>
  </div>
  </>
  );
};

export default ContactUs;
