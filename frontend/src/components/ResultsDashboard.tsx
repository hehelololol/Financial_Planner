import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { Card } from './ui/Card';
import { SectionHeader } from './ui/SectionHeader';

interface TickerAllocation {
  ticker: string;
  percentage: number;
  dollarAmount: number;
}

interface ExpectedReturns {
  1: number;
  2: number;
  5: number;
  10: number;
}

interface MonthlyContribution {
  finalValue: number;
  totalContributions: number;
  totalGrowth: number;
  yearlyProjections: Array<{
    year: number;
    value: number;
    contributions: number;
    growth: number;
  }>;
}

interface ResultsDashboardProps {
  allocations: TickerAllocation[];
  expectedReturns: ExpectedReturns;
  monthlyContribution?: MonthlyContribution;
}

// Modern fintech color palette for charts
const CHART_COLORS = [
  '#3B82F6', // Neon Blue
  '#06b6d4', // Cyan
  '#8b5cf6', // Purple
  '#10b981', // Green
  '#f59e0b', // Amber
  '#ef4444', // Red
];

export function ResultsDashboard({ allocations, expectedReturns, monthlyContribution }: ResultsDashboardProps) {
  const initialAmount = allocations.reduce((sum, alloc) => sum + alloc.dollarAmount, 0);

  // Create color mapping for consistent colors across charts
  const tickerColors = new Map<string, string>();
  allocations.forEach((alloc, idx) => {
    tickerColors.set(alloc.ticker, CHART_COLORS[idx % CHART_COLORS.length]);
  });

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-gray-800 p-3 border border-gray-700 rounded-lg shadow-2xl backdrop-blur-xl">
          <p className="font-semibold text-white text-sm">{data.name}</p>
          <p className="text-blue-400 text-sm mt-1">
            {formatCurrency(data.value)} ({(data.payload.percentage * 100).toFixed(1)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  // Calculate projected allocations for each year
  const getProjectedAllocations = (year: 1 | 2 | 5 | 10) => {
    const totalValue = expectedReturns[year];
    return allocations.map(alloc => ({
      ticker: alloc.ticker,
      percentage: alloc.percentage,
      dollarAmount: totalValue * alloc.percentage,
    }));
  };

  return (
    <div className="space-y-8">
      {/* Summary Card with Gradient Glow */}
      <Card glow className="bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-blue-600/20 border-blue-500/30 p-8 animate-fade-in">
        <h2 className="text-2xl font-bold mb-6 text-white">Portfolio Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {[
            { label: 'Initial Investment', value: initialAmount, color: 'text-blue-400' },
            { label: '1 Year Projection', value: expectedReturns[1], color: 'text-green-400' },
            { label: '2 Year Projection', value: expectedReturns[2], color: 'text-green-400' },
            { label: '5 Year Projection', value: expectedReturns[5], color: 'text-yellow-400' },
            { label: '10 Year Projection', value: expectedReturns[10], color: 'text-purple-400' },
          ].map((item, index) => (
            <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <p className="text-sm mb-2 text-gray-400">{item.label}</p>
              <p className={`text-3xl font-bold ${item.color}`}>{formatCurrency(item.value)}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Allocations */}
        <div className="space-y-8">
          {/* Allocations Table */}
          <Card glow className="hover:scale-[1.01] transition-transform duration-300 animate-fade-in">
            <SectionHeader
              title="Portfolio Allocations"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
              className="mb-6"
            />
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-4 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Ticker</th>
                    <th className="text-right py-4 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Percentage</th>
                    <th className="text-right py-4 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {allocations.map((allocation, index) => (
                    <tr
                      key={allocation.ticker}
                      className="hover:bg-gray-800/50 transition-colors duration-200 animate-fade-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <td className="py-4 px-4 text-white font-medium">{allocation.ticker}</td>
                      <td className="py-4 px-4 text-right text-gray-300">
                        {(allocation.percentage * 100).toFixed(1)}%
                      </td>
                      <td className="py-4 px-4 text-right text-blue-400 font-semibold">
                        {formatCurrency(allocation.dollarAmount)}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-blue-500/10 border-t-2 border-blue-500/30 font-semibold">
                    <td className="py-4 px-4 text-white">Total</td>
                    <td className="py-4 px-4 text-right text-white">100.0%</td>
                    <td className="py-4 px-4 text-right text-blue-400">
                      {formatCurrency(initialAmount)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          {/* Year 0 Pie Chart */}
          <Card glow className="hover:scale-[1.01] transition-transform duration-300 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-2xl font-bold text-white mb-6">
              Initial Allocation (Year 0)
            </h2>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={allocations.map(a => ({
                    name: a.ticker,
                    value: a.dollarAmount,
                    percentage: a.percentage,
                  }))}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name}: ${(percentage * 100).toFixed(1)}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  animationDuration={800}
                >
                  {allocations.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={tickerColors.get(entry.ticker) || CHART_COLORS[index % CHART_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Right Column: Projections */}
        <div>
          <Card glow className="hover:scale-[1.01] transition-transform duration-300 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <SectionHeader
              title="Projected Growth"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              }
              className="mb-6"
            />
            <div className="space-y-6">
              {([1, 2, 5, 10] as const).map((year, idx) => {
                const projectedAllocations = getProjectedAllocations(year);
                return (
                  <Card
                    key={year}
                    glow
                    className="bg-gray-800/50 border-gray-700/50 hover:scale-[1.02] transition-transform duration-300"
                    style={{ animationDelay: `${(idx + 1) * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white">
                        {year} Year{year > 1 ? 's' : ''} Projection
                      </h3>
                      <p className="text-sm text-blue-400 font-semibold">
                        {formatCurrency(expectedReturns[year])}
                      </p>
                    </div>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={projectedAllocations.map(a => ({
                            name: a.ticker,
                            value: a.dollarAmount,
                            percentage: a.percentage,
                          }))}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ percentage }) => `${(percentage * 100).toFixed(1)}%`}
                          outerRadius={90}
                          fill="#8884d8"
                          dataKey="value"
                          animationDuration={800}
                        >
                          {projectedAllocations.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={tickerColors.get(entry.ticker) || CHART_COLORS[index % CHART_COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </Card>
                );
              })}
            </div>
          </Card>
        </div>
      </div>

      {/* Monthly Contribution Results */}
      {monthlyContribution && (
        <Card glow className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <SectionHeader
            title="Monthly Contribution Projection"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            className="mb-8"
          />
          
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { label: 'Final Projected Value', value: monthlyContribution.finalValue, color: 'from-blue-500 to-blue-600', borderColor: 'blue' },
              { label: 'Total Contributions', value: monthlyContribution.totalContributions, color: 'from-gray-500 to-gray-600', borderColor: 'gray' },
              { label: 'Total Growth', value: monthlyContribution.totalGrowth, color: 'from-green-500 to-green-600', borderColor: 'green' },
            ].map((stat, index) => (
              <Card
                key={index}
                glow
                className={`bg-gradient-to-br ${stat.color}/20 border-${stat.borderColor}-500/30 hover:scale-105 transition-transform duration-300 animate-slide-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <p className="text-sm text-gray-400 mb-2">{stat.label}</p>
                <p className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {formatCurrency(stat.value)}
                </p>
              </Card>
            ))}
          </div>

          {/* Growth Chart */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6">
              Projected Growth Over Time
            </h3>
            <Card glow className="bg-gray-800/50 border-gray-700/50 p-6">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={monthlyContribution.yearlyProjections}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                  <XAxis 
                    dataKey="year" 
                    stroke="#9ca3af"
                    style={{ fontSize: '12px' }}
                    label={{ value: 'Year', position: 'insideBottom', offset: -5, style: { fill: '#9ca3af' } }}
                  />
                  <YAxis 
                    stroke="#9ca3af"
                    style={{ fontSize: '12px' }}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    label={{ value: 'Value ($)', angle: -90, position: 'insideLeft', style: { fill: '#9ca3af' } }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
                      color: '#fff'
                    }}
                    formatter={(value: number) => formatCurrency(value)}
                  />
                  <Legend wrapperStyle={{ color: '#9ca3af' }} />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    name="Projected Value"
                    dot={{ fill: '#3B82F6', r: 4 }}
                    animationDuration={1000}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="contributions" 
                    stroke="#9ca3af" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Total Contributions"
                    dot={{ fill: '#9ca3af', r: 3 }}
                    animationDuration={1000}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="growth" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    name="Growth"
                    dot={{ fill: '#10b981', r: 3 }}
                    animationDuration={1000}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </Card>
      )}
    </div>
  );
}
