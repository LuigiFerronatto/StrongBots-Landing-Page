/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'v0.blob.com',
      },
    ],
    unoptimized: process.env.NODE_ENV === 'development', // Desativa a otimização em desenvolvimento
    domains: ['localhost'], // Permite imagens do localhost
  },
  // Configurações de ambiente simplificadas
  env: {
    OPENAI_ENDPOINT: process.env.OPENAI_ENDPOINT,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    OPENAI_MODEL: process.env.OPENAI_MODEL,
    OPENAI_API_VERSION: process.env.OPENAI_API_VERSION,
GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Corrige a quebra de linha no Google Private Key
    GOOGLE_CLIENT_EMAIL: process.env.GOOGLE_CLIENT_EMAIL,
    GOOGLE_CALENDAR_ID: process.env.GOOGLE_CALENDAR_ID,
    GOOGLE_ACCESS_TOKEN: process.env.GOOGLE_ACCESS_TOKEN,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN,
  },
  // Otimização para produção
  swcMinify: true,
  poweredByHeader: false,
  // Desativar verificação de certificado em desenvolvimento
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'node-fetch': 'isomorphic-fetch',
      };
    }
    return config;
  },
};

export default nextConfig;

