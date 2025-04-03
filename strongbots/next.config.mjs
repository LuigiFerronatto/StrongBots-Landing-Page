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

