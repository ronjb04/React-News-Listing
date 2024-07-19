import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article } from '../types/Article';

interface ArticleState {
  selectedArticle: Article | null;
}

const initialState: ArticleState = {
  selectedArticle: null,
};

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setSelectedArticle: (state, action: PayloadAction<Article>) => {
      state.selectedArticle = action.payload;
    },
  },
});

export const { setSelectedArticle } = articleSlice.actions;
export default articleSlice.reducer;