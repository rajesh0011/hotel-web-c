import Image from 'next/image';

const ServicesGrid = () => {
  return (
    <div className="container">
      <div className="row g-3">

        {/* Column 1 */}
        <div className="col-md-6">
          <div className="mb-3">
           <div className="overflow-hidden">
  <Image
    src="/images/brand-association/services/Food_ez31ck.webp"
    alt="Food and Beverage"
    className="img-fluid w-100 zoom-on-hover"
    width={800}
    height={500}
  />
</div>
          </div>

          <div className="row g-3">
            <div className="col-md-6">
                     <div className="overflow-hidden">
              <Image
                src="/images/brand-association/services/Sales_iy0eys.webp"
                alt="Sales & Marketing"
       className="img-fluid w-100 zoom-on-hover"
                width={400}
                height={250}
              />
              </div>
            </div>
            <div className="col-md-6">
                  <div className="overflow-hidden">
              <Image
                src="/images/brand-association/services/Design_Technical_Assistance_tkmnk2.webp"
                alt="Design & Technical Assistance"
    className="img-fluid w-100 zoom-on-hover"
                width={400}
                height={250}
              />
              </div>
            </div>
          </div>
        </div>

        {/* Column 2 */}
        <div className="col-md-6">
          <div className="mb-3">
                  <div className="overflow-hidden">

            <Image
              src="/images/brand-association/services/Human_y6kzjh.webp"
              alt="Human Resource Development"
    className="img-fluid w-100 zoom-on-hover"
              width={800}
              height={500}
            />
            </div>
          </div>

          <div className="row g-3">
            <div className="col-md-6">
                  <div className="overflow-hidden">

              <Image
                src="/images/brand-association/services/Revenue_br51yt.webp"
                alt="Revenue Management"
        className="img-fluid w-100 zoom-on-hover"
                width={400}
                height={250}
              />
              </div>
            </div>
            <div className="col-md-6">
                   <div className="overflow-hidden">
              <Image
                src="/images/brand-association/services/Asset_Management_lzvreb.webp"
                alt="Asset Management"
      className="img-fluid w-100 zoom-on-hover"
                width={400}
                height={250}
              />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ServicesGrid;
