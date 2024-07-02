import { useCallback } from 'react';
import { Option, Log } from 'sleepydogs';

import ApiClient from '@/lib/models/API';
import ExecEnv from '@/lib/models/ExecEnv';
import { DotaftsEventType } from '@/types/EventType';

const { error } = Log.factory({
  service: 'DA-WWW-Event-Emitter',
  level: 'info',
  version: '1.0'
});

export function useEmitEvent<T>(event: DotaftsEventType<T>) {
  const emit = useCallback(() => {
    const isProd = ExecEnv.NodeEnv === 'production';
    if (!isProd) return;
    const eventJsonOption = new Option(() => JSON.stringify({
      event_type: event.type,
      event_data: event.data
    }));
    const eventJsonOutcome = eventJsonOption.resolveSync();
    if (eventJsonOutcome.data && eventJsonOutcome.state === 'resolved') {
      if (typeof window !== 'undefined') {
        // const sent = window.navigator.sendBeacon(
        //   ApiClient.getEndpoint('events'),
        //   eventJsonOutcome.data
        // );
        // if (!sent) {
        //   error('Failed to send metric.', event);
        // }
        const headers = ApiClient.getHeaders('POST events');
        headers.set('Content-Length', eventJsonOutcome.data.length.toString())
        fetch(ApiClient.getEndpoint('events'), {
          body: eventJsonOutcome.data,
          method: 'POST',
          headers,
          mode: 'same-origin'
        })
      }
    }
  }, [event]);

  return { emit };
}
