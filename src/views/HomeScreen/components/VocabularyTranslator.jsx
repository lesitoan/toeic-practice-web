import React, { useState, useEffect } from 'react';
import {
  ArrowLeftRight,
  Volume2,
  BookOpen,
  Star,
  Copy,
  Search,
  Loader2,
  AlertCircle,
  Heart,
  Plus,
} from 'lucide-react';
import { Button, Input } from '@nextui-org/react';
import translatorVocaServices from '@/services/translatorVocaService';

const VocabularyTranslator = () => {
  const [inputText, setInputText] = useState('');
  const [translation, setTranslation] = useState(null);
  const [isVietnameseToEnglish, setIsVietnameseToEnglish] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);

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

      const newHistoryItem = {
        id: Date.now(),
        input: inputText,
        translation: translatedText,
        timestamp: new Date(),
      };
      setSearchHistory((prev) => [newHistoryItem, ...prev.slice(0, 4)]);
    } else {
      setTranslation({
        error: 'Không tìm thấy từ này trong từ điển',
        input: inputText,
      });
    }

    setIsLoading(false);
  };

  const handleAddToCollection = () => {
    const wordToAdd = {
      en: isVietnameseToEnglish ? translation.translation : translation.input,
      vi: isVietnameseToEnglish ? translation.input : translation.translation,
    };
    // thêm từ vựng vào server

    //thêm vào bộ sưu tập
  };

  const toggleLanguage = () => {
    setIsVietnameseToEnglish(!isVietnameseToEnglish);
    setInputText('');
    setTranslation(null);
  };

  const playPronunciation = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = isVietnameseToEnglish ? 'en-US' : 'vi-VN';
      speechSynthesis.speak(utterance);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const addToFavorites = (word) => {
    const favorite = {
      id: Date.now(),
      input: word.input,
      translation: word.translation,
      language: isVietnameseToEnglish ? 'vi-en' : 'en-vi',
    };
    setFavorites((prev) => [favorite, ...prev]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleTranslate();
    }
  };

  return (
    <div className="mx-auto p-6 bg-bgSecondary shadow-lg rounded-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-h1">Từ điển Việt-Anh</h1>
        <p className="text-gray-600">Dịch từ vựng và tra cứu nghĩa nhanh chóng</p>
      </div>

      {/* Language Toggle */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          <Button color={`${isVietnameseToEnglish ? 'primary' : ''}`}>Việt</Button>
          <button
            onClick={toggleLanguage}
            className="mx-2 p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <ArrowLeftRight className="w-5 h-5 text-gray-600" />
          </button>
          <Button color={`${!isVietnameseToEnglish ? 'primary' : ''}`}>Anh</Button>
        </div>
      </div>

      {/* Search Input */}
      <div className="mb-8">
        <div className="relative">
          <Input
            name="vocabulary"
            placeholder={isVietnameseToEnglish ? 'Nhập từ tiếng Việt...' : 'Enter English word...'}
            type="text"
            color="primary"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            classNames={{
              base: 'h-12',
              input: 'text-md',
              inputWrapper: '!h-[300px]', // box input
            }}
          />
          <Button
            color=""
            onPress={handleTranslate}
            disabled={isLoading}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 p-2 disabled:opacity-50 transition-colors"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Translation Result */}
      {translation && (
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          {translation.error ? (
            <div className="flex items-center text-red-600">
              <AlertCircle className="w-5 h-5 mr-2" />
              <span>{translation.error}</span>
            </div>
          ) : (
            <div>
              {/* Main Translation */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{translation.input}</h3>
                  <div className="flex items-center mt-2 space-x-4">
                    <span className="text-lg text-blue-600 font-semibold">
                      {translation.translation}
                    </span>
                    {translation.pronunciation && (
                      <span className="text-gray-500">{translation.pronunciation}</span>
                    )}
                  </div>
                  {translation.partOfSpeech && (
                    <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-sm mt-2">
                      {translation.partOfSpeech}
                    </span>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => playPronunciation(inputText)}
                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => copyToClipboard(translation.translation)}
                    className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => addToFavorites(translation)}
                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    <Heart className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => handleAddToCollection()}
                    className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-5 h-5" />
                    Thêm vào danh sách
                  </button>
                </div>
              </div>

              {/* Examples */}
              {translation.examples && translation.examples.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Ví dụ
                  </h4>
                  <div className="space-y-2">
                    {translation.examples.map((example, index) => (
                      <div key={index} className="bg-white p-3 rounded border-l-4 border-blue-500">
                        <p className="text-gray-800">{example.en}</p>
                        <p className="text-gray-600 text-sm mt-1">{example.vi}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Synonyms */}
              {translation.synonyms && translation.synonyms.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
                    <Star className="w-4 h-4 mr-2" />
                    Từ đồng nghĩa
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {translation.synonyms.map((synonym, index) => (
                      <span
                        key={index}
                        className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm"
                      >
                        {synonym}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Search History and Favorites */}
      {(searchHistory.length > 0 || favorites.length > 0) && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Search History */}
          {searchHistory.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Lịch sử tìm kiếm</h3>
              <div className="space-y-2">
                {searchHistory.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setInputText(item.input)}
                    className="flex justify-between items-center p-2 bg-white rounded cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <div>
                      <span className="font-medium">{item.input}</span>
                      <span className="text-gray-500 ml-2">→ {item.translation}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Favorites */}
          {favorites.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Từ yêu thích</h3>
              <div className="space-y-2">
                {favorites.slice(0, 5).map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center p-2 bg-white rounded"
                  >
                    <div>
                      <span className="font-medium">{item.input}</span>
                      <span className="text-gray-500 ml-2">→ {item.translation}</span>
                    </div>
                    <Heart className="w-4 h-4 text-red-500 fill-current" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VocabularyTranslator;
