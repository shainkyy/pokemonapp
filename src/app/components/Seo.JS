import Head from "next/head";

export default function SEO() {
  return (
    <Head>
      <title>Pokemon Search App | Find Your Favorite Pokémon</title>
      <meta
        name="description"
        content="Search and discover detailed information about all your favorite Pokémon. Easy search, filtering by type, and beautiful card designs."
      />
      <meta
        name="keywords"
        content="Pokemon, Pokemon Search, Pokemon App, Pokedex, Pokemon Types, Pokemon Cards, Pokemon Finder"
      />
      <meta name="author" content="Shainky Yadav" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <meta
        property="og:title"
        content="Pokemon Search App | Find Your Favorite Pokémon"
      />
      <meta
        property="og:description"
        content="Search and discover detailed information about all your favorite Pokémon in an easy-to-use app with beautiful card designs."
      />
      <meta property="og:image" content="/images/pokemon-app-preview.png" />
      <meta property="og:url" content="https://yourwebsite.com" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Pokemon Search App" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Pokemon Search App" />
      <meta
        name="twitter:description"
        content="Discover all Pokémon in one place, with type filters and search functionality."
      />
      <meta name="twitter:image" content="/images/pokemon-app-preview.png" />
      <meta name="twitter:creator" content="@shainky121" />

      <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Pokemon Search App",
          "description": "Search and discover detailed information about Pokémon, with easy filtering and beautiful card designs.",
          "url": "https://yourwebsite.com",
          "author": {
            "@type": "Person",
            "name": "Shainky Yadav"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Shainky Yadav"
          },
          "applicationCategory": "EntertainmentApplication",
          "operatingSystem": "All",
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD"
          }
        }
        `}
      </script>

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
