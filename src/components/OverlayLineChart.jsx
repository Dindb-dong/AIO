import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const ChartWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Slider = styled.input`
  appearance: none;
  -webkit-appearance: none;
  background: transparent;
  position: absolute;
  z-index: 2;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #3498db;
    cursor: pointer;
  }
  &::-webkit-slider-runnable-track {
    height: 4px;
    background: rgba(0,0,0,0.2);
    border-radius: 2px;
  }
`;

const VerticalSlider = styled(Slider)`
  width: 140px;
  height: 16px;
  transform: rotate(270deg);
  direction: rtl; /* so moving downwards reduces the value toward 0 */
`;

const HorizontalSlider = styled(Slider)`
  width: calc(100% - 120px);
  left: 60px;
`;

// OverlayLineChart props:
// data: array of points
// series: [{ key, label, color }]
// xKey: string
// valueFormatter?: (number) => string
// percentageMode?: boolean  // if true, display % on ticks/tooltip
export default function OverlayLineChart({ data, series, xKey = 'date', valueFormatter, percentageMode = false }) {
  // X axis controls
  const [xZoom, setXZoom] = useState(0); // 0..100 (0 = full, higher = more zoom-in)
  const [xPan, setXPan] = useState(0); // 0..100 position of window
  // Y axis controls
  const [yZoom, setYZoom] = useState(0); // 0..100 (0 = full range, higher = more zoom-in)
  const [yPan, setYPan] = useState(0); // -100..100 (up/down)

  // Visible X-range selection based on xZoom/xPan
  const slicedData = useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) return data ?? [];
    const total = data.length;
    const minWindow = Math.max(10, Math.floor(total * 0.1));
    const windowSize = Math.max(minWindow, Math.floor(total * (1 - xZoom / 100)));
    const panMax = Math.max(0, total - windowSize);
    const start = Math.min(panMax, Math.floor((xPan / 100) * panMax));
    return data.slice(start, start + windowSize);
  }, [data, xZoom, xPan]);

  // Compute Y domain around mid for current visible slice; yZoom reduces range; yPan moves center
  const domain = useMemo(() => {
    if (!slicedData || slicedData.length === 0 || !series || series.length === 0) return ['auto', 'auto'];
    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;
    for (const s of series) {
      for (const d of slicedData) {
        const v = d[s.key];
        if (typeof v === 'number' && Number.isFinite(v)) {
          if (v < min) min = v;
          if (v > max) max = v;
        }
      }
    }
    if (!Number.isFinite(min) || !Number.isFinite(max)) return ['auto', 'auto'];
    const baseMid = (min + max) / 2;
    const baseHalf = Math.max(1e-9, (max - min) / 2);
    // yZoom: 0 -> base range, 100 -> up to 5x wider (zoom-out)
    const zoomOutFactor = 1 + (yZoom / 100) * 4; // 1..5
    const half = baseHalf * zoomOutFactor;
    const panOffset = (yPan / 100) * baseHalf; // move by up to full half-range
    const mid = baseMid + panOffset;
    return [mid - half, mid + half];
  }, [slicedData, series, yZoom, yPan]);

  const formatValue = (v) => {
    if (typeof v !== 'number') return v;
    if (valueFormatter) return valueFormatter(v);
    if (percentageMode) return `${v.toFixed(0)}%`;
    return v.toFixed(2);
  };

  return (
    <ChartWrapper>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={slicedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis domain={domain} tickFormatter={formatValue} />
          <Tooltip 
            formatter={(value, name) => [formatValue(Number(value)), name]}
            labelFormatter={(label) => new Date(label).toLocaleDateString()}
          />
          {series.map((s, idx) => (
            <Line
              key={s.key}
              type="monotone"
              dataKey={s.key}
              stroke={s.color}
              strokeWidth={idx === 0 ? 3 : 2}
              name={s.label}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
      {/* X-axis Zoom (top), Zoom */}
      <HorizontalSlider
        type="range"
        min={0}
        max={100}
        step={1}
        value={xZoom}
        onChange={(e) => setXZoom(Number(e.target.value))}
        style={{ bottom: -10 }}
        aria-label="X Zoom"
      />
      {/* X-axis Pan (bottom), Move */}
      <HorizontalSlider
        type="range"
        min={0}
        max={100}
        step={1}
        value={xPan}
        onChange={(e) => setXPan(Number(e.target.value))}
        style={{ bottom: 40 }}
        aria-label="X Pan"
      />
      {/* Y-axis Zoom (left of ticks), Zoom */}
      <VerticalSlider
        type="range"
        min={0}
        max={100}
        step={1}
        value={yZoom}
        onChange={(e) => setYZoom(Number(e.target.value))}
        style={{ left: -40, top: '20%', }}
        aria-label="Y Zoom"
      />
      {/* Y-axis Pan (right of ticks), Move */}
      <VerticalSlider
        type="range"
        min={-100}
        max={100}
        step={1}
        value={yPan}
        onChange={(e) => setYPan(Number(e.target.value))}
        style={{ left: 40, top: '20%', }}
        aria-label="Y Pan"
      />
    </ChartWrapper>
  );
}


