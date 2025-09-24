import React, { useState } from "react";

interface AdminModalProps {
  onClose: () => void;
  onUpdateResume: (newUrl: string, password: string) => Promise<{ success: boolean; error?: string }>;
}

const AdminModal: React.FC<AdminModalProps> = ({ onClose, onUpdateResume }) => {
  const [password, setPassword] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [status, setStatus] = useState<'idle' | 'authenticating' | 'updating' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState("");

  // Secret password - you can change this
  // const ADMIN_PASSWORD = "abeer2024";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('updating');

    if (!newUrl.trim()) {
      setStatus('error');
      setErrorMessage("Please enter a valid URL");
      return;
    }

    // Validate URL format
    try {
      new URL(newUrl);
    } catch {
      setStatus('error');
      setErrorMessage("Please enter a valid URL format");
      return;
    }

    try {
      // Update the config globally
      const result = await onUpdateResume(newUrl, password);
      
      if (result.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(result.error ?? "Failed to update resume URL");
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage("Failed to update resume URL");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-black md:w-[40rem] p-8 rounded-lg shadow-lg border-2 border-1e293b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-red-500">🔒 Admin Panel</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        {status === 'success' ? (
          <div className="text-center">
            <p className="text-green-500 text-lg mb-4">Resume URL updated successfully!</p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-md hover:bg-gray-400 text-gray-800 font-semibold rounded-lg"
            >
              Close
            </button>
          </div>
        ) : status === 'error' ? (
          <div className="text-center">
            <p className="text-red-500 text-lg mb-4">{errorMessage}</p>
            <button
              onClick={() => {
                setStatus('idle');
                setErrorMessage("");
                setPassword("");
                setNewUrl("");
              }}
              className="px-4 py-2 bg-gray-300 text-md hover:bg-gray-400 text-gray-800 font-semibold rounded-lg mr-2"
            >
              Try Again
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-md hover:bg-gray-400 text-gray-800 font-semibold rounded-lg"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-4">
              <label htmlFor="password" className="text-lg font-medium text-gray-400 mb-1">
                Admin Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border rounded-lg py-2 px-3 bg-gray-900 text-gray-300 focus:outline-none focus:ring focus:border-red-500"
                placeholder="Enter admin password"
              />
            </div>

            <div className="flex flex-col mb-4">
              <label htmlFor="newUrl" className="text-lg font-medium text-gray-400 mb-1">
                New Resume URL
              </label>
              <input
                type="url"
                id="newUrl"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                required
                className="border rounded-lg py-2 px-3 bg-gray-900 text-gray-300 focus:outline-none focus:ring focus:border-red-500"
                placeholder="https://drive.google.com/file/d/..."
              />
            </div>

            <div className="flex items-center justify-end">
              <button
                type="submit"
                disabled={status === 'authenticating' || status === 'updating'}
                className="bg-red-500 text-md text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'authenticating' ? 'Authenticating...' : 
                 status === 'updating' ? 'Updating...' : 'Update Resume URL'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 text-md hover:bg-gray-400 text-gray-800 font-semibold rounded-lg ml-2"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminModal;
