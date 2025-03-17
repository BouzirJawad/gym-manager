import React from "react";
import { useFormik } from "formik";
import { sessionSchema } from "../schemas/sessionSchema";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Navbar from "../components/Navbar";

const CreateSession = () => {
  const formik = useFormik({
    initialValues: {
      sessionName: "",
      coach: "",
      startTime: "",
      endTime: "",
      availableSlots: 3,
    },
    validationSchema: sessionSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.post("http://localhost:8080/api/sessions", values);
        toast.success("Session Created Successfully!");
        resetForm();
      } catch (error) {
        toast.error("Failed to create session. Please try again.");
        console.error("Error creating session:", error);
      }
    },
  });

  return (
    <>
    <Navbar />
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
        Create a Training Session
      </h2>
      <Toaster position="top-center" />
      
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Session Name */}
        <div>
          <label className="block text-gray-600">Session Name</label>
          <input
            type="text"
            name="sessionName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.sessionName}
            className="w-full p-2 border rounded"
          />
          {formik.touched.sessionName && formik.errors.sessionName && (
            <p className="text-red-500 text-sm">{formik.errors.sessionName}</p>
          )}
        </div>

        {/* Coach Name */}
        <div>
          <label className="block text-gray-600">Coach Name</label>
          <input
            type="text"
            name="coach"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.coach}
            className="w-full p-2 border rounded"
            />
          {formik.touched.coach && formik.errors.coach && (
            <p className="text-red-500 text-sm">{formik.errors.coach}</p>
          )}
        </div>

        {/* Start Time */}
        <div>
          <label className="block text-gray-600">Start Time</label>
          <input
            type="datetime-local"
            name="startTime"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.startTime}
            className="w-full p-2 border rounded"
          />
          {formik.touched.startTime && formik.errors.startTime && (
            <p className="text-red-500 text-sm">{formik.errors.startTime}</p>
          )}
        </div>

        {/* End Time */}
        <div>
          <label className="block text-gray-600">End Time</label>
          <input
            type="datetime-local"
            name="endTime"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.endTime}
            className="w-full p-2 border rounded"
            />
          {formik.touched.endTime && formik.errors.endTime && (
            <p className="text-red-500 text-sm">{formik.errors.endTime}</p>
          )}
        </div>

        {/* Available Slots */}
        <div>
          <label className="block text-gray-600">Available Slots</label>
          <select
            name="availableSlots"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.availableSlots}
            className="w-full p-2 border rounded"
          >
            {[3, 2, 1, 0].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          {formik.touched.availableSlots && formik.errors.availableSlots && (
            <p className="text-red-500 text-sm">{formik.errors.availableSlots}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Create Session
        </button>
      </form>
    </div>
  </>
  );
};

export default CreateSession;
