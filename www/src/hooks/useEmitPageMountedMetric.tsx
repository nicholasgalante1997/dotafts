import API from '@/lib/models/API';
import ExecEnv from '@/lib/models/ExecEnv';
import { useEffect } from 'react';

function useEmitPageMountedMetric(page: string, data: Record<string, any> = {}) {
    useEffect(() => {
        const isProd = ExecEnv.NodeEnv === 'production';
        const hasBeacon = !!window?.navigator?.sendBeacon;
        if (isProd && hasBeacon) {
            let didSend = window.navigator.sendBeacon(API.getEndpoint('events'), JSON.stringify({
                event_type: 'page-view',
                event_mutation_class: 'increment',
                timestamp: Date.now(),
                event_data: {
                    page,
                    ...data
                }
            }));

            if (!didSend) {
                console.warn('useEmitPageMountedMetric did not send metric.');
            }
        }
    }, []);
}

export default useEmitPageMountedMetric;