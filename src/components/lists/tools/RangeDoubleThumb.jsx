import { Range } from "react-range";

const STEP = 10;

export default function RangeDoubleThumb({ min, max, values, onChange }) {
  return (
    <div style={{ padding: "0 1rem", width: "100%" }}>
      <Range
        step={STEP}
        min={min}
        max={max}
        values={values}
        onChange={onChange}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "6px",
              width: "100%",
              backgroundColor: "#ccc",
              borderRadius: "3px",
              position: "relative",
            }}
          >
            {/* Highlight selected range */}
            <div
              style={{
                position: "absolute",
                height: "6px",
                backgroundColor: "#0c66ee",
                borderRadius: "3px",
                left: `${((values[0] - min) / (max - min)) * 100}%`,
                width: `${((values[1] - values[0]) / (max - min)) * 100}%`,
                top: 0,
              }}
            />
            {children}
          </div>
        )}
        renderThumb={({ props, index }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "24px",
              width: "24px",
              borderRadius: "50%",
              backgroundColor: "#FFF",
              border: "2px solid #0c66ee",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 2px 6px #aaa",
              cursor: "pointer",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-28px",
                color: "#0c66ee",
                fontWeight: "bold",
                fontSize: "14px",
                fontFamily: "Arial, Helvetica, sans-serif",
                padding: "2px 6px",
                borderRadius: "4px",
                backgroundColor: "white",
                boxShadow: "0px 1px 2px rgba(0,0,0,0.15)",
                userSelect: "none",
                whiteSpace: "nowrap",
              }}
            >
              ${values[index]}
            </div>
          </div>
        )}
      />
    </div>
  );
}