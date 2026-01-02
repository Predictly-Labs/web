"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Users, UserCheck, Settings, X, Info } from "lucide-react";
import { useGetGroupMembers } from "@/hooks/useGetGroupMembers";
import { useSetGroupJudges } from "@/hooks/useSetGroupJudges";
import { toast } from "sonner";

interface JudgeManagementProps {
  groupId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const JudgeManagement: React.FC<JudgeManagementProps> = ({
  groupId,
  isOpen,
  onClose,
}) => {
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [showTooltip, setShowTooltip] = useState(false);
  const { members, getGroupMembers, isLoading: isLoadingMembers, error: membersError } = useGetGroupMembers();
  const { setGroupJudges, isLoading: isSettingJudges, error: judgesError } = useSetGroupJudges();

  useEffect(() => {
    if (isOpen && groupId) {
      getGroupMembers(groupId);
    }
  }, [isOpen, groupId, getGroupMembers]);

  const handleMemberToggle = (userId: string) => {
    setSelectedUserIds(prev => 
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSetJudges = async () => {
    if (selectedUserIds.length === 0) {
      toast.error('Please select at least one member to assign as judge');
      return;
    }

    const result = await setGroupJudges(groupId, selectedUserIds);
    
    if (result) {
      const { summary, successful, failed } = result.data;
      
      if (summary.succeeded > 0) {
        toast.success(`Successfully assigned ${summary.succeeded} judge(s)`);
        setSelectedUserIds([]);
        
        if (summary.failed === 0) {
          onClose();
        }
      }
      
      if (summary.failed > 0) {
        toast.error(`Failed to assign ${summary.failed} judge(s)`);
      }
    } else if (judgesError) {
      toast.error(judgesError);
    }
  };

  const judges = members.filter(member => member.role === 'JUDGE');
  const regularMembers = members.filter(member => member.role !== 'JUDGE');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <Settings className="w-6 h-6 text-gray-700" />
            <h2 className="text-xl font-semibold text-gray-900">Judge Management</h2>
            <div className="relative">
              <button
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              >
                <Info className="w-4 h-4 text-gray-500" />
              </button>
              
              {showTooltip && (
                <div className="absolute top-8 left-0 z-50 w-64 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg">
                  <div className="relative">
                    <p className="leading-relaxed">
                      Judges are responsible for resolving prediction markets when they end. They determine the final outcome and ensure fair resolution.
                    </p>
                    <div className="absolute -top-2 left-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-gray-900"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(80vh-200px)]">
          {(isLoadingMembers || isSettingJudges) && (
            <div className="flex items-center justify-center py-8">
              <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-2 text-gray-600">
                {isLoadingMembers ? 'Loading members...' : 'Assigning judges...'}
              </span>
            </div>
          )}

          {membersError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-red-600 text-sm">{membersError}</p>
            </div>
          )}

          {!isLoadingMembers && members.length === 0 && (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No members found in this group</p>
            </div>
          )}

          {judges.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-green-600" />
                Current Judges ({judges.length})
              </h3>
              <div className="space-y-2">
                {judges.map((judge) => (
                  <div key={judge.id} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                      <Image
                        src={judge.user.avatarUrl || '/default-avatar.png'}
                        alt={judge.user.displayName}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{judge.user.displayName}</p>
                      <p className="text-xs text-gray-500">Judge</p>
                    </div>
                    <UserCheck className="w-4 h-4 text-green-600" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {regularMembers.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-600" />
                Assign New Judges ({regularMembers.length} members)
              </h3>
              <div className="space-y-2">
                {regularMembers.map((member) => (
                  <div 
                    key={member.id} 
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedUserIds.includes(member.user.id)
                        ? 'border-blue-300 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleMemberToggle(member.user.id)}
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                      <Image
                        src={member.user.avatarUrl || '/default-avatar.png'}
                        alt={member.user.displayName}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{member.user.displayName}</p>
                      <p className="text-xs text-gray-500">
                        {member.user.walletAddress.slice(0, 6)}...{member.user.walletAddress.slice(-4)}
                      </p>
                    </div>
                    <div className={`w-4 h-4 rounded border-2 transition-colors ${
                      selectedUserIds.includes(member.user.id)
                        ? 'border-blue-600 bg-blue-600'
                        : 'border-gray-300'
                    }`}>
                      {selectedUserIds.includes(member.user.id) && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {regularMembers.length > 0 && (
          <div className="border-t border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                {selectedUserIds.length} member(s) selected
              </p>
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSetJudges}
                  disabled={selectedUserIds.length === 0 || isSettingJudges}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  Assign Judges
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};