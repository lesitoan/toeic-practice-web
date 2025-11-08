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

export const TEST_DEMO = {
  template: {
    name: 'TOEIC Full Mock Test v1',
    description:
      'Đề thi TOEIC giả lập 7 Parts (Listening & Reading) - Dựa trên cấu trúc người dùng cung cấp.',
    status: 'active',
  },
  page: 1,
  limit: 200,
  total_groups: 20,
  total_questions: 200,
  total_questions_current_page: 200,
  parts: [
    {
      part: 1,
      description: 'Photo Description (10 Questions)',
      items: [
        {
          kind: 'single',
          part: 1,
          question: {
            id: 1,
            position: 1,
            requires_passage: false,
            audio_url: 'fake_audio_p1q1.mp3',
            image_url: 'fake_image_p1q1.jpg',
            answers: [
              { text: 'A', id: 101 },
              { text: 'B', id: 102 },
              { text: 'C', id: 103 },
              { text: 'D', id: 104 },
            ],
          },
        },
        {
          kind: 'single',
          part: 1,
          question: {
            id: 2,
            position: 2,
            requires_passage: false,
            audio_url: 'fake_audio_p1q2.mp3',
            image_url: 'fake_image_p1q2.jpg',
            answers: [
              { text: 'A', id: 105 },
              { text: 'B', id: 106 },
              { text: 'C', id: 107 },
              { text: 'D', id: 108 },
            ],
          },
        },
      ],
    },
    {
      part: 2,
      description: 'Question-Response (30 Questions)',
      items: [
        {
          kind: 'single',
          part: 2,
          question: {
            id: 11,
            position: 11,
            requires_passage: false,
            audio_url: 'fake_audio_p2q11.mp3',
            answers: [
              { text: 'A', id: 111 },
              { text: 'B', id: 112 },
              { text: 'C', id: 113 },
            ],
          },
        },
      ],
    },
    {
      part: 3,
      description: 'Conversations (30 Questions, 10 Groups of 3)',
      items: [
        {
          kind: 'passage',
          part: 3,
          passage: {
            id: 51,
            type: 'AUDIO',
            audio_url: 'fake_audio_p3group1.mp3',
          },
          position_start: 41,
          position_end: 43,
          questions: [
            {
              id: 41,
              position: 41,
              answers: [{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }],
            },
            {
              id: 42,
              position: 42,
              answers: [{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }],
            },
            {
              id: 43,
              position: 43,
              answers: [{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }],
            },
          ],
        },
      ],
    },
    {
      part: 4,
      description: 'Talks (30 Questions, 10 Groups of 3)',
      items: [
        {
          kind: 'passage',
          part: 4,
          passage: {
            id: 61,
            type: 'AUDIO',
            audio_url: 'fake_audio_p4group1.mp3',
          },
          position_start: 71,
          position_end: 73,
          questions: [
            {
              id: 71,
              position: 71,
              answers: [{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }],
            },
            {
              id: 72,
              position: 72,
              answers: [{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }],
            },
            {
              id: 73,
              position: 73,
              answers: [{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }],
            },
          ],
        },
      ],
    },
    {
      part: 5,
      description: 'Incomplete Sentences (30 Questions)',
      items: [
        {
          kind: 'single',
          part: 5,
          question: {
            id: 101,
            position: 101,
            text_content:
              'The manager agreed to --------- the delivery date by one week due to unforeseen delays.',
            answers: [
              { text: 'reschedule', id: 757 },
              { text: 'reschedules', id: 758 },
              { text: 'rescheduled', id: 759 },
              { text: 'to reschedule', id: 760 },
            ],
          },
        },
        {
          kind: 'single',
          part: 5,
          question: {
            id: 102,
            position: 102,
            text_content:
              'The department will --------- its budget proposal before the end of the quarter.',
            answers: [
              { text: 'will finalize', id: 749 },
              { text: 'finalizes', id: 750 },
              { text: 'finalizing', id: 751 },
              { text: 'finalized', id: 752 },
            ],
          },
        },
        {
          kind: 'single',
          part: 5,
          question: {
            id: 103,
            position: 103,
            text_content:
              'The new employee has demonstrated excellent performance --------- the last three months.',
            answers: [
              { text: 'since', id: 761 },
              { text: 'for', id: 762 },
              { text: 'during', id: 763 },
              { text: 'from', id: 764 },
            ],
          },
        },
        {
          kind: 'single',
          part: 5,
          question: {
            id: 104,
            position: 104,
            text_content:
              'The team will meet --------- 2:00 P.M. to discuss the marketing strategy.',
            answers: [
              { text: 'on', id: 753 },
              { text: 'at', id: 754 },
              { text: 'by', id: 755 },
              { text: 'in', id: 756 },
            ],
          },
        },
      ],
    },
    {
      part: 6,
      description: 'Text Completion (16 Questions, 4 Groups of 4)',
      items: [
        {
          kind: 'passage',
          part: 6,
          passage: {
            id: 71,
            type: 'TEXT',
            content_preview:
              'Email: Dear Ms. Choi, We are pleased to announce a new policy that will allow employees to work remotely up to two days a week. This change is part of our effort to [131] work-life balance...',
          },
          position_start: 131,
          position_end: 134,
          questions: [
            {
              id: 131,
              position: 131,
              answers: [{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }],
            },
            {
              id: 132,
              position: 132,
              answers: [{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }],
            },
            {
              id: 133,
              position: 133,
              answers: [{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }],
            },
            {
              id: 134,
              position: 134,
              answers: [{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }],
            },
          ],
        },
      ],
    },
    {
      part: 7,
      description: 'Reading Comprehension (54 Questions)',
      items: [
        {
          kind: 'passage',
          part: 7,
          passage: {
            id: 147,
            type: 'TEXT',
            content:
              'From: Facilities Team\nSubject: Planned Network Maintenance\nDate: Friday, May 16\n\nWe will perform a 2-hour network maintenance on Saturday, May 17 from 8:00 to 10:00 a.m. Internet access and internal systems will be unavailable during this time. Please save your work and log off all systems before leaving on Friday. Thank you for your cooperation.',
            content_preview:
              'From: Facilities Team\nSubject: Planned Network Maintenance\nDate: Friday, May 16\n\nWe will perform a 2-hour network maintenance on Saturday, May 17 from 8:00 to 10:00 a.m. Internet access and internal s',
          },
          position_start: 147,
          position_end: 149,
          questions: [
            {
              id: 182,
              position: 147,
              text_content: 'What is the main purpose of the memo?',
              requires_passage: true,
              answers: [
                { text: 'To inform staff about network maintenance.', id: 725 },
                { text: 'To announce a new internet provider.', id: 726 },
                { text: 'To invite staff to a workshop.', id: 727 },
                { text: 'To report a security incident.', id: 728 },
              ],
            },
            {
              id: 183,
              position: 148,
              text_content: 'When will the maintenance take place?',
              requires_passage: true,
              answers: [
                { text: 'Saturday, May 17, 8:00–10:00 a.m.', id: 729 },
                { text: 'Friday, May 16, 8:00–10:00 a.m.', id: 730 },
                { text: 'Saturday, May 17, 10:00–12:00 a.m.', id: 731 },
                { text: 'Sunday, May 18, 8:00–10:00 a.m.', id: 732 },
              ],
            },
            {
              id: 184,
              position: 149,
              text_content: 'What are staff members asked to do on Friday?',
              requires_passage: true,
              answers: [
                { text: 'Save work and log off on Friday.', id: 733 },
                { text: 'Arrive early on Saturday.', id: 734 },
                { text: 'Update their antivirus software.', id: 735 },
                { text: 'Call the facilities team to confirm.', id: 736 },
              ],
            },
          ],
        },
        {
          kind: 'passage',
          part: 7,
          passage: {
            id: 150,
            type: 'TEXT',
            content:
              'Grandline Fitness — Membership Promotion\n\nSign up for a 12-month plan before June 30 and get one free personal training session and a 10% discount on accessories. The gym opens at 5:30 a.m. on weekdays and 7:00 a.m. on weekends.',
            content_preview:
              'Grandline Fitness — Membership Promotion\n\nSign up for a 12-month plan before June 30 and get one free personal training session and a 10% discount on accessories. The gym opens at 5:30 a.m. on weekday',
          },
          position_start: 150,
          position_end: 152,
          questions: [
            {
              id: 185,
              position: 150,
              text_content: 'What is one benefit of the 12-month plan promotion?',
              requires_passage: true,
              answers: [
                { text: 'One free personal training session.', id: 737 },
                { text: 'Two free months of membership.', id: 738 },
                { text: 'Free locker rental for a year.', id: 739 },
                { text: '25% off all classes.', id: 740 },
              ],
            },
            {
              id: 186,
              position: 151,
              text_content: 'What time does Grandline Fitness open on weekdays?',
              requires_passage: true,
              answers: [
                { text: '7:00 a.m.', id: 741 },
                { text: '5:30 a.m.', id: 742 },
                { text: '8:30 a.m.', id: 743 },
                { text: '6:00 a.m.', id: 744 },
              ],
            },
            {
              id: 187,
              position: 152,
              text_content: 'When must customers sign up to receive the special offers?',
              requires_passage: true,
              answers: [
                { text: 'Before June 30.', id: 745 },
                { text: 'After July 15.', id: 746 },
                { text: 'Before May 16.', id: 747 },
                { text: 'On the first of every month.', id: 748 },
              ],
            },
          ],
        },
      ],
    },
  ],
};
