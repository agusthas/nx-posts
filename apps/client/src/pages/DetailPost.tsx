import { useQuery } from '@tanstack/react-query';
import Layout from '../components/Layout';
import axios from 'axios';
import { Link } from 'wouter';

type DetailPostProps = {
  id: string;
};

export default function DetailPost(props: DetailPostProps) {
  const { id } = props;
  const { data: post, status } = useQuery({
    queryKey: ['posts', id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/posts/${id}`);
      return data as { id: string; title: string; content: string };
    },
  });

  return (
    <Layout>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'error' && <p>Error :/</p>}
      {status === 'success' && (
        <>
          <h1 className="text-2xl font-bold mb-8">{post.title}</h1>
          <div
            className="prose lg:prose-xl"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </>
      )}

      <Link href="/">
        <button className="px-4 py-2 bg-black hover:bg-gray-800 active:bg-black text-white rounded font-medium mt-8">
          Back
        </button>
      </Link>
    </Layout>
  );
}
