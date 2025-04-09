import React from "react";
import "./FrequencySelector.css";

function FrequencySelector({ frequencies, currentFrequency, onChange }) {
  return (
    <div className="frequency-selector-container">
      <label className="frequency-label">Select Frequency (Hz)</label>

      <div className="frequency-scale-container">
        {/* Background oscillation visualization */}
        <div className="oscillation-background">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 800 120"
            preserveAspectRatio="none"
          >
            <path
              d={generateSineWavePath(currentFrequency)}
              stroke="#3b82f6"
              strokeWidth="2"
              fill="none"
              strokeOpacity="0.5"
            />
          </svg>
        </div>

        {/* Frequency scale */}
        <div className="frequency-scale">
          {frequencies.map((freq) => (
            <button
              key={freq}
              className={`frequency-option ${
                currentFrequency === freq ? "selected" : ""
              }`}
              onClick={() => onChange(freq)}
            >
              <span className="frequency-value">{freq}</span>
              <div
                className="frequency-indicator"
                style={{
                  height: `${Math.min(80, freq * 2.5)}%`,
                }}
              ></div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Helper function to generate the sine wave path based on frequency
function generateSineWavePath(frequency) {
  const width = 800;
  const height = 120;
  const amplitude = height / 3;
  const yCenter = height / 2;

  // Number of cycles to show based on frequency
  const cycles = Math.max(1, Math.min(20, frequency / 4));

  let path = `M 0 ${yCenter}`;

  for (let x = 0; x <= width; x += 4) {
    const angle = (x / width) * Math.PI * 2 * cycles;
    const y = yCenter + amplitude * Math.sin(angle);
    path += ` L ${x} ${y}`;
  }

  return path;
}

export default FrequencySelector;
