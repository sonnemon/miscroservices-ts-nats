export enum Subjects {
  CategoryCreated = 'category:created',
  CategoryUpdated = 'category:updated',
}

export interface CategoryCreatedEvent {
  subject: Subjects.CategoryCreated;
  data: {
    id: string;
    name: string;
    version: number;
  };
}

export interface CategoryUpdatedEvent {
  subject: Subjects.CategoryUpdated;
  data: {
    id: string;
    name: string;
    version: number;
  };
}
