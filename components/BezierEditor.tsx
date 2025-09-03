"use client";

import React from "react";
import { controlPoints as defaultControlPoints } from "./controlPoints";

type Point = { x: number; y: number };
type ControlPoint = { cp1: Point; cp2: Point; pointB: Point; num: number };

interface BezierEditorProps {
    value?: ControlPoint[];
    onChange?: (next: ControlPoint[]) => void;
}

export default function BezierEditor({ value, onChange }: BezierEditorProps): JSX.Element {
    const [data, setData] = React.useState<ControlPoint[]>(value ?? defaultControlPoints);
    const [selected, setSelected] = React.useState<number>(0);

    React.useEffect(() => {
        if (value) setData(value);
    }, [value]);

    function updateFrame(index: number, updater: (f: ControlPoint) => ControlPoint) {
        setData((prev) => {
            const copy = prev.map((f) => ({ ...f, cp1: { ...f.cp1 }, cp2: { ...f.cp2 }, pointB: { ...f.pointB } }));
            copy[index] = updater(copy[index]);
            onChange?.(copy);
            return copy;
        });
    }

    function renumber(frames: ControlPoint[]): ControlPoint[] {
        return frames.map((f, i) => ({ ...f, num: i }));
    }

    function addFrame(afterIndex: number) {
        setData((prev) => {
            const insertAt = Math.min(Math.max(afterIndex + 1, 0), prev.length);
            const base = prev[Math.max(0, afterIndex)];
            const newFrame: ControlPoint = {
                cp1: { ...base.cp1 },
                cp2: { ...base.cp2 },
                pointB: { ...base.pointB },
                num: insertAt,
            };
            const next = renumber([...prev.slice(0, insertAt), newFrame, ...prev.slice(insertAt)]);
            onChange?.(next);
            setSelected(insertAt);
            return next;
        });
    }

    function deleteFrame(index: number) {
        setData((prev) => {
            if (prev.length <= 1) return prev;
            const next = renumber([...prev.slice(0, index), ...prev.slice(index + 1)]);
            const newIndex = Math.min(index, next.length - 1);
            onChange?.(next);
            setSelected(newIndex);
            return next;
        });
    }

    const frame = data[selected];
    const total = data.length;
    const svgRef = React.useRef<SVGSVGElement | null>(null);
    const draggingRef = React.useRef<null | "cp1" | "cp2" | "pointB">(null);

    function toPath(start: Point, cp1: Point, cp2: Point, end: Point): string {
        return `M ${start.x},${start.y} C ${cp1.x},${cp1.y} ${cp2.x},${cp2.y} ${end.x},${end.y}`;
    }

    const start: Point = { x: -50, y: 170 };

    function clientToSvg(evt: React.MouseEvent): { x: number; y: number } | null {
        const svg = svgRef.current;
        if (!svg) return null;
        const pt = (svg as any).createSVGPoint();
        pt.x = evt.clientX;
        pt.y = evt.clientY;
        const ctm = svg.getScreenCTM();
        if (!ctm) return null;
        const ip = pt.matrixTransform(ctm.inverse());
        return { x: ip.x, y: ip.y };
    }

    function onDragStart(which: "cp1" | "cp2" | "pointB") {
        draggingRef.current = which;
    }

    function onDragMove(evt: React.MouseEvent) {
        if (!draggingRef.current || !frame) return;
        const p = clientToSvg(evt);
        if (!p) return;
        const which = draggingRef.current;
        updateFrame(selected, (f) => {
            const next = { ...f, cp1: { ...f.cp1 }, cp2: { ...f.cp2 }, pointB: { ...f.pointB } };
            if (which === "cp1") { next.cp1.x = p.x; next.cp1.y = p.y; }
            if (which === "cp2") { next.cp2.x = p.x; next.cp2.y = p.y; }
            if (which === "pointB") { next.pointB.x = p.x; next.pointB.y = p.y; }
            return next;
        });
    }

    function onDragEnd() {
        draggingRef.current = null;
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ background: "#0b1020", borderRadius: 8, border: "1px solid #1f2a44", padding: 8 }}>
                <svg
                    ref={svgRef}
                    viewBox={`-60 -20 420 220`}
                    width={588}
                    height={308}
                    onMouseMove={onDragMove}
                    onMouseUp={onDragEnd}
                    onMouseLeave={onDragEnd}
                    style={{ display: "block" }}
                >
                    <g opacity={0.25}>
                        {Array.from({ length: 20 }).map((_, i) => (
                            <line key={`v-${i}`} x1={i * 20} y1={-20} x2={i * 20} y2={220} stroke="#2a3354" strokeWidth={1} />
                        ))}
                        {Array.from({ length: 14 }).map((_, i) => (
                            <line key={`h-${i}`} x1={-60} y1={i * 20} x2={420} y2={i * 20} stroke="#2a3354" strokeWidth={1} />
                        ))}
                    </g>
                    {frame && (
                        <>
                            <line x1={start.x} y1={start.y} x2={frame.cp1.x} y2={frame.cp1.y} stroke="#7aa2f7" strokeDasharray="4 4" />
                            <line x1={frame.pointB.x} y1={frame.pointB.y} x2={frame.cp2.x} y2={frame.cp2.y} stroke="#7aa2f7" strokeDasharray="4 4" />
                            <path d={toPath(start, frame.cp1, frame.cp2, frame.pointB)} stroke="#67e8f9" strokeWidth={3} fill="none" />
                            <circle cx={start.x} cy={start.y} r={4} fill="#22c55e" />
                            <circle cx={frame.cp1.x} cy={frame.cp1.y} r={6} fill="#f59e0b" style={{ cursor: "grab" }} onMouseDown={() => onDragStart("cp1")} />
                            <circle cx={frame.cp2.x} cy={frame.cp2.y} r={6} fill="#f59e0b" style={{ cursor: "grab" }} onMouseDown={() => onDragStart("cp2")} />
                            <circle cx={frame.pointB.x} cy={frame.pointB.y} r={6} fill="#ef4444" style={{ cursor: "grab" }} onMouseDown={() => onDragStart("pointB")} />
                        </>
                    )}
                </svg>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span>Frame</span>
                    <input
                        type="range"
                        min={0}
                        max={Math.max(0, total - 1)}
                        step={1}
                        value={selected}
                        onChange={(e) => setSelected(Number(e.target.value))}
                    />
                    <span>{selected} / {Math.max(0, total - 1)}</span>
                </label>
                <button
                    onClick={() => setSelected((i) => Math.max(0, i - 1))}
                    style={{ padding: "6px 12px", border: "1px solid #ccc", borderRadius: 6 }}
                >
                    Prev
                </button>
                <button
                    onClick={() => setSelected((i) => Math.min(total - 1, i + 1))}
                    style={{ padding: "6px 12px", border: "1px solid #ccc", borderRadius: 6 }}
                >
                    Next
                </button>
                <button
                    onClick={() => addFrame(selected)}
                    style={{ padding: "6px 12px", border: "1px solid #ccc", borderRadius: 6 }}
                >
                    Add Frame After
                </button>
                <button
                    onClick={() => deleteFrame(selected)}
                    disabled={total <= 1}
                    style={{ padding: "6px 12px", border: "1px solid #ccc", borderRadius: 6, opacity: total <= 1 ? 0.6 : 1 }}
                >
                    Delete Frame
                </button>
                <button
                    onClick={() => {
                        const json = JSON.stringify(data, null, 2);
                        navigator.clipboard?.writeText(json).catch(() => {});
                    }}
                    style={{ padding: "6px 12px", border: "1px solid #ccc", borderRadius: 6 }}
                >
                    Copy JSON
                </button>
            </div>

            {frame ? (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 }}>
                    <fieldset style={{ border: "1px solid #1f2a44", borderRadius: 8, padding: 12 }}>
                        <legend style={{ padding: "0 6px" }}>cp1</legend>
                        <NumberField label="x" value={frame.cp1.x} onChange={(v) => updateFrame(selected, (f) => ({ ...f, cp1: { ...f.cp1, x: v } }))} />
                        <NumberField label="y" value={frame.cp1.y} onChange={(v) => updateFrame(selected, (f) => ({ ...f, cp1: { ...f.cp1, y: v } }))} />
                    </fieldset>
                    <fieldset style={{ border: "1px solid #1f2a44", borderRadius: 8, padding: 12 }}>
                        <legend style={{ padding: "0 6px" }}>cp2</legend>
                        <NumberField label="x" value={frame.cp2.x} onChange={(v) => updateFrame(selected, (f) => ({ ...f, cp2: { ...f.cp2, x: v } }))} />
                        <NumberField label="y" value={frame.cp2.y} onChange={(v) => updateFrame(selected, (f) => ({ ...f, cp2: { ...f.cp2, y: v } }))} />
                    </fieldset>
                    <fieldset style={{ border: "1px solid #1f2a44", borderRadius: 8, padding: 12 }}>
                        <legend style={{ padding: "0 6px" }}>pointB</legend>
                        <NumberField label="x" value={frame.pointB.x} onChange={(v) => updateFrame(selected, (f) => ({ ...f, pointB: { ...f.pointB, x: v } }))} />
                        <NumberField label="y" value={frame.pointB.y} onChange={(v) => updateFrame(selected, (f) => ({ ...f, pointB: { ...f.pointB, y: v } }))} />
                    </fieldset>
                </div>
            ) : null}

            <div>
                <label style={{ display: "block", marginBottom: 6, color: "#94a3b8" }}>JSON</label>
                <textarea
                    readOnly
                    value={JSON.stringify(data, null, 2)}
                    style={{ width: "100%", height: 240, background: "#0b1020", color: "#e2e8f0", border: "1px solid #1f2a44", borderRadius: 8, padding: 12, fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace", fontSize: 12 }}
                />
            </div>
        </div>
    );
}

function NumberField({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
    return (
        <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span style={{ width: 16 }}>{label}</span>
            <input
                type="number"
                value={Number.isFinite(value) ? value : 0}
                onChange={(e) => onChange(Number(e.target.value))}
                style={{ width: "100%", padding: "6px 8px", border: "1px solid #334155", borderRadius: 6, background: "#0f172a", color: "#e2e8f0" }}
            />
        </label>
    );
}


