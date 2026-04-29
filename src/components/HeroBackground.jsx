import { GradFlow } from 'gradflow';

export function HeroBackground() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
      }}
    >
      <GradFlow
        config={{
          color1: { r: 0,   g: 0,   b: 0   },
          color2: { r: 66,  g: 255, b: 233 },
          color3: { r: 129, g: 6,   b: 190 },
          speed: 0.4,
          scale: 1,
          type: 'stripe',
          noise: 0.08,
        }}
      />
    </div>
  );
}
