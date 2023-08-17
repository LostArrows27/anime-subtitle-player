"use client";

import { useState, useEffect, useRef, useCallback } from "react";

function Page() {
  const worker = useRef(null);

  useEffect(() => {
    if (!worker.current) {
      // Create the worker if it does not yet exist.
      worker.current = new Worker(new URL("./worker.js", import.meta.url), {
        type: "module",
      });
    }

    // Create a callback function for messages from the worker thread.
    const onMessageReceived = (e) => {
      // console.log(e.data.status);
      console.log(e.data);
      if (!!e.data.data) {
        console.log(e.data.data);
      }
      if (!!e.data.output) {
        console.log(e.data.output);
      }
    };

    // Attach the callback function as an event listener.
    worker.current.addEventListener("message", onMessageReceived);

    // Define a cleanup function for when the component is unmounted.
    return () =>
      worker.current.removeEventListener("message", onMessageReceived);
  });

  const classify = useCallback(async (event) => {
    if (worker.current) {
      let files = event.target.files;
      if (!files) return;

      // Create a blob that we can use as an src for our audio element
      const urlObj = URL.createObjectURL(files[0]);
      const mimeType = files[0].type;

      const reader = new FileReader();
      reader.addEventListener("load", async (e) => {
        const arrayBuffer = e.target?.result; // Get the ArrayBuffer
        if (!arrayBuffer) return;

        const audioCTX = new AudioContext({
          sampleRate: 16000,
        });

        const decoded = await audioCTX.decodeAudioData(arrayBuffer);
        const channelData = decoded.getChannelData(0);
        worker.current.postMessage({ audio: channelData });
      });
      reader.readAsArrayBuffer(files[0]);
    }
  }, []);

  return (
    <input
      type="file"
      className="w-full max-w-xs p-2 border border-gray-300 rounded mb-4"
      placeholder="Enter text here"
      onInput={(e) => {
        classify(e);
      }}
    />
  );
}

export default Page;
