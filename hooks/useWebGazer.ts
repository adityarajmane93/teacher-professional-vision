"use client";

import { useEffect }
from "react";

import { saveGazePoint }
from "@/lib/gaze";

declare global {
  interface Window {
    webgazer: any;
  }
}

interface Props {

  enabled: boolean;

  participantId?: string;

  trialId?: number;

  imageBounds?: DOMRect | null;
}

export function useWebGazer({
  enabled,
  participantId,
  trialId,
  imageBounds,
}: Props) {

  useEffect(() => {

    if (!enabled) return;

    let isMounted = true;

    initializeWebGazer();

    async function initializeWebGazer() {

      try {

        // =====================
        // LOAD SCRIPT
        // =====================

        await loadWebGazerScript();

        // =====================
        // CAMERA PERMISSION
        // =====================

        await navigator
          .mediaDevices
          .getUserMedia({
            video: true,
          });

        // =====================
        // WAIT FOR GLOBAL
        // =====================

        await new Promise(
          (resolve) =>
            setTimeout(
              resolve,
              1000
            )
        );

        if (!isMounted) return;

        const webgazer =
          window.webgazer;

        if (!webgazer) {

          console.error(
            "WEBGAZER NOT FOUND"
          );

          return;
        }

        // =====================
        // CLEAN RESTART
        // IMPORTANT
        // =====================

        try {

  webgazer.end();

} catch {

  console.log(
    "NO EXISTING WEBGAZER SESSION"
  );
}
        // =====================
        // CONFIG
        // =====================

        webgazer.params.faceMeshSolutionPath =
          "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh";

        webgazer.params.moveTickSize =
          12;

        webgazer.params.dataTimestep =
          50;

        webgazer
          .applyKalmanFilter(
            true
          );

        webgazer
          .setRegression(
            "ridge"
          );

        // =====================
        // GAZE LISTENER
        // =====================

        webgazer
          .setGazeListener(
            (
              data: any,
              timestamp: number
            ) => {

              if (!data) return;

              if (!imageBounds) return;

              console.log(
                "CURRENT TRIAL:",
                trialId
              );

              const relativeX =
                (
                  data.x -
                  imageBounds.left
                ) /
                imageBounds.width;

              const relativeY =
                (
                  data.y -
                  imageBounds.top
                ) /
                imageBounds.height;

              // ignore outside image
              if (
                relativeX < 0 ||
                relativeX > 1 ||
                relativeY < 0 ||
                relativeY > 1
              ) {

                return;
              }

              saveGazePoint({

                participantId,

                trialId,

                timestamp,

                rawX:
                  data.x,

                rawY:
                  data.y,

                relativeX,

                relativeY,
              });
            }
          );

        // =====================
        // START TRACKING
        // =====================

        await webgazer.begin();

        // =====================
        // DEBUGGING VISUALS
        // =====================

        webgazer
          .showVideoPreview(
            false
          )
          .showPredictionPoints(
            true
          )
          .showFaceOverlay(
            true
          )
          .showFaceFeedbackBox(
            true
          );

      } catch (err) {

        console.error(
          "WEBGAZER ERROR:",
          err
        );
      }
    }

    async function loadWebGazerScript() {

      return new Promise<void>(
        (
          resolve,
          reject
        ) => {

          const existingScript =
            document.querySelector(
              'script[src="https://webgazer.cs.brown.edu/webgazer.js"]'
            );

          if (existingScript) {

            resolve();

            return;
          }

          const script =
            document.createElement(
              "script"
            );

          script.src =
            "https://webgazer.cs.brown.edu/webgazer.js";

          script.async = true;

          script.onload =
            () => resolve();

          script.onerror =
            () =>
              reject(
                new Error(
                  "FAILED TO LOAD WEBGAZER"
                )
              );

          document.body.appendChild(
            script
          );
        }
      );
    }

    return () => {

      isMounted = false;

      if (
        window.webgazer
      ) {

        window.webgazer.end();
      }
    };

  }, [
    enabled,
    participantId,
    trialId,
    imageBounds,
  ]);
}