"use client";

import React, { useState } from 'react';
import { Users, Plus, ArrowRight, Key, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface GroupOption {
  id: string;
  name: string;
  memberCount: number;
  avatar: string;
  description: string;
}

interface GroupSelectionStepProps {
  onNext: (selection: { type: 'create' | 'select' | 'invite'; groupId?: string; inviteCode?: string }) => void;
  onBack?: () => void;
}

export const GroupSelectionStep: React.FC<GroupSelectionStepProps> = ({
  onNext,
  onBack
}) => {
  const [selectedOption, setSelectedOption] = useState<'create' | 'select' | 'invite' | null>(null);
  const [selectedGroupId, setSelectedGroupId] = useState<string>('');
  const [inviteCode, setInviteCode] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [newGroupName, setNewGroupName] = useState<string>('');
  const [generatedInviteCode, setGeneratedInviteCode] = useState<string>('');

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

  const generateRandomGroupName = () => {
    const adjectives = ['Elite', 'Crypto', 'DeFi', 'Smart', 'Pro', 'Alpha', 'Meta', 'Digital', 'Web3', 'Blockchain'];
    const nouns = ['Traders', 'Bulls', 'Degens', 'Makers', 'Builders', 'Pioneers', 'Analysts', 'Experts', 'Squad', 'Guild'];
    
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    
    return `${randomAdjective} ${randomNoun}`;
  };

  const generateInviteCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleOptionSelect = (option: 'create' | 'select' | 'invite') => {
    setSelectedOption(option);
    
    if (option === 'create') {
      const randomName = generateRandomGroupName();
      const randomCode = generateInviteCode();
      setNewGroupName(randomName);
      setGeneratedInviteCode(randomCode);
    }
  };

  const handleNext = () => {
    if (selectedOption) {
      onNext({
        type: selectedOption,
        groupId: selectedOption === 'select' ? selectedGroupId : undefined,
        inviteCode: selectedOption === 'invite' ? inviteCode : undefined
      });
    }
  };

  const canProceed = (selectedOption === 'create' && newGroupName.trim()) || 
    (selectedOption === 'select' && selectedGroupId) ||
    (selectedOption === 'invite' && inviteCode.trim());

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
        <motion.div
          onClick={() => handleOptionSelect('create')}
          className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
            selectedOption === 'create'
              ? 'border-black bg-gray-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-gray-900 mb-1">
                Create New Group
              </h4>
              <p className="text-gray-600 text-sm mb-4">
                Start a fresh group and invite friends to join your prediction market.
              </p>
              
              {selectedOption === 'create' && (
                <motion.div 
                  className="mt-4 space-y-3"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Group Name</label>
                    <input
                      type="text"
                      value={newGroupName}
                      onChange={(e) => {
                        e.stopPropagation();
                        setNewGroupName(e.target.value);
                      }}
                      onClick={(e) => e.stopPropagation()}
                      placeholder="Enter group name..."
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  
                  <div className="bg-gray-100 border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Invite Code</p>
                        <p className="text-xs text-gray-500">Share this code with friends to join</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <code className="bg-white px-3 py-2 rounded-lg font-mono text-sm font-semibold text-gray-900 border">
                          {generatedInviteCode}
                        </code>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigator.clipboard.writeText(generatedInviteCode);
                          }}
                          className="text-xs bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
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
        </motion.div>

        {/* Select Existing Group Option */}
        <motion.div
          onClick={() => handleOptionSelect('select')}
          className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
            selectedOption === 'select'
              ? 'border-black bg-gray-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
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
                <motion.div 
                  className="mt-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative">
                    {/* Custom Dropdown Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsDropdownOpen(!isDropdownOpen);
                      }}
                      className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white cursor-pointer text-left flex items-center gap-3"
                    >
                      {selectedGroupId ? (
                        <>
                          {(() => {
                            const selectedGroup = existingGroups.find(g => g.id === selectedGroupId);
                            return selectedGroup ? (
                              <>
                                <Image
                                  src={selectedGroup.avatar}
                                  alt={selectedGroup.name}
                                  width={24}
                                  height={24}
                                  className="rounded-full object-cover"
                                />
                                <span className="text-gray-900">
                                  {selectedGroup.name} ({selectedGroup.memberCount} members)
                                </span>
                              </>
                            ) : null;
                          })()}
                        </>
                      ) : (
                        <span className="text-gray-500">Choose a group...</span>
                      )}
                      <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Custom Dropdown Options */}
                    {isDropdownOpen && (
                      <motion.div
                        className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {existingGroups.map((group, index) => (
                          <motion.button
                            key={group.id}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedGroupId(group.id);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors flex items-center gap-3 ${
                              selectedGroupId === group.id ? 'bg-blue-50 text-blue-900' : 'text-gray-900'
                            }`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.1, delay: index * 0.05 }}
                          >
                            <Image
                              src={group.avatar}
                              alt={group.name}
                              width={32}
                              height={32}
                              className="rounded-full object-cover"
                            />
                            <div>
                              <div className="font-medium">{group.name}</div>
                              <div className="text-sm text-gray-600">{group.memberCount} members</div>
                            </div>
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                  
                  {selectedGroupId && (
                    <motion.div
                      className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-xl"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {(() => {
                        const selectedGroup = existingGroups.find(g => g.id === selectedGroupId);
                        return selectedGroup ? (
                          <div className="flex items-center gap-3">
                            <Image
                              src={selectedGroup.avatar}
                              alt={selectedGroup.name}
                              width={40}
                              height={40}
                              className="rounded-full object-cover"
                            />
                            <div>
                              <h6 className="font-medium text-blue-900">{selectedGroup.name}</h6>
                              <p className="text-sm text-blue-700">{selectedGroup.description}</p>
                            </div>
                          </div>
                        ) : null;
                      })()}
                    </motion.div>
                  )}
                </motion.div>
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
        </motion.div>

        {/* Join with Invite Code Option */}
        <motion.div
          onClick={() => handleOptionSelect('invite')}
          className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
            selectedOption === 'invite'
              ? 'border-purple-500 bg-purple-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
              <Key className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-gray-900 mb-1">
                Join with Invite Code
              </h4>
              <p className="text-gray-600 text-sm mb-4">
                Enter an invite code to join an existing private group.
              </p>
              
              {selectedOption === 'invite' && (
                <motion.div 
                  className="mt-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <input
                    type="text"
                    value={inviteCode}
                    onChange={(e) => {
                      e.stopPropagation();
                      setInviteCode(e.target.value);
                    }}
                    onClick={(e) => e.stopPropagation()}
                    placeholder="Enter invite code..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  />
                </motion.div>
              )}
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              selectedOption === 'invite'
                ? 'border-purple-500 bg-purple-500'
                : 'border-gray-300'
            }`}>
              {selectedOption === 'invite' && (
                <div className="w-2 h-2 bg-white rounded-full" />
              )}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="flex items-center justify-between pt-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        {onBack && (
          <button
            onClick={onBack}
            className="px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
          >
            Back
          </button>
        )}
        
        <button
          onClick={handleNext}
          disabled={!canProceed}
          className={`ml-auto flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all cursor-pointer ${
            canProceed
              ? 'bg-black text-white hover:bg-gray-800'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          Continue
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
};