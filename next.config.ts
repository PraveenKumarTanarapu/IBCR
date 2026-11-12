import type { NextConfig } from "next";

/**
 * Cache headers for everything the site serves out of `public/`.
 *
 * Next.js sends `max-age=0, must-revalidate` for public files, so every page
 * view re-checks every image, texture and video with the server. On shared
 * hosting several thousand kilometres from most visitors, that round trip —
 * repeated for every asset, on every navigation — is most of what makes the
 * site feel slow. The files themselves have not changed.
 *
 * Images get a day, because they are still being added and replaced;
 * stale-while-revalidate then lets the browser paint the copy it already has
 * while it fetches a newer one in the background, so a replacement still
 * appears without anyone waiting on it. Footage, globe textures and brand
 * marks change rarely, so they get a week.
 *
 * `/_next/static` is content-hashed by the build and already cached for a year
 * by Next.js itself — it needs nothing here.
 */
const DAY = 60 * 60 * 24;
const WEEK = DAY * 7;
const MONTH = DAY * 30;

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: `public, max-age=${DAY}, stale-while-revalidate=${MONTH}`,
          },
        ],
      },
      {
        source: "/video/:path*",
        headers: [{ key: "Cache-Control", value: `public, max-age=${WEEK}` }],
      },
      {
        source: "/textures/:path*",
        headers: [{ key: "Cache-Control", value: `public, max-age=${WEEK}` }],
      },
      {
        source: "/brand/:path*",
        headers: [{ key: "Cache-Control", value: `public, max-age=${WEEK}` }],
      },
    ];
  },
};

export default nextConfig;
