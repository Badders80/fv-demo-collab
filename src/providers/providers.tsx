
import { QueryClientProvider } from '@tanstack/react-query';
import { FutureverseAuthProvider, FutureverseWagmiProvider } from '@futureverse/auth-react';
import { AuthUiProvider } from '@futureverse/auth-ui';
import { authClient, getWagmiConfig, queryClient, theme } from './config';
import type { State } from 'wagmi'

export const FvProviders = ({ children, initialState }: { children: React.ReactNode, initialState?: State }) => {

  return (
    <QueryClientProvider client={queryClient}>
      <FutureverseWagmiProvider
        getWagmiConfig={getWagmiConfig}
        initialState={initialState}
      >
      <FutureverseAuthProvider authClient={authClient}>
          <AuthUiProvider themeConfig={theme} authClient={authClient}>
            <>
              {children}
            </>
          </AuthUiProvider>
        </FutureverseAuthProvider>
      </FutureverseWagmiProvider>
    </QueryClientProvider>
  );
}