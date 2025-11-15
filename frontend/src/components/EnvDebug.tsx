import { useState } from 'react';

/**
 * Temporary debug component to display all import.meta.env variables
 * This helps verify that Vite is correctly loading environment variables
 */
export function EnvDebug() {
  const [isVisible, setIsVisible] = useState(false);
  const [showValues, setShowValues] = useState(false);

  // Get all environment variables
  const envData = import.meta.env;
  const envString = JSON.stringify(envData, null, 2);

  // Filter Firebase-related variables
  const firebaseVars = Object.keys(envData).filter(key => key.startsWith('VITE_FIREBASE_'));

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition-colors text-sm z-50"
      >
        🔍 Show Env Debug
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border-2 border-blue-500 shadow-2xl rounded-lg p-4 max-w-2xl max-h-[80vh] overflow-auto z-50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Environment Variables Debug</h3>
        <div className="flex gap-2">
          <label className="flex items-center text-sm text-gray-700">
            <input
              type="checkbox"
              checked={showValues}
              onChange={(e) => setShowValues(e.target.checked)}
              className="mr-2"
            />
            Show Values
          </label>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {/* Firebase Variables Section */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">
            Firebase Variables ({firebaseVars.length}):
          </h4>
          <div className="bg-gray-50 border border-gray-200 rounded p-3 font-mono text-xs overflow-x-auto">
            {firebaseVars.length > 0 ? (
              <ul className="space-y-1">
                {firebaseVars.map((key) => {
                  const value = envData[key];
                  const isSet = value !== undefined && value !== null && value !== '';
                  return (
                    <li key={key} className={isSet ? 'text-green-700' : 'text-red-700'}>
                      <span className="font-semibold">{key}:</span>{' '}
                      {showValues ? (
                        <span>
                          {key.includes('API_KEY') || key.includes('APP_ID') 
                            ? `"${String(value).substring(0, 10)}...${String(value).substring(String(value).length - 4)}"` 
                            : JSON.stringify(value)}
                        </span>
                      ) : (
                        <span>{isSet ? '✓ Set' : '✗ Missing'}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-red-700">No VITE_FIREBASE_* variables found!</p>
            )}
          </div>
        </div>

        {/* All Environment Variables Section */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">
            All import.meta.env Variables:
          </h4>
          <div className="bg-gray-50 border border-gray-200 rounded p-3">
            <pre className="text-xs font-mono overflow-x-auto whitespace-pre-wrap">
              {envString}
            </pre>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-blue-50 border border-blue-200 rounded p-3 text-xs text-blue-800">
          <p className="font-semibold mb-1">ℹ️ Information:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Only variables prefixed with <code className="bg-blue-100 px-1 rounded">VITE_</code> are exposed to client code</li>
            <li>Variables are loaded from <code className="bg-blue-100 px-1 rounded">frontend/.env</code></li>
            <li>Restart dev server after changing <code className="bg-blue-100 px-1 rounded">.env</code> file</li>
            <li>Check browser console for detailed Firebase diagnostics</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

