import React, { useEffect, ChangeEvent, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllArticles } from '../data/articlesSlice';
import { RootState, AppDispatch } from '../data/store';
import ArticleList from '../components/ArticleList';
import LoadingSkeleton from 'src/utilities/LoadingSkeleton';

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const articlesState = useSelector((state: RootState) => state.articles);
  const { data: articles, fetchStatus: status, period, error } = articlesState;
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      dispatch(fetchAllArticles(1)); 
      isMounted.current = true;
    }
  }, [dispatch]);

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(fetchAllArticles(parseInt(e.target.value, 10)));
  };

  return (
    <div className="container px-4 mx-auto max-w-7xl">
      <div className="flex justify-between pb-4 items-center">
        <h1 className="text-xl leading-none md:text-3xl font-bold dark:text-gray-200">Popular Articles</h1>
        <select
          value={period}
          onChange={handleSelectChange}
          className="bg-blue-600 dark:bg-blue-600 dark:border-indigo-600 text-gray-300 dark:text-gray-300 font-bold block w-auto p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="1">1 Day</option>
          <option value="7">7 Days</option>
          <option value="30">30 Days</option>
        </select>
      </div>
      {status === 'loading' ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <LoadingSkeleton key={index} />
          ))}
        </div>
      ) : status === 'error' ? (
        <div className="flex items-center p-4 mb-4 text-sm text-red-800 border rounded-lg bg-red-50 dark:border-red-800 dark:text-red-800" role="alert">
          <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div><span className="font-bold">{error}</span></div>
        </div>
      ) : articles.length !== 0 ? (
        <ArticleList />
      ) : null}
    </div>
  );
};

export default Home;