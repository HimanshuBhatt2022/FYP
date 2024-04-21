import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import "./LoginForm.css";
import Google from "../Assets/google.png";
import Facebook from "../Assets/facebook.png";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

const Template = ({ action, setAction, submitHandler, setIsLoggedIn }) => {
  // To navigate in diff paths(login/ signup)
  const navigate = useNavigate();

// login connecting with backend
// const [state,setState]= useState("Login");

const [formData,setFormData]=useState({
  username:"",
  password:"",
  email:""
})
function changeHandler(event) {
  const { type, name, value, checked } = event.target;
  setFormData((prevData) => {
    return {
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    };
  });
}

  return (
    <div className="wrapper">
      <div className={action === "Login" ? "loginForm" : "loginForm signup"}>
        <form action={submitHandler}>
          <div className="header">
            <div className="text">{action}</div>
            <div className="underline"></div>
          </div>
          <div>
            {action === "Login" ? (
              <LoginForm setIsLoggedIn={setIsLoggedIn} action={action} formData={formData} changeHandler={changeHandler}/>
              ) : (
              <SignupForm setIsLoggedIn={setIsLoggedIn} action={action} formData={formData} changeHandler={changeHandler} />
            )}
          </div>
          <div className="social-integration">
            <div className="line">
              {action === "Login" ? (
                <span>Sign in using</span>
              ) : (
                <span>Sign up using</span>
              )}
            </div>
            <div className="socialmedias">
              <button type="button">
                <img src={Google} alt="" />
                <span>Google</span>
              </button>
              <button type="button">
                <img src={Facebook} alt="" />
                <span>Facebook</span>
              </button>
            </div>
            {action === "Login" ? (
              <div
                className="newuser"
                onClick={() => {
                  setAction("Sign Up");
                  navigate("/signup");
                }}
              >
                New user ? <span> Sign Up</span>
              </div>
            ) : (
              <div
                className="newuser"
                onClick={() => {
                  setAction("Login");
                  navigate("/login");
                }}
              >
                Already have an account?<span> Sign In</span>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
export default Template;
