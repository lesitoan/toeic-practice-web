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
   * @param {number} sessionId - The test session ID
   * @param {number} questionId - The question ID
   * @param {number} answerId - The selected answer ID
   * @param {string} idToken - Firebase ID token for authentication
   * @returns {Promise} Axios response
   */
  updateAnswer: async (sessionId, questionId, answerId, idToken) => {
    if (!firebaseUrl || !sessionId || !questionId || !answerId || !idToken) {
      throw new Error('Missing required parameters for updateAnswer');
    }

    const url = `${firebaseUrl}/test_sessions/${sessionId}/answers.json?auth=${idToken}`;

    // Use PATCH to update only the specific question, which will replace old value if exists
    return axios.patch(url, { [questionId]: answerId });
  },
};

export default firebaseService;
