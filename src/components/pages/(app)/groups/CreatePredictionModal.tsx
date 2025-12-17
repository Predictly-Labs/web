"use client";

import React, { useState } from 'react';
import { X, Loader2, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import { usePredictions } from '@/hooks/usePredictions';
import type { MarketType } from '@/types/api';

interface CreatePredictionModalProps {
  groupId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const CreatePredictionModal: React.FC<CreatePredictionModalProps> = ({ groupId, isOpen, onClose, onSuccess }) => {
  const { createMarket, isLoading } = usePredictions();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    endDate: '',
    endTime: '23:59',
    marketType: 'STANDARD' as MarketType,
    minStake: '1',
    maxStake: '',
  });
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }
    if (!formData.endDate) {
      setError('End date is required');
      return;
    }

    const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);
    if (endDateTime <= new Date()) {
      setError('End date must be in the future');
      return;
    }

    try {
      await createMarket({
        groupId,
        title: formData.title.trim(),
        description: formData.description.trim() || undefined,
        endDate: endDateTime.toISOString(),
        marketType: formData.marketType,
        minStake: parseFloat(formData.minStake) || 1,
        maxStake: formData.maxStake ? parseFloat(formData.maxStake) : undefined,
      });
      setFormData({
        title: '',
        description: '',
        endDate: '',
        endTime: '23:59',
        marketType: 'STANDARD',
        minStake: '1',
        maxStake: '',
      });
      onSuccess?.();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create prediction');
    }
  };

  // Get minimum date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl p-6 w-full max-w-lg mx-4 my-8 shadow-xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Create Prediction</h2>
            <p className="text-sm text-gray-500">Create a new prediction market</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Question / Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Will Bitcoin reach $100k by end of year?"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              maxLength={200}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description (optional)</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Add more context about this prediction..."
              rows={2}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
              maxLength={500}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Calendar className="w-4 h-4 inline mr-1" />
                End Date
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                min={minDate}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Market Type</label>
            <div className="grid grid-cols-3 gap-2">
              {(['STANDARD', 'NO_LOSS', 'WITH_YIELD'] as MarketType[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, marketType: type }))}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    formData.marketType === type
                      ? 'bg-purple-100 text-purple-700 border-2 border-purple-500'
                      : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {type === 'STANDARD' ? 'Standard' : type === 'NO_LOSS' ? 'No Loss' : 'With Yield'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <DollarSign className="w-4 h-4 inline mr-1" />
                Min Stake
              </label>
              <input
                type="number"
                value={formData.minStake}
                onChange={(e) => setFormData(prev => ({ ...prev, minStake: e.target.value }))}
                min="0.1"
                step="0.1"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Stake (optional)</label>
              <input
                type="number"
                value={formData.maxStake}
                onChange={(e) => setFormData(prev => ({ ...prev, maxStake: e.target.value }))}
                min="0"
                step="0.1"
                placeholder="No limit"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm">{error}</div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating...
              </>
            ) : (
              'Create Prediction'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
