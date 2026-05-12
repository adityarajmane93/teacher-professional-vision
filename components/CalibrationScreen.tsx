"use client";

import {
  useEffect,
  useRef,
} from "react";

interface Props {

  point: {
    x: number;
    y: number;
  };

  onClick: () => void;

  clicks: number;
}

export default function CalibrationScreen({
  point,
  onClick,
  clicks,
}: Props) {

  const audioRef =
    useRef<HTMLAudioElement>(null);

  // =====================
  // PLAY AUDIO
  // =====================

  useEffect(() => {

    if (
      audioRef.current
    ) {

      audioRef.current.volume =
        0.4;

      audioRef.current.play()
        .catch((err) => {

          console.error(
            "AUDIO PLAY ERROR:",
            err
          );
        });
    }

  }, []);

  return (

    <div
      className="
        relative
        w-screen
        h-screen
        bg-white
      "
    >

      {/* AUDIO */}

      <audio
        ref={audioRef}

        src="/audio/calibration.mp3"

        loop
      />

      {/* DOT */}

      <div
        onClick={onClick}

        className="
          absolute
          w-16
          h-16
          rounded-full
          bg-red-500
          cursor-pointer
        "

        style={{
          left: `${point.x}%`,
          top: `${point.y}%`,
          transform:
            "translate(-50%, -50%)",
        }}
      />

      {/* INSTRUCTIONS */}

      <div
        className="
          absolute
          top-4
          left-4
          text-black
          max-w-md
          space-y-2
        "
      >

        <p>
          Look directly at
          the dot and click
          it 5 times.
        </p>

        <p>
          Keep your head still
          and look directly at
          the dot before clicking.
        </p>

        <p>
          Current clicks:
          {" "}
          {clicks}
        </p>

      </div>

    </div>
  );
}