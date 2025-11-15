import { usePortfolio } from '../hooks/usePortfolio';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function SavedPortfolios() {
  const { portfolios, loading, deletePortfolio } = usePortfolio();
  const navigate = useNavigate();

  const handleViewPortfolio = (portfolio: any) => {
    // Navigate to dashboard with portfolio data in state
    navigate('/dashboard', { state: { savedPortfolio: portfolio } });
  };

  const handleDelete = async (portfolioId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!window.confirm('Are you sure you want to delete this portfolio?')) {
      return;
    }

    try {
      await deletePortfolio(portfolioId);
      toast.success('Portfolio deleted successfully');
    } catch (error) {
      toast.error('Failed to delete portfolio');
      console.error('Delete error:', error);
    }
  };

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getRiskLabel = (riskLevel: string) => {
    if (riskLevel.toLowerCase().includes('low') || riskLevel.toLowerCase().includes('conservative')) {
      return 'Low Risk';
    }
    if (riskLevel.toLowerCase().includes('high') || riskLevel.toLowerCase().includes('aggressive')) {
      return 'High Risk';
    }
    return 'Moderate Risk';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-fidelity-gray-light flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-fidelity-green mb-4"></div>
          <p className="text-fidelity-gray-medium">Loading portfolios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-fidelity-gray-light">
      <div className="px-8 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-fidelity-gray-dark mb-3">
              Saved Portfolios
            </h1>
            <p className="text-lg text-fidelity-gray-medium">
              View and manage your saved investment portfolios.
            </p>
          </div>

          {portfolios.length === 0 ? (
            <div className="bg-white border border-fidelity shadow-fidelity p-12 text-center">
              <svg
                className="mx-auto h-16 w-16 text-fidelity-gray-medium mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-fidelity-gray-dark mb-2">
                No saved portfolios yet
              </h3>
              <p className="text-fidelity-gray-medium mb-6">
                Create a portfolio and save it to see it here.
              </p>
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-fidelity-green text-white py-2.5 px-6 font-semibold hover:bg-fidelity-green-dark transition-colors"
              >
                Create Portfolio
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {portfolios.map((portfolio) => (
                <div
                  key={portfolio.id}
                  className="bg-white border border-fidelity shadow-fidelity p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleViewPortfolio(portfolio)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <div>
                          <p className="text-sm text-fidelity-gray-medium">Date Saved</p>
                          <p className="text-base font-semibold text-fidelity-gray-dark">
                            {formatDate(portfolio.timestamp)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-fidelity-gray-medium">Risk Level</p>
                          <p className="text-base font-semibold text-fidelity-gray-dark">
                            {getRiskLabel(portfolio.riskLevel)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-fidelity-gray-medium">Investment Amount</p>
                          <p className="text-base font-semibold text-fidelity-green">
                            {formatCurrency(portfolio.investmentAmount)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-fidelity-gray-medium">10-Year Projection</p>
                          <p className="text-base font-semibold text-fidelity-green">
                            {formatCurrency(portfolio.expectedReturns[10])}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-fidelity-gray-medium">
                          {portfolio.allocations.length} allocations
                        </span>
                        {portfolio.monthlyContribution && (
                          <span className="text-xs text-fidelity-gray-medium">
                            • Monthly contributions included
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 ml-6">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewPortfolio(portfolio);
                        }}
                        className="bg-fidelity-green text-white py-2 px-4 font-medium hover:bg-fidelity-green-dark transition-colors"
                      >
                        View Portfolio
                      </button>
                      <button
                        onClick={(e) => handleDelete(portfolio.id, e)}
                        className="bg-red-600 text-white py-2 px-4 font-medium hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

