import { memo, useState, useCallback } from "react";

function ProfileInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Amine K.",
    email: "amine.k@email.com",
    phone: "+213 555 123 456",
  });

  const handleEdit = useCallback(() => {
    setIsEditing(!isEditing);
  }, [isEditing]);

  const handleSave = useCallback(() => {
    setIsEditing(false);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-8">
      <div className="text-center">
        <div className="relative inline-block">
          <div className="w-20 h-20 bg-secondary/30 rounded-full mx-auto mb-4 overflow-hidden">
            <img
              src="/heroFallback.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <svg
              className="w-3 h-3 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <h3 className="text-lg font-bold text-secondary">{profile.name}</h3>
        <p className="text-sm text-secondary/60">{profile.email}</p>
        <p className="text-sm text-secondary/60">{profile.phone}</p>
      </div>

      <div>
        <h4 className="font-semibold text-secondary mb-4">Impact Stats</h4>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-secondary/60">Patients Helped</span>
            <span className="font-semibold text-primary">12</span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary/60">Total Donated</span>
            <span className="font-semibold text-green-600">DA 150,000</span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-secondary mb-4">Badges</h4>
        <div className="flex justify-center space-x-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-secondary/15 rounded-full flex items-center justify-center mb-2">
              <svg
                className="w-6 h-6 text-secondary/60"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <span className="text-xs text-secondary/60">First Donation</span>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center mb-2">
              <svg
                className="w-6 h-6 text-yellow-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <span className="text-xs text-secondary/60">Silver Donor</span>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-secondary/15 rounded-full flex items-center justify-center mb-2">
              <svg
                className="w-6 h-6 text-secondary/60"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <span className="text-xs text-secondary/60">Gold Donor</span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-secondary mb-4">Settings</h4>
        <div className="space-y-3">
          <button className="flex items-center w-full text-left text-secondary/70 hover:text-primary py-2">
            <svg
              className="w-4 h-4 mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            Update Profile
          </button>
          <button className="flex items-center w-full text-left text-secondary/70 hover:text-primary py-2">
            <svg
              className="w-4 h-4 mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            Change Password
          </button>
          <button className="flex items-center w-full text-left text-red-600 hover:text-red-700 py-2">
            <svg
              className="w-4 h-4 mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M10 5a2 2 0 00-2 2v6a2 2 0 104 0V7a2 2 0 00-2-2z"
                clipRule="evenodd"
              />
            </svg>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(ProfileInfo);
