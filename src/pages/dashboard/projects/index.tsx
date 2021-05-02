import Link from 'next/link';

export default function Projects() {
  return (
    <div>
      <h1>My Projects</h1>
      <Link href={`/dashboard`}>
        <a>Dashboard</a>
      </Link>
    </div>
  );
}
