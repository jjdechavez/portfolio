import { ObjectId } from 'bson';
import { MongoHelper } from './mongo-helper';

export async function getProjectIds() {
  await MongoHelper.connect();
  const projectCollection = await MongoHelper.getCollection('projects');
  const projectCursor = projectCollection.find().project({ _id: 1 });
  const projectIds = await projectCursor.toArray();

  return projectIds.map((project) => {
    return {
      params: {
        id: project._id,
      },
    };
  });
}

export async function getProject(id: ObjectId) {
  await MongoHelper.connect();
  const projectCollection = await MongoHelper.getCollection('projects');
  const projectCursor = projectCollection.find({ _id: id });
  const project = await projectCursor.toArray();

  return {
    project: project[0],
  };
}

export async function getProjects() {
  await MongoHelper.connect();
  const projectCollection = await MongoHelper.getCollection('projects');
  const projectCursor = projectCollection.find().limit(10);
  const projects = await projectCursor.toArray();

  return {
    projects,
  };
}
