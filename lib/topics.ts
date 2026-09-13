export interface Topic {
  id: string;
  text: string;
  category: 'Technology' | 'Society' | 'Education' | 'Business' | 'Lifestyle' | 'Culture' | 'Environment' | 'Relationships' | 'Hypothetical' | 'Opinion';
}

export const TOPICS: Topic[] = [
  { id: '1', text: 'Should university education be free for everyone?', category: 'Education' },
  { id: '2', text: 'Is artificial intelligence making creativity easier or harder?', category: 'Technology' },
  { id: '3', text: 'Would you work four days a week if you earned the same salary?', category: 'Business' },
  { id: '4', text: 'Are smartphones improving or degrading our quality of life?', category: 'Technology' },
  { id: '5', text: 'Should everyone learn how to write code?', category: 'Education' },
  { id: '6', text: 'Is failure necessary for long-term success?', category: 'Opinion' },
  { id: '7', text: 'Would you live on Mars if given a one-way ticket?', category: 'Hypothetical' },
  { id: '8', text: 'Is remote work better for company culture than office work?', category: 'Business' },
  { id: '9', text: 'Does modern social media do more harm than good to society?', category: 'Society' },
  { id: '10', text: 'Should single-use plastics be banned globally immediately?', category: 'Environment' }
];

export function getRandomTopic(): Topic {
  const index = Math.floor(Math.random() * TOPICS.length);
  return TOPICS[index];
}
