import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { InvestmentForm } from '../components/InvestmentForm';
import { ResultsDashboard } from '../components/ResultsDashboard';
import { usePortfolio } from '../hooks/usePortfolio';
import toast from 'react-hot-toast';

interface PlanResult {
  allocations: Array<{
    ticker: string;
    percentage: number;
    dollarAmount: number;
  }>;
  expectedReturns: {
    1: number;
    2: number;
    5: number;
    10: number;
  };
  monthlyContribution?: {
    finalValue: number;
    totalContributions: number;
    totalGrowth: number;
    yearlyProjections: Array<{
      year: number;
      value: number;
      contributions: number;
      growth: number;
    }>;
  };
}

export function Dashboard() {
  const [result, setResult] = useState<PlanResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    amount: number;
    riskScore: number;
    monthlyContribution?: number;
    expectedReturn?: number;
    timeHorizon?: number;
  } | null>(null);
  const location = useLocation();
  const { savePortfolio } = usePortfolio();

  // Check if we're loading a saved portfolio
  useEffect(() => {
    const savedPortfolio = location.state?.savedPortfolio;
    if (savedPortfolio) {
      // Convert saved portfolio to result format
      setResult({
        allocations: savedPortfolio.allocations,
        expectedReturns: savedPortfolio.expectedReturns,
        monthlyContribution: savedPortfolio.monthlyContribution,
      });
      // Store the risk level for saving
      const riskLevel = savedPortfolio.riskLevel;
      let riskScore = 5; // default
      if (riskLevel?.toLowerCase().includes('low')) riskScore = 2;
      else if (riskLevel?.toLowerCase().includes('high')) riskScore = 9;
      setFormData({
        amount: savedPortfolio.investmentAmount,
        riskScore,
        monthlyContribution: savedPortfolio.monthlyContribution ? 1 : undefined,
        expectedReturn: savedPortfolio.monthlyContribution ? 7 : undefined,
        timeHorizon: savedPortfolio.monthlyContribution ? 10 : undefined,
      });
      // Clear the state so it doesn't reload on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleFormSubmit = async (data: {
    amount: number;
    riskScore: number;
    monthlyContribution?: number;
    expectedReturn?: number;
    timeHorizon?: number;
  }) => {
    setFormData(data);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate plan');
      }

      const responseData = await response.json();
      setResult(responseData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getRiskLevel = (riskScore: number): string => {
    if (riskScore <= 3) return 'Low';
    if (riskScore <= 7) return 'Moderate';
    return 'High';
  };

  const handleSavePortfolio = async () => {
    if (!result || !formData) {
      toast.error('No portfolio to save');
      return;
    }

    try {
      const riskLevel = getRiskLevel(formData.riskScore);

      await savePortfolio({
        investmentAmount: result.allocations.reduce((sum, a) => sum + a.dollarAmount, 0),
        riskLevel,
        allocations: result.allocations,
        expectedReturns: result.expectedReturns,
        monthlyContribution: result.monthlyContribution,
      });

      toast.success('Portfolio saved successfully!');
    } catch (error) {
      console.error('Error saving portfolio:', error);
      toast.error('Failed to save portfolio');
    }
  };

  return (
    <main className="flex-1 px-6 lg:px-8 py-8 animate-fade-in">
      {!result ? (
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 animate-slide-up">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              Investment Portfolio Planner
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Create a personalized investment plan based on your risk tolerance and investment amount.
            </p>
          </div>
          <InvestmentForm onSubmit={handleFormSubmit} loading={loading} />
          {error && (
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 backdrop-blur-sm animate-fade-in">
              {error}
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="mb-8 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setResult(null)}
                className="text-gray-400 hover:text-white font-medium flex items-center gap-2 transition-colors group"
              >
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Planning
              </button>
              {formData && (
                <button
                  onClick={handleSavePortfolio}
                  className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2.5 px-6 font-semibold hover:from-blue-500 hover:to-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60 hover:scale-105 active:scale-95 rounded-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  Save Portfolio
                </button>
              )}
            </div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              Portfolio Analysis
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Review your portfolio allocations and projected returns.
            </p>
          </div>
          <ResultsDashboard
            allocations={result.allocations}
            expectedReturns={result.expectedReturns}
            monthlyContribution={result.monthlyContribution}
          />
        </div>
      )}
    </main>
  );
}

