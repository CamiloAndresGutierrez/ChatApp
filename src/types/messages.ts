export interface IMessage {
    id: number;
    content: string;
    deletedAt: string | null;
    conversationId: number;
    userId: 19;
    createdAt: string;
    updatedAt: string;
    [key: string]: any;
  }