import { useState } from "react";
import axios from "axios";

export default function App() {
  const [page, setPage] = useState("Check Your Medical Reports");
  const [tab, setTab] = useState("Home");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Disease information mapping
  const diseaseMap = {
    "Alzheimer's Disease": {
      task: "Alzheimer_disease",
      decription: "hfhgfdshds",
      image: "/assets/alzeimer.jpg",
      num_classes: 4,
      class_0: "Mild Impairment",
      class_1: "Moderate Impairment",
      class_2: "No Impairment",
      class_3: "Very Mild Impairment",

    },
    "Brain Tumour": {
      task: "brain_tumour",
      decription: "hfhgfdshds",
      image: "/assets/brain.avif",
      num_classes: 4,
      class_0: "Glioma",
      class_1: "Meningioma",
      class_2: "No Brain Tumour Detected",
      class_3: "Pituitary",
    },
    "Breast Cancer": {
      task: "Breast_cancer",
      decription: "hfhgfdshds",
      image: "/assets/breast.webp",
      num_classes: 2,
      class_0: "No signs of breast cancer detected. But There is still may be a Benign Cell, so be responsible and consult a doctor if you are feeling unwell.",
      class_1: "Breast cancer detected. Please consult a specialist.",
    },
    "Bone Fracture": {
      task: "bone_fracture",
      decription: "hfhgfdshds",
      image: "/assets/bone.jpg",
      num_classes: 2,
      class_0: "Fracture detected. Please consult a doctor.",
      class_1: "No bone fracture detected.",
    },
    // "Histo Pathology": {
    //   task: "Histo_pathology",
    //   num_classes: 2,
    //   class_0: "No abnormalities detected in pathology report.",
    //   class_1: "Abnormalities detected. Please consult a doctor.",
    // },
  };

  async function handleSubmit() {
    if (!file) {
      alert("Please select a file before submitting.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    const diseaseInfo = diseaseMap[page] || null;

    if (!diseaseInfo) {
      alert("Invalid task selection.");
      setLoading(false);
      return;
    }

    formData.append("file", file);
    formData.append("task", diseaseInfo.task);
    formData.append("classes", diseaseInfo.num_classes);

    try {
      const response = await axios.post("https://checkupnow.onrender.com/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Prediction result:", response.data);

      // Extract prediction class and map it to text
      if (response.data.prediction !== undefined) {
        const predictionClass = response.data.prediction; // Expected to be 0 or 1
        const predictionText = diseaseInfo[`class_${predictionClass}`] || "Unexpected result.";
        setResult({ ...response.data, predictionText });
      } else {
        setResult({ error: "Invalid response from server." });
      }
    } catch (error) {
      console.error("Error calling FastAPI:", error.response ? error.response.data : error.message);
      setResult({ error: "Failed to get prediction" });
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="w-screen h-screen bg-black text-white">
      <div className="flex w-full flex-wrap rounded-lg shadow-lg text-center">
        {/* Header Section */}
        <div className="px-6 flex flex-col md:flex-row bg-white bg-opacity-10 justify-between w-full gap-2 py-4">
          <div className="my-2 flex flex-row items-center text-3xl text-white">
            <img src="/icon2.png" alt="Logo" className="w-auto h-12 mx-2" />
            <span className="font-semibold text-xl">CheckUpNow</span>
          </div>

          <div className="text-white flex flex-col md:flex-row items-center justify-end mt-4 md:mt-0">
            <button
              onClick={() => {
                setTab("Home");
                setPage("Check Your Medical Reports");
              }}
              className="my-2 mx-6 px-6 py-3 text-white rounded-lg hover:bg-blue-600 hover:bg-opacity-20 transition-all duration-200"
            >
              Home
            </button>
            <button
              onClick={() => {
                setTab("About");
                setPage("About Us");
              }}
              className="my-2 mx-6 px-6 py-3 text-white rounded-lg hover:bg-blue-600 hover:bg-opacity-20 transition-all duration-200"
            >
              About
            </button>
          </div>
        </div>

        {/* Main Content - Check Your Medical Reports */}
        {tab === "Home" && page === "Check Your Medical Reports" && (
          <div>
            <div className="flex flex-col md:flex-row items-center justify-evenly gap-8 py-6 px-4">
              <div className="md:w-1/2 text-center md:text-left p-12">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 hover:scale-105 transform transition-all duration-300 mb-4">
                  Check Your Medical Reports
                </h1>

                <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-500 to-orange-600 hover:scale-105 transform transition-all duration-300 mb-8">
                  With <strong>CheckUpNow</strong>
                </h2>

                <h3 className="text-2xl font-semibold text-gray-300 hover:text-white transition duration-200 ease-in-out">
                  Find the Right Diagnosis
                </h3>

                <h3 className="text-xl font-semibold text-gray-400 hover:text-white transition duration-200 ease-in-out mb-4">
                  Understand Your Health Better
                </h3>
              </div>

              <div className="md:w-1/2 flex justify-center">
                <img
                  src="/assets/icon.png"
                  alt="Medical Report"
                  className="w-full max-w-sm md:max-w-md h-auto object-cover rounded-lg shadow-xl"
                />
              </div>
            </div>

            <div className="mt-12 py-8">
              <h1 className="text-3xl font-bold text-center">Our Services</h1>
            </div>

            {/* Service Cards */}
            <div className="flex flex-wrap justify-center gap-8 p-4 bg-black">
              {Object.keys(diseaseMap).map((disease) => (
                <div
                  key={disease}
                  className="flex flex-col items-center bg-gray-800 text-white p-6 rounded-lg shadow-2xl w-80 sm:w-96 transition-transform transform hover:scale-105"
                >
                  <img
                    src={diseaseMap[disease].image}
                    alt={disease}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />

                  <h2 className="text-2xl font-bold mb-2">{disease}</h2>

                  <p className="text-gray-300 text-center text-sm mb-4">
                    {diseaseMap[disease].description}
                  </p>

                  <button
                    onClick={() => {
                      setPage(disease);
                      setResult(null);
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
                  >
                    Select
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Section */}
        {tab === "Home" && diseaseMap[page] && (
          <div className="flex items-center justify-center h-screen w-screen p-6 ml-[50%]">
            <div className="w-full max-w-2xl bg-gray-800 p-8 rounded-lg shadow-2xl border-2 border-gray-600">
              {/* Page Title */}
              <h1 className="text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">
                {page}
              </h1>

              {/* Subheading */}
              <div className="text-center mb-8">
                <h2 className="text-xl font-semibold text-gray-300 mb-2">Upload Files</h2>

                {/* File Input */}
                <input
                  type="file"
                  accept=".jpg,.png,.jpeg,.bmp"
                  className="mb-4 p-3 w-full sm:w-3/4 md:w-1/2 lg:w-[15vw] text-white rounded-lg border-2 border-gray-600 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  onChange={(e) => setFile(e.target.files[0])}
                />

              </div>

              {/* Submit Button */}
              <div className="text-center mb-6">
                <button
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-all duration-300 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Submit"}
                </button>
              </div>

              {/* Prediction Result */}
              {result && (
                <div className="mt-6 p-6 bg-gray-800 border-2 border-gray-600 rounded-lg shadow-2xl">
                  <h2 className="text-2xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                    Prediction Result
                  </h2>
                  <div className="text-center">
                    {result.error ? (
                      <p className="text-red-500 font-semibold">{result.error}</p>
                    ) : (
                      <p className="text-white text-lg">{result.predictionText}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}



        {/* About Section */}
        {tab === "About" && page === "About Us" && (
          <div className="mt-10 p-8 text-white">
            <h1 className="text-5xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">
              About CheckUpNow
            </h1>

            <p className="text-lg text-gray-300 text-center leading-relaxed max-w-3xl mx-auto mb-8">
              CheckUpNow is an AI-powered platform designed to assist in medical report analysis. Our mission is to provide insights
              using AI-driven diagnostics, making healthcare analysis more accessible and efficient.
            </p>

            <div className="mt-12 bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <p className="text-lg font-semibold text-yellow-400">
                ⚠️ Important Notice
              </p>
              <p className="text-gray-300 text-sm mt-2">
                All analyses provided by CheckUpNow are AI-generated and should not be considered a final diagnosis.
                <strong> Always consult a medical professional </strong> before making any health-related decisions.
              </p>
            </div>

            <div className="mt-10">
              <h2 className="text-3xl font-semibold text-center mb-6">Meet Our Team</h2>
              <div className="flex flex-wrap justify-center gap-8">
                {[
                  { name: "Soham Sarkar", img: "/assets/soham.jpeg" },
                  { name: "Subham Raul", img: "/assets/raul.jpeg" },
                  { name: "Samarjit Santra", img: "/assets/samar.png" },
                ].map((member) => (
                  <div key={member.name} className="text-center">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-32 h-32 object-cover rounded-full shadow-md mb-2"
                    />
                    <p className="text-xl font-semibold">{member.name}</p>
                    <p className="text-sm text-gray-400">CSE, JGEC</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

}
