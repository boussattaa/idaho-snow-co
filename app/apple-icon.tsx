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
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0F172A",
          borderRadius: "40px",
        }}
      >
        <svg
          width="158"
          height="158"
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            points="256,44 438,148 438,364 256,468 74,364 74,148"
            fill="#0B1324"
            stroke="#7DD3FC"
            strokeWidth="12"
            strokeLinejoin="round"
          />
          <path
            d="M256,92 L266,120 L294,130 L266,140 L256,168 L246,140 L218,130 L246,120 Z"
            fill="#F59E0B"
          />
          <polygon points="104,352 162,248 178,266 206,196 250,280 250,352" fill="#E0F2FE" />
          <polygon points="262,352 262,280 306,196 334,266 350,248 408,352" fill="#38BDF8" />
          <polygon points="154,352 256,184 358,352" fill="#0F172A" />
          <polygon points="164,352 256,196 348,352 320,352 256,244 192,352" fill="#F8FAFC" />
          <polygon points="198,352 256,252 314,352" fill="#7DD3FC" />
          <rect x="242" y="308" width="28" height="44" fill="#0F172A" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
