// function to flatten questions from testSessionSelected
export const flattenQuestions = (testSessionSelected) => {
  if (!testSessionSelected?.parts) return { questions: [], questionsByPosition: {} };

  const questions = [];
  const questionsByPosition = {};

  testSessionSelected.parts.forEach((part) => {
    part.items?.forEach((item) => {
      if (item.kind === 'single' && item.question) {
        const question = {
          ...item.question,
          part: part.part,
          passage: null,
          itemKind: 'single',
        };
        questions.push(question);
        questionsByPosition[question.position] = question;
      } else if (item.kind === 'passage' && item.questions) {
        item.questions.forEach((question) => {
          const questionWithPassage = {
            ...question,
            part: part.part,
            passage: item.passage,
            itemKind: 'passage',
            positionStart: item.position_start,
            positionEnd: item.position_end,
          };
          questions.push(questionWithPassage);
          questionsByPosition[question.position] = questionWithPassage;
        });
      }
    });
  });

  // Sort by position
  questions.sort((a, b) => a.position - b.position);

  return { questions, questionsByPosition };
};
