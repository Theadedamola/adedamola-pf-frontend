import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export default function SEO({
  title = "Adedamola - Portfolio",
  description = "Portfolio of Adedamola, a Product Designer and Frontend Developer building digital experiences.",
  image = "/thumbnail.png",
  url = "https://adedamola-dev.netlify.app/",
  type = "website",
}: SEOProps) {
  // Ensure image is absolute URL if it's not
  const baseUrl = "https://adedamola-dev.netlify.app";
  const absoluteImage = image.startsWith("http")
    ? image
    : `${baseUrl}${image.startsWith("/") ? "" : "/"}${image}`;
  const absoluteUrl = url.startsWith("http")
    ? url
    : `${baseUrl}${url.startsWith("/") ? "" : "/"}${url.replace(baseUrl, "")}`;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Facebook tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:url" content={absoluteUrl} />

      {/* Twitter tags */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={absoluteImage} />
      <meta property="twitter:url" content={absoluteUrl} />
    </Helmet>
  );
}
