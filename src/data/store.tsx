import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from './articlesSlice';
import articleReducer from './articleSlice';

const store = configureStore({
  reducer: {
    articles: articlesReducer,
    article: articleReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;