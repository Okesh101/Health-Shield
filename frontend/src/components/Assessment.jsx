import React, { useRef, useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import RecorderIcon from "../assets/recorderIcon.png";
import { FiMic, FiFileText } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

export default function Assessment() {
  const [selectedMode, setSelectedMode] = useState(null);

  // 🔹 Voice recording state
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [transcribedText, setTranscribedText] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [textInput, setTextInput] = useState("");
  const [reportData, setReportData] = useState("")
  const [followUpData, setFollowUpData] = useState("");
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
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
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
      console.log("Transcribed:", data.transcribed_text);
      setTranscribedText(data.transcribed_text);
      alert("Audio sent successfully!");
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  // Send text input to the backend
  const sendTextToBackend = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/v1/chat/follow-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userLog: textInput }),
      });
      const data = await res.json();
      setFollowUpData(data.response);
    } catch (error) {
      console.log("Text submission error:", error);
    }
  };

  // Send the second explained text input to the backend
  const sendExplainedTextToBackend = async () => {
    try {
      const res = await fetch(
        "http://127.0.0.1:5000/api/v1/chat/generate-prediction",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userLog: reportData }),
        }
      );
      const data = await res.json();
      setFollowUpData(data.report);
      console.log(data.report);
    } catch (error) {
      console.log("Text submission error:", error);
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
      <AnimatePresence mode="wait">
        <motion.div
          className="assessment_page"
          initial={{ y: "100vh", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100vh", opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
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

              <div className="voice_action_wrapper">
                {/* 🎧 Audio Playback */}
                {transcribedText && (
                  <div style={{ marginTop: "20px" }}>
                    <h4>Transcribed Text:</h4>
                    <p>{transcribedText}</p>
                  </div>
                )}
                {audioURL ? (
                  <div style={{ marginTop: "20px" }}>
                    {transcribedText ? null : (
                      <audio controls src={audioURL}></audio>
                    )}
                  </div>
                ) : null}

                {!transcribedText ? (
                  <div className="voice_action">
                    {/* Recorder Icon */}
                    <FiMic className="icon" />

                    {/* 🎤 Recording Buttons */}
                    <div style={{ marginTop: "20px" }}>
                      {!isRecording ? (
                        <button onClick={startRecording}>
                          Start Recording
                        </button>
                      ) : (
                        <button onClick={stopRecording}>Stop Recording</button>
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          ) : (
            <div className="text_mode">
              <div className="text_mode_content">
                <h3>Text Mode</h3>
                <p>Type your symptoms in the text box below.</p>
              </div>
              <div className="text_input">
                <textarea
                  placeholder="Describe your symptoms here..."
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                />
                <button onClick={sendTextToBackend}>Submit</button>
              </div>
              {followUpData && (
                <>
                  <div className="text_mode_content">
                    <p>{followUpData}</p>
                  </div>
                  <div className="text_input">
                    <textarea
                      placeholder="Explain better                                                                                                                                                                                                                                                                   ..."
                      value={reportData}
                      onChange={(e) => setReportData(e.target.value)}
                    />
                    <button onClick={sendExplainedTextToBackend}>Submit</button>
                  </div>
                </>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
