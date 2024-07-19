import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';

import { Article } from '../types/Article';
import LoadingSkeleton from 'src/utilities/LoadingSkeleton';
import { setSelectedArticle } from '../data/articleSlice';

import './ArticleCard.css';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  const dispatch = useDispatch();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [image, setImage] = useState<null | string>(null);
  const imageUrl = article.media?.[0]?.['media-metadata']?.[1]?.url ?? null;

  useEffect(() => {
    const img = new Image();
    if(imageUrl){
      img.src = imageUrl;
      img.onload = () => {
        setImage(imageUrl)
        setImageLoaded(true)
      };
    }else{
      setImageLoaded(true)
    }
  }, [imageUrl]);

  const handleSelect = () => {
    dispatch(setSelectedArticle(article));
  };

  return (
    !imageLoaded ? (
      <LoadingSkeleton />
    ) : (
      <div role="status" className="bg-gray-100 flex flex-col max-w-sm p-4 border border-gray-200 rounded shadow-lg md:p-4 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
        <div className="flex items-center justify-center mb-4 bg-gray-300 rounded dark:bg-gray-700 h-44">
          {image === null ? (
            <svg className="w-10 h-fit text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
              <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
              <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
            </svg>
          ) : (
            <img src={image} alt="Article" className="w-full object-cover" />
          )}
        </div>
        <h1 className="text-left mb-4 strong font-bold dark:text-gray-300 line-clamp-2">{article.title}</h1>
        <p className="mb-4 text-left line-clamp-2 text-gray-700 dark:text-gray-400">{article.abstract}</p>
        <div className="flex items-center mt-auto mb-6">
          <p className="text-left line-clamp-1 text-gray-700 dark:text-gray-400">{article.byline}</p>
        </div>
        <div className="flex justify-between items-center text-gray-700 dark:text-gray-400 mb-2">
          <span>Posted: {format(new Date(article.published_date), 'MMM-dd-yyyy')}</span>
          <Link
            to={`/article/${article.id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleSelect}
            onKeyDown={handleSelect}
            data-testid="readLink"
          >
            Read more
          </Link>
        </div>
      </div>
    )
  );
};

export default ArticleCard;