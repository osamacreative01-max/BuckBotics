import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* cacheComponents / partialPrefetching left off: the /contact enquiry
     form must exist in raw HTML (progressive enhancement, crawlers).
     The rest of the site is statically prerendered. */
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
