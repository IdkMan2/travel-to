import DirectAPI from '@client/mechanisms/DirectAPI';
import IJourneyResource from '@server/interfaces/resources/IJourneyResource';
import axios, {AxiosResponse} from 'axios';
import {useEffect, useMemo, useState} from 'react';

interface ILocalState {
  status: 'loading' | 'success' | 'error';
  journeys: IJourneyResource[];
  error?: unknown;
}
type ReturnType =
  | [loading: true, error: undefined, data: undefined]
  | [loading: false, error: unknown, data: undefined]
  | [loading: false, error: undefined, data: IJourneyResource[]];

export default function useFetchJourneys(): ReturnType {
  const [state, setState] = useState<ILocalState>({
    status: 'loading',
    journeys: [],
    error: undefined,
  });

  useEffect(() => {
    const request = axios.CancelToken.source();

    if (state.journeys.length === 0) {
      if (state.status !== 'loading' || state.error !== undefined) {
        setState({
          ...state,
          status: 'loading',
          error: undefined,
        });
      }

      DirectAPI.get<IJourneyResource[]>('/journeys', {cancelToken: request.token})
        .then((response: AxiosResponse<IJourneyResource[]>) => {
          setState({
            ...state,
            status: 'success',
            journeys: response.data,
            error: undefined,
          });
        })
        .catch((e: unknown) => {
          if (axios.isCancel(e)) return;

          setState({
            ...state,
            status: 'error',
            journeys: [],
            error: e,
          });
        });
    }

    return () => {
      request && request.cancel('USE_EFFECT_CLEANUP');
    };
  }, [state, setState]);

  return useMemo(() => {
    return [
      state.status === 'loading',
      state.status === 'error' ? state.error : undefined,
      state.journeys,
    ] as ReturnType;
  }, [state]);
}
