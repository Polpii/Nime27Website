import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Every call the chairs wrote points at nime2027.org/submissions/ for
      // the guidance shared across tracks, which is the submission
      // instructions page. Those documents are going out to the community,
      // so the path has to land where the text promises.
      { source: "/submissions", destination: "/call/submission-instructions", permanent: true },
      { source: "/submissions/:path*", destination: "/call/:path*", permanent: true },
      // Camera-Ready was removed at the chairs' request: its content was a
      // checklist nobody had agreed to, and the real instructions reach
      // authors with their acceptance notice.
      { source: "/call/camera-ready", destination: "/call", permanent: true },
      // Renamed when the real track names came through.
      { source: "/call/student-consortium", destination: "/call/doctoral-consortium", permanent: true },
      { source: "/call/student-volunteers", destination: "/call", permanent: true },
    ];
  },
};

export default nextConfig;
