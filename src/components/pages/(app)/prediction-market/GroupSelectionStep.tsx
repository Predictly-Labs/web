"use client";

import React, { useState } from 'react';
import { Users, Plus, ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface GroupOption {
  id: string;
  name: string;
  memberCount: number;
  avatar: string;
  description: string;
}

interface GroupSelectionStepProps {
  onNext: (selection: { type: 'create' | 'select'; groupId?: string }) => void;
  onBack?: () => void;
}

export const GroupSelectionStep: React.FC<GroupSelectionStepProps> = ({
  onNext,
  onBack
}) => {
  const [selectedOption, setSelectedOption] = useState<'create' | 'select' | null>(null);
  const [selectedGroupId, setSelectedGroupId] = useState<string>('');

  const existingGroups: GroupOption[] = [
    {
      id: '1',
      name: 'Crypto Bulls',
      memberCount: 24,
      avatar: '/assets/logo/defi-protocol-logo/Layer Bank.jpg',
      description: 'A group of cryptocurrency enthusiasts making predictions about digital assets.'
    },
    {
      id: '2',
      name: 'DeFi Degens',
      memberCount: 15,
      avatar: '/assets/logo/defi-protocol-logo/Canopy.jpg',
      description: 'High-risk, high-reward DeFi predictions and yield farming strategies.'
    },
    {
      id: '3',
      name: 'Market Makers',
      memberCount: 32,
      avatar: '/assets/logo/defi-protocol-logo/MovePosition.jpg',
      description: 'Professional traders and analysts predicting market movements.'
    }
  ];

  const handleNext = () => {
    if (selectedOption) {
      onNext({
        type: selectedOption,
        groupId: selectedOption === 'select' ? selectedGroupId : undefined
      });
    }
  };

  const canProceed = selectedOption === 'create' || 
    (selectedOption === 'select' && selectedGroupId);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Choose Your Group Option
        </h3>
        <p className="text-gray-600">
          Would you like to create a new group or select from your existing groups?
        </p>
      </div>

      <div className="space-y-4">
        {/* Create New Group Option */}
        <div
          onClick={() => setSelectedOption('create')}
          className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
            selectedOption === 'create'
              ? 'border-black bg-gray-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-gray-900 mb-1">
                Create New Group
              </h4>
              <p className="text-gray-600 text-sm">
                Start a fresh group and invite friends to join your prediction market.
              </p>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              selectedOption === 'create'
                ? 'border-black bg-black'
                : 'border-gray-300'
            }`}>
              {selectedOption === 'create' && (
                <div className="w-2 h-2 bg-white rounded-full" />
              )}
            </div>
          </div>
        </div>

        {/* Select Existing Group Option */}
        <div
          onClick={() => setSelectedOption('select')}
          className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
            selectedOption === 'select'
              ? 'border-black bg-gray-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-gray-900 mb-1">
                Select Existing Group
              </h4>
              <p className="text-gray-600 text-sm mb-4">
                Choose from one of your existing groups to create the prediction market.
              </p>
              
              {selectedOption === 'select' && (
                <div className="space-y-3">
                  {existingGroups.map((group) => (
                    <div
                      key={group.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedGroupId(group.id);
                      }}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        selectedGroupId === group.id
                          ? 'border-black bg-white'
                          : 'border-gray-200 hover:border-gray-300 bg-white/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Image
                          src={group.avatar}
                          alt={group.name}
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-900">{group.name}</h5>
                          <p className="text-sm text-gray-600">
                            {group.memberCount} members
                          </p>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          selectedGroupId === group.id
                            ? 'border-black bg-black'
                            : 'border-gray-300'
                        }`}>
                          {selectedGroupId === group.id && (
                            <div className="w-full h-full bg-white rounded-full scale-50" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              selectedOption === 'select'
                ? 'border-black bg-black'
                : 'border-gray-300'
            }`}>
              {selectedOption === 'select' && (
                <div className="w-2 h-2 bg-white rounded-full" />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4">
        {onBack && (
          <button
            onClick={onBack}
            className="px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors"
          >
            Back
          </button>
        )}
        
        <button
          onClick={handleNext}
          disabled={!canProceed}
          className={`ml-auto flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
            canProceed
              ? 'bg-black text-white hover:bg-gray-800'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          Continue
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};