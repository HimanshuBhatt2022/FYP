import "./LoginForm.css";
// import emailIcon from "../assets/email.png";
// import passwordIcon from "../assets/pass.png";
import showPassword from "../Assets/eyesopen.png";
import hidePassword from "../Assets/twoeyelashes.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = ({ setIsLoggedIn,action, formData, changeHandler}) => {
  const navigate = useNavigate();
  async function submitHandler(event) {
    if (action === "Login") {
      event.preventDefault();

      console.log("LOGIN DETAILS\n", formData);
      try {
        let responseData;
        const response = await fetch("http://localhost:4000/login", {
          method: "POST",
          headers: {
            Accept: "application/form-data",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        responseData = await response.json();
        console.log("Response in login ", responseData);
        if (responseData.success) {
          localStorage.setItem("auth-token", responseData.token);
          navigate("/");
          toast.success("You're logged in successfully.");
          setIsLoggedIn(true);
        } else {
          toast.error("Invalid email or password. Please try again.");
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error during login:", error);
        toast.error("Failed to log in. Please try again.");
        setIsLoggedIn(false);
      }
    }
  }
  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  //   remember: false,
  // });


  /* changes to tempate */
  // function changeHandler(event) {
  //   const { type, name, value, checked } = event.target;
  //   setFormData((prevData) => {
  //     return {
  //       ...prevData,
  //       [name]: type === "checkbox" ? checked : value,
  //     };
  //   });
  // }

  // const navigate = useNavigate()
  // function submitHandler(event){
  //   event.preventDefault();
  //   navigate('/');
  //   setIsLoggedIn(true)
  //   toast.success("You're logged in successfully.")
  // }

  function passwordHandler() {
    let password = document.getElementById("password");
    let showPass = document.querySelector(".hidepass");
    if (password.type === "password") {
      password.type = "text";
      showPass.src = showPassword;
    } else {
      password.type = "password";
      showPass.src = hidePassword;
    }
  }

// // login connecting with backend
// const [state,setState]= useState("Login");
// const [formData,setFormData]=useState({
//   username:"",
//   password:"",
//   email:""
// })

// const changeHandler=(e)=>{
//   setFormData({...formData,[e.target.name]:e.target.value})
// }

// const login = async ()=>{
//   console.log("login function executed",formData);
  
// }

  return (
      <div>
        <div className="inputs">
          <div className="email icons">
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Email"
              onChange={changeHandler}
            />
          </div>
          <div className="password icons">
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Password"
              id="password"
              onChange={changeHandler}
            />
            <img
              src={hidePassword}
              alt=""
              onClick={passwordHandler}
              className="hidepass"
            />
          </div>
          <div className="forgot">
            <input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              id="remember"
              onChange={changeHandler}
            />
            <label htmlFor="remember"> Remember me</label>
            <span>Forgot password?</span>
          </div>
          <div className="loginBtn btn">
            <button type="submit" onClick={submitHandler}  /* onClick={()=>login()} */>Login</button>
          </div>
        </div>
      </div>
  );
};

export default LoginForm;
