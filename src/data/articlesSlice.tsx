import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article, ApiResponse } from '../types/Article';

const API_URL = process.env.REACT_APP_NYTIMES_API_URL as string;
const API_KEY = process.env.REACT_APP_NYTIMES_API_KEY as string;

interface ApiError {
  fault: {
    faultstring: string;
    detail: {
      errorcode: string;
    };
  };
}

interface FetchArticlesResponse {
  data: Article[];
  period: number;
}

export const fetchAllArticles = createAsyncThunk<FetchArticlesResponse,number,{ rejectValue: ApiError }>('articles/fetchAll', async (period: number, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}svc/mostpopular/v2/viewed/${period}.json?api-key=${API_KEY}`);
    if (!response.ok) {
      const errorData: ApiError = await response.json();
      return rejectWithValue(errorData);
    }
    const data: ApiResponse = await response.json();
    return { data: data.results, period };
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue({ fault: { faultstring: error.message, detail: { errorcode: 'unknown' } } });
    } else {
      return rejectWithValue({ fault: { faultstring: 'An unexpected error occurred', detail: { errorcode: 'unknown' } } });
    }
  }
});

interface ArticlesState {
  data: Article[];
  fetchStatus: 'idle' | 'loading' | 'success' | 'error';
  period: number;
  error: string | null;
}

const initialState: ArticlesState = {
  data: [],
  fetchStatus: 'idle',
  period: 1,
  error: null,
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllArticles.fulfilled, (state, action: PayloadAction<FetchArticlesResponse>) => {
        state.data = action.payload.data;
        state.fetchStatus = 'success';
        state.period = action.payload.period;
        state.error = null;
      })
      .addCase(fetchAllArticles.pending, (state) => {
        state.fetchStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchAllArticles.rejected, (state, action: PayloadAction<ApiError | undefined>) => {
        state.fetchStatus = 'error';
        if (action.payload) {
          console.log(action.payload.fault.faultstring);
          state.error = action.payload.fault.faultstring;
        } else {
          state.error = 'An error occurred';
        }
      });
  },
});

export default articlesSlice.reducer;