import { useProgressData } from "@/hooks/useProgressData";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const ProgressChart = () => {
  const { progressData, isLoading, error } = useProgressData();

  if (isLoading) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <div className="text-muted-foreground">Loading chart data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <div className="text-destructive">Error loading chart data</div>
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={progressData} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis 
            dataKey="name" 
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
          />
          <YAxis 
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
            label={{ 
              value: 'Hours Worked', 
              angle: -90, 
              position: 'insideLeft',
              style: { fill: 'hsl(var(--muted-foreground))' }
            }} 
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--background))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px'
            }}
            formatter={(value: number) => [`${value} hours`, 'Hours Worked']}
          />
          <Line 
            type="monotone" 
            dataKey="hours" 
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={{
              fill: 'hsl(var(--background))',
              stroke: 'hsl(var(--primary))',
              strokeWidth: 2,
            }}
            activeDot={{
              r: 6,
              fill: 'hsl(var(--primary))',
              stroke: 'hsl(var(--background))',
              strokeWidth: 2,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressChart; 