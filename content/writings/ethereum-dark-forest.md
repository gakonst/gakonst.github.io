---
title: Ethereum is a Dark Forest
subtitle: Mempool monsters and the creatures that lurk within
date: 2020-08-28
---

*This post is based on Paradigm's blog post about the Ethereum Dark Forest*

Like the [dark forest](https://en.wikipedia.org/wiki/The_Dark_Forest) from the science fiction novel by Liu Cixin, the Ethereum blockchain is a dangerous place. But instead of being stalked by aliens, you're hunted by bots.

These bots monitor the Ethereum mempool—the set of pending, unconfirmed transactions—looking for prey. When they find a profitable transaction, they copy it, replace the addresses with their own, and pay a higher gas price to "frontrun" the original transaction.

## The Generalized Frontrunners

In the summer of 2020, we discovered that these bots had evolved. No longer were they simple copycats—they had become *generalized* frontrunners, capable of parsing and executing entire smart contract calls.

We called them "generalized frontrunners" because they could extract value from *any* transaction, not just specific known patterns. Give them a transaction that moves value from point A to point B, and they'll figure out how to do it first and take the value for themselves.

## A Rescue Mission

When a friend accidentally sent $12,000 of tokens to the wrong address—an address for which we knew the private key—we thought recovery would be simple. We were wrong.

Every attempt to move the tokens was frontrun. The bots were too fast, too sophisticated. They would see our transaction, simulate it, realize it was profitable, and beat us to it.

## Escape from the Dark Forest

In the end, we had to get creative. We couldn't outrun the bots, so we had to outsmart them. The solution involved:

1. Creating a series of complex internal transactions
2. Obfuscating our true intent  
3. Making the transaction appear unprofitable to the bots
4. Using a specialized mining pool to bypass the public mempool entirely

The dark forest is real. Every transaction you send is being watched. And somewhere in the shadows, the bots are waiting.

*[Read the full story on Paradigm's blog](https://www.paradigm.xyz/2020/08/ethereum-is-a-dark-forest)*
