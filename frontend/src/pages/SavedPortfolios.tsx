import { usePortfolio } from '../hooks/usePortfolio';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Card } from '../components/ui/Card';
import { GlowButton } from '../components/ui/GlowButton';
import { SectionHeader } from '../components/ui/SectionHeader';

export function SavedPortfolios() {
  const { portfolios, loading, deletePortfolio } = usePortfolio();
  const navigate = useNavigate();

  const handleViewPortfolio = (portfolio: any) => {
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

  const getRiskBadgeColor = (riskLevel: string) => {
    if (riskLevel.toLowerCase().includes('low')) {
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    }
    if (riskLevel.toLowerCase().includes('high')) {
      return 'bg-red-500/20 text-red-400 border-red-500/30';
    }
    return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
  };

  const getRiskIcon = (riskLevel: string) => {
    if (riskLevel.toLowerCase().includes('low')) {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
    }
    if (riskLevel.toLowerCase().includes('high')) {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    }
    return (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-400">Loading portfolios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Saved Portfolios"
          subtitle="View and manage your saved investment portfolios"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
          className="mb-8 animate-slide-up"
        />

        {portfolios.length === 0 ? (
          <Card glow className="text-center py-16 animate-fade-in">
            <svg
              className="mx-auto h-16 w-16 text-gray-500 mb-4"
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
            <h3 className="text-xl font-semibold text-white mb-2">
              No saved portfolios yet
            </h3>
            <p className="text-gray-400 mb-6">
              Create a portfolio and save it to see it here.
            </p>
            <GlowButton onClick={() => navigate('/dashboard')}>
              Create Portfolio
            </GlowButton>
          </Card>
        ) : (
          <Card glow className="overflow-hidden animate-fade-in">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Date Saved
                    </th>
                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Risk Level
                    </th>
                    <th className="text-right py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Investment
                    </th>
                    <th className="text-right py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      10-Year Projection
                    </th>
                    <th className="text-center py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Allocations
                    </th>
                    <th className="text-right py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {portfolios.map((portfolio, index) => (
                    <tr
                      key={portfolio.id}
                      onClick={() => handleViewPortfolio(portfolio)}
                      className="hover:bg-gray-800/50 transition-all duration-200 cursor-pointer group hover:scale-[1.01] animate-fade-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <td className="py-4 px-6 text-sm text-gray-300 whitespace-nowrap">
                        {formatDate(portfolio.timestamp)}
                      </td>
                      <td className="py-4 px-6">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg border text-xs font-medium ${getRiskBadgeColor(portfolio.riskLevel)}`}>
                          {getRiskIcon(portfolio.riskLevel)}
                          {getRiskLabel(portfolio.riskLevel)}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right text-sm font-semibold text-blue-400">
                        {formatCurrency(portfolio.investmentAmount)}
                      </td>
                      <td className="py-4 px-6 text-right text-sm font-semibold text-green-400">
                        {formatCurrency(portfolio.expectedReturns[10])}
                      </td>
                      <td className="py-4 px-6 text-center text-sm text-gray-400">
                        <div className="flex items-center justify-center gap-1">
                          <span>{portfolio.allocations.length}</span>
                          {portfolio.monthlyContribution && (
                            <span className="text-blue-400" title="Monthly contributions included">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewPortfolio(portfolio);
                            }}
                            className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 hover:scale-110 transition-all duration-200 group"
                            title="View Portfolio"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <button
                            onClick={(e) => handleDelete(portfolio.id, e)}
                            className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:scale-110 transition-all duration-200 group"
                            title="Delete Portfolio"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
