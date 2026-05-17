import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") || "en";

  const subtitle =
    locale === "es"
      ? "Ingeniero de Software Full-Stack"
      : "Full-Stack Software Engineer";
  const tagline = "Next.js · TypeScript · React · AI-Augmented";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          padding: "60px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "20px",
              color: "#10b981",
              fontFamily: "monospace",
            }}
          >
            ~/pablo
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "56px",
              fontWeight: 700,
              color: "#fafafa",
              lineHeight: 1.1,
            }}
          >
            Pablo Aucapiña
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "28px",
              color: "#10b981",
              lineHeight: 1.3,
            }}
          >
            {subtitle}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "18px",
              color: "#a3a3a3",
              marginTop: "12px",
            }}
          >
            {tagline}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}