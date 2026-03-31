import { useState } from "react";

export default function ReportForm({ onGenerate }) {
  const [reportType, setReportType] = useState("Income Statement");
  const [period, setPeriod] = useState("Current Month");
  const [format, setFormat] = useState("PDF");

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate({ reportType, period, format });
  };

  const handleReset = () => {
    setReportType("Income Statement");
    setPeriod("Current Month");
    setFormat("PDF");
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.heading}>Generate Report</h3>

      <form onSubmit={handleSubmit} style={styles.row}>

        {/* REPORT TYPE */}
        <div style={styles.field}>
          <label style={styles.label}>Report Type</label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            style={styles.input}
          >
            <option>Income Statement</option>
          </select>
        </div>

        {/* PERIOD */}
        <div style={styles.field}>
          <label style={styles.label}>Period</label>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            style={styles.input}
          >
            <option>Current Month</option>
          </select>
        </div>

        {/* FORMAT */}
        <div style={styles.field}>
          <label style={styles.label}>Format</label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            style={styles.input}
          >
            <option>PDF</option>
          </select>
        </div>

        {/* BUTTONS (RIGHT SIDE EXACT) */}
        <div style={styles.buttonGroup}>
          <button type="button" onClick={handleReset} style={styles.reset}>
            Reset
          </button>

          <button type="submit" style={styles.generate}>
            Generate Report
          </button>
        </div>

      </form>
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    border: "1px solid #eee",
    marginTop: "20px",
  },

  heading: {
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "15px",
  },

  row: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: "20px",
  },

  field: {
    display: "flex",
    flexDirection: "column",
  },

  label: {
    fontSize: "13px",
    color: "#555",
    marginBottom: "4px",
  },

  input: {
    padding: "6px 10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    minWidth: "180px",
    fontSize: "14px",
  },

  buttonGroup: {
    display: "flex",
    gap: "10px",
    alignItems: "flex-end",
  },

  reset: {
    background: "#f3f4f6",
    border: "1px solid #ddd",
    padding: "7px 14px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  generate: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "7px 16px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};