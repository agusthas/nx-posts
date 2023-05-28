import { Link } from 'wouter';
import DocumentPlusIcon from './DocumentPlusIcon';

export default function Header() {
  return (
    <header className="py-3 px-6 border-b border-b-gray-100 bg-white">
      <div className="flex items-center justify-between">
        <Link href="/" className="font-semibold">
          Posts
        </Link>
        <Link
          href="/new"
          className="bg-black text-white font-medium px-3.5 py-2 rounded hover:bg-gray-800 active:bg-gray-700 flex items-center"
        >
          <DocumentPlusIcon iconSize="sm" className="w-5 h-5 mr-2" />
          New posts
        </Link>
      </div>
    </header>
  );
}
