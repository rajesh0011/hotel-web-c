'use client';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function BookingFormModal({
  venue,
  onClose,
  onSubmit,
  propertyName = '',
  propertyId = '',
  cityName = '',
  cityId = '',
}) {
  const [form, setForm] = useState({
    city: cityName,
    cityId: cityId,
    hotel: propertyName,
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    eventDate: null,
    eventType: 'Dining', // Pre-filled
    roomsRequired: '',
    guests: '',
    rooms: '',
    checkIn: null,
    checkOut: null,
    enquire: '',
  });
      const [showBookingModal, setShowBookingModal] = useState(false);
      const [successMessage, setSuccessMessage] = useState('');


const resetForm = () => {
  setForm({
    city: cityName,
    cityId: cityId,
    hotel: propertyName,
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    eventDate: null,
    eventType: 'Dining',
    roomsRequired: '',
    guests: '',
    rooms: '',
    checkIn: null,
    checkOut: null,
    enquire: '',
  });
};



  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      city: cityName,
      hotel: propertyName,
      cityId,
    }));
  }, [cityName, propertyName, cityId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'roomsRequired' && value === 'No' ? { rooms: '' } : {})
    }));
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleSubmit = async () => {
    try {
      const body = {
  cityId: String(form.cityId || ''),
  propertyId: String(propertyId || ''),   // ✅ comes from props
  firstName: form.firstName.trim(),
  lastName: form.lastName.trim(),
  mobileNo: form.phone.trim(),
  email: form.email.trim(),
  eventDate: form.eventDate ? formatDate(form.eventDate) : '',
  eventType: form.eventType || 'Dining',
  roomsRequired: form.roomsRequired === 'Yes',
  noOfRooms: form.rooms || '0',
  noOfGuests: form.guests || '0',
  checkIn: form.checkIn ? formatDate(form.checkIn) : '',
  checkOut: form.checkOut ? formatDate(form.checkOut) : '',
  requestFrom: 'Dinning Reservation',
  remarks: form.enquire || 'Dining',
  remarks1: venue?.dineName || '', // ✅ Extra: include venue info
  remarks2: '',
};


      const res = await fetch(`${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/common/EnquireNow`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

     if (res.ok && data.errorCode === '0') {
  setSuccessMessage('Enquiry submitted successfully!');
  onSubmit?.(form); // Safe call

  setTimeout(() => {
    resetForm();      // ✅ clear all fields
    setSuccessMessage(''); 
    onClose();        // ✅ close the modal
  }, 2000);
} else {
  alert(`Submission failed: ${data.errorMessage || 'Unknown error'}`);
}
   } catch (error) {
  console.error('Error submitting enquiry:', error?.message || error);
  alert(`Error submitting enquiry: ${error?.message || 'Please try again.'}`);
}
  };

  if (!venue) return null;

  return (
    <>
      <div
        className="modal fade show venue-popup"
        style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-3">
           <div className="modal-header">
  <h5 className="modal-title">
    Enquiry for {venue?.title || venue?.dineName}
  </h5>

  <button type="button" className="btn-close" onClick={onClose}>x</button>
</div>
            <div className="modal-body">
              <div className="row g-2">
                
                <div className="col-md-6">
                  <input type="text" name="city" className="form-control" value={form.city} disabled />
                </div>
                <div className="col-md-6">
                  <input type="text" name="hotel" className="form-control" value={form.hotel} disabled />
                </div>

               
                <div className="col-md-6">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className="form-control"
                    value={form.firstName}
                    onChange={handleChange}
                  />
                </div>

                {/* Last Name */}
                <div className="col-md-6">
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    className="form-control"
                    value={form.lastName}
                    onChange={handleChange}
                  />
                </div>

                {/* Phone */}
                <div className="col-md-6">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    className="form-control"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>

                {/* Email */}
                <div className="col-md-6">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="form-control"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>

                {/* Event Date */}
                <div className="col-md-6">
                  <DatePicker
                    selected={form.eventDate}
                    onChange={(date) => setForm((prev) => ({ ...prev, eventDate: date }))}
                    className="form-control"
                    placeholderText="Date"
                    dateFormat="dd-MM-yyyy"
                  />
                </div>

                {/* Guests */}
                <div className="col-md-6">
                  <input
                    type="number"
                    name="guests"
                    placeholder="No. of Guests"
                    className="form-control"
                    value={form.guests}
                    onChange={handleChange}
                  />
                </div>

               
                <div className="col-12 mt-3">
                  <textarea
                    name="enquire"
                    className="form-control"
                    rows={2}
                    placeholder="Message"
                    value={form.enquire}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12 text-center">
  <button
    className="btn btn-primary w-100 mt-3 venue-submit-btn"
    onClick={handleSubmit}
  >
    Submit
  </button>

  {successMessage && (
    <div className="mt-2 text-success" style={{ fontSize: '14px' }}>
      {successMessage}
    </div>
  )}
</div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .venue-popup .form-control {
          border-radius: 0 !important;
          font-size: 14px;
        }
        .venue-submit-btn {
          background-color: #000;
          color: #fff;
          border-radius: 0;
          font-size: 14px;
          text-transform: uppercase;
        }
        .venue-popup .modal-body .react-datepicker-wrapper {
          width: 100% !important;
        }
      `}</style>
    </>
  );
}
