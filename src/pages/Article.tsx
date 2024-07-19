import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { RootState } from '../data/store';  
import LoadingSpinner from 'src/utilities/LoadingSpinner';

const Article = () => {
  const selectedArticle = useSelector((state: RootState) => state.article).selectedArticle;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [image, setImage] = useState<null|string>(null);

  const imageUrl = selectedArticle?.media?.[0]?.['media-metadata']?.[2]?.url ?? null;

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
  }, [imageUrl,selectedArticle]);
  

  return selectedArticle ? (
    <div className="container px-4">
      <div className="mx-auto max-w-2xl bg-white dark:bg-gray-900 border border-gray-200 rounded-lg shadow  dark:border-gray-700">
        <div className="flex items-center justify-center mb-4 bg-gray-300 rounded dark:bg-gray-700
          min-h-58 md:min-h-80 relative">
          {!imageLoaded ? <LoadingSpinner size="28" /> : 
            image===null ? 
              <svg className="w-32 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"/>
                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
              </svg>
              : <img className="rounded-t-lg object-cover w-full" src={image} alt={selectedArticle.title} />
          }
        </div>
        <div className="p-5">
          <div>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-300">{selectedArticle.title}</h5>
          </div>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {selectedArticle.abstract}
          </p>
          <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">
            {selectedArticle.byline}
          </p>
          <p className="mb-5 font-normal text-gray-700 dark:text-gray-400">
            {format(new Date(selectedArticle.published_date), 'MMM-dd-yyyy')}
          </p>
          {selectedArticle.des_facet.length ? (
            <div className="mb-6">
              {selectedArticle.des_facet.map((item: string, i: number) => (
                <span key={i} className="inline-block bg-gray-200 dark:bg-gray-600 dark:text-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {item}
                </span>
              ))}
            </div>
          ) : (
            <div className='mb-7'></div>
          )}
          <a href={selectedArticle.url} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read Full Article
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  ) : <></>;
};

export default Article;
