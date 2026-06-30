import React, { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';

import { useAuthStore } from '@/store/auth.store';

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const segments = useSegments();

  const isAuthenticated =
    useAuthStore(state => state.isAuthenticated);

  const isLoading =
    useAuthStore(state => state.isLoading);

  console.log('SEGMENTS:', segments);
  console.log('AUTH:', isAuthenticated);
  console.log('LOADING:', isLoading);

  useEffect(() => {
    console.log('AUTH STATE', {isAuthenticated, isLoading, segments,});
    if (isLoading) return;

    const segmentList = [...segments] as string[];
    const inAuthGroup =
      segmentList[0] === '(auth)';
    const inRegisterFlow =
      inAuthGroup && segmentList[1] === 'register';

    console.log('inAuthGroup:', inAuthGroup);
    if (!isAuthenticated && !inAuthGroup) {
      console.log('GO LOGIN');
      router.replace('/(auth)/login');
    }

    if (isAuthenticated && inAuthGroup && !inRegisterFlow) {
      console.log('GO COACH');
      router.replace('/(coach)');
    }
  }, [
    isAuthenticated,
    isLoading,
    segments,
  ]);

  return children;
}
