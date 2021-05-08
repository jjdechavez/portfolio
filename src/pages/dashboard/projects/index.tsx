import Link from 'next/link';
import { fetchServer } from '@/presentation/helpers/fetchServer';

export default function Projects({ projects }) {
  // const data = useProjectIds();

  console.log('projects:', projects);
  return (
    <div>
      <h1>My Projects</h1>
      <Link href={`/dashboard`}>
        <a>Dashboard</a>
      </Link>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetchServer('projects');
  const projects = await res.json();

  return {
    props: {
      projects,
    },
  };
}
