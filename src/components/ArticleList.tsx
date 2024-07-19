import { useSelector } from 'react-redux';
import { RootState  } from '../data/store';
import ArticleCard from './ArticleCard';
import { Article } from '../types/Article';
import LoadingSkeleton from 'src/utilities/LoadingSkeleton';

const ArticleList = () => {
  const articlesState = useSelector((state: RootState) => state.articles);

  if (articlesState.fetchStatus === 'loading') {
    return <LoadingSkeleton/>;
  }

  if (articlesState.fetchStatus === 'error') {
    return <div className="flex items-center p-4 mb-4 text-sm text-red-800 border rounded-lg bg-red-50 dark:border-red-800 dark:text-red-800" role="alert">
    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
    </svg>
    <span className="sr-only">Info</span>
    <div><span className="font-bold">Error fetching articles.</span> Please try again later.</div>
  </div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12">
      {articlesState.data.map((article: Article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
};

export default ArticleList;
