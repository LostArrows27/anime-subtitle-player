"use client";

import { useState, useEffect, useRef, useCallback } from "react";

function Page() {
  const worker = useRef(null);
  useEffect(() => {
    // Create the worker if it does not yet exist.
    if (!worker.current) {
      worker.current = new Worker(new URL("./worker.js", import.meta.url), {
        type: "module",
      });
    }

    const onMessageReceived = (event) => {
      const message = event.data;
      // Update the state with the result
      console.log(message.status);
      if (message.status === "complete") console.log(message.data);
    };

    // Attach the callback function as an event listener.
    worker.current.addEventListener("message", onMessageReceived);

    // Define a cleanup function for when the component is unmounted.
    return () =>
      worker.current.removeEventListener("message", onMessageReceived);
  });

  const classify = useCallback(async (event) => {
    let files = event.target.files;
    if (!files) return;
    const reader = new FileReader();
    reader.addEventListener("load", async (e) => {
      const arrayBuffer = e.target?.result; // Get the ArrayBuffer
      if (!arrayBuffer) return;

      const audioCTX = new AudioContext({
        sampleRate: 16000,
      });

      const decoded = await audioCTX.decodeAudioData(arrayBuffer);
      worker.current.postMessage({
        audio: decoded.getChannelData(0),
        model: "medium",
        multilingual: true,
        quantized: true,
        subtask: "transcribe",
        language: "ja",
      });
    });
    reader.readAsArrayBuffer(files[0]);
  }, []);

  return (
    <input
      type="file"
      className="w-full max-w-xs p-2 mb-4 border border-gray-300 rounded"
      placeholder="Enter text here"
      onInput={(e) => {
        classify(e);
      }}
    />
  );
}

export default Page;
