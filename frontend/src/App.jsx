// import { useState } from "react";
// import { useRef, useEffect } from 'react';


// export default function App() {
//   const [page, setPage] = useState("Check Your Medical Reports");
//   const [tab, setTab] = useState("Home");
//   const videoRef = useRef(null);
  
//   useEffect(() => {
//       videoRef.current.playbackRate = 0.25;
//   }, []);   

//   return (
//     <div className="m-0 w-screen h-screen bg-black">
//       {/* <video 
//         ref = {videoRef}
//         autoPlay 
//         loop 
//         muted 
//         className="video-bg absolute top-0 left-0 w-full h-full object-cover "
//       >
//         <source src="animation.mp4" type="video/mp4" />
//         Your browser does not support the video tag.
//       </video> */}
//         <div className="flex flex-wrap rounded-lg shadow-lg text-center items-stretch justify-center z-100">
//         <div className="px-6 flex flex-row bg-white bg-opacity-5 justify-between w-full gap-2">
//           <div className="my-2 mx-6 px-4 py-2 text-3xl text-white">Doctor's Hub</div>

//           <div className="text-white ">

//           <button
//             onClick={() => {setTab("Home");
//               setPage("Check Your Medical Reports")
//             }}
//             className="my-2 mx-6 px-4 py-2 text-white rounded-lg hover:bg-blue hover:bg-opacity-10"
//           >
//             Home
//           </button>
//           <button
//             onClick={() => {setTab("About");
//               setPage("About Us")
//             }}
//             className="my-2 mx-6 px-4 py-2 text-white rounded-lg hover:bg-blue hover:bg-opacity-10"
//           >
//             About
//           </button>
//           </div>
//         </div>

//         <div className="flex flex-wrap p-6 rounded-lg shadow-lg text-center ">

//         {tab=="Home" && page === "Check Your Medical Reports" && (
//           <div className="m-4 space-y-2">
//             <h1 className="text-5xl font-bold mb-4">{page}</h1>

//             <button
//               onClick={() => setPage("Alzheimer's Disease")}
//               className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
//             >
//               Alzheimer's Disease
//             </button>
//             <button
//               onClick={() => setPage("Brain Tumour")}
//               className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700"
//             >
//               Brain Tumour
//             </button>
//             <button
//               onClick={() => setPage("Breast Cancer")}
//               className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-700"
//             >
//               Breast Cancer
//             </button>
//             <button
//               onClick={() => setPage("Bone Fracture")}
//               className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-700"
//             >
//               Bone Fracture
//             </button>
//             <button
//               onClick={() => setPage("Histo Pathology")}
//               className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-700"
//             >
//               Histo Pathology
//             </button>
//           </div>
//         )}
//         {(tab=="Home" && page === "Alzheimer's Disease" || page === "Brain Tumour" || page === "Breast Cancer" || page === "Bone Fracture" || page === "Histo Pathology") && (
//           <div className="mt-6">
//             <h1 className="text-2xl font-bold mb-4">{page}</h1>

//             <h2 className="text-xl font-semibold mb-2">Upload Files</h2>
//             <input type="file" accept=".jpg,.png,.jpeg,.bmp,.JPG,.JPEG,.BMP" className="mb-2" />
//             <input type="text" placeholder="Enter text" className="p-2 border rounded mb-2" />
//             <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">Submit</button>
//           </div>
//         )}
//         {(tab=="About" && page === "About Us") && (
//           <div className="mt-6">
//             <h1 className="text-5xl font-bold mb-4">{page}</h1>

//             <p className="text-xl font-semibold mb-2">This Website is Developed By Soham Sarkar with a Aim of Prior AI-driven Analysis of Medical Reports</p>

//             <p className="mt-8 text-xl font-semibold mb-2">NOTE : All the report analysis are generate by AI Models trained by us on existing data. They are not 100% accurate and Prone To Error. Users are suggested to cross check the report by medical professionals and Not to take any decision based on the analysis given by this site only. </p>

//           </div>
//         )}
//       </div>
//     </div>
//     </div>
//   );
// }
import { useState, useRef, useEffect } from "react";

export default function App() {
  const [page, setPage] = useState("Check Your Medical Reports");
  const [tab, setTab] = useState("Home");
  const videoRef = useRef(null);

  useEffect(() => {
    videoRef.current.playbackRate = 0.3;
  }, []);

  return (
    <div className="relative w-screen h-screen bg-black">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        className="fixed top-0 left-0 w-full h-full object-cover z-[-1]"
      >
        <source src="animation.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Main Content */}
      <div className="flex flex-wrap rounded-lg shadow-lg text-center items-stretch justify-center relative z-10">
        <div className="px-6 flex flex-row bg-white bg-opacity-10 backdrop-blur-lg justify-between w-full gap-2">
          <div className="my-2 mx-6 px-4 py-2 text-3xl text-white">Doctor's Hub</div>

          <div className="text-white">
            <button
              onClick={() => {
                setTab("Home");
                setPage("Check Your Medical Reports");
              }}
              className="my-2 mx-6 px-4 py-2 text-white rounded-lg hover:bg-blue hover:bg-opacity-10"
            >
              Home
            </button>
            <button
              onClick={() => {
                setTab("About");
                setPage("About Us");
              }}
              className="my-2 mx-6 px-4 py-2 text-white rounded-lg hover:bg-blue hover:bg-opacity-10"
            >
              About
            </button>
          </div>
        </div>

        <div className="flex flex-wrap p-6 rounded-lg shadow-lg text-center">
          {tab == "Home" && page === "Check Your Medical Reports" && (
            <div className="m-4 space-y-2">
              <h1 className="text-5xl font-bold mb-4">{page}</h1>
              <button
                onClick={() => setPage("Alzheimer's Disease")}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
              >
                Alzheimer's Disease
              </button>
              <button
                onClick={() => setPage("Brain Tumour")}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700"
              >
                Brain Tumour
              </button>
              <button
                onClick={() => setPage("Breast Cancer")}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-700"
              >
                Breast Cancer
              </button>
              <button
                onClick={() => setPage("Bone Fracture")}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-700"
              >
                Bone Fracture
              </button>
              <button
                onClick={() => setPage("Histo Pathology")}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-700"
              >
                Histo Pathology
              </button>
            </div>
          )}

          {(tab == "Home" &&
            (page === "Alzheimer's Disease" ||
              page === "Brain Tumour" ||
              page === "Breast Cancer" ||
              page === "Bone Fracture" ||
              page === "Histo Pathology")) && (
            <div className="mt-6">
              <h1 className="text-2xl font-bold mb-4">{page}</h1>
              <h2 className="text-xl font-semibold mb-2">Upload Files</h2>
              <input
                type="file"
                accept=".jpg,.png,.jpeg,.bmp,.JPG,.JPEG,.BMP"
                className="mb-2"
              />
              <input
                type="text"
                placeholder="Enter text"
                className="p-2 border rounded mb-2"
              />
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
                Submit
              </button>
            </div>
          )}

          {tab == "About" && page === "About Us" && (
            <div className="mt-6">
              <h1 className="text-5xl font-bold mb-4">{page}</h1>
              <p className="text-xl font-semibold mb-2">
                This Website is Developed By Soham Sarkar with a Aim of Prior AI-driven
                Analysis of Medical Reports
              </p>
              <p className="mt-8 text-xl font-semibold mb-2">
                NOTE : All the report analysis are generated by AI Models trained by us
                on existing data. They are not 100% accurate and prone to error. Users
                are suggested to cross-check the report with medical professionals and
                not take any decision based solely on this site.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
