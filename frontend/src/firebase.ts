import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAnalytics, Analytics, isSupported } from 'firebase/analytics';

// Firebase configuration error class
export class FirebaseConfigError extends Error {
  constructor(message: string, public missingVars: string[]) {
    super(message);
    this.name = 'FirebaseConfigError';
  }
}

// Complete diagnostic function for Firebase environment variables
const diagnoseFirebaseEnv = (): {
  allVars: Record<string, { value: string | undefined; status: 'set' | 'missing' | 'empty' }>;
  requiredVars: string[];
  missingVars: string[];
  isValid: boolean;
} => {
  // Get all VITE_FIREBASE_* variables from import.meta.env
  const env = import.meta.env;
  
  // Define all Firebase environment variables (required and optional)
  const firebaseEnvVars = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID',
    'VITE_FIREBASE_MEASUREMENT_ID', // Optional
  ];

  const requiredVars = firebaseEnvVars.filter(v => v !== 'VITE_FIREBASE_MEASUREMENT_ID');
  
  const allVars: Record<string, { value: string | undefined; status: 'set' | 'missing' | 'empty' }> = {};
  const missingVars: string[] = [];

  // Check each variable
  firebaseEnvVars.forEach((varName) => {
    const value = env[varName];
    let status: 'set' | 'missing' | 'empty';
    
    if (value === undefined || value === null) {
      status = 'missing';
      if (requiredVars.includes(varName)) {
        missingVars.push(varName);
      }
    } else if (typeof value === 'string' && value.trim() === '') {
      status = 'empty';
      if (requiredVars.includes(varName)) {
        missingVars.push(varName);
      }
    } else {
      status = 'set';
    }

    allVars[varName] = { value, status };
  });

  const isValid = missingVars.length === 0;

  return { allVars, requiredVars, missingVars, isValid };
};

// Print comprehensive diagnostic information
const printFirebaseDiagnostics = () => {
  const diagnostics = diagnoseFirebaseEnv();
  
  console.group('🔍 Firebase Environment Variables Diagnostic');
  console.log('═══════════════════════════════════════════════════════');
  
  // Print all Firebase environment variables
  Object.entries(diagnostics.allVars).forEach(([varName, { value, status }]) => {
    const isRequired = diagnostics.requiredVars.includes(varName);
    const icon = status === 'set' ? '✓' : '✗';
    const statusText = status === 'set' ? 'SET' : status === 'empty' ? 'EMPTY' : 'MISSING';
    const requiredText = isRequired ? '(REQUIRED)' : '(OPTIONAL)';
    
    console.log(`${icon} ${varName} ${requiredText}`);
    console.log(`   Status: ${statusText}`);
    
    if (status === 'set' && value) {
      // Show first/last few characters for security (don't log full API keys)
      if (varName.includes('API_KEY') || varName.includes('APP_ID')) {
        const masked = value.length > 10 
          ? `${value.substring(0, 6)}...${value.substring(value.length - 4)}`
          : '***';
        console.log(`   Value: ${masked} (masked for security)`);
      } else {
        console.log(`   Value: ${value}`);
      }
    } else {
      console.log(`   Value: undefined`);
    }
    console.log('');
  });
  
  console.log('═══════════════════════════════════════════════════════');
  console.log(`Required Variables: ${diagnostics.requiredVars.length}`);
  console.log(`Missing Variables: ${diagnostics.missingVars.length}`);
  console.log(`Configuration Valid: ${diagnostics.isValid ? '✅ YES' : '❌ NO'}`);
  console.log('═══════════════════════════════════════════════════════');
  console.groupEnd();

  return diagnostics;
};

// Get all Firebase configuration from environment variables
// Vite automatically loads .env files from the project root (frontend folder)
const getFirebaseConfig = (): {
  config: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId?: string;
  } | null;
  diagnostics: ReturnType<typeof diagnoseFirebaseEnv>;
} => {
  // Run diagnostics first
  const diagnostics = printFirebaseDiagnostics();

  // Throw error if any required variables are missing
  if (!diagnostics.isValid) {
    const errorMessage = `Firebase configuration is invalid. Missing required environment variables: ${diagnostics.missingVars.join(', ')}`;
    throw new FirebaseConfigError(errorMessage, diagnostics.missingVars);
  }

  // Read all values from import.meta.env (Vite's environment variable system)
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY as string;
  const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string;
  const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID as string;
  const storageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string;
  const messagingSenderId = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string;
  const appId = import.meta.env.VITE_FIREBASE_APP_ID as string;
  const measurementId = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID as string | undefined;

  // Build configuration object
  const config: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId?: string;
  } = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
  };

  // Add measurementId only if provided
  if (measurementId && measurementId.trim() !== '') {
    config.measurementId = measurementId;
  }

  return { config, diagnostics };
};

// Initialize Firebase services
let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let analytics: Analytics | null = null;
let configError: FirebaseConfigError | null = null;

// Initialize Firebase App, Auth, and Firestore synchronously
try {
  const { config, diagnostics } = getFirebaseConfig();

  if (!config) {
    throw new FirebaseConfigError('Firebase configuration is null', diagnostics.missingVars);
  }

  // Initialize Firebase App
  app = initializeApp(config);
  console.log('✅ Firebase App initialized');

  // Initialize Authentication
  auth = getAuth(app);
  console.log('✅ Firebase Auth initialized');

  // Initialize Firestore
  db = getFirestore(app);
  console.log('✅ Firestore initialized');

  // Initialize Analytics asynchronously only if supported
  if (config.measurementId && typeof window !== 'undefined') {
    // Use isSupported() to check if Analytics is available
    isSupported()
      .then((supported) => {
        if (supported && app) {
          try {
            analytics = getAnalytics(app);
            console.log('✅ Firebase Analytics initialized');
          } catch (analyticsError) {
            console.warn('⚠️ Firebase Analytics initialization failed:', analyticsError);
          }
        } else {
          console.warn('⚠️ Firebase Analytics is not supported in this environment');
        }
      })
      .catch((error) => {
        console.warn('⚠️ Firebase Analytics support check failed:', error);
      });
  } else if (config.measurementId) {
    console.warn('⚠️ Analytics measurementId provided but window is undefined (SSR)');
  }

  console.log('✅ Firebase core services initialized successfully');
} catch (error) {
  if (error instanceof FirebaseConfigError) {
    configError = error;
    console.error('❌ Firebase configuration error:', error.message);
    console.error('Missing variables:', error.missingVars);
    console.error('⚠️ Firebase will NOT be initialized. Please fix your .env file.');
  } else {
    console.error('❌ Firebase initialization error:', error);
  }
  
  // Set to null on error to prevent crashes
  app = null;
  auth = null;
  db = null;
  analytics = null;
}

// Export config error for UI error handling
export { configError };

// Export Firebase services
export { app };
export { auth };
export { db };
export { analytics };

