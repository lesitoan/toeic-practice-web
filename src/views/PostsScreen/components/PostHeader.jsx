import { WEB_TITLE } from '@/components/layouts/mainLayout/constants/constants';
import { TITLE_DESCRIPTION } from '../constants';

export default function PostHeader() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-h1">Bài viết từ {WEB_TITLE}</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">{TITLE_DESCRIPTION}</p>
        </div>
      </div>
    </div>
  );
}
