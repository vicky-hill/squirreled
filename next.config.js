const nextConfig = {
  env: {
    DB_URI: 'mongodb+srv://vicky:sweetwhitecat2018@cluster0.5hpkrft.mongodb.net/?retryWrites=true&w=majority',
    BASE_URL: 'http://localhost:3000/api',
    JWT_SECRET: 'WhiteCat2018'
  },
  images: {
    domains: ['ik.imagekit.io']
  },
  reactStrictMode: true,
  distDir: '.next'
}

module.exports = nextConfig
