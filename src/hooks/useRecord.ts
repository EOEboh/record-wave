import { useRef, useState } from "react";

interface ScreenRecordingChunksType {
  size: number;
  type: string;
}

const useRecord = () => {
  /* Create a reference to the video element, 
	which helps in storing continous video stream 
	irespective of multiple renders. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const screenRecording = useRef<any | null>(null);

  const [Recorder, setRecorder] = useState<MediaRecorder>();
  const [displayMedia, setDisplayMedia] = useState<MediaStreamTrack>();

  const startScreenRecording = async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      audio: true,
      video: true,
    });
    console.log("stream", stream.active);
    const mediaRecorder = new MediaRecorder(stream);
    setRecorder(mediaRecorder);
    setDisplayMedia(stream.getVideoTracks()[0]);
    const screenRecordingChunks: Array<ScreenRecordingChunksType> = [];
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        screenRecordingChunks.push(e.data);
        console.log("screenrecording", e.data);
      }
    };
    mediaRecorder.onstop = () => {
      //onstop event of media recorder
      const blob: Blob = new Blob(screenRecordingChunks as BlobPart[], {
        type: "video/webm",
      });
      const url = URL.createObjectURL(blob);
      screenRecording.current.src = url;
      if (displayMedia) {
        displayMedia.stop();
      }
    };
    //Start the recording.
    mediaRecorder.start();
  };
  return [startScreenRecording, Recorder, screenRecording] as const;
};

export default useRecord;
