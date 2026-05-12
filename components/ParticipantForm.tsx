interface Props {

  name: string;

  email: string;

  phone: string;

  teacherType:
    "pre-service" |
    "in-service";

  yearsExperience: string;

  onNameChange: (
    value: string
  ) => void;

  onEmailChange: (
    value: string
  ) => void;

  onPhoneChange: (
    value: string
  ) => void;

  onTeacherTypeChange: (
    value:
      "pre-service" |
      "in-service"
  ) => void;

  onYearsExperienceChange: (
    value: string
  ) => void;

  onContinue: () => void;
}

export default function ParticipantForm({

  name,
  email,
  phone,

  teacherType,
  yearsExperience,

  onNameChange,
  onEmailChange,
  onPhoneChange,

  onTeacherTypeChange,
  onYearsExperienceChange,

  onContinue,

}: Props) {

  return (

    <div
      className="
        max-w-2xl
        w-full
        space-y-6
        text-black
      "
    >

      <h1
        className="
          text-3xl
          font-bold
        "
      >
        Participant Information
      </h1>

      {/* NAME */}

      <div
        className="
          space-y-2
        "
      >

        <label
          className="
            block
            font-medium
          "
        >
          Full Name
        </label>

        <input
          type="text"

          value={name}

          onChange={(e) =>
            onNameChange(
              e.target.value
            )
          }

          className="
            border
            p-3
            w-full
          "
        />
      </div>

      {/* EMAIL */}

      <div
        className="
          space-y-2
        "
      >

        <label
          className="
            block
            font-medium
          "
        >
          Email Address
        </label>

        <input
          type="email"

          value={email}

          onChange={(e) =>
            onEmailChange(
              e.target.value
            )
          }

          className="
            border
            p-3
            w-full
          "
        />
      </div>

      {/* PHONE */}

      <div
        className="
          space-y-2
        "
      >

        <label
          className="
            block
            font-medium
          "
        >
          Phone Number
          (WhatsApp)
        </label>

        <input
          type="tel"

          value={phone}

          onChange={(e) =>
            onPhoneChange(
              e.target.value
            )
          }

          className="
            border
            p-3
            w-full
          "
        />
      </div>

      {/* TEACHER TYPE */}

      <div
        className="
          space-y-2
        "
      >

        <label
          className="
            block
            font-medium
          "
        >
          Teacher Type
        </label>

        <select
          value={teacherType}

          onChange={(e) =>
            onTeacherTypeChange(
              e.target.value as
              "pre-service" |
              "in-service"
            )
          }

          className="
            border
            p-3
            w-full
          "
        >

          <option value="pre-service">
            Pre-service Teacher
          </option>

          <option value="in-service">
            In-service Teacher
          </option>

        </select>
      </div>

      {/* EXPERIENCE */}

      <div
        className="
          space-y-2
        "
      >

        <label
          className="
            block
            font-medium
          "
        >
          Years of Teaching Experience
        </label>

        <input
          type="number"

          value={yearsExperience}

          onChange={(e) =>
            onYearsExperienceChange(
              e.target.value
            )
          }

          className="
            border
            p-3
            w-full
          "
        />
      </div>

      <button
        onClick={onContinue}

        className="
          bg-black
          text-white
          px-6
          py-3
        "
      >
        Continue
      </button>

    </div>
  );
}