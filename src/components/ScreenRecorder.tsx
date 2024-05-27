import { Fragment } from "react/jsx-runtime";
import useRecord from "../hooks/useRecord";
import { useEffect, useState } from "react";

const ScreenRecorder = () => {
  const [startScreenRecording, Recorder, screenRecording] = useRecord();

  const [recordState, setRecordState] = useState<string | undefined>("");

  useEffect(() => {
    setRecordState(Recorder?.state);
  }, [Recorder?.state, recordState]);

  console.log("recordState", recordState);

  const renderButtonState = () => {
    switch (recordState) {
      case "recording":
        return (
          <button
            onMouseDown={() => {
              Recorder && Recorder.stop();
              setRecordState(Recorder?.state);
            }}
          >
            Recording...
          </button>
        );
        break;
      case "inactive":
        return <button onMouseDown={() => {}}>Preview</button>;
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
  };

  return (
    <Fragment>{renderButtonState()}</Fragment>

    //   <video ref={screenRecording} height={300} width={600} controls />
    // </>
  );
};
export default ScreenRecorder;
