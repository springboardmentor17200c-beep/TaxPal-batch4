import { useState } from "react";
import ReportForm from "../components/reports/ReportForm";

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  const handleGenerate = (data) => {
    const newReport = {
      name: data.reportType,
      generated: new Date().toLocaleDateString(),
      period: data.period,
      format: data.format,
    };

    setReports([newReport, ...reports]);
    setSelectedReport(newReport);
  };

  return (
    <div style={{ background: "#f5f7fb", minHeight: "100vh", padding: "30px" }}>

      <h2 style={{ fontSize: "22px", fontWeight: "600" }}>
        Financial Reports
      </h2>
      <p style={{ color: "#777" }}>
        Generate and download your financial reports
      </p>

      {/* FORM */}
      <ReportForm onGenerate={handleGenerate} />

      {/* RECENT REPORTS */}
      <div style={{ background: "#fff", padding: "20px", marginTop: "20px", borderRadius: "10px" }}>
        <h3>Recent Reports</h3>

        {reports.length === 0 ? (
          <p style={{ textAlign: "center", color: "#999" }}>No results.</p>
        ) : (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", fontWeight: "bold" }}>
              <span>Report Name</span>
              <span>Generated</span>
              <span>Period</span>
              <span>Format</span>
            </div>

            {reports.map((r, i) => (
              <div
                key={i}
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", padding: "10px", background: "#fafafa", marginTop: "5px", cursor: "pointer" }}
                onClick={() => setSelectedReport(r)}
              >
                <span>{r.name}</span>
                <span>{r.generated}</span>
                <span>{r.period}</span>
                <span>{r.format}</span>
              </div>
            ))}
          </>
        )}
      </div>

      {/* PREVIEW */}
      <div style={{ background: "#fff", padding: "20px", marginTop: "20px", borderRadius: "10px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>Report Preview</h3>
          <div>
            <button style={{ marginRight: "10px" }}>Print</button>
            <button style={{ background: "blue", color: "white" }}>Download</button>
          </div>
        </div>

        <div style={{ height: "200px", background: "#eee", marginTop: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {selectedReport ? (
            <div>
              <h4>{selectedReport.name}</h4>
              <p>{selectedReport.period}</p>
            </div>
          ) : (
            <p>Select a report to preview</p>
          )}
        </div>
      </div>

    </div>
  );
}