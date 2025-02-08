import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Please upload a resume!");

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("job_description", jobDescription);

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData
      );
      setResult(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">AI Resume Scanner 🚀</h1>

      {/* File Upload Box */}
      <label className="w-full max-w-md flex flex-col items-center px-4 py-6 bg-gray-800 rounded-lg shadow-lg border-2 border-dashed border-gray-600 cursor-pointer hover:border-blue-400 transition">
        <input
          type="file"
          className="hidden"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <span className="text-gray-300">
          📂 Drag & Drop or Click to Upload Resume
        </span>
        {file && <p className="text-blue-400 mt-2">{file.name}</p>}
      </label>

      {/* Job Description Input */}
      <textarea
        className="w-full max-w-md p-3 mt-4 text-black rounded-lg border border-gray-500 focus:ring-2 focus:ring-blue-400"
        placeholder="Paste Job Description Here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        className={`mt-4 px-6 py-3 rounded-lg text-white font-bold transition ${
          loading
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Upload & Analyze"}
      </button>

      {/* Display Results */}
      {result && (
        <div className="mt-6 w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-blue-400">
            📋 Analysis Result
          </h2>
          <p className="mt-2">
            <strong>Name:</strong> {result.Name || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {result.Email || "N/A"}
          </p>
          <p>
            <strong>Phone:</strong> {result.Phone || "N/A"}
          </p>

          {/* Skills Section */}
          <div className="mt-3">
            <h3 className="font-bold text-green-400">🛠 Skills Match:</h3>
            <p>
              <strong>Match Score:</strong> {result["Match Score"]}
            </p>

            <div className="mt-2">
              <h4 className="text-blue-300">✅ Matched Skills:</h4>
              <div className="flex flex-wrap gap-2">
                {result["Matched Skills"]?.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-600 text-white rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-2">
              <h4 className="text-red-300">❌ Missing Skills:</h4>
              <div className="flex flex-wrap gap-2">
                {result["Missing Skills"]?.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-red-600 text-white rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
