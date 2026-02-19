import React, { useState } from "react";
import axios from "axios";

const FileUpload = ({ setGraphData, setFraudRings, setSummary }) => {
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (file) => {
    if (!file) return;

    if (!file.name.endsWith(".csv")) {
      alert("Please upload a CSV file only");
      return;
    }

    setFileName(file.name);
    uploadFile(file);
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setGraphData(res.data.graph);
      setFraudRings(res.data.fraud_rings);
      setSummary(res.data.summary);
    } catch (err) {
      console.error(err);
      alert("Upload failed. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center px-4 text-white">

      {/* Main Heading */}
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
        Money Muling Network
      </h1>

      {/* Upload Card */}
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-2xl p-6">
        
        <h2 className="text-xl font-semibold mb-4 text-center">
          Upload Transactions CSV
        </h2>

        {/* Upload Box */}
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300
          ${
            dragActive
              ? "border-blue-500 bg-gray-800"
              : "border-gray-600 hover:border-blue-400"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept=".csv"
            onChange={(e) => handleFile(e.target.files[0])}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          <p className="text-gray-400">
            Drag & Drop your CSV here
          </p>
          <p className="text-sm text-gray-500 mt-1">
            or click to browse
          </p>
        </div>

        {/* File Name */}
        {fileName && (
          <div className="mt-4 text-sm text-center">
            Selected: <span className="text-blue-400">{fileName}</span>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="mt-4 flex justify-center items-center gap-2 text-blue-400">
            <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            Processing transactions...
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
