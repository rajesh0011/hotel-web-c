import React, { useState } from "react";
import hotelsData from "./hotelsData.js";
import { Mail } from "lucide-react";

const allHotels = Object.entries(hotelsData).flatMap(([region, hotels]) =>
  hotels.map(hotel => ({ ...hotel, region }))
);

const DirectoryAccordion = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    <div className="custom-accordion hotel-directory-accordion">
      <div className="accordion-item">
        <h6
          className="accordion-header text-white"
          style={{
            background: "#000",
            padding: "12px",
            cursor: "pointer",
            border: "1px solid #ddd",
          }}
          onClick={() => setIsOpen(prev => !prev)}
        >
          Hotel Directory
          <span style={{ float: "right" }}>
            {isOpen ? "−" : "+"}
          </span>
        </h6>

        {isOpen && (
          <div className="accordion-body" style={{ padding: "15px", border: "1px solid #ddd", borderTop: "none" }}>
            <div className="row">
              {allHotels.map((hotel, index) => (
                <div className="col-md-4 mb-4" key={index}>
                  <div className="hotel-item-data h-100" style={{ padding: "10px", border: "1px solid #eee", borderRadius: "4px" }}>
                    <h5>{hotel.name}</h5>
                    <h6>{hotel.region}</h6>
                    <p>{hotel.address}</p>
                    <p className="email-data">
                    <Mail size={12} className="me-1"></Mail>  Email :  <a href={`mailto:${hotel.email}`}>{hotel.email}</a>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    <style jsx>{`
      .hotel-directory-accordion {
        margin-top: 2rem;
      }
      .hotel-item-data {
        transition: transform 0.2s;
      }
      .hotel-item-data:hover {
        transform: scale(1);
      }
      .hotel-directory-accordion .hotel-item-data h5{
        margin-bottom: .5rem;
        font-size: 14px;
      }
      .hotel-directory-accordion .hotel-item-data h6{
        margin-bottom: .5rem;
        font-size: 13px;
      }
       .hotel-directory-accordion .hotel-item-data .email-data{
        font-size: 12px;
        color:#000;
        display: flex;
        align-items: center;  
        margin-bottom: 0;
      }
        .hotel-directory-accordion .hotel-item-data .email-data svg{
        font-size: 12px;
        margin-right: 4px;
      }
        .hotel-directory-accordion .hotel-item-data .email-data a{
          font-size: 12px;
          color:#000;
          text-decoration: none;
          margin-bottom: 0;
        }
    `}</style>
    </>
  );
};

export default DirectoryAccordion;
