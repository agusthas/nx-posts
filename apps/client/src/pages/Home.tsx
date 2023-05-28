import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'wouter';
import Layout from '../components/Layout';

export default function Home() {
  const { data: posts, status } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data } = await axios.get('/api/posts');
      return data as { id: string; title: string }[];
    },
  });

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-8">Home</h1>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'error' && <p>Error :/</p>}
      {status === 'success' && (
        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {posts.map((post) => (
            <Link href={`/posts/${post.id}`} key={post.id}>
              <li className="border border-gray-200 rounded-md shadow-sm divide-y divide-gray-200 hover:bg-gray-200">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900">
                    {post.title}
                  </h2>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </Layout>
  );
}
