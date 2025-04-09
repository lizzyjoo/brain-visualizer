// src/components/PlotGrid.jsx
import React from "react";
import ConnectivityPlot from "./ConnectivityPlot";

function PlotGrid({ plotData }) {
  return (
    <div id="plots-grid" className="plots-grid">
      {plotData.map((correlation, index) => (
        <ConnectivityPlot
          key={`${correlation.system1}-${correlation.system2}-${index}`}
          correlation={correlation}
        />
      ))}
    </div>
  );
}

export default PlotGrid;
