import React, { useState, useEffect, useCallback } from "react";
import FrequencySelector from "./FrequencySelector";
import SystemButtons from "./SystemButtons";
import PlotGrid from "./PlotGrid";
import MessageArea from "./MessageArea";
import { fetchData } from "../utils/dataProcessing";

function BrainConnectivityApp() {
  const [data, setData] = useState(null);
  const [currentFrequency, setCurrentFrequency] = useState(null);
  const [selectedSystems, setSelectedSystems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [warningMessage, setWarningMessage] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // Load data only once when component mounts
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const result = await fetchData("./data/brain_connectivity_data.json");
        setData(result);
        setCurrentFrequency(result.frequencies[0]);
        setLoading(false);
      } catch (err) {
        setError("Failed to load brain connectivity data");
        setLoading(false);
        console.error(err);
      }
    }

    loadData();
  }, []);

  // Filter data when dependencies change - not during render
  useEffect(() => {
    if (!data || !currentFrequency) return;

    // Filter by frequency and selected systems
    const filtered = data.correlations.filter(
      (corr) =>
        corr.frequency === currentFrequency &&
        (selectedSystems.includes(corr.system1) ||
          selectedSystems.includes(corr.system2))
    );

    // Check if too many plots
    const maxPlots = 12;

    if (filtered.length > maxPlots) {
      setWarningMessage(
        `Showing ${maxPlots} of ${filtered.length} plots. Select fewer systems to see specific correlations.`
      );
      setFilteredData(filtered.slice(0, maxPlots));
    } else {
      setWarningMessage("");
      setFilteredData(filtered);
    }
  }, [data, currentFrequency, selectedSystems]);

  // Use callbacks for event handlers
  const handleFrequencyChange = useCallback((freq) => {
    setCurrentFrequency(freq);
  }, []);

  const handleSystemToggle = useCallback((system) => {
    setSelectedSystems((prev) =>
      prev.includes(system)
        ? prev.filter((s) => s !== system)
        : [...prev, system]
    );
  }, []);

  if (loading) return <div>Loading data...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!data) return null;

  return (
    <div className="brain-connectivity-app">
      <h1 id="page-header">Brain Connectivity & Age Correlations</h1>

      <div className="controls">
        <FrequencySelector
          frequencies={data.frequencies}
          currentFrequency={currentFrequency}
          onChange={handleFrequencyChange}
        />

        <SystemButtons
          systems={Object.values(data.system_names)}
          selectedSystems={selectedSystems}
          onToggle={handleSystemToggle}
        />
      </div>

      <MessageArea message={warningMessage} />

      {selectedSystems.length === 0 ? (
        <p className="select-message">
          Please select at least one brain system to view correlations.
        </p>
      ) : (
        <>
          <h2 className="frequency-title">
            Age-Related Changes in Between-System Connectivity (
            {currentFrequency}Hz)
          </h2>

          <PlotGrid plotData={filteredData} systemNames={data.system_names} />
        </>
      )}
    </div>
  );
}

export default BrainConnectivityApp;
