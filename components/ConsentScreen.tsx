"use client";

import { useState }
from "react";

interface Props {

  consented: boolean;

  onConsentChange: (
    value: boolean
  ) => void;

  onContinue: () => void;
}

export default function ConsentScreen({

  consented,

  onConsentChange,

  onContinue,

}: Props){

  

  return (

    <div
      className="
        w-full
        max-w-4xl
        bg-white
        text-black
        space-y-6
      "
    >

      <h1
        className="
          text-4xl
          font-bold
        "
      >
        Informed Consent
      </h1>

      <div
        className="
          border
          p-6
          h-[55vh]
          overflow-y-scroll
          space-y-4
          leading-relaxed
        "
      >

        <p>
          You are invited to
          participate in a
          research study on
          teacher professional
          vision conducted at
          the Centre for
          Educational Technology,
          IIT Bombay.
        </p>

        <p>
          The purpose of this
          study is to understand
          how teachers observe
          and interpret classroom
          situations.
        </p>

        <p>
          During this study,
          you will view classroom
          images and provide
          written responses about
          what you notice.
        </p>

        <p>
          This study uses
          webcam-based gaze
          estimation technology
          to estimate visual
          attention during image
          viewing.
        </p>

        <p>
          No video recordings
          from your webcam will
          be stored. Only gaze
          coordinates and
          interaction data will
          be recorded for
          research purposes.
        </p>

        <p>
          Your participation is
          voluntary. You may stop
          participation at any
          time by closing the
          browser window without
          any penalty.
        </p>

        <p>
          All collected data
          will be anonymized and
          used only for research
          purposes.
        </p>

        <p>
          Approximate duration:
          10–15 minutes.
        </p>

        <div
          className="
            pt-4
            border-t
          "
        >

          <p
            className="
              font-semibold
            "
          >
            Principal Investigator
          </p>

          <p>
            Prof. Ramkumar Rajendran
          </p>

          <p>
            Centre for Educational
            Technology,
            IIT Bombay
          </p>

        </div>

        <div>

          <p
            className="
              font-semibold
            "
          >
            Researcher
          </p>

          <p>
            Aditya Rajmane and Abhishek Kr. Rai
          </p>

          <p>
            Centre for Educational
            Technology,
            IIT Bombay
          </p>

          <p>
            aditya.rajmane@iitb.ac.in | 25d1202@iitb.ac.in
          </p>

        </div>

      </div>

      <label
        className="
          flex
          items-start
          gap-3
        "
      >

        <input
          type="checkbox"

          checked={consented}

    onChange={(e) =>
  onConsentChange(
    e.target.checked
  )
}

          className="
            mt-1
          "
        />

        <span>
          I have read and
          understood the
          information above
          and consent to
          participate in
          this study.
        </span>

      </label>

      <button

        disabled={!consented}

        onClick={onContinue}

        className="
          bg-black
          text-white
          px-6
          py-3
          disabled:opacity-50
        "
      >
        I Consent
      </button>

    </div>
  );
}