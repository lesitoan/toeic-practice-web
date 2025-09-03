export const parts = [
  { id: 1, name: 'Part 1', questions: 6, startQ: 1, endQ: 6, type: 'Listening' },
  { id: 2, name: 'Part 2', questions: 25, startQ: 7, endQ: 31, type: 'Listening' },
  { id: 3, name: 'Part 3', questions: 39, startQ: 32, endQ: 70, type: 'Listening' },
  { id: 4, name: 'Part 4', questions: 30, startQ: 71, endQ: 100, type: 'Listening' },
  { id: 5, name: 'Part 5', questions: 30, startQ: 101, endQ: 130, type: 'Reading' },
  { id: 6, name: 'Part 6', questions: 16, startQ: 131, endQ: 146, type: 'Reading' },
  { id: 7, name: 'Part 7', questions: 54, startQ: 147, endQ: 200, type: 'Reading' },
];

export const sampleQuestions = {
  // Part 1 - Photographs
  1: {
    type: 'image',
    image: 'https://via.placeholder.com/400x300/e2e8f0/64748b?text=Office+Meeting',
    options: ['A', 'B', 'C', 'D'],
  },
  2: {
    type: 'image',
    image: 'https://via.placeholder.com/400x300/e2e8f0/64748b?text=Construction+Site',
    options: ['A', 'B', 'C', 'D'],
  },
  3: {
    type: 'image',
    image: 'https://via.placeholder.com/400x300/e2e8f0/64748b?text=Restaurant',
    options: ['A', 'B', 'C', 'D'],
  },
  4: {
    type: 'image',
    image: 'https://via.placeholder.com/400x300/e2e8f0/64748b?text=Airport',
    options: ['A', 'B', 'C', 'D'],
  },
  5: {
    type: 'image',
    image: 'https://via.placeholder.com/400x300/e2e8f0/64748b?text=Park',
    options: ['A', 'B', 'C', 'D'],
  },
  6: {
    type: 'image',
    image: 'https://via.placeholder.com/400x300/e2e8f0/64748b?text=Library',
    options: ['A', 'B', 'C', 'D'],
  },

  // Part 2 - Question-Response (7-31)
  7: { type: 'audio', options: ['A', 'B', 'C'] },
  8: { type: 'audio', options: ['A', 'B', 'C'] },
  9: { type: 'audio', options: ['A', 'B', 'C'] },
  10: { type: 'audio', options: ['A', 'B', 'C'] },
  11: { type: 'audio', options: ['A', 'B', 'C'] },
  12: { type: 'audio', options: ['A', 'B', 'C'] },
  13: { type: 'audio', options: ['A', 'B', 'C'] },
  14: { type: 'audio', options: ['A', 'B', 'C'] },

  // Part 5 - Incomplete Sentences (101-130)
  101: {
    type: 'text',
    question: 'The new employee _______ to work early every day.',
    options: ['A. come', 'B. comes', 'C. coming', 'D. came'],
  },
  102: {
    type: 'text',
    question: 'Please submit your report _______ Friday.',
    options: ['A. by', 'B. in', 'C. at', 'D. on'],
  },
  103: {
    type: 'text',
    question: 'The meeting has been _______ until next week.',
    options: ['A. delayed', 'B. postponed', 'C. cancelled', 'D. rescheduled'],
  },
  104: {
    type: 'text',
    question: 'All employees must _______ their ID cards at all times.',
    options: ['A. wear', 'B. carry', 'C. show', 'D. present'],
  },
};
