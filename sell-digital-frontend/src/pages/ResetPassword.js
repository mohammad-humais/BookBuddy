import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useForm from "../hooks/useForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Api } from "../utils/Api";
import { linkExpiredEndpoint, verifyTokenEndpoint } from "../utils/Endpoint";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { inputValues, handleInputValues, handleFormSubmit } = useForm(
    useNavigate(),
    location
  );

  const isLinkExpired = async (timestamp) => {
    const { statusCode, data } = await Api.LinkExpired(linkExpiredEndpoint, {
      timestamp,
    });
    if (statusCode === false) {
      await toast.error(data.message);
      navigate("/");
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const timestamp = params.get("timestamp");
    const token = params.get("token");
    const id = localStorage.getItem("ID");
    isLinkExpired(timestamp);
    async function verifyToken() {
      await Api.verifyToken(verifyTokenEndpoint, {
        token,
        id,
      });
    }
    if (token) {
      verifyToken();
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <div>
        <div className="light-color">
          <div className="modal_centered">
            <form
              id="account_form"
              onSubmit={(e) => handleFormSubmit(e, "resetPassword")}
            >
              {/*===== Form-Header =====*/}
              <div className="form_head">
                <h2>Reset Password</h2>
              </div>

              {/*===== Form-Body =====*/}
              <div className="form_body">
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

                <div className="input_box">
                  <button type="submit" className="btn login_btn">
                    Reset Password
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(ResetPassword);
