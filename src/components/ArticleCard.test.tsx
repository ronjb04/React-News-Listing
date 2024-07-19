import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ArticleCard from './ArticleCard';
import { setSelectedArticle } from '../data/articleSlice';
import { Article } from '../types/Article';

const mockStore = configureStore([]);
const mockArticle: Article = {
  url: 'https://example.com',
  id: 1,
  published_date: '2024-07-16',
  updated: '2024-07-16 13:12:12',
  byline: 'By Article Author',
  type: 'Article',
  title: 'Article Title',
  abstract: 'Article Abstract',
  image: 'https://example.com/image.png',
  des_facet: [
    'National Anthems',
    'Country Music',
    'Alcohol Abuse',
    'Therapy and Rehabilitation',
    'Baseball',
    'All Star Games',
  ],
  media: [
    {
      'media-metadata': [
        { url: 'https://example.com/img1.png' },
        { url: 'https://example.com/img2.png' },
        { url: 'https://example.com/img3.png' },
      ],
    },
  ],
};

describe('ArticleCard', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn();

    class MockImage {
      onload: () => void = () => {};
      src: string = '';
      constructor() {
        setTimeout(() => {
          this.onload();
        }, 0);
      }
    }

    global.Image = MockImage as any;
  });

  test('renders ArticleCard component with loading skeleton', () => {
    render(
      <Provider store={store}>
        <Router>
          <ArticleCard article={mockArticle} />
        </Router>
      </Provider>
    );

    const loadingSkeleton = screen.getAllByRole('status');
    loadingSkeleton.forEach(element => {
      expect(element).toBeInTheDocument();
    });

  });

  test('renders ArticleCard component with image and details', async () => {
    render(
      <Provider store={store}>
        <Router>
          <ArticleCard article={mockArticle} />
        </Router>
      </Provider>
    );

    const imgElement = await screen.findByRole('img');
    expect(imgElement).toBeInTheDocument();

    const titleElement = await screen.findByText('Article Title');
    expect(titleElement).toBeInTheDocument();

    expect(screen.getByText('Article Abstract')).toBeInTheDocument();
    expect(screen.getByText('By Article Author')).toBeInTheDocument();
    expect(screen.getByText('Posted: Jul-16-2024')).toBeInTheDocument();
  });

  test('dispatches setSelectedArticle action on link click', async () => {
    render(
      <Provider store={store}>
        <Router>
          <ArticleCard article={mockArticle} />
        </Router>
      </Provider>
    );

    const imgElement = await screen.findByRole('img');
    expect(imgElement).toBeInTheDocument();

    const readMoreLink = await screen.findByText('Read more');
    fireEvent.click(readMoreLink);

    expect(store.dispatch).toHaveBeenCalledWith(setSelectedArticle(mockArticle));
  });
});
