import { useState } from "react";
import { Upload, FileText } from "lucide-react";

function ResumeUpload({ onAnalyze, loading }) {
  const [file, setFile] = useState(null);

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      return;
    }

    setFile(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">

      <div
        className="border-2 border-dashed border-blue-400 rounded-xl p-10 text-center hover:bg-blue-50 transition"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <Upload size={60} className="mx-auto text-blue-600 mb-4" />

        <h2 className="text-2xl font-semibold mb-2">
          Upload Your Resume
        </h2>

        <p className="text-gray-500 mb-5">
          Drag & Drop your PDF here
        </p>

        <input
          id="resumeUpload"
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={(e) => handleFile(e.target.files[0])}
        />

        <label
          htmlFor="resumeUpload"
          className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          Choose PDF
        </label>
      </div>

      {file && (
        <div className="mt-6 flex items-center gap-3 bg-gray-100 p-4 rounded-lg">
          <FileText className="text-red-600" size={30} />

          <div className="flex-1">
            <p className="font-semibold">{file.name}</p>

            <p className="text-gray-500 text-sm">
              {(file.size / 1024).toFixed(2)} KB
            </p>
          </div>
        </div>
      )}

      <button
        disabled={!file || loading}
        onClick={() => onAnalyze(file)}
        className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold disabled:bg-gray-400"
      >
        {loading ? "Analyzing Resume..." : "Analyze Resume"}
      </button>

    </div>
  );
}

export default ResumeUpload;