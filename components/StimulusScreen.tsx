import {
  useRef,
} from "react";

interface Props {

  image: string;

  showNextButton?: boolean;

  onNext?: () => void;

  onImageBounds?: (
    bounds: DOMRect
  ) => void;
}

export default function StimulusScreen({
  image,
  showNextButton = false,
  onNext,
  onImageBounds,
}: Props) {

  const imageRef =
    useRef<HTMLImageElement>(null);

  const handleImageLoad =
    () => {

      if (
        imageRef.current &&
        onImageBounds
      ) {

        const bounds =
          imageRef.current
            .getBoundingClientRect();

        console.log(
          "IMAGE BOUNDS:",
          {
            left: bounds.left,
            top: bounds.top,
            right: bounds.right,
            bottom: bounds.bottom,
            width: bounds.width,
            height: bounds.height,
          }
        );

        onImageBounds(
          bounds
        );
      }
    };

  return (

    <div
      className="
        fixed
        inset-0
        bg-black
        flex
        flex-col
        items-center
        justify-center
        overflow-hidden
        cursor-none
      "
    >

      <img
        ref={imageRef}

        src={image}

        alt="Stimulus"

        onLoad={handleImageLoad}

        className="
          max-w-full
          max-h-[85vh]
          object-contain
        "
      />

      {showNextButton && (

        <div
          className="
            absolute
            bottom-6
            text-white
            text-lg
          "
        >
          Press SPACE to continue
        </div>
      )}

    </div>
  );
}