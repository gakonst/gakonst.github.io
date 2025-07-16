import { createConfig, http } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { porto } from 'porto/wagmi'

export const config = createConfig({
  chains: [mainnet],
  connectors: [
    porto({
      appName: 'Georgios Konstantopoulos',
      appLogoUrl: 'https://gakonst.com/icon.png',
    }),
  ],
  transports: {
    [mainnet.id]: http(),
  },
})