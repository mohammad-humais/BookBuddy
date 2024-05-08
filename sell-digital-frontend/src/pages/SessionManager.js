import React, { useEffect, useRef } from "react";
import { Api } from "../utils/Api";
import { useNavigate } from "react-router-dom";
import { sessionManagementEndpoint } from "../utils/Endpoint";

const MouseTracker = () => {
  const timeoutRef = useRef(null);
  const idleRef = useRef(false);
  const lastMouseMoveTimestampRef = useRef(0);
  const navigate = useNavigate();

  useEffect(() => {
    const resetSession = async () => {
      const { statusCode } = await Api.resetSessionTimer(
        sessionManagementEndpoint,
        {}
      );
      if (statusCode === true) {
        if (localStorage.getItem("E_COMMERCE_TOKEN"))
          localStorage.removeItem("E_COMMERCE_TOKEN");
           navigate("/");
      }
    };

    const handleMouseMove = () => {
      clearTimeout(timeoutRef.current);
      if (idleRef.current) {
        idleRef.current = false;
        if (shouldCallAPI()) {
          resetSession();
        }
      }
      lastMouseMoveTimestampRef.current = Date.now();
      timeoutRef.current = setTimeout(setIdleState, 60000); // Call setIdleState after 1 minute of inactivity
    };

    const setIdleState = () => {
      idleRef.current = true;
      if (shouldCallAPI()) {
        resetSession();
      }
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        clearTimeout(timeoutRef.current);
        if (idleRef.current && shouldCallAPI()) {
          resetSession();
        }
        timeoutRef.current = setTimeout(setIdleState, 60000); // Call setIdleState after 1 minute of inactivity
      } else {
        if (
          idleRef.current &&
          Date.now() - lastMouseMoveTimestampRef.current >= 60000
        ) {
          resetSession();
        }
      }
    };

    const shouldCallAPI = () => {
      const currentTime = Date.now();
      const sessionDuration = currentTime - lastMouseMoveTimestampRef.current;
      return sessionDuration >= 60000 && !document.hidden; // Check if session duration is greater than or equal to 1 minute and tab is not hidden
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("keydown", handleMouseMove);
    document.addEventListener("scroll", handleMouseMove);
    document.addEventListener("touchstart", handleMouseMove);
    document.addEventListener("touchmove", handleMouseMove);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearTimeout(timeoutRef.current);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("keydown", handleMouseMove);
      document.removeEventListener("scroll", handleMouseMove);
      document.removeEventListener("touchstart", handleMouseMove);
      document.removeEventListener("touchmove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return <div></div>;
};

export default MouseTracker;
