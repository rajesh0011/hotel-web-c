"use client"; // if using app directory

import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

const ContactFormBrand = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    query: "",
  });

  const handleChange = (field) => (e) => {
    const value = field === "phone" ? e : e.target.value;
    setFormData({ ...formData, [field]: value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    cityId: "0",
    propertyId: "0",
    firstName: formData.name.trim(),
    lastName: "",
    mobileNo: formData.phone.trim(),
    email: formData.email.trim(),
    eventDate: "",
    eventType: "",
    roomsRequired: false,
    noOfRooms: "0",
    noOfGuests: "0",
    checkIn: "",
    checkOut: "",
    requestFrom: "Partner with Us",
    remarks: formData.query.trim(),
    remarks1: "",
    remarks2: "",
  };

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/common/EnquireNow`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok && data.errorCode === '0') {
      alert('Your enquiry has been submitted successfully!');
      setFormData({ name: '', email: '', phone: '', query: '' }); // Clear form
    } else {
      alert(`Submission failed: ${data.errorMessage || 'Unknown error'}`);
    }
  } catch (error) {
    alert('Something went wrong while submitting. Please try again.');
  }
};


  return (
    <div className="container py-5 contactbrand">
      <h2 className="text-center mb-4">Contact Us for Queries</h2>
      <p className="text-center mb-3 fs-5">
        For more information regarding hotel acquisition and how to partner with
        us, please contact our Development Team <br></br>at{" "}
        <strong>+91 95990 83785 | +91 95870 57777</strong> or{" "}
        <a href="mailto:association@theclarkshotels.com">
          association@theclarkshotels.com
        </a>
        .
      </p>

      <form onSubmit={handleSubmit} className="mt-4 w70 mx-auto">
        <div className="mb-4 row align-items-center">
          <label className="col-md-3 fw-bold">Name</label>
          <div className="col-md-9">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your Name"
              value={formData.name}
              onChange={handleChange("name")}
              required
            />
          </div>
        </div>

        <div className="mb-4 row align-items-center">
          <label className="col-md-3 fw-bold">Email ID</label>
          <div className="col-md-9">
            <input
              type="email"
              className="form-control"
              placeholder="Enter Your Email ID"
              value={formData.email}
              onChange={handleChange("email")}
              required
            />
          </div>
        </div>

        <div className="mb-4 row align-items-center">
          <label className="col-md-3 fw-bold">Contact / Mobile</label>
          <div className="col-md-9">
            <PhoneInput
              country={"in"}
              value={formData.phone}
              onChange={handleChange("phone")}
              inputClass="form-control"
              inputStyle={{ width: "100%" }}
              containerStyle={{ width: "100%" }}
              required
            />
          </div>
        </div>

        <div className="mb-4 row align-items-start">
          <label className="col-md-3 fw-bold">Your Query</label>
          <div className="col-md-9">
            <textarea
              className="form-control"
              rows="4"
              placeholder="Please type your query here"
              value={formData.query}
              onChange={handleChange("query")}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="offset-md-3 col-md-9 text-start">
            <button type="submit" className="btn btn-primary px-5 py-2 fs-6 w-100 text-uppercase">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactFormBrand;
