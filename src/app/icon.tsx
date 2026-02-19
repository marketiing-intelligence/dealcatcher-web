import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A0A0A",
          borderRadius: "6px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontFamily: "system-ui, sans-serif",
            fontWeight: 700,
            fontSize: "20px",
            lineHeight: 1,
          }}
        >
          <span style={{ color: "#FFFFFF" }}>D</span>
          <span style={{ color: "#34D399" }}>C</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
