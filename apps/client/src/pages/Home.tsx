import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'wouter';
import Layout from '../components/Layout';
import DeleteIcon from '../components/DeleteIcon';

export default function Home() {
  const queryClient = useQueryClient();
  const { data: posts, status } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data } = await axios.get('/api/posts');
      return data as { id: number; title: string }[];
    },
  });

  const mutation = useMutation({
    mutationFn: async (id: number) => {
      return await axios.delete(`/api/posts/${id}`);
    },
    onSuccess: () => {
      alert('Post deleted!');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
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
            <li
              key={post.id}
              className="p-6 bg-white border border-gray-200 rounded shadow"
            >
              <Link
                href={`/posts/${post.id}`}
                className="inline-block mb-3 text-xl font-bold tracking-tight text-gray-900"
              >
                {post.title}
              </Link>

              <div
                className="flex items-center justify-between"
                style={{ marginTop: 'auto' }}
              >
                <Link
                  href={`/posts/${post.id}`}
                  className="text-sm font-medium text-gray-900"
                >
                  View &rarr;
                </Link>

                <button
                  className="text-red-500 text-sm flex-grow-0 flex-shrink-0 mb-1 opacity-60 hover:opacity-100 transition-opacity duration-100"
                  onClick={() => mutation.mutate(post.id)}
                >
                  <span className="sr-only">Delete file</span>
                  <DeleteIcon iconSize="md" className="w-6 h-6" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Layout>
  );
}
