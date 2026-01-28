import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ContactUs.scss";
const BLOCKED_DOMAINS = [
  "tempmail.com",
  "yopmail.com",
  "mailinator.com",
  "10minutemail.com",
];


const BAD_WORDS = ["spam", "casino", "free money", "xxx", "crypto"];

const NAME_REGEX = /^[a-zA-ZçəğıöşüÇƏĞIÖŞÜ\s]+$/;


const URL_REGEX = /(https?:\/\/[^\s]+)/g;


const HTML_TAG_REGEX = /<[^>]*>/g;

interface FormData {
  name: string;
  email: string;
  message: string;
  honeypot: string; 
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const ContactUs = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    honeypot: "", 
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({}); 
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [id]: undefined }));
    }
  };
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id } = e.target;
    setTouched((prev) => ({ ...prev, [id]: true }));
    validateField(id, formData[id as keyof FormData]);
  };
  const validateField = (fieldId: string, value: string) => {
    let errorMsg = "";

    switch (fieldId) {
      case "name":
        if (!value.trim()) {
          errorMsg = "Name is required.";
        } else if (value.trim().length < 3) {
          errorMsg = "Name is too short (min 3 chars).";
        } else if (value.trim().length > 50) {
          errorMsg = "Name is too long (max 50 chars).";
        } else if (!NAME_REGEX.test(value)) {
          errorMsg = "Name can only contain letters (no numbers/symbols).";
        }
        break;

      case "email":
        const emailParts = value.split("@");
        const domain = emailParts.length === 2 ? emailParts[1] : "";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!value.trim()) {
          errorMsg = "Email is required.";
        } else if (!emailRegex.test(value)) {
          errorMsg = "Please enter a valid email address.";
        } else if (BLOCKED_DOMAINS.includes(domain)) {
          errorMsg = "Temporary or spam emails are not allowed.";
        }
        break;

      case "message":
        if (!value.trim()) {
          errorMsg = "Message is required.";
        } else if (value.trim().length < 20) {
          errorMsg = "Please write a bit more detail (min 20 chars).";
        } else if (value.trim().length > 1000) {
          errorMsg = "Message is too long (max 1000 chars).";
        } else if (HTML_TAG_REGEX.test(value)) {
          errorMsg = "HTML tags are not allowed for security reasons.";
        } else if (URL_REGEX.test(value)) {
          errorMsg = "Links are not allowed in the message.";
        } else if (
          BAD_WORDS.some((word) => value.toLowerCase().includes(word))
        ) {
          errorMsg = "Your message contains inappropriate content.";
        }
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [fieldId]: errorMsg || undefined }));
    return errorMsg === "";
  };

  const validateForm = (): boolean => {
    const isNameValid = validateField("name", formData.name);
    const isEmailValid = validateField("email", formData.email);
    const isMessageValid = validateField("message", formData.message);
    setTouched({ name: true, email: true, message: true });

    return isNameValid && isEmailValid && isMessageValid;
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    if (formData.honeypot !== "") {
      console.warn("Bot detected! Submission blocked.");
      return; 
    }

    if (validateForm()) {
      setIsLoading(true);

      setTimeout(() => {
        console.log("Valid Data Submitted:", formData);
        setIsSubmitted(true);
        setIsLoading(false);
        setFormData({ name: "", email: "", message: "", honeypot: "" });
        setTouched({});

        setTimeout(() => setIsSubmitted(false), 5000);
      }, 1500);
    }
  };

  return (
    <div className="contact-page">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">HOME</Link> / <span>CONTACT US</span>
        </div>

        <h1 className="page-title">CONTACT US</h1>

        <div className="content-wrapper">
          <div className="text-section">
            <p>For quick and easy answers, use our 'live chat' feature.</p>
            <p>
              Alternatively, contact us below and we aim to respond within 24
              hours.
            </p>
            <p>
              Email:{" "}
              <a href="mailto:info@houseofisabella.co.uk">
                info@houseofisabella.co.uk
              </a>
            </p>
          </div>

          <div className="opening-hours">
            <h3>Opening hours</h3>
            <p>Monday to Friday 9am to 9pm (GMT)</p>
            <p>Saturday 10am to 6pm</p>
          </div>

          <h3 className="form-title">THANKS FOR REACHING US!</h3>

          {isSubmitted && (
            <div className="success-message">
              ✅ Thank you! Your message has been sent successfully.
            </div>
          )}

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div
              style={{ display: "none", position: "absolute", left: "-9999px" }}
            >
              <label htmlFor="honeypot">Website</label>
              <input
                type="text"
                id="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">NAME</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Only letters allowed"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur} 
                  className={touched.name && errors.name ? "input-error" : ""}
                />
                {touched.name && errors.name && (
                  <span className="error-text">⚠️ {errors.name}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">EMAIL *</label>
                <input
                  type="email"
                  id="email"
                  placeholder="example@mail.com"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur} 
                  className={touched.email && errors.email ? "input-error" : ""}
                />
                {touched.email && errors.email && (
                  <span className="error-text">⚠️ {errors.email}</span>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">MESSAGE</label>
              <textarea
                id="message"
                placeholder="No links or HTML allowed. Min 20 chars."
                rows={6}
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur} 
                className={
                  touched.message && errors.message ? "input-error" : ""
                }
              ></textarea>
              <div className="char-count">
                {formData.message.length} / 1000 characters
              </div>
              {touched.message && errors.message && (
                <span className="error-text">⚠️ {errors.message}</span>
              )}
            </div>

            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? "SENDING..." : "SUBMIT"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
