"use client";

import React, { useState } from 'react';
import { Calendar, Clock, DollarSign, Users, ArrowLeft } from 'lucide-react';

interface MarketFormData {
  title: string;
  description: string;
  endDate: string;
  endTime: string;
  poolSize: string;
  category: string;
  isPrivate: boolean;
}

interface FormInputProps {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}

interface FormFieldProps {
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
}

interface FormSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

interface CreateMarketFormProps {
  onSubmit?: (data: MarketFormData) => void;
  onBack?: () => void;
  groupType?: 'create' | 'select';
  groupName?: string;
  riskType?: 'full' | 'zero';
}

const FormInput: React.FC<FormInputProps> = ({ label, icon: Icon, children }) => (
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
      <Icon className="w-4 h-4" />
      {label}
    </label>
    {children}
  </div>
);

const FormField: React.FC<FormFieldProps> = ({ type, value, onChange, placeholder, required = false }) => (
  <input
    type={type}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    required={required}
    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
  />
);

const FormSelect: React.FC<FormSelectProps> = ({ value, onChange, options }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
  >
    {options.map(option => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export const CreateMarketForm: React.FC<CreateMarketFormProps> = ({ 
  onSubmit, 
  onBack, 
  groupType, 
  groupName, 
  riskType 
}) => {
  const [formData, setFormData] = useState<MarketFormData>({
    title: '',
    description: '',
    endDate: '',
    endTime: '',
    poolSize: '',
    category: 'sports',
    isPrivate: false
  });

  const categories = [
    { value: 'sports', label: 'Sports' },
    { value: 'politics', label: 'Politics' },
    { value: 'crypto', label: 'Cryptocurrency' },
    { value: 'tech', label: 'Technology' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'other', label: 'Other' }
  ];

  const updateField = (field: keyof MarketFormData) => (value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <div className="space-y-6">
      {(groupType || riskType) && (
        <div className="bg-gray-50 rounded-2xl p-4 space-y-2">
          <h4 className="font-medium text-gray-900 mb-3">Your Selections:</h4>
          <div className="space-y-2 text-sm">
            {groupType && (
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Group Option:</span>
                <span className="font-medium text-gray-900">
                  {groupType === 'create' ? 'Create New Group' : `Selected: ${groupName || 'Existing Group'}`}
                </span>
              </div>
            )}
            {riskType && (
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Risk Level:</span>
                <span className={`font-medium ${riskType === 'full' ? 'text-red-600' : 'text-green-600'}`}>
                  {riskType === 'full' ? 'Full Risk' : 'Zero Risk (Principal Protected)'}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
      <FormInput label="Market Title" icon={DollarSign}>
        <FormField
          type="text"
          value={formData.title}
          onChange={updateField('title')}
          placeholder="What will you predict?"
          required
        />
      </FormInput>

      <FormInput label="Description" icon={Users}>
        <textarea
          value={formData.description}
          onChange={(e) => updateField('description')(e.target.value)}
          placeholder="Describe your prediction market..."
          rows={3}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
        />
      </FormInput>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput label="End Date" icon={Calendar}>
          <FormField
            type="date"
            value={formData.endDate}
            onChange={updateField('endDate')}
            placeholder=""
            required
          />
        </FormInput>

        <FormInput label="End Time" icon={Clock}>
          <FormField
            type="time"
            value={formData.endTime}
            onChange={updateField('endTime')}
            placeholder=""
            required
          />
        </FormInput>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput label="Pool Size" icon={DollarSign}>
          <FormField
            type="number"
            value={formData.poolSize}
            onChange={updateField('poolSize')}
            placeholder="Enter pool size"
            required
          />
        </FormInput>

        <FormInput label="Category" icon={Users}>
          <FormSelect
            value={formData.category}
            onChange={updateField('category')}
            options={categories}
          />
        </FormInput>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="isPrivate"
          checked={formData.isPrivate}
          onChange={(e) => updateField('isPrivate')(e.target.checked)}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="isPrivate" className="text-sm text-gray-700">
          Make this market private (only invited friends can participate)
        </label>
      </div>

      <div className="flex items-center justify-between pt-4">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        )}
        
        <button
          type="submit"
          className={`bg-black text-white py-4 px-8 rounded-xl font-medium hover:bg-gray-800 transition-colors cursor-pointer ${
            onBack ? 'ml-auto' : 'w-full'
          }`}
        >
          Create Market
        </button>
      </div>
    </form>
    </div>
  );
};