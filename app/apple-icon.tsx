import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
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
          backgroundColor: "#0F172A",
          borderRadius: "36px",
          border: "4px solid #0EA5E9",
          color: "#F8FAFC",
          padding: "18px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: "24px",
            color: "#0EA5E9",
            marginBottom: "4px",
          }}
        >
          ❄️
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "52px",
            fontWeight: 900,
            letterSpacing: "-2px",
            color: "#F8FAFC",
            lineHeight: 1,
          }}
        >
          ISC
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "10px",
            width: "92px",
            height: "6px",
            borderRadius: "9999px",
            backgroundColor: "#0EA5E9",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
