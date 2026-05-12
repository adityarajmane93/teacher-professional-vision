interface Props {
  response: string;

  onChange: (
    value: string
  ) => void;

  onSubmit: () => void;
}

export default function ResponseScreen({
  response,
  onChange,
  onSubmit,
}: Props) {

  return (

    <div
      className="
        w-full
        max-w-2xl
      "
    >

      <h1
        className="
          text-2xl
          font-bold
          mb-4
          text-black
        "
      >
        What did you notice?
      </h1>

      <textarea
        value={response}

        onChange={(e) =>
          onChange(e.target.value)
        }

        className="
          w-full
          border
          p-4
          h-60
          text-black
        "
      />

      <button

        className="
          mt-4
          bg-black
          text-white
          px-4
          py-2
        "

        onClick={onSubmit}
      >
        Submit
      </button>

    </div>
  );
}