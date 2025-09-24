'use client';
import React, { useState } from 'react';

const CareerForm = ({ cityId, propertyId }) => {
 const [formData, setFormData] = useState({
  firstName: '',
  lastName:  '',
  email:     '',
  mobileNo:  '',
  profile:   '',
  cv:        null,   // better to store File object instead of string
  remarks:   '',
});
  const [loading, setLoading] = useState(false);
  const [notice, setNotice]   = useState({ type: '', text: '' });

 const handleChange = (e) => {
  const { name, value, files } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: files ? files[0] : value, // if file input, take first file
  }));
  setNotice({ type: '', text: '' });
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotice({ type: '', text: '' });

    // Basic required validation (phone often required by this API)
    if (!formData.mobileNo?.trim()) {
      setNotice({ type: 'error', text: 'Phone is required.' });
      return;
    }

const payload = {
  cityId: "",
  propertyId: "",
  firstName: formData.firstName.trim(),
  lastName: formData.lastName.trim(),
  mobileNo: formData.mobileNo.trim(),
  email: formData.email.trim(),
  eventDate: "",
  eventType: "",
  roomsRequired: false,
  noOfRooms: "",
  noOfGuests: "",
  checkIn: "",
  checkOut: "",
  requestFrom: "Career Enquiry",
  remarks: formData.remarks.trim(),
  remarks1: formData.cv,
  remarks2: formData.profile.trim(),
};



    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/common/EnquireNow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // If server returns non-2xx, try to read JSON anyway to show message
      let data;
      try { data = await res.json(); } catch { data = null; }
      if (!res.ok) {
        const msg = data?.errorMessage || `Request failed (${res.status})`;
        throw new Error(msg);
      }

      if (data?.errorCode === '0') {
        setNotice({ type: 'success', text: 'Your query has been sent successfully!' });
        setFormData({ firstName: '', lastName: '', email: '', mobileNo: '', remarks: '' });
      } else {
        // Show server-provided reason to debug quickly
        const msg = data?.errorMessage || 'Something went wrong. Please try again.';
        setNotice({ type: 'error', text: msg });
      }
    } catch (err) {
      setNotice({ type: 'error', text: err.message || 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="row justify-content-center mt-5">
      <div className="col-md-12">
        <p>If you think you're a great fit at The Clarks Hotels & Resorts, we welcome you to join our team and contribute to our success story.</p>
        <div className="contact-page-form mb-4">
          <h6 className="text-center">Please fill out the form below to begin your journey with us, and we'll be in touch with you soon.</h6>

          {notice.text ? (
            <div
              className={`alert ${notice.type === 'success' ? 'alert-success' : 'alert-danger'} mt-3`}
              role="alert"
            >
              {notice.text}
            </div>
          ) : null}

          <form className="row mt-4" onSubmit={handleSubmit}>
            <div className="col-md-6 mb-3">
                <div className='form-group'>
                  <label htmlFor="firstName" className="form-label">First Name</label>
                  <input
                    type="text" className="form-control" id="firstName" name="firstName"
                    value={formData.firstName} onChange={handleChange} required
                  />
                </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className='form-group'>
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input
                  type="text" className="form-control" id="lastName" name="lastName"
                  value={formData.lastName} onChange={handleChange} required
                />
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className='form-group'>
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email" className="form-control" id="email" name="email"
                  value={formData.email} onChange={handleChange} required
                />
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className='form-group'>
                <label htmlFor="mobileNo" className="form-label">Phone</label>
                <input
                  type="tel" className="form-control" id="mobileNo" name="mobileNo"
                  value={formData.mobileNo} onChange={handleChange} required
                />
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className='form-group'>
                <label htmlFor="profile" className="form-label">Profile</label>
                <input
                  type="text" className="form-control" id="profile" name="profile"
                  value={formData.profile} onChange={handleChange} required
                />
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className='form-group'>
                <label htmlFor="cv" className="form-label">Upload CV</label>
                <input
                    type="file"
                    className="form-control"
                    id="cv"
                    name="cv"
                    onChange={handleChange}
                    required
                  />

              </div>
            </div>
            <div className="col-md-12 mb-3 form-group">
              <label htmlFor="remarks" className="form-label">Message</label>
              <textarea
                className="form-control" id="remarks" name="remarks" rows={2}
                value={formData.remarks} onChange={handleChange} required
              />
            </div>
            <div className="col-md-12 mb-3 form-group text-center">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Sending…' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <style jsx>
      {`
      .contact-page-form{
      padding: 20px;
      border: 1px solid #eee;
      border-radius: 5px;
      background-color: #fff;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
        .contact-page-form input,
        .contact-page-form textarea {
          font-size: 14px !important;
          border-radius:0;
          outline:none;
          box-shadow:none;
          border-radius:0;
          border:1px solid #000;
        }
        .contact-page-form .btn-primary{
          font-size: 14px !important;
          border-radius: 0;
          outline: none;
          box-shadow: none;
          border: 1px solid #000;
          background-color: #000;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 0.1rem;
        }
        
      `}
    </style>
  </>
  );
};

export default CareerForm;
