import React, { useRef, useState } from "react";

interface CustomSliderProps {
  min?: number;
  max?: number;
  step?: number;
  initialValue?: number;
  onChange?: (value: number) => void;
}

const Slider: React.FC<CustomSliderProps> = ({
  min = 0,
  max = 100,
  step = 1,
  initialValue = 50,
  onChange,
}) => {
  const [value, setValue] = useState(initialValue);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const percent = ((value - min) / (max - min)) * 100;

  const updateValueFromPosition = (clientX: number) => {
    const track = trackRef.current;
    if (!track) return;

    const rect = track.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const ratio = Math.max(0, Math.min(offsetX / rect.width, 1));
    let newValue = min + ratio * (max - min);

    // Apply step
    newValue = Math.round(newValue / step) * step;

    setValue(newValue);
    onChange?.(newValue);
  };

  // Mouse Events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    dragging.current = true;
    updateValueFromPosition(e.clientX);

    const handleMouseMove = (e: MouseEvent) => {
      if (dragging.current) {
        updateValueFromPosition(e.clientX);
      }
    };

    const handleMouseUp = () => {
      dragging.current = false;
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  // Touch Events untuk mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    dragging.current = true;
    const touch = e.touches[0];
    updateValueFromPosition(touch.clientX);

    const handleTouchMove = (e: TouchEvent) => {
      if (dragging.current && e.touches.length > 0) {
        const touch = e.touches[0];
        updateValueFromPosition(touch.clientX);
      }
    };

    const handleTouchEnd = () => {
      dragging.current = false;
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };

    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);
  };

  return (
    <div
      ref={trackRef}
      className="relative w-full h-6 cursor-pointer z-3 touch-none select-none"
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* Track */}
      <div className="absolute top-1/2 left-0 right-0 h-4 -translate-y-1/2 border-[3px] border-border-primary before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[rgb(198,198,198)] before:border-[3px] before:border-[rgb(236,237,239)] before:z-[-1]" />

      {/* Filled portion */}
      <div
        className="absolute top-1/2 h-4 -translate-y-1/2 border-[3px] border-border-primary z-4 before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[rgb(60,133,39)] before:border-[3px] before:border-[rgb(99,157,82)] before:z-[-1]"
        style={{ width: `${percent}%` }}
      />

      {/* Thumb */}
      <div
        className="absolute w-6 h-6 top-[24px] -translate-y-1/2 border-[3px] border-border-primary z-5 before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[rgb(198,198,198)] before:border-[3px] before:border-[rgb(236,237,239)] before:z-[-1]"
        style={{
          left: `${percent}%`,
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
};

export default Slider;
