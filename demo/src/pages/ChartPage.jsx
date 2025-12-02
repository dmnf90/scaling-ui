import React from 'react';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
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
    CHART_COLORS
} from '../../../src/index.js';
import { Section, Demo, Example, CodeBlock } from '../components';

// Sample data for charts
const monthlyData = [
    { month: 'Jan', sales: 4000, revenue: 2400 },
    { month: 'Feb', sales: 3000, revenue: 1398 },
    { month: 'Mar', sales: 2000, revenue: 9800 },
    { month: 'Apr', sales: 2780, revenue: 3908 },
    { month: 'May', sales: 1890, revenue: 4800 },
    { month: 'Jun', sales: 2390, revenue: 3800 },
];

const pieData = [
    { name: 'Chrome', value: 400 },
    { name: 'Firefox', value: 300 },
    { name: 'Safari', value: 200 },
    { name: 'Edge', value: 100 },
];

const chartConfig = {
    sales: { label: 'Sales', color: 'hsl(var(--chart-1))' },
    revenue: { label: 'Revenue', color: 'hsl(var(--chart-2))' },
};

export default function ChartPage() {
    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Chart</h1>
                <p className="text-lg text-muted-foreground">
                    Beautiful, responsive charts built on top of Recharts with automatic theme support.
                </p>
            </div>

            <Section title="Installation">
                <p className="text-muted-foreground mb-4">
                    Charts require the <code className="bg-muted px-1.5 py-0.5 rounded">recharts</code> library as a peer dependency.
                </p>
                <CodeBlock code={`npm install recharts

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    LineChart, Line,
    BarChart, Bar,
    AreaChart, Area,
    PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid,
    CHART_COLORS
} from 'scaling-ui';`} />
            </Section>

            <Section title="Line Chart">
                <p className="text-muted-foreground mb-4">
                    A simple line chart for visualizing trends over time.
                </p>
                <Example
                    className="h-[350px]"
                    preview={
                        <ChartContainer config={chartConfig} className="h-full w-full">
                            <LineChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                />
                                <YAxis
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <ChartLegend />
                                <Line
                                    type="monotone"
                                    dataKey="sales"
                                    stroke="hsl(var(--chart-1))"
                                    strokeWidth={2}
                                    dot={false}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="hsl(var(--chart-2))"
                                    strokeWidth={2}
                                    dot={false}
                                />
                            </LineChart>
                        </ChartContainer>
                    }
                    code={`const data = [
    { month: 'Jan', sales: 4000, revenue: 2400 },
    { month: 'Feb', sales: 3000, revenue: 1398 },
    { month: 'Mar', sales: 2000, revenue: 9800 },
    // ...
];

const chartConfig = {
    sales: { label: 'Sales', color: 'hsl(var(--chart-1))' },
    revenue: { label: 'Revenue', color: 'hsl(var(--chart-2))' },
};

<ChartContainer config={chartConfig} className="h-[300px]">
    <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend />
        <Line
            type="monotone"
            dataKey="sales"
            stroke="hsl(var(--chart-1))"
            strokeWidth={2}
            dot={false}
        />
        <Line
            type="monotone"
            dataKey="revenue"
            stroke="hsl(var(--chart-2))"
            strokeWidth={2}
            dot={false}
        />
    </LineChart>
</ChartContainer>`}
                />
            </Section>

            <Section title="Bar Chart">
                <p className="text-muted-foreground mb-4">
                    A bar chart for comparing values across categories.
                </p>
                <Example
                    className="h-[350px]"
                    preview={
                        <ChartContainer config={chartConfig} className="h-full w-full">
                            <BarChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                />
                                <YAxis
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <ChartLegend />
                                <Bar
                                    dataKey="sales"
                                    fill="hsl(var(--chart-1))"
                                    radius={[4, 4, 0, 0]}
                                />
                                <Bar
                                    dataKey="revenue"
                                    fill="hsl(var(--chart-2))"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ChartContainer>
                    }
                    code={`<ChartContainer config={chartConfig} className="h-[300px]">
    <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend />
        <Bar
            dataKey="sales"
            fill="hsl(var(--chart-1))"
            radius={[4, 4, 0, 0]}
        />
        <Bar
            dataKey="revenue"
            fill="hsl(var(--chart-2))"
            radius={[4, 4, 0, 0]}
        />
    </BarChart>
</ChartContainer>`}
                />
            </Section>

            <Section title="Area Chart">
                <p className="text-muted-foreground mb-4">
                    An area chart for showing cumulative data over time.
                </p>
                <Example
                    className="h-[350px]"
                    preview={
                        <ChartContainer config={chartConfig} className="h-full w-full">
                            <AreaChart data={monthlyData}>
                                <defs>
                                    <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.1} />
                                    </linearGradient>
                                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0.1} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                />
                                <YAxis
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <ChartLegend />
                                <Area
                                    type="monotone"
                                    dataKey="sales"
                                    stroke="hsl(var(--chart-1))"
                                    fill="url(#salesGradient)"
                                    strokeWidth={2}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="hsl(var(--chart-2))"
                                    fill="url(#revenueGradient)"
                                    strokeWidth={2}
                                />
                            </AreaChart>
                        </ChartContainer>
                    }
                    code={`<ChartContainer config={chartConfig} className="h-[300px]">
    <AreaChart data={data}>
        <defs>
            <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.1} />
            </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend />
        <Area
            type="monotone"
            dataKey="sales"
            stroke="hsl(var(--chart-1))"
            fill="url(#salesGradient)"
            strokeWidth={2}
        />
    </AreaChart>
</ChartContainer>`}
                />
            </Section>

            <Section title="Pie Chart">
                <p className="text-muted-foreground mb-4">
                    A pie chart for showing proportional data.
                </p>
                <Example
                    className="h-[350px]"
                    preview={
                        <ChartContainer config={{}} className="h-full w-full">
                            <PieChart>
                                <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                                <Pie
                                    data={pieData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={120}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    labelLine={false}
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ChartContainer>
                    }
                    code={`import { CHART_COLORS } from 'scaling-ui';

const pieData = [
    { name: 'Chrome', value: 400 },
    { name: 'Firefox', value: 300 },
    { name: 'Safari', value: 200 },
    { name: 'Edge', value: 100 },
];

<ChartContainer config={{}} className="h-[300px]">
    <PieChart>
        <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
        <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            label={({ name, percent }) => \`\${name} \${(percent * 100).toFixed(0)}%\`}
        >
            {pieData.map((entry, index) => (
                <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
            ))}
        </Pie>
    </PieChart>
</ChartContainer>`}
                />
            </Section>

            <Section title="Donut Chart">
                <p className="text-muted-foreground mb-4">
                    A donut chart variation with an inner radius.
                </p>
                <Example
                    className="h-[350px]"
                    preview={
                        <ChartContainer config={{}} className="h-full w-full">
                            <PieChart>
                                <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                                <Pie
                                    data={pieData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={120}
                                    paddingAngle={2}
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ChartContainer>
                    }
                    code={`<PieChart>
    <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
    <Pie
        data={pieData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={120}
        paddingAngle={2}
    >
        {pieData.map((entry, index) => (
            <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
        ))}
    </Pie>
</PieChart>`}
                />
            </Section>

            <Section title="Custom Tooltip">
                <p className="text-muted-foreground mb-4">
                    Customize the tooltip with different indicator styles and formatting.
                </p>
                <Example
                    className="h-[350px]"
                    preview={
                        <ChartContainer config={chartConfig} className="h-full w-full">
                            <BarChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                />
                                <YAxis
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                />
                                <ChartTooltip
                                    content={
                                        <ChartTooltipContent
                                            indicator="line"
                                            formatter={(value) => `$${value.toLocaleString()}`}
                                        />
                                    }
                                />
                                <Bar
                                    dataKey="sales"
                                    fill="hsl(var(--chart-1))"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ChartContainer>
                    }
                    code={`<ChartTooltip
    content={
        <ChartTooltipContent
            indicator="line"  // 'dot' | 'line' | 'dashed'
            formatter={(value) => \`$\${value.toLocaleString()}\`}
        />
    }
/>`}
                />
            </Section>

            <Section title="Components">
                <div className="border border-border rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-muted">
                            <tr>
                                <th className="text-left p-4 font-semibold">Component</th>
                                <th className="text-left p-4 font-semibold">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">ChartContainer</td>
                                <td className="p-4 text-sm">Wrapper with responsive sizing and theme context</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">ChartTooltip</td>
                                <td className="p-4 text-sm">Themed tooltip wrapper</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">ChartTooltipContent</td>
                                <td className="p-4 text-sm">Custom tooltip content with indicator styles</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">ChartLegend</td>
                                <td className="p-4 text-sm">Themed legend wrapper</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">ChartLegendContent</td>
                                <td className="p-4 text-sm">Custom legend content</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">CHART_COLORS</td>
                                <td className="p-4 text-sm">Array of 5 theme-aware chart colors</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">getChartColor(index)</td>
                                <td className="p-4 text-sm">Helper function to get chart color by index</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="ChartTooltipContent Props">
                <div className="border border-border rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-muted">
                            <tr>
                                <th className="text-left p-4 font-semibold">Prop</th>
                                <th className="text-left p-4 font-semibold">Type</th>
                                <th className="text-left p-4 font-semibold">Default</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">indicator</td>
                                <td className="p-4 text-sm">'dot' | 'line' | 'dashed'</td>
                                <td className="p-4 text-sm">'dot'</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">hideLabel</td>
                                <td className="p-4 text-sm">boolean</td>
                                <td className="p-4 text-sm">false</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">hideIndicator</td>
                                <td className="p-4 text-sm">boolean</td>
                                <td className="p-4 text-sm">false</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">formatter</td>
                                <td className="p-4 text-sm">(value, name, item, index, payload) =&gt; string</td>
                                <td className="p-4 text-sm">-</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">labelFormatter</td>
                                <td className="p-4 text-sm">(label, payload) =&gt; string</td>
                                <td className="p-4 text-sm">-</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">nameKey</td>
                                <td className="p-4 text-sm">string</td>
                                <td className="p-4 text-sm">-</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="Theme Colors">
                <p className="text-muted-foreground mb-4">
                    Charts use CSS variables that automatically adapt to light/dark themes.
                </p>
                <div className="flex flex-wrap gap-4 mb-4">
                    {[1, 2, 3, 4, 5].map((num) => (
                        <div key={num} className="flex items-center gap-2">
                            <div
                                className="w-6 h-6 rounded"
                                style={{ backgroundColor: `hsl(var(--chart-${num}))` }}
                            />
                            <span className="text-sm font-mono">--chart-{num}</span>
                        </div>
                    ))}
                </div>
                <CodeBlock code={`/* CSS Variables (automatically applied) */
:root {
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
}

.dark {
    --chart-1: 220 70% 60%;
    --chart-2: 160 60% 55%;
    --chart-3: 30 80% 65%;
    --chart-4: 280 65% 70%;
    --chart-5: 340 75% 65%;
}`} />
            </Section>
        </div>
    );
}
