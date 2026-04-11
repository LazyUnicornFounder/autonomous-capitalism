import { AbsoluteFill, Sequence, useCurrentFrame, interpolate } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { IntroScene } from "./scenes/IntroScene";
import { TitleScene } from "./scenes/TitleScene";
import { SummaryScene } from "./scenes/SummaryScene";
import { OutroScene } from "./scenes/OutroScene";

type Props = {
  title: string;
  summary: string;
  date: string;
};

export const DispatchVideo: React.FC<Props> = ({ title, summary, date }) => {
  const frame = useCurrentFrame();

  // Persistent animated background gradient
  const gradAngle = interpolate(frame, [0, 600], [135, 180]);
  const bg = `linear-gradient(${gradAngle}deg, #050510 0%, #0a0a1a 40%, #0d1525 70%, #050510 100%)`;

  // Floating accent orbs
  const orb1X = interpolate(frame, [0, 600], [-10, 15]);
  const orb1Y = interpolate(frame, [0, 600], [20, 60]);
  const orb2X = interpolate(frame, [0, 600], [80, 55]);
  const orb2Y = interpolate(frame, [0, 600], [70, 25]);

  return (
    <AbsoluteFill style={{ background: bg }}>
      {/* Floating accent orbs */}
      <div
        style={{
          position: "absolute",
          left: `${orb1X}%`,
          top: `${orb1Y}%`,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,153,255,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: `${orb2X}%`,
          top: `${orb2Y}%`,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,153,255,0.05) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={120}>
          <IntroScene date={date} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 20 })}
        />
        <TransitionSeries.Sequence durationInFrames={180}>
          <TitleScene title={title} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 20 })}
        />
        <TransitionSeries.Sequence durationInFrames={210}>
          <SummaryScene summary={summary} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 20 })}
        />
        <TransitionSeries.Sequence durationInFrames={150}>
          <OutroScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
