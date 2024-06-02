import { Fragment } from "react/jsx-runtime";
import useRecord from "../hooks/useRecord";
import { useEffect, useState } from "react";

const ScreenRecorder = () => {
  const [startScreenRecording, recorder, screenRecording, displayMedia] =
    useRecord();

  const [recordState, setRecordState] = useState<string | undefined>("");

  useEffect(() => {
    setRecordState(recorder?.state);
  }, [recorder?.state, recordState]);

  console.log("recordState", recordState);
  console.log(navigator.mediaDevices.getSupportedConstraints());

  const stopRecording = () => {
    recorder?.stop();
    displayMedia?.stop();
    setRecordState(recorder?.state);
  };

  const renderButtonState = () => {
    if ("MediaRecorder" in window) {
      switch (recordState) {
        case "recording":
          return (
            <div>
              <button onMouseDown={stopRecording}>Stop Recording</button>
            </div>
          );
          break;
        case "inactive":
          return (
            <div className="flex gap-2">
              <button onMouseDown={() => {}}>Re-record</button>
              <button onMouseDown={() => {}}>Preview</button>
            </div>
          );
          break;
        case undefined:
          return (
            <button onMouseDown={() => startScreenRecording()}>
              Start Recording
            </button>
          );
        default:
          return (
            <button onMouseDown={() => startScreenRecording()}>
              Start Recording
            </button>
          );
          break;
      }
    } else {
      return "Sorry, your browser doesn't support the MediaRecorder API, so this demo will not work";
    }
  };

  return (
    <Fragment>
      {renderButtonState()}
      <video ref={screenRecording} height={300} width={600} controls />
    </Fragment>
  );
};
export default ScreenRecorder;
