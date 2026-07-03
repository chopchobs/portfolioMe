import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

// Branded social-share card. Self-contained (no external fonts/assets) so it
// renders reliably at build time; uses the theme palette for on-brand preview.
export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#FAF9F5",
          padding: "72px 80px",
          borderLeft: "16px solid #C6613F",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#C6613F",
            fontWeight: 600,
          }}
        >
          Open to work
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              lineHeight: 1.05,
              color: "#141413",
              fontWeight: 600,
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 16,
              fontSize: 34,
              color: "#5E5D59",
            }}
          >
            {profile.role}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              maxWidth: 860,
              fontSize: 26,
              lineHeight: 1.5,
              color: "#5E5D59",
            }}
          >
            {profile.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 14,
              backgroundColor: "#C6613F",
              color: "#FAF9F5",
              fontSize: 30,
              fontWeight: 600,
            }}
          >
            NS
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#B0AEA5" }}>
            {profile.location}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
