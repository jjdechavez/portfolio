import { Collection, ObjectId } from 'mongodb';

export type Company = {
  _id: ObjectId;
  name: string;
  about: string;
  location: string;
  url?: string;
  projects: ObjectId[];
};

export type CompanyCollection = Collection<Company>;
