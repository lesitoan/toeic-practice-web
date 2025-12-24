import { PREFIX_SERVICES } from '@/constants/services';
import requestHelpers from '@/utils/requestHelper';

const testServices = {
  getListTest: async (params) => {
    return requestHelpers.get('/api/v1/test_run', '/public', params);
  },
  startSession: async (data) => {
    // bắt đầu một phiên làm bài thi
    const { test_run_id, start_pad = 0, end_pad = 0 } = data;
    if (!test_run_id) throw new Error('test_run_id is required to start test session');
    return requestHelpers.post(PREFIX_SERVICES.test_session_service_v1, '/start', {
      test_run_id,
      start_pad,
      end_pad,
    });
  },
  getTestDetailBySession: async (sessionId) => {
    // lấy ra đề thi chi tiết theo session
    return requestHelpers.get(PREFIX_SERVICES.test_session_service_v1, `/${sessionId}`);
  },

  submitTestSession: async (sessionId) => {
    // nộp bài thi
    return requestHelpers.post(PREFIX_SERVICES.test_session_service_v1, `/${sessionId}/submit`);
  },
};

export default testServices;
