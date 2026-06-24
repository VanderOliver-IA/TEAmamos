export function PuzzleHeart({ className = "", size = 120 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      aria-label="Coração de quebra-cabeça TEAmamos"
    >
      {/* Top-left piece - Teal */}
      <path
        d="M100 100 L100 50 Q100 10 70 10 Q30 10 30 50 Q30 70 50 85 L100 100Z"
        fill="#53B9B3"
        className="puzzle-tl"
      />
      {/* Connector nub top-left to top-right */}
      <circle cx="100" cy="55" r="10" fill="#53B9B3" className="puzzle-tl" />
      <circle cx="100" cy="55" r="10" fill="#F67663" className="puzzle-tr" />

      {/* Top-right piece - Coral */}
      <path
        d="M100 100 L100 50 Q100 10 130 10 Q170 10 170 50 Q170 70 150 85 L100 100Z"
        fill="#F67663"
        className="puzzle-tr"
      />

      {/* Bottom-left piece - Mostarda */}
      <path
        d="M100 100 L50 85 Q30 95 30 110 Q30 140 60 160 L100 190 L100 100Z"
        fill="#EFB347"
        className="puzzle-bl"
      />
      {/* Connector nub bottom */}
      <circle cx="100" cy="145" r="10" fill="#EFB347" className="puzzle-bl" />
      <circle cx="100" cy="145" r="10" fill="#5F8FD9" className="puzzle-br" />

      {/* Bottom-right piece - Azul */}
      <path
        d="M100 100 L150 85 Q170 95 170 110 Q170 140 140 160 L100 190 L100 100Z"
        fill="#5F8FD9"
        className="puzzle-br"
      />

      {/* Center connector */}
      <circle cx="75" cy="100" r="8" fill="#EFB347" className="puzzle-bl" />
      <circle cx="75" cy="100" r="8" fill="#53B9B3" className="puzzle-tl" />
      <circle cx="125" cy="100" r="8" fill="#5F8FD9" className="puzzle-br" />
      <circle cx="125" cy="100" r="8" fill="#F67663" className="puzzle-tr" />
    </svg>
  );
}

export function PuzzlePiece({
  color,
  className = "",
  size = 40,
}: {
  color: "teal" | "coral" | "mostarda" | "azul";
  className?: string;
  size?: number;
}) {
  const colors = {
    teal: "#53B9B3",
    coral: "#F67663",
    mostarda: "#EFB347",
    azul: "#5F8FD9",
  };

  return (
    <svg viewBox="0 0 60 60" width={size} height={size} className={className}>
      <path
        d="M10 15 Q10 5 20 5 L25 5 Q30 0 35 5 L40 5 Q50 5 50 15 L50 20 Q55 25 50 30 L50 40 Q50 50 40 50 L35 50 Q30 55 25 50 L20 50 Q10 50 10 40 L10 35 Q5 30 10 25 Z"
        fill={colors[color]}
      />
    </svg>
  );
}
