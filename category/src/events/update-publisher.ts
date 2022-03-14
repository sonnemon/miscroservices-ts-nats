import { CategoryUpdatedEvent, Subjects } from '../interfaces';
import { Publisher } from './publisher';

export class CategoryUpdatedPublisher extends Publisher<CategoryUpdatedEvent> {
  subject: Subjects.CategoryUpdated = Subjects.CategoryUpdated;
}
