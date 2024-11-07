import React from "react";

interface OptionButtonProps {
  text: string;
  videoUrl: string;
  onClick: () => void;
}

const OptionButton: React.FC<OptionButtonProps> = ({
  text,
  videoUrl,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(videoUrl)}
      className="cursor-pointer flex items-center justify-center"
    >
      {text}
    </div>
  );
};

export default OptionButton;
