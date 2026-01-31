import React from 'react';

const Logo = ({ className = "h-12 w-auto", ...props }) => {
    return (
        <svg
            viewBox="0 0 160 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-label="SpeakPro Logo"
            {...props}
        >
            <defs>
                <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.15" />
                </filter>
            </defs>

            {/* Headset Band (Behind) */}
            <path
                d="M20 70 A 60 60 0 0 1 140 70"
                stroke="#4285F4"
                strokeWidth="8"
                strokeLinecap="round"
            />

            {/* Microphone Boom (Bottom Right) */}
            <path
                d="M140 80 Q 140 130 90 125"
                stroke="#4285F4"
                strokeWidth="6"
                strokeLinecap="round"
            />
            <circle cx="90" cy="125" r="7" fill="#4285F4" />

            {/* Earcup (Right) */}
            <ellipse cx="140" cy="75" rx="10" ry="20" fill="#4285F4" />

            {/* Earcup (Left) */}
            <ellipse cx="20" cy="75" rx="10" ry="20" fill="#4285F4" />

            {/* Speech Bubble Container */}
            <g filter="url(#soft-shadow)">
                <rect
                    x="30"
                    y="35"
                    width="100"
                    height="80"
                    rx="16"
                    fill="white"
                    stroke="#1967D2"
                    strokeWidth="4"
                />
                {/* Tail */}
                <path d="M70 115 L 80 125 L 90 115 Z" fill="white" />
                {/* Cover stroke for merge */}
                <path d="M72 114 L 88 114 L 80 122 Z" fill="white" />
            </g>

            {/* Text - Reverting to requested Vertical Red/Blue stack */}
            <text
                x="80"
                y="75"
                textAnchor="middle"
                fontFamily="'Montserrat', sans-serif"
                fontWeight="800"
                fontSize="28"
                fill="#EA4335"
            >
                Speak
            </text>
            <text
                x="80"
                y="100"
                textAnchor="middle"
                fontFamily="'Montserrat', sans-serif"
                fontWeight="900"
                fontSize="32"
                fill="#1967D2"
            >
                PRO
            </text>
        </svg>
    );
};

export default Logo;
