import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { BsPencil } from "react-icons/bs"
import { toast } from "sonner"

interface EditProfileModalProps {
  isOpen: boolean
  user?: any
  editForm: { displayName: string; avatarUrl: string }
  setEditForm: (form: any) => void
  previewUrl: string
  setPreviewUrl: (url: string) => void
  onClose: () => void
  onSave: () => void
  isUpdatingProfile: boolean
}

export const EditProfileModal = ({
  isOpen,
  user,
  editForm,
  setEditForm,
  previewUrl,
  setPreviewUrl,
  onClose,
  onSave,
  isUpdatingProfile
}: EditProfileModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormChange = (field: 'displayName' | 'avatarUrl', value: string) => {
    setEditForm((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Edit Profile</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-lg">
                {previewUrl ? (
                  <Image
                    src={previewUrl}
                    alt="Profile Preview"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                    onError={() => setPreviewUrl("")}
                  />
                ) : user?.avatarUrl ? (
                  <Image
                    src={user.avatarUrl}
                    alt="Current Avatar"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                    onError={() => setPreviewUrl("")}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-500 text-2xl font-light">
                      {editForm.displayName?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  </div>
                )}
              </div>
              
              <label className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-md border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
                <BsPencil className="w-4 h-4 text-gray-600" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">Click the pencil to upload photo</p>
              <p className="text-xs text-gray-400">Maximum file size: 5MB</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Display Name
            </label>
            <input
              type="text"
              value={editForm.displayName}
              onChange={(e) => handleFormChange('displayName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-gray-900"
              placeholder="Enter your display name"
            />
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
              onClick={onSave}
              disabled={isUpdatingProfile || !editForm.displayName.trim()}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer font-medium"
            >
              {isUpdatingProfile ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}