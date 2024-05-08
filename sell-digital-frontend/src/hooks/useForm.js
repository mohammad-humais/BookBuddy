import { useContext, useState } from "react";
import commonContext from "../contexts/common/commonContext";
import cartContext from "../contexts/cart/cartContext";
import { Api } from "../utils/Api";
import { toast } from "react-toastify";
import { signupEndpoint, loginEndpoint } from "../utils/Endpoint";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";
import { setTokenID, setToken, removeID } from "../utils/localstorage";
import {
  forgotPasswordEndpoint,
  resetPasswordEndpoint,
} from "../utils/Endpoint";
const useForm = (redirectCallback) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addItem } = useContext(cartContext);
  const { toggleForm } = useContext(commonContext);
  const [inputValues, setInputValues] = useState({});
  // handling input-values
  const handleInputValues = (e) => {
    const { name, value } = e.target;
    setInputValues((prevValues) => {
      return {
        ...prevValues,
        [name]: value,
      };
    });
  };

  // handling form-submission
  const handleFormSubmit = async (e, actionType) => {
    e.preventDefault();
    setInputValues({});
    if (actionType === "signup") {
      const { statusCode, data } = await Api.registerUser(signupEndpoint, {
        email: inputValues.mail,
        firstName: inputValues.firstName,
        lastName: inputValues.lastName,
        password: inputValues.password,
        confirmPassword: inputValues.confirmPassword,
      });
      if (statusCode === false) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
        redirectCallback();
      }
    } else if (actionType === "login") {
      const { statusCode, data } = await Api.loginUser(loginEndpoint, {
        email: inputValues.mail,
        password: inputValues.password,
      });

      if (statusCode === false) {
        toast.error(data.message);
      } else {
        toggleForm(false);
        toast.success(data.message);
        addItem([]);
        const { accessToken } = data.data;
        setToken(accessToken);
      }
    } else if (actionType === "forgotPassword") {
      const { statusCode, data } = await Api.loginUser(forgotPasswordEndpoint, {
        email: inputValues.mail,
      });

      if (statusCode === false) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
        const ID = data.data;
        setTokenID(ID);
      }
    } else if (actionType === "resetPassword") {
      if (inputValues.password !== inputValues.confirmPassword) {
        toast.error("Password and Confirm Password should match");
        setInputValues({});
        return;
      }
      if (inputValues.password.length <= 6) {
        toast.error("Password Length should be greater than 6");
        return;
      }
      const params = new URLSearchParams(location.search);
      const token = params.get("token");
      const id = localStorage.getItem("ID");
      const { statusCode, data } = await Api.resetPassword(
        resetPasswordEndpoint,
        {
          password: inputValues.password,
          id,
          token,
        }
      );
      if (statusCode === false) {
        toast.error(data.message);
        return;
      }
      if (statusCode === true) {
        toast.success(data.message);
        removeID();
        navigate("/");
      }
    }
  };

  return { inputValues, handleInputValues, handleFormSubmit };
};

export default useForm;
