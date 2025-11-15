import { useState, FormEvent } from 'react';
import { Card } from './ui/Card';
import { InputField } from './ui/InputField';
import { GlowButton } from './ui/GlowButton';
import { SectionHeader } from './ui/SectionHeader';

interface InvestmentFormProps {
  onSubmit: (data: { 
    amount: number; 
    riskScore: number;
    monthlyContribution?: number;
    expectedReturn?: number;
    timeHorizon?: number;
  }) => void;
  loading?: boolean;
}

export function InvestmentForm({ onSubmit, loading = false }: InvestmentFormProps) {
  const [amount, setAmount] = useState<number>(10000);
  const [riskScore, setRiskScore] = useState<number>(5);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(0);
  const [expectedReturn, setExpectedReturn] = useState<number>(7);
  const [timeHorizon, setTimeHorizon] = useState<number>(10);

  const getRiskLabel = (score: number): string => {
    if (score <= 3) return 'Ultra Conservative';
    if (score <= 7) return 'Moderate';
    return 'Aggressive';
  };

  const getRiskColor = (score: number): string => {
    if (score <= 3) return 'from-green-500 to-green-600';
    if (score <= 7) return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ 
      amount, 
      riskScore,
      monthlyContribution: monthlyContribution > 0 ? monthlyContribution : undefined,
      expectedReturn: monthlyContribution > 0 ? expectedReturn : undefined,
      timeHorizon: monthlyContribution > 0 ? timeHorizon : undefined,
    });
  };

  return (
    <Card glow className="hover:scale-[1.01] transition-transform duration-300 animate-fade-in">
      <SectionHeader
        title="Investment Details"
        subtitle="Enter your investment amount and select your risk tolerance level"
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        className="mb-8"
      />
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          id="amount"
          type="number"
          label="Investment Amount ($)"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value) || 0)}
          placeholder="Enter amount"
          step="1"
          min="0"
          disabled={loading}
        />

        <div>
          <div className="flex items-center justify-between mb-4">
            <label 
              htmlFor="riskScore" 
              className="block text-sm font-medium text-gray-300"
            >
              Risk Tolerance
            </label>
            <div className="text-right">
              <div className={`text-2xl font-bold bg-gradient-to-r ${getRiskColor(riskScore)} bg-clip-text text-transparent`}>
                {riskScore}
              </div>
              <div className="text-xs text-gray-400">{getRiskLabel(riskScore)}</div>
            </div>
          </div>
          <input
            id="riskScore"
            type="range"
            min="1"
            max="10"
            step="1"
            value={riskScore}
            onChange={(e) => setRiskScore(Number(e.target.value))}
            className="w-full appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${((riskScore - 1) / 9) * 100}%, #374151 ${((riskScore - 1) / 9) * 100}%, #374151 100%)`
            }}
          />
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>1 - Ultra Conservative</span>
            <span>10 - Aggressive</span>
          </div>
        </div>

        <GlowButton
          type="submit"
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Plan...
            </span>
          ) : (
            'Generate Plan'
          )}
        </GlowButton>
      </form>

      {/* Monthly Contribution Card */}
      <Card glow className="mt-8 bg-gray-800/50 border-gray-700/50">
        <SectionHeader
          title="Monthly Contribution"
          subtitle="Calculate future value with regular monthly contributions"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          className="mb-6"
        />
        
        <form className="space-y-6">
          <InputField
            id="monthlyContribution"
            type="number"
            label="Monthly Contribution Amount ($)"
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(Number(e.target.value) || 0)}
            placeholder="Enter monthly amount"
            step="1"
            min="0"
          />

          <InputField
            id="expectedReturn"
            type="number"
            label="Expected Annual Return (%)"
            value={expectedReturn}
            onChange={(e) => setExpectedReturn(Number(e.target.value) || 0)}
            placeholder="Enter expected return"
            step="0.1"
            min="0"
            max="100"
          />

          <InputField
            id="timeHorizon"
            type="number"
            label="Investment Time Horizon (Years)"
            value={timeHorizon}
            onChange={(e) => setTimeHorizon(Number(e.target.value) || 0)}
            placeholder="Enter years"
            step="1"
            min="1"
            max="50"
          />
        </form>
      </Card>
    </Card>
  );
}
