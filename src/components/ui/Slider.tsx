"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Single = number;
type Range = [number, number];
type SliderValue = Single | Range;

type BaseProps = {
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    className?: string;
    // Fires on each move
    onChange?: (value: SliderValue) => void;
    // Fires on release/commit
    onValueCommit?: (value: SliderValue) => void;
};

type ControlledProps =
    | { value: Single; defaultValue?: never }
    | { value: Range; defaultValue?: never }
    | { value?: never; defaultValue?: Single }
    | { value?: never; defaultValue?: Range };

export type SliderProps = BaseProps & ControlledProps;

function clamp(n: number, min: number, max: number) {
    return Math.min(max, Math.max(min, n));
}

function roundTo(n: number, step: number, min: number) {
    const q = Math.round((n - min) / step);
    return min + q * step;
}

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
    (
        {
            min = 0,
            max = 100,
            step = 1,
            disabled,
            className,
            value,
            defaultValue,
            onChange,
            onValueCommit,
        },
        ref
    ) => {
        const isRange = Array.isArray(value ?? defaultValue);
        const [internal, setInternal] = React.useState<SliderValue>(
            value ?? defaultValue ?? (isRange ? [min, max] : min)
        );

        // Keep controlled in sync
        React.useEffect(() => {
            if (value !== undefined) setInternal(value);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [JSON.stringify(value)]);

        const trackRef = React.useRef<HTMLDivElement | null>(null);
        const activeThumb = React.useRef<0 | 1 | null>(null);

        const current = ((): Range => {
            if (Array.isArray(internal)) return internal as Range;
            return [internal as number, internal as number];
        })();

        const pctFromVal = (v: number) => ((v - min) / (max - min)) * 100;

        const commit = (v: SliderValue) => {
            onValueCommit?.(v);
        };

        const setVal = (v: SliderValue, commitNow = false) => {
            if (value === undefined) setInternal(v);
            onChange?.(v);
            if (commitNow) commit(v);
        };

        const updateFromClientX = (clientX: number) => {
            const track = trackRef.current!;
            const rect = track.getBoundingClientRect();
            const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
            let newVal = roundTo(min + ratio * (max - min), step, min);
            newVal = clamp(newVal, min, max);

            if (!isRange) {
                setVal(newVal);
                return;
            }

            const [a, b] = current;
            if (activeThumb.current === 0) {
                const next: Range = [Math.min(newVal, b), b];
                setVal(next);
            } else {
                const next: Range = [a, Math.max(newVal, a)];
                setVal(next);
            }
        };

        const onPointerDownThumb =
            (thumbIndex: 0 | 1) =>
                (e: React.PointerEvent<HTMLButtonElement>) => {
                    if (disabled) return;
                    activeThumb.current = thumbIndex;
                    (e.target as HTMLElement).setPointerCapture(e.pointerId);
                };

        const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
            if (disabled) return;
            if (activeThumb.current === null) return;
            updateFromClientX(e.clientX);
        };

        const onPointerUp = () => {
            if (disabled) return;
            if (activeThumb.current === null) return;
            const v = value ?? internal;
            setVal(v, true);
            activeThumb.current = null;
        };

        const onKeyDown =
            (thumbIndex: 0 | 1) =>
                (e: React.KeyboardEvent<HTMLButtonElement>) => {
                    if (disabled) return;

                    const keys = [
                        "ArrowLeft",
                        "ArrowRight",
                        "ArrowUp",
                        "ArrowDown",
                        "Home",
                        "End",
                        "PageUp",
                        "PageDown",
                    ] as const;
                    if (!keys.includes(e.key as any)) return;

                    e.preventDefault();
                    const delta =
                        e.key === "ArrowRight" || e.key === "ArrowUp"
                            ? step
                            : e.key === "ArrowLeft" || e.key === "ArrowDown"
                                ? -step
                                : e.key === "PageUp"
                                    ? step * 10
                                    : e.key === "PageDown"
                                        ? -step * 10
                                        : 0;

                    if (!isRange) {
                        let next =
                            e.key === "Home"
                                ? min
                                : e.key === "End"
                                    ? max
                                    : clamp(roundTo((internal as number) + delta, step, min), min, max);
                        setVal(next, true);
                        return;
                    }

                    const [a, b] = current;
                    if (thumbIndex === 0) {
                        let next =
                            e.key === "Home"
                                ? min
                                : e.key === "End"
                                    ? b
                                    : clamp(roundTo(a + delta, step, min), min, b);
                        setVal([Math.min(next, b), b], true);
                    } else {
                        let next =
                            e.key === "Home"
                                ? a
                                : e.key === "End"
                                    ? max
                                    : clamp(roundTo(b + delta, step, min), a, max);
                        setVal([a, Math.max(next, a)], true);
                    }
                };

        const [aPct, bPct] = [pctFromVal(current[0]), pctFromVal(current[1])];

        return (
            <div
                ref={ref}
                className={cn("relative w-full select-none", className)}
                aria-disabled={disabled || undefined}
            >
                <div
                    ref={trackRef}
                    className={cn(
                        "relative h-2 w-full rounded-full bg-secondary",
                        disabled && "opacity-60"
                    )}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                >
                    {/* Filled range */}
                    <div
                        className="absolute h-full bg-primary rounded-full"
                        style={{
                            left: `${isRange ? aPct : 0}%`,
                            width: `${isRange ? bPct - aPct : aPct}%`,
                        }}
                    />

                    {/* Thumb(s) */}
                    {isRange ? (
                        <>
                            <Thumb
                                value={current[0]}
                                min={min}
                                max={max}
                                disabled={disabled}
                                style={{ left: `${aPct}%` }}
                                onPointerDown={onPointerDownThumb(0)}
                                onKeyDown={onKeyDown(0)}
                            />
                            <Thumb
                                value={current[1]}
                                min={min}
                                max={max}
                                disabled={disabled}
                                style={{ left: `${bPct}%` }}
                                onPointerDown={onPointerDownThumb(1)}
                                onKeyDown={onKeyDown(1)}
                            />
                        </>
                    ) : (
                        <Thumb
                            value={current[0]}
                            min={min}
                            max={max}
                            disabled={disabled}
                            style={{ left: `${aPct}%` }}
                            onPointerDown={onPointerDownThumb(0)}
                            onKeyDown={onKeyDown(0)}
                        />
                    )}
                </div>
            </div>
        );
    }
);
Slider.displayName = "Slider";

type ThumbProps = {
    value: number;
    min: number;
    max: number;
    disabled?: boolean;
} & React.ComponentPropsWithoutRef<"button">;

function Thumb({ value, min, max, disabled, className, style, ...rest }: ThumbProps) {
    return (
        <button
            type="button"
            role="slider"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            aria-disabled={disabled || undefined}
            tabIndex={disabled ? -1 : 0}
            className={cn(
                "absolute top-1/2 -translate-y-1/2 -translate-x-1/2",
                "h-5 w-5 rounded-full border-2 border-primary bg-background",
                "ring-offset-background transition focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                "disabled:pointer-events-none disabled:opacity-50",
                className
            )}
            style={style}
            {...rest}
        />
    );
}
