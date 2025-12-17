"use client";

import React, { useState, useEffect } from 'react';
import { X, Loader2, Calendar, Users, DollarSign, TrendingUp, ThumbsUp, ThumbsDown, Clock, CheckCircle, XCircle } from 'lucide-react';
import { usePrediction } from '@/hooks/usePrediction';
import { useAuth } from '@/contexts/AuthContext';
import type { Prediction } from '@/types/api';

interface PredictionDetailModalProps {
  marketId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PredictionDetailModal: React.FC<PredictionDetailModalProps> = ({ marketId, isOpen, onClose }) => {
  const { isAuthenticated } = useAuth();
  const { market, isLoading, error, fetchMarket, vote } = usePrediction();
  const [voteAmount, setVoteAmount] = useState('10');
  const [selectedPrediction, setSelectedPrediction] = useState<Prediction | null>(null);
  const [isVoting, setIsVoting] = useState(false);
  const [voteError, setVoteError] = useState<string | null>(null);
  const [voteSuccess, setVoteSuccess] = useState(false);

  useEffect(() => {
    if (isOpen && marketId) {
      fetchMarket(marketId).catch(console.error);
      setSelectedPrediction(null);
      setVoteError(null);
      setVoteSuccess(false);
    }
  }, [isOpen, marketId, fetchMarket]);

  if (!isOpen) return null;

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', { 
    month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' 
  });

  const handleVote = async () => {
    if (!selectedPrediction || !marketId) return;
    
    const amount = parseFloat(voteAmount);
    if (isNaN(amount) || amount <= 0) {
      setVoteError('Please enter a valid amount');
      return;
    }

    setIsVoting(true);
    setVoteError(null);
    try {
      await vote({ prediction: selectedPrediction, amount }, marketId);
      setVoteSuccess(true);
      setTimeout(() => setVoteSuccess(false), 3000);
    } catch (err: any) {
      setVoteError(err.response?.data?.message || 'Failed to place vote');
    } finally {
      setIsVoting(false);
    }
  };

  const isActive = market?.status === 'ACTIVE';
  const hasVoted = !!market?.userVote;
  const canVote = isAuthenticated && isActive && !hasVoted;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl w-full max-w-2xl mx-4 my-8 shadow-xl max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10">
          <X className="w-5 h-5" />
        </button>

        {isLoading && !market ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
          </div>
        ) : error ? (
          <div className="p-6 text-center">
            <p className="text-red-500">{error}</p>
            <button onClick={() => marketId && fetchMarket(marketId)} className="mt-4 text-blue-600 hover:underline">
              Try again
            </button>
          </div>
        ) : market ? (
          <div className="p-6">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h2 className="text-xl font-semibold text-gray-900 pr-8">{market.title}</h2>
                <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                  market.status === 'ACTIVE' ? 'bg-green-100 text-green-700' :
                  market.status === 'RESOLVED' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {market.status}
                </span>
              </div>
              {market.description && (
                <p className="text-gray-600 text-sm">{market.description}</p>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <Calendar className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                <p className="text-xs text-gray-500">Ends</p>
                <p className="text-sm font-medium text-gray-900">{formatDate(market.endDate)}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <Users className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                <p className="text-xs text-gray-500">Participants</p>
                <p className="text-sm font-medium text-gray-900">{market.participantCount}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <DollarSign className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                <p className="text-xs text-gray-500">Total Pool</p>
                <p className="text-sm font-medium text-gray-900">{market.totalVolume.toFixed(2)}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <TrendingUp className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                <p className="text-xs text-gray-500">Min Stake</p>
                <p className="text-sm font-medium text-gray-900">{market.minStake}</p>
              </div>
            </div>

            {/* Current Odds */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Current Odds</h3>
              <div className="flex gap-2">
                <div className="flex-1 bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ThumbsUp className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-green-700">YES</span>
                    </div>
                    <span className="text-2xl font-bold text-green-700">{market.yesPercentage}%</span>
                  </div>
                  <p className="text-xs text-green-600 mt-1">Pool: {market.yesPool.toFixed(2)}</p>
                </div>
                <div className="flex-1 bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ThumbsDown className="w-5 h-5 text-red-600" />
                      <span className="font-medium text-red-700">NO</span>
                    </div>
                    <span className="text-2xl font-bold text-red-700">{market.noPercentage}%</span>
                  </div>
                  <p className="text-xs text-red-600 mt-1">Pool: {market.noPool.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Resolved Outcome */}
            {market.status === 'RESOLVED' && market.outcome && (
              <div className={`mb-6 p-4 rounded-xl ${
                market.outcome === 'YES' ? 'bg-green-100 border border-green-300' :
                market.outcome === 'NO' ? 'bg-red-100 border border-red-300' :
                'bg-gray-100 border border-gray-300'
              }`}>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Outcome: {market.outcome}</span>
                </div>
                {market.resolutionNote && (
                  <p className="text-sm mt-2 opacity-80">{market.resolutionNote}</p>
                )}
              </div>
            )}

            {/* User's Vote */}
            {hasVoted && market.userVote && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <h3 className="text-sm font-medium text-blue-700 mb-2">Your Vote</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {market.userVote.prediction === 'YES' ? (
                      <ThumbsUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <ThumbsDown className="w-4 h-4 text-red-600" />
                    )}
                    <span className="font-medium">{market.userVote.prediction}</span>
                  </div>
                  <span className="text-sm text-gray-600">Staked: {market.userVote.amount}</span>
                </div>
              </div>
            )}

            {/* Voting UI */}
            {canVote && (
              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Place Your Vote</h3>
                
                <div className="flex gap-3 mb-4">
                  <button
                    onClick={() => setSelectedPrediction('YES')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-colors ${
                      selectedPrediction === 'YES' 
                        ? 'border-green-500 bg-green-50 text-green-700' 
                        : 'border-gray-200 text-gray-600 hover:border-green-300'
                    }`}
                  >
                    <ThumbsUp className="w-5 h-5" />
                    <span className="font-medium">YES</span>
                  </button>
                  <button
                    onClick={() => setSelectedPrediction('NO')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-colors ${
                      selectedPrediction === 'NO' 
                        ? 'border-red-500 bg-red-50 text-red-700' 
                        : 'border-gray-200 text-gray-600 hover:border-red-300'
                    }`}
                  >
                    <ThumbsDown className="w-5 h-5" />
                    <span className="font-medium">NO</span>
                  </button>
                </div>

                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-1">Stake Amount</label>
                  <input
                    type="number"
                    value={voteAmount}
                    onChange={(e) => setVoteAmount(e.target.value)}
                    min={market.minStake}
                    max={market.maxStake || undefined}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder={`Min: ${market.minStake}`}
                  />
                </div>

                {voteError && (
                  <div className="mb-4 bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm">{voteError}</div>
                )}

                {voteSuccess && (
                  <div className="mb-4 bg-green-50 text-green-600 px-4 py-2 rounded-lg text-sm">Vote placed successfully!</div>
                )}

                <button
                  onClick={handleVote}
                  disabled={!selectedPrediction || isVoting}
                  className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isVoting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Placing Vote...
                    </>
                  ) : (
                    'Confirm Vote'
                  )}
                </button>
              </div>
            )}

            {!isAuthenticated && isActive && (
              <div className="border-t border-gray-100 pt-6 text-center">
                <p className="text-gray-500">Please log in to place a vote</p>
              </div>
            )}

            {/* Recent Votes */}
            {market.votes && market.votes.length > 0 && (
              <div className="border-t border-gray-100 pt-6 mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Recent Votes ({market.votes.length})</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {market.votes.slice(0, 10).map((v) => (
                    <div key={v.id} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        {v.prediction === 'YES' ? (
                          <ThumbsUp className="w-4 h-4 text-green-500" />
                        ) : (
                          <ThumbsDown className="w-4 h-4 text-red-500" />
                        )}
                        <span className="text-sm text-gray-700">{v.user?.displayName || 'Anonymous'}</span>
                      </div>
                      <span className="text-sm text-gray-500">{v.amount} staked</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};
