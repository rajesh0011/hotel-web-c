'use client';
import React, { useState } from 'react';

const ContactUsForm = ({ cityId, propertyId }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNo: '',
    remarks: '',
  });
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState({ type: '', text: '' });

  const nameRegex = /^[A-Za-z\s]+$/;   // Only letters & spaces
  const phoneRegex = /^[0-9]{10,15}$/; // Only digits, length 10-15

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setNotice({ type: '', text: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotice({ type: '', text: '' });

    // ✅ Validation
    if (!formData.firstName.trim() || !nameRegex.test(formData.firstName)) {
      setNotice({ type: 'error', text: 'Please enter a valid first name (letters only).' });
      return;
    }

    if (!formData.lastName.trim() || !nameRegex.test(formData.lastName)) {
      setNotice({ type: 'error', text: 'Please enter a valid last name (letters only).' });
      return;
    }

    if (!formData.email.trim()) {
      setNotice({ type: 'error', text: 'Email is required.' });
      return;
    }

    if (!formData.mobileNo.trim() || !phoneRegex.test(formData.mobileNo)) {
      setNotice({ type: 'error', text: 'Please enter a valid phone number (digits only, 10–15 characters).' });
      return;
    }

    if (!formData.remarks.trim()) {
      setNotice({ type: 'error', text: 'Message is required.' });
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
      eventType: "contact us",
      roomsRequired: false,
      noOfRooms: "",
      noOfGuests: "",
      checkIn: "",
      checkOut: "",
      requestFrom: "Corporate Contact Us",
      remarks: formData.remarks.trim(),
      remarks1: "",
      remarks2: ""
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
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="contact-page-form mb-4">
            <h6 className="text-center">Have a query? Contact Us</h6>

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

export default ContactUsForm;
