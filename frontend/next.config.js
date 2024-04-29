/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    NEXT_PUBLIC_JWT_SECRET: process.env.NEXT_PUBLIC_JWT_SECRET,
    NEXT_PUBLIC_INSTAGRAM_LINK: process.env.NEXT_PUBLIC_INSTAGRAM_LINK,
    NEXT_PUBLIC_FACEBOOK_LINK: process.env.NEXT_PUBLIC_FACEBOOK_LINK,
    NEXT_PUBLIC_ADDRESS: process.env.NEXT_PUBLIC_ADDRESS,
    NEXT_PUBLIC_EMAIL: process.env.NEXT_PUBLIC_EMAIL,
    NEXT_PUBLIC_TELEPHONE: process.env.NEXT_PUBLIC_TELEPHONE,
  },
};

const withNextIntl = require("next-intl/plugin")("./i18n.js");

module.exports = withNextIntl(nextConfig);
