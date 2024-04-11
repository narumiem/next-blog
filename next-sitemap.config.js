// Configuration for next-sitemap
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://next-blog.narumiem.org/', // Your site's base URL
  generateRobotsTxt: false, // Whether to generate a robots.txt file
  sitemapSize: 7000, // Maximum number of pages per sitemap file (Google recommends a maximum of 50,000)

  // For more detailed configuration, you can use options like the following
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      // To exclude a specific path from crawling
      { userAgent: '*', disallow: '/secret-page' },
    ],
  },
};
