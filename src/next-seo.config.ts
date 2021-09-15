const NextSeoConfig = {
  title: 'Shopify Nasa Challenge',
  description: 'An Instagram clone showing beautiful photos from the NASA APOD API',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://shopify-nasa-challenge.netlify.app',
    site_name: 'Shopify Nasa Challenge',
    title: 'Shopify Nasa Challenge',
    description: 'Beautiful photos from NASA, infinitely scrolled',
    images: [{
      url: 'https://res.cloudinary.com/bensthoughts/image/upload/v1631670713/shopify-nasa-challenge/og-image_v6enq5.jpg',
      width: 1200,
      height: 627,
      alt: 'Astronaut in space with earth background',
    }],
  },
  twitter: {
    handle: '@BensThoughts',
    site: '@BensThoughts',
    cardType: 'summary_large_image',
  },
};

export default NextSeoConfig;
