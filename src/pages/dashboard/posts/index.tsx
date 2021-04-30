import Link from 'next/link';

export default function Posts() {
  return (
    <div>
      <h1>My Posts</h1>
      <Link href={`/dashboard`}>
        <a>Dashboard</a>
      </Link>
    </div>
  );
}
