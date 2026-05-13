"use client";

export const dynamic =
  "force-dynamic";

import {
  useEffect,
  useState,
} from "react";

import { trials }
from "@/lib/trials";

import {
  trackEvent,
} from "@/lib/telemetry";

import {
  createParticipant,
} from "@/lib/session";

import {
  saveParticipant,
  saveResponse,
} from "@/lib/database";

import {
  ExperimentPhase,
} from "@/types/experiment";

import {
  Participant,
} from "@/types/participant";

import InstructionScreen
from "@/components/InstructionScreen";

import ConsentScreen
from "@/components/ConsentScreen";

import ParticipantForm
from "@/components/ParticipantForm";

import CalibrationScreen
from "@/components/CalibrationScreen";

import FixationScreen
from "@/components/FixationScreen";

import StimulusScreen
from "@/components/StimulusScreen";

import ResponseScreen
from "@/components/ResponseScreen";

import FinishedScreen
from "@/components/FinishedScreen";

import {
  useExperiment,
} from "@/hooks/useExperiment";

import {
  useTelemetry,
} from "@/hooks/useTelemetry";

import {
  useWebGazer,
} from "@/hooks/useWebGazer";

export default function Home() {

  // =========================
  // STATE
  // =========================

  const [phase, setPhase] =
    useState<ExperimentPhase>(
      "landing"
    );

  const [trialIndex, setTrialIndex] =
    useState(0);

  const [response, setResponse] =
    useState("");

  const [participant, setParticipant] =
    useState<Participant | null>(
      null
    );

  const [
    teacherType,
    setTeacherType,
  ] = useState<
    "pre-service" |
    "in-service"
  >(
    "pre-service"
  );

  const [
    yearsExperience,
    setYearsExperience,
  ] = useState("");

  const [
    imageBounds,
    setImageBounds,
  ] = useState<DOMRect | null>(
    null
  );

  const [
    calibrationIndex,
    setCalibrationIndex,
  ] = useState(0);

  const [
    calibrationClicks,
    setCalibrationClicks,
  ] = useState(0);

  const { logTelemetry } =
    useTelemetry();

  const currentTrial =
    trials[trialIndex];

    const [name, setName] =
  useState("");

const [email, setEmail] =
  useState("");

const [phone, setPhone] =
  useState("");

const [
  consented,
  setConsented
] = useState(false);

  // =========================
  // CALIBRATION POINTS
  // =========================

  const calibrationPoints = [

    { x: 50, y: 10 },
    { x: 90, y: 10 },

    { x: 10, y: 50 },
    { x: 50, y: 50 },
    { x: 90, y: 50 },

    { x: 10, y: 90 },
    { x: 50, y: 90 },
    { x: 90, y: 90 },

    { x: 50, y: 50 },
  ];

  // =========================
  // START EXPERIMENT
  // =========================

  const startExperiment =
    (
      group:
        | "pre-service"
        | "in-service"
    ) => {

      const participantData =
        createParticipant(
          group
        );

      setParticipant(
        participantData
      );

      saveParticipant({

  id:
    participantData.id,

  group:
    participantData.group,

  name,

  email,

  phone,

  yearsExperience,

  consented,

  consentTimestamp:
    new Date()
      .toISOString(),
});

      trackEvent({

        participantId:
          participantData.id,

        timestamp:
          performance.now(),

        trialId: 0,

        phase:
          "participant",

        type:
          "participant_created",

        metadata: {
          group,
          yearsExperience,
        },
      });

      setPhase(
        "calibration"
      );
    };

  // =========================
  // PHASE TRACKING
  // =========================

  useEffect(() => {

    trackEvent({

      participantId:
        participant?.id,

      timestamp:
        performance.now(),

      trialId:
        currentTrial?.id,

      phase,

      type:
        "phase_enter",
    });

  }, [
    phase,
    currentTrial,
    participant,
  ]);

  // =========================
  // WEBGAZER
  // =========================

  useWebGazer({

    enabled:
      phase ===
        "calibration" ||
      phase ===
        "stimulus",

    participantId:
      participant?.id,

    trialId:
      currentTrial?.id,

    imageBounds,
  });

  // =========================
  // EXPERIMENT TIMING
  // =========================

  useExperiment({
    phase,
    currentTrial,
    setPhase,
  });

  // =========================
  // SELF-PACED KEYBOARD
  // =========================

  useEffect(() => {

    if (
      phase !== "stimulus" ||
      !currentTrial.selfPaced
    ) return;

    const handleKeyDown =
      (
        event: KeyboardEvent
      ) => {

        if (
          event.code ===
            "Space" ||
          event.code ===
            "Enter"
        ) {

          trackEvent({

            participantId:
              participant?.id,

            timestamp:
              performance.now(),

            trialId:
              currentTrial.id,

            phase:
              "stimulus",

            type:
              "key_pressed",

            metadata: {
              key:
                event.code,
            },
          });

          setPhase(
            "response"
          );
        }
      };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };

  }, [
    phase,
    currentTrial,
    participant,
  ]);

  // =========================
  // WINDOW FOCUS
  // =========================

  useEffect(() => {

    if (!participant)
      return;

    const handleBlur =
      () => {

        trackEvent({

          participantId:
            participant.id,

          timestamp:
            performance.now(),

          trialId:
            currentTrial.id,

          phase,

          type:
            "window_blur",
        });
      };

    const handleFocus =
      () => {

        trackEvent({

          participantId:
            participant.id,

          timestamp:
            performance.now(),

          trialId:
            currentTrial.id,

          phase,

          type:
            "window_focus",
        });
      };

    window.addEventListener(
      "blur",
      handleBlur
    );

    window.addEventListener(
      "focus",
      handleFocus
    );

    return () => {

      window.removeEventListener(
        "blur",
        handleBlur
      );

      window.removeEventListener(
        "focus",
        handleFocus
      );
    };

  }, [
    participant,
    currentTrial,
    phase,
  ]);

  // =========================
  // CALIBRATION
  // =========================

  const handleCalibrationClick =
    () => {

      const nextClicks =
        calibrationClicks + 1;

      setCalibrationClicks(
        nextClicks
      );

      if (
        nextClicks >= 5
      ) {

        setCalibrationClicks(
          0
        );

        if (
          calibrationIndex <
          calibrationPoints.length - 1
        ) {

          setCalibrationIndex(
            calibrationIndex + 1
          );

        } else {

          if (
            window.webgazer
          ) {

            window.webgazer
              .removeMouseEventListeners();
          }

          setPhase(
            "fixation"
          );
        }
      }
    };

  // =========================
  // RESPONSE SUBMISSION
  // =========================

  const submitResponse =
    () => {

      trackEvent({

        participantId:
          participant?.id,

        timestamp:
          performance.now(),

        trialId:
          currentTrial.id,

        phase:
          "response",

        type:
          "response_submitted",

        metadata: {
          response,
        },
      });

      saveResponse({

        participantId:
          participant?.id,

        trialId:
          currentTrial.id,

        responseText:
          response,
      });

      setResponse("");

      if (
        trialIndex <
        trials.length - 1
      ) {

        setTrialIndex(
          trialIndex + 1
        );

        setPhase(
          "fixation"
        );

      } else {

        setPhase(
          "finished"
        );
      }
    };

  // =========================
  // UI
  // =========================

  return (

    <main
      className="
        flex
        min-h-screen
        items-center
        justify-center
        p-10
        bg-white
      "
    >

      {/* LANDING */}

      {phase ===
        "landing" && (

        <InstructionScreen

          onSelect={() => {

            setPhase(
              "consent"
            );
          }}
        />
      )}

      {/* CONSENT */}

      {phase ===
        "consent" && (

        <ConsentScreen

  consented={consented}

  onConsentChange={
    setConsented
  }

  onContinue={() => {

    setPhase(
      "participant"
    );
  }}
/>
      )}

      {/* PARTICIPANT */}

      {phase ===
        "participant" && (

        <ParticipantForm

        name={name}
email={email}
phone={phone}

onNameChange={setName}
onEmailChange={setEmail}
onPhoneChange={setPhone}  
        
        
        
        teacherType={
            teacherType
          }

          yearsExperience={
            yearsExperience
          }

          onTeacherTypeChange={
            setTeacherType
          }

          onYearsExperienceChange={
            setYearsExperience
          }

          onContinue={() => {

            startExperiment(
              teacherType
            );
          }}
        />
      )}

      {/* CALIBRATION */}

      {phase ===
        "calibration" && (

        <CalibrationScreen

          point={
            calibrationPoints[
              calibrationIndex
            ]
          }

          clicks={
            calibrationClicks
          }

          onClick={
            handleCalibrationClick
          }
        />
      )}

      {/* FIXATION */}

      {phase ===
        "fixation" && (

        <FixationScreen />
      )}

      {/* STIMULUS */}

      {phase ===
        "stimulus" && (

        <StimulusScreen

          image={
            currentTrial.image
          }

          showNextButton={
            currentTrial.selfPaced
          }

          onImageBounds={
            setImageBounds
          }
        />
      )}

      {/* RESPONSE */}

      {phase ===
        "response" && (

        <ResponseScreen

          response={response}

          onChange={
            setResponse
          }

          onSubmit={() => {

            logTelemetry({

              participantId:
                participant?.id,

              trialId:
                currentTrial.id,

              phase:
                "response",

              type:
                "button_clicked",

              metadata: {
                button:
                  "submit_response",
              },
            });

            submitResponse();
          }}
        />
      )}

      {/* FINISHED */}

      {phase ===
        "finished" && (

        <FinishedScreen />
      )}

    </main>
  );
}