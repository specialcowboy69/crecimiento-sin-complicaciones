export type SeoCitySlug =
  | "madrid"
  | "valencia"
  | "barcelona"
  | "sevilla"
  | "malaga"
  | "alicante";

type SeoCityImageCredit = {
  city: string;
  author: string;
  authorHref: string;
  source: string;
  sourceHref: string;
  license?: { label: string; href: string };
  modifications?: string;
};

export const seoCityImageCredits: Record<SeoCitySlug, SeoCityImageCredit> = {
  madrid: {
    city: "Madrid",
    author: "Javier Perez Montes",
    authorHref: "https://commons.wikimedia.org/wiki/User:Nerve_net",
    source: "Wikimedia Commons",
    sourceHref: "https://commons.wikimedia.org/wiki/File:Palacio_Real_y_Catedral_de_la_Almudena_desde_el_mirador_de_la_Montana_de_Principe_Pio_-_Madrid_01.jpg",
    license: { label: "CC BY-SA 4.0", href: "https://creativecommons.org/licenses/by-sa/4.0/" },
    modifications: "Imagen redimensionada y convertida a WebP.",
  },
  valencia: {
    city: "Valencia",
    author: "Thomas K",
    authorHref: "https://unsplash.com/@thomasthomask",
    source: "Unsplash",
    sourceHref: "https://unsplash.com/photos/modern-architecture-with-bridge-over-water-dkn9FdBS0hQ",
  },
  barcelona: {
    city: "Barcelona",
    author: "Julian Lupyan",
    authorHref: "https://commons.wikimedia.org/wiki/User:Julian_Lupyan",
    source: "Wikimedia Commons",
    sourceHref: "https://commons.wikimedia.org/wiki/File:Sagrada_Fam%C3%ADlia,_Barcelona.jpg",
    license: { label: "CC0 1.0", href: "https://creativecommons.org/publicdomain/zero/1.0/" },
    modifications: "Imagen redimensionada y convertida a WebP.",
  },
  sevilla: {
    city: "Sevilla",
    author: "Gica-cobra",
    authorHref: "https://commons.wikimedia.org/wiki/User:Gica-cobra",
    source: "Wikimedia Commons",
    sourceHref: "https://commons.wikimedia.org/wiki/File:Plaza_de_Espana_de_Sevilla.jpg",
    license: { label: "CC BY-SA 4.0", href: "https://creativecommons.org/licenses/by-sa/4.0/" },
    modifications: "Imagen redimensionada y convertida a WebP.",
  },
  malaga: {
    city: "Málaga",
    author: "J.morano",
    authorHref: "https://commons.wikimedia.org/wiki/User:J.morano",
    source: "Wikimedia Commons",
    sourceHref: "https://commons.wikimedia.org/wiki/File:View_of_M%C3%A1laga_from_the_Gibralfaro_Castle.jpg",
    license: { label: "CC BY-SA 4.0", href: "https://creativecommons.org/licenses/by-sa/4.0/" },
    modifications: "Imagen redimensionada y convertida a WebP.",
  },
  alicante: {
    city: "Alicante",
    author: "Laborinquen",
    authorHref: "https://commons.wikimedia.org/wiki/User:Laborinquen",
    source: "Wikimedia Commons",
    sourceHref: "https://commons.wikimedia.org/wiki/File:Pasarela_Puerto_de_Alicante_con_el_castillo_Santa_B%C3%A1rbara_de_fondo.jpg",
    license: { label: "CC0 1.0", href: "https://creativecommons.org/publicdomain/zero/1.0/" },
    modifications: "Imagen redimensionada y convertida a WebP.",
  },
};
