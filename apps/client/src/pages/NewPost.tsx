import CreatePost from '../components/CreatePost';
import Layout from '../components/Layout';

export default function NewPost() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-8">New Post</h1>
      <CreatePost />
    </Layout>
  );
}
