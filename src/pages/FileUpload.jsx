import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UploadPage() {
  const navigate = useNavigate();

  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFile = (file) => {
    if (!file) return;

    if (!file.name.endsWith(".csv")) {
      alert("Upload a valid CSV file.");
      return;
    }

    setFileName(file.name);

    // Simulate processing (replace with API later)
    setTimeout(() => {
      setUploadSuccess(true);
    }, 800);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div style={styles.page}>
      <style>{globalStyles}</style>

      <div style={styles.container}>
        <div style={styles.badge}>● Advanced Financial Crime Detection</div>

        <h1 style={styles.title}>
          Detect Money Mule <span style={styles.highlight}>Networks</span>
        </h1>

        <p style={styles.subtitle}>
          Upload your transaction CSV to visualize fraud rings and suspicious accounts.
        </p>

        {/* Dropzone */}
        <div
          style={{
            ...styles.dropzone,
            ...(dragActive ? styles.dropzoneActive : {}),
            ...(uploadSuccess ? styles.dropzoneDisabled : {})
          }}
          onDragOver={(e) => {
            if (uploadSuccess) return;
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => !uploadSuccess && setDragActive(false)}
          onDrop={(e) => {
            if (uploadSuccess) return;
            handleDrop(e);
          }}
        >
          <div style={styles.icon}>⬆</div>
          <p style={{ margin: 5 }}>Drag & drop your CSV file here</p>
          <span style={styles.small}>or click to browse</span>

          {/* Hidden input only when upload not done */}
          {!uploadSuccess && (
            <input
              type="file"
              accept=".csv"
              onChange={(e) => handleFile(e.target.files[0])}
              style={styles.hiddenInput}
            />
          )}

          {!uploadSuccess && (
            <button style={styles.primaryBtn}>Choose CSV File</button>
          )}

          {fileName && (
            <div style={styles.fileName}>✔ {fileName}</div>
          )}
        </div>

        {/* Success Section */}
        {uploadSuccess && (
          <div style={styles.successBox}>
            <div style={styles.successIcon}>✔</div>
            <h3>Upload Successful</h3>
            <p style={{ color: "#94a3b8", fontSize: 14 }}>
              Transactions processed. Network ready for analysis.
            </p>

            <button
              style={styles.dashboardBtn}
              onClick={() => navigate("/dashboard")}
            >
              Go to Dashboard →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Styles ---------- */

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top, #0f172a 0%, #020617 60%, #000814 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    fontFamily: "Inter, sans-serif",
    color: "white",
  },
  container: {
    maxWidth: 700,
    width: "100%",
    textAlign: "center",
  },
  badge: {
    display: "inline-block",
    padding: "6px 14px",
    borderRadius: 20,
    fontSize: 12,
    background: "rgba(255,99,132,0.1)",
    color: "#f87171",
    marginBottom: 20,
  },
  title: {
    fontSize: 42,
    margin: 0,
  },
  highlight: {
    background: "linear-gradient(90deg,#f97316,#fb923c)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtitle: {
    marginTop: 10,
    color: "#94a3b8",
  },
  dropzone: {
    marginTop: 40,
    padding: 60,
    borderRadius: 20,
    border: "1px dashed #334155",
    background: "rgba(15,23,42,0.7)",
    position: "relative",
    transition: "0.3s",
  },
  dropzoneActive: {
    borderColor: "#3b82f6",
    boxShadow: "0 0 40px rgba(59,130,246,0.3)",
  },
  dropzoneDisabled: {
    pointerEvents: "none",
    opacity: 0.5,
    borderColor: "#22c55e",
  },
  hiddenInput: {
    position: "absolute",
    inset: 0,
    opacity: 0,
    cursor: "pointer",
  },
  icon: {
    fontSize: 30,
  },
  small: {
    fontSize: 13,
    color: "#64748b",
  },
  primaryBtn: {
    marginTop: 20,
    padding: "12px 26px",
    borderRadius: 10,
    border: "none",
    background: "linear-gradient(90deg,#2563eb,#3b82f6)",
    color: "white",
    cursor: "pointer",
  },
  fileName: {
    marginTop: 15,
    color: "#22c55e",
  },
  successBox: {
    marginTop: 30,
    padding: 25,
    borderRadius: 16,
    background: "rgba(34,197,94,0.08)",
    border: "1px solid #22c55e",
  },
  successIcon: {
    fontSize: 30,
    color: "#22c55e",
  },
  dashboardBtn: {
    marginTop: 15,
    padding: "12px 28px",
    borderRadius: 10,
    border: "none",
    background: "linear-gradient(90deg,#22c55e,#16a34a)",
    color: "white",
    fontWeight: 600,
    cursor: "pointer",
  },
};

const globalStyles = `
button:hover {
  transform: translateY(-2px);
}
`;
