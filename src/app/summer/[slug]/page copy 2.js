// app/summer/[slug]/page.js


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";

// Dummy data for summerDetails and offerData
const dummySummerDetails = {
  banner_image: "/images/summer/summer-offer-banner.jpg",
  summer_title: "Enjoy the Coolest Summer Offers with Lemon Tree Hotels!",
};

const dummyOfferData = [
  {
    summer_id: 1,
    city_slug: "delhi",
    city_name: "Delhi",
    image: "/images/summer/delhi.jpg",
    summer_title: "Delhi Summer Offer",
  },
  {
    summer_id: 2,
    city_slug: "mumbai",
    city_name: "Mumbai",
    image: "/images/summer/mumbai.jpg",
    summer_title: "Mumbai Summer Offer",
  },
  {
    summer_id: 3,
    city_slug: "goa",
    city_name: "Goa",
    image: "/images/summer/goa.jpg",
    summer_title: "Goa Summer Offer",
  },
];

export async function generateMetadata({ params }) {
  const { slug } = params;

  // Use dummy metadata for static generation
  const summerData = {
    title: `Summer Offer in ${slug.charAt(0).toUpperCase() + slug.slice(1)} | Lemon Tree Hotels`,
    meta_description: `Explore special summer offers for hotels in ${slug}. Enjoy exclusive discounts and memorable stays with Lemon Tree Hotels.`,
    meta_keyword: `${slug} summer hotel deals, Lemon Tree ${slug} offers`,
  };

  return {
    metadataBase: new URL('https://www.lemontreehotels.com/summer/'),
    alternates: { canonical: `/${slug}` },
    title: summerData.title,
    description: summerData.meta_description,
    keywords: summerData.meta_keyword,
  };
}

export default async function SummerPage({ params }) {
  const { slug } = params;

  const summerDetails = dummySummerDetails;
  const offerData = dummyOfferData;

  return (
    <>
  

      <div className="banner-beta-one banner h350">
        <img
          className="w-100"
          src={summerDetails?.banner_image || "/images/rewards_banner_10.jpg"}
          alt="Summer Banner"
          width={1920}
          height={350}
        />
      </div>

      <section className="choose-your-destination-block">
        <article className="container">
          <h1 className="text-center">{summerDetails?.summer_title}</h1>
          <div className="row">
            <div className="col-lg-12">
              {offerData.length > 0 && (
                <ul className="hotel-list">
                  {offerData.map((offer, index) => (
                    <li key={`${offer.summer_id}-${index}`}>
                      <Link
                        href={`/${offer.city_slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={offer.image}
                          alt={offer.summer_title || "Hotel Image"}
                          width="80"
                          height="80"
                        />
                        <div className="vactionWorkUpdatedContent">
                          <h3>{offer.city_name}</h3>
                          <p>
                            Hotels
                            <FontAwesomeIcon
                              className="ms-2"
                              icon={faArrowRight}
                              fontSize={12}
                            />
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              <div className="col-lg-12 text-center">
                <Link href="/hotels" className="explore-more-destination">
                  Explore more destinations
                </Link>
              </div>
            </div>
          </div>
        </article>
      </section>
    </>
  );
}
