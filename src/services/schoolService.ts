import type { SchoolDataService } from '../types';
import { demoDashboard } from './demoData';
export const dataMode = 'demo' as const;
// Replace this adapter when the agreed Supabase schema is ready.
export const schoolService: SchoolDataService = {
  async getDashboard(signal) {
    if (signal?.aborted) throw new DOMException('Request aborted', 'AbortError');
    return structuredClone(demoDashboard);
  },
};
