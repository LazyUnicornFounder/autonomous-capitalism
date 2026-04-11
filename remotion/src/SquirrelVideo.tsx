import { AbsoluteFill } from "remotion";
import { SquirrelScene } from "./scenes/SquirrelScene";

type Props = {
  sentence: string;
  videoUrl: string;
};

export const SquirrelVideo: React.FC<Props> = ({ sentence, videoUrl }) => {
  return (
    <AbsoluteFill>
      <SquirrelScene sentence={sentence} videoUrl={videoUrl} />
    </AbsoluteFill>
  );
};
