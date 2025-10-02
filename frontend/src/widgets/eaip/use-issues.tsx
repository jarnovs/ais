'use client';
import { useEffect, useState } from 'react';
import { Issue, issuesApi } from '@/lib/api/issues';

export function useIssues(status: string) {
  const [data, setData] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadIssues = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await issuesApi.getIssues(status);

        if (isMounted) {
          setData(response);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Ошибка загрузки проблем:', err);
          setError((err as Error)?.message || 'Не удалось загрузить проблемы');
          setData([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadIssues();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading, error };
}