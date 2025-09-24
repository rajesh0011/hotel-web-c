// app/[brandSlug]/[propertySlug]/overview/layout.js
import { headers } from "next/headers";

export async function generateMetadata({ params }) {
  const { propertySlug } = params;

  try {
    // Step 1: Get the property list
    const res = await fetch(`${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/property/GetPropertyList`, {
      cache: "no-store",
    });
    const json = await res.json();
    if (json.errorMessage !== "success") throw new Error("Failed to fetch property list");

    // Step 2: Find the matching property by slug
    const property = json.data.find((p) => p.propertySlug === propertySlug);
    const propertyId = property?.propertyId;

    if (!propertyId) {
      return {
        title: "Overview | Clarks Hotels",
        description: "Property not found.",
      };
    }

    // Step 3: Fetch meta tags for that propertyId
    const metaRes = await fetch(
      `${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/property/GetPropertyMetaTags?propertyId=${propertyId}`,
      { cache: "no-store" }
    );
    const metaJson = await metaRes.json();

    if (metaJson.errorMessage !== "success") throw new Error("Failed to fetch metadata");

    // Step 4: Find the overview metadata
    const overviewMeta = metaJson.data.find((item) => item.pageType === "Overview");

    return {
      title: overviewMeta?.metaTitle || "Overview | Clarks Hotels",
      description: overviewMeta?.metaDescription || "",
      keywords: overviewMeta?.metaKeywords || "",
      openGraph: {
        title: overviewMeta?.metaTitle || "Overview | Clarks Hotels",
        description: overviewMeta?.metaDescription || "",
      },
    };
  } catch (err) {
    console.error("Metadata fetch error:", err);
    return {
      title: "Overview | Clarks Hotels",
      description: "Explore the hotel overview.",
    };
  }
}

export default function OverviewLayout({ children }) {
  return <>{children}</>;
}
