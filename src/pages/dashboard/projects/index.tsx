import Link from 'next/link';
import { fetchServer } from '@/presentation/helpers/fetchServer';
import Admin from '@/layouts/Admin';
import ProjectForm from '@/components/dashboard/projects/Form';
import Table from '@/components/dashboard/Table';
import ProjectTable from '@/components/dashboard/projects/Table';

export async function getStaticProps() {
  const res = await fetchServer('projects');
  const { projects } = await res.json();

  return {
    props: {
      projects,
    },
  };
}

export default function Projects({ projects }) {
  return (
    <div>
      <h1>My Projects</h1>
      <Link href={`/dashboard`}>
        <a>Dashboard</a>
      </Link>
      <div className="flex flex-wrap">
        <div className="w-full mb-12 px-4">
          <ProjectTable projects={projects} />
        </div>
        <div className="w-full lg:w-8/12 px-4">
          <ProjectForm />
        </div>
        <div className="w-full lg:w-4/12 px-4"></div>
      </div>
    </div>
  );
}

Projects.layout = Admin;
