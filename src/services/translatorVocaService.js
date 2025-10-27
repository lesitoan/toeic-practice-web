import axios from 'axios';

const translatorVocaServices = {
  translateText: async (q, langpair) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_TRANSLATE}/get`, {
      params: { q, langpair },
    });
    return response.data;
  },
};

export default translatorVocaServices;
