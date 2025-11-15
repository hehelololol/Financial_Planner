# Firebase Setup Guide

This guide will help you set up Firebase Authentication and Firestore for the Portfolio Planning SaaS application.

## Prerequisites

- A Google account
- Node.js and npm installed
- Basic understanding of Firebase

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard:
   - Enter a project name (e.g., "portfolio-planning")
   - Enable/disable Google Analytics (optional)
   - Click "Create project"

## Step 2: Enable Authentication

1. In your Firebase project, go to **Authentication** in the left sidebar
2. Click **Get started**
3. Click on the **Sign-in method** tab
4. Click on **Email/Password**
5. Enable the first toggle (Email/Password)
6. Click **Save**

## Step 3: Set Up Firestore Database

1. In your Firebase project, go to **Firestore Database** in the left sidebar
2. Click **Create database**
3. Choose **Start in test mode** (for development) or **Start in production mode** (for production)
4. Select a location for your database (choose the closest to your users)
5. Click **Enable**

### Firestore Security Rules (Important!)

After setting up Firestore, you need to configure security rules. Go to the **Rules** tab and replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own portfolios
    match /users/{userId}/portfolios/{portfolioId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

Click **Publish** to save the rules.

## Step 4: Get Firebase Configuration

1. In your Firebase project, click the gear icon ⚙️ next to "Project Overview"
2. Select **Project settings**
3. Scroll down to **Your apps** section
4. Click the **Web** icon (`</>`) to add a web app
5. Register your app with a nickname (e.g., "Portfolio Planning Web")
6. Copy the Firebase configuration object

## Step 5: Configure Environment Variables

1. In the `frontend` directory, create a `.env` file (if it doesn't exist)
2. Add the following environment variables:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Replace the placeholder values with the actual values from your Firebase config object.

**Important:** Never commit your `.env` file to version control. It should already be in `.gitignore`.

## Step 6: Install Dependencies

The Firebase dependencies should already be installed, but if not, run:

```bash
cd frontend
npm install firebase react-router-dom react-hot-toast
```

## Step 7: Test the Setup

1. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

2. Navigate to `http://localhost:3000` (or the port shown in the terminal)
3. Try creating an account on the signup page
4. After signing up, you should be redirected to the dashboard
5. Create a portfolio and try saving it
6. Check the "Saved Portfolios" page to verify it was saved

## Troubleshooting

### "Firebase: Error (auth/configuration-not-found)"
- Make sure your `.env` file is in the `frontend` directory
- Verify all environment variables are set correctly
- Restart the development server after changing `.env` files

### "Missing or insufficient permissions"
- Check your Firestore security rules
- Make sure the rules allow authenticated users to read/write their own data
- Verify you're logged in (check the user menu in the navbar)

### "Firebase: Error (auth/email-already-in-use)"
- This is normal if you try to sign up with an email that already exists
- Use the login page instead, or try a different email

## Production Considerations

1. **Firestore Security Rules**: Update your rules for production to be more restrictive
2. **Authentication**: Consider adding additional sign-in methods (Google, GitHub, etc.)
3. **Environment Variables**: Use a secure method to manage environment variables in production (e.g., Vercel, Netlify, or your hosting platform's environment variable system)
4. **Firebase Quotas**: Be aware of Firebase's free tier limits and upgrade if needed

## Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Authentication](https://firebase.google.com/docs/auth)

