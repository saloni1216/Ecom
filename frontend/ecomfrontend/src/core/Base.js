import React from "react";
import Menu from "./Menu";
import { useLocation } from "react-router-dom";
import shopperImg from "../assets/x6.png";

export const Base = ({
  title = "My Title",
  description = "My description",
  className = "text-white p-4",
  children,
}) => {

  const location = useLocation();

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Menu />

      {location.pathname === "/" && (
        <div className="hero-section" style={styles.hero}>
          <span style={{ ...styles.sparkle, top: "18%", left: "38%" }}>✦</span>
          <span style={{ ...styles.sparkle, top: "55%", left: "55%", fontSize: "10px" }}>✦</span>
          <span style={{ ...styles.sparkleLg, top: "15%", right: "30%" }}>✦</span>
          <span style={{ ...styles.sparkle, bottom: "20%", right: "18%", fontSize: "10px" }}>✦</span>
          <div style={styles.dotGrid} />
          <div className="hero-content" style={styles.heroContent}>
            <h1 className="hero-title" style={styles.heroTitle}>
              <span style={styles.heroTitlePink}>Home </span>Page
            </h1>
            <div style={styles.heroUnderline} />
            <p style={styles.heroSubtitle}>Welcome To Tshirt Store</p>
            <p style={styles.heroDesc}>Find the best quality tshirts for your style.</p>
            <button style={styles.heroBtn}>🛍 Shop Now</button>
          </div>
          <img src={shopperImg} alt="Happy Shopper"  className="hero-image" style={styles.heroImage} />
          <svg style={styles.wave} viewBox="0 0 1440 80" preserveAspectRatio="none">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white" fillOpacity="0.35" />
          </svg>
        </div>
      )}

      {/* ✅ flex:1 so footer hamesha bottom pe rahe */}
      <div className="container-fluid" style={{ width: "100%", flex: 1 }}>
        <div className={className}>{children}</div>
      </div>

      {/* ✅ Pink Footer */}
      <footer style={{
        background: "linear-gradient(135deg, #FF4FA3 0%, #e91e8c 100%)",
        padding: "30px 20px",
        textAlign: "center",
        marginTop: "auto",
        boxShadow: "0 -4px 20px rgba(255, 79, 163, 0.3)",
      }}>
        <h4 style={{ color: "#fff", fontWeight: "700", marginBottom: "14px", fontSize: "1.1rem" }}>
          💬 If you got any questions, reach me out at instagram
        </h4>
        <button className="btn btn-warning btn-lg" style={{
          borderRadius: "10px",
          fontWeight: "700",
          padding: "10px 30px",
          fontSize: "1rem",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
        }}>
          Contact Us
        </button>
        <div style={{ marginTop: "14px" }}>
          <span style={{ color: "#fce4ec", fontSize: "0.88rem" }}>
            ✨ An Amazing Django React Fullstack Project
          </span>
        </div>
      </footer>

    </div>
  );
};

const styles = {
  hero: {
    position: "relative",
    background: "linear-gradient(135deg, #fce4ec 0%, #f8bbd0 40%, #f48fb1 100%)",
    padding: "60px 60px 80px 60px",
    overflow: "hidden",
    minHeight: "220px",
    display: "flex",
    alignItems: "center",
  },
  heroContent: { position: "relative", zIndex: 2, maxWidth: "480px" },
  heroTitle: { fontSize: "3rem", fontWeight: "800", margin: "0 0 8px 0", lineHeight: 1.1, color: "#2d2d2d" },
  heroTitlePink: { color: "#e91e8c" },
  heroUnderline: { width: "40px", height: "3px", backgroundColor: "#e91e8c", borderRadius: "2px", marginBottom: "16px" },
  heroSubtitle: { color: "#c2185b", fontWeight: "600", fontSize: "1.1rem", margin: "0 0 6px 0" },
  heroDesc: { color: "#555", fontSize: "0.95rem", margin: "0 0 24px 0" },
  heroBtn: {
    backgroundColor: "#e91e8c", color: "white", border: "none",
    padding: "12px 28px", borderRadius: "8px", fontSize: "1rem",
    fontWeight: "600", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "8px",
  },
  heroImage: { position: "absolute", bottom: "0", right: "60px", height: "350px", objectFit: "contain", zIndex: 2, pointerEvents: "none" },
  sparkle: { position: "absolute", color: "white", fontSize: "14px", opacity: 0.8, pointerEvents: "none" },
  sparkleLg: { position: "absolute", color: "white", fontSize: "20px", opacity: 0.9, pointerEvents: "none" },
  dotGrid: {
    position: "absolute", top: "10%", left: "2%", width: "60px", height: "80px",
    backgroundImage: "radial-gradient(circle, #e91e8c44 1.5px, transparent 1.5px)",
    backgroundSize: "10px 10px", pointerEvents: "none",
  },
  wave: { position: "absolute", bottom: 0, left: 0, width: "100%", height: "80px", pointerEvents: "none" },
};