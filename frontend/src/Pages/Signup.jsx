import Template from "../Components/login_signup/Template";
import { useState } from "react";

const SignupForm = ({ setIsLoggedIn }) => {
  const [action, setAction] = useState("Sign Up");
  return (
    <Template
      action={action}
      setAction={setAction}
      setIsLoggedIn={setIsLoggedIn}
    />
  );
};

export default SignupForm;
