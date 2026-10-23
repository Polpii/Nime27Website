import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The printed call documents link to nime2027.org/submissions/, which is
      // where these pages lived before the track list was rebuilt. Those PDFs
      // are going out to the community, so the old path has to keep working.
      { source: "/submissions", destination: "/call", permanent: true },
      { source: "/submissions/:path*", destination: "/call/:path*", permanent: true },
      // Renamed when the real track names came through.
      { source: "/call/student-consortium", destination: "/call/doctoral-consortium", permanent: true },
      { source: "/call/student-volunteers", destination: "/call", permanent: true },
    ];
  },
};

export default nextConfig;
