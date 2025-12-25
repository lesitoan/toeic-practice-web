'use client';
import React, { useState, useEffect } from 'react';
import {
  ArrowLeftRight,
  Volume2,
  Search,
  Loader2,
  AlertCircle,
  History,
  Plus,
} from 'lucide-react';
import { Button, Input } from '@nextui-org/react';
import translatorVocaServices from '@/services/translatorVocaService';
import { AddVocaToCollectionPopup } from '@/components/popup/AddVocaToCollectionPopup';

const SEARCH_HISTORY_KEY = 'vocabulary_search_history';
const MAX_HISTORY_ITEMS = 10;

export default function VocabularyTranslatorSidebar() {
  const [inputText, setInputText] = useState('');
  const [translation, setTranslation] = useState(null);
  const [isVietnameseToEnglish, setIsVietnameseToEnglish] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showCollectionPopup, setShowCollectionPopup] = useState(false);

  // Load search history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Failed to parse search history:', error);
      }
    }
  }, []);

  // Save search history to localStorage
  const saveToHistory = (item) => {
    const newHistory = [item, ...searchHistory.filter((h) => h.id !== item.id)].slice(
      0,
      MAX_HISTORY_ITEMS
    );
    setSearchHistory(newHistory);
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
  };

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);

    const searchTerm = inputText.toLowerCase().trim();
    const res = await translatorVocaServices.translateText(
      searchTerm,
      isVietnameseToEnglish ? 'vi|en' : 'en|vi'
    );
    const translatedText = res?.responseData?.translatedText;

    if (translatedText) {
      setTranslation({
        input: inputText,
        translation: translatedText,
        isVietnameseToEnglish,
      });

      // Save to history
      const historyItem = {
        id: Date.now(),
        input: inputText,
        translation: translatedText,
        timestamp: new Date().toISOString(),
        direction: isVietnameseToEnglish ? 'vi-en' : 'en-vi',
      };
      saveToHistory(historyItem);
    } else {
      setTranslation({
        error: 'Không tìm thấy từ này trong từ điển',
        input: inputText,
      });
    }

    setIsLoading(false);
  };

  const toggleLanguage = () => {
    setIsVietnameseToEnglish(!isVietnameseToEnglish);
    setInputText('');
    setTranslation(null);
  };

  const playPronunciation = (text) => {
    if ('speechSynthesis' in window) {
      // Determine which text is English
      const englishText = isVietnameseToEnglish ? translation?.translation : translation?.input;
      
      const utterance = new SpeechSynthesisUtterance(englishText || text);
      utterance.lang = 'en-US'; // Always use English
      speechSynthesis.speak(utterance);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleTranslate();
    }
  };

  const handleHistoryClick = (item) => {
    setInputText(item.input);
    setTranslation({
      input: item.input,
      translation: item.translation,
      isVietnameseToEnglish: item.direction === 'vi-en',
    });
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem(SEARCH_HISTORY_KEY);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">Tra cứu từ vựng</h3>
        <p className="text-sm text-gray-600">Dịch nhanh Việt-Anh</p>
      </div>

      {/* Language Toggle */}
      <div className="flex items-center justify-center">
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          <Button
            size="sm"
            color={isVietnameseToEnglish ? 'primary' : 'default'}
            className="text-xs"
          >
            Việt
          </Button>
          <button
            onClick={toggleLanguage}
            className="mx-1 p-1 hover:bg-gray-200 rounded-full transition-colors"
          >
            <ArrowLeftRight className="w-4 h-4 text-gray-600" />
          </button>
          <Button
            size="sm"
            color={!isVietnameseToEnglish ? 'primary' : 'default'}
            className="text-xs"
          >
            Anh
          </Button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Input
          name="vocabulary"
          placeholder={isVietnameseToEnglish ? 'Nhập từ tiếng Việt...' : 'Enter English word...'}
          type="text"
          size="sm"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          classNames={{
            input: 'text-sm',
            inputWrapper: 'h-10',
          }}
        />
        <Button
          size="sm"
          isIconOnly
          onPress={handleTranslate}
          disabled={isLoading}
          className="absolute right-1 top-1/2 transform -translate-y-1/2 min-w-0 w-8 h-8"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Search className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Translation Result */}
      {translation && (
        <div className="bg-gray-50 rounded-lg p-3">
          {translation.error ? (
            <div className="flex items-center text-red-600 text-sm">
              <AlertCircle className="w-4 h-4 mr-2" />
              <span>{translation.error}</span>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 text-sm">{translation.input}</h4>
                  <p className="text-blue-600 font-semibold text-sm">{translation.translation}</p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => playPronunciation(translation.input)}
                    className="p-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setShowCollectionPopup(true)}
                    className="p-1.5 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                    title="Thêm vào bộ sưu tập"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Search History */}
      {searchHistory.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-800 text-sm flex items-center">
              <History className="w-4 h-4 mr-2" />
              Lịch sử đã tra
            </h4>
            <button
              onClick={clearHistory}
              className="text-xs text-red-600 hover:text-red-700"
            >
              Xóa
            </button>
          </div>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {searchHistory.map((item) => (
              <div
                key={item.id}
                onClick={() => handleHistoryClick(item)}
                className="flex justify-between items-start p-2 bg-white rounded cursor-pointer hover:bg-gray-100 transition-colors text-xs"
              >
                <div className="flex-1 min-w-0">
                  <span className="font-medium block truncate">{item.input}</span>
                  <span className="text-gray-500 block truncate">→ {item.translation}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add to Collection Popup */}
      <AddVocaToCollectionPopup
        isOpen={showCollectionPopup}
        onClose={() => setShowCollectionPopup(false)}
        word={{
          en: isVietnameseToEnglish ? translation?.translation : translation?.input,
          vi: isVietnameseToEnglish ? translation?.input : translation?.translation,
        }}
      />
    </div>
  );
}
