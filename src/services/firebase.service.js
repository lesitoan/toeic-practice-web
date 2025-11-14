import axios from 'axios';

const firebaseUrl = process.env.NEXT_PUBLIC_FIREBASE_URL;
const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const signInWithCustomTokenUrl =
  'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken';

const firebaseService = {
  getIdToken: async (customToken) => {
    const response = await axios.post(`${signInWithCustomTokenUrl}?key=${apiKey}`, {
      token: customToken,
      returnSecureToken: true,
    });
    return response?.data?.idToken;
  },

  /**
   * Update answer for a question in Firebase Realtime Database
   */
  updateAnswer: async (sessionId, questionId, answerId, idToken) => {
    if (!firebaseUrl || !sessionId || !questionId || !answerId || !idToken) {
      throw new Error('Missing required parameters for updateAnswer');
    }
    const url = `${firebaseUrl}/test_sessions/${sessionId}/answers.json?auth=${idToken}`;
    return axios.patch(url, { [questionId]: answerId });
  },

  getAnswers: async (sessionId, idToken) => {
    if (!firebaseUrl || !sessionId || !idToken) {
      throw new Error('Missing required parameters for getAnswers');
    }
    const url = `${firebaseUrl}/test_sessions/${sessionId}/answers.json?auth=${idToken}`;
    const response = await axios.get(url);
    return response?.data || {};
  },
};

export default firebaseService;
