import useRecord from "../hooks/useRecord";
import { useEffect, useRef, useState } from "react";

const ScreenRecorder = () => {
  const [startScreenRecording, recorder, screenRecording, displayMedia] =
    useRecord();

  const [recordState, setRecordState] = useState<string | undefined>("");
  // const [previewMode, setPreviewMode] = useState<string | undefined>("");

  const videoRef = useRef<any | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setRecordState(recorder?.state);
  }, [recorder?.state, recordState]);

  console.log("recordState", recordState);
  // console.log(navigator.mediaDevices.getSupportedConstraints());

  const stopRecording = () => {
    recorder?.stop();
    displayMedia?.stop();
    setRecordState(recorder?.state);
  };

  // const showEdit = () => {
  //   setPreviewMode("preview");
  // };

  const renderButtonState = () => {
    if ("MediaRecorder" in window) {
      switch (recordState) {
        case "recording":
          return (
            <div className="h-screen flex items-center justify-center">
              <button
                onMouseDown={stopRecording}
                className="bg-record-700 border p-2 rounded my-3"
              >
                Stop Recording
              </button>
            </div>
          );
          break;
        case "inactive":
          return (
            <div
              className="flex justify-between"
              // style={{ display: "flex", justifyContent: "center" }}
            >
              <div className="flex flex-col items-center justify-center">
                <video
                  // ref={screenRecording}
                  ref={setRefs}
                  id="finished-video"
                  style={{ width: "80vw" }}
                  controls
                />

                <div>
                  <button className="border-black p-2 rounded my-3">
                    Download
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center">
                <canvas
                  ref={canvasRef}
                  id="canvas"
                  style={{
                    border: "1px solid black",
                    width: "50vw",
                  }}
                ></canvas>
                <div>
                  <button className="bg-record-700 p-2 rounded my-3">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          );
          break;
        case undefined:
          return (
            <div className="flex flex-col items-center">
              <div>
                <canvas
                  id="canvas"
                  style={{
                    border: "1px solid black",
                    width: "80vw",
                  }}
                  ref={canvasRef}
                ></canvas>
              </div>
              <div>
                <button
                  onMouseDown={() => startScreenRecording()}
                  className="bg-record-700 p-2 rounded my-3"
                >
                  Start Recording
                </button>
              </div>
            </div>
          );
        default:
          return (
            <button
              onMouseDown={startScreenRecording}
              className="bg-record-700 p-2 rounded my-3"
            >
              Start Recording
            </button>
          );
          break;
      }
    } else {
      return "Sorry, your browser doesn't support the MediaRecorder API, so this demo will not work";
    }
  };

  useEffect(() => {}, []);

  const setRefs = (element: any) => {
    screenRecording.current = element;

    videoRef.current = element;
  };

  console.log("screenrecording", screenRecording.current);

  useEffect(() => {
    if (screenRecording && videoRef.current) {
      console.log("Both refs are assigned:", screenRecording, videoRef.current);
    }
  }, [screenRecording]);

  return <div>{renderButtonState()}</div>;
};
export default ScreenRecorder;
