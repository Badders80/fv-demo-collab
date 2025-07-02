import { QueryClient } from '@tanstack/react-query';
import { FutureverseAuthClient } from '@futureverse/auth-react/auth';
import { DefaultTheme } from '@futureverse/auth-ui';
import { createWagmiConfig } from '@futureverse/auth-react/wagmi';
import { mainnet, root, rootPorcini } from 'viem/chains';
import { createStorage } from 'wagmi';


export const authClient = new FutureverseAuthClient({
  clientId: 'OTODf0e0GIoyuOOivKToG',
  environment: 'staging',
  redirectUri: 'http://localhost:5173/login',
  postLogoutRedirectUri: 'http://localhost:5173/',
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

export const theme = { ...DefaultTheme }

const storage = createStorage({ storage: localStorage })

export const getWagmiConfig = async () => {
  
  return createWagmiConfig({
    walletConnectProjectId: undefined,
    xamanAPIKey: undefined,
    authClient,
    metamaskDappMetadata: {
      name: 'FV Demo App',
      url: window.location.origin,
    },
    ssr: true,
    chains: [mainnet, root, rootPorcini],
    storage
  });
};
