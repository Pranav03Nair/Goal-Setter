import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, reset } from "../redux/auth/authSlice.js";

// import { Goal } from "lucide-react";
import { RegisterForm } from "@/components/register-form";

import { toast } from "react-toastify";
import Spinner from "../components/Spinner.jsx";

const Register = () => {
  //   FormData
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPass: "",
  });

  //   Destrcture for access In Form
  const { name, email, password, confirmPass } = formData;

  // ReduxState
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userToken, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || userToken) {
      navigate("/");
    }

    dispatch(reset());
  }, [userToken, isError, isSuccess, message, navigate, dispatch]);

  // FormFunctions
  const onChange = (e) => {
    setFormData((existing) => ({
      ...existing,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPass) {
      toast.error("Passwords don't match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        {/* <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-1 font-medium">
            <div className="flex size-6 items-center justify-center rounded-md text-primary-foreground">
              <Goal className="size-8" color="white" />
            </div>
            GET. SET. GO
          </a>
        </div> */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <RegisterForm
              name={name}
              email={email}
              password={password}
              confirmPass={confirmPass}
              onChange={onChange}
              onSubmit={onSubmit}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/assets/signin.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2]"
        />
      </div>
    </div>
  );
};

export default Register;
