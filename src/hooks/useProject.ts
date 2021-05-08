import useSWR from 'swr';

export default function useProjectIds() {
  const { data } = useSWR('/api/projects');

  console.log('projects', data);
  return { data };
}
