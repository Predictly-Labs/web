"use client";

import React, { useState, useEffect } from 'react';
import { OnboardingModal } from './OnboardingModal';
import { GroupSelectionStep } from './GroupSelectionStep';
import { RiskSelectionStep, RiskType } from './RiskSelectionStep';
import { CreateMarketForm } from './CreateMarketForm';
import { usePredictions } from '@/hooks/usePredictions';
import { useGroups } from '@/hooks/useGroups';
import type { CreateMarketInput } from '@/types/requests';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { createMarket } = usePredictions();
  const { groups, fetchGroups, createGroup, joinGroup } = useGroups();

  // Fetch groups when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchGroups().catch(console.error);
    }
  }, [isOpen, fetchGroups]);

  const handleGroupSelection = async (selection: GroupSelection & { newGroupName?: string }) => {
    setSubmitError(null);
    
    // If creating a new group, create it first
    if (selection.type === 'create' && selection.newGroupName) {
      setIsSubmitting(true);
      try {
        const result = await createGroup({
          name: selection.newGroupName,
          description: `Group for prediction markets`,
          isPublic: true,
        });
        setGroupSelection({
          type: 'select',
          groupId: result.data.id,
          groupName: result.data.name,
        });
        setCurrentStep('risk');
      } catch (err: any) {
        setSubmitError(err.response?.data?.message || 'Failed to create group');
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // If joining with invite code
    if (selection.type === 'invite' && selection.inviteCode) {
      setIsSubmitting(true);
      try {
        const result = await joinGroup({ inviteCode: selection.inviteCode });
        setGroupSelection({
          type: 'select',
          groupId: result.data.id,
          groupName: result.data.name,
        });
        setCurrentStep('risk');
      } catch (err: any) {
        setSubmitError(err.response?.data?.message || 'Failed to join group');
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // If selecting existing group
    const selectedGroup = groups.find(g => g.id === selection.groupId);
    setGroupSelection({
      ...selection,
      groupName: selectedGroup?.name,
    });
    setCurrentStep('risk');
  };

  const handleRiskSelection = (risk: RiskType) => {
    setRiskType(risk);
    setCurrentStep('form');
  };

  const handleFormSubmit = async (data: MarketFormData) => {
    if (!groupSelection?.groupId) {
      setSubmitError('Please select a group first');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Combine date and time into ISO string
      const endDateTime = new Date(`${data.endDate}T${data.endTime}`).toISOString();
      
      const marketInput: CreateMarketInput = {
        groupId: groupSelection.groupId,
        title: data.title,
        description: data.description || undefined,
        endDate: endDateTime,
        marketType: riskType === 'zero' ? 'NO_LOSS' : 'STANDARD',
        minStake: 1,
        maxStake: parseFloat(data.poolSize) || 1000,
      };

      await createMarket(marketInput);
      onMarketCreated?.(data);
      handleClose();
    } catch (err: any) {
      setSubmitError(err.response?.data?.message || 'Failed to create market');
    } finally {
      setIsSubmitting(false);
    }
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
          groups={groups.map(g => ({
            id: g.id,
            name: g.name,
            memberCount: g.memberCount || 0,
            avatar: g.iconUrl || '/assets/logo/defi-protocol-logo/Layer Bank.jpg',
            description: g.description || 'No description',
          }))}
          isSubmitting={isSubmitting}
          error={submitError}
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
          isSubmitting={isSubmitting}
          submitError={submitError}
        />
      )}
    </OnboardingModal>
  );
};