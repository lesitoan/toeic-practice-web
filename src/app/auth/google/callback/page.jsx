'use client';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function GoogleCallbackPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get tokens from URL query parameters
    const accessToken = searchParams.get('access_token');
    const refreshToken = searchParams.get('refresh_token');

    if (accessToken && refreshToken) {
      // Send tokens to parent window via postMessage
      if (window.opener) {
        window.opener.postMessage(
          {
            type: 'GOOGLE_AUTH_SUCCESS',
            accessToken,
            refreshToken,
          },
          window.location.origin
        );

        // Close popup after sending message
        setTimeout(() => {
          window.close();
        }, 500);
      }
    } else {
      // Try to parse from body if backend returns JSON
      try {
        const bodyText = document.body.textContent;
        if (bodyText) {
          const data = JSON.parse(bodyText);
          if (data.access_token && data.refresh_token) {
            if (window.opener) {
              window.opener.postMessage(
                {
                  type: 'GOOGLE_AUTH_SUCCESS',
                  accessToken: data.access_token,
                  refreshToken: data.refresh_token,
                },
                window.location.origin
              );

              setTimeout(() => {
                window.close();
              }, 500);
            }
          }
        }
      } catch (error) {
        console.error('Failed to parse auth response:', error);
      }
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-700">Đang xử lý đăng nhập...</p>
      </div>
    </div>
  );
}
