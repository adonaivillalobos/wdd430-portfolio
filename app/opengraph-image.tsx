import { ImageResponse } from "next/og";

export const alt = "Adonai Villalobos | Project Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#111827",
          color: "white",
          fontSize: 64,
          fontWeight: 700,
        }}
      >
        <div>Adonai Villalobos</div>
        <div style={{ fontSize: 32, fontWeight: 400, marginTop: 16, color: "#9ca3af" }}>
          Project Portfolio
        </div>
      </div>
    ),
    { ...size }
  );
}