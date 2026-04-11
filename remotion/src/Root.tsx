import { Composition } from "remotion";
import { DispatchVideo } from "./MainVideo";
import { SquirrelVideo } from "./SquirrelVideo";

export const RemotionRoot = () => (
  <>
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
    <Composition
      id="squirrel"
      component={SquirrelVideo}
      durationInFrames={150}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{
        sentence: "I hid 400 acorns last fall and I remember every single one.",
        videoUrl: "https://id-preview--1d83a6f6-ae76-4891-b5be-105174dc52a9.lovable.app/__l5e/assets-v1/fb720f2f-d1d5-4419-8186-a7bfb3dacff4/squirrel-talking.mp4",
      }}
    />
  </>
);
