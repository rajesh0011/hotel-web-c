// app/corporate/[slug]/page.js
import DiningPage from './Dining';
import EventsPage from './Events';
import MicePage from './Mice';

async function fetchCityData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/property/GetCityWithProperty`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function CorporatePage({ params }) {
  const { slug } = params;

  if (slug === "dining") {
    const cityData = await fetchCityData();
    return <DiningPage cities={cityData.data || []} />;
  }
  if (slug === "events") {
    const cityData = await fetchCityData();
    return <EventsPage cities={cityData.data || []} />;
  }

  if (slug === "mice") {
    const cityData = await fetchCityData();
    return <MicePage cities={cityData.data || []} />;
  }

  return <div>Other Pages</div>;
}
