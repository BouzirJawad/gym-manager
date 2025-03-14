import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { registerSchema } from "../schemas/registerSchema";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  
  const [User, setUser] = useState(
    JSON.parse(sessionStorage.getItem("User")) || {}
  );

  useEffect(() => {
    sessionStorage.setItem("User", JSON.stringify(User));
  }, [User]);

  const onSubmit = async (values, actions) => {
    await handleRegister(values ,()=>{actions.resetForm();});

  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      username: "",
      email: "",
      isCoach: false,
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit,
  });

  const handleRegister = async (values) => {
    try {
      const res = await axios.post("http://localhost:8080/api/users/register", {
        username: values.username,
        email: values.email,
        password: values.password,
        isCoach: values.isCoach,
      });

      setUser(res.data)

      setMessage("Registering ...");
      setTimeout(() => {
        console.log(res.data.isCoach);
        if (res.data.isCoach) {
        //   navigate("/AdminPage");
          console.log("this is coach page");
        } else {
        //   navigate("/Store");
          console.log("this is memebers page");
        }
        setMessage("");
      }, 2000);

    } catch (err) {
        if (err.response && err.response.status === 404) {
            setMessage("Email is already in use. Please try a different one.");
        } else {
            setMessage("Registration failed! Please try again.");
        }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} autoComplete="off">
        <h2 className="text-2xl text-blue-500 mb-4">Register</h2>

        <input
          type="text"
          name="username"
          placeholder="Full Name"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          className={
            errors.username && touched.username
              ? "input-error border-2 rounded-2xl p-2 mb-1 w-full"
              : "border-2 rounded-2xl p-2 mb-1 w-full"
          }
        />
        {errors.username && touched.username && (
          <p className="text-xs mb-1 text-red-500">{errors.username}</p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={
            errors.email && touched.email
              ? "input-error border-2 rounded-2xl p-2 mb-1 w-full"
              : "border-2 rounded-2xl p-2 mb-1 w-full"
          }
        />
        {errors.email && touched.email && (
          <p className="text-xs mb-1 text-red-500">{errors.email}</p>
        )}

        <select
          name="isCoach"
          placeholder="select your role"
          value={values.isCoach}
          onChange={(e) => handleChange({ 
            target: { name: "isCoach", value: e.target.value === "true" } 
          })}
          className={
            errors.email && touched.email
              ? "input-error border-2 rounded-2xl p-2 mb-1 w-full"
              : "border-2 rounded-2xl p-2 mb-1 w-full"
          }
        >
          <option value="false">Member</option>
          <option value="true">Coach</option>
        </select>
        {errors.isCoach && touched.isCoach && (
          <p className="text-xs mb-1 text-red-500">{errors.isCoach}</p>
        )}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className={
            errors.password && touched.password
              ? "input-error border-2 rounded-2xl p-2 mb-1 w-full"
              : "border-2 rounded-2xl p-2 mb-1 w-full"
          }
        />
        {errors.password && touched.password && (
          <p className="text-xs mb-1 text-red-500">{errors.password}</p>
        )}

        <input
          type="password"
          name="confirmPassword"
          placeholder="confirm password"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          className={
            errors.confirmPassword && touched.confirmPassword
              ? "input-error border-2 rounded-2xl p-2 mb-1 w-full"
              : "border-2 rounded-2xl p-2 mb-1 w-full"
          }
        />
        {errors.confirmPassword && touched.confirmPassword && (
          <p className="text-xs mb-1 text-red-500">{errors.confirmPassword}</p>
        )}

        <button
          disabled={isSubmitting}
          className="primary-btn w-full disabled:opacity-30"
          type="submit"
        >
          Register
        </button>

        <p className="text-blue-500 mt-2 text-center">{message}</p>
      </form>
    </>
  );
}

export default RegisterPage;
