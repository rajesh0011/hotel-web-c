// app/summer/[slug]/page.js

import Header from "@/app/components/Header"; // adjust path if needed
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";
const API_BASE_URL_Home = process.env.NEXT_PUBLIC_API_BASE_URL_Home;
export async function generateMetadata({ params }) {
  const { slug } = params;

  try {
    const res = await fetch(`${API_BASE_URL_Home}/getSummerOffersDetails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ s_slug: slug }),
      cache: 'no-store',
    });

    if (!res.ok) throw new Error('Fetch error');

    const result = await res.json();
    const summerData = result?.data?.metaData || {};

    return {
      metadataBase: new URL('https://www.lemontreehotels.com/summer/'),
      alternates: { canonical: `/${slug}` },
      title: summerData.title || 'Lemon Tree Hotels',
      description: summerData.meta_description || '',
      keywords: summerData.meta_keyword || '',
    };
  } catch (error) {
    console.error('Metadata error:', error);
    return {
      title: 'Lemon Tree Hotels',
      description: '',
    };
  }
}

export default async function SummerPage({ params }) {
  const { slug } = params;

  const res = await fetch('https://www.lemontreehotels.com/getSummerOffersDetails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ s_slug: slug }),
    cache: 'no-store',
  });

  const result = await res.json();
  const summerDetails = result?.data?.summer;
  const offerData = result?.data?.summerHotels || [];

  return (
    <>
      <Header />

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
          <h1 className="text-center">
            {summerDetails?.summer_title}
          </h1>
          <div className="row">
            <div className="col-lg-12">
              {offerData.length > 0 && (
                <ul className="hotel-list">
                  {offerData.map((offer, index) => (
                    <li key={`${offer.summer_id}-${index}`}>
                      <Link href={`/${offer.city_slug}`} target="_blank" rel="noopener noreferrer">
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
                            <FontAwesomeIcon className="ms-2" icon={faArrowRight} fontSize={12} />
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
