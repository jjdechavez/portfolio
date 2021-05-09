import { Project } from '@/domain/models';
import { ObjectId } from 'bson';

export function projectDocumentParse(document: Omit<Project, '_id'>) {
  return {
    ...document,
    company: new ObjectId(document.company),
    assignDate: {
      ...document.assignDate,
      start: new Date(document.assignDate.start),
      end:
        typeof document.assignDate.end === 'string'
          ? document.assignDate.end
          : new Date(document.assignDate.end),
    },
  };
}
