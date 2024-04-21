import "./LoginForm.css";
// import emailIcon from "../assets/email.png";
// import passwordIcon from "../assets/pass.png";
import showPassword from "../Assets/eyesopen.png";
import hidePassword from "../Assets/twoeyelashes.png";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useState } from "react";

const SignupForm = ({ setIsLoggedIn,action, formData, changeHandler}) => {


  // added from here
  const navigate = useNavigate();
  async function submitHandler(event) {
    if (action === "Sign Up") {
      event.preventDefault();

      // console.log("SIGNUP DETAILS\n", formData);
      try {
        let responseData;
        const response = await fetch("http://localhost:4000/signup", {
          method: "POST",
          headers: {
            Accept: "application/form-data",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        responseData = await response.json();

        console.log("Response in Signup ", responseData);
        if (responseData.success) {
          localStorage.setItem("auth-token", responseData.token);
          navigate("/login");
          toast.success("You're registered in successfully.");
          setIsLoggedIn(false);
          console.log("here is signup details ",formData);
        } else {
          toast.error("User already existed with this email ID");
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error during signup:", error);
        toast.error("Failed to sign up. Please try again.");
        setIsLoggedIn(false);
      }
    }
  }

    function passwordHandler(){
        let password = document.querySelector('.pass')
        let showPass = document.querySelector('.hidepass')
        console.log(password)
        if(password.type === 'password'){
            password.type = 'text'
            showPass.src = showPassword;
        }
        else{
            password.type = 'password'
            showPass.src = hidePassword;
        }
    }

    // signup connecting with backend
    // const [state,setState]= useState("Signp");
    
    // const signup = async ()=>{
    //   console.log("signup function executed",formData);
      
    // }



// const [formData,setFormData]=useState({
//   username:"",
//   password:"",
//   email:""
// })

  return (
    <div className="inputs" onChange={changeHandler}>
      <div className="name icons">
        {/* <img src={emailIcon} alt="" /> */}
        <input type="text"  name="username"
              value={formData.username} placeholder="Username" onChange={changeHandler}/>
      </div>
      <div className="email icons">
        {/* <img src={emailIcon} alt="" /> */}
        <input type="email"  name="email"
              value={formData.email} placeholder="Email" onChange={changeHandler}/>
      </div>
{/*       <div className="password icons">
        { <img src={passwordIcon} alt="" /> }
        { <input type="phone" name="password"
              value={formData.password} placeholder="Phone" className="phone" onChange={changeHandler}/> }
      </div> */}
      <div className="password icons">
        {/* <img src={passwordIcon} alt="" /> */}
        <input type="password" name="password"
              value={formData.password} placeholder="Password" className="pass"onChange={changeHandler}/>
        <img src={hidePassword} alt="" onClick={passwordHandler} className="hidepass"/>
      </div>
      <div className="loginBtn btn"><button type="submit" onClick={submitHandler} /* onClick={()=>{signup()}} */>Sign Up</button></div>
    </div>
  );
};

export default SignupForm;
