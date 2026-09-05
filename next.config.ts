import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/sem-paid-growth",
        destination: "/agencia-marketing-digital/google-ads",
        statusCode: 301,
      },
      {
        source: "/agencia-marketing-digital/sem-paid-growth",
        destination: "/agencia-marketing-digital/google-ads",
        statusCode: 301,
      },
      {
        source: "/servicios/sem-paid-growth",
        destination: "/agencia-marketing-digital/google-ads",
        statusCode: 301,
      },
      {
        source: "/cro-landing-systems",
        destination: "/diseno-landing-pages",
        statusCode: 301,
      },
      {
        source: "/cro-landing-system",
        destination: "/diseno-landing-pages",
        statusCode: 301,
      },
      {
        source: "/agencia-marketing-digital/cro-landing-systems",
        destination: "/diseno-landing-pages",
        statusCode: 301,
      },
      {
        source: "/agencia-marketing-digital/cro-landing-system",
        destination: "/diseno-landing-pages",
        statusCode: 301,
      },
      {
        source: "/servicios/cro-landing-systems",
        destination: "/diseno-landing-pages",
        statusCode: 301,
      },
      {
        source: "/servicios/cro-landing-system",
        destination: "/diseno-landing-pages",
        statusCode: 301,
      },
      {
        source: "/servicios",
        destination: "/agencia-marketing-digital",
        permanent: true,
      },
      {
        source: "/servicios/:path*",
        destination: "/agencia-marketing-digital/:path*",
        permanent: true,
      },
      {
        source: "/diseno-web",
        destination: "/diseno-pagina-web-profesional",
        permanent: true,
      },
      {
        source: "/diseno-web/:path*",
        destination: "/diseno-pagina-web-profesional/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
