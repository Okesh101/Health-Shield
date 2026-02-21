import React, { useRef, useState } from "react";
import Sidebar from "./Sidebar";
import RecorderIcon from "../assets/recorderIcon.png";
import { FiMic, FiFileText } from "react-icons/fi";

export default function Assessment() {
  const [selectedMode, setSelectedMode] = useState(null);

  // 🔹 Voice recording state
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // 🔹 Click handlers for cards
  const handleVoice = () => setSelectedMode("voice");
  const handleText = () => setSelectedMode("text");

    // 🌟 Start recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);

        // Automatically send to backend after stopping
        await sendToBackend(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Microphone access error:", error);
      alert("Please allow microphone access to record.");
    }
  };

  // 🛑 Stop recording
  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  // 📤 Send audio to backend
  const sendToBackend = async (audioBlob) => {
    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.webm");

    try {
      const response = await fetch("http://127.0.0.1:5000/api/v1/transcribe", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Transcribed:", data.text2);
      alert("Audio sent successfully!");
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  // ⌨️ Handle Enter key to start/stop recording
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && selectedMode === "voice") {
        if (!isRecording) {
          startRecording();
        } else {
          stopRecording();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRecording, selectedMode]);
  return (
    <div className="container">
      <Sidebar />
      <div className="assessment_page">
        <div className="page_nav">
          <h3>Medical Assessment</h3>
          <p>helo</p>
        </div>

        {selectedMode === null ? (
          <>
            <h3>How would you like to describe your symptoms?</h3>
            <div className="card_wrapper">
              <div className="card" onClick={handleVoice}>
                <div className="iconWrapper">
                  <FiMic className="icon" />
                </div>
                <h3>Use Voice</h3>
                <p>Speak your symptoms aloud</p>
              </div>

              <div className="card" onClick={handleText}>
                <div className="iconWrapper">
                  <FiFileText className="icon" />
                </div>
                <h3>Use Text</h3>
                <p>Describe your symptoms in text</p>
              </div>
            </div>
          </>
        ) : selectedMode === "voice" ? (
          <div className="voice_mode">
            <div className="voice_mode_text">
              <h3>Voice Mode</h3>
              <p>Start speaking to describe your symptoms.</p>
            </div>

            <div className="voice_action">
              {/* Recorder Icon */}
               <FiMic className="icon" />

              {/* 🎤 Recording Buttons */}
              <div style={{ marginTop: "20px" }}>
                {!isRecording ? (
                  <button onClick={startRecording}>Start Recording</button>
                ) : (
                  <button onClick={stopRecording}>Stop Recording</button>
                )}
              </div>
            </div>

            {/* 🎧 Audio Playback */}
            {audioURL && (
              <div style={{ marginTop: "20px" }}>
                <audio controls src={audioURL}></audio>
              </div>
            )}
          </div>
        ) : (
          <div className="text_mode">
            <h3>Text Mode</h3>
            <p>Type your symptoms in the text box below.</p>
            <textarea
              placeholder="Describe your symptoms here..."
              className="symptom_textarea"
            ></textarea>
          </div>
        )}
      </div>
    </div>
  );
}

// import React, { useState } from "react";
// import Sidebar from "./Sidebar";
// import RecorderIcon from "../assets/recorderIcon.png";
// import { FiMic, FiFileText } from "react-icons/fi";

// export default function Assessment() {
//   const [startAssessment, setStartAssessment] = useState(true);
//     const [selectedMode, setSelectedMode] = useState(null);

//   const handleVoice = (() => {
//     setSelectedMode("voice" )
//   })
//   const handleText = (() => {
//     setSelectedMode("text" )
//   })
//   return (
//     <div className="container">
//       <Sidebar />
//       <div className="assessment_page">
//         <div className="page_nav">
//           <h3>Medical Assessment</h3>
//           <p>helo</p>
//         </div>
//         {selectedMode === null ? (
//           <>
//             <h3>How would you like to describe your symptoms?</h3>
//             <div className="card_wrapper">
//               <div className="card" onClick={handleVoice}>
//                 <div className="iconWrapper">
//                   <FiMic className="icon" />
//                 </div>
//                 <h3>Use Voice</h3>
//                 <p>Speak your symptoms aloud</p>
//               </div>
//               <div className="card" onClick={handleText}>
//                 <div className="iconWrapper">
//                   <FiFileText className="icon" />
//                 </div>
//                 <h3>Use Text</h3>
//                 <p>Describe your symptoms in text</p>
//               </div>
//             </div>
//           </>
//         ) : (
//           selectedMode === "voice" ? (
//             <div className="voice_mode">
//               <h3>Voice Mode</h3>
//               <p>Start speaking to describe your symptoms.</p>
//               <img src={RecorderIcon} alt="Recorder Icon" className="recorder_icon" />
//             </div>
//           ) : (
//             <div className="text_mode">
//               <h3>Text Mode</h3>
//               <p>Type your symptoms in the text box below.</p>
//               <textarea placeholder="Describe your symptoms here..." className="symptom_textarea"></textarea>
//             </div>
//           )
//         )}
//       </div>
//     </div>
//   );
// }
