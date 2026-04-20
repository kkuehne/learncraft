// Bachforellen-SVG basierend auf klassischer Zeichnung
// Proportionen: zylindrischer Körper, kleinerer Kopf, tief gegabelter Schwanz

export const TroutSVG = `
<svg 
  viewBox="0 0 300 90" 
  className="w-full h-auto max-w-3xl mx-auto"
  style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.1))' }}
>
  <defs>
    {/* Körper-Gradient: Oliv → Silber → Hell */}
    <linearGradient id="troutBody" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#3d4f1f" />   {/* Dunkles Oliv */}
      <stop offset="25%" stopColor="#5a6b2c" />  {/* Oliv */}
      <stop offset="55%" stopColor="#8a9a9a" />  {/* Silber */}
      <stop offset="100%" stopColor="#d5d8dc" /> {/* Hell */}
    </linearGradient>
    
    {/* Schuppen-Muster */}
    <pattern id="troutScales" x="0" y="0" width="4" height="3" patternUnits="userSpaceOnUse">
      <ellipse cx="2" cy="1.5" rx="1.2" ry="0.8" fill="none" stroke="#2d3748" strokeWidth="0.15" opacity="0.3" />
    </pattern>
    
    {/* Flossen-Gradient */}
    <linearGradient id="finGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#556b2f" />
      <stop offset="100%" stopColor="#8b4513" />
    </linearGradient>
    
    {/* Schwanzflosse-Gradient */}
    <linearGradient id="tailGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#c53030" />
      <stop offset="30%" stopColor="#f56565" />
      <stop offset="50%" stopColor="#feb2b2" />
      <stop offset="70%" stopColor="#f56565" />
      <stop offset="100%" stopColor="#c53030" />
    </linearGradient>
    
    {/* Kiemendeckel-Gradient */}
    <radialGradient id="gillGradient" cx="50%" cy="50%">
      <stop offset="0%" stopColor="#7c2d12" />
      <stop offset="100%" stopColor="#4a5d23" />
    </radialGradient>
  </defs>
  
  <g transform="translate(10, 10)">
    {/* Schatten unter dem Fisch */}
    <ellipse cx="140" cy="72" rx="120" ry="7" fill="#000" opacity="0.06" />
    
    {/* === SCHAUFLOSSE (Schwanz) - Am weitesten hinten === */}
    <g>
      {/* Schwanzstiel */}
      <path d="M 40 40 L 55 40 L 55 55 L 40 55 Z" fill="url(#troutBody)" />
      
      {/* Tief gegabelte Schwanzflosse wie bei klassischer Zeichnung */}
      <path 
        d="M 5 48 
           C 10 30, 20 32, 40 40
           L 40 55
           C 20 63, 10 65, 5 48 Z" 
        fill="url(#tailGradient)" 
        stroke="#9b2c2c" 
        strokeWidth="0.5"
      />
      {/* Gabel-Linie */}
      <path d="M 40 47 L 40 48" fill="none" stroke="#9b2c2c" strokeWidth="0.4" />
      
      {/* Flossenstrahlen */}
      <path d="M 12 48 C 18 38 25 35 32 38" fill="none" stroke="#7b1d1d" strokeWidth="0.3" />
      <path d="M 12 48 C 20 42 28 40 35 41" fill="none" stroke="#7b1d1d" strokeWidth="0.3" />
      <path d="M 12 48 C 20 54 28 55 35 54" fill="none" stroke="#7b1d1d" strokeWidth="0.3" />
      <path d="M 12 48 C 18 58 25 60 32 57" fill="none" stroke="#7b1d1d" strokeWidth="0.3" />
    </g>
    
    {/* === AFTERFLOSSE === */}
    <path 
      d="M 100 62 C 105 70 112 67 115 62 L 110 58 Z" 
      fill="url(#finGradient)" 
      stroke="#3f6212" 
      strokeWidth="0.4"
      opacity="0.9"
    />
    
    {/* === KÖRPER - Zylindrisch, weniger komprimiert === */}
    <path 
      d="M 55 42 
         C 55 25, 90 18, 130 16
         C 180 14, 220 22, 245 35
         C 255 42, 255 52, 245 58
         C 220 68, 180 72, 130 70
         C 90 68, 55 65, 55 48
         Z" 
      fill="url(#troutBody)" 
      stroke="#3f6212" 
      strokeWidth="0.5"
    />
    
    {/* Schuppen überlagert */}
    <path 
      d="M 55 42 
         C 55 25, 90 18, 130 16
         C 180 14, 220 22, 245 35
         C 255 42, 255 52, 245 58
         C 220 68, 180 72, 130 70
         C 90 68, 55 65, 55 48
         Z" 
      fill="url(#troutScales)" 
      opacity="0.35"
    />
    
    {/* Schwarze Flecken (parr marks) */}
    <g fill="#1a202c" opacity="0.65">
      <ellipse cx="80" cy="30" rx="1.8" ry="1.2" />
      <ellipse cx="105" cy="26" rx="1.5" ry="1" />
      <ellipse cx="130" cy="24" rx="1.8" ry="1.2" />
      <ellipse cx="160" cy="26" rx="1.5" ry="1" />
      <ellipse cx="190" cy="30" rx="1.8" ry="1.2" />
      <ellipse cx="210" cy="34" rx="1.5" ry="1" />
      
      <ellipse cx="90" cy="50" rx="1.5" ry="1" />
      <ellipse cx="120" cy="52" rx="1.8" ry="1.2" />
      <ellipse cx="150" cy="54" rx="1.5" ry="1" />
      <ellipse cx="180" cy="52" rx="1.5" ry="1" />
    </g>
    
    {/* Rote Flecken mit weißen Rändern - typisch Bachforelle */}
    <g opacity="0.75">
      {/* Rote Punkte */}
      <circle cx="95" cy="32" r="1.2" fill="#c53030" />
      <circle cx="120" cy="34" r="1.1" fill="#c53030" />
      <circle cx="145" cy="36" r="1.2" fill="#c53030" />
      <circle cx="170" cy="38" r="1.1" fill="#c53030" />
      <circle cx="195" cy="40" r="1.2" fill="#c53030" />
      
      {/* Weiße Ränder (Halo-Effekt) */}
      <circle cx="95" cy="32" r="1.8" fill="none" stroke="#f7fafc" strokeWidth="0.3" opacity="0.5" />
      <circle cx="120" cy="34" r="1.7" fill="none" stroke="#f7fafc" strokeWidth="0.3" opacity="0.5" />
      <circle cx="145" cy="36" r="1.8" fill="none" stroke="#f7fafc" strokeWidth="0.3" opacity="0.5" />
      <circle cx="170" cy="38" r="1.7" fill="none" stroke="#f7fafc" strokeWidth="0.3" opacity="0.5" />
      <circle cx="195" cy="40" r="1.8" fill="none" stroke="#f7fafc" strokeWidth="0.3" opacity="0.5" />
    </g>
    
    {/* === RÜCKENFLOSSE === */}
    <g>
      <path 
        d="M 115 16 C 130 4 150 8 158 16 L 150 18 L 125 18 Z" 
        fill="url(#finGradient)" 
        stroke="#3f6212" 
        strokeWidth="0.4"
      />
      {/* Flossenstrahlen */}
      <path d="M 125 18 L 128 8" fill="none" stroke="#3f6212" strokeWidth="0.25" />
      <path d="M 132 18 L 138 6" fill="none" stroke="#3f6212" strokeWidth="0.25" />
      <path d="M 140 18 L 150 10" fill="none" stroke="#3f6212" strokeWidth="0.25" />
    </g>
    
    {/* === FETTFLOSSE (hinter Rückenflosse) === */}
    <ellipse 
      cx="85" cy="17" rx="4" ry="2" 
      fill="#4a5d23" 
      stroke="#3f6212" 
      strokeWidth="0.4"
    />
    
    {/* === BRUSTFLOSSE === */}
    <g>
      <path 
        d="M 195 60 C 205 68 215 64 218 58 L 210 52 Z" 
        fill="url(#finGradient)" 
        stroke="#3f6212" 
        strokeWidth="0.4"
        opacity="0.9"
      />
      {/* Flossenstrahlen */}
      <path d="M 200 62 L 208 66" fill="none" stroke="#3f6212" strokeWidth="0.25" />
      <path d="M 205 60 L 213 64" fill="none" stroke="#3f6212" strokeWidth="0.25" />
    </g>
    
    {/* === KOPF - Kleiner im Verhältnis zum Körper === */}
    {/* Schnauze */}
    <path 
      d="M 245 38 C 265 28 275 32 278 38 
         C 280 42 278 46 275 50 
         C 270 56 260 54 255 52" 
      fill="url(#troutBody)" 
      stroke="#3f6212" 
      strokeWidth="0.5"
    />
    
    {/* Maul */}
    <path 
      d="M 270 42 C 274 42 276 44 276 46" 
      fill="none" 
      stroke="#1a202c" 
      strokeWidth="0.8"
      strokeLinecap="round"
    />
    
    {/* Auge */}
    <g>
      <ellipse cx="225" cy="32" rx="5" ry="6" fill="#fef3c7" stroke="#1a202c" strokeWidth="0.5" />
      <circle cx="227" cy="32" r="3.2" fill="#1a202c" />
      <circle cx="228" cy="31" r="1" fill="white" />
    </g>
    
    {/* Kiemendeckel */}
    <path 
      d="M 205 28 C 225 24 230 38 226 50 
         C 220 58 205 54 198 45 
         C 192 36 198 30 205 28 Z" 
      fill="url(#gillGradient)" 
      stroke="#3f6212" 
      strokeWidth="0.5"
    />
    
    {/* Kiemenspalt */}
    <path 
      d="M 208 35 C 210 40 208 46" 
      fill="none" 
      stroke="#5c2810" 
      strokeWidth="0.4"
      strokeLinecap="round"
    />
    
    {/* === SEITENLINIE === */}
    <path 
      d="M 55 45 C 90 43 130 44 170 45 C 210 46 240 42 255 40" 
      fill="none" 
      stroke="#faf5eb" 
      strokeWidth="1" 
      opacity="0.8"
      strokeLinecap="round"
    />
    
    {/* Seitenlinien-Poren */}
    <g fill="#4a5568">
      <circle cx="75" cy="44.5" r="0.5" />
      <circle cx="100" cy="44.3" r="0.5" />
      <circle cx="125" cy="44.5" r="0.5" />
      <circle cx="150" cy="45" r="0.5" />
      <circle cx="175" cy="45.2" r="0.5" />
      <circle cx="200" cy="44.8" r="0.5" />
      <circle cx="225" cy="43.5" r="0.5" />
    </g>
  </g>
</svg>
`;
