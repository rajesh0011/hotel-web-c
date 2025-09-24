"use client";
import { useState } from "react";
import toast from "react-hot-toast";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Email is invalid";

    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\d{10,}$/.test(formData.phone.trim()))
      newErrors.phone = "Phone must be at least 10 digits";

    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    setLoading(true);
    setResponseMsg("");

    // 🔑 Split full name into first/last
    const [firstName, ...rest] = formData.name.trim().split(" ");
    const lastName = rest.join(" ");

    // 🔑 Build API payload
    const payload = {
  cityId: "0", // or default city ID if available
  propertyId: "0", // or default property ID if available
  firstName: firstName || "",
  lastName: lastName || "",
  mobileNo: formData.phone.trim(),
  email: formData.email.trim(),
  eventDate: new Date().toLocaleDateString("en-GB").replace(/\//g, "-"), // today's date in DD-MM-YYYY
  eventType: "Contact Us",
  roomsRequired: false,
  noOfRooms: "0",
  noOfGuests: "0",
  checkIn: new Date().toLocaleDateString("en-GB").replace(/\//g, "-"),
  checkOut: new Date().toLocaleDateString("en-GB").replace(/\//g, "-"),
  requestFrom: "Contact Us",
  remarks: `${formData.subject.trim()} - ${formData.message.trim()}`,
  remarks1: "",
  remarks2: "",
};


    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/common/EnquireNow`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (result.status === "success") {
        toast.success(result.message || "Form submitted successfully!");
        setResponseMsg(result.message || "Form submitted successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error(result.message || "Submission failed!");
        setResponseMsg(result.message || "Submission failed!");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      setResponseMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setTimeout(() => setResponseMsg(""), 8000);
    }
  };

  return (
    <aside className="fixed-blog-form">
      <div className="commerce-side-panel blog-page-contact-form">
        <form onSubmit={handleSubmit} noValidate>
          <h3 className="text-center"><b>Contact Us</b></h3>

          <fieldset>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
            />
            {errors.name && <small className="text-danger">{errors.name}</small>}
          </fieldset>

          <fieldset>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
            />
            {errors.email && <small className="text-danger">{errors.email}</small>}
          </fieldset>

          <fieldset>
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className={`form-control ${errors.phone ? "is-invalid" : ""}`}
            />
            {errors.phone && <small className="text-danger">{errors.phone}</small>}
          </fieldset>

          <fieldset>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className={`form-control ${errors.subject ? "is-invalid" : ""}`}
            />
            {errors.subject && <small className="text-danger">{errors.subject}</small>}
          </fieldset>

          <fieldset>
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              className={`form-control ${errors.message ? "is-invalid" : ""}`}
            />
            {errors.message && <small className="text-danger">{errors.message}</small>}
          </fieldset>

          <fieldset className="text-center">
            <button type="submit" disabled={loading} className="btn contactSubmit-blog mt-1">
              {loading ? "Sending..." : "Submit"}
            </button>

            {responseMsg && (
              <p className="mt-3" style={{ color: "green", fontWeight: "bold" }}>
                {responseMsg}
              </p>
            )}
          </fieldset>
        </form>
      </div>
    </aside>
  );
};

export default ContactForm;
