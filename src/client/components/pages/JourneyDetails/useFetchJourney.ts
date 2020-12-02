import DirectAPI from '@client/mechanisms/DirectAPI';
import IJourneyResource from '@server/interfaces/resources/IJourneyResource';
import axios, {AxiosResponse} from 'axios';
import {useEffect, useMemo, useState} from 'react';

interface ILocalState {
  status: 'loading' | 'success' | 'error';
  journey?: IJourneyResource;
  error?: unknown;
}
type ReturnType =
  | [loading: true, error: undefined, data: undefined]
  | [loading: false, error: unknown, data: undefined]
  | [loading: false, error: undefined, data: ILocalState['journey']];

export default function useFetchJourney(journeyId: unknown): ReturnType {
  const [state, setState] = useState<ILocalState>({
    status: 'loading',
    journey: undefined,
    error: undefined,
  });

  useEffect(() => {
    if (typeof journeyId !== 'string') return;
    const request = axios.CancelToken.source();

    if (state.status === 'loading' && state.journey === undefined) {
      DirectAPI.get<ILocalState['journey']>(`/journeys/${journeyId}`, {cancelToken: request.token})
        .then((response: AxiosResponse<ILocalState['journey']>) => {
          setState({
            ...state,
            status: 'success',
            journey: response.data,
            error: undefined,
          });
        })
        .catch((e: unknown) => {
          if (axios.isCancel(e)) return;

          setState({
            ...state,
            status: 'error',
            journey: undefined,
            error: e,
          });
        });
    }

    return () => {
      request && request.cancel('USE_EFFECT_CLEANUP');
    };
  }, [journeyId, state, setState]);

  return useMemo(() => {
    return [
      state.status === 'loading',
      state.status === 'error' ? state.error : undefined,
      state.journey,
    ] as ReturnType;
  }, [state]);
}
