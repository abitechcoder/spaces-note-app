import React, { useEffect, useState } from "react";
import { FaApple, FaGoogle } from "react-icons/fa";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { TextInput, Spinner } from "../components/auth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Navbar } from "../components/landing_page";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login, reset, socialLogin } from "../features/auth/authSlice";
import { Axios } from "../Axios";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  //   Google login function
  const googleLoginHandler = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userResponse = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        }
      );
      const user = userResponse.data;
      if (user) {
        const response = await Axios.post("/auth/google/signin/", { user });
        const { userAccount, accessToken } = response.data;
        const data = {
          userAccount,
          accessToken,
        };
        dispatch(socialLogin(data));
      }
    },
    onError: (error) => console.log(error),
  });

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      setIsLoggingIn(false);
      navigate("/dashboard");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    setIsLoggingIn(true);
    setTimeout(() => {
      dispatch(login(data));
    }, 2000)
  };

  return (
    <section>
      <div className="p-4 lg:p-0">
        <Navbar currentLocation={location.pathname} />
      </div>
      <div className="min-h-[90vh] bg-white grid place-items-center text-black">
        <div className="w-full md:w-[70%] lg:w-[40%] px-4">
          <div>
            <h1 className="font-inter text-2xl md:text-4xl pb-4 md:pb-8 text-center md:text-left">
              Sign-In
            </h1>
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 py-4 border-b-2">
              <button className="custom-button bg-[#f7f7f7] border-[1.5px] flex gap-2 items-center">
                <FaApple />
                <p className="font-dm font-bold text-sm">LOGIN WITH APPLE</p>
              </button>
              <button
                className="custom-button bg-[#f7f7f7] border-[1.5px] flex gap-2 items-center"
                onClick={googleLoginHandler}
              >
                <FaGoogle />
                <p className="font-dm font-bold text-sm">LOGIN WITH GOOGLE</p>
              </button>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="py-8 grid gap-4">
              <TextInput
                type="email"
                placeholder="E-MAIL"
                {...register("email", {
                  pattern: {
                    value: /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
                    message: "Bad Email Address Format",
                  },
                  required: "Email Address is required",
                })}
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && <p role="alert" className="text-red-500">{errors.email.message}</p>}
              <div className="flex gap-2 items-center">
                <TextInput
                  type="password"
                  placeholder="PASSWORD"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be more than 8 characters",
                    },
                    maxLength: {
                      value: 30,
                      message: "Password must be less than 30 characters",
                    },
                  })}
                  aria-invalid={errors.password ? "true" : "false"}
                />
                <AiOutlineQuestionCircle size={30} color="#242424" />
              </div>
              {errors.password && <p role="alert" className="text-red-500">{errors.password.message}</p>}
              <p className="text-gray-500 font-dm">FORGOT PASSWORD?</p>
            </div>

            <div className="grid place-items-center">
              <div className="flex items-center gap-4">
                <button
                  className="custom-button font-dm bg-[#7F6BFF] text-white"
                  type="submit"
                >
                  {isLoggingIn ? "Logging In..." : "LOGIN"}
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="custom-button font-dm text-black"
                >
                  SIGN UP
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
