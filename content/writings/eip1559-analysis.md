---
title: Analysis of EIP-1559
subtitle: Understanding Ethereum's Fee Market Reform
date: 2021-07-15
---

EIP-1559 represents one of the most significant changes to Ethereum's economic model. It fundamentally restructures how transaction fees work on the network.

## The Old System

Before EIP-1559, Ethereum used a simple first-price auction:
- Users bid gas prices
- Miners include highest bidders first  
- All fees go to miners
- Massive fee volatility during congestion

## The New Mechanism

EIP-1559 introduces several key concepts:

### Base Fee
- Algorithmically determined price per gas
- Adjusts up/down based on block fullness
- Gets *burned* instead of going to miners
- Provides fee predictability

### Priority Fee (Tips)
- Optional tip to incentivize inclusion
- Goes directly to miners
- Usually much smaller than base fee

### Variable Block Size
- Target: 15M gas (previously the hard cap)
- Maximum: 30M gas
- Allows for demand elasticity

## Economic Implications

1. **ETH becomes deflationary** when burn > issuance
2. **Better UX** through predictable fees
3. **Miners lose fee revenue** but gain from ETH appreciation
4. **MEV remains** unaffected

## Results After Launch

Since launching in August 2021:
- Over 2M ETH burned
- Fee volatility reduced by ~4x
- User experience dramatically improved
- ETH successfully became ultrasound money 🦇🔊

The upgrade proved that Ethereum could successfully implement major economic changes through social coordination.

*[Original EIP-1559 proposal](https://eips.ethereum.org/EIPS/eip-1559)*