interface Props {
  onSelect: (
    group: "pre-service" | "in-service"
  ) => void;
}

export default function InstructionScreen({
  onSelect,
}: Props) {

  return (
    <div className="text-center">

      <h1 className="text-3xl font-bold text-black mb-6">
        Teacher Vision Study
      </h1>

      <div className="flex gap-4 justify-center">

        <button
          className="bg-black text-white px-6 py-3"
          onClick={() =>
            onSelect("pre-service")
          }
        >
          Pre-Service Teacher
        </button>

        <button
          className="bg-black text-white px-6 py-3"
          onClick={() =>
            onSelect("in-service")
          }
        >
          In-Service Teacher
        </button>

      </div>
    </div>
  );
}