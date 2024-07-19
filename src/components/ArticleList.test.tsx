import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import ArticleList from './ArticleList';
import { Article } from '../types/Article';

const mockStore = configureStore([]);

const mockArticles: Article[] = [
  {
    url: 'https://example.com',
    id: 1,
    published_date: '2024-07-16',
    updated: '2024-07-16 13:12:12',
    byline: 'By Article Author',
    type: 'Article',
    title: 'Article Title 1',
    abstract: 'Article Abstract 1',
    image: 'https://example.com/image1.png',
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
  },
  {
    url: 'https://example.com',
    id: 2,
    published_date: '2024-07-17',
    updated: '2024-07-17 14:12:12',
    byline: 'By Article Author 2',
    type: 'Article',
    title: 'Article Title 2',
    abstract: 'Article Abstract 2',
    image: 'https://example.com/image2.png',
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
  },
];

describe('ArticleList', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      articles: {
        data: [],
        fetchStatus: 'idle',
        period: 1,
        error: null,
      },
    });
    store.dispatch = jest.fn();

    jest.useFakeTimers();

    class MockImage {
      onload: () => void = () => {};
      src: string = '';
      constructor() {
        setTimeout(() => {
          this.onload();
        }, 1000);
      }
    }
    global.Image = MockImage as any;
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('renders loading state', () => {
    store = mockStore({
      articles: {
        data: [],
        fetchStatus: 'loading',
        period: 1,
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <ArticleList />
        </Router>
      </Provider>
    );

    const loadingTextElements = screen.getAllByText('Loading...');
    loadingTextElements.forEach(element => {
      expect(element).toBeInTheDocument();
    });
  });

  test('renders error state', () => {
    store = mockStore({
      articles: {
        data: [],
        fetchStatus: 'error',
        period: 1,
        error: 'Error fetching articles',
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <ArticleList />
        </Router>
      </Provider>
    );

    expect(screen.getByText('Error fetching articles.')).toBeInTheDocument();
  });

  test('renders articles', async () => {
    store = mockStore({
      articles: {
        data: mockArticles,
        fetchStatus: 'success',
        period: 1,
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <ArticleList />
        </Router>
      </Provider>
    );

    jest.runAllTimers(); 

    expect(await screen.findByText('Article Title 1')).toBeInTheDocument();
    expect(await screen.findByText('Article Abstract 1')).toBeInTheDocument();
    expect(await screen.findByText('Article Title 2')).toBeInTheDocument();
    expect(await screen.findByText('Article Abstract 2')).toBeInTheDocument();
  });
});
