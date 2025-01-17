import React from "react";
import { retroStyles } from "../styles/common";
import { FileText } from "lucide-react";

function ComingSoon() {
  return (
    <div style={retroStyles.container}>
      <h1 style={retroStyles.title}>Feature Coming Soon!</h1>
      <p style={retroStyles.subtitle}>
        We're working hard to bring this feature to you. Stay tuned!
      </p>

      <div
        style={{
          ...retroStyles.dropZone,
          backgroundColor: "#f8f4f1",
          textAlign: "center",
          padding: "2rem",
          border: "2px dashed #7a5230",
          borderRadius: "8px",
        }}
      >
        <FileText size={48} style={{ margin: "0 auto", color: "#7a5230" }} />
        <p style={{ marginTop: "1rem", color: "#3e2723" }}>
          This feature is under construction and will be available soon. 
        </p>
      </div>

      <button
        style={{
          ...retroStyles.button,
          marginTop: "2rem",
          cursor: "not-allowed",
          opacity: 0.5,
        }}
        disabled
      >
        Coming Soon
      </button>
    </div>
  );
}

export default ComingSoon;
