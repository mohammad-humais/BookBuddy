import React, { useEffect, useRef } from "react";
import "./UpdateProfile.css";
import { Api } from "../utils/Api";
import { updateProfileEndpoint, getProfileDataEndpoint } from "../utils/Endpoint";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateProfilePage = () => {
  const formRefs = useRef({
    email: useRef(),
    firstName: useRef(),
    lastName: useRef(),
    phoneNumber: useRef(),
    currentPassword: useRef(),
    newPassword: useRef(),
    confirmPassword: useRef(),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      firstName,
      lastName,
      phoneNumber,
      currentPassword,
      newPassword,
      confirmPassword,
    } = formRefs.current;



    const { statusCode, data } = await Api.updateProfile(updateProfileEndpoint, {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      phone: phoneNumber.current.value,
      currentPassword: currentPassword.current.value,
      newPassword: newPassword.current.value,
      confirmPassword: confirmPassword.current.value,
    });

    if (statusCode === false) {
      toast.error(data.message);
    } else {
      toast.success(data.message);
    }
  };

  useEffect(() => {
    async function fillFields() {
      const { statusCode, data } = await Api.getProfileData(getProfileDataEndpoint, {});

      const { email, firstName, lastName, phone } = data;
      const { email: emailRef, firstName: firstNameRef, lastName: lastNameRef, phoneNumber: phoneNumberRef } =
        formRefs.current;

      emailRef.current.value = email;
      firstNameRef.current.value = firstName;
      lastNameRef.current.value = lastName;
      phoneNumberRef.current.value = phone;

      if (statusCode === false) {
        toast.error(data.message);
      }
    }

    fillFields();
  }, []);

  return (
    <>
      <div className="update-profile-page">
        <div className="gray-section">
          <h2 className="update-profile-heading">Update Profile</h2>
          <div className="form-group">
            <div className="form-row">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                disabled
                className="form-input disabled"
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                ref={formRefs.current.email}
              />
            </div>
            <div className="form-row name-fields">
              <label className="form-label" htmlFor="firstName">
                First Name
              </label>
              <input
                className="form-input"
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
                ref={formRefs.current.firstName}
              />
            </div>
            <div className="form-row name-fields">
              <label className="form-label" htmlFor="lastName">
                Last Name
              </label>
              <input
                className="form-input"
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Enter your last name"
                ref={formRefs.current.lastName}
              />
            </div>
            <div className="form-row">
              <label className="form-label" htmlFor="phoneNumber">
                Phone Number
              </label>
              <input
                className="form-input"
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Enter your phone number"
                ref={formRefs.current.phoneNumber}
              />
            </div>
            <div className="password-section">
              <h2 className="password-heading">Change Password</h2>
              <div className="form-row">
                <label className="form-label" htmlFor="currentPassword">
                  Current Password
                </label>
                <input
                  className="form-input"
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  placeholder="Enter your current password"
                  ref={formRefs.current.currentPassword}
                />
              </div>
              <div className=" password-fields">
                <div className="half-width">
                  <label className="form-label same-line" htmlFor="newPassword">
                    New Password
                  </label>
                  <input
                    className="form-input"
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    placeholder="Enter your new password"
                    ref={formRefs.current.newPassword}
                  />
                </div>
                <div className="half-width">
                  <label className="form-label same-line" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <input
                    className="form-input"
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your new password"
                    ref={formRefs.current.confirmPassword}
                  />
                </div>
              </div>
            </div>
          </div>
          <button type="submit" className="submit-button" onClick={handleSubmit}>
            Update Profile
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default UpdateProfilePage;
