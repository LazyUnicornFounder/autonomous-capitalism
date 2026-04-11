import { Composition } from "remotion";
import { DispatchVideo } from "./MainVideo";

export const RemotionRoot = () => (
  <Composition
    id="main"
    component={DispatchVideo}
    durationInFrames={600}
    fps={30}
    width={1920}
    height={1080}
    defaultProps={{
      title: "The laboratory of the unleashed",
      summary:
        'The era of the "chatbot wrapper" is dying a quiet, unceremonious death. In its place, a far more territorial and active species is emerging: the autonomous agent that doesn\'t just suggest, but settles.',
      date: "April 11, 2026",
    }}
  />
);
