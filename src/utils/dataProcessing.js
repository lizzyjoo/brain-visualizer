// src/utils/dataProcessing.js
export async function fetchData(dataUrl) {
  const response = await fetch(dataUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }
  return await response.json();
}
