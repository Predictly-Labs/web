"use client";

import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Clock, CheckCircle, Gift, Loader2, DollarSign } from 'lucide-react';
import { predictionsApi } from '@/lib/api/predictions';
import type { Vote } from '@/types/api';

interface VoteHistoryCardProps {
  vote: Vote;
  onClaimed?: () => void;
}

export const VoteHistoryCard: React.FC<VoteHistoryCardProps> = ({ vote, onClaimed }) => {
  const [isClaiming, setIsClaiming] = useState(false);
  const [claimError, setClaimError] = useState<string | null>(null);
  const [claimed, setClaimed] = useState(vote.hasClaimedReward);

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  const isResolved = vote.market?.status === 'RESOLVED';
  const isWinner = isResolved && vote.market?.outcome === vote.prediction;
  const canClaim = isWinner && vote.rewardAmount && !claimed;

  const handleClaim = async () => {
    if (!canClaim) return;
    
    setIsClaiming(true);
    setClaimError(null);
    try {
      await predictionsApi.claim(vote.marketId);
      setClaimed(true);
      onClaimed?.();
    } catch (err: any) {
      setClaimError(err.response?.data?.message || 'Failed to claim reward');
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100 hover:border-gray-200 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 truncate">{vote.market?.title || 'Unknown Market'}</h4>
          <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              {vote.prediction === 'YES' ? (
                <ThumbsUp className="w-4 h-4 text-green-500" />
              ) : (
                <ThumbsDown className="w-4 h-4 text-red-500" />
              )}
              <span className={vote.prediction === 'YES' ? 'text-green-600' : 'text-red-600'}>
                {vote.prediction}
              </span>
            </div>
            <span>|</span>
            <div className="flex items-center gap-1">
              <DollarSign className="w-3 h-3" />
              <span>{vote.amount} staked</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          {/* Status Badge */}
          {isResolved ? (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              isWinner ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {isWinner ? 'Won' : 'Lost'}
            </span>
          ) : (
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Pending
            </span>
          )}

          {/* Reward Amount */}
          {vote.rewardAmount && vote.rewardAmount > 0 && (
            <span className="text-sm font-medium text-green-600">
              +{vote.rewardAmount.toFixed(2)} reward
            </span>
          )}
        </div>
      </div>

      {/* Claim Section */}
      {canClaim && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          {claimError && (
            <p className="text-xs text-red-500 mb-2">{claimError}</p>
          )}
          <button
            onClick={handleClaim}
            disabled={isClaiming}
            className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            {isClaiming ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Claiming...
              </>
            ) : (
              <>
                <Gift className="w-4 h-4" />
                Claim {vote.rewardAmount?.toFixed(2)} Reward
              </>
            )}
          </button>
        </div>
      )}

      {claimed && isWinner && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-center gap-2 text-green-600 text-sm">
            <CheckCircle className="w-4 h-4" />
            Reward Claimed
          </div>
        </div>
      )}

      {/* Date */}
      <div className="mt-3 text-xs text-gray-400">
        Voted on {formatDate(vote.createdAt)}
        {vote.market?.endDate && (
          <span> | Ends {formatDate(vote.market.endDate)}</span>
        )}
      </div>
    </div>
  );
};
