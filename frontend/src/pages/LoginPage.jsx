import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from 'formik'
import { loginSchema } from "../schemas/loginSchema";
import { useNavigate } from "react-router-dom";

function LoginPage() {

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const [data, setData] = useState(
      JSON.parse(sessionStorage.getItem("profile1")) || {}
    );
  
    useEffect(() => {
      sessionStorage.setItem("profile1", JSON.stringify(data));
    }, [data]);

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
      
      const res = await axios.post("http://localhost:9000/api/users/login", { email: values.email, password: values.password });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        setMessage("Logged In ...");

        setData(res.data.user)
        
        setTimeout(() => {
          console.log(data);
          if (res.data.user.isAdmin) {
            navigate("/AdminPage");
            console.log("this is admin page");
          } else {
            navigate("/Store");
            console.log("this is store page");
          }
          setMessage("");
        }, 2000);

      } else {
        setMessage(
          res.data.message || "Login failed! Check your email and password."
        );
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setMessage("Incorrect password!");
      } else {
        setMessage("Registration failed! Please try again.");
    }
    }
  };

  return (
<<<<<<< HEAD
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-teal-900 to-indigo-900">
      <div className="max-w-md w-full bg-gradient-to-br from-indigo-600 to-teal-600 p-10 rounded-3xl shadow-xl">
        <h1 className="text-5xl font-bold text-center text-pink-300 mb-6">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label className="block text-lg text-gray-200">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-4 border-2 border-transparent rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-teal-500 transition-all duration-300"
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg text-gray-200">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-4 border-2 border-transparent rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-teal-500 transition-all duration-300"
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-gradient-to-l hover:from-purple-700 hover:to-pink-600 transition-all duration-300"
          >
            Login
          </button>
        </form>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
};
=======
    <>
          <form onSubmit={handleSubmit} autoComplete="off">

            <h2 className="text-2xl text-amber-500 mb-4">
              Login
            </h2>

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

            <p className="text-amber-500 mt-2 text-center">{message}</p>

          </form>
    </>
  );
}
>>>>>>> 1bc849fdfb2716e72a5c2aa02e1d16fb272bb8ec

export default LoginPage;
