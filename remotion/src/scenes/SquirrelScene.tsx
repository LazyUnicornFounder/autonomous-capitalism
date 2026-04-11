import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Video, staticFile } from "remotion";

type Props = { sentence: string; videoUrl: string };

export const SquirrelScene: React.FC<Props> = ({ sentence, videoUrl }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Speech bubble appears after a brief delay
  const bubbleScale = spring({ frame: frame - 20, fps, config: { damping: 12, stiffness: 150 } });
  const bubbleOpacity = interpolate(bubbleScale, [0, 1], [0, 1]);

  // Words appear one by one
  const words = sentence.split(" ");

  return (
    <AbsoluteFill>
      {/* Squirrel video background */}
      <Video
        src={videoUrl}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />

      {/* Darkening overlay for text readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)",
        }}
      />

      {/* Speech bubble */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: "50%",
          transform: `translateX(-50%) scale(${bubbleScale})`,
          opacity: bubbleOpacity,
          background: "rgba(255,255,255,0.95)",
          borderRadius: 24,
          padding: "30px 50px",
          maxWidth: 900,
          boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
        }}
      >
        {/* Bubble tail */}
        <div
          style={{
            position: "absolute",
            top: -18,
            left: "50%",
            marginLeft: -15,
            width: 0,
            height: 0,
            borderLeft: "15px solid transparent",
            borderRight: "15px solid transparent",
            borderBottom: "20px solid rgba(255,255,255,0.95)",
          }}
        />

        {/* Animated words */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0 10px", justifyContent: "center" }}>
          {words.map((word, i) => {
            const delay = 30 + i * 8;
            const s = spring({ frame: frame - delay, fps, config: { damping: 15, stiffness: 200 } });
            const wordOpacity = interpolate(s, [0, 1], [0, 1]);
            const y = interpolate(s, [0, 1], [20, 0]);

            return (
              <span
                key={i}
                style={{
                  fontFamily: "sans-serif",
                  fontSize: 42,
                  fontWeight: 700,
                  color: "#1a1a1a",
                  opacity: wordOpacity,
                  transform: `translateY(${y}px)`,
                  display: "inline-block",
                }}
              >
                {word}
              </span>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
