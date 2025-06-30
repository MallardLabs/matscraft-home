const parseRgb = (rgbString: string): [number, number, number] => {
  const match = rgbString.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (match) {
    return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
  }
  return [0, 0, 0];
};

const generateColorPalette = (baseRgb: string) => {
  const [r, g, b] = parseRgb(baseRgb);
  const bg = [Math.round(r * 0.45), Math.round(g * 0.45), Math.round(b * 0.45)];
  const border = [
    Math.min(255, Math.round(r * 1.2)),
    Math.min(255, Math.round(g * 1.2)),
    Math.min(255, Math.round(b * 1.2)),
  ];
  const hoverBg = [
    Math.round(r * 0.82),
    Math.round(g * 0.82),
    Math.round(b * 0.82),
  ];
  const hoverBorder = [
    Math.min(255, Math.round(r * 1.25)),
    Math.min(255, Math.round(g * 1.25)),
    Math.min(255, Math.round(b * 1.25)),
  ];

  return {
    bg: `rgb(${bg.join(",")})`,
    base: baseRgb,
    border: `rgb(${border.join(",")})`,
    hoverBg: `rgb(${hoverBg.join(",")})`,
    hoverBorder: `rgb(${hoverBorder.join(",")})`,
    textColor: getTextColor(baseRgb),
  };
};

const getTextColor = (rgbString: string) => {
  const [r, g, b] = parseRgb(rgbString);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? "text-black" : "text-white";
};
export default generateColorPalette;
