import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer({
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  
  // Configuration for GitHub Pages deployment
  // These settings ensure assets are loaded correctly from the GitHub Pages URL
  // - basePath: Sets the base path for all URLs used in the app
  // - assetPrefix: Ensures static assets are loaded from the correct base URL
  // - trailingSlash: Helps with GitHub Pages routing
  output: "export",
  basePath: "/shot-matrix",
  assetPrefix: "/shot-matrix",
  trailingSlash: true,
  transpilePackages: ['@mantine/core', '@mantine/hooks']
});

