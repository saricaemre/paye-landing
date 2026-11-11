import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  images: {
    // Gerçek görseller public/<kampanya>/ altına konulacak. Supabase'deki
    // mevcut medya kullanılmak istenirse bu alan adı zaten tanımlı.
    remotePatterns: [
      { protocol: "https", hostname: "iwdsswzfgxknjupgcjku.supabase.co" },
    ],
  },
};

export default nextConfig;
