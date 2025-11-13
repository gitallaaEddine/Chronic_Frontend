import { memo } from "react";

function ProfileInfo({ data }) {
  
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
        <h3 className="text-lg font-bold text-secondary">{data.username}</h3>
        <p className="text-sm text-secondary/60">{data.email}</p>
        <p className="text-sm text-secondary/60">{data.phone}</p>
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
