const nextConfig = {
    serverExternalPackages: ["mongoose"], // Keep the external packages configuration
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'lh3.googleusercontent.com', // Allow images from this domain
          pathname: '/**', // Accept images from any path
        },
      ],
    },
    webpack(config) {
      config.experiments = {
        ...config.experiments,
        topLevelAwait: true, // Enable top-level await
      };
      return config;
    },
  };
  
  export default nextConfig;
  