export type ChatRole = 'user' | 'assistant';

export interface ChatMessageDto {
  role: ChatRole;
  content: string;
}

export interface ChatRequestDto {
  message: string;
  history?: ChatMessageDto[];
}
