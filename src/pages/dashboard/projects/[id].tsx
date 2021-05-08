import { getProject, getProjectIds } from '@/infra/db';
import React from 'react';

export default function Project({ project }) {
  console.log(project);

  return <div>sample</div>;
}

export async function getStaticPaths() {
  const res = await fetch('http://localhost:3000/api/projects');
  const { projects } = await res.json();

  const paths = projects.map((project) => {
    return {
      params: {
        id: project._id,
      },
    };
  });
  console.log('paths', projects);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  console.log(params);
  const project = await getProject(params.id);
  console.log(project);
  return {
    props: {
      project,
    },
  };
}
