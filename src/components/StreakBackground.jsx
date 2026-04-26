import { useEffect, useState } from "react";

const colors = [
  "from-purple-400 via-purple-300",
  "from-cyan-400 via-blue-300",
  "from-pink-500 via-purple-400",
  "from-blue-400 via-cyan-300",
];

const StreakBackground = () => {
  const [streaks, setStreaks] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newStreak = {
        id: Date.now(),
        left: Math.random() * 100,
        top: Math.random() * 100, // 🔥 random vertical position
        duration: 1.8 + Math.random() * 1.8,
        color: colors[Math.floor(Math.random() * colors.length)],
      };

      setStreaks((prev) => [...prev, newStreak]);

      setTimeout(() => {
        setStreaks((prev) => prev.filter((s) => s.id !== newStreak.id));
      }, 2000);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 bg-black overflow-hidden">
      {streaks.map((s) => (
        <span
  key={s.id}
  className="absolute pointer-events-none"
  style={{
    left: `${s.left}%`,
    top: `${s.top}%`,
    transform: "rotate(-45deg)",
    animation: `shoot ${s.duration}s linear forwards`,
  }}
>
  {/* Trail */}
  <div
    className={`w-[2px] h-[140px] bg-gradient-to-b ${s.color} to-transparent opacity-80 blur-[3px]`}
  />

  {/* Bright head */}
  <div
   className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[4px] h-[4px] rounded-full bg-white blur-[2px] shadow-[0_0_12px_#a855f7]"
  />
</span>
      ))}
    </div>
  );
};

export default StreakBackground;