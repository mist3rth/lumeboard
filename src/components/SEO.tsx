import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
}

export const SEO = ({ 
  title = "LUMEBOARD | La révolution du snowboard nocturne", 
  description = "Briser les codes de la nuit. Découvrez les planches Lumeboard équipées d'un système d'éclairage intégré pour vos sessions nocturnes. Précommandez maintenant." 
}: SEOProps) => {
  useEffect(() => {
    document.title = title;
    
    // Update or create meta description
    let metaDescription = document.querySelector("meta[name='description']");
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", description);

    // JSON-LD
    let script = document.querySelector("#structured-data") as HTMLScriptElement;
    if (!script) {
      script = document.createElement("script");
      script.id = "structured-data";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Lumeboard",
      "description": description,
      "brand": {
        "@type": "Brand",
        "name": "Lumeboard"
      },
      "offers": {
        "@type": "AggregateOffer",
        "lowPrice": "649.00",
        "highPrice": "849.00",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/PreOrder"
      }
    });

  }, [title, description]);

  return null;
};
