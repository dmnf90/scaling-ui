import React, { createContext, useContext, useId, useMemo } from 'react';
import { ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { cn } from '../../lib/utils';

// Re-export recharts components for convenience
export {
    LineChart,
    Line,
    BarChart,
    Bar,
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend as RechartsLegend,
    Tooltip as RechartsTooltip,
} from 'recharts';

// Chart context for sharing config
const ChartContext = createContext(null);

function useChartContext() {
    const context = useContext(ChartContext);
    if (!context) {
        throw new Error('useChartContext must be used within a ChartContainer');
    }
    return context;
}

/**
 * ChartContainer - Wrapper component for charts with responsive sizing and theming
 * @param {Object} config - Chart configuration object mapping data keys to labels and colors
 * @param {string} className - Additional CSS classes
 * @param {React.ReactNode} children - Chart components (LineChart, BarChart, etc.)
 */
export function ChartContainer({
    config = {},
    className,
    children,
    ...props
}) {
    const chartId = useId();

    const configWithColors = useMemo(() => {
        const coloredConfig = { ...config };
        let colorIndex = 1;

        Object.keys(coloredConfig).forEach((key) => {
            if (!coloredConfig[key].color) {
                coloredConfig[key].color = `hsl(var(--chart-${colorIndex}))`;
                colorIndex = (colorIndex % 5) + 1;
            }
        });

        return coloredConfig;
    }, [config]);

    return (
        <ChartContext.Provider value={{ config: configWithColors, chartId }}>
            <div
                className={cn(
                    'flex aspect-video justify-center text-xs',
                    '[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground',
                    '[&_.recharts-cartesian-grid_line[stroke="#ccc"]]:stroke-border/50',
                    '[&_.recharts-curve.recharts-tooltip-cursor]:stroke-border',
                    '[&_.recharts-polar-grid_[stroke="#ccc"]]:stroke-border',
                    '[&_.recharts-radial-bar-background-sector]:fill-muted',
                    '[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted',
                    '[&_.recharts-reference-line_[stroke="#ccc"]]:stroke-border',
                    '[&_.recharts-sector[stroke="#fff"]]:stroke-transparent',
                    '[&_.recharts-sector]:outline-none',
                    '[&_.recharts-surface]:outline-none',
                    className
                )}
                {...props}
            >
                <ResponsiveContainer>
                    {children}
                </ResponsiveContainer>
            </div>
        </ChartContext.Provider>
    );
}

/**
 * ChartTooltip - Themed tooltip wrapper
 */
export function ChartTooltip({
    cursor = true,
    content,
    ...props
}) {
    return (
        <Tooltip
            cursor={cursor ? { fill: 'hsl(var(--muted))' } : false}
            content={content}
            {...props}
        />
    );
}

/**
 * ChartTooltipContent - Custom tooltip content with theming
 */
export function ChartTooltipContent({
    active,
    payload,
    label,
    labelKey,
    nameKey,
    indicator = 'dot',
    hideLabel = false,
    hideIndicator = false,
    className,
    labelClassName,
    formatter,
    labelFormatter,
}) {
    const { config } = useChartContext();

    if (!active || !payload?.length) {
        return null;
    }

    const tooltipLabel = labelFormatter
        ? labelFormatter(label, payload)
        : label;

    return (
        <div
            className={cn(
                'grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl',
                className
            )}
        >
            {!hideLabel && tooltipLabel && (
                <div className={cn('font-medium', labelClassName)}>
                    {tooltipLabel}
                </div>
            )}
            <div className="grid gap-1.5">
                {payload.map((item, index) => {
                    const key = nameKey
                        ? item.payload[nameKey]
                        : item.name || item.dataKey;
                    const itemConfig = config[key] || {};
                    const indicatorColor = item.color || itemConfig.color || item.fill;

                    return (
                        <div
                            key={item.dataKey || index}
                            className={cn(
                                'flex w-full flex-wrap items-stretch gap-2',
                                '[&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground',
                                indicator === 'dot' && 'items-center'
                            )}
                        >
                            {!hideIndicator && (
                                <>
                                    {indicator === 'dot' && (
                                        <div
                                            className="h-2.5 w-2.5 shrink-0 rounded-full"
                                            style={{ backgroundColor: indicatorColor }}
                                        />
                                    )}
                                    {indicator === 'line' && (
                                        <div
                                            className="w-1 shrink-0 rounded-full"
                                            style={{ backgroundColor: indicatorColor }}
                                        />
                                    )}
                                    {indicator === 'dashed' && (
                                        <div
                                            className="w-0 shrink-0 border-l-[3px] border-dashed"
                                            style={{ borderColor: indicatorColor }}
                                        />
                                    )}
                                </>
                            )}
                            <div className="flex flex-1 justify-between leading-none">
                                <span className="text-muted-foreground">
                                    {itemConfig.label || key}
                                </span>
                                <span className="font-mono font-medium tabular-nums text-foreground">
                                    {formatter
                                        ? formatter(item.value, item.name, item, index, payload)
                                        : item.value?.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

/**
 * ChartLegend - Themed legend wrapper
 */
export function ChartLegend({
    content,
    verticalAlign = 'bottom',
    ...props
}) {
    return (
        <Legend
            verticalAlign={verticalAlign}
            content={content || <ChartLegendContent />}
            {...props}
        />
    );
}

/**
 * ChartLegendContent - Custom legend content with theming
 */
export function ChartLegendContent({
    payload,
    nameKey,
    hideIcon = false,
    className,
}) {
    const { config } = useChartContext();

    if (!payload?.length) {
        return null;
    }

    return (
        <div
            className={cn(
                'flex items-center justify-center gap-4 pt-3',
                className
            )}
        >
            {payload.map((item, index) => {
                const key = nameKey
                    ? item.payload?.[nameKey]
                    : item.dataKey || item.value;
                const itemConfig = config[key] || {};
                const indicatorColor = item.color || itemConfig.color;

                return (
                    <div
                        key={key || index}
                        className="flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
                    >
                        {!hideIcon && (
                            <div
                                className="h-2 w-2 shrink-0 rounded-full"
                                style={{ backgroundColor: indicatorColor }}
                            />
                        )}
                        <span className="text-muted-foreground">
                            {itemConfig.label || key}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}

// Chart style helper - generates consistent fill/stroke colors
export function getChartColor(index) {
    return `hsl(var(--chart-${((index - 1) % 5) + 1}))`;
}

// Pie chart colors array helper
export const CHART_COLORS = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))',
];
