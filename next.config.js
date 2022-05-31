/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    outputStandalone: true,
  },
  images: {
    domains: ['avatars.githubusercontent.com', 'media.giphy.com', 'owaurtouhnwwdwxvgaoy.supabase.co'],
  },
  env: {
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    SUPABASE_URL: process.env.SUPABASE_URL
  }
}

module.exports = nextConfig
