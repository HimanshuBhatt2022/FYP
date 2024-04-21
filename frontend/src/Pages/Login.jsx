import React, { useEffect, useState } from "react";
import Template from "../Components/login_signup/Template";

export const Login = ({ setIsLoggedIn }) => {
  const [action, setAction] = useState("Login");
  return (
    <Template
      action={action}
      setAction={setAction}
      setIsLoggedIn={setIsLoggedIn}
    />
  );
};
export default Login;
