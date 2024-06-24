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

  const [recorder, setRecorder] = useState<MediaRecorder | undefined>();
  const [displayMedia, setDisplayMedia] = useState<MediaStreamTrack>();

  const startScreenRecording = async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: {
        displaySurface: "window",
        width: { max: 1920 },
        height: { max: 1080 },
        frameRate: { max: 30 },
        aspectRatio: 1.777777778, // 16:9 aspect ratio
      },
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44100,
      },
    });
    console.log("stream", stream.active);
    const mediaRecorder = new MediaRecorder(stream);
    setRecorder(mediaRecorder);
    setDisplayMedia(stream.getVideoTracks()[0]);

    const screenRecordingChunks: Array<ScreenRecordingChunksType> = [];

    mediaRecorder.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      if (event.data.size > 0) {
        screenRecordingChunks.push(event.data);
        console.log("screenrecording", event.data);
      }
    };

    //Start the recording.
    mediaRecorder.start();

    mediaRecorder.onstop = () => {
      //onstop event of media recorder
      if (displayMedia) {
        displayMedia.stop();
      }
      const blob: Blob = new Blob(screenRecordingChunks as BlobPart[], {
        type: "video/webm",
      });
      const url = URL.createObjectURL(blob);
      screenRecording.current.src = url;
      console.log("url video", url);
    };
  };
  return [
    startScreenRecording,
    recorder,
    screenRecording,
    displayMedia,
  ] as const;
};

export default useRecord;
