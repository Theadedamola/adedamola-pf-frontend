import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export default function SEO({
  title = "Adedamola - Alausa",
  description = "Portfolio of Adedamola, a Product Designer and Frontend Developer building digital experiences.",
  image,
  url,
  type = "website",
}: SEOProps) {
  const baseUrl = "https://adedamola-dev.netlify.app";

  // Use fallbacks for null/undefined
  const seoImage = image || "/thumbnail.png";
  const seoUrl = url || baseUrl;

  // Ensure absolute URLs
  const absoluteImage = seoImage.startsWith("http")
    ? seoImage
    : `${baseUrl}${seoImage.startsWith("/") ? "" : "/"}${seoImage}`;

  const absoluteUrl = seoUrl.startsWith("http")
    ? seoUrl
    : `${baseUrl}${seoUrl.startsWith("/") ? "" : "/"}${seoUrl.replace(baseUrl, "")}`;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph / Facebook tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:url" content={absoluteUrl} />

      {/* Twitter tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />
      <meta name="twitter:url" content={absoluteUrl} />
    </Helmet>
  );
}
