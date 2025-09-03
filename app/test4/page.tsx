"use client";

import React from "react";
import BezierVisualizer from "@/components/BezierVisualizer";
import BezierEditor from "@/components/BezierEditor";

export default function Test4Page(): JSX.Element {
    const [data, setData] = React.useState(undefined as any);
    return (
        <div style={{ padding: 16, display: "grid", gap: 24 }}>
            <div>
                <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 12 }}>Bezier Curve Visualizer</h1>
                <p style={{ color: "#64748b", marginBottom: 16 }}>
                    Animating through controlPoints with cubic Bezier segments.
                </p>
                <BezierVisualizer data={data} />
            </div>
            <div>
                <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>Bezier Frame Editor</h2>
                <BezierEditor value={data} onChange={setData} />
            </div>
        </div>
    );
}


