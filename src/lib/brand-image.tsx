/**
 * Generated brand mark for the favicon, Apple touch icon, and Open Graph image.
 * TODO(owner): Replace these generated images with official logo artwork if you have it.
 * The Organization schema logo points at /apple-icon.
 */

export function SparkIcon({ size }: { size: number }) {
  const fontSize = Math.max(10, Math.round(size * 0.38));

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#0f1729",
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
          fontSize,
          letterSpacing: -0.5,
        }}
      >
        GS
      </div>
      <div
        style={{
          display: "flex",
          height: Math.max(3, Math.round(size * 0.1)),
          width: "100%",
          backgroundColor: "#2563eb",
        }}
      />
    </div>
  );
}

export function SocialCard() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#0f1729",
        color: "#ffffff",
        padding: "64px 72px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: 84,
            height: 84,
            borderRadius: 18,
            backgroundColor: "#2563eb",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 32,
          }}
        >
          GS
        </div>
        <div style={{ display: "flex", marginLeft: 24, fontSize: 36 }}>
          Growth Spark Co.
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", fontSize: 56, lineHeight: 1.15, maxWidth: 980 }}>
          Business funding referrals for growing companies
        </div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 28, color: "#bfdbfe" }}>
          A marketing and referral service. Not a direct lender.
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", fontSize: 24, color: "#94a3b8" }}>www.growthsparkco.com</div>
        <div
          style={{
            display: "flex",
            width: 160,
            height: 8,
            backgroundColor: "#059669",
            borderRadius: 999,
          }}
        />
      </div>
    </div>
  );
}
