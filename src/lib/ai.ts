/**
 * Future AI integration module for Moments by Deepjyoti.
 * This file prepares the platform to support Gemini API generation
 * of surprise website contents, story structure, messages, and timeline points.
 */

export interface AIGenerationInput {
  recipientName: string;
  senderName: string;
  occasion: string;
  relationship: string;
  style: string;
  rawDetails: string;
}

export interface AIGeneratedContent {
  introTitle: string;
  introSubtitle: string;
  mainLetter: string;
  timelineItems: Array<{
    title: string;
    description: string;
  }>;
  suggestedColors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
}

/**
 * Generates personalized text and color palettes for a surprise experience.
 * Currently returns beautifully written content using client-side rules,
 * ready to connect to a serverless API endpoint calling Google's Gemini models in production.
 */
export async function generateExperienceContent(input: AIGenerationInput): Promise<AIGeneratedContent> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const { recipientName, senderName, occasion, relationship, style, rawDetails } = input;

  // Let's create smart default copy based on the occasion and style
  let introTitle = `Hey ${recipientName}...`;
  let introSubtitle = `Someone created something beautiful for you.`;
  let mainLetter = `Dear ${recipientName},\n\nI wanted to make something truly unique for you to celebrate this occasion. Words often fall short of describing how much you mean to me, so I built this experience. I hope it brings a smile to your face.`;

  if (occasion.toLowerCase().includes('birthday')) {
    introSubtitle = `Before you continue, there's a special birthday surprise waiting.`;
    mainLetter = `Dear ${recipientName},\n\nHappy Birthday! Today is all about celebrating you, your laughter, and the wonderful warmth you bring into my life. Over the past year, we've shared so many laughs and memories. Here is to another year of great adventures!`;
  } else if (occasion.toLowerCase().includes('romantic') || occasion.toLowerCase().includes('love') || occasion.toLowerCase().includes('proposal')) {
    introSubtitle = `Every love story is special, but ours is my absolute favorite.`;
    mainLetter = `My dearest ${recipientName},\n\nFrom the moment you came into my life, everything changed for the better. You are my partner, my best friend, and my safe place. This site is a record of our small milestones, sunset walks, and the love we build together daily. I love you!`;
  } else if (occasion.toLowerCase().includes('friendship') || occasion.toLowerCase().includes('friend')) {
    introSubtitle = `Inside jokes, chaos, and memories — beautifully preserved.`;
    mainLetter = `Hey ${recipientName},\n\nWe've done some of the craziest, funniest things together, and I wouldn't trade it for anything. You're the best friend anybody could ask for, and I wanted to make sure our laughs are saved forever. Thanks for being you!`;
  }

  // If user provided raw details, prepend or use them to make it feel personalized
  if (rawDetails && rawDetails.trim().length > 0) {
    mainLetter += `\n\nI was just thinking about: "${rawDetails}". It's one of my favorite memories of us.`;
  }

  // Setup color palettes based on style
  let colors = {
    primary: '#3B82F6', // Deep navy / Electric Blue
    secondary: '#8B5CF6',
    background: '#F8FAFC',
    text: '#1E293B',
    accent: '#F59E0B',
  };

  switch (style.toLowerCase()) {
    case 'romantic':
      colors = {
        primary: '#EC4899',
        secondary: '#D946EF',
        background: '#FFF1F2',
        text: '#4C0519',
        accent: '#EF4444',
      };
      break;
    case 'cute':
      colors = {
        primary: '#F59E0B',
        secondary: '#EF4444',
        background: '#FEF3C7',
        text: '#78350F',
        accent: '#10B981',
      };
      break;
    case 'cinematic':
      colors = {
        primary: '#8B5CF6',
        secondary: '#3B82F6',
        background: '#FAF5FF',
        text: '#2E1065',
        accent: '#10B981',
      };
      break;
    case 'minimal':
      colors = {
        primary: '#1E293B',
        secondary: '#64748B',
        background: '#FFFFFF',
        text: '#0F172A',
        accent: '#0F172A',
      };
      break;
  }

  return {
    introTitle,
    introSubtitle,
    mainLetter,
    timelineItems: [
      {
        title: 'Where it all started',
        description: `How we met and clicked. A special chapter in our journey.`
      },
      {
        title: 'Growing closer',
        description: `Through the shared tea dates, sunset drives, and late-night calls.`
      },
      {
        title: 'Today & Beyond',
        description: `Looking forward to making so many more memories together.`
      }
    ],
    suggestedColors: colors
  };
}
