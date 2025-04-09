// src/components/SystemButtons.jsx
import React from "react";

function SystemButtons({ systems, selectedSystems, onToggle }) {
  return (
    <div id="system-buttons" className="system-buttons">
      <p className="system-label">Select Brain Systems</p>
      <div className="buttons-container">
        {Array.from(new Set(systems))
          .sort()
          .map((system) => (
            <button
              key={system}
              className={`system-button ${
                selectedSystems.includes(system) ? "selected" : ""
              }`}
              onClick={() => onToggle(system)}
            >
              {system.replace(/_/g, " ")}
            </button>
          ))}
      </div>
    </div>
  );
}

export default SystemButtons;
