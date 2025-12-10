"use client";

import React, { useState } from 'react';
import { OnboardingModal } from './OnboardingModal';
import { GroupSelectionStep } from './GroupSelectionStep';
import { RiskSelectionStep, RiskType } from './RiskSelectionStep';
import { CreateMarketForm } from './CreateMarketForm';

interface MarketFormData {
  title: string;
  description: string;
  endDate: string;
  endTime: string;
  poolSize: string;
  category: string;
  isPrivate: boolean;
}

interface GroupSelection {
  type: 'create' | 'select' | 'invite';
  groupId?: string;
  groupName?: string;
  inviteCode?: string;
}

interface CreateMarketOnboardingProps {
  isOpen: boolean;
  onClose: () => void;
  onMarketCreated?: (data: MarketFormData) => void;
}

type OnboardingStep = 'group' | 'risk' | 'form';

export const CreateMarketOnboarding: React.FC<CreateMarketOnboardingProps> = ({
  isOpen,
  onClose,
  onMarketCreated
}) => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('group');
  const [groupSelection, setGroupSelection] = useState<GroupSelection | null>(null);
  const [riskType, setRiskType] = useState<RiskType | null>(null);

  const existingGroups = [
    { id: '1', name: 'Crypto Bulls' },
    { id: '2', name: 'DeFi Degens' },
    { id: '3', name: 'Market Makers' }
  ];

  const handleGroupSelection = (selection: GroupSelection) => {
    const selectedGroup = existingGroups.find(g => g.id === selection.groupId);
    setGroupSelection({
      ...selection,
      groupName: selectedGroup?.name || (selection.type === 'invite' ? `Invite Code: ${selection.inviteCode}` : undefined)
    });
    setCurrentStep('risk');
  };

  const handleRiskSelection = (risk: RiskType) => {
    setRiskType(risk);
    setCurrentStep('form');
  };

  const handleFormSubmit = (data: MarketFormData) => {
    onMarketCreated?.(data);
    handleClose();
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'risk':
        setCurrentStep('group');
        break;
      case 'form':
        setCurrentStep('risk');
        break;
      default:
        break;
    }
  };

  const handleClose = () => {
    setCurrentStep('group');
    setGroupSelection(null);
    setRiskType(null);
    onClose();
  };

  const getStepNumber = () => {
    switch (currentStep) {
      case 'group': return 1;
      case 'risk': return 2;
      case 'form': return 3;
      default: return 1;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 'group': return 'Create New Prediction Market';
      case 'risk': return 'Configure Risk Settings';
      case 'form': return 'Market Details';
      default: return 'Create New Prediction Market';
    }
  };

  return (
    <OnboardingModal
      isOpen={isOpen}
      onClose={handleClose}
      title={getStepTitle()}
      step={getStepNumber()}
      totalSteps={3}
    >
      {currentStep === 'group' && (
        <GroupSelectionStep
          onNext={handleGroupSelection}
        />
      )}
      
      {currentStep === 'risk' && (
        <RiskSelectionStep
          onNext={handleRiskSelection}
          onBack={handleBack}
        />
      )}
      
      {currentStep === 'form' && (
        <CreateMarketForm
          onSubmit={handleFormSubmit}
          onBack={handleBack}
          groupType={groupSelection?.type === 'invite' ? undefined : groupSelection?.type}
          groupName={groupSelection?.groupName}
          riskType={riskType || undefined}
        />
      )}
    </OnboardingModal>
  );
};