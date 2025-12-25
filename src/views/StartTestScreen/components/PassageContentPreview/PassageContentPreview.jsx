export default function PassageContentPreview({ passage }) {
  if (!passage || !passage.content_preview) {
    return null;
  }

  const { type, content_preview } = passage;

  switch (type) {
    case 'IMAGE':
      return (
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex justify-center">
            <img
              src={content_preview}
              alt="Question Group Content"
              className="max-w-full h-auto max-h-96 object-contain rounded-lg shadow-sm"
            />
          </div>
        </div>
      );

    case 'TEXT':
      return (
        <div className="mb-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="text-gray-800 font-medium whitespace-pre-wrap">
            {content_preview}
          </div>
        </div>
      );

    case 'AUDIO': {
      const trimmedContent = content_preview?.trim() || '';
      const isAudioUrl = trimmedContent.startsWith('http://') || trimmedContent.startsWith('https://');

      return (
        <div className="mb-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
          {isAudioUrl ? (
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-2 text-purple-700">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                </svg>
                <span className="text-sm font-medium">Audio sẽ được phát tự động</span>
              </div>
              <audio 
                controls 
                className="w-full max-w-2xl"
                preload="metadata"
              >
                <source src={trimmedContent} type="audio/mpeg" />
                <source src={trimmedContent} type="audio/wav" />
                <source src={trimmedContent} type="audio/ogg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          ) : (
            <div className="text-gray-800 whitespace-pre-wrap">
              {content_preview}
            </div>
          )}
        </div>
      );
    }

    default:
      return null;
  }
}
