export interface Note {
    _id: string;
    Title: string;
    Description: string;
    isArchive: boolean;
    isTrash: boolean;
    color?: string;
  }
  
  export interface EventAction {
    action: 'add' | 'archive' | 'trash' | 'color' | 'edit';
    data: Note;
  }
  
  export interface ApiResponse<T> {
    data: T;
    message: string;
    status: number;
  }
  