interface Question {
  id: number;
  question?: string;
  image?: string; // URL của hình ảnh liên quan đến câu hỏi
  options: string[]; // Các lựa chọn A, B, C, D
  answer: number; // Đáp án đúng (VD: 2), index của options
}

interface Part2Question {
  id: number;
  // Không có question text vì chỉ nghe audio
  // Không có options vì không hiển thị
  answer: number; // 1, 2, hoặc 3 (A, B, C)
}

interface Blank {
  options: string[]; // 4 lựa chọn (A, B, C, D)
  answer: number; // Đáp án đúng (VD: 2), index của options
}

interface Conversation {
  id: number; // ID của hội thoại
  questions: Question[]; // Danh sách 3 câu hỏi
}

interface Talk {
  id: number; // ID của bài nói
  questions: Question[]; // Danh sách 3 câu hỏi
}

interface Part6Passage {
  id: number; // ID của passage
  content: string; // Nội dung đoạn văn (có chỗ trống)
  blanks: Blank[]; // Danh sách các chỗ trống
}

// Cấu trúc cho từng passage (đoạn văn) // part 7
interface Part7Passage {
  id: number; // ID của passage
  title?: string; // Tiêu đề (nếu có)
  content: string; // Nội dung đoạn văn
  questions: Question[]; // Danh sách câu hỏi liên quan đến passage
}

interface Part1 {
  audio: string; // URL của file audio
  questions: Question[];
}

interface Part2 {
  audio: string; // URL của file audio
  questions: Part2Question[];
}

interface Part3 {
  audio: string; // URL của file audio
  conversations: Conversation[]; // Danh sách các hội thoại
}

interface Part4 {
  audio: string;
  talks: Talk[]; // Danh sách các bài nói
}

interface Part5 {
  questions: Question[];
}

interface Part6 {
  passages: Part6Passage[]; // Danh sách các passage
}

interface Part7 {
  passages: Part7Passage[]; // Danh sách các passage
}

interface TOEICTest {
  id: number;
  title: string;
  duration: number; // Thời gian làm bài (phút)
  parts: {
    part1: Part1;
    part2: Part2;
    part3: Part3;
    part4: Part4;
    part5: Part5;
    part6: Part6;
    part7: Part7;
  };
  createdAt: string;
}
