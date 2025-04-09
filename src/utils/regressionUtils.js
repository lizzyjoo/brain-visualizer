// src/utils/regressionUtils.js
export function calculateRegressionLine(x, y, r) {
  const meanX = x.reduce((sum, val) => sum + val, 0) / x.length;
  const meanY = y.reduce((sum, val) => sum + val, 0) / y.length;

  const stdDevX = Math.sqrt(
    x.reduce((sum, val) => sum + Math.pow(val - meanX, 2), 0) / x.length
  );
  const stdDevY = Math.sqrt(
    y.reduce((sum, val) => sum + Math.pow(val - meanY, 2), 0) / y.length
  );

  const slope = r * (stdDevY / stdDevX);
  const intercept = meanY - slope * meanX;

  const minX = Math.min(...x);
  const maxX = Math.max(...x);

  return [slope * minX + intercept, slope * maxX + intercept];
}
