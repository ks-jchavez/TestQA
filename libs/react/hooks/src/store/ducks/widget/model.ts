import { PayloadAction } from '@reduxjs/toolkit';
import { WidgetActions } from '../../types/actions';
import { WidgetState } from './types';

interface WidgetModel {
  initialState: WidgetState;
  reducers: { [key: string]: (state: WidgetState, action?: PayloadAction<any>) => void };
}

export const initialState = {
  isLoading: false,
  data: {},
  error: null,
};

export const model: WidgetModel = {
  initialState,
  reducers: {
    /**
     * Get Widget Data
     */

    getData(state: WidgetState, action: PayloadAction<WidgetActions.GetDataInput>): void {
      state.isLoading = true;
      state.error = null;
    },
    getDataSuccess(state: WidgetState, { payload }: WidgetActions.GetDataSuccess): void {
      const { response } = payload;
      state.data = response;
      state.isLoading = false;
      state.error = null;
    },
    getDataFailure(state: WidgetState, { payload }: WidgetActions.GetDataFailure): void {
      const { response } = payload;
      state.error = response;
      state.isLoading = false;
    },

    getMoreData(state: WidgetState, action: PayloadAction<WidgetActions.GetDataInput>): void {
      state.isLoading = false;
      state.error = null;
    },
    getMoreDataSuccess(state: WidgetState, { payload }: WidgetActions.GetDataSuccess): void {
      const { response } = payload;
      const newData = {
        ...response,
        data: [...state.data.data, ...response.data],
      };
      state.data = newData;
      state.isLoading = false;
      state.error = null;
    },
    getMoreDataFailure(state: WidgetState, { payload }: WidgetActions.GetDataFailure): void {
      const { response } = payload;
      state.error = response;
      state.isLoading = false;
    },
  },
};
