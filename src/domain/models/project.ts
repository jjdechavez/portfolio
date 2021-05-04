import { ObjectId } from 'mongodb';

export type Project = {
  _id: ObjectId;
  name: string;
  role: string;
  description: string;
  publish: boolean;
  url: string;
  assignDate: {
    start: Date;
    end: Date;
    ongoing: boolean;
  };
  technologies: string[];
  company: ObjectId;
};
