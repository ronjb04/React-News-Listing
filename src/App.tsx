import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
// import Home from './pages/Home';
// import Article from './pages/Article';

import LoadingSpinner from './utilities/LoadingSpinner';

const Home = lazy(() => import('./pages/Home'));
const Article = lazy(() => import('./pages/Article'));

const App = () => {
  return (
    <div className='bg-gray-200 dark:bg-gray-800 min-h-screen pb-8' data-testid='app'>
      <Router>
        <Navbar />
        <Suspense fallback={<div className="mx-auto max-w-7xl"><LoadingSpinner/></div>}>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/article/:articleId" element={<Article  />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
};

export default App;
