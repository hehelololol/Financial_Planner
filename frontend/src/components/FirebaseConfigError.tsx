import { configError } from '../firebase';

export function FirebaseConfigErrorDisplay() {
  if (!configError) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white border-2 border-red-500 shadow-lg max-w-2xl w-full p-6 rounded-lg">
        <div className="flex items-start mb-4">
          <div className="flex-shrink-0">
            <svg
              className="h-6 w-6 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              Firebase Configuration Error
            </h3>
            <p className="text-sm text-gray-700 mb-4">
              {configError.message}
            </p>
            
            <div className="bg-red-50 border border-red-200 rounded p-4 mb-4">
              <p className="text-sm font-medium text-red-800 mb-2">
                Missing Required Environment Variables:
              </p>
              <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
                {configError.missingVars.map((varName) => (
                  <li key={varName} className="font-mono">{varName}</li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded p-4">
              <p className="text-sm font-medium text-gray-800 mb-2">
                How to Fix:
              </p>
              <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1">
                <li>Create a <code className="bg-gray-200 px-1 rounded">.env</code> file in the <code className="bg-gray-200 px-1 rounded">frontend</code> directory</li>
                <li>Add all required <code className="bg-gray-200 px-1 rounded">VITE_FIREBASE_*</code> environment variables</li>
                <li>Restart your development server</li>
                <li>Check the browser console for detailed diagnostics</li>
              </ol>
            </div>

            <div className="mt-4 text-xs text-gray-500">
              <p>Check <code className="bg-gray-100 px-1 rounded">FIREBASE_SETUP.md</code> for setup instructions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

