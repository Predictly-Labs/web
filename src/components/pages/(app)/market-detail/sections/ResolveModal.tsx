import { X } from 'lucide-react'

interface ResolveModalProps {
  isOpen: boolean
  onClose: () => void
  onResolve: () => void
  resolveForm: {
    outcome: 'YES' | 'NO'
    resolutionNote: string
  }
  setResolveForm: (form: any) => void
  isResolving: boolean
}

export const ResolveModal = ({ 
  isOpen, 
  onClose, 
  onResolve, 
  resolveForm, 
  setResolveForm, 
  isResolving 
}: ResolveModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Resolve Market</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Market Outcome
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => setResolveForm((prev: any) => ({ ...prev, outcome: 'YES' }))}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors cursor-pointer ${
                  resolveForm.outcome === 'YES'
                    ? 'bg-green-100 text-green-800 border-2 border-green-300'
                    : 'bg-gray-100 text-gray-700 border-2 border-gray-200 hover:bg-gray-200'
                }`}
              >
                YES
              </button>
              <button
                onClick={() => setResolveForm((prev: any) => ({ ...prev, outcome: 'NO' }))}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors cursor-pointer ${
                  resolveForm.outcome === 'NO'
                    ? 'bg-red-100 text-red-800 border-2 border-red-300'
                    : 'bg-gray-100 text-gray-700 border-2 border-gray-200 hover:bg-gray-200'
                }`}
              >
                NO
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Resolution Note
            </label>
            <textarea
              value={resolveForm.resolutionNote}
              onChange={(e) => setResolveForm((prev: any) => ({ ...prev, resolutionNote: e.target.value }))}
              placeholder="Provide details about why this market resolved this way..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              This will be visible to all participants to understand the resolution.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-100 p-6">
          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer font-medium"
            >
              Cancel
            </button>
            <button
              onClick={onResolve}
              disabled={isResolving || !resolveForm.resolutionNote.trim()}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer font-medium"
            >
              {isResolving ? 'Resolving...' : `Resolve as ${resolveForm.outcome}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}