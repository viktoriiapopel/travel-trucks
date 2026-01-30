"use client";

import { useState } from "react";
import css from "./BookingForm.module.css";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bookingDate: "",
    comment: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.bookingDate) {
      alert("Please fill required fields");
      return;
    }

    try {
      setLoading(true);
      setSuccess(false);

      // Імітація запиту (бо бекенд бронювання не передбачений)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess(true);

      // Очистка форми
      setFormData({
        name: "",
        email: "",
        bookingDate: "",
        comment: "",
      });
    } catch (error) {
      console.error("Booking error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css.wrapper}>
      <h3 className={css.title}>Book your camper now</h3>

      <form onSubmit={handleSubmit} className={css.form}>
        <input
          type="text"
          name="name"
          placeholder="Name*"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email*"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="bookingDate"
          value={formData.bookingDate}
          onChange={handleChange}
          required
        />

        <textarea
          name="comment"
          placeholder="Comment"
          value={formData.comment}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </form>

      {success && (
        <p className={css.success}>
          Booking successful 🎉
        </p>
      )}
    </div>
  );
}
