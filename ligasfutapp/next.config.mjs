const nextConfig = {
  async redirects() {
    return [
      // {
      //   source: '/',
      //   destination: '/login/index.html',
      //   permanent: true,
      // },
      {
        source: '/',
        destination: '/home',
        permanent: false,
      },
    ];
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*', // Prefijo API
  //       destination: 'http://ligasfutappback-env.eba-6hdpamv6.us-east-1.elasticbeanstalk.com/:path*',
  //     },
  //   ];
  // },
  trailingSlash: false,
  images: {
    domains: ['ligasfutapp.com', 'd35odoryxb08yv.cloudfront.net'],
    // loader: 'imgix',
    // path: '',
    unoptimized: true,
  },
  output: 'export',
};

export default nextConfig;