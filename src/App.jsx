import { useState } from "react";
import axios from "axios";
import { FileUpload } from "./components/ui/file-upload";
import { useEffect } from "react";

export default function App() {
  const [page, setPage] = useState("Check Your Medical Reports");
  const [tab, setTab] = useState("Home");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(()=>{
  console.log(file);
},[file])

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
      const response = await axios.post("http://0.0.0.0:8000", formData, {
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
              className="my-2 mx-6 px-6 py-3 text-pink-500 rounded-lg hover:bg-purple-100 hover:bg-opacity-20 transition-all duration-200"
            >
              Home
            </button>
            <button
              onClick={() => {
                setTab("About");
                setPage("About Us");
              }}
              className="my-2 mx-6 px-6 py-3 text-pink-500 rounded-lg hover:bg-purple-100 hover:bg-opacity-20 transition-all duration-200"
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
                  className="group flex flex-col items-center bg-gray-800 text-white p-6 rounded-lg shadow-2xl w-80 sm:w-96 transition-all duration-500 ease-in-out border-2 border-transparent hover:-translate-y-2 hover:shadow-lg hover:shadow-blue-500/20 transform hover:scale-105"
                  style={{
                    backgroundImage: 'linear-gradient(#1f2937, #1f2937), linear-gradient(to right, #3b82f6, #9333ea, #ec4899)',
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'padding-box, border-box',
                  }}
                >
                  <img
                    src={diseaseMap[disease].image}
                    alt={disease}
                    className="w-full h-40 object-cover rounded-md mb-4 transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  <h2 className="text-2xl font-bold mb-2 transition-colors duration-300 group-hover:text-blue-400">
                    {disease}
                  </h2>
                  
                  <p className="text-gray-300 text-center text-sm mb-4 transition-colors duration-300 group-hover:text-gray-200">
                    {diseaseMap[disease].description}
                  </p>
                  
                  <button
                    onClick={() => {
                      setPage(disease);
                      setResult(null);
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg transition-all duration-300 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/50 transform hover:-translate-y-1"
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
                {/* <h2 className="text-xl font-semibold text-gray-300 mb-2">Upload Files</h2>

                <input
                  type="file"
                  accept=".jpg,.png,.jpeg,.bmp"
                  className="mb-4 p-3 w-full sm:w-3/4 md:w-1/2 lg:w-[15vw] text-white rounded-lg border-2 border-gray-600 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  onChange={(e) => setFile(e.target.files[0])}
                /> */}
                <FileUpload onChange={setFile} />
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
          <div className="min-h-screen w-full bg-black text-white p-8">
            <div className="max-w-7xl mx-auto">
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

              {/* New Contact Us Section */}
              <div className="mt-16">
                <h2 className="text-3xl font-semibold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">
                  Contact Us
                </h2>
                <div className="flex flex-wrap justify-center gap-6">
                  <a
                    href="mailto:sarkar04soham@gmail.com"
                    className="flex items-center gap-2 px-6 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                    <span>Gmail</span>
                  </a>
                  
                  <a
                    href="https://github.com/Soham2004-hash"
                    className="flex items-center gap-2 px-6 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span>GitHub</span>
                  </a>

                  {/* <a
                    href="https://www.linkedin.com/in/soham-sarkar-572795282/"
                    className="flex items-center gap-2 px-6 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    <span>LinkedIn</span>
                  </a> */}

                  <a
                    href="https://www.kaggle.com/sohamsarkar28052004"
                    className="flex items-center gap-2 px-6 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.358"/>
                    </svg>
                    <span>Kaggle</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

}
