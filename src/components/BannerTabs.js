import React from 'react'

export default function BannerTabs() {
  return (
   <>
   <section className="container-fluid my-5 mt-0">
      <div className="row justify-content-center text-center g-4">
        {/* Card1 */}
        <div className="col-12 col-md-4">
          <div className="stat-box text-dark rounded-4 p-3 transition">
            <h2 className="fw-medium">3</h2>
            <p className="text-uppercase fs-6 m-0">Countries</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="col-12 col-md-4">
          <div className="stat-box text-dark rounded-4 p-3 transition">
            <h2 className="fw-medium">
              110<span>+</span>
            </h2>
            <p className="text-uppercase fs-6 m-0">Destinations</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="col-12 col-md-4">
          <div className="stat-box text-dark rounded-4 p-3 transition">
            <h2 className="fw-medium">
              133<span>+</span>
            </h2>
            <p className="text-uppercase fs-6 m-0">Hotels</p>
          </div>
        </div>
      </div>
    </section></>
  )
}
