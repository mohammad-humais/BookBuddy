import React, { useContext, useRef, useState } from "react";
import commonContext from "../../contexts/common/commonContext";
import useForm from "../../hooks/useForm";
import useOutsideClose from "../../hooks/useOutsideClose";
import useScrollDisable from "../../hooks/useScrollDisable";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AccountForm = () => {
  const { isFormOpen, toggleForm } = useContext(commonContext);
  const { inputValues, handleInputValues, handleFormSubmit } = useForm(() => {
    // Redirect callback function
    setIsSignupVisible(false);
    setIsForgotPasswordVisible(false);
  });

  const formRef = useRef();

  useOutsideClose(formRef, () => {
    toggleForm(false);
  });

  useScrollDisable(isFormOpen);

  const [isSignupVisible, setIsSignupVisible] = useState(false);
  const [isForgotPasswordVisible, setIsForgotPasswordVisible] = useState(false);

  // Signup-form visibility toggling
  const handleIsSignupVisible = () => {
    setIsSignupVisible((prevState) => !prevState);
    setIsForgotPasswordVisible(false);
  };

  // Forgot password visibility toggling
  const handleIsForgotPasswordVisible = () => {
    setIsForgotPasswordVisible((prevState) => !prevState);
    setIsSignupVisible(false);
  };
  const handleLoginClick = () => {
    setIsSignupVisible(false);
    setIsForgotPasswordVisible(false);
  };
  return (
    <>
      <ToastContainer />
      {isFormOpen && (
        <div className="backdrop light-color">
          <div className="modal_centered">
            <form
              id="account_form"
              ref={formRef}
              onSubmit={(e) =>
                handleFormSubmit(
                  e,
                  isSignupVisible
                    ? "signup"
                    : isForgotPasswordVisible
                    ? "forgotPassword"
                    : "login"
                )
              }
            >
              {/*===== Form-Header =====*/}
              <div className="form_head">
                <h2>
                  {isSignupVisible
                    ? "Signup"
                    : isForgotPasswordVisible
                    ? "Forgot Password"
                    : "Login"}
                </h2>
                <p>
                  {isSignupVisible
                    ? "Already have an account?"
                    : isForgotPasswordVisible
                    ? "Remembered your password?"
                    : "New to BookBuddy?"}
                  &nbsp;&nbsp;
                  {!isSignupVisible && !isForgotPasswordVisible ? (
                    <>
                      <button
                        type="button"
                        onClick={handleIsSignupVisible}
                      >
                        Create an account
                      </button>
                      <button
                        type="button"
                        onClick={handleIsForgotPasswordVisible}
                      >
                        Forgot Password
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={handleLoginClick}
                    >
                      Login
                    </button>
                  )}
                </p>
              </div>

              {/*===== Form-Body =====*/}
              <div className="form_body">
                {!isSignupVisible && !isForgotPasswordVisible ? (
                  <>
                    <div className="input_box">
                      <input
                        type="email"
                        name="mail"
                        className="input_field"
                        value={inputValues.mail || ""}
                        onChange={handleInputValues}
                        required
                      />
                      <label className="input_label">Email</label>
                    </div>

                    <div className="input_box">
                      <input
                        type="password"
                        name="password"
                        className="input_field"
                        value={inputValues.password || ""}
                        onChange={handleInputValues}
                        required
                      />
                      <label className="input_label">Password</label>
                    </div>
                  </>
                ) : isSignupVisible ? (
                  <>
                    <div className="input_box">
                      <input
                        type="email"
                        name="mail"
                        className="input_field"
                        value={inputValues.mail || ""}
                        onChange={handleInputValues}
                        required
                      />
                      <label className="input_label">Email</label>
                    </div>

                    <div className="input_box">
                      <input
                        type="text"
                        name="firstName"
                        className="input_field"
                        value={inputValues.firstName || ""}
                        onChange={handleInputValues}
                        required
                      />
                      <label className="input_label">First Name</label>
                    </div>

                    <div className="input_box">
                      <input
                        type="text"
                        name="lastName"
                        className="input_field"
                        value={inputValues.lastName || ""}
                        onChange={handleInputValues}
                        required
                      />
                      <label className="input_label">Last Name</label>
                    </div>

                    <div className="input_box">
                      <input
                        type="password"
                        name="password"
                        className="input_field"
                        value={inputValues.password || ""}
                        onChange={handleInputValues}
                        required
                      />
                      <label className="input_label">Password</label>
                    </div>

                    <div className="input_box">
                      <input
                        type="password"
                        name="confirmPassword"
                        className="input_field"
                        value={inputValues.confirmPassword || ""}
                        onChange={handleInputValues}
                        required
                      />
                      <label className="input_label">Confirm Password</label>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="input_box">
                      <input
                        type="email"
                        name="mail"
                        className="input_field"
                        value={inputValues.mail || ""}
                        onChange={handleInputValues}
                        required
                      />
                      <label className="input_label">Email</label>
                    </div>
                  </>
                )}

                <div className="input_box">
                  <button type="submit" className="btn login_btn">
                    {isSignupVisible
                      ? "Signup"
                      : isForgotPasswordVisible
                      ? "Submit"
                      : "Login"}
                  </button>
                </div>
              </div>

              {/*===== Form-Close-Btn =====*/}
              <div
                className="close_btn"
                title="Close"
                onClick={() => toggleForm(false)}
              >
                &times;
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountForm;