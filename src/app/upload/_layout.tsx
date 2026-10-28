import { Stack } from 'expo-router';

import { UploadDraftProvider } from '@/features/upload/upload-draft';

export default function Layout() {
  return (
    <UploadDraftProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </UploadDraftProvider>
  );
}
