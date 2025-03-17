import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from 'formik'
import { loginSchema } from "../schemas/loginSchema";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function LoginPage() {

  const navigate = useNavigate();

  const [User, setUser] = useState(
      JSON.parse(sessionStorage.getItem("User")) || null
    );
  
    useEffect(() => {
      sessionStorage.setItem("User", JSON.stringify(User));
    }, [User]);

  const onSubmit = async (values, action) => {
    await handleLogin(values, ()=>{action.resetForm();});
  }

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit,
  })


  const handleLogin = async () => {
    try {
      
      const res = await axios.post("http://localhost:8080/api/users/login", { email: values.email, password: values.password });

      if (res.data.token) {
        sessionStorage.setItem("authToken", res.data.token);
        setUser(res.data.user)
        
        toast.success("Logged In ...",{duration:3000});
        
        setTimeout(() => {
          if (res.data.user.isCoach) {
            navigate("/coach");
            console.log("this is coach page");
          } else {
            navigate("/member");
            console.log("this is members page");
          }
        }, 3000);

      } else {
        toast.error(
          res.data.message || "Login failed! Check your email and password."
        );
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast.error("Incorrect password!",{duration:3000});
      } else {
        toast.error("Registration failed! Please try again.",{duration:4000});
    }
    }
  };

  return (
    <>
          <form onSubmit={handleSubmit} autoComplete="off">

            <h2 className="text-2xl text-amber-500 mb-4">
              Login
            </h2>

            <Toaster position="top-center" />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.email && touched.email ? "input-error border-2 rounded-2xl p-2 mb-1 w-full" : "border-2 rounded-2xl p-2 mb-1 w-full"}
              />
              {errors.email && touched.email && (
                <p className="text-xs mb-1 text-red-500">{errors.email}</p>
              )}

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.password && touched.password ? "input-error border-2 rounded-2xl p-2 mb-1 w-full" : "border-2 rounded-2xl p-2 mb-1 w-full"}
              />
              {errors.password && touched.password && (
                <p className="text-xs mb-1 text-red-500">{errors.password}</p>
              )}

            <button className="sec-btn w-full" type="submit">
              Login
            </button>

          </form>
    </>
  );
}

export default LoginPage;
