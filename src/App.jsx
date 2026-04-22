import { useState, useEffect, useMemo } from "react";
const CLKN_MINT = "DW6DF2mjtyx67vcNmMhFm9XdxAwREurorghZcS3CBAGS";
const SOL_MINT = "So11111111111111111111111111111111111111112";
const LAMPORTS_PER_SOL = 1_000_000_000;
const CLKN_TRADE_LINK = "https://bags.fm/DW6DF2mjtyx67vcNmMhFm9XdxAwREurorghZcS3CBAGS?ref=firechicken007";
const JUPITER_TRADE_LINK = "https://jup.ag/tokens/DW6DF2mjtyx67vcNmMhFm9XdxAwREurorghZcS3CBAGS";
const PARTNER_LINK = "https://bags.fm/?ref=firechicken007";
const BAGS_SIGNUP = "https://bags.fm/?ref=firechicken007";
const BAGS_DEV = "https://dev.bags.fm";
const BAGS_APP_IOS = "https://apps.apple.com/app/bags-fm/id6743534707";
const BAGS_APP_ANDROID = "https://play.google.com/store/apps/details?id=fm.bags.app";


const LOGO_B64 = "/cluck-norris.png";

const LESSONS = [
  // ── EXISTING (expanded questions) ──────────────────────────

  {
    id: "lp", belt: "FRESHMAN", icon: "💧", title: "Liquidity Pools",
    quote: "Cluck Norris doesn't chase liquidity… he BECOMES it.",
    color: "#3B82F6", glow: "rgba(59,130,246,0.4)",
    intro: "Every trade on a DEX pulls from a Liquidity Pool — a smart contract holding two tokens. LP providers earn fees from every swap. No order books. No middlemen. Just math and the market.",
    concepts: [
      { term: "Liquidity Pool", def: "A smart contract holding two tokens (e.g. SOL/USDC) that traders swap against." },
      { term: "LP Provider", def: "Someone who deposits tokens into a pool and earns a share of every trading fee." },
      { term: "Trading Fees", def: "Usually 0.25-1% per swap, split proportionally among all LP providers." },
      { term: "Impermanent Loss", def: "When token prices diverge, your pool share shifts — you may end up with less than just holding." },
      { term: "AMM", def: "Automated Market Maker — the algorithm that prices trades based on pool ratios instead of order books." },
    ],
    questions: [
      { q: "What do liquidity providers earn?", options: ["Free NFT airdrops", "A share of trading fees", "Tokens from the dev wallet", "Nothing — it's charity"], correct: 1, explanation: "LP providers earn a cut of every swap fee. The more volume through the pool, the more you earn." },
      { q: "What is Impermanent Loss?", options: ["Losing your wallet password", "A rug pull by the dev", "Value loss when token prices diverge vs. just holding", "Gas fees eating your profits"], correct: 2, explanation: "IL happens when the price ratio of your pooled tokens changes. It's 'impermanent' because it can reverse if prices converge." },
      { q: "What does a Liquidity Pool replace?", options: ["A bank account", "A traditional order book", "Your hardware wallet", "A CEX listing"], correct: 1, explanation: "DEXs use AMMs with liquidity pools instead of traditional order books used by CEXs." },
      { q: "What is an AMM?", options: ["A type of hardware wallet", "An algorithm that prices trades based on pool ratios", "A centralized exchange feature", "A token burning mechanism"], correct: 1, explanation: "AMM stands for Automated Market Maker. It uses a mathematical formula to price trades based on the ratio of tokens in the pool." },
      { q: "If a pool has equal value of SOL and USDC, and SOL price doubles, what happens to an LP provider?", options: ["They double their money", "They experience impermanent loss vs just holding SOL", "Nothing changes", "They earn double the fees"], correct: 1, explanation: "When prices diverge, the AMM rebalances the pool automatically. You end up with less of the token that went up and more of the one that didn't — impermanent loss." },
    ],
  },

  {
    id: "rugs", belt: "SOPHOMORE", icon: "⚠️", title: "Rugs & Scams",
    quote: "Cluck Norris doesn't get rugged… he STUDIES the rug.",
    color: "#EF4444", glow: "rgba(239,68,68,0.4)",
    intro: "In crypto, a rug pull is when devs drain liquidity or dump tokens, leaving holders with worthless bags. Knowing the red flags is your first line of defense.",
    concepts: [
      { term: "Rug Pull", def: "Devs remove all liquidity or dump tokens suddenly, crashing the price to zero." },
      { term: "Liquidity Lock", def: "LP tokens locked in a time contract — proves devs can't pull liquidity early." },
      { term: "Dev Wallet", def: "The wallet that deployed the token. Large allocations here = major red flag." },
      { term: "Honeypot", def: "A contract that lets you buy but blocks selling. You're trapped the moment you enter." },
      { term: "Social Engineering", def: "Manipulating people psychologically to gain trust before executing a scam." },
    ],
    questions: [
      { q: "What is a honeypot token?", options: ["A token that pays honey as rewards", "A contract you can buy but not sell", "A token with locked liquidity", "A governance voting token"], correct: 1, explanation: "Honeypots are coded to block sell transactions. Once you buy, your funds are stuck. Always test with a small amount first." },
      { q: "Why is a liquidity lock important?", options: ["It makes the token more expensive", "It means the dev can't remove liquidity early", "It freezes trading for everyone", "It guarantees price increase"], correct: 1, explanation: "A liquidity lock proves devs committed their LP for a period of time — they physically can't rug before the lock expires." },
      { q: "Which is a major red flag on a new token?", options: ["Active community on X/Twitter", "Locked liquidity for 6+ months", "Dev wallet holds 40% of supply", "Listed on a DEX aggregator"], correct: 2, explanation: "Concentrated dev wallet = concentrated dump risk. If they hold 40%, one sell can collapse the price." },
      { q: "A project DMs you saying you won a giveaway and need to connect your wallet to claim. What do you do?", options: ["Connect immediately — free money!", "Ignore and report — it's a scam", "Ask for more details first", "Share it with friends"], correct: 1, explanation: "Unsolicited DMs asking you to connect your wallet are almost always phishing scams. Legitimate projects don't give away tokens through cold DMs." },
      { q: "What is social engineering in crypto?", options: ["Building a social media presence", "Psychologically manipulating people to gain trust before scamming them", "Community governance voting", "Influencer marketing"], correct: 1, explanation: "Social engineering is when scammers build fake relationships or urgency to trick you into giving up access to your wallet or funds." },
    ],
  },

  {
    id: "volatility", belt: "JUNIOR", icon: "📈", title: "Volatility & Weak Hands",
    quote: "Volatility doesn't break warriors… it BUILDS them.",
    color: "#F59E0B", glow: "rgba(245,158,11,0.4)",
    intro: "Crypto moves fast. 50% drops in hours. 10x runs overnight. The biggest losses in crypto don't come from bad projects — they come from panic selling at the bottom.",
    concepts: [
      { term: "Volatility", def: "The rate at which a price moves up or down. High vol = big swings both ways." },
      { term: "Weak Hands", def: "Traders who sell at the first sign of red, usually locking in losses at the worst moment." },
      { term: "Diamond Hands", def: "Holding through extreme volatility without panic selling." },
      { term: "Stop Loss", def: "A pre-set price where you automatically sell to limit downside. Discipline over emotion." },
      { term: "Dollar Cost Averaging", def: "Buying fixed amounts at regular intervals regardless of price. Reduces timing risk." },
    ],
    questions: [
      { q: "What do weak hands do during a price dip?", options: ["Buy more at a discount", "Wait and analyze", "Panic sell, locking in losses", "Stake their tokens"], correct: 2, explanation: "Weak hands react emotionally. They sell the dip — often right before recovery. Most losses in crypto are from panic, not price." },
      { q: "What is a stop loss?", options: ["A way to stop losing friends in crypto", "A pre-set automatic sell to limit downside", "A lock on your wallet", "A fee charged by DEXs"], correct: 1, explanation: "A stop loss removes emotion from the equation. You pre-decide your exit — the market doesn't get to decide for you." },
      { q: "High volatility means:", options: ["The token is always going up", "Large price swings in both directions", "The project is a scam", "Low trading volume"], correct: 1, explanation: "Volatility is neutral — it means big moves happen. That means big gains AND big losses are both possible." },
      { q: "What is Dollar Cost Averaging (DCA)?", options: ["Buying all at once at the lowest price", "Buying fixed amounts at regular intervals regardless of price", "Selling in small increments", "Averaging your losses"], correct: 1, explanation: "DCA removes the pressure of timing the market. You buy $50 every week whether price is up or down — over time it averages out your entry price." },
      { q: "A token drops 60% in a day. A disciplined trader would:", options: ["Immediately sell everything", "Buy more if fundamentals are unchanged", "Tell everyone to panic", "Never look at the chart again"], correct: 1, explanation: "60% drops happen regularly in crypto. If nothing has changed about the project, a disciplined trader sees it as a potential buying opportunity — not a reason to panic sell." },
    ],
  },

  {
    id: "wallets", belt: "SENIOR", icon: "🔐", title: "Wallets & Keys",
    quote: "Not your keys, not your coins. Cluck Norris never forgets this.",
    color: "#10B981", glow: "rgba(16,185,129,0.4)",
    intro: "Your wallet doesn't hold tokens — the blockchain does. Your wallet holds the KEYS that prove ownership. Lose the keys, lose everything. Forever.",
    concepts: [
      { term: "Private Key", def: "A secret string that gives full control over your wallet. Never share it. Ever." },
      { term: "Seed Phrase", def: "12-24 words that regenerate your private key. Write it on paper. Never digitally." },
      { term: "Custodial Wallet", def: "An exchange holds your keys. Convenient but risky — 'not your keys, not your coins.'" },
      { term: "Non-Custodial Wallet", def: "You hold your own keys. Full control. Full responsibility. Phantom, Backpack, etc." },
      { term: "Hardware Wallet", def: "A physical device that stores your private key offline. Most secure option for large holdings." },
    ],
    questions: [
      { q: "What does 'not your keys, not your coins' mean?", options: ["You need a physical key to access crypto", "If an exchange holds your keys, they control your funds", "Lost keys can be recovered by support", "Private keys are optional"], correct: 1, explanation: "When a CEX holds your keys, they actually control your funds. If they go bankrupt or freeze withdrawals — you have no recourse." },
      { q: "Where should you store your seed phrase?", options: ["Screenshot on your phone", "Google Drive folder", "Written on paper, stored offline", "Emailed to yourself"], correct: 2, explanation: "Seed phrases stored digitally can be hacked. Paper doesn't get hacked. Store it offline, somewhere safe." },
      { q: "What is a non-custodial wallet?", options: ["A wallet run by a bank", "A wallet where you control your own private keys", "A wallet with no fees", "A wallet locked by the government"], correct: 1, explanation: "Non-custodial means YOU hold the keys. Phantom, Backpack, and Solflare are non-custodial Solana wallets." },
      { q: "Why is a hardware wallet more secure than a software wallet?", options: ["It's faster", "It stores your private key offline, away from internet threats", "It's cheaper to use", "It connects to more blockchains"], correct: 1, explanation: "Hardware wallets keep your private key on a physical device that never touches the internet. Even if your computer is hacked, your keys are safe." },
      { q: "Someone online says they can recover your lost crypto if you give them your seed phrase. What do you do?", options: ["Give them the first 6 words only", "Trust them — they're a professional", "Never share your seed phrase with anyone, ever", "Share it only if they have good reviews"], correct: 2, explanation: "Your seed phrase gives complete control of your wallet. Anyone who asks for it is trying to steal your funds. No legitimate service ever needs your seed phrase." },
    ],
  },

  {
    id: "slippage", belt: "GRADUATE", icon: "🤖", title: "Slippage & MEV",
    quote: "Cluck Norris doesn't get sandwiched. He IS the sandwich.",
    color: "#06B6D4", glow: "rgba(6,182,212,0.4)",
    intro: "Every time you swap on a DEX, bots are watching. MEV bots can see your transaction before it confirms and jump in front of it — paying more gas to get ahead of you, driving the price up so you buy higher. It's called a sandwich attack. Knowing this changes how you trade.",
    concepts: [
      { term: "Slippage", def: "The difference between the price you expect and the price you actually get." },
      { term: "MEV", def: "Maximal Extractable Value — profit bots extract by reordering transactions within a block." },
      { term: "Sandwich Attack", def: "A bot buys before your trade (raising price), lets you buy higher, then sells for profit." },
      { term: "Slippage Tolerance", def: "The max % price change you'll accept. Set too high = bot target. Too low = failed trade." },
      { term: "Front-running", def: "A bot sees your pending transaction and executes the same trade first to profit from your price impact." },
    ],
    questions: [
      { q: "What is a sandwich attack?", options: ["A bot buys before and sells after your trade to profit at your expense", "A hack that drains your wallet", "A phishing attack via DMs", "When two tokens merge into one"], correct: 0, explanation: "Sandwich bots front-run your swap, then back-run it. You pay more, they profit. Setting tight slippage is your defense." },
      { q: "What does setting a LOW slippage tolerance do?", options: ["Makes your trade faster", "Protects you from sandwich attacks but may cause failed transactions", "Gives you a better price always", "Reduces gas fees"], correct: 1, explanation: "Low slippage = trade only executes if price stays close to what you expect. Bots can't profitably sandwich you, but you risk the trade failing." },
      { q: "What does MEV stand for?", options: ["Maximum Exchange Value", "Maximal Extractable Value", "Market Execution Volume", "Minimum Entry Variance"], correct: 1, explanation: "MEV is profit extracted by validators or bots who control transaction ordering." },
      { q: "What is front-running?", options: ["Being first to buy a new token launch", "A bot executing the same trade as you but before your transaction confirms", "Running away from a bad investment", "Early access to a token presale"], correct: 1, explanation: "Front-running bots monitor the mempool for large pending transactions, then insert their own transaction first to profit from the price impact your trade will cause." },
      { q: "On Solana, MEV is:", options: ["Impossible — Solana is too fast", "Less severe than Ethereum but still occurs on high-volume DEXs", "More severe than on Ethereum", "Only affects large traders"], correct: 1, explanation: "Solana's speed reduces but doesn't eliminate MEV. High-volume pools on Jupiter and Raydium still see bot activity, especially during high-profile launches." },
    ],
  },

  {
    id: "tokenomics", belt: "POST-GRAD", icon: "📊", title: "Tokenomics",
    quote: "Cluck Norris reads the whitepaper. Then he reads it again.",
    color: "#F97316", glow: "rgba(249,115,22,0.4)",
    intro: "Tokenomics is the economics of a token — supply, distribution, vesting, and inflation. A token with bad tokenomics will dump no matter how good the project is.",
    concepts: [
      { term: "Total Supply", def: "The max number of tokens that will ever exist." },
      { term: "Circulating Supply", def: "How many tokens are actually tradeable right now." },
      { term: "Vesting Schedule", def: "A lock-up period for team/investor tokens. Watch unlock dates." },
      { term: "Token Distribution", def: "How tokens are split between team, investors, community, treasury." },
      { term: "Burn Mechanism", def: "Permanently removing tokens from circulation to reduce supply over time." },
    ],
    questions: [
      { q: "Why does vesting schedule matter to traders?", options: ["It determines staking rewards", "It shows when locked team/investor tokens unlock and can be sold", "It controls gas fees", "It sets the token price at launch"], correct: 1, explanation: "When a vesting cliff hits, millions of insider tokens unlock. If team or VCs sell, price can crash hard." },
      { q: "A token has 1 trillion total supply and costs $0.000001. Is it cheap?", options: ["Yes, it's under a penny", "No — supply determines real value, not price per token", "Yes, low price means room to grow", "Can't tell without chart data"], correct: 1, explanation: "1 trillion tokens at $0.000001 = $1B market cap. That's not cheap." },
      { q: "What is circulating supply?", options: ["Total tokens ever created", "Tokens currently tradeable in the market", "Tokens held by the dev team", "Tokens burned forever"], correct: 1, explanation: "Circulating supply is what's actually on the market. Market cap = price × circulating supply." },
      { q: "What does a burn mechanism do?", options: ["Destroys the project permanently", "Permanently removes tokens from circulation reducing supply", "Freezes trading temporarily", "Sends tokens to the dev wallet"], correct: 1, explanation: "Burning tokens reduces supply over time. If demand stays the same and supply decreases, price pressure is upward. Bitcoin's halving is a similar concept." },
      { q: "A token has 5% team allocation with a 4-year vesting schedule. Is this good or bad?", options: ["Bad — team should have more tokens", "Good — low allocation with long vesting means team is incentivized long-term", "Irrelevant to price", "Bad — 4 years is too long"], correct: 1, explanation: "Low team allocation with long vesting is a green flag. It means the team can't dump on holders early and is incentivized to build long-term value." },
      { q: "What happens to price when a large vesting unlock occurs?", options: ["Price always goes up", "Price often drops as insiders sell their newly unlocked tokens", "Nothing — markets already price it in", "Trading is halted"], correct: 1, explanation: "Vesting unlocks create sell pressure. Even if markets partially price it in, the actual unlock often causes a price dip as insiders take profits." },
    ],
  },

  {
    id: "marketcap", belt: "TENURED", icon: "💰", title: "Market Cap vs Price",
    quote: "Price is what you pay. Market cap is what you're really buying.",
    color: "#EC4899", glow: "rgba(236,72,153,0.4)",
    intro: "The biggest beginner mistake in crypto: thinking a $0.001 token is cheaper than $50,000 BTC. Price per token means nothing. Market cap is everything.",
    concepts: [
      { term: "Market Cap", def: "Price × Circulating Supply. The real size of a project." },
      { term: "FDV", def: "Fully Diluted Valuation — Price × Total Supply including locked tokens." },
      { term: "Price Per Token", def: "Meaningless without supply context." },
      { term: "Low Cap vs Large Cap", def: "Low cap (<$10M) = more upside, more risk. Large cap (>$1B) = more stable, harder to 10x." },
      { term: "Liquidity vs Market Cap", def: "A $10M market cap token with $50K liquidity can't absorb large buys without massive price impact." },
    ],
    questions: [
      { q: "Token A: $0.001 price, 1 trillion supply. Token B: $100 price, 100,000 supply. Which has the higher market cap?", options: ["Token A — lower price means cheaper", "Token B — higher price means more valuable", "Token A — $1B market cap vs Token B's $10M", "They are the same"], correct: 2, explanation: "Token A: $0.001 × 1T = $1B. Token B: $100 × 100K = $10M. Price per token is meaningless." },
      { q: "What does FDV tell you?", options: ["Current market cap only", "What market cap would be if all tokens were in circulation", "The project's revenue", "How many people hold the token"], correct: 1, explanation: "FDV uses total supply including locked tokens. High FDV vs market cap = lots of potential sell pressure ahead." },
      { q: "For a $1M investment to 100x, what must happen?", options: ["Go from any size to $100M", "Grow by $100M from current market cap", "The market cap must also 100x", "Only price needs to 100x"], correct: 2, explanation: "Your return is tied to market cap growth. A project at $500M market cap needs $50B to 100x — much harder." },
      { q: "A token has a $1M market cap but only $10K in liquidity. What does this mean?", options: ["It's a great low cap opportunity", "Even a small buy will cause massive price impact — very risky", "The token is about to moon", "Liquidity doesn't matter"], correct: 1, explanation: "Low liquidity means your buy moves the price dramatically — and selling is even harder. You could buy in easily but be trapped when trying to exit." },
      { q: "Why is FDV often higher than market cap?", options: ["Because the project is overvalued", "Because many tokens are locked, vesting, or not yet released", "Because of trading fees", "FDV is always equal to market cap"], correct: 1, explanation: "FDV accounts for ALL tokens that will ever exist. Locked team tokens, vesting allocations, and unreleased supply all count toward FDV but not market cap." },
      { q: "A project has $100M market cap and $1B FDV. What does this signal?", options: ["Strong project worth buying", "90% of tokens are still locked — massive future sell pressure likely", "The project is undervalued", "FDV doesn't matter for small tokens"], correct: 1, explanation: "When FDV is 10x market cap, it means 90% of tokens haven't hit the market yet. As they unlock, sustained sell pressure can suppress price for years." },
    ],
  },

  {
    id: "dex", belt: "HEADMASTER", icon: "⚔️", title: "DEX vs CEX",
    quote: "CEX asks permission. DEX asks no one. Cluck Norris chooses wisely.",
    color: "#8B5CF6", glow: "rgba(139,92,246,0.4)",
    intro: "Two ways to trade crypto. CEX is the on-ramp — easy, regulated, ID required. DEX is the frontier — permissionless, self-custody, always open.",
    concepts: [
      { term: "CEX", def: "Centralized Exchange (Coinbase, Binance). Requires ID. Holds your keys. Regulated." },
      { term: "DEX", def: "Decentralized Exchange (Jupiter, Raydium). No ID. You keep your keys. Always on." },
      { term: "KYC", def: "Know Your Customer — identity verification required by CEXs." },
      { term: "Order Book", def: "A CEX feature matching buyers and sellers at specific prices." },
      { term: "Self-Custody", def: "You control your own keys. No third party can freeze or seize your funds." },
    ],
    questions: [
      { q: "What does a CEX require that a DEX does not?", options: ["A crypto wallet", "SOL for gas fees", "Identity verification (KYC)", "A liquidity pool deposit"], correct: 2, explanation: "CEXs are regulated businesses — they require ID. DEXs are permissionless smart contracts. No ID, no account." },
      { q: "What is slippage on a DEX?", options: ["Accidentally sending to the wrong wallet", "The difference between expected and actual trade price", "A fee charged by the DEX team", "When your wallet disconnects mid-trade"], correct: 1, explanation: "Low liquidity = high slippage. For small-cap tokens, even a modest trade can move the price significantly." },
      { q: "Which is always available 24/7 with no downtime?", options: ["CEX — they have server farms", "Both are always on", "DEX — it's a smart contract on the blockchain", "Neither"], correct: 2, explanation: "Smart contracts don't have maintenance windows. A DEX runs as long as the blockchain does." },
      { q: "What is the biggest risk of keeping funds on a CEX?", options: ["High trading fees", "The CEX can freeze withdrawals, get hacked, or go bankrupt", "Slow transaction speeds", "Limited token selection"], correct: 1, explanation: "FTX, Celsius, and many others showed the risk — when a CEX fails, user funds can disappear overnight. Not your keys, not your coins." },
      { q: "What does self-custody mean?", options: ["Keeping crypto in a safe at home", "Controlling your own private keys with no third party involvement", "Using a regulated custodian", "Storing crypto on a CEX for safety"], correct: 1, explanation: "Self-custody means you hold your own keys. No exchange, no bank, no government can freeze or seize your funds without physical access to your device." },
    ],
  },

  // ── NEW LESSONS ────────────────────────────────────────────

  {
    id: "onchain", belt: "PROFESSOR", icon: "🔍", title: "On-Chain Analysis",
    quote: "The blockchain never lies. Cluck Norris reads it like a book.",
    color: "#14B8A6", glow: "rgba(20,184,166,0.4)",
    intro: "Every transaction on Solana is public and permanent. On-chain analysis means reading this data to understand who is buying, who is selling, where the smart money is going, and whether a project is healthy or dying. This is the edge most retail traders never develop.",
    concepts: [
      { term: "Wallet Tracking", def: "Monitoring specific wallet addresses to see when whales buy, sell, or move tokens." },
      { term: "Transaction History", def: "Every swap, transfer, and interaction a wallet has ever made — all public on-chain." },
      { term: "Solscan / Solana Explorer", def: "Block explorers that let you read Solana transaction data in human-readable form." },
      { term: "Whale Wallet", def: "A wallet holding a large amount of a token. When whales move, price often follows." },
      { term: "Smart Money", def: "Wallets consistently making profitable trades — often early VCs, insiders, or skilled traders." },
    ],
    questions: [
      { q: "What can on-chain analysis reveal that price charts cannot?", options: ["Future price predictions", "Who is actually buying and selling, and in what size", "The dev team's identity", "When the next bull market starts"], correct: 1, explanation: "Price charts show the result of trading activity. On-chain data shows who is doing it — whether whales are accumulating, insiders are dumping, or smart money is entering." },
      { q: "What is a block explorer?", options: ["A tool to find new tokens", "A website that lets you read all blockchain transaction data", "A crypto price tracker", "A wallet recovery tool"], correct: 1, explanation: "Solscan and Solana Explorer let you look up any wallet address, transaction, or token on Solana. Everything is public — no account needed." },
      { q: "A whale wallet you track just bought $500K of a token you've never heard of. What should you do?", options: ["Immediately buy as much as possible", "Research the token and understand why before making any decision", "Short the token — whales always dump", "Ignore it — whale wallets are always wrong"], correct: 1, explanation: "Whale activity is a signal worth investigating — but not a guaranteed buy signal. Research what the token is first. Whales can also be wrong, or already planning to exit." },
      { q: "What does it mean when multiple new wallets buy a token right before a major price spike?", options: ["Pure coincidence", "Possible insider trading or coordinated buying", "The token is about to rug", "Healthy organic growth"], correct: 1, explanation: "When fresh wallets with no history suddenly appear right before a pump, it often suggests insider knowledge or coordinated activity. This is a yellow flag worth noting." },
      { q: "On Solana, all transactions are:", options: ["Private unless you share them", "Public and permanently visible to anyone", "Only visible to wallet owners", "Deleted after 30 days"], correct: 1, explanation: "The blockchain is a public ledger. Every transaction you've ever made is permanently visible to anyone with a block explorer. There is no privacy on-chain without specific privacy tools." },
      { q: "What is 'smart money' in crypto?", options: ["Stablecoins only", "Wallets that consistently make profitable early trades — often insiders or skilled traders", "Money held on regulated exchanges", "Any wallet with over $1M in holdings"], correct: 1, explanation: "Smart money wallets consistently buy early and exit before crashes. Tracking them doesn't guarantee copying their success — they have information advantages you don't — but it's valuable signal." },
      { q: "A token's top 10 wallets hold 80% of supply. Is this a red flag?", options: ["No — concentration is normal", "Yes — extreme concentration means a few wallets can crash the price at will", "Only if one wallet holds it all", "No — it means strong conviction holders"], correct: 1, explanation: "Highly concentrated supply is a major risk. If the top 10 holders decide to sell simultaneously, no amount of buying pressure can stop the crash. Always check token distribution." },
    ],
  },

  {
    id: "staking", belt: "DEAN", icon: "🌾", title: "Staking & Yield Farming",
    quote: "Cluck Norris doesn't just hold. He puts his bags to work.",
    color: "#84CC16", glow: "rgba(132,204,22,0.4)",
    intro: "Staking and yield farming let your crypto work for you while you hold. But high APY comes with real risks that most beginners ignore. Understanding what you're actually earning — and what you're risking — is the difference between growing wealth and losing it.",
    concepts: [
      { term: "Staking", def: "Locking tokens to support a network or protocol in exchange for rewards." },
      { term: "APY", def: "Annual Percentage Yield — the yearly return on your staked or farmed assets." },
      { term: "Yield Farming", def: "Providing liquidity to DeFi protocols in exchange for token rewards, often at high APY." },
      { term: "Inflationary Rewards", def: "When staking rewards are paid by minting new tokens — diluting all existing holders." },
      { term: "Lock-up Period", def: "Time you must wait before unstaking. You can't sell during this period." },
    ],
    questions: [
      { q: "What does staking mean?", options: ["Selling tokens for a profit", "Locking tokens to support a network in exchange for rewards", "Providing liquidity to a DEX", "Holding tokens in a cold wallet"], correct: 1, explanation: "Staking involves locking your tokens in a protocol — either to validate transactions (proof of stake) or to earn protocol rewards. In return you receive staking rewards." },
      { q: "A protocol offers 500% APY. What is the most likely explanation?", options: ["The protocol is extremely profitable", "The rewards are paid in new tokens being minted — heavily inflationary", "It's a guaranteed safe investment", "The team is giving away their own money"], correct: 1, explanation: "Extremely high APY is almost always funded by token inflation. The protocol mints new tokens to pay you — but this dilutes the token's value. Your 500% APY might be worth very little if the token crashes." },
      { q: "What is impermanent loss in yield farming?", options: ["Losing your farming equipment", "Value loss compared to just holding when token prices diverge in an LP", "A penalty for early unstaking", "Taxes on farming rewards"], correct: 1, explanation: "When you provide liquidity and token prices diverge, the AMM rebalances your position. You end up with less of the token that went up. This loss is 'impermanent' but can become permanent if you exit." },
      { q: "What is a lock-up period?", options: ["When a token is frozen by regulators", "The time you must wait before you can unstake and access your tokens", "A security feature on hardware wallets", "When trading is paused on a DEX"], correct: 1, explanation: "Many staking protocols require you to lock your tokens for days, weeks, or months. During a crash, you cannot sell — this is a critical risk to understand before staking." },
      { q: "What does APY stand for?", options: ["Annual Protocol Yield", "Average Price Yesterday", "Annual Percentage Yield", "Asset Price Value"], correct: 2, explanation: "APY is Annual Percentage Yield — your projected return over a full year including compounding. Compare this to APR (Annual Percentage Rate) which doesn't include compounding." },
      { q: "You stake a token earning 100% APY. The token loses 80% of its value over the year. What happened?", options: ["You doubled your money", "You lost money — token price decline exceeded your staking rewards", "You broke even", "You earned 20% net profit"], correct: 1, explanation: "APY is denominated in the token you're earning. If that token crashes 80%, your 100% APY in tokens is worth only 20% of what you started with in dollar terms. Always consider token price risk alongside yield." },
      { q: "What is the safest type of yield in DeFi?", options: ["The highest APY available", "Yield from real protocol fees (not token emissions)", "Yield from newly launched protocols", "Yield paid in governance tokens"], correct: 1, explanation: "Real yield — paid from actual protocol fee revenue rather than token inflation — is the most sustainable. It's usually lower APY but backed by real economic activity, not just token printing." },
    ],
  },

  {
    id: "bags", belt: "CHANCELLOR", icon: "🎒", title: "How Bags.fm Works",
    quote: "Cluck Norris was born on Bags.fm. He knows the rules.",
    color: "#D97706", glow: "rgba(217,119,6,0.4)",
    intro: "Bags.fm is a Solana token launchpad where creators earn 1% of all trading volume forever. Understanding how it works — from launch to graduation to fee claiming — gives you an edge when evaluating any Bags.fm token.",
    concepts: [
      { term: "DBC (Dynamic Bonding Curve)", def: "The initial launch mechanism. Price increases as more tokens are bought along a curve." },
      { term: "Graduation", def: "When a token raises enough SOL on the bonding curve to migrate to a full Meteora DAMM V2 liquidity pool." },
      { term: "Creator Fees", def: "1% of all trading volume goes to the token creator — forever, whether they're active or not." },
      { term: "Partner Ref Code", def: "A referral code that earns a % of platform fees when users trade through your link." },
      { term: "Meteora DAMM V2", def: "The graduated liquidity pool — deeper liquidity, tighter spreads, more professional trading environment." },
    ],
    questions: [
      { q: "What is the DBC phase on Bags.fm?", options: ["A special governance vote", "The initial bonding curve launch phase where price rises with each buy", "A decentralized exchange listing", "A bug bounty program"], correct: 1, explanation: "DBC stands for Dynamic Bonding Curve. When a token launches on Bags.fm, it starts on a bonding curve — each buy raises the price slightly. Once enough SOL is raised, it graduates to a full liquidity pool." },
      { q: "What does graduation mean on Bags.fm?", options: ["The dev team leaves the project", "The token migrates from bonding curve to a full Meteora liquidity pool", "The token gets listed on Coinbase", "Trading is permanently locked"], correct: 1, explanation: "Graduation is a milestone — it means the token raised enough initial liquidity to move to Meteora DAMM V2, a professional AMM pool. Graduated tokens have deeper liquidity and more stable trading." },
      { q: "How much do Bags.fm creators earn from trading volume?", options: ["0.1%", "0.5%", "1%", "5%"], correct: 2, explanation: "Creators earn 1% of all trading volume on their token — forever. This means the more people trade your token, the more you earn, even if you never touch the project again." },
      { q: "What is a partner ref code on Bags.fm?", options: ["A discount code for launching tokens", "A referral code that earns you a % of platform fees when users trade through your link", "A verification badge", "An API access code"], correct: 1, explanation: "Partner ref codes let you earn a percentage of platform fees when users trade through your referral link. The CLKN trade link uses ref=firechicken007 — every trade through that link earns fees back to the FireChicken ecosystem." },
      { q: "What is Meteora DAMM V2?", options: ["A Solana validator", "A graduated liquidity pool providing deeper, more stable trading", "A token burning mechanism", "A CEX listing"], correct: 1, explanation: "Meteora DAMM V2 is where Bags.fm tokens go after graduation. It's a more sophisticated AMM with concentrated liquidity, tighter spreads, and better trading conditions than the initial bonding curve." },
      { q: "If a Bags.fm token never graduates, what happens?", options: ["It automatically lists on Raydium", "It stays on the bonding curve indefinitely or fails with low trading activity", "The dev gets their SOL back", "It becomes a stable coin"], correct: 1, explanation: "Not every Bags.fm token graduates. If a token doesn't attract enough buying pressure to fill the bonding curve, it stays there indefinitely. Many tokens fail at this stage — research is critical." },
      { q: "CLKN uses ref code firechicken007. What does this mean for the FireChicken ecosystem?", options: ["Nothing — it's just a username", "Every CLKN trade through that link generates fees that flow back to the FireChicken community", "It gives discounts to buyers", "It locks trading to only FireChicken holders"], correct: 1, explanation: "The firechicken007 partner ref code means a percentage of platform fees from every CLKN trade flows back to the FireChicken ecosystem. The education app, the community, and token holders all benefit from trading activity." },
    ],
  },

  {
    id: "memecoins", belt: "EMERITUS", icon: "🐸", title: "Memecoins & Culture",
    quote: "Cluck Norris IS a memecoin. He respects the game.",
    color: "#A855F7", glow: "rgba(168,85,247,0.4)",
    intro: "Memecoins are the most volatile, most dangerous, and most exciting corner of crypto. They have no utility — their value is entirely driven by community, narrative, and timing. Understanding how they work is how you survive them.",
    concepts: [
      { term: "Memecoin", def: "A token with no inherent utility — value is driven purely by community, narrative, and speculation." },
      { term: "Narrative", def: "The story or theme driving a memecoin's momentum. Dog coins, political figures, viral memes." },
      { term: "Community", def: "The single most important factor in a memecoin's success. A strong community creates buying pressure and holds through dips." },
      { term: "Pump and Dump", def: "Coordinated buying to raise price followed by coordinated selling — leaving late buyers holding worthless bags." },
      { term: "Degen Trading", def: "High-risk, high-reward trading strategy focused on early memecoin entries with small position sizes." },
    ],
    questions: [
      { q: "What gives a memecoin its value?", options: ["Real-world utility and revenue", "Community belief, narrative, and speculation", "Developer credentials", "Smart contract complexity"], correct: 1, explanation: "Memecoins have no fundamental value — no product, no revenue, no utility. Their value is entirely narrative-driven. The meme, the community, and the timing determine everything." },
      { q: "What is the most important factor in a memecoin's long-term survival?", options: ["The initial price", "A strong, engaged community that believes in the narrative", "CEX listings", "The dev team's coding ability"], correct: 1, explanation: "Memecoins that survive are held together by community. When the community believes and holds through dips, the token has a chance. When community leaves, it's over — no fundamentals to fall back on." },
      { q: "What is a pump and dump scheme?", options: ["A legitimate trading strategy", "Coordinated buying to raise price, then coordinated selling leaving late buyers with losses", "A type of yield farming", "How all crypto tokens work"], correct: 1, explanation: "Pump and dump groups coordinate buying to create artificial price spikes, then exit simultaneously. Late buyers — usually retail — are left holding worthless tokens. This is illegal in traditional markets but common in crypto." },
      { q: "What does degen trading mean?", options: ["Trading with insider information", "High-risk early entries into speculative tokens with small position sizes", "Day trading on CEXs", "Trading without doing any research"], correct: 1, explanation: "Degen (degenerate) trading is high-risk speculation — usually early entries into memecoins or new launches. Experienced degens use small position sizes, take profits early, and accept that most bets will fail." },
      { q: "You find a brand new memecoin at a $10K market cap with a funny meme. What is the correct risk management approach?", options: ["Put in everything — small cap = maximum upside", "Only invest what you can completely afford to lose — treat it like a lottery ticket", "Avoid it entirely — small caps are always scams", "Wait until it reaches $1M market cap to confirm legitimacy"], correct: 1, explanation: "Ultra small cap memecoins are essentially lottery tickets. The upside can be enormous but the probability of failure is very high. Only ever invest what you can afford to completely lose — because you probably will." },
      { q: "What is narrative in memecoin culture?", options: ["The project's technical whitepaper", "The story or theme driving community excitement and buying pressure", "The dev team's public statement", "The token's smart contract code"], correct: 1, explanation: "Narrative is everything in memecoin culture. 'Dog with hat', political figures, AI themes, animal coins — when a narrative captures the zeitgeist, it drives viral spread and buying pressure. Without narrative, there's nothing." },
      { q: "CLKN is a memecoin built on Bags.fm. What makes it different from a typical memecoin?", options: ["It has a working DeFi product", "It combines meme culture with a real education platform and fee-sharing ecosystem", "It has a fixed supply", "It's backed by real assets"], correct: 1, explanation: "CLKN is unique because it has an actual utility layer — the School of Crypto Hard Knocks — plus a fee-sharing mechanism where creator and partner fees flow back to the community. Most memecoins have nothing backing them." },
    ],
  },
];


// ── Shuffle question options ──
function shuffleOptions(question) {
  const indices = question.options.map((_, i) => i);
  // Fisher-Yates shuffle
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  const newOptions = indices.map(i => question.options[i]);
  const newCorrect = indices.indexOf(question.correct);
  return { ...question, options: newOptions, correct: newCorrect };
}

const BELT_BG   = { "FRESHMAN":"#F0F0F0","SOPHOMORE":"#FCD34D","JUNIOR":"#F97316","SENIOR":"#10B981","GRADUATE":"#06B6D4","POST-GRAD":"#92400E","TENURED":"#DC2626","HEADMASTER":"#111","PROFESSOR":"#14B8A6","DEAN":"#84CC16","CHANCELLOR":"#D97706","EMERITUS":"#A855F7" };
const BELT_TEXT = { "FRESHMAN":"#111","SOPHOMORE":"#111","JUNIOR":"#fff","SENIOR":"#fff","GRADUATE":"#fff","POST-GRAD":"#fff","TENURED":"#fff","HEADMASTER":"#D4AF37","PROFESSOR":"#fff","DEAN":"#111","CHANCELLOR":"#fff","EMERITUS":"#fff" };
function Belt({belt,small}){return(<span style={{display:"inline-block",background:BELT_BG[belt],color:BELT_TEXT[belt],fontFamily:"'Oswald',sans-serif",fontSize:small?9:10,fontWeight:700,letterSpacing:1.5,padding:small?"2px 6px":"3px 10px",borderRadius:3,border:belt==="BLACK BELT"?"1px solid #D4AF37":"none",textTransform:"uppercase"}}>{belt}</span>);}




// ── CLKN INCUBATOR ──
const INCUBATOR_LESSONS = [
  {
    id: "wallet",
    icon: "🥚",
    title: "What is a Wallet?",
    color: "#60A5FA",
    intro: "In crypto, a wallet doesn't hold money — it holds KEYS. Your wallet is basically a password manager for your crypto. There are two keys you need to know about.",
    concepts: [
      { term: "Public Key", def: "Like your home address — you can share it with anyone so they can send you crypto. It's safe to show." },
      { term: "Private Key / Seed Phrase", def: "Like the key to your front door. NEVER share this with anyone. Whoever has it owns your crypto." },
      { term: "Non-Custodial Wallet", def: "A wallet where YOU control the keys. Examples: Phantom, MetaMask. You are your own bank." },
      { term: "Custodial Wallet", def: "A wallet controlled by a company (like Coinbase). They hold your keys — if they go down, you could lose access." },
    ],
    questions: [
      { q: "Your public key is like your home address — safe to share so people can send you crypto.", options: ["True", "False"], correct: 0, explanation: "Correct! Your public key is safe to share. It's how others send crypto to you. Never confuse it with your private key or seed phrase." },
      { q: "You should share your seed phrase with customer support if they ask for it.", options: ["True", "False"], correct: 1, explanation: "NEVER share your seed phrase with anyone — ever. Legitimate support teams will never ask for it. Anyone asking is trying to steal your crypto." },
      { q: "With a non-custodial wallet, who controls your crypto?", options: ["The wallet company", "You do"], correct: 1, explanation: "Non-custodial means YOU hold the keys. No company can freeze or take your funds. With great power comes great responsibility — back up your seed phrase!" },
    ],
  },
  {
    id: "tokens",
    icon: "🐣",
    title: "What is a Token?",
    color: "#34D399",
    intro: "You've probably heard 'coin' and 'token' used interchangeably — but they're different. Understanding this helps you know what you're actually buying.",
    concepts: [
      { term: "Coin", def: "A native cryptocurrency that powers its own blockchain. Examples: SOL (Solana), ETH (Ethereum), BTC (Bitcoin)." },
      { term: "Token", def: "A crypto asset built ON TOP of an existing blockchain. CLKN is a token built on Solana. Tokens don't have their own blockchain." },
      { term: "Mint Address", def: "The unique ID of a token on Solana — like a social security number for the token. Used to identify the exact token you're buying." },
      { term: "Supply", def: "The total number of tokens that exist. A fixed supply means no more can ever be created." },
    ],
    questions: [
      { q: "SOL is a token built on the Ethereum blockchain.", options: ["True", "False"], correct: 1, explanation: "SOL is actually the native coin of the Solana blockchain — not Ethereum. Tokens are built ON a blockchain, while coins ARE the blockchain's currency." },
      { q: "What is CLKN?", options: ["A coin with its own blockchain", "A token built on Solana"], correct: 1, explanation: "CLKN is a Solana token — it lives on the Solana blockchain and uses SOL for transactions. It doesn't have its own blockchain." },
      { q: "Why does a token's mint address matter?", options: ["It shows how much the token is worth", "It uniquely identifies the exact token so you don't buy a fake copy"], correct: 1, explanation: "Scammers create fake tokens with similar names. The mint address is the only guaranteed way to confirm you have the right token. Always verify!" },
    ],
  },
  {
    id: "dex",
    icon: "🌱",
    title: "What is a DEX?",
    color: "#FBBF24",
    intro: "A DEX (Decentralized Exchange) lets you trade crypto directly from your wallet — no account, no ID, no bank. Think of it as a vending machine instead of a cashier.",
    concepts: [
      { term: "DEX", def: "Decentralized Exchange. A platform where you trade directly from your wallet using smart contracts. No company controls it." },
      { term: "CEX", def: "Centralized Exchange. A company (like Coinbase or Binance) that holds your crypto and processes trades. Requires an account and ID." },
      { term: "Smart Contract", def: "A self-executing program on the blockchain. When you trade on a DEX, a smart contract handles the swap automatically — no middleman." },
      { term: "Permissionless", def: "Anyone can use a DEX without approval. No application, no waiting, no ID required. Just connect your wallet and trade." },
    ],
    questions: [
      { q: "To use a DEX you need to create an account and verify your identity.", options: ["True", "False"], correct: 1, explanation: "DEXs are permissionless — just connect your wallet and trade. No signup, no ID, no approval needed. That's the beauty of DeFi." },
      { q: "On a DEX, who processes your trade?", options: ["A company employee", "A smart contract on the blockchain"], correct: 1, explanation: "Smart contracts automatically execute trades based on code. No human is involved — which means no one can stop your trade or freeze your funds." },
      { q: "Which is safer from company bankruptcy?", options: ["CEX (Centralized Exchange)", "DEX (Decentralized Exchange)"], correct: 1, explanation: "FTX, Celsius, and others showed the risk of CEXs — when they fail, user funds disappear. A DEX can't go bankrupt because no company holds your funds." },
    ],
  },
  {
    id: "liquidity",
    icon: "💧",
    title: "What is Liquidity?",
    color: "#06B6D4",
    intro: "Liquidity is basically how easy it is to buy or sell something without moving the price. More liquidity = smoother trades. Less liquidity = bigger price swings.",
    concepts: [
      { term: "Liquidity", def: "The amount of crypto available for trading. High liquidity = easy to buy/sell at stable prices. Low liquidity = prices jump around a lot." },
      { term: "Liquidity Pool", def: "A pot of two tokens locked in a smart contract that traders swap against. LP providers deposit tokens and earn fees from every trade." },
      { term: "Slippage", def: "When you actually pay more (or get less) than the displayed price because the trade moved the market. Common with low liquidity tokens." },
      { term: "Price Impact", def: "How much YOUR trade moves the price. A big buy in a small pool pushes the price up significantly." },
    ],
    questions: [
      { q: "A token with $500 in liquidity is easier to trade without price impact than one with $500,000.", options: ["True", "False"], correct: 1, explanation: "More liquidity means your trade is a smaller percentage of the pool, causing less price impact. Low liquidity tokens can move dramatically on even small trades." },
      { q: "What is slippage?", options: ["A fee charged by the DEX", "The difference between expected price and actual price you receive"], correct: 1, explanation: "Slippage happens because prices change between when you submit a trade and when it executes. High slippage tolerance protects against failed transactions but exposes you to worse prices." },
      { q: "You want to buy a token. Which pool is safer to trade in?", options: ["Pool with $1,000 liquidity", "Pool with $100,000 liquidity"], correct: 1, explanation: "More liquidity means less price impact on your trade. A $1,000 pool could move dramatically on a $100 buy. Always check liquidity before trading." },
    ],
  },
  {
    id: "marketcap",
    icon: "📈",
    title: "What is Market Cap?",
    color: "#A78BFA",
    intro: "Price alone doesn't tell you how big a project is. A token at $0.000001 could be worth more overall than one at $100. Market cap is the real measure.",
    concepts: [
      { term: "Market Cap", def: "Price × Circulating Supply. This is the true size of a project. A $0.00001 token with 1 trillion supply has a $10M market cap." },
      { term: "Circulating Supply", def: "The number of tokens actually available to trade right now. Locked or unvested tokens don't count." },
      { term: "FDV (Fully Diluted Valuation)", def: "Price × Total Supply (including tokens not yet released). Shows what the market cap would be if all tokens existed today." },
      { term: "Price vs Value", def: "A cheap price doesn't mean a good deal. Always check market cap. A $0.001 token with $1B market cap has less room to grow than a $10 token with $1M market cap." },
    ],
    questions: [
      { q: "Token A costs $100 and Token B costs $0.001. Token A is definitely the bigger project.", options: ["True", "False"], correct: 1, explanation: "Price means nothing without supply context. Token B could have a trillion tokens in supply making it worth far more overall. Always check market cap, not just price." },
      { q: "What is market cap?", options: ["The highest price a token has ever reached", "Price multiplied by circulating supply"], correct: 1, explanation: "Market cap = price × circulating supply. It's the most important metric for comparing project sizes. Two tokens at the same price can have wildly different market caps." },
      { q: "A token has a $500K market cap. What does that mean?", options: ["The project raised $500K", "The total value of all circulating tokens is $500K"], correct: 1, explanation: "Market cap represents the current total value of all tokens in circulation at today's price. It's not money raised — it's market valuation." },
    ],
  },
  {
    id: "safety",
    icon: "🔑",
    title: "Staying Safe in Crypto",
    color: "#F87171",
    intro: "Crypto has no customer service hotline. No chargebacks. No refunds. Once your crypto is gone, it's gone. These basics will protect you from the most common traps.",
    concepts: [
      { term: "Rug Pull", def: "When developers abandon a project and take all the liquidity, leaving holders with worthless tokens. Research the team and check if liquidity is locked." },
      { term: "Phishing", def: "Fake websites or DMs designed to steal your seed phrase or private key. Always verify URLs. Never click links from strangers." },
      { term: "DYOR", def: "Do Your Own Research. Never invest based on hype or someone else's advice alone. Read, verify, think critically." },
      { term: "Mint Authority", def: "If a token's mint authority isn't revoked, the creator can print unlimited new tokens and crash the price. Check this before buying." },
    ],
    questions: [
      { q: "Someone DMs you on Telegram offering to help recover your wallet — you should share your seed phrase with them.", options: ["True", "False"], correct: 1, explanation: "NEVER. This is the most common scam in crypto. No legitimate person will ever need your seed phrase. Anyone asking for it is trying to steal everything in your wallet." },
      { q: "Locked liquidity on a token means:", options: ["The token can't be traded", "Developers can't remove the trading liquidity for a set period — reducing rug pull risk"], correct: 1, explanation: "Locked liquidity is a major trust signal. It means devs physically cannot drain the pool during the lock period. Always check if liquidity is locked before buying." },
      { q: "What does DYOR mean?", options: ["Do Your Own Research", "Don't Yield On Returns"], correct: 0, explanation: "Do Your Own Research. In crypto, you are your own bank and your own analyst. Never rely solely on influencers, Telegram groups, or random advice. Verify everything yourself." },
    ],
  },
];

function Incubator({ onComplete, onBack }) {
  const [lessonIdx, setLessonIdx] = useState(0);
  const [phase, setPhase] = useState("intro"); // intro | quiz
  const [qi, setQi] = useState(0);
  const [sel, setSel] = useState(null);
  const [showExp, setShowExp] = useState(false);
  const [completed, setCompleted] = useState([]);

  const lesson = INCUBATOR_LESSONS[lessonIdx];
  const shuffledIncubatorQs = useMemo(() => lesson ? lesson.questions.map(shuffleOptions) : [], [lessonIdx]);
  const q = shuffledIncubatorQs[qi];
  const allDone = completed.length === INCUBATOR_LESSONS.length;

  function pick(i) {
    if (sel !== null) return;
    setSel(i);
    setShowExp(true);
  }

  function next() {
    if (qi + 1 < lesson.questions.length) {
      setQi(qi + 1);
      setSel(null);
      setShowExp(false);
    } else {
      // Lesson complete
      const newCompleted = [...completed, lesson.id];
      setCompleted(newCompleted);
      if (lessonIdx + 1 < INCUBATOR_LESSONS.length) {
        setLessonIdx(lessonIdx + 1);
        setPhase("intro");
        setQi(0);
        setSel(null);
        setShowExp(false);
      } else {
        setPhase("complete");
      }
    }
  }

  // Completion screen
  if (phase === "complete") return (
    <div style={{padding:"0 16px 40px",maxWidth:520,margin:"0 auto",textAlign:"center"}}>
      <div style={{fontSize:60,marginBottom:16}}>🐔</div>
      <div style={{fontFamily:"'Oswald',sans-serif",fontSize:11,letterSpacing:4,color:"#60A5FA",marginBottom:8}}>INCUBATOR COMPLETE</div>
      <h2 style={{fontFamily:"'Oswald',sans-serif",fontSize:28,fontWeight:900,color:"#F9FAFB",margin:"0 0 8px",lineHeight:1}}>YOU'VE HATCHED!</h2>
      <p style={{fontFamily:"'Oswald',sans-serif",fontSize:14,color:"#9CA3AF",marginBottom:24,fontStyle:"italic",lineHeight:1.6}}>
        "Every legend started somewhere. Now step into the real Hard Knocks."
      </p>
      <div style={{background:"rgba(96,165,250,0.08)",border:"1px solid rgba(96,165,250,0.3)",borderRadius:12,padding:20,marginBottom:24}}>
        <div style={{display:"flex",justifyContent:"center",gap:12,flexWrap:"wrap"}}>
          {INCUBATOR_LESSONS.map(l=>(
            <div key={l.id} style={{textAlign:"center"}}>
              <div style={{fontSize:24}}>{l.icon}</div>
              <div style={{fontFamily:"'Oswald',sans-serif",fontSize:8,color:"#60A5FA",letterSpacing:1,marginTop:2}}>✓</div>
            </div>
          ))}
        </div>
        <div style={{fontFamily:"'Oswald',sans-serif",fontSize:13,color:"#9CA3AF",marginTop:12,letterSpacing:1}}>{INCUBATOR_LESSONS.length} LESSONS COMPLETED</div>
      </div>
      <button onClick={onComplete} style={{width:"100%",background:"linear-gradient(135deg,#60A5FA,#3B82F6)",border:"none",borderRadius:10,padding:"16px",fontFamily:"'Oswald',sans-serif",fontSize:15,fontWeight:700,color:"#fff",letterSpacing:3,cursor:"pointer",boxShadow:"0 0 28px rgba(96,165,250,0.4)",marginBottom:10}}>
        🏫 ENTER THE SCHOOL OF HARD KNOCKS
      </button>
      <button onClick={onBack} style={{background:"none",border:"none",color:"#6B7280",fontFamily:"'Oswald',sans-serif",fontSize:11,letterSpacing:2,cursor:"pointer"}}>
        ← BACK
      </button>
    </div>
  );

  // Intro/concept screen
  if (phase === "intro") return (
    <div style={{padding:"0 16px 40px",maxWidth:520,margin:"0 auto"}}>
      {/* Progress dots */}
      <div style={{display:"flex",gap:6,justifyContent:"center",marginBottom:20}}>
        {INCUBATOR_LESSONS.map((l,i)=>(
          <div key={l.id} style={{width:28,height:28,borderRadius:"50%",background:completed.includes(l.id)?"rgba(96,165,250,0.3)":i===lessonIdx?lesson.color:"rgba(255,255,255,0.08)",border:`2px solid ${completed.includes(l.id)?"#60A5FA":i===lessonIdx?lesson.color:"rgba(255,255,255,0.1)"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12}}>
            {completed.includes(l.id) ? "✓" : l.icon}
          </div>
        ))}
      </div>
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{fontSize:40,marginBottom:8}}>{lesson.icon}</div>
        <div style={{fontFamily:"'Oswald',sans-serif",fontSize:10,letterSpacing:3,color:lesson.color,marginBottom:4}}>LESSON {lessonIdx+1} OF {INCUBATOR_LESSONS.length}</div>
        <h2 style={{fontFamily:"'Oswald',sans-serif",fontSize:26,fontWeight:900,color:"#F9FAFB",margin:"0 0 12px"}}>{lesson.title}</h2>
        <p style={{color:"#9CA3AF",fontSize:14,lineHeight:1.7,margin:0}}>{lesson.intro}</p>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:20}}>
        {lesson.concepts.map(c=>(
          <div key={c.term} style={{background:"rgba(255,255,255,0.03)",border:`1px solid ${lesson.color}30`,borderRadius:10,padding:"12px 14px"}}>
            <div style={{fontFamily:"'Oswald',sans-serif",fontSize:13,fontWeight:700,color:lesson.color,marginBottom:4}}>{c.term}</div>
            <div style={{fontSize:13,color:"#9CA3AF",lineHeight:1.6}}>{c.def}</div>
          </div>
        ))}
      </div>
      <AskCluck context={lesson.title} compact={true}/>
      <button onClick={()=>setPhase("quiz")} style={{width:"100%",background:lesson.color,border:"none",borderRadius:10,padding:"14px",fontFamily:"'Oswald',sans-serif",fontSize:15,fontWeight:700,color:"#fff",letterSpacing:3,cursor:"pointer",marginTop:12}}>
        ✅ QUICK CHECK →
      </button>
      <button onClick={onBack} style={{display:"block",margin:"12px auto 0",background:"none",border:"none",color:"#6B7280",fontFamily:"'Oswald',sans-serif",fontSize:10,letterSpacing:2,cursor:"pointer"}}>
        ← BACK TO ENTRANCE
      </button>
    </div>
  );

  // Quiz screen
  return (
    <div style={{padding:"0 16px 40px",maxWidth:520,margin:"0 auto"}}>
      <div style={{marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"#6B7280",fontFamily:"'Oswald',sans-serif",letterSpacing:1,marginBottom:5}}>
          <span style={{color:lesson.color}}>{lesson.icon} {lesson.title.toUpperCase()}</span>
          <span>Q {qi+1} OF {lesson.questions.length}</span>
        </div>
        <div style={{height:4,background:"rgba(255,255,255,0.08)",borderRadius:2}}>
          <div style={{height:"100%",width:`${(qi/lesson.questions.length)*100}%`,background:lesson.color,borderRadius:2}}/>
        </div>
      </div>
      <div style={{background:"rgba(255,255,255,0.03)",border:`1px solid ${lesson.color}40`,borderRadius:12,padding:20,marginBottom:14}}>
        <p style={{fontFamily:"'Oswald',sans-serif",fontSize:18,color:"#F9FAFB",margin:0,lineHeight:1.4}}>{q.q}</p>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:16}}>
        {q.options.map((opt,i)=>{
          let bg="rgba(255,255,255,0.03)",border="1px solid rgba(255,255,255,0.08)",color="#D1D5DB";
          if(sel!==null){
            if(i===q.correct){bg="rgba(16,185,129,0.15)";border="1px solid #10B981";color="#10B981";}
            else if(i===sel){bg="rgba(239,68,68,0.15)";border="1px solid #EF4444";color="#EF4444";}
          }
          return(<button key={i} onClick={()=>pick(i)} style={{background:bg,border,borderRadius:10,padding:"14px",color,cursor:sel!==null?"default":"pointer",textAlign:"left",fontSize:15,fontWeight:600}}>
            {opt}
          </button>);
        })}
      </div>
      {showExp&&(<>
        <div style={{background:sel===q.correct?"rgba(16,185,129,0.08)":"rgba(239,68,68,0.08)",border:`1px solid ${sel===q.correct?"#10B981":"#EF4444"}`,borderRadius:10,padding:14,marginBottom:12}}>
          <div style={{fontFamily:"'Oswald',sans-serif",fontSize:10,letterSpacing:1,color:sel===q.correct?"#10B981":"#EF4444",marginBottom:5}}>{sel===q.correct?"✓ CORRECT!":"✗ NOT QUITE — HERE'S WHY:"}</div>
          <p style={{margin:0,color:"#D1D5DB",fontSize:13,lineHeight:1.6}}>{q.explanation}</p>
        </div>
        <AskCluck context={lesson.title} compact={true}/>
        <button onClick={next} style={{width:"100%",background:lesson.color,border:"none",borderRadius:10,padding:"13px",fontFamily:"'Oswald',sans-serif",fontSize:14,fontWeight:700,color:"#fff",letterSpacing:2,cursor:"pointer",marginTop:8}}>
          {qi+1<lesson.questions.length?"NEXT QUESTION →":"NEXT LESSON →"}
        </button>
      </>)}
    </div>
  );
}

// ── ULTIMATE CHALLENGE QUESTIONS (never seen in lessons) ──
const CHALLENGE_QUESTIONS = [
  { q: "What is a flash loan?", options: ["A loan that charges high interest", "An uncollateralized loan borrowed and repaid in a single transaction block", "A fast bank wire transfer", "A short-term margin loan on a CEX"], correct: 1, explanation: "Flash loans are unique to DeFi — you borrow any amount with zero collateral as long as you repay it within the same transaction. Used for arbitrage, liquidations, and collateral swaps." },
  { q: "What does TVL stand for in DeFi?", options: ["Total Value Locked", "Token Velocity Limit", "Timed Vesting Ledger", "Total Volume Listed"], correct: 0, explanation: "TVL (Total Value Locked) measures the total value of crypto assets deposited in a DeFi protocol. It's the primary metric for gauging a protocol's size and adoption." },
  { q: "What is a reentrancy attack?", options: ["A bot that front-runs your transactions", "An exploit where a malicious contract repeatedly calls back into a vulnerable contract before the first call finishes", "A phishing attack targeting wallet seed phrases", "A sandwich attack on a DEX"], correct: 1, explanation: "Reentrancy attacks drained The DAO in 2016. A malicious contract calls back into the target before the balance is updated, allowing repeated withdrawals. The fix is to update state before external calls." },
  { q: "What is the difference between APR and APY?", options: ["APR includes compound interest, APY does not", "APY includes compound interest, APR does not", "They are identical metrics", "APR is for lending, APY is for staking only"], correct: 1, explanation: "APR (Annual Percentage Rate) is simple interest. APY (Annual Percentage Yield) accounts for compounding. A 100% APR compounded daily becomes ~271% APY. Always compare APY to APY." },
  { q: "What is a multisig wallet?", options: ["A wallet that holds multiple tokens", "A wallet requiring multiple private key signatures to authorize a transaction", "A wallet with multiple recovery phrases", "A shared exchange account"], correct: 1, explanation: "Multisig wallets require M-of-N signatures to execute transactions. A 2-of-3 multisig needs 2 out of 3 keyholders to sign. Used by DAOs and projects to prevent single points of failure." },
  { q: "What happens during a short squeeze in crypto?", options: ["Short sellers profit as price drops", "Forced buying by short sellers drives prices rapidly higher", "Liquidity dries up and spreads widen", "A token's supply is permanently reduced"], correct: 1, explanation: "When a shorted asset rises, short sellers face losses and must buy to cover positions. This buying pressure drives prices even higher, forcing more shorts to close — a self-reinforcing squeeze." },
  { q: "What is a Merkle tree in blockchain?", options: ["A data structure that allows efficient verification of large data sets", "A type of consensus algorithm", "A governance voting mechanism", "A cross-chain bridge protocol"], correct: 0, explanation: "Merkle trees hash pairs of data recursively until a single root hash represents all the data. Blockchains use them to efficiently verify transaction inclusion without downloading the entire chain." },
  { q: "What is the purpose of a nonce in Ethereum/Solana transactions?", options: ["To encrypt the transaction data", "To ensure each transaction is unique and prevent replay attacks", "To calculate gas fees", "To identify the receiving wallet"], correct: 1, explanation: "A nonce is a sequential number assigned to each transaction from a wallet. It prevents the same transaction from being submitted twice and ensures transactions are processed in order." },
  { q: "What is delta-neutral in DeFi?", options: ["A strategy with equal long and short exposure that profits regardless of price direction", "A token with zero price movement", "A pool with perfectly balanced reserves", "A zero-fee trading pair"], correct: 0, explanation: "Delta-neutral strategies eliminate directional price exposure. A trader might hold a token while shorting it on a perp exchange, earning yield without caring if price goes up or down." },
  { q: "What is EIP-1559 and why does it matter?", options: ["An Ethereum upgrade that introduced burning of base fees, reducing ETH supply", "An Ethereum upgrade that increased block size", "A proposal to merge Ethereum with Bitcoin", "An Ethereum upgrade that reduced validator rewards"], correct: 0, explanation: "EIP-1559 introduced a base fee that gets burned with every transaction plus an optional priority tip. This made ETH deflationary during high usage periods and improved fee predictability." },
  { q: "What is the Oracle problem in DeFi?", options: ["Smart contracts cannot natively access real-world data — oracles bridge this gap but introduce trust and manipulation risks", "Oracles are too slow for DeFi", "DeFi protocols cannot verify oracle identities", "Oracles charge fees that erode yields"], correct: 0, explanation: "Smart contracts are deterministic and isolated — they can't call external APIs. Oracles feed in external data (prices, events), but a manipulated oracle can drain an entire protocol." },
  { q: "What is a vampire attack in DeFi?", options: ["A protocol that offers better incentives to migrate liquidity from a competitor", "A rug pull disguised as a legitimate project", "A flash loan exploit targeting AMMs", "A bot that drains unclaimed airdrops"], correct: 0, explanation: "Vampire attacks lure liquidity providers away from established protocols with higher rewards. SushiSwap famously drained $1B+ from Uniswap v2 in 2020 by offering SUSHI rewards to migrating LPs." },
  { q: "What is the significance of a token's fully diluted valuation (FDV)?", options: ["It shows current market cap based on circulating supply", "It shows market cap if all tokens including unlocked future supply were in circulation", "It measures total liquidity in all pools", "It calculates the token's all-time-high valuation"], correct: 1, explanation: "FDV = current price × max supply. If FDV is 100x market cap, most tokens haven't entered circulation yet. Large FDV-to-mcap ratios signal heavy future sell pressure from unlocks." },
  { q: "What is concentrated liquidity in AMMs?", options: ["All liquidity concentrated in one wallet", "LPs specify a price range for their liquidity, earning more fees per dollar when price is in range", "A pool with only one token", "Liquidity locked permanently in a protocol"], correct: 1, explanation: "Uniswap v3 introduced concentrated liquidity. LPs choose a price range — their capital only earns fees when the token trades within that range, but it's more capital-efficient than full-range LPs." },
  { q: "What is a bonding curve used for beyond token launches?", options: ["Only for memecoins", "Continuous token models, NFT pricing, DAO treasury management, and automated market making", "Calculating staking yields", "Determining validator rewards"], correct: 1, explanation: "Bonding curves automate price discovery in many contexts — DAOs use them for continuous token issuance, NFT projects use them for dynamic pricing, and AMMs are essentially bonding curves." },
  { q: "What is a governance attack?", options: ["Hacking a DAO's frontend website", "Accumulating enough governance tokens to pass malicious proposals", "Spamming a DAO's forum", "Forking a protocol to steal its brand"], correct: 1, explanation: "In 2022, Beanstalk lost $182M to a governance attack. The attacker took a flash loan to get 67% of voting power, passed a malicious proposal in the same transaction, and drained the treasury." },
  { q: "What does it mean when a token has mint authority revoked?", options: ["The token can no longer be traded", "No new tokens can ever be created — supply is permanently fixed", "The token creator lost access to their wallet", "The token's metadata cannot be updated"], correct: 1, explanation: "Revoking mint authority means nobody — including the creator — can ever mint new tokens. It's a major trust signal. Without it, devs could inflate supply at will and dump on holders." },
  { q: "What is the role of a sequencer in Layer 2 networks?", options: ["It validates blocks on the L1 chain", "It orders and batches L2 transactions before posting them to L1", "It bridges tokens between chains", "It generates zero-knowledge proofs"], correct: 1, explanation: "Sequencers order transactions and batch them efficiently before submitting to L1. Most L2s today use centralized sequencers — a trust assumption that's a known decentralization risk." },
  { q: "What is the difference between a hot wallet and a cold wallet?", options: ["Hot wallets hold more tokens", "Hot wallets are connected to the internet, cold wallets are offline — cold is significantly more secure", "Cold wallets are faster for transactions", "Hot wallets require KYC"], correct: 1, explanation: "Hot wallets (Phantom, MetaMask) are online and convenient but exposed to attacks. Cold wallets (Ledger, Trezor) store keys offline — to sign a transaction, you physically approve it on the device." },
  { q: "What is a liquidity bootstrapping pool (LBP)?", options: ["A pool that borrows liquidity from other protocols", "A token launch mechanism using dynamic weights to start high and drop price, discouraging bots and whales", "A pool that rewards LPs with governance tokens", "A fixed-price token sale mechanism"], correct: 1, explanation: "LBPs start with a high token weight (e.g., 96% token / 4% USDC) that shifts over time. Price starts high and drops unless buyers push it up — naturally discouraging front-running bots and whale snipers." },
  { q: "What is a crypto airdrop?", options: ["A hack where tokens are stolen from your wallet", "Free token distribution to wallet addresses, often to reward holders or grow a community", "A pump and dump scheme", "A type of staking reward"], correct: 1, explanation: "Airdrops distribute free tokens to wallets — usually to bootstrap a community, reward early users, or distribute governance tokens. Always verify legitimacy before claiming as fake airdrop sites steal wallets." },
  { q: "What does DEGEN mean in crypto culture?", options: ["A developer working on blockchain infrastructure", "Someone who makes high-risk speculative trades, often in low-cap tokens", "A decentralized governance entity", "A type of NFT collection"], correct: 1, explanation: "Degen (degenerate) is a self-aware term for traders who chase high-risk, high-reward plays — often in new tokens with little due diligence. Worn as a badge of honor in DeFi culture." },
  { q: "What is a dead cat bounce?", options: ["A token that has permanently failed", "A temporary price recovery after a large drop, before continuing lower", "A whale manipulation tactic", "A type of flash loan attack"], correct: 1, explanation: "A dead cat bounce is a brief price recovery after a steep decline — the name implies even a dead cat bounces if dropped from high enough. Traders watch for these to avoid buying false recoveries." },
  { q: "What does NGMI stand for?", options: ["Not Going to Make It — used for poor decisions or bearish outlooks", "New Governance Market Initiative", "No Gas Money Included", "Next Generation Market Index"], correct: 0, explanation: "NGMI (Not Gonna Make It) is crypto slang for someone making bad decisions — selling too early, panic selling, falling for scams. Its opposite is WAGMI (We're All Gonna Make It)." },
  { q: "What is token vesting?", options: ["A security audit process for smart contracts", "A schedule that gradually releases locked tokens over time to prevent immediate selling", "A mechanism for burning tokens", "A type of liquidity mining"], correct: 1, explanation: "Vesting locks team, investor, and advisor tokens and releases them gradually over months or years. It aligns long-term incentives and prevents insiders from dumping immediately after launch." },
  { q: "What is a honeypot token?", options: ["A token with unusually high APY", "A malicious token you can buy but not sell — designed to trap buyers", "A token backed by physical gold", "A decentralized savings account"], correct: 1, explanation: "Honeypot tokens look attractive to buy but the smart contract prevents selling. Buyers are trapped while the creator drains liquidity. Always test with a small amount and check the contract on rugcheck.xyz." },
  { q: "What is the difference between a market order and a limit order?", options: ["Market orders execute immediately at current price; limit orders execute only at a specified price", "Limit orders are faster than market orders", "Market orders only work on CEXs", "They are identical on DEXs"], correct: 0, explanation: "Market orders buy/sell immediately at whatever price is available. Limit orders only execute when the price hits your target. DEXs typically use market orders against pool liquidity, which is why slippage matters." },
  { q: "What does diamond hands mean?", options: ["Owning NFTs with diamond rarity", "Holding an asset through extreme volatility without selling", "A wallet with over $1M in crypto", "A multi-sig wallet requiring 3 signatures"], correct: 1, explanation: "Diamond hands means holding your position no matter how bad the dip gets. The opposite is paper hands — selling at the first sign of trouble. Neither is always right — context matters." },
  { q: "What is a 51% attack?", options: ["A hack targeting 51% of a protocol's liquidity", "When one entity controls more than 50% of a network's mining or validation power and can manipulate transactions", "A governance attack requiring 51% of votes", "A smart contract exploit affecting majority holders"], correct: 1, explanation: "If one entity controls 51%+ of a blockchain's consensus power, they can double-spend transactions and reorganize the chain. This is why decentralization of validators matters — Solana has thousands of validators." },
  { q: "What does paper hands mean?", options: ["A trader who uses leverage", "Selling an asset quickly at the first sign of loss or volatility", "A crypto paper wallet", "A whale who pretends to be a small holder"], correct: 1, explanation: "Paper hands describes someone who panics and sells too early — usually at a loss. While sometimes the right call, it's often driven by emotion rather than analysis." },
  { q: "What is yield farming?", options: ["Mining Bitcoin using renewable energy", "Moving crypto between DeFi protocols to maximize returns from fees and rewards", "Staking SOL to secure the network", "Creating new tokens on a bonding curve"], correct: 1, explanation: "Yield farmers move liquidity between protocols chasing the highest APY — combining LP fees, governance token rewards, and other incentives. High yields often come with high risks including smart contract bugs and IL." },
  { q: "What does TVL tell you about a DeFi protocol?", options: ["The total number of users", "The total dollar value of assets deposited — a proxy for trust and adoption", "The token's market cap", "The protocol's annual revenue"], correct: 1, explanation: "TVL (Total Value Locked) measures how much crypto users have deposited. High TVL signals user trust and liquidity depth. Falling TVL can signal users losing confidence or finding better yields elsewhere." },
  { q: "What is a whale in crypto?", options: ["A protocol with over $1B TVL", "A wallet holding a large enough position to move market prices", "An NFT collection with over 10000 items", "A validator with maximum stake"], correct: 1, explanation: "Whales hold enough of a token that their buys and sells significantly impact price. Watching whale wallets on-chain can provide signals — though whales also set traps by faking moves to trigger retail reactions." },
  { q: "What is the purpose of token burning?", options: ["To increase liquidity in pools", "To permanently remove tokens from circulation reducing supply and potentially increasing scarcity", "To migrate tokens to a new contract", "To distribute tokens to holders"], correct: 1, explanation: "Burning sends tokens to an address no one controls. It permanently reduces supply. Some protocols burn a portion of fees — Ethereum burns base fees via EIP-1559 making ETH deflationary at high usage." },
  { q: "What is a genesis block?", options: ["The first block ever mined on a blockchain", "The block containing the largest transaction ever", "A special governance block", "The block where a token was first launched"], correct: 0, explanation: "The genesis block is block #0 — the very first block on any blockchain. Bitcoin's genesis block was mined by Satoshi Nakamoto on January 3, 2009. It cannot be modified or deleted." },
  { q: "What does FOMO mean and why is it dangerous in crypto?", options: ["Fear Of Missing Out — leads to buying tops impulsively without research", "First On Market Opportunity — a launch strategy", "Full On Market Order — a trading term", "Federal On-chain Market Observer"], correct: 0, explanation: "FOMO (Fear Of Missing Out) drives impulsive buying after big price moves — usually near the top. Buying purely because something is up 500% is how retail gets wrecked. Always research before buying." },
  { q: "What is a smart contract audit?", options: ["A tax review of crypto transactions", "A security review of smart contract code to find vulnerabilities before deployment", "A governance vote on protocol changes", "An on-chain transaction verification"], correct: 1, explanation: "Audits have professional security firms review smart contract code for bugs, exploits, and logic errors. They're a critical trust signal — but not a guarantee. Many audited protocols have still been exploited." },
  { q: "What is the mempool?", options: ["A pool of liquidity for memecoins", "The waiting area where unconfirmed transactions sit before being included in a block", "A type of memory storage for validators", "A cross-chain bridge buffer"], correct: 1, explanation: "The mempool holds pending transactions waiting to be confirmed. MEV bots monitor the mempool in real time, looking for profitable opportunities like sandwich attacks on large pending swaps." },
  { q: "What does gwei refer to?", options: ["A Solana transaction fee unit", "A small denomination of ETH used to measure gas prices", "A governance weight index", "A cross-chain bridge fee"], correct: 1, explanation: "Gwei is a denomination of ETH — 1 ETH = 1,000,000,000 gwei. Gas prices on Ethereum are quoted in gwei. Higher gwei = faster confirmation. On Solana fees are in lamports (1 SOL = 1B lamports)." },
  { q: "What is a bag holder?", options: ["A large holder of a token", "Someone stuck holding a token that has crashed significantly in value", "A cold storage hardware wallet", "A multi-token portfolio manager"], correct: 1, explanation: "A bag holder bought at a higher price and is now stuck holding a token deep in the red. The term implies they're waiting for a recovery. The best prevention is position sizing and stop losses." },
  { q: "What is cross-chain bridging?", options: ["Moving tokens from one blockchain to another using a bridge protocol", "Connecting two liquidity pools on the same chain", "A governance mechanism for multi-chain DAOs", "A type of yield farming across protocols"], correct: 0, explanation: "Bridges lock tokens on one chain and mint equivalent tokens on another. They're one of crypto's biggest security risks — billions have been lost to bridge exploits including Ronin ($625M) and Wormhole ($320M)." },
  { q: "What is a soft rug?", options: ["A partial liquidity removal that slowly drains a project", "A rug pull on a decentralized protocol", "A team gradually abandoning a project without formally closing it", "A price decline of less than 50%"], correct: 2, explanation: "A soft rug is when a team quietly abandons a project — stops developing, goes silent, and eventually disappears without officially pulling liquidity. Slower and sneakier than a hard rug but equally damaging." },
  { q: "What is an NFT?", options: ["A type of fungible token on Ethereum", "A unique digital asset verified on-chain — each one is distinct and non-interchangeable", "A governance token for DeFi protocols", "A stablecoin backed by digital art"], correct: 1, explanation: "NFT (Non-Fungible Token) means each token is unique — unlike CLKN where every token is identical. NFTs represent ownership of unique items: art, gaming items, domain names, event tickets, and more." },
  { q: "What does on-chain mean?", options: ["Data stored in a centralized database", "Transactions and data recorded directly on the blockchain — transparent and immutable", "A type of cross-chain communication", "Private transactions hidden from validators"], correct: 1, explanation: "On-chain means it happened on the actual blockchain — recorded, transparent, and permanent. Anyone can verify on-chain data using a block explorer. Off-chain means outside the blockchain like a company database." },
  { q: "What is a governance token?", options: ["A token that automatically earns yield", "A token giving holders voting rights on protocol decisions", "A stablecoin used for DAO treasury management", "A token backed by real-world assets"], correct: 1, explanation: "Governance tokens let holders vote on protocol changes — fee structures, treasury spending, new features, partnerships. Examples: UNI (Uniswap), AAVE, MKR (MakerDAO). Voting power is usually proportional to tokens held." },
  { q: "What is a stablecoin?", options: ["A token pegged to a stable asset like USD designed to minimize price volatility", "Any token that has not moved in price for 30 days", "A low-volatility index token", "A token backed by physical gold only"], correct: 0, explanation: "Stablecoins maintain a peg to a reference asset (usually USD). Types: fiat-backed (USDC, USDT), crypto-backed (DAI), and algorithmic (UST — which famously collapsed in 2022 wiping out billions)." },
  { q: "What is alpha in crypto?", options: ["The first token launched on a new blockchain", "Exclusive or early information that gives a trading edge", "A measure of portfolio volatility", "The genesis phase of a token launch"], correct: 1, explanation: "Alpha means insider edge — information or insights that most of the market does not have yet. Sharing alpha means giving valuable tips. Finding alpha is the constant search for an edge in an information-rich market." },
  { q: "What is a pump and dump?", options: ["A legitimate marketing strategy for token launches", "Artificially inflating a token price through coordinated buying then selling at the top on unsuspecting buyers", "A high APY liquidity mining program", "A bonding curve that increases then decreases price"], correct: 1, explanation: "Pump and dumps involve coordinated buying to drive price up while promoting the token, then insiders sell at the top leaving retail holding worthless bags. Illegal in traditional markets, rampant in crypto." },
  { q: "What is dollar cost averaging?", options: ["Converting all crypto to stablecoins during bear markets", "Investing fixed amounts at regular intervals regardless of price", "Calculating the average cost of a token across multiple purchases", "A strategy for timing the exact market bottom"], correct: 1, explanation: "DCA involves buying a fixed dollar amount regularly — weekly, monthly — regardless of price. It removes the pressure of timing the market perfectly and averages out entry price over time. Widely recommended for long-term investors." },
  { q: "What is alt season?", options: ["The time of year crypto markets are most active", "A period when altcoins outperform Bitcoin significantly", "The launch window for new token projects", "A quarterly governance voting period"], correct: 1, explanation: "Alt season is when capital flows from Bitcoin into altcoins, causing broad altcoin outperformance. Typically follows Bitcoin price discovery as investors seek higher returns in smaller caps. Not guaranteed to happen every cycle." },
  { q: "What does rekt mean in crypto?", options: ["A term for a successful trade", "Suffering significant financial losses on a trade or investment", "A fully audited smart contract", "A token that has been delisted"], correct: 1, explanation: "Rekt (wrecked) means taking a serious financial loss — getting liquidated, buying a rug, or holding through a 90% crash. Used as both a warning and a post-mortem." },
  { q: "What is the difference between proof of work and proof of stake?", options: ["PoW uses miners competing to solve puzzles; PoS uses validators who stake tokens as collateral", "PoW is faster than PoS", "PoS requires more energy than PoW", "They are different names for the same consensus mechanism"], correct: 0, explanation: "PoW (Bitcoin) uses miners competing with computing power — energy intensive. PoS (Ethereum, Solana) uses validators who stake tokens as collateral — much more energy efficient. Solana uses Proof of History plus PoS." },
  { q: "What is a whitelist in crypto launches?", options: ["A list of verified smart contracts", "A pre-approved list of wallet addresses allowed early or exclusive access to a token sale or mint", "A list of tokens approved for a DEX", "A security list of trusted validators"], correct: 1, explanation: "Whitelists give early or exclusive access to token launches, NFT mints, or presales. Getting whitelisted often requires community engagement, holding specific tokens, or winning competitions." },
  { q: "What does KYC mean and why do CEXs require it?", options: ["Know Your Crypto — a trading certification", "Know Your Customer — identity verification required by law for regulated financial platforms", "Keep Your Coins — a self-custody principle", "Key Your Credentials — a security protocol"], correct: 1, explanation: "KYC (Know Your Customer) is legally required for regulated financial services to prevent money laundering and fraud. CEXs require government ID. DEXs are permissionless — no KYC ever required." },
  { q: "What is a token unlock event?", options: ["When a token is listed on a new exchange", "When previously locked tokens become available for trading creating potential sell pressure", "When a protocol releases a new token version", "When liquidity is added to a new pool"], correct: 1, explanation: "Unlock events release previously locked supply — from team, investors, or advisors. If they sell, supply increases against demand causing price pressure. Track unlock schedules via tokenomics docs and platforms like Token Unlocks." },
  { q: "What is a crypto index fund?", options: ["A fund tracking the top 10 tokens by market cap", "A diversified basket of crypto assets designed to track overall market performance", "A stablecoin basket fund", "A DeFi protocol for automated portfolio rebalancing"], correct: 1, explanation: "Crypto index funds hold a diversified basket of tokens — similar to S&P 500 index funds in traditional finance. They reduce single-asset risk and provide broad market exposure. Examples: DPI (DeFi Pulse Index)." },
  { q: "What is a paper wallet?", options: ["A wallet with very low token balances", "A physical printout of a public and private key pair stored completely offline", "A temporary wallet used for one transaction", "A wallet controlled by a third party"], correct: 1, explanation: "A paper wallet is a physical document with your public and private keys printed on it — completely offline. No device can hack it. The risk is physical: fire, water, loss, or someone seeing it." },
  { q: "What is max pain in crypto options?", options: ["The point of maximum loss for a leveraged trader", "The price at which the largest number of options contracts expire worthless", "A market crash of over 80%", "The maximum slippage on a large trade"], correct: 1, explanation: "Max pain is the options price level where the most contracts expire worthless — causing maximum financial pain to options buyers. Market makers may move price toward max pain near expiry." },
  { q: "What is a cold wallet best used for?", options: ["Day trading and frequent transactions", "Long-term storage of large amounts kept offline and away from internet threats", "Storing stablecoins for DeFi use", "Connecting to multiple DEX protocols simultaneously"], correct: 1, explanation: "Cold wallets like Ledger and Trezor are for HODLing — storing large amounts you do not need to access frequently. Keep bulk holdings cold and trading funds in a hot wallet for convenience." },
  { q: "What does GM mean in crypto culture?", options: ["General Market — a reference to overall conditions", "Good Morning — a community greeting signaling optimism and engagement", "Governance Meeting — a DAO voting session", "Gas Minimum — the lowest possible transaction fee"], correct: 1, explanation: "GM (Good Morning) became a crypto Twitter ritual — a simple greeting that builds community and signals you are active in the space. Saying GM is a cultural signal of belonging. GN means Good Night." },
];

// ── ULTIMATE CHALLENGE COMPONENT ──
function UltimateChallenge({ onBack }) {
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [qi, setQi] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [sel, setSel] = useState(null);
  const [showExp, setShowExp] = useState(false);
  const [finished, setFinished] = useState(false);
  const [wallet, setWallet] = useState("");
  const [claimed, setClaimed] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const [isHolder, setIsHolder] = useState(false);
  const [holderBalance, setHolderBalance] = useState(0);

  function startChallenge() {
    // Pull all questions from lessons + challenge bank, shuffle, take 50
    const allLessonQs = LESSONS.flatMap(l => l.questions.map(q => ({...q, source: l.title})));
    const allQs = [...allLessonQs, ...CHALLENGE_QUESTIONS.map(q => ({...q, source: "ULTIMATE"}))];
    const shuffled = allQs.sort(() => Math.random() - 0.5).slice(0, 50).map(shuffleOptions);
    setQuestions(shuffled);
    setStarted(true);
  }

  function pick(i) {
    if (sel !== null) return;
    setSel(i);
    setShowExp(true);
    setAnswers(prev => [...prev, i === questions[qi].correct]);
  }

  function next() {
    if (qi + 1 >= questions.length) {
      setFinished(true);
    } else {
      setQi(qi + 1);
      setSel(null);
      setShowExp(false);
    }
  }

  const score = answers.filter(Boolean).length;
  const pct = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
  const rawPct = questions.length > 0 ? (score / questions.length) * 100 : 0;

  function getTier() {
    if (rawPct >= 95) return { label: "YOU ARE CLUCK NORRIS", sub: "LEGENDARY STATUS", color: "#D4AF37", icon: "👑", pass: true };
    if (rawPct >= 94) return { label: "CHALLENGER DEFEATED", sub: "Cluck Norris respects you.", color: "#10B981", icon: "🏆", pass: true };
    if (rawPct >= 86) return { label: "WORTHY OPPONENT", sub: "...but still inferior. Cluck Norris doesn't lose.", color: "#F59E0B", icon: "⚔️", pass: false };
    if (rawPct >= 70) return { label: "EMBARRASSING", sub: "Cluck Norris is embarrassed FOR you.", color: "#EF4444", icon: "😤", pass: false };
    return { label: "GET OUT OF HIS DOJO", sub: "Come back when you've read a whitepaper.", color: "#6B7280", icon: "💀", pass: false };
  }

  async function claimSpot() {
    if (!wallet || wallet.length < 32) return;
    setClaiming(true);
    try {
      const res = await fetch("/api/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wallet, score, total: questions.length, pct })
      });
      const data = await res.json();
      setClaimed(true);
      setIsHolder(data.isHolder || false);
      setHolderBalance(data.balance || 0);
    } catch(e) {
      setClaimed(true);
    }
    setClaiming(false);
  }

  // Intro screen
  if (!started) return (
    <div style={{padding:"0 16px 40px",maxWidth:520,margin:"0 auto",textAlign:"center"}}>
      <div style={{marginBottom:24}}>
        <img src={LOGO_B64} alt="Cluck Norris" style={{width:120,height:120,borderRadius:"50%",border:"3px solid #EF4444",objectFit:"cover",boxShadow:"0 0 30px rgba(239,68,68,0.6)"}}/>
      </div>
      <div style={{fontFamily:"'Oswald',sans-serif",fontSize:11,letterSpacing:4,color:"#EF4444",marginBottom:6}}>THINK YOU'RE A CRYPTO GENIUS?</div>
      <h2 style={{fontFamily:"'Oswald',sans-serif",fontSize:32,fontWeight:900,color:"#F9FAFB",margin:"0 0 8px",lineHeight:1}}>THE ULTIMATE<br/>CHALLENGE</h2>
      <div style={{fontFamily:"'Oswald',sans-serif",fontSize:12,color:"#6B7280",letterSpacing:2,marginBottom:24}}>CLUCK NORRIS ONE ON ONE</div>
      <div style={{background:"rgba(239,68,68,0.08)",border:"1px solid rgba(239,68,68,0.3)",borderRadius:12,padding:20,marginBottom:24,textAlign:"left"}}>
        <p style={{fontFamily:"'Oswald',sans-serif",fontSize:14,color:"#9CA3AF",margin:"0 0 16px",lineHeight:1.7,fontStyle:"italic"}}>
          "Step into my dojo. 50 questions. No study guide. No second chances. All or nothing."
        </p>
        {[
          {icon:"❓",text:"50 questions — drawn from across the entire curriculum and beyond"},
          {icon:"📵",text:"No study section — straight into the exam"},
          {icon:"🎯",text:"94% to pass — 47 out of 50 correct minimum"},
          {icon:"💀",text:"Anything less and Cluck Norris is embarrassed FOR you"},
        ].map(r=>(
          <div key={r.text} style={{display:"flex",gap:12,marginBottom:10,alignItems:"flex-start"}}>
            <span style={{fontSize:16,flexShrink:0}}>{r.icon}</span>
            <span style={{fontFamily:"'Oswald',sans-serif",fontSize:13,color:"#D1D5DB",lineHeight:1.5}}>{r.text}</span>
          </div>
        ))}
      </div>
      <button onClick={startChallenge} style={{width:"100%",background:"linear-gradient(135deg,#EF4444,#DC2626)",border:"none",borderRadius:10,padding:"16px",fontFamily:"'Oswald',sans-serif",fontSize:16,fontWeight:700,color:"#fff",letterSpacing:3,cursor:"pointer",boxShadow:"0 0 30px rgba(239,68,68,0.5)",marginBottom:12}}>
        🥊 STEP INTO THE DOJO
      </button>
      <button onClick={onBack} style={{background:"none",border:"none",color:"#6B7280",fontFamily:"'Oswald',sans-serif",fontSize:11,letterSpacing:2,cursor:"pointer"}}>
        ← BACK TO SCHOOL
      </button>
    </div>
  );

  // Results screen
  if (finished) {
    const tier = getTier();
    return (
      <div style={{padding:"0 16px 40px",maxWidth:520,margin:"0 auto",textAlign:"center"}}>
        <div style={{fontSize:60,marginBottom:16}}>{tier.icon}</div>
        <div style={{fontFamily:"'Oswald',sans-serif",fontSize:10,letterSpacing:3,color:tier.color,marginBottom:8}}>FINAL VERDICT</div>
        <h2 style={{fontFamily:"'Oswald',sans-serif",fontSize:28,fontWeight:900,color:tier.color,margin:"0 0 8px",lineHeight:1}}>{tier.label}</h2>
        <p style={{fontFamily:"'Oswald',sans-serif",fontSize:14,color:"#9CA3AF",marginBottom:24,fontStyle:"italic"}}>"{tier.sub}"</p>
        <div style={{background:"rgba(255,255,255,0.03)",border:`1px solid ${tier.color}40`,borderRadius:12,padding:24,marginBottom:24}}>
          <div style={{fontFamily:"'Oswald',sans-serif",fontSize:60,fontWeight:900,color:tier.color,lineHeight:1}}>{pct}%</div>
          <div style={{fontFamily:"'Oswald',sans-serif",fontSize:14,color:"#6B7280",marginTop:8,letterSpacing:2}}>{score} / {questions.length} CORRECT</div>
          <div style={{marginTop:16,height:8,background:"rgba(255,255,255,0.08)",borderRadius:20,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${pct}%`,background:`linear-gradient(90deg,#EF4444,${tier.color})`,borderRadius:20,transition:"width 1s ease"}}/>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:6}}>
            <span style={{fontFamily:"'Oswald',sans-serif",fontSize:8,color:"#4B5563"}}>0%</span>
            <span style={{fontFamily:"'Oswald',sans-serif",fontSize:8,color:"#10B981"}}>94% PASS</span>
            <span style={{fontFamily:"'Oswald',sans-serif",fontSize:8,color:"#D4AF37"}}>100%</span>
          </div>
        </div>
        {/* Trophy claim section for passers */}
        {tier.pass && (
          <div style={{background:"rgba(212,175,55,0.08)",border:"1px solid rgba(212,175,55,0.3)",borderRadius:12,padding:18,marginBottom:16}}>
            <div style={{textAlign:"center",marginBottom:12}}>
              <div style={{fontSize:32,marginBottom:6}}>🏆</div>
              <div style={{fontFamily:"'Oswald',sans-serif",fontSize:13,fontWeight:700,color:"#D4AF37",letterSpacing:2,marginBottom:4}}>YOU EARNED YOUR SPOT</div>
              <p style={{fontFamily:"'Oswald',sans-serif",fontSize:11,color:"#9CA3AF",margin:0,lineHeight:1.6}}>
                Drop your Solana wallet address to be considered for future CLKN airdrops and exclusive giveaways. Only passers qualify.
              </p>
            </div>
            {!claimed ? (
              <>
                <input
                  value={wallet}
                  onChange={e=>setWallet(e.target.value)}
                  placeholder="Your Solana wallet address..."
                  style={{width:"100%",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(212,175,55,0.3)",borderRadius:8,padding:"10px 12px",color:"#F9FAFB",fontFamily:"monospace",fontSize:11,marginBottom:10,boxSizing:"border-box",outline:"none"}}
                />
                <button onClick={claimSpot} disabled={!wallet||wallet.length<32||claiming} style={{width:"100%",background:wallet&&wallet.length>=32?"linear-gradient(135deg,#D4AF37,#F59E0B)":"rgba(255,255,255,0.05)",border:"none",borderRadius:8,padding:"12px",fontFamily:"'Oswald',sans-serif",fontSize:13,fontWeight:700,color:wallet&&wallet.length>=32?"#111":"#4B5563",letterSpacing:2,cursor:wallet&&wallet.length>=32?"pointer":"default"}}>
                  {claiming?"SUBMITTING...":"🏆 CLAIM YOUR SPOT"}
                </button>
              </>
            ) : (
              <div style={{textAlign:"center",padding:"8px 0"}}>
                {isHolder ? (
                  <div>
                    <div style={{fontSize:40,marginBottom:8}}>🐔🔥</div>
                    <div style={{fontFamily:"'Oswald',sans-serif",fontSize:16,fontWeight:900,color:"#D4AF37",letterSpacing:2,marginBottom:6}}>YOU'RE ALREADY IN THE FLOCK!</div>
                    <div style={{fontFamily:"'Oswald',sans-serif",fontSize:12,color:"#FCD34D",marginBottom:8}}>
                      HOLDING {parseInt(holderBalance).toLocaleString()} CLKN
                    </div>
                    <p style={{fontSize:12,color:"#9CA3AF",lineHeight:1.7,margin:0}}>
                      Cluck Norris sees you. You passed the ultimate test AND you hold CLKN. That's the full package. Your wallet is locked in for airdrops and exclusive giveaways. The flock appreciates you. 🙏
                    </p>
                  </div>
                ) : (
                  <div>
                    <div style={{fontSize:28,marginBottom:6}}>✅</div>
                    <div style={{fontFamily:"'Oswald',sans-serif",fontSize:12,color:"#10B981",letterSpacing:2,marginBottom:6}}>WALLET SUBMITTED — YOU'RE IN THE FLOCK</div>
                    <p style={{fontSize:11,color:"#6B7280",lineHeight:1.7,margin:0}}>
                      You passed the Hard Knocks but you don't hold CLKN yet. Pick some up on Bags.fm or Jupiter and become a full member of the flock. 🐔
                    </p>
                    <div style={{display:"flex",gap:8,marginTop:10,justifyContent:"center"}}>
                      <a href={CLKN_TRADE_LINK} target="_blank" rel="noreferrer" style={{background:"rgba(217,119,6,0.15)",border:"1px solid rgba(217,119,6,0.4)",borderRadius:8,padding:"6px 12px",textDecoration:"none",fontFamily:"'Oswald',sans-serif",fontSize:10,color:"#D97706",letterSpacing:1}}>
                        🔥 BAGS.FM
                      </a>
                      <a href={JUPITER_TRADE_LINK} target="_blank" rel="noreferrer" style={{background:"rgba(74,222,128,0.1)",border:"1px solid rgba(74,222,128,0.3)",borderRadius:8,padding:"6px 12px",textDecoration:"none",fontFamily:"'Oswald',sans-serif",fontSize:10,color:"#4ADE80",letterSpacing:1}}>
                        ⚡ JUPITER
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          <button onClick={()=>{setStarted(false);setFinished(false);setQi(0);setAnswers([]);setSel(null);setShowExp(false);setWallet("");setClaimed(false);}} style={{background:"linear-gradient(135deg,#EF4444,#DC2626)",border:"none",borderRadius:10,padding:"14px",fontFamily:"'Oswald',sans-serif",fontSize:14,fontWeight:700,color:"#fff",letterSpacing:3,cursor:"pointer"}}>
            🥊 FIGHT AGAIN
          </button>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"12px",fontFamily:"'Oswald',sans-serif",fontSize:12,color:"#9CA3AF",letterSpacing:2,cursor:"pointer"}}>
            ← BACK TO SCHOOL
          </button>
        </div>
      </div>
    );
  }

  // Quiz screen
  const q = questions[qi];
  return (
    <div style={{padding:"0 16px 40px",maxWidth:520,margin:"0 auto"}}>
      <div style={{marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"#6B7280",fontFamily:"'Oswald',sans-serif",letterSpacing:1,marginBottom:5}}>
          <span style={{color:"#EF4444",fontWeight:700}}>🥊 ULTIMATE CHALLENGE</span>
          <span>Q {qi+1} OF {questions.length} • {answers.filter(Boolean).length} CORRECT</span>
        </div>
        <div style={{height:6,background:"rgba(255,255,255,0.08)",borderRadius:3,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${((qi)/questions.length)*100}%`,background:"linear-gradient(90deg,#EF4444,#D4AF37)",borderRadius:3}}/>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>
          <span style={{fontFamily:"'Oswald',sans-serif",fontSize:8,color:"#4B5563"}}>START</span>
          <span style={{fontFamily:"'Oswald',sans-serif",fontSize:8,color:"#10B981"}}>NEED 47+ TO PASS</span>
          <span style={{fontFamily:"'Oswald',sans-serif",fontSize:8,color:"#D4AF37"}}>50</span>
        </div>
      </div>
      <div style={{background:"rgba(239,68,68,0.05)",border:"1px solid rgba(239,68,68,0.2)",borderRadius:12,padding:20,marginBottom:14}}>
        <div style={{fontFamily:"'Oswald',sans-serif",fontSize:10,color:"#EF4444",letterSpacing:2,marginBottom:8}}>QUESTION {qi+1}</div>
        <p style={{fontFamily:"'Oswald',sans-serif",fontSize:18,color:"#F9FAFB",margin:0,lineHeight:1.4}}>{q.q}</p>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:16}}>
        {q.options.map((opt,i)=>{
          let bg="rgba(255,255,255,0.03)",border="1px solid rgba(255,255,255,0.08)",color="#D1D5DB";
          if(sel!==null){
            if(i===q.correct){bg="rgba(16,185,129,0.15)";border="1px solid #10B981";color="#10B981";}
            else if(i===sel){bg="rgba(239,68,68,0.15)";border="1px solid #EF4444";color="#EF4444";}
          }
          return(<button key={i} onClick={()=>pick(i)} style={{background:bg,border,borderRadius:10,padding:"12px 14px",color,cursor:sel!==null?"default":"pointer",textAlign:"left",fontSize:14,display:"flex",gap:10,alignItems:"center"}}>
            <span style={{fontFamily:"'Oswald',sans-serif",fontSize:11,opacity:0.6,minWidth:18}}>{String.fromCharCode(65+i)}</span>{opt}
          </button>);
        })}
      </div>
      {showExp&&(<>
        <div style={{background:sel===q.correct?"rgba(16,185,129,0.08)":"rgba(239,68,68,0.08)",border:`1px solid ${sel===q.correct?"#10B981":"#EF4444"}`,borderRadius:10,padding:14,marginBottom:12}}>
          <div style={{fontFamily:"'Oswald',sans-serif",fontSize:10,letterSpacing:1,color:sel===q.correct?"#10B981":"#EF4444",marginBottom:5}}>{sel===q.correct?"✓ CORRECT — CLUCK NORRIS NODS":"✗ WRONG — CLUCK NORRIS SIGHS"}</div>
          <p style={{margin:0,color:"#D1D5DB",fontSize:13,lineHeight:1.6}}>{q.explanation}</p>
        </div>
        <button onClick={next} style={{width:"100%",background:"linear-gradient(135deg,#EF4444,#DC2626)",border:"none",borderRadius:10,padding:"13px",fontFamily:"'Oswald',sans-serif",fontSize:14,fontWeight:700,color:"#fff",letterSpacing:2,cursor:"pointer"}}>
          {qi+1<questions.length?"NEXT QUESTION →":"SEE FINAL VERDICT →"}
        </button>
      </>)}
    </div>
  );
}






// ── AUTO VERIFY COMPONENT ──
function AutoVerify({ unlockAmount, onUnlock, onBack }) {
  const [status, setStatus] = useState("watching"); // watching | found | failed
  const [attempts, setAttempts] = useState(0);
  const [dots, setDots] = useState(".");
  const [grantedQ, setGrantedQ] = useState(20);
  const maxAttempts = 40; // 40 × 3s = 2 minutes

  // Animate dots
  useEffect(() => {
    if (status !== "watching") return;
    const interval = setInterval(() => {
      setDots(d => d.length >= 3 ? "." : d + ".");
    }, 500);
    return () => clearInterval(interval);
  }, [status]);

  // Auto poll every 3 seconds
  useEffect(() => {
    if (status !== "watching") return;
    if (attempts >= maxAttempts) {
      setStatus("failed");
      return;
    }

    const poll = async () => {
      try {
        const res = await fetch("/api/verify-clkn-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ unlockAmount })
        });
        const data = await res.json();
        if (data.success) {
          // Grant questions
          const today = new Date().toDateString();
          const current = JSON.parse(localStorage.getItem("cluck_questions") || "{}");
          const currentLimit = (current.date === today) ? (current.limit || DAILY_LIMIT) : DAILY_LIMIT;
          const newLimit = currentLimit + data.questionsGranted;
          localStorage.setItem("cluck_questions", JSON.stringify({
            count: current.count || 0,
            limit: newLimit,
            date: today
          }));
          localStorage.removeItem("cluck_unlock_amount");
          setGrantedQ(data.questionsGranted);
          setStatus("found");
          setTimeout(() => onUnlock(data.questionsGranted), 99999999);
        } else {
          setAttempts(a => a + 1);
        }
      } catch(e) {
        setAttempts(a => a + 1);
      }
    };

    const timer = setTimeout(poll, attempts === 0 ? 2000 : 3000);
    return () => clearTimeout(timer);
  }, [attempts, status]);

  if (status === "found") return (
    <div style={{textAlign:"center",padding:"28px 0"}}>
      <div style={{fontSize:64,marginBottom:16}}>🎉</div>
      <div style={{fontFamily:"'Oswald',sans-serif",fontSize:20,fontWeight:900,color:"#10B981",letterSpacing:3,marginBottom:12}}>PAYMENT VERIFIED!</div>
      <div style={{background:"rgba(16,185,129,0.1)",border:"1px solid rgba(16,185,129,0.3)",borderRadius:12,padding:"14px 20px",marginBottom:12}}>
        <div style={{fontFamily:"'Oswald',sans-serif",fontSize:28,fontWeight:900,color:"#FCD34D",marginBottom:4}}>+20 QUESTIONS</div>
        <div style={{fontFamily:"'Oswald',sans-serif",fontSize:12,color:"#D1D5DB",letterSpacing:1}}>UNLOCKED AND READY</div>
      </div>
      <div style={{fontFamily:"'Oswald',sans-serif",fontSize:12,color:"#9CA3AF",lineHeight:1.7,marginBottom:16}}>
        Cluck Norris is impressed. Don't waste them. 🐔
      </div>
      <button onClick={()=>onUnlock(grantedQ)} style={{width:"100%",background:"linear-gradient(135deg,#10B981,#059669)",border:"none",borderRadius:10,padding:"14px",fontFamily:"'Oswald',sans-serif",fontSize:14,fontWeight:700,color:"#fff",letterSpacing:2,cursor:"pointer"}}>
        ASK NEXT QUESTION →
      </button>
    </div>
  );

  if (status === "failed") return (
    <div style={{textAlign:"center",padding:"16px 0"}}>
      <div style={{fontSize:32,marginBottom:10}}>⏱️</div>
      <div style={{fontFamily:"'Oswald',sans-serif",fontSize:13,fontWeight:700,color:"#EF4444",letterSpacing:1,marginBottom:8}}>PAYMENT NOT FOUND</div>
      <p style={{fontFamily:"'Oswald',sans-serif",fontSize:11,color:"#9CA3AF",margin:"0 0 14px",lineHeight:1.7}}>
        Could not find your {unlockAmount.toFixed(1)} CLKN payment after 2 minutes. Make sure you sent the exact amount to the correct wallet.
      </p>
      <div style={{display:"flex",gap:8}}>
        <button onClick={onBack} style={{flex:1,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,padding:"10px",fontFamily:"'Oswald',sans-serif",fontSize:11,color:"#6B7280",cursor:"pointer"}}>← TRY AGAIN</button>
        <button onClick={()=>window.open("https://t.me/clucknorris","_blank")} style={{flex:1,background:"rgba(217,119,6,0.15)",border:"1px solid rgba(217,119,6,0.3)",borderRadius:8,padding:"10px",fontFamily:"'Oswald',sans-serif",fontSize:11,color:"#D97706",cursor:"pointer"}}>📱 GET HELP</button>
      </div>
    </div>
  );

  return (
    <div style={{textAlign:"center",padding:"16px 0"}}>
      <div style={{fontSize:36,marginBottom:12}}>🔍</div>
      <div style={{fontFamily:"'Oswald',sans-serif",fontSize:13,fontWeight:700,color:"#D97706",letterSpacing:2,marginBottom:8}}>
        WATCHING FOR YOUR PAYMENT{dots}
      </div>
      <div style={{background:"rgba(0,0,0,0.3)",borderRadius:8,padding:"10px 14px",marginBottom:12}}>
        <div style={{fontFamily:"'Oswald',sans-serif",fontSize:9,color:"#6B7280",letterSpacing:1,marginBottom:4}}>LOOKING FOR EXACTLY</div>
        <div style={{fontFamily:"monospace",fontSize:24,color:"#FCD34D",fontWeight:700}}>{unlockAmount.toFixed(1)} CLKN</div>
      </div>
      <p style={{fontFamily:"'Oswald',sans-serif",fontSize:11,color:"#9CA3AF",margin:"0 0 12px",lineHeight:1.7}}>
        Checking every 3 seconds{dots} usually takes less than 15 seconds after your transaction confirms.
      </p>
      <div style={{height:4,background:"rgba(255,255,255,0.08)",borderRadius:2,marginBottom:12}}>
        <div style={{height:"100%",width:`${(attempts/maxAttempts)*100}%`,background:"linear-gradient(90deg,#D97706,#EF4444)",borderRadius:2,transition:"width 0.3s"}}/>
      </div>
      <button onClick={onBack} style={{background:"none",border:"none",color:"#6B7280",fontFamily:"'Oswald',sans-serif",fontSize:9,letterSpacing:1,cursor:"pointer"}}>← BACK</button>
    </div>
  );
}

// ── CLKN UNLOCK COMPONENT ──
function generateUnlockAmount() {
  const whole = Math.floor(Math.random() * 51) + 475; // 475-525
  const decimal = Math.floor(Math.random() * 10); // 0-9
  return parseFloat(`${whole}.${decimal}`);
}

function CluckUnlock({ onUnlock }) {
  const [unlockAmount] = useState(() => {
    const stored = localStorage.getItem("cluck_unlock_amount");
    if (stored) return parseFloat(stored);
    const amount = generateUnlockAmount();
    localStorage.setItem("cluck_unlock_amount", amount.toString());
    return amount;
  });
  const [step, setStep] = useState(1);
  const [walletCopied, setWalletCopied] = useState(false);
  const [amountCopied, setAmountCopied] = useState(false);



  return (
    <div style={{background:"rgba(217,119,6,0.06)",border:"1px solid rgba(217,119,6,0.25)",borderRadius:12,padding:16,marginTop:8}}>
      <div style={{textAlign:"center",marginBottom:14}}>
        <div style={{fontSize:28,marginBottom:6}}>🪙</div>
        <div style={{fontFamily:"'Oswald',sans-serif",fontSize:14,fontWeight:700,color:"#D97706",letterSpacing:2,marginBottom:4}}>DAILY LIMIT REACHED</div>
        <p style={{fontFamily:"'Oswald',sans-serif",fontSize:11,color:"#9CA3AF",margin:0,lineHeight:1.7}}>
          Cluck Norris has answered enough questions today. Send <span style={{color:"#FCD34D",fontWeight:700}}>{unlockAmount.toFixed(1)} CLKN</span> to unlock <span style={{color:"#FCD34D",fontWeight:700}}>20 more questions</span>. No memo needed — the exact amount is your key.
        </p>
      </div>

      {/* Step indicator */}
      <div style={{display:"flex",gap:6,marginBottom:14}}>
        {[1,2,3].map(s=>(
          <div key={s} style={{flex:1,height:3,borderRadius:2,background:step>=s?"#D97706":"rgba(255,255,255,0.1)"}}/>
        ))}
      </div>

      {step===1 && (
        <div>
          <div style={{fontFamily:"'Oswald',sans-serif",fontSize:10,color:"#D97706",letterSpacing:2,marginBottom:8}}>STEP 1 — YOUR EXACT SEND AMOUNT</div>
          <div style={{background:"rgba(0,0,0,0.3)",borderRadius:8,padding:"14px",marginBottom:10,textAlign:"center"}}>
            <div style={{fontFamily:"'Oswald',sans-serif",fontSize:10,color:"#6B7280",letterSpacing:1,marginBottom:4}}>SEND EXACTLY</div>
            <div style={{fontFamily:"monospace",fontSize:28,color:"#FCD34D",fontWeight:700}}>{unlockAmount.toFixed(1)} CLKN</div>
            <div style={{fontFamily:"'Oswald',sans-serif",fontSize:9,color:"#6B7280",letterSpacing:1,marginTop:4}}>THIS EXACT AMOUNT VERIFIES YOUR PAYMENT</div>
          </div>
          <p style={{fontFamily:"'Oswald',sans-serif",fontSize:13,color:"#9CA3AF",margin:"0 0 12px",lineHeight:1.7}}>
            The specific decimal amount is how we identify your payment — no memo needed. Send the exact amount shown above.
          </p>
          <button onClick={()=>setStep(2)} style={{width:"100%",background:"linear-gradient(135deg,#D97706,#EF4444)",border:"none",borderRadius:8,padding:"11px",fontFamily:"'Oswald',sans-serif",fontSize:12,fontWeight:700,color:"#fff",letterSpacing:2,cursor:"pointer"}}>
            GOT IT — NEXT →
          </button>
        </div>
      )}

      {step===2 && (
        <div>
          <div style={{fontFamily:"'Oswald',sans-serif",fontSize:10,color:"#D97706",letterSpacing:2,marginBottom:8}}>STEP 2 — SEND {unlockAmount.toFixed(1)} CLKN</div>
          {/* Clickable wallet address */}
          <div onClick={()=>{navigator.clipboard?.writeText("7LHBcRYosycMBwBqxBHeRiDQohYzpppDALKYVT4TNY5H");setWalletCopied(true);setTimeout(()=>setWalletCopied(false),2000);}} style={{background:"rgba(0,0,0,0.3)",borderRadius:8,padding:"10px 14px",marginBottom:10,cursor:"pointer",border:`1px solid ${walletCopied?"rgba(16,185,129,0.5)":"rgba(255,255,255,0.08)"}`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
              <div style={{fontFamily:"'Oswald',sans-serif",fontSize:9,color:"#6B7280",letterSpacing:1}}>SEND TO: (TAP TO COPY)</div>
              <div style={{fontFamily:"'Oswald',sans-serif",fontSize:9,color:walletCopied?"#10B981":"#D97706",letterSpacing:1}}>{walletCopied?"✓ COPIED!":"📋 COPY"}</div>
            </div>
            <div style={{fontFamily:"monospace",fontSize:10,color:"#F9FAFB",wordBreak:"break-all",lineHeight:1.5}}>7LHBcRYosycMBwBqxBHeRiDQohYzpppDALKYVT4TNY5H</div>
          </div>
          {/* Clickable amount */}
          <div onClick={()=>{navigator.clipboard?.writeText(unlockAmount.toFixed(1));setAmountCopied(true);setTimeout(()=>setAmountCopied(false),2000);}} style={{background:"rgba(0,0,0,0.3)",borderRadius:8,padding:"10px 14px",marginBottom:10,cursor:"pointer",border:`1px solid ${amountCopied?"rgba(16,185,129,0.5)":"rgba(217,119,6,0.3)"}`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
              <div style={{fontFamily:"'Oswald',sans-serif",fontSize:9,color:"#6B7280",letterSpacing:1}}>EXACT AMOUNT: (TAP TO COPY)</div>
              <div style={{fontFamily:"'Oswald',sans-serif",fontSize:9,color:amountCopied?"#10B981":"#D97706",letterSpacing:1}}>{amountCopied?"✓ COPIED!":"📋 COPY"}</div>
            </div>
            <div style={{fontFamily:"monospace",fontSize:20,color:"#FCD34D",fontWeight:700,letterSpacing:2}}>{unlockAmount.toFixed(1)} CLKN</div>
          </div>
          <div style={{background:"rgba(255,255,255,0.04)",borderRadius:8,padding:"10px 14px",marginBottom:10}}>
            <div style={{fontFamily:"'Oswald',sans-serif",fontSize:9,color:"#6B7280",letterSpacing:1,marginBottom:6}}>HOW TO SEND:</div>
            {["Open the wallet holding your CLKN", "Select CLKN token", "Tap Send", `Enter amount: ${unlockAmount.toFixed(1)}`, "Paste the wallet address above", "Confirm and send"].map((s,i)=>(
              <div key={i} style={{display:"flex",gap:8,marginBottom:4,alignItems:"flex-start"}}>
                <span style={{fontFamily:"'Oswald',sans-serif",fontSize:9,color:"#D97706",minWidth:14}}>{i+1}.</span>
                <span style={{fontFamily:"'Oswald',sans-serif",fontSize:13,color:"#D1D5DB"}}>{s}</span>
              </div>
            ))}
          </div>
          {/* Don't hold CLKN yet */}
          <div style={{background:"rgba(217,119,6,0.06)",border:"1px solid rgba(217,119,6,0.2)",borderRadius:8,padding:"10px 12px",marginBottom:10}}>
            <div style={{fontFamily:"'Oswald',sans-serif",fontSize:9,color:"#D97706",letterSpacing:1,marginBottom:6}}>DON'T HOLD CLKN YET? GET SOME HERE:</div>
            <div style={{display:"flex",gap:8}}>
              <a href={CLKN_TRADE_LINK} target="_blank" rel="noreferrer" style={{flex:1,background:"rgba(217,119,6,0.15)",border:"1px solid rgba(217,119,6,0.3)",borderRadius:6,padding:"7px",textDecoration:"none",fontFamily:"'Oswald',sans-serif",fontSize:10,color:"#D97706",letterSpacing:1,textAlign:"center"}}>🔥 BAGS.FM</a>
              <a href={JUPITER_TRADE_LINK} target="_blank" rel="noreferrer" style={{flex:1,background:"rgba(74,222,128,0.1)",border:"1px solid rgba(74,222,128,0.3)",borderRadius:6,padding:"7px",textDecoration:"none",fontFamily:"'Oswald',sans-serif",fontSize:10,color:"#4ADE80",letterSpacing:1,textAlign:"center"}}>⚡ JUPITER</a>
            </div>
          </div>
          <p style={{fontFamily:"'Oswald',sans-serif",fontSize:13,color:"#9CA3AF",margin:"0 0 12px",lineHeight:1.7}}>
            Need help? Come find us on Telegram — the flock will sort you out. 🐔
          </p>
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>setStep(1)} style={{flex:1,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,padding:"10px",fontFamily:"'Oswald',sans-serif",fontSize:11,color:"#6B7280",cursor:"pointer"}}>← BACK</button>
            <button onClick={()=>setStep(3)} style={{flex:2,background:"linear-gradient(135deg,#D97706,#EF4444)",border:"none",borderRadius:8,padding:"10px",fontFamily:"'Oswald',sans-serif",fontSize:11,fontWeight:700,color:"#fff",letterSpacing:1,cursor:"pointer"}}>SENT IT →</button>
          </div>
        </div>
      )}

      {step===3 && (
        <AutoVerify
          unlockAmount={unlockAmount}
          onUnlock={onUnlock}
          onBack={()=>setStep(2)}
        />
      )}
    </div>
  );
}

// ── ASK CLUCK NORRIS COMPONENT ──
const DAILY_LIMIT = 10;
const STORAGE_KEY = "cluck_questions";

function getQuestionsToday() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return { count: 0, limit: DAILY_LIMIT, date: new Date().toDateString() };
    const data = JSON.parse(stored);
    if (data.date !== new Date().toDateString()) return { count: 0, limit: DAILY_LIMIT, date: new Date().toDateString() };
    return { count: data.count || 0, limit: data.limit || DAILY_LIMIT, date: data.date };
  } catch(e) { return { count: 0, limit: DAILY_LIMIT, date: new Date().toDateString() }; }
}

function incrementQuestions() {
  const data = getQuestionsToday();
  const updated = { count: data.count + 1, limit: data.limit, date: new Date().toDateString() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

function AskCluck({ context, compact }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [questionsLeft, setQuestionsLeft] = useState(() => {
    const today = getQuestionsToday();
    return today.limit - today.count;
  });
  const [expanded, setExpanded] = useState(false);

  async function askQuestion() {
    if (!question.trim() || loading || questionsLeft <= 0) return;
    setLoading(true);
    setAnswer(null);
    try {
      const res = await fetch("/api/ask-cluck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, context })
      });
      const data = await res.json();
      if (data.success) {
        setAnswer(data.answer);
        const updated = incrementQuestions();
        setQuestionsLeft(updated.limit - updated.count);
      } else {
        setAnswer("Cluck Norris is unavailable right now. Hit the books instead.");
      }
    } catch(e) {
      setAnswer("Something went wrong in the schoolyard. Try again.");
    }
    setLoading(false);
  }

  if (compact && !expanded && questionsLeft > 0) return (
    <button onClick={()=>setExpanded(true)} style={{
      display:"flex",alignItems:"center",gap:8,background:"rgba(217,119,6,0.1)",
      border:"1px solid rgba(217,119,6,0.3)",borderRadius:10,padding:"10px 14px",
      width:"100%",cursor:"pointer",marginTop:12
    }}>
      <img src={LOGO_B64} alt="CN" style={{width:28,height:28,borderRadius:"50%",objectFit:"cover"}}/>
      <div style={{textAlign:"left",flex:1}}>
        <div style={{fontFamily:"'Oswald',sans-serif",fontSize:11,fontWeight:700,color:"#D97706",letterSpacing:1}}>ASK CLUCK NORRIS</div>
        <div style={{fontFamily:"'Oswald',sans-serif",fontSize:12,color:"#9CA3AF",letterSpacing:1}}>Need clarification? Ask the professor. ({questionsLeft} left today)</div>
      </div>
      <span style={{color:"#D97706",fontSize:14}}>→</span>
    </button>
  );

  return (
    <div style={{background:"rgba(217,119,6,0.06)",border:"1px solid rgba(217,119,6,0.25)",borderRadius:12,padding:16,marginTop:12}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
        <img src={LOGO_B64} alt="CN" style={{width:36,height:36,borderRadius:"50%",objectFit:"cover",border:"2px solid #D97706"}}/>
        <div>
          <div style={{fontFamily:"'Oswald',sans-serif",fontSize:13,fontWeight:700,color:"#D97706",letterSpacing:1}}>ASK CLUCK NORRIS</div>
          <div style={{fontFamily:"'Oswald',sans-serif",fontSize:9,color:"#6B7280",letterSpacing:1}}>
            {questionsLeft > 0 ? `${questionsLeft} questions remaining today` : "Daily limit reached — come back tomorrow"}
          </div>
        </div>
        {compact && <button onClick={()=>setExpanded(false)} style={{marginLeft:"auto",background:"none",border:"none",color:"#6B7280",cursor:"pointer",fontSize:16}}>✕</button>}
      </div>

      {questionsLeft > 0 ? (
        <>
          <div style={{display:"flex",gap:8,marginBottom:10}}>
            <input
              value={question}
              onChange={e=>setQuestion(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&askQuestion()}
              placeholder="Ask anything about crypto, DeFi, or this lesson..."
              style={{flex:1,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(217,119,6,0.3)",borderRadius:8,padding:"9px 12px",color:"#F9FAFB",fontFamily:"'Oswald',sans-serif",fontSize:12,outline:"none"}}
            />
            <button onClick={askQuestion} disabled={!question.trim()||loading} style={{background:question.trim()&&!loading?"linear-gradient(135deg,#D97706,#EF4444)":"rgba(255,255,255,0.05)",border:"none",borderRadius:8,padding:"9px 14px",fontFamily:"'Oswald',sans-serif",fontSize:11,fontWeight:700,color:question.trim()&&!loading?"#fff":"#4B5563",cursor:question.trim()&&!loading?"pointer":"default",letterSpacing:1,whiteSpace:"nowrap"}}>
              {loading ? "..." : "ASK →"}
            </button>
          </div>
          <div style={{fontFamily:"'Oswald',sans-serif",fontSize:11,color:"#9CA3AF",letterSpacing:1,marginBottom:answer?10:0}}>
            Don't abuse Cluck Norris's generosity — it's not very common. 🐔
          </div>
        </>
      ) : (
        <CluckUnlock onUnlock={(q)=>{setQuestionsLeft(prev => prev + q);}} />
      )}

      {answer && (
        <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(217,119,6,0.2)",borderRadius:10,padding:"12px 14px"}}>
          <div style={{display:"flex",gap:8,alignItems:"flex-start"}}>
            <span style={{fontSize:16,flexShrink:0}}>🐔</span>
            <p style={{margin:0,fontSize:15,color:"#D1D5DB",lineHeight:1.8,fontFamily:"inherit"}}>
            {answer.replace(/\*\*([^*]+)\*\*/g, (_,t)=>t).replace(/\*([^*]+)\*/g, (_,t)=>t)}
          </p>
          </div>
          <button onClick={()=>{setAnswer(null);setQuestion("");}} style={{marginTop:8,background:"none",border:"none",color:"#6B7280",fontFamily:"'Oswald',sans-serif",fontSize:9,letterSpacing:1,cursor:"pointer"}}>
            ASK ANOTHER →
          </button>
        </div>
      )}
    </div>
  );
}


// ── THE LIBRARY — DEEP DIVES ──
const LIBRARY_TOPICS = [
  {
    id: "wallet-security",
    icon: "🔐",
    title: "Wallet Security Deep Dive",
    category: "SURVIVAL",
    summary: "Your wallet is your bank, your identity, and your entire crypto life. Lose it and it's gone forever.",
    cluckHook: "More people have lost crypto to their own mistakes than to market crashes. This lesson exists so you are not one of them.",
    sections: [
      {
        heading: "Seed Phrases — The Master Key",
        body: `Your seed phrase is a 12 or 24 word sequence that controls your entire wallet. Anyone who has it owns everything in it. Period.

RULES THAT ARE NOT NEGOTIABLE:
• Never type your seed phrase into any website, app, or form — ever
• Never photograph it and store it in cloud storage (Google Photos, iCloud)
• Never send it to anyone — not support, not a mod, not Cluck Norris himself
• Write it on paper. Store copies in multiple physical locations
• Consider a fireproof/waterproof safe for long term storage

Hardware wallets like Ledger and Trezor store your seed phrase offline. The seed phrase never touches the internet. This is the gold standard for serious holders.

The single most common way people lose crypto: they type their seed phrase into a fake website pretending to be MetaMask, Phantom, or a hardware wallet setup page.`
      },
      {
        heading: "Hot Wallets vs Cold Wallets",
        body: `HOT WALLET — Connected to the internet (Phantom, MetaMask, Backpack)
• Convenient for daily use and trading
• Vulnerable to malware, phishing, and browser exploits
• Use for amounts you are comfortable losing
• Never store your life savings in a hot wallet

COLD WALLET — Offline storage (Ledger, Trezor, Coldcard)
• Private keys never touch the internet
• Must physically confirm transactions on the device
• More friction but dramatically more secure
• Use for long-term holdings and large amounts

THE SMART STRATEGY:
Use a hot wallet for trading and daily activity. Use a cold wallet for storing anything significant. Think of your hot wallet like a physical wallet you carry — only put in what you need for the day.`
      },
      {
        heading: "Approval Exploits — The Silent Killer",
        body: `When you interact with DeFi protocols, you sign token approvals that give smart contracts permission to spend your tokens. Most people blindly click approve without reading what they are signing.

HOW THE ATTACK WORKS:
1. You visit a malicious site or click a bad link
2. It asks you to sign a transaction that looks routine
3. You have actually approved an unlimited spend on your tokens
4. The attacker drains your wallet immediately

PROTECTION:
• Use revoke.cash or Solana's approval tools to audit and revoke unused approvals regularly
• Never sign transactions on sites you do not trust completely
• Read what you are signing — the amount, the contract address, the permission
• If a site asks for an approval that seems larger than needed, walk away

On Solana specifically — be careful with wallet drainers disguised as NFT mints, airdrops, and token claims.`
      },
      {
        heading: "Phishing & Social Engineering",
        body: `The most sophisticated attacks do not need to hack your wallet. They trick you into handing over access.

COMMON ATTACK VECTORS:
• Fake support DMs — no legitimate support will ever DM you first
• Fake airdrop sites — if you did not sign up for it, it is not real
• Impersonation — scammers copy profile pictures and names of trusted accounts
• Urgent messages — "your wallet will be suspended" creates panic that bypasses judgment
• Fake browser extensions — always download from official sources only
• Discord and Telegram DMs — treat every unsolicited DM as a scam until proven otherwise

CLUCK'S RULE: If someone contacts you first about your wallet, crypto, or money — it is a scam. 100% of the time. No exceptions.`
      },
      {
        heading: "Common Mistakes",
        body: `❌ Using the same wallet for everything — separate wallets for different risk levels
❌ Storing seed phrase digitally — one data breach and it is gone
❌ Clicking links in Discord and Telegram — always go directly to official sites
❌ Connecting your main wallet to unknown protocols — use a burner wallet to test
❌ Ignoring approval limits — unlimited approvals are dangerous
❌ Trusting someone because they have followers — scammers build credibility deliberately`
      }
    ],
    cluckVerdict: "Security is not paranoia. It is the minimum viable discipline for anyone operating in this space. Do it once, do it right, and never think about it again."
  },
  {
    id: "token-research",
    icon: "🔍",
    title: "How to Research a Token",
    category: "RESEARCH",
    summary: "A complete framework for evaluating any token before you put a single dollar in.",
    cluckHook: "Buying a token because someone in a Telegram group said it is going to moon is not investing. It is donating. Here is how you actually evaluate a project.",
    sections: [
      {
        heading: "Step 1 — The Contract Check",
        body: `Before anything else, verify the contract address from the official source.

WHY THIS MATTERS: Scammers create tokens with nearly identical names and symbols to legitimate projects. The only thing that cannot be faked is the contract address.

• Always copy the contract from the official website, CoinGecko, or the project's verified social media
• Search the contract on Solscan or Etherscan and read what you find
• Check when the contract was deployed — very new contracts are higher risk
• Look at the top holders — if 5 wallets hold 80% of supply, concentration risk is extreme
• Check if the contract is verified and open source — unverified contracts are a red flag`
      },
      {
        heading: "Step 2 — Liquidity and Volume",
        body: `A token with no liquidity cannot be sold. This is called a liquidity trap.

WHAT TO CHECK ON DEXSCREENER:
• Total liquidity — under $10K is extremely risky, you may not be able to exit
• Is liquidity locked? Check team.finance, UNCX, or Jupiter lock
• Who controls the liquidity? Creator-controlled LP can be removed (rug pull)
• 24H volume relative to liquidity — low volume with high liquidity means little interest
• Age of the liquidity pool — very new pools carry more risk

CLKN EXAMPLE: CLKN graduated from the Bags.fm bonding curve to Meteora DAMM V2. The graduation process locks liquidity permanently. That is why it cannot be rugged — the mechanism itself prevents it.`
      },
      {
        heading: "Step 3 — Team and Transparency",
        body: `Anonymous teams are normal in crypto. Lack of any transparency is not.

WHAT TO LOOK FOR:
• Is there a website? Is it real content or a template with placeholder text?
• Does the project have a whitepaper or documentation?
• Are there social channels with genuine engagement or bot-inflated numbers?
• Has the team communicated consistently over time or just around launches?
• Are there known advisors, backers, or partnerships that can be verified?

COMMUNITY SIGNALS:
• Organic community engagement beats follower counts
• Real users asking real questions is a positive signal
• Communities that only pump and never discuss fundamentals are warning signs
• Check how the team responds to critical questions — defensiveness is a red flag`
      },
      {
        heading: "Step 4 — Tokenomics",
        body: `How tokens are distributed and released determines who profits at whose expense.

KEY QUESTIONS:
• What is the total supply and circulating supply?
• Are there team/investor allocations with vesting schedules?
• Is there a token unlock schedule — when do large allocations become tradeable?
• What is the fully diluted valuation vs market cap? Large gap = future sell pressure
• Is there a burn mechanism, buyback program, or deflationary model?

RED FLAGS:
• Team holds large % with no lock or vesting
• Upcoming unlocks that dwarf current circulating supply
• Emissions that continuously dilute holders
• No clear utility for why the token needs to exist`
      },
      {
        heading: "Step 5 — The Gut Check",
        body: `After all the research, ask yourself these questions honestly:

• Do I understand what this project actually does?
• Can I explain why the token needs to exist?
• Would I still buy this if no one else was talking about it?
• Am I buying because of FOMO or because of conviction?
• Have I sized this position appropriately for the risk level?
• Do I have a plan for if it goes down 50%?

The answers matter more than any metric. Most people skip the gut check entirely and regret it.

CLUCK'S FRAMEWORK: Research first. Size second. Enter third. Never reverse the order.`
      }
    ],
    cluckVerdict: "Five steps. Every single time. No shortcuts. The market will find the shortcuts you took and charge you accordingly."
  },
  {
    id: "solscan",
    icon: "🔎",
    title: "Reading Solscan Like a Pro",
    category: "RESEARCH",
    summary: "The blockchain is a public ledger. Everything is visible to everyone. Here is how to read it.",
    cluckHook: "Every transaction on Solana is public forever. Most people have no idea how to read this data. The ones who do have a significant edge.",
    sections: [
      {
        heading: "What Is Solscan?",
        body: `Solscan is a blockchain explorer for Solana. It shows you every transaction, every wallet, every token transfer, and every smart contract interaction — all publicly visible, all searchable.

KEY THINGS YOU CAN DO ON SOLSCAN:
• Look up any wallet address and see its complete transaction history
• Track token movements — who is buying, who is selling, how much
• See when a token contract was deployed and by whom
• Verify that a transaction actually went through
• Find top holders of any token
• Read smart contract code (if verified)

Think of Solscan as the full history of everything that has happened on Solana. Nothing can be hidden. Nothing can be deleted.`
      },
      {
        heading: "Reading a Wallet",
        body: `When you search a wallet address on Solscan you see:

OVERVIEW TAB:
• SOL balance and total portfolio value
• All token holdings with current values
• Transaction count and first/last activity

TRANSACTIONS TAB:
• Every transaction chronologically
• What was sent, received, swapped, or staked
• Timestamp and transaction fee paid
• Whether it succeeded or failed

TOKEN ACCOUNTS TAB:
• Every SPL token the wallet has ever held
• Current balance and token mint address

HOW TO USE THIS:
Track wallets of successful traders — see what they are buying before it moves. Find deployer wallets of token projects — see if they are selling while promoting. Verify that a team wallet has not dumped its allocation.`
      },
      {
        heading: "Reading a Transaction",
        body: `Click any transaction signature to see the full detail:

WHAT YOU WILL SEE:
• Block and timestamp — exactly when it happened
• Fee payer — who paid the transaction fee
• Instructions — what the transaction actually did
• Token transfers — which tokens moved, how much, between which wallets
• Account inputs and outputs — all accounts involved

BALANCE CHANGES TAB:
This is the most useful view. It shows exactly what changed in each wallet as a result of this transaction. Positive numbers = received, negative numbers = sent.

PRO TIP: The Balance Changes tab is how you verify on-chain payments. If you see your wallet with a positive CLKN balance change matching your expected amount — the payment went through.`
      },
      {
        heading: "Finding Smart Money",
        body: `Smart money wallets are wallets that consistently buy tokens early and sell at peaks. Tracking them gives you early signals on what is gaining traction.

HOW TO FIND THEM:
• Look at early transactions on any successful token
• Find wallets that bought early with significant size
• Check their other holdings — do they have a pattern of early entries?
• Tools like Birdeye, Cielo, and Nansen help surface these wallets automatically

HOW TO USE THE SIGNAL:
• Smart money buying is a positive signal — not a guarantee
• Smart money selling is a warning signal — take it seriously
• Multiple smart money wallets entering the same token simultaneously is a stronger signal
• Do your own research in addition to following wallets — they can be wrong too

CAUTION: Some wallets appear to be smart money but are actually insider wallets. Entry before any public announcement is a red flag, not a signal to follow.`
      },
      {
        heading: "Common Mistakes",
        body: `❌ Assuming a transaction succeeded without verifying on Solscan
❌ Following a wallet without understanding why it makes the decisions it does
❌ Ignoring the age of transactions — old activity is less relevant than recent
❌ Not checking if a token deployer has dumped their allocation
❌ Misreading balance changes — always check the sign (positive/negative)
❌ Confusing token accounts with wallet addresses — they are different things`
      }
    ],
    cluckVerdict: "The blockchain hides nothing. Every rug pull, every insider dump, every smart money entry is visible to anyone willing to look. Most people do not look. Now you have no excuse."
  },
  {
    id: "stablecoins",
    icon: "💵",
    title: "Understanding Stablecoins",
    category: "CONCEPTS",
    summary: "Not all stable is created equal. Some stablecoins are safer than others. Some have failed catastrophically.",
    cluckHook: "People park money in stablecoins thinking they are safe. Sometimes they are. Sometimes an algorithmic stable depegs to zero overnight and takes billions with it. Know the difference.",
    sections: [
      {
        heading: "What Is a Stablecoin?",
        body: `A stablecoin is a cryptocurrency designed to maintain a stable value — usually pegged to $1 USD. They serve as a safe haven in volatile markets and as a medium of exchange in DeFi.

WHY STABLECOINS EXIST:
• Move value without exposure to crypto volatility
• Earn yield in DeFi without holding volatile assets
• Trade in and out of positions quickly without converting to fiat
• Send money globally instantly with minimal fees

The key question for any stablecoin: what backs the peg? How is the $1 value maintained? The answer determines how safe it actually is.`
      },
      {
        heading: "Types of Stablecoins",
        body: `FIAT-BACKED (Centralized)
Examples: USDC, USDT, BUSD
• Backed 1:1 by real USD held in bank accounts
• Most stable and battle-tested
• Counterparty risk — you trust the issuer (Circle, Tether)
• Subject to regulatory action and account freezing
• USDC can freeze wallets on command

CRYPTO-BACKED (Decentralized)
Examples: DAI, LUSD
• Backed by overcollateralized crypto deposits
• No central issuer — governed by smart contracts
• More decentralized but more complex
• Can depeg if collateral value drops too fast
• DAI is the most established — has held its peg through multiple crashes

ALGORITHMIC (Experimental)
Examples: UST (collapsed 2022), FRAX
• Use algorithms and incentive mechanisms to maintain the peg
• Not backed by real assets
• UST/LUNA collapsed in May 2022 — $40B wiped out in days
• Treat all algorithmic stables as high risk until proven otherwise over years

YIELD-BEARING
Examples: sUSDC, USDe
• Stablecoins that automatically earn yield
• Usually backed by staked assets or basis trade strategies
• Higher yield = higher complexity = higher risk`
      },
      {
        heading: "Depegging Events",
        body: `A depeg happens when a stablecoin loses its $1 value. Minor depegs (a few cents) are common during volatility. Major depegs can be catastrophic.

FAMOUS DEPEGS:
• UST/LUNA (May 2022) — algorithmic stable collapsed from $1 to near zero in 72 hours, wiping out $40B+
• USDC (March 2023) — briefly depegged to $0.87 when Silicon Valley Bank (which held Circle's reserves) failed. Recovered within days.
• DAI — has experienced minor depegs during extreme market stress but always recovered

HOW DEPEGS HAPPEN:
• Algorithmic mechanisms break under bank-run conditions
• Reserve backing is questioned or proven insufficient
• Smart contract exploits drain backing assets
• Regulatory action freezes reserves

RULE: Never keep more in a stablecoin than you can afford to lose entirely. USDC and USDT are the safest options but nothing is truly risk-free.`
      },
      {
        heading: "Stablecoins in DeFi",
        body: `Stablecoins are the lifeblood of DeFi. They enable:

LP POSITIONS: Stablecoin pairs (USDC/USDT) have minimal impermanent loss and earn steady fees. Popular with conservative LPs.

LENDING: Borrow against your crypto collateral in stablecoins. Keep your crypto exposure while getting liquidity.

YIELD FARMING: Deposit stablecoins into protocols to earn yield. Always evaluate what generates the yield — sustainable protocol fees vs unsustainable token emissions.

SAFE HAVEN: During market crashes, moving to stablecoins preserves value while waiting for re-entry opportunities.

CLUCK'S TAKE: USDC for safety, DAI for decentralization, and stay far away from anything calling itself an algorithmic stable until it has survived at least two full market cycles.`
      }
    ],
    cluckVerdict: "The word stable is not a guarantee. It is an aspiration. Know what backs your stablecoin before you park serious money in it."
  },
  {
    id: "bridges",
    icon: "🌉",
    title: "Bridges & Cross-Chain",
    category: "CONCEPTS",
    summary: "Moving assets between blockchains is powerful but carries unique risks. Bridge hacks have cost billions.",
    cluckHook: "Bridges are one of the most important and most dangerous pieces of infrastructure in crypto. Billions have been lost to bridge exploits. Understand them before you use them.",
    sections: [
      {
        heading: "What Is a Bridge?",
        body: `A bridge is a protocol that allows you to move assets from one blockchain to another. Without bridges, Ethereum, Solana, Bitcoin, and other chains would be entirely isolated ecosystems.

HOW BRIDGES WORK (simplified):
1. You deposit Token A on Chain A into the bridge contract
2. The bridge locks your Token A
3. The bridge mints a wrapped version of Token A on Chain B
4. You receive the wrapped token on Chain B
5. To go back, you burn the wrapped token and receive the original

The bridge holds the locked assets on one side. This makes it a massive target — it is essentially a vault holding billions of dollars of crypto secured by smart contract code.`
      },
      {
        heading: "Types of Bridges",
        body: `LOCK AND MINT BRIDGES
Most common. Lock assets on source chain, mint wrapped assets on destination.
Examples: Wormhole, Portal Bridge
Risk: If the bridge contract is exploited, all locked assets can be drained.

LIQUIDITY NETWORK BRIDGES
Use liquidity pools on both sides. Faster but requires sufficient liquidity.
Examples: Stargate, Across Protocol
Risk: Liquidity can be depleted during high demand.

NATIVE BRIDGES
Built by the blockchain itself. Generally more secure but slower.
Examples: Ethereum L2 bridges (Arbitrum, Optimism native bridges)
Risk: Lower smart contract risk but usually slower withdrawal times.

CROSS-CHAIN MESSAGING
Not just tokens — passes data and instructions between chains.
Examples: LayerZero, Chainlink CCIP
Risk: Complex interactions increase attack surface.`
      },
      {
        heading: "Major Bridge Hacks",
        body: `Bridge hacks are the largest category of crypto exploit by total value stolen.

RONIN BRIDGE — March 2022 — $625M stolen
Hackers compromised 5 of 9 validator keys and drained the bridge.

WORMHOLE — February 2022 — $320M stolen
A bug in the Solana smart contract allowed minting of 120,000 wrapped ETH without depositing collateral.

NOMAD BRIDGE — August 2022 — $190M stolen
A single misconfiguration allowed anyone to drain the bridge. Became a free-for-all as hundreds of wallets copied the exploit transaction.

HARMONY HORIZON — June 2022 — $100M stolen
2 of 5 multisig keys compromised — insufficient decentralization.

TOTAL BRIDGE LOSSES 2022: Over $2 billion.

The pattern: bridges concentrate enormous value in smart contracts that are difficult to secure perfectly. Every line of code is an attack surface.`
      },
      {
        heading: "How to Bridge Safely",
        body: `You cannot eliminate bridge risk but you can manage it.

BEST PRACTICES:
• Use the most battle-tested bridges — age and audit history matter
• Check that the bridge has been audited by reputable security firms
• Never bridge more than you need at one time
• Use native bridges when speed is not critical — they are generally safer
• Check bridge TVL — very low TVL means less liquidity and less battle-testing
• Do not leave assets on bridged contracts longer than necessary

FOR SOLANA SPECIFICALLY:
• Wormhole is the most established Solana bridge — it was hacked but has since recovered and been heavily audited
• Allbridge and deBridge are alternatives
• Always verify the destination contract address before sending

RULE: Treat bridging like surgery. Do it when necessary, use the best tools available, and keep the exposure time as short as possible.`
      }
    ],
    cluckVerdict: "Bridges are necessary infrastructure and they are dangerous. Use them carefully, use established ones, and never leave more locked in a bridge contract than you can afford to lose."
  },
  {
    id: "psychology",
    icon: "🧠",
    title: "Trading Psychology",
    category: "SURVIVAL",
    summary: "The market does not beat most people with complexity. It beats them with emotion.",
    cluckHook: "Every losing trader knows what they should have done. They knew it in real time too. The problem was never knowledge — it was emotion overriding judgment. This lesson is about fixing that.",
    sections: [
      {
        heading: "FOMO — Fear of Missing Out",
        body: `FOMO is the emotional state that makes you buy a token after it has already gone up 300% because you are afraid of missing further gains.

HOW IT WORKS AGAINST YOU:
• You see a token pumping on your timeline
• You imagine the gains you would have had if you bought earlier
• You convince yourself it still has more to run
• You buy near the top
• Early buyers take profit using your money as exit liquidity
• Price drops. You hold hoping for a recovery that may never come.

FOMO PROTECTION:
• Make your entry decisions before the price moves, not after
• If you missed a move, accept it and look for the next one
• Ask yourself: would I buy this at this price if I had never seen a lower price? If no — do not buy
• Set price alerts in advance so you are not reacting, you are executing a plan`
      },
      {
        heading: "FUD — Fear, Uncertainty, Doubt",
        body: `FUD is information — real or manufactured — designed to create fear and trigger selling.

TYPES OF FUD:
• Legitimate — real negative news that should affect your decision
• Manufactured — coordinated campaigns to suppress price so large buyers can accumulate
• Uncertainty bias — your own brain magnifying risks in a downturn

HOW TO EVALUATE FUD:
• Is it based on verifiable facts or rumors and speculation?
• Does the source have an incentive to spread fear?
• Would this matter in 6 months?
• Has the project addressed it directly and transparently?
• Is everyone else scared for the same reason at the same time? (Often a buy signal, not a sell signal)

CLUCK'S RULE: Panic selling at the bottom is the most expensive thing most retail investors ever do.`
      },
      {
        heading: "Loss Aversion and Revenge Trading",
        body: `Loss aversion is the psychological phenomenon where losses feel twice as painful as equivalent gains feel good. This causes irrational behavior.

LOSS AVERSION TRAPS:
• Holding a losing position too long because selling makes the loss "real"
• Refusing to cut losses because of how much you paid (sunk cost fallacy)
• Taking excessive risk to "get back to even" after a loss

REVENGE TRADING:
After a loss, the brain wants to recover immediately. This leads to:
• Larger position sizes to make back losses faster
• Lower quality setups accepted out of impatience
• Emotional decision-making instead of analytical
• The loss compounds

THE FIX:
• Pre-set your maximum loss per trade before entering
• After a significant loss, stop trading for 24 hours
• Your goal is not to win back what you lost — it is to make the next best decision with what you have now`
      },
      {
        heading: "Building a Discipline Framework",
        body: `Discipline is not willpower. Willpower is finite and unreliable. Discipline is a system that makes the right choice the path of least resistance.

BUILD YOUR FRAMEWORK:
• Written rules — document your strategy before emotion is involved
• Position sizing rules — never size based on conviction, always based on risk
• Exit rules — define profit targets and stop losses before entering
• No-trade zones — times or conditions when you do not trade at all
• Review process — analyze your decisions weekly, not just your results

THE JOURNALING HABIT:
Write down why you entered every trade and what you expected. Review it after. The pattern of where you are wrong is the most valuable information you have.

CLUCK'S FRAMEWORK: Plan the trade. Trade the plan. Review the result. Improve the plan. Repeat.`
      },
      {
        heading: "Common Mistakes",
        body: `❌ Checking prices every 5 minutes — it creates anxiety and impulse decisions
❌ Trading based on what others are doing rather than your own analysis
❌ Having no exit plan when you enter — hope is not a strategy
❌ Overtrading — more trades does not mean more profit, it means more fees and more mistakes
❌ Letting a trade become an investment — if you would not buy it today, why are you still holding it?
❌ Confusing luck with skill in early wins — the market will eventually test your process`
      }
    ],
    cluckVerdict: "The market is a machine for transferring money from emotional people to disciplined people. Which side of that transaction you are on is entirely your choice."
  },
  {
    id: "taxes",
    icon: "🧾",
    title: "Crypto Tax Basics",
    category: "SURVIVAL",
    summary: "Not financial or tax advice. But you need to understand the basics before tax season surprises you.",
    cluckHook: "Cluck Norris does not give tax advice. But Cluck Norris also does not want you blindsided by a five figure tax bill you did not see coming. Pay attention.",
    sections: [
      {
        heading: "What Triggers a Taxable Event",
        body: `In most jurisdictions, the following are taxable events for crypto:

GENERALLY TAXABLE:
• Selling crypto for fiat (USD, EUR, etc.)
• Trading one crypto for another (BTC → ETH is a taxable event)
• Using crypto to purchase goods or services
• Receiving crypto as income (staking rewards, airdrops, payments)
• DeFi activities — swapping tokens, receiving LP fees, yield farming rewards

GENERALLY NOT TAXABLE:
• Buying crypto with fiat and holding it
• Transferring crypto between your own wallets
• Gifting crypto (rules vary by jurisdiction and amount)

THE IMPORTANT TRUTH: In most countries, every single token swap in DeFi is potentially a taxable event. If you made 500 trades this year, you potentially have 500 taxable events to report.

This is not legal or tax advice. Consult a qualified tax professional in your jurisdiction.`
      },
      {
        heading: "Short vs Long Term Capital Gains",
        body: `HOW GAINS ARE CALCULATED:
Capital gain = Sale price minus cost basis (what you paid)

SHORT TERM CAPITAL GAINS:
• Assets held less than 1 year (in US)
• Taxed as ordinary income — your highest tax rate
• Can be 10-37% depending on your total income

LONG TERM CAPITAL GAINS:
• Assets held more than 1 year (in US)
• Taxed at preferential rates — 0%, 15%, or 20%
• Significantly lower than short term rates

THE IMPLICATION:
Holding a position for over 12 months before selling can dramatically reduce your tax liability. This is one of the most powerful legal tax strategies available and most traders ignore it completely.

IMPORTANT: Tax law varies by country. Some countries have no capital gains tax on crypto. Others treat it as income. Always verify the rules in your specific jurisdiction.`
      },
      {
        heading: "Record Keeping",
        body: `The single most important thing you can do is keep records. The IRS and other tax authorities are increasingly sophisticated about crypto.

WHAT TO RECORD FOR EVERY TRANSACTION:
• Date and time
• Amount bought or sold
• Price at time of transaction (in your local currency)
• Any fees paid
• Which wallet or exchange
• Transaction hash for verification

TOOLS THAT HELP:
• Koinly — import from exchanges and wallets automatically
• CoinTracker — multi-chain support including Solana
• TaxBit — enterprise-grade, used by exchanges
• Rotki — open source, self-hosted option

SOLANA SPECIFICALLY:
DeFi activity on Solana is complex — many transactions per interaction, wrapping and unwrapping tokens, LP positions. Use a tool that specifically supports Solana DeFi rather than trying to track manually.`
      },
      {
        heading: "Common Tax Mistakes",
        body: `❌ Thinking you only owe tax when you cash out to fiat — token-to-token trades are taxable in most jurisdictions
❌ Not keeping records because "the amounts are small" — small trades compound to significant totals
❌ Forgetting about staking and farming rewards — these are typically taxable as income when received
❌ Using FIFO vs HIFO without understanding the difference — accounting method affects your tax significantly
❌ Waiting until December to think about taxes — tax loss harvesting opportunities are missed
❌ Not reporting because "they will never know" — blockchain is public and permanently auditable

CLUCK'S DISCLAIMER: None of this is tax advice. This is general educational information. Hire a crypto-qualified accountant. It is worth the cost.`
      }
    ],
    cluckVerdict: "The government got to crypto slower than the market did. They have caught up. Keep records. Pay what you owe. Do not let taxes be the thing that ends your crypto journey."
  },
  {
    id: "nfts",
    icon: "🖼️",
    title: "NFTs & Digital Ownership",
    category: "CONCEPTS",
    summary: "NFTs are not just JPEGs. They are a technology for digital ownership. Understanding what they are and are not matters.",
    cluckHook: "NFTs got mocked and got hyped and got crashed and got written off. The technology is real. The use cases are real. Most of the 2021 prices were not. Here is what you actually need to know.",
    sections: [
      {
        heading: "What Is an NFT?",
        body: `NFT stands for Non-Fungible Token. Non-fungible means unique — not interchangeable with another identical item.

FUNGIBLE: 1 USDC = 1 USDC. They are identical and interchangeable.
NON-FUNGIBLE: NFT #1234 is not the same as NFT #5678, even from the same collection.

HOW NFTS WORK:
• A smart contract on the blockchain records that a specific wallet owns a specific token ID
• The token ID can point to an image, video, audio file, or any other data
• The ownership record is permanent and publicly verifiable
• Transferring the NFT transfers the ownership record

WHAT AN NFT IS NOT:
• Owning an NFT does not mean you own the copyright to the image
• The image itself is usually stored off-chain (IPFS or centralized server)
• If the server hosting the image goes down, your NFT may point to a broken link
• Owning an NFT of a brand does not give you any legal rights to that brand`
      },
      {
        heading: "Real Use Cases",
        body: `Beyond profile picture collections, NFTs have legitimate applications:

GAMING ASSETS
True digital ownership of in-game items. Trade, sell, or use across compatible games. The item exists on the blockchain — not on a company's server they can shut down.

EVENT TICKETS
NFT tickets cannot be counterfeited. Resale royalties go to the event organizer. Attendance can be verified on-chain permanently.

MUSIC AND CONTENT
Artists sell directly to fans without labels or platforms. Royalties are programmable — automatically paid to creators on every resale.

REAL WORLD ASSETS (RWAs)
Tokenizing real estate, art, commodities. Each NFT represents fractional ownership. Emerging use case with significant regulatory complexity.

IDENTITY AND CREDENTIALS
Verifiable credentials, membership passes, certificates of completion. Cluck Norris could issue NFT certificates to Ultimate Challenge passers — the achievement would be on-chain forever.

DOMAIN NAMES
Solana Name Service (.sol domains), ENS (.eth). Your wallet address as a readable name.`
      },
      {
        heading: "The 2021 Bubble and What Happened",
        body: `In 2021, NFT trading volume exploded. Profile picture collections sold for hundreds of thousands of dollars. Floor prices collapsed 90%+ in 2022.

WHY IT HAPPENED:
• New technology attracted speculative capital
• Social status driven by ownership of rare profile pictures
• Easy money from stimulus and crypto bull market
• FOMO buying at peak prices
• Most buyers had no framework for valuing what they were buying

WHAT ACTUALLY HAS VALUE:
• Projects with real utility beyond ownership (gaming, ticketing, real assets)
• Projects with strong communities and brand identity
• Projects from established creators with proven track records
• Projects where the NFT grants access to something genuinely valuable

WHAT DOES NOT HAVE VALUE:
• Randomly generated image collections with no utility
• Projects where the value proposition is purely "it might go up"
• Collections with anonymous teams and no roadmap

The technology survived the bubble. Most of the 2021 projects did not.`
      },
      {
        heading: "NFTs on Solana",
        body: `Solana has a significant NFT ecosystem due to low transaction costs and fast confirmation times.

KEY PLATFORMS:
• Magic Eden — largest Solana NFT marketplace
• Tensor — popular with power users, advanced trading features
• Exchange.art — focused on digital art

NOTABLE COLLECTIONS:
• Mad Lads — Backpack wallet's flagship collection
• DeGods and y00ts — migrated to Ethereum/Polygon
• Okay Bears — established Solana blue chip

SOLANA NFT SPECIFICS:
• Uses the Metaplex standard for NFT metadata
• Compressed NFTs (cNFTs) dramatically reduce minting costs
• Creator royalties have been a contested issue on Solana marketplaces

IF YOU ARE BUYING NFTS ON SOLANA:
• Stick to established marketplaces
• Verify the official collection address before buying
• Fake collections with identical art are common scams
• Understand what you are actually getting — utility vs pure speculation`
      }
    ],
    cluckVerdict: "NFTs are not dead and they were not just hype. The use cases are real. Most of the 2021 prices were not. Approach with the same research discipline you would apply to any other crypto asset."
  },
  {
    id: "daos",
    icon: "🏛️",
    title: "DAOs — Decentralized Autonomous Organizations",
    category: "CONCEPTS",
    summary: "DAOs are a new form of organization governed by code and token holders instead of executives and boards.",
    cluckHook: "Most people have heard of DAOs. Very few understand what they actually are, how they work, and why they matter. This is your briefing.",
    sections: [
      {
        heading: "What Is a DAO?",
        body: `A Decentralized Autonomous Organization is an organization governed by smart contracts and token-based voting instead of traditional hierarchies.

THE CORE IDEA:
• Rules are encoded in smart contracts — transparent, automatic, tamper-resistant
• Decisions are made by governance token holders through on-chain voting
• Treasury funds are controlled by the smart contract, not an individual
• Anyone with tokens can propose and vote on changes

TRADITIONAL COMPANY vs DAO:
Traditional: CEO decides, board approves, lawyers enforce
DAO: Token holders vote, smart contract executes, blockchain enforces

THE PROMISE:
Coordination without trust. You do not need to trust the organization's leadership because the rules are in code, the votes are public, and the treasury is on-chain.`
      },
      {
        heading: "How DAO Governance Works",
        body: `GOVERNANCE TOKENS:
Members hold governance tokens that give them voting rights. More tokens = more voting power in most systems.

THE PROPOSAL PROCESS:
1. Member submits a proposal (usually requires holding minimum tokens)
2. Discussion period — community debates the proposal
3. Voting period — token holders vote yes or no
4. If passed — smart contract executes automatically (or multisig executes)
5. If failed — proposal is rejected

QUORUM REQUIREMENTS:
Most DAOs require a minimum percentage of tokens to participate for a vote to be valid. Low voter turnout is a chronic problem — most token holders do not vote.

DELEGATION:
Some governance systems allow you to delegate your votes to another wallet — useful if you trust someone else's judgment or are too busy to vote on every proposal.`
      },
      {
        heading: "DAO Treasuries",
        body: `Many DAOs control significant treasuries — pools of funds used to fund operations, development, and ecosystem growth.

HOW TREASURIES WORK:
• Funds are held in a multisig wallet or governed directly by smart contracts
• Spending requires passing a governance vote
• All transactions are publicly visible on-chain
• Members can audit every dollar in and out

FAMOUS DAO TREASURIES:
• Uniswap DAO — billions in UNI token treasury
• MakerDAO — manages billions in DAI stablecoin collateral
• Compound, Aave, Curve — all have significant on-chain treasuries

THE TENSION:
Large treasuries attract governance attacks — buying enough tokens to pass malicious proposals. Balancer Protocol suffered an attempted governance attack. Always check how a DAO's voting power is distributed.`
      },
      {
        heading: "DAO Risks and Limitations",
        body: `DAOs are an experiment in governance. They have real limitations.

VOTER APATHY:
Most token holders do not vote. A small group of active voters or large holders effectively controls most DAOs.

PLUTOCRACY RISK:
Token-weighted voting means wealth = power. Whales can dominate decisions regardless of community sentiment.

GOVERNANCE ATTACKS:
An attacker can accumulate tokens and pass malicious proposals. The Beanstalk Protocol lost $182M to a flash loan governance attack in 2022.

LEGAL UNCERTAINTY:
DAO legal status is unclear in most jurisdictions. Members may have personal liability. Wyoming and a few other states have DAO-specific legislation but it is early.

COORDINATION PROBLEMS:
Moving fast is hard when every decision requires a vote. Many DAOs have moved to core team execution with token holder oversight — a compromise between decentralization and efficiency.

CLUCK'S TAKE: DAOs are a genuine innovation in coordination and governance. They are also immature, exploitable, and often dominated by insiders despite decentralization theater. Evaluate each one on its actual governance structure, not its marketing.`
      }
    ],
    cluckVerdict: "DAOs represent a genuinely new way to organize and coordinate humans around shared goals. The theory is compelling. The practice is messier. Stay informed and participate in the ones you believe in."
  },
  {
    id: "alpha",
    icon: "⚡",
    title: "Finding Alpha",
    category: "RESEARCH",
    summary: "Alpha is an edge — information or insight that others do not have yet. Here is how to build a system for finding it.",
    cluckHook: "Everyone is looking for alpha. Most people look in the wrong places. Real alpha comes from doing work others are not willing to do. If you found it on Twitter, so did everyone else.",
    sections: [
      {
        heading: "What Is Alpha?",
        body: `Alpha is an edge over the market. Information, insight, or analysis that is not yet priced in — that allows you to position ahead of others.

TYPES OF ALPHA:
• Information alpha — you know something before others do
• Analytical alpha — you interpret public information better than others
• Speed alpha — you act on information faster than others
• Network alpha — relationships give you early access to opportunities
• Structural alpha — understanding market mechanics others ignore

THE HARD TRUTH:
Most retail crypto traders have no edge. They react to news that is already priced in, follow the same influencers, use the same tools, and wonder why they underperform.

Building alpha means doing work others will not do.`
      },
      {
        heading: "On-Chain Alpha",
        body: `The blockchain is public. Every transaction is visible. This creates alpha opportunities for those willing to read it.

WHAT TO TRACK ON-CHAIN:
• Smart money wallet activity — what are consistent winners buying?
• Token unlock schedules — large unlocks create predictable sell pressure
• LP movements — large liquidity additions or removals signal intent
• Exchange inflows/outflows — large exchange inflows often precede selling
• Whale accumulation — large wallets quietly building positions

TOOLS:
• Nansen — tracks labeled smart money wallets (paid)
• Cielo Finance — wallet tracking and alerts
• Birdeye — Solana token analytics and wallet tracking
• Solscan — manual on-chain research
• DexScreener — new pair alerts and volume analysis

SETTING UP ALERTS:
The key is not just having the tools but setting up systematic alerts so you see signals in real time rather than after they have already moved.`
      },
      {
        heading: "Social and Community Alpha",
        body: `Information spreads through communities before it spreads through media. Being in the right communities early matters.

WHERE ALPHA LIVES:
• Builder communities — developers often discuss what they are building before launching
• Protocol Discord servers — announcements hit Discord before X
• Early-stage project Telegrams — before projects get traction
• Developer GitHub activity — watch repos for new commits and activity

HOW TO EVALUATE COMMUNITY SIGNALS:
• Is the alpha actionable or just hype?
• Who is sharing it and what is their track record?
• Is there on-chain data to support the narrative?
• Is the opportunity already known widely or still emerging?

THE SIGNAL-TO-NOISE PROBLEM:
Most "alpha" shared in public channels is already priced in or is designed to create buying pressure for someone else's bags. Apply the same skepticism to community signals that you apply to everything else.`
      },
      {
        heading: "Building a System",
        body: `Alpha is not a single find. It is a system you build and run consistently.

YOUR ALPHA STACK:
1. On-chain data feeds — 2-3 wallet trackers you check daily
2. New pair monitoring — alerts for new Solana pairs above liquidity threshold
3. Community channels — 3-5 high signal communities, not 50 noisy ones
4. News aggregation — crypto news filtered for actionability, not noise
5. Personal research time — dedicated time each day for independent analysis

THE WORKFLOW:
• Morning: Check overnight on-chain activity and new deployments
• Ongoing: Monitor wallet alerts and community signals
• Weekly: Review performance of positions and update watchlist
• Monthly: Evaluate which information sources actually produced alpha

CLUCK'S RULE: Quality over quantity. One actionable insight from genuine research beats ten recycled tweets. Build a small, reliable system and run it consistently.`
      },
      {
        heading: "Common Alpha Mistakes",
        body: `❌ Thinking public alpha is still alpha — if it is trending on CT it is already priced in
❌ Following too many sources — noise drowns signal
❌ Confusing access to information with the ability to act on it profitably
❌ Not tracking your own alpha performance — which sources actually worked?
❌ Paying for alpha that should be free — most paid alpha groups underperform
❌ Confusing being early with being right — early and wrong still loses money`
      }
    ],
    cluckVerdict: "Alpha is earned not found. Build a system, do the work others skip, and run it consistently. The market rewards preparation, not luck."
  }
];

// ── THE LIBRARY ──
const LIBRARY_LIQUIDITY = [
  {
    id: "what-is-liquidity",
    title: "What is Liquidity?",
    icon: "💧",
    summary: "Liquidity is how easily an asset can be bought or sold without moving the price.",
    content: "Liquidity refers to how much of an asset is available for trading at any given time. High liquidity means you can buy or sell large amounts without dramatically changing the price. Low liquidity means even small trades cause big price swings.\n\nIn DeFi, liquidity lives in pools — smart contracts holding two tokens that traders swap against. The more tokens in the pool, the less your trade moves the price.\n\nThink of it like a swimming pool vs a bathtub. Jump into an Olympic pool and barely make a splash. Jump into a bathtub and everything overflows.\n\nWHY IT MATTERS: Before buying any token, always check the liquidity. A token with $500 in liquidity can be moved 50% by a $250 buy. A token with $500,000 in liquidity barely moves on the same trade.",
  },
  {
    id: "amm",
    title: "How AMMs Work",
    icon: "⚙️",
    summary: "Automated Market Makers use a mathematical formula to set prices automatically.",
    content: "An Automated Market Maker (AMM) is a smart contract that holds two tokens and automatically calculates their price based on supply and demand — no order book, no human market maker needed.\n\nThe most common formula is the Constant Product Formula:\n\nx × y = k\n\nWhere x = amount of Token A, y = amount of Token B, and k = a constant that never changes.\n\nWhen you buy Token A, you add Token B to the pool and remove Token A. Because k must stay constant, as Token A supply goes down, its price goes up. This is automatic — no one sets the price manually.\n\nEXAMPLE: A pool has 100 SOL and 1,000,000 CLKN. k = 100,000,000. You buy 10 SOL worth of CLKN. Now the pool has 110 SOL — to keep k constant, it must have ~909,090 CLKN. You received ~90,910 CLKN. The price moved because you changed the ratio.",
  },
  {
    id: "impermanent-loss",
    title: "Impermanent Loss",
    icon: "📉",
    summary: "When token prices diverge, LP providers end up with less value than just holding.",
    content: "Impermanent Loss (IL) happens when the price ratio of your two pooled tokens changes after you deposit. The AMM constantly rebalances the pool, which means you end up with more of the token that went down and less of the token that went up.\n\nIt's called \"impermanent\" because if prices return to their original ratio, the loss disappears. But if you withdraw while prices are diverged, the loss becomes permanent.\n\nEXAMPLE: You deposit $1,000 into a SOL/USDC pool — $500 SOL and $500 USDC. SOL doubles in price. The AMM has rebalanced — you now have less SOL and more USDC than you started with. If you'd just held your SOL and USDC, you'd be worth more than your LP position.\n\nIL is the #1 risk for liquidity providers. It's why LP fees must exceed IL for the position to be profitable. Concentrated liquidity amplifies both earnings AND impermanent loss.",
  },
  {
    id: "concentrated-liquidity",
    title: "Concentrated Liquidity",
    icon: "🎯",
    summary: "Provide liquidity in a specific price range and earn more fees per dollar.",
    content: "Traditional AMMs spread your liquidity across all possible prices from zero to infinity. Most of that liquidity sits in price ranges that will never be traded — it's wasted capital.\n\nConcentrated liquidity (pioneered by Uniswap v3) lets you choose a specific price range for your liquidity. Your capital only earns fees when the token trades within your range — but it earns much more per dollar than a full-range position.\n\nEXAMPLE: Instead of providing liquidity from $0 to infinity, you provide between $0.000001 and $0.000002 for a token currently trading at $0.0000015. All your capital is actively earning fees within that tight range.\n\nTHE TRADEOFF: If price moves outside your range, you stop earning fees entirely and your position becomes 100% one token. Concentrated liquidity requires active management. This is exactly what Meteora DAMM V2 — where CLKN trades — uses.",
  },
  {
    id: "dynamic-bonding-curve",
    title: "Dynamic Bonding Curves",
    icon: "📈",
    summary: "A price mechanism that automatically increases price as more tokens are bought.",
    content: "A bonding curve is a mathematical relationship between a token's price and its supply. As more tokens are purchased, the price automatically rises along the curve. As tokens are sold, the price falls.\n\nBags.fm uses a Dynamic Bonding Curve (DBC) for token launches. When you're the first buyer, you get the lowest price. As more people buy, the curve pushes the price higher. This creates a fair launch where early supporters are rewarded.\n\nThe curve has a graduation threshold — when enough SOL has been raised (typically $30K-$69K market cap depending on configuration), the bonding curve closes, the liquidity migrates automatically to a Meteora DAMM V2 pool, and the token becomes a permanent DEX pair.\n\nCLKN completed this journey — it launched on a Bags.fm bonding curve and graduated to Meteora DAMM V2. This is why the liquidity is permanent and can never be rugged by the creator.",
  },
  {
    id: "meteora-damm",
    title: "Meteora DAMM V2",
    icon: "🌊",
    summary: "The liquidity pool where CLKN trades after graduating from Bags.fm.",
    content: "Meteora's Dynamic AMM (DAMM) V2 is a next-generation liquidity pool on Solana designed to maximize fee earnings for liquidity providers while minimizing impermanent loss through dynamic fee adjustments.\n\nKey features of Meteora DAMM V2:\n\nDYNAMIC FEES: Fee tiers adjust based on market volatility. When the market is volatile, fees increase to compensate LPs for higher impermanent loss risk. When markets are calm, fees decrease to attract more volume.\n\nCONCENTRATED LIQUIDITY: Like Uniswap v3, DAMM V2 supports concentrated positions for capital efficiency.\n\nBAGS.FM INTEGRATION: When a Bags.fm token graduates, its liquidity migrates directly into a Meteora DAMM V2 pool. The migration is automatic, trustless, and permanent — no human interaction required.\n\nCLKN trades in pool: 64WXkHM4zyWUkYy32TfUeBV5wDAfdcUGDxe5ntM4xaTd",
  },
  {
    id: "price-impact",
    title: "Price Impact & Slippage",
    icon: "💥",
    summary: "The difference between the expected price and what you actually pay.",
    content: "Price impact and slippage are related but different concepts that every trader needs to understand.\n\nPRICE IMPACT is how much YOUR specific trade moves the market price. It's determined by the size of your trade relative to the pool's liquidity. A $1,000 buy in a $10,000 pool has 10% price impact — you're consuming 10% of available liquidity in one trade.\n\nSLIPPAGE is the acceptable difference between the price when you submit a transaction and the price when it executes. On Solana, transactions can take a few hundred milliseconds — the price can move during that time.\n\nSLIPPAGE TOLERANCE is how much movement you'll accept before your transaction fails automatically. Set it too low and your trades fail constantly. Set it too high and you're exposed to sandwich attacks.\n\nSANDWICH ATTACKS: MEV bots watch your pending transaction, buy before you (pushing price up), let your trade execute at a worse price, then sell immediately after (profiting from your slippage). This is why low slippage protects you — the sandwich becomes unprofitable.",
  },
  {
    id: "fee-sharing",
    title: "Fee Sharing & LP Earnings",
    icon: "💰",
    summary: "How liquidity providers and token creators earn from trading activity.",
    content: "Every trade on a DEX generates fees. These fees are the incentive that attracts liquidity providers to deposit their tokens into pools.\n\nHOW LP FEES WORK: When you trade in a pool, you pay a small percentage fee (typically 0.25%-1%). This fee is distributed proportionally to all liquidity providers in the pool based on their share of the total liquidity.\n\nBAGS.FM FEE STRUCTURE: Bags.fm adds a creator fee layer on top. When you launch a token on Bags.fm, you (the creator) earn a percentage of all trading fees forever — even after graduation to Meteora. This is the revolutionary part — creators have a permanent financial stake in their token's trading activity.\n\nPARTNER FEES: Bags.fm also has a partner program. Platforms and builders can register a referral code and earn 25% of platform fees on all trades that come through their link. The firechicken007 code in this app earns partner fees on CLKN trades.\n\nCLKN LIFETIME FEES: You can see the total SOL earned from CLKN trading activity live in the Token Data tab — powered by the Bags.fm API.",
  },
  {
    id: "reading-pool",
    title: "How to Read a Liquidity Pool",
    icon: "🔍",
    summary: "Understand what the numbers in a liquidity pool actually mean.",
    content: "When you look at a pool on DexScreener or Meteora, you'll see several key metrics. Here's what they all mean:\n\nLIQUIDITY / TVL: Total value locked in the pool. This is the combined dollar value of both tokens. Higher = more stable prices and less slippage.\n\nPRICE: The current exchange rate between the two tokens, derived from their ratio in the pool.\n\nVOLUME (24H): Total dollar value traded in the last 24 hours. High volume relative to liquidity = high fee earnings for LPs.\n\nVOLUME/LIQUIDITY RATIO: Divide 24H volume by liquidity. A ratio above 1.0 means the pool is earning more than its total value in fees every day — very attractive for LPs.\n\nPRICE CHANGE (24H): How much the token price moved in 24 hours. Expressed as a percentage.\n\nTRANSACTIONS (24H): Number of individual buy/sell transactions. Shows activity level.\n\nBUYS vs SELLS: Breakdown of transaction direction. More buys than sells = buying pressure.\n\nSOL IN POOL: For SOL pairs, this shows how much SOL backs the token. More SOL = stronger liquidity backing.",
  },
  {
    id: "lp-strategy",
    title: "LP Strategy Basics",
    icon: "♟️",
    summary: "When to add liquidity, when to remove it, and how to think about LP positions.",
    content: "Providing liquidity isn't just clicking a button — it's a strategy that requires understanding the tradeoffs.\n\nWHEN LP MAKES SENSE:\n- You plan to hold both tokens long-term anyway (IL doesn't matter if you'd hold both)\n- The pool generates high fees relative to IL risk\n- You believe the price ratio will stay relatively stable\n- You want passive income from your holdings\n\nWHEN LP DOESN'T MAKE SENSE:\n- You're strongly bullish on one token and bearish the other (just hold the one you like)\n- The pool has low volume and won't generate meaningful fees\n- You need your capital liquid for other opportunities\n\nFULL RANGE vs CONCENTRATED:\nFull range positions are set-and-forget. Concentrated positions earn more but require monitoring and rebalancing when price moves outside your range.\n\nIMPERMANENT LOSS CALCULATOR: Before adding to any pool, calculate your breakeven fee earnings vs potential IL. If you need 30 days of fees to break even on IL, make sure you're committed to that timeline.\n\nREMOVING LIQUIDITY: You can remove liquidity at any time — your position is not locked (unless you use a lock protocol). When you remove, you receive both tokens at their current ratio.",
  },
];

const LIBRARY_GLOSSARY = [
  { term: "AMM", def: "Automated Market Maker. A smart contract that automatically prices tokens using a mathematical formula instead of an order book." },
  { term: "APR", def: "Annual Percentage Rate. Simple interest rate over a year, not accounting for compounding." },
  { term: "APY", def: "Annual Percentage Yield. Interest rate accounting for compounding. Always higher than APR for the same rate." },
  { term: "Bonding Curve", def: "A mathematical price mechanism where buying increases price and selling decreases price automatically." },
  { term: "CEX", def: "Centralized Exchange. A company-run trading platform (Coinbase, Binance) that holds your funds and requires KYC." },
  { term: "Cold Wallet", def: "A hardware wallet that stores private keys offline. Much more secure than hot wallets for large amounts." },
  { term: "Concentrated Liquidity", def: "Providing liquidity within a specific price range for higher capital efficiency and fee earnings." },
  { term: "DAMM", def: "Dynamic Automated Market Maker. Meteora's AMM that adjusts fees based on volatility." },
  { term: "DBC", def: "Dynamic Bonding Curve. The launch mechanism used by Bags.fm before graduation to Meteora." },
  { term: "DeFi", def: "Decentralized Finance. Financial services built on blockchain smart contracts with no central authority." },
  { term: "DEX", def: "Decentralized Exchange. A trading platform where swaps happen via smart contracts, not a company." },
  { term: "DYOR", def: "Do Your Own Research. Never invest based solely on others' advice — verify everything yourself." },
  { term: "FDV", def: "Fully Diluted Valuation. Price × total supply including all locked/unvested tokens." },
  { term: "Fee Share", def: "A system where token creators earn a percentage of all trading fees forever." },
  { term: "Flash Loan", def: "An uncollateralized loan borrowed and repaid within a single blockchain transaction." },
  { term: "Floor Price", def: "The lowest current asking price for an asset." },
  { term: "Gas Fee", def: "The cost to execute a transaction on a blockchain. On Solana these are fractions of a cent." },
  { term: "Graduation", def: "When a Bags.fm bonding curve token raises enough SOL to migrate to a permanent Meteora liquidity pool." },
  { term: "Hot Wallet", def: "A software wallet connected to the internet (Phantom, MetaMask). Convenient but less secure than cold storage." },
  { term: "Impermanent Loss", def: "Value loss experienced by LP providers when the price ratio of pooled tokens changes from deposit time." },
  { term: "Jupiter", def: "Solana's leading DEX aggregator and swap infrastructure. Finds the best price across all Solana DEXs." },
  { term: "KYC", def: "Know Your Customer. Identity verification required by centralized exchanges and regulated platforms." },
  { term: "Liquidity", def: "The amount of an asset available for trading. Higher liquidity = less price impact per trade." },
  { term: "Liquidity Pool", def: "A smart contract holding two tokens that traders swap against. LP providers deposit tokens and earn fees." },
  { term: "LP", def: "Liquidity Provider. Someone who deposits tokens into a liquidity pool to earn trading fees." },
  { term: "Market Cap", def: "Price × circulating supply. The total current value of all tokens in circulation." },
  { term: "MEV", def: "Maximal Extractable Value. Profit extracted by validators or bots by reordering transactions (includes sandwich attacks)." },
  { term: "Meteora", def: "A leading Solana DEX and liquidity protocol. CLKN graduated to a Meteora DAMM V2 pool." },
  { term: "Mint Address", def: "The unique identifier for a token on Solana. Used to verify you're buying the correct token." },
  { term: "Mint Authority", def: "The right to create new tokens. Revoking mint authority means supply is permanently fixed." },
  { term: "Multisig", def: "A wallet requiring multiple private key signatures to authorize transactions. Used for security." },
  { term: "Non-Custodial", def: "A wallet where you control your own private keys. No company can freeze or access your funds." },
  { term: "Oracle", def: "A service that feeds real-world data into smart contracts. Price oracles are critical and can be manipulated." },
  { term: "Price Impact", def: "How much your individual trade moves the market price. Higher in low-liquidity pools." },
  { term: "Private Key", def: "The secret key that proves ownership of a wallet. Never share it. Whoever has it controls the funds." },
  { term: "Public Key", def: "Your wallet address. Safe to share. Others use it to send you tokens." },
  { term: "Rug Pull", def: "When developers drain a project's liquidity and disappear, leaving holders with worthless tokens." },
  { term: "Sandwich Attack", def: "An MEV attack where a bot buys before your trade and sells after, profiting from your slippage." },
  { term: "Seed Phrase", def: "A 12-24 word backup phrase that recovers your wallet. Never share it — treat it like cash." },
  { term: "Slippage", def: "The difference between expected and actual trade price. Set tolerance to protect against price movement." },
  { term: "Smart Contract", def: "Self-executing code on a blockchain that automatically enforces agreements without a middleman." },
  { term: "SOL", def: "The native coin of the Solana blockchain. Used for gas fees and as the base pair for most Solana tokens." },
  { term: "Solana", def: "A high-speed, low-cost blockchain capable of 65,000+ transactions per second with sub-cent fees." },
  { term: "Staking", def: "Locking tokens to earn rewards. Can mean validator staking (securing the network) or DeFi yield farming." },
  { term: "TVL", def: "Total Value Locked. The total dollar value of crypto deposited in a DeFi protocol or pool." },
  { term: "Token", def: "A crypto asset built on an existing blockchain (vs a coin which has its own blockchain)." },
  { term: "Tokenomics", def: "The economic design of a token — supply, distribution, vesting, utility, and fee structure." },
  { term: "Vesting", def: "A schedule that gradually unlocks tokens over time. Prevents insiders from dumping immediately." },
  { term: "Wallet", def: "Software or hardware that stores your private keys and lets you interact with the blockchain." },
  { term: "Yield Farming", def: "Earning rewards by providing liquidity or staking in DeFi protocols." },
];

const LIBRARY_RESOURCES = [
  {
    category: "🌊 Liquidity & Trading",
    links: [
      { name: "Meteora", url: "https://app.meteora.ag", desc: "Where CLKN trades — DAMM V2 pools" },
      { name: "Bags.fm", url: "https://bags.fm?ref=firechicken007", desc: "Token launch & fee sharing platform" },
      { name: "Jupiter", url: "https://jup.ag", desc: "Best swap rates on Solana" },
      { name: "DexScreener", url: "https://dexscreener.com", desc: "Real-time pool & price data" },
      { name: "GeckoTerminal", url: "https://geckoterminal.com", desc: "On-chain DEX analytics" },
    ]
  },
  {
    category: "🔍 Research Tools",
    links: [
      { name: "Solscan", url: "https://solscan.io", desc: "Solana block explorer — verify transactions" },
      { name: "Birdeye", url: "https://birdeye.so", desc: "Solana token analytics & wallet tracking" },
      { name: "Jupiter Lock", url: "https://lock.jup.ag", desc: "Verify token locks on Solana" },
      { name: "Rugcheck", url: "https://rugcheck.xyz", desc: "Token safety checker — spot red flags" },
      { name: "Bubblemaps", url: "https://bubblemaps.io", desc: "Visualize token holder distribution" },
    ]
  },
  {
    category: "👛 Wallets",
    links: [
      { name: "Phantom", url: "https://phantom.app", desc: "The most popular Solana wallet" },
      { name: "Backpack", url: "https://backpack.app", desc: "Multi-chain Solana wallet" },
      { name: "Solflare", url: "https://solflare.com", desc: "Feature-rich Solana wallet with hardware support" },
    ]
  },
  {
    category: "📚 Learn More",
    links: [
      { name: "Bags.fm Docs", url: "https://docs.bags.fm", desc: "Official Bags.fm documentation" },
      { name: "Meteora Docs", url: "https://docs.meteora.ag", desc: "Learn about DAMM V2 and liquidity" },
      { name: "Solana Docs", url: "https://docs.solana.com", desc: "Official Solana developer documentation" },
      { name: "CryptoTrend.ing", url: "https://cryptotrend.ing", desc: "Crypto trending platform — community favorite" },
    ]
  },
];

function Library() {
  const [tab, setTab] = useState("deepdives");
  const [openTopic, setOpenTopic] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [search, setSearch] = useState("");

  const filteredGlossary = LIBRARY_GLOSSARY.filter(g =>
    g.term.toLowerCase().includes(search.toLowerCase()) ||
    g.def.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{padding:"0 16px 40px",maxWidth:520,margin:"0 auto"}}>
      {/* Header */}
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{fontSize:36,marginBottom:6}}>📚</div>
        <h2 style={{fontFamily:"'Oswald',sans-serif",fontSize:28,fontWeight:900,color:"#F9FAFB",margin:"0 0 4px",letterSpacing:2}}>THE LIBRARY</h2>
        <p style={{fontFamily:"'Oswald',sans-serif",fontSize:10,color:"#6B7280",letterSpacing:3,margin:0}}>INDEPENDENT STUDY — NO EXAMS</p>
        <div style={{marginTop:10,height:1,background:"linear-gradient(90deg,transparent,rgba(217,119,6,0.5),transparent)"}}/>
      </div>

      {/* Section tabs */}
      <div style={{display:"flex",gap:6,marginBottom:20,flexWrap:"wrap"}}>
        {[
          {id:"deepdives",label:"📖 DEEP DIVES",color:"#F59E0B"},
          {id:"liquidity",label:"🌊 LIQUIDITY",color:"#06B6D4"},
          {id:"glossary",label:"🔤 GLOSSARY",color:"#A78BFA"},
          {id:"resources",label:"🔗 RESOURCES",color:"#10B981"},
        ].map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{
            flex:1,background:tab===t.id?`${t.color}20`:"rgba(255,255,255,0.03)",
            border:`1px solid ${tab===t.id?t.color:"rgba(255,255,255,0.08)"}`,
            borderRadius:8,padding:"8px 4px",fontFamily:"'Oswald',sans-serif",
            fontSize:9,fontWeight:700,color:tab===t.id?t.color:"#6B7280",
            letterSpacing:1,cursor:"pointer"
          }}>{t.label}</button>
        ))}
      </div>

      {/* ASK CLUCK — top of library */}
      <AskCluck context="The Library — DeFi Education" compact={true}/>

      {/* DEEP DIVES TAB */}
      {tab==="deepdives" && (
        <div>
          <div style={{background:"rgba(245,158,11,0.08)",border:"1px solid rgba(245,158,11,0.2)",borderRadius:10,padding:"12px 14px",marginBottom:16}}>
            <p style={{fontFamily:"'Oswald',sans-serif",fontSize:11,color:"#F59E0B",letterSpacing:1,margin:0,lineHeight:1.7}}>
              📖 SELF STUDY — No exams. No pressure. Read at your own pace. Cover the topics that matter most to you.
            </p>
          </div>
          {/* Category groupings */}
          {["SURVIVAL","RESEARCH","CONCEPTS"].map(cat=>(
            <div key={cat} style={{marginBottom:20}}>
              <div style={{fontFamily:"'Oswald',sans-serif",fontSize:9,color:"#6B7280",letterSpacing:3,marginBottom:10,borderBottom:"1px solid rgba(255,255,255,0.06)",paddingBottom:6}}>
                {cat==="SURVIVAL"?"🛡️":cat==="RESEARCH"?"🔍":"💡"} {cat}
              </div>
              {LIBRARY_TOPICS.filter(t=>t.category===cat).map(topic=>(
                <div key={topic.id} style={{marginBottom:8}}>
                  <button onClick={()=>setOpenTopic(openTopic===topic.id?null:topic.id)} style={{width:"100%",background:openTopic===topic.id?"rgba(245,158,11,0.08)":"rgba(255,255,255,0.03)",border:`1px solid ${openTopic===topic.id?"rgba(245,158,11,0.4)":"rgba(255,255,255,0.08)"}`,borderRadius:openTopic===topic.id?"12px 12px 0 0":"12px",padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}}>
                    <div style={{display:"flex",alignItems:"center",gap:10,textAlign:"left"}}>
                      <span style={{fontSize:22}}>{topic.icon}</span>
                      <div>
                        <div style={{fontFamily:"'Oswald',sans-serif",fontSize:13,fontWeight:700,color:openTopic===topic.id?"#F59E0B":"#D1D5DB",letterSpacing:1}}>{topic.title}</div>
                        <div style={{fontFamily:"'Oswald',sans-serif",fontSize:9,color:"#6B7280",letterSpacing:0.5,marginTop:2}}>{topic.summary}</div>
                      </div>
                    </div>
                    <span style={{color:openTopic===topic.id?"#F59E0B":"#6B7280",fontSize:14,flexShrink:0}}>{openTopic===topic.id?"▲":"▼"}</span>
                  </button>
                  {openTopic===topic.id && (
                    <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(245,158,11,0.2)",borderTop:"none",borderRadius:"0 0 12px 12px",padding:"16px"}}>
                      {/* Cluck hook */}
                      <div style={{background:"rgba(217,119,6,0.08)",border:"1px solid rgba(217,119,6,0.2)",borderRadius:10,padding:"12px 14px",marginBottom:16,display:"flex",gap:10,alignItems:"flex-start"}}>
                        <img src={LOGO_B64} alt="CN" style={{width:30,height:30,borderRadius:"50%",objectFit:"cover",border:"1px solid #D97706",flexShrink:0}}/>
                        <p style={{margin:0,fontFamily:"Georgia,serif",fontStyle:"italic",color:"#FCD34D",fontSize:12,lineHeight:1.7}}>{topic.cluckHook}</p>
                      </div>
                      {/* Sections */}
                      {topic.sections.map((sec,i)=>(
                        <div key={i} style={{marginBottom:14}}>
                          <div style={{fontFamily:"'Oswald',sans-serif",fontSize:12,fontWeight:700,color:"#F59E0B",letterSpacing:1,marginBottom:8,borderBottom:"1px solid rgba(245,158,11,0.2)",paddingBottom:6}}>{sec.heading}</div>
                          <p style={{margin:0,fontSize:13,color:"#D1D5DB",lineHeight:1.8,whiteSpace:"pre-line"}}>{sec.body}</p>
                        </div>
                      ))}
                      {/* Cluck verdict */}
                      <div style={{background:"rgba(217,119,6,0.06)",border:"1px solid rgba(217,119,6,0.2)",borderRadius:10,padding:"12px 14px",marginTop:8}}>
                        <div style={{fontFamily:"'Oswald',sans-serif",fontSize:9,color:"#D97706",letterSpacing:2,marginBottom:6}}>🐔 CLUCK'S VERDICT</div>
                        <p style={{margin:0,fontFamily:"Georgia,serif",fontStyle:"italic",color:"#FCD34D",fontSize:12,lineHeight:1.7}}>{topic.cluckVerdict}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* LIQUIDITY TAB */}
      {tab==="liquidity" && (
        <div>
          <div style={{background:"rgba(6,182,212,0.08)",border:"1px solid rgba(6,182,212,0.2)",borderRadius:10,padding:"12px 14px",marginBottom:16}}>
            <p style={{fontFamily:"'Oswald',sans-serif",fontSize:11,color:"#06B6D4",letterSpacing:1,margin:0,lineHeight:1.7}}>
              🌊 LIQUIDITY IS OUR SPECIALTY — This section goes deeper than any lesson. Study at your own pace, no exam required.
            </p>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {LIBRARY_LIQUIDITY.map(item=>(
              <div key={item.id} style={{background:"rgba(255,255,255,0.03)",border:`1px solid ${expanded===item.id?"rgba(6,182,212,0.4)":"rgba(255,255,255,0.07)"}`,borderRadius:10,overflow:"hidden"}}>
                <button onClick={()=>setExpanded(expanded===item.id?null:item.id)} style={{width:"100%",background:"none",border:"none",padding:"14px 16px",cursor:"pointer",textAlign:"left",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <span style={{fontSize:20}}>{item.icon}</span>
                    <div>
                      <div style={{fontFamily:"'Oswald',sans-serif",fontSize:14,fontWeight:700,color:"#F9FAFB"}}>{item.title}</div>
                      <div style={{fontFamily:"'Oswald',sans-serif",fontSize:10,color:"#6B7280",marginTop:2}}>{item.summary}</div>
                    </div>
                  </div>
                  <span style={{color:"#06B6D4",fontSize:16,flexShrink:0,marginLeft:8}}>{expanded===item.id?"▲":"▼"}</span>
                </button>
                {expanded===item.id && (
                  <div style={{padding:"0 16px 16px"}}>
                    <div style={{height:1,background:"rgba(6,182,212,0.2)",marginBottom:14}}/>
                    {item.content.split("\n\n").map((para,i)=>(
                      <p key={i} style={{fontSize:13,color:para===para.toUpperCase()&&para.length<50?"#06B6D4":"#9CA3AF",lineHeight:1.8,margin:"0 0 12px",fontFamily:para===para.toUpperCase()&&para.length<50?"'Oswald',sans-serif":"inherit",letterSpacing:para===para.toUpperCase()&&para.length<50?1:0,fontWeight:para===para.toUpperCase()&&para.length<50?700:"normal"}}>{para}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* GLOSSARY TAB */}
      {tab==="glossary" && (
        <div>
          <input
            value={search}
            onChange={e=>setSearch(e.target.value)}
            placeholder="🔍 Search terms..."
            style={{width:"100%",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,padding:"10px 14px",color:"#F9FAFB",fontFamily:"'Oswald',sans-serif",fontSize:12,letterSpacing:1,marginBottom:14,boxSizing:"border-box",outline:"none"}}
          />
          <div style={{fontFamily:"'Oswald',sans-serif",fontSize:9,color:"#4B5563",letterSpacing:1,marginBottom:10}}>{filteredGlossary.length} TERMS</div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {filteredGlossary.map(g=>(
              <div key={g.term} style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(167,139,250,0.15)",borderRadius:10,padding:"12px 14px"}}>
                <div style={{fontFamily:"'Oswald',sans-serif",fontSize:13,fontWeight:700,color:"#A78BFA",marginBottom:4}}>{g.term}</div>
                <div style={{fontSize:12,color:"#9CA3AF",lineHeight:1.6}}>{g.def}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RESOURCES TAB */}
      {tab==="resources" && (
        <div style={{display:"flex",flexDirection:"column",gap:20}}>
          {LIBRARY_RESOURCES.map(cat=>(
            <div key={cat.category}>
              <div style={{fontFamily:"'Oswald',sans-serif",fontSize:11,letterSpacing:2,color:"#D97706",marginBottom:10}}>{cat.category}</div>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {cat.links.map(link=>(
                  <a key={link.name} href={link.url} target="_blank" rel="noreferrer" style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:10,padding:"12px 14px",textDecoration:"none"}}>
                    <div>
                      <div style={{fontFamily:"'Oswald',sans-serif",fontSize:13,fontWeight:700,color:"#F9FAFB",marginBottom:2}}>{link.name}</div>
                      <div style={{fontSize:11,color:"#6B7280"}}>{link.desc}</div>
                    </div>
                    <span style={{color:"#D97706",fontSize:12,flexShrink:0,marginLeft:8}}>→</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── FLOCK TALK ──
const FLOCK_ENTRIES = [
  {
    id: "krypton",
    type: "VIDEO",
    status: "live",
    title: "Krypton Calls",
    description: "Krypton Calls covers CLKN and the School of Crypto Hard Knocks — breaking down the project, the app, and what makes it different.",
    date: "April 2, 2026",
    youtube: "https://youtu.be/Zv1VJETGc20",
    channel: "https://www.youtube.com/@KryptonCalls",
    twitter: "https://x.com/KryptonCalls",
    color: "#A78BFA",
    icon: "📺",
  },
  {
    id: "luxxlounge",
    type: "LIVE STREAM",
    status: "upcoming",
    title: "The Luxurious Lounge",
    description: "Cluck Norris steps into The Luxurious Lounge for a live stream appearance. Tune in live on April 9th.",
    date: "April 9, 2026",
    youtube: "https://www.youtube.com/live/t2xyjn4TmIc",
    twitter: "https://x.com/TheLuxxLounge",
    color: "#FCD34D",
    icon: "🎙️",
  },
  {
    id: "moonordust",
    type: "COMMUNITY",
    status: "featured",
    title: "CryptoTrend.ing / Moon or Dust",
    description: "A community and media group we believe in. CryptoTrend.ing is a crypto trending platform and Moon or Dust is their game show. Big supporters of the flock.",
    date: "Ongoing",
    website: "https://cryptotrend.ing",
    website2: "https://moonordust.media",
    telegram: "https://t.me/MoonOrDustGameShow",
    youtube: "https://www.youtube.com/@MoonOrDustMedia",
    color: "#10B981",
    icon: "🤝",
  },
];

function FlockTalk() {
  return (
    <div style={{padding:"0 16px 40px",maxWidth:520,margin:"0 auto"}}>
      {/* Header */}
      <div style={{textAlign:"center",marginBottom:28}}>
        <div style={{fontSize:40,marginBottom:8}}>🎙️</div>
        <h2 style={{fontFamily:"'Oswald',sans-serif",fontSize:30,fontWeight:900,color:"#F9FAFB",margin:"0 0 6px",letterSpacing:2}}>FLOCK TALK</h2>
        <p style={{fontFamily:"'Oswald',sans-serif",fontSize:11,color:"#6B7280",letterSpacing:3,margin:0}}>WHERE THE CLUCKS GET LOUD</p>
        <div style={{marginTop:10,height:1,background:"linear-gradient(90deg,transparent,rgba(217,119,6,0.5),transparent)"}}/>
      </div>

      {/* Entries */}
      <div style={{display:"flex",flexDirection:"column",gap:16}}>
        {FLOCK_ENTRIES.map(entry=>(
          <div key={entry.id} style={{background:"rgba(255,255,255,0.03)",border:`1px solid ${entry.color}40`,borderRadius:14,padding:18,position:"relative",overflow:"hidden"}}>
            {/* Glow accent */}
            <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,transparent,${entry.color},transparent)`}}/>

            {/* Status badge */}
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <span style={{fontSize:18}}>{entry.icon}</span>
                <span style={{fontFamily:"'Oswald',sans-serif",fontSize:9,letterSpacing:2,color:entry.color,background:`${entry.color}15`,padding:"2px 8px",borderRadius:20,border:`1px solid ${entry.color}40`}}>
                  {entry.type}
                </span>
              </div>
              <span style={{fontFamily:"'Oswald',sans-serif",fontSize:9,letterSpacing:1,color:
                entry.status==="upcoming"?"#FCD34D":
                entry.status==="live"?"#10B981":"#9CA3AF",
                background:entry.status==="upcoming"?"rgba(252,211,77,0.1)":entry.status==="live"?"rgba(16,185,129,0.1)":"rgba(255,255,255,0.05)",
                padding:"2px 8px",borderRadius:20,border:`1px solid ${entry.status==="upcoming"?"rgba(252,211,77,0.3)":entry.status==="live"?"rgba(16,185,129,0.3)":"rgba(255,255,255,0.1)"}`
              }}>
                {entry.status==="upcoming"?"⏰ UPCOMING":entry.status==="live"?"✅ LIVE":"⭐ FEATURED"}
              </span>
            </div>

            {/* Title & date */}
            <div style={{fontFamily:"'Oswald',sans-serif",fontSize:20,fontWeight:700,color:"#F9FAFB",marginBottom:4}}>{entry.title}</div>
            <div style={{fontFamily:"'Oswald',sans-serif",fontSize:10,color:"#6B7280",letterSpacing:1,marginBottom:10}}>{entry.date}</div>

            {/* Description */}
            <p style={{fontSize:13,color:"#9CA3AF",lineHeight:1.7,margin:"0 0 14px"}}>{entry.description}</p>

            {/* Links */}
            <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
              {entry.youtube && (
                <a href={entry.youtube} target="_blank" rel="noreferrer" style={{display:"flex",alignItems:"center",gap:5,background:"rgba(239,68,68,0.12)",border:"1px solid rgba(239,68,68,0.3)",borderRadius:8,padding:"6px 12px",textDecoration:"none",fontFamily:"'Oswald',sans-serif",fontSize:10,color:"#EF4444",letterSpacing:1}}>
                  ▶ {entry.status==="upcoming"?"WATCH LIVE":"WATCH NOW"}
                </a>
              )}
              {entry.channel && (
                <a href={entry.channel} target="_blank" rel="noreferrer" style={{display:"flex",alignItems:"center",gap:5,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,padding:"6px 12px",textDecoration:"none",fontFamily:"'Oswald',sans-serif",fontSize:10,color:"#9CA3AF",letterSpacing:1}}>
                  📺 CHANNEL
                </a>
              )}
              {entry.twitter && (
                <a href={entry.twitter} target="_blank" rel="noreferrer" style={{display:"flex",alignItems:"center",gap:5,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,padding:"6px 12px",textDecoration:"none",fontFamily:"'Oswald',sans-serif",fontSize:10,color:"#9CA3AF",letterSpacing:1}}>
                  𝕏 FOLLOW
                </a>
              )}
              {entry.website && (
                <a href={entry.website} target="_blank" rel="noreferrer" style={{display:"flex",alignItems:"center",gap:5,background:"rgba(16,185,129,0.1)",border:"1px solid rgba(16,185,129,0.3)",borderRadius:8,padding:"6px 12px",textDecoration:"none",fontFamily:"'Oswald',sans-serif",fontSize:10,color:"#10B981",letterSpacing:1}}>
                  🌐 CRYPTOTREND.ING
                </a>
              )}
              {entry.website2 && (
                <a href={entry.website2} target="_blank" rel="noreferrer" style={{display:"flex",alignItems:"center",gap:5,background:"rgba(16,185,129,0.1)",border:"1px solid rgba(16,185,129,0.3)",borderRadius:8,padding:"6px 12px",textDecoration:"none",fontFamily:"'Oswald',sans-serif",fontSize:10,color:"#10B981",letterSpacing:1}}>
                  🌐 MOONORDUST.MEDIA
                </a>
              )}
              {entry.telegram && (
                <a href={entry.telegram} target="_blank" rel="noreferrer" style={{display:"flex",alignItems:"center",gap:5,background:"rgba(96,165,250,0.1)",border:"1px solid rgba(96,165,250,0.3)",borderRadius:8,padding:"6px 12px",textDecoration:"none",fontFamily:"'Oswald',sans-serif",fontSize:10,color:"#60A5FA",letterSpacing:1}}>
                  ✈️ TELEGRAM
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div style={{marginTop:24,textAlign:"center"}}>
        <p style={{fontFamily:"'Oswald',sans-serif",fontSize:10,color:"#4B5563",letterSpacing:1,lineHeight:1.8}}>
          IF YOU'VE REPPED THE FLOCK, WE SEE YOU. 🐔<br/>
          MORE APPEARANCES DROPPING SOON.
        </p>
      </div>
    </div>
  );
}

// ── BAGS PAGE ──
function BagsPage() {
  const [feed, setFeed] = useState(null);
  const [feedPrices, setFeedPrices] = useState({});
  const [feedLastUpdated, setFeedLastUpdated] = useState(null);
  const [feedRefreshing, setFeedRefreshing] = useState(false);
  const [partnerStats, setPartnerStats] = useState(null);
  const [feedLoading, setFeedLoading] = useState(true);
  const [pageError, setPageError] = useState(null);

  async function fetchFeed() {
    setFeedRefreshing(true);
    try {
      const res = await fetch("/api/bags-proxy?endpoint=token-launch/feed");
      const data = await res.json();
      if (data.success && data.response) {
        const tokens = data.response.slice(0, 12);
        setFeed(tokens);
        tokens.forEach(async (p) => {
          try {
            const dexRes = await fetch(`https://api.dexscreener.com/token-pairs/v1/solana/${p.tokenMint}`);
            const dexData = await dexRes.json();
            if (dexData && dexData.length > 0) {
              const pair = dexData.sort((a,b) => (b.liquidity?.usd||0) - (a.liquidity?.usd||0))[0];
              setFeedPrices(prev => ({
                ...prev,
                [p.tokenMint]: {
                  priceUsd: pair.priceUsd,
                  marketCap: pair.marketCap,
                  change24h: pair.priceChange?.h24,
                }
              }));
            }
          } catch(e) {}
        });
      }
    } catch(e) {} finally { setFeedLoading(false); setFeedRefreshing(false); setFeedLastUpdated(new Date()); }
  }

  async function fetchPartner() {
    try {
      const res = await fetch("/api/partner-stats");
      const text = await res.text();
      try {
        const data = JSON.parse(text);
        if (data.success && data.response) setPartnerStats(data.response);
      } catch(e) {}
    } catch(e) {}
  }

  useEffect(() => {
    fetchFeed();
    fetchPartner();
    const feedInterval = setInterval(fetchFeed, 60000);
    return () => clearInterval(feedInterval);
  }, []);

  const fmtNum = (n, dec=2) => n ? parseFloat(n).toLocaleString(undefined,{maximumFractionDigits:dec}) : "—";

  if (pageError) return (
    <div style={{padding:40,textAlign:"center",color:"#EF4444",fontFamily:"'Oswald',sans-serif"}}>
      PAGE ERROR: {pageError}
    </div>
  );

  return (
    <div style={{padding:"0 16px 40px", maxWidth:520, margin:"0 auto"}}>
      {/* Hero */}
      <div style={{textAlign:"center", marginBottom:24}}>
        <div style={{fontFamily:"'Oswald',sans-serif",fontSize:10,letterSpacing:4,color:"#D97706",marginBottom:4}}>POWERED BY</div>
        <h2 style={{fontFamily:"'Oswald',sans-serif",fontSize:32,fontWeight:900,color:"#F9FAFB",margin:"0 0 8px",letterSpacing:2}}>BAGS.FM</h2>
        <p style={{color:"#9CA3AF",fontSize:14,lineHeight:1.7,margin:"0 0 16px"}}>
          Bags.fm is Solana's premier token launch platform — built for creators, traders, and communities. Launch a token, earn fees forever, and graduate to Meteora liquidity automatically.
        </p>
      </div>

      {/* Partner Stats */}
      {partnerStats && (
        <div style={{background:"rgba(217,119,6,0.08)",border:"1px solid rgba(217,119,6,0.3)",borderRadius:12,padding:16,marginBottom:16}}>
          <div style={{fontFamily:"'Oswald',sans-serif",fontSize:9,letterSpacing:3,color:"#D97706",marginBottom:12}}>🤝 FIRECHICKEN007 PARTNER STATS</div>
          <div style={{display:"flex",gap:8}}>
            {[
              {label:"VOLUME",value:partnerStats.totalVolumeSol ? fmtNum(partnerStats.totalVolumeSol,2)+" SOL" : "—",color:"#FCD34D"},
              {label:"EARNED",value:partnerStats.totalEarnedSol ? fmtNum(partnerStats.totalEarnedSol,4)+" SOL" : "—",color:"#10B981"},
              {label:"TRADES",value:partnerStats.totalTrades ? partnerStats.totalTrades.toLocaleString() : "—",color:"#8B5CF6"},
            ].map(s=>(
              <div key={s.label} style={{flex:1,background:"rgba(255,255,255,0.04)",borderRadius:8,padding:"10px 6px",textAlign:"center"}}>
                <div style={{fontFamily:"'Oswald',sans-serif",fontSize:8,letterSpacing:1,color:"#6B7280",marginBottom:4}}>{s.label}</div>
                <div style={{fontFamily:"'Oswald',sans-serif",fontSize:13,fontWeight:700,color:s.color}}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* What is Bags */}
      <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:16,marginBottom:16}}>
        <div style={{fontFamily:"'Oswald',sans-serif",fontSize:9,letterSpacing:3,color:"#D97706",marginBottom:12}}>🎒 WHAT IS BAGS.FM?</div>
        {[
          {icon:"🚀",title:"Launch Any Token",desc:"Create and launch a token in minutes. No code required. Just a name, symbol, and image."},
          {icon:"💰",title:"Earn Fees Forever",desc:"Token creators earn 1% of all trading volume on their token — forever. Add collaborators to your fee split."},
          {icon:"📈",title:"Dynamic Bonding Curve",desc:"Tokens launch on a bonding curve and automatically graduate to a Meteora DAMM V2 liquidity pool when they hit the graduation threshold."},
          {icon:"🤝",title:"Partner Ref Program",desc:"Earn 25% of platform fees when users trade through your referral link. The firechicken007 ref code powers this app."},
          {icon:"🔑",title:"Developer API",desc:"Full REST API for pools, trading, analytics, and more. Build apps on top of Bags.fm with your own API key."},
        ].map(f=>(
          <div key={f.title} style={{display:"flex",gap:12,marginBottom:14,alignItems:"flex-start"}}>
            <div style={{fontSize:20,flexShrink:0}}>{f.icon}</div>
            <div>
              <div style={{fontFamily:"'Oswald',sans-serif",fontSize:13,fontWeight:700,color:"#F9FAFB",marginBottom:2}}>{f.title}</div>
              <div style={{fontSize:12,color:"#9CA3AF",lineHeight:1.6}}>{f.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Buttons */}
      <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:16}}>
        <a href={BAGS_SIGNUP} target="_blank" rel="noreferrer" style={{display:"block",background:"linear-gradient(135deg,#D97706,#EF4444)",borderRadius:10,padding:"14px",fontFamily:"'Oswald',sans-serif",fontSize:15,fontWeight:700,color:"#fff",letterSpacing:3,textDecoration:"none",textAlign:"center",boxShadow:"0 0 28px rgba(217,119,6,0.4)"}}>
          🎒 SIGN UP ON BAGS.FM
        </a>
        <div style={{display:"flex",gap:10}}>
          <a href={BAGS_APP_IOS} target="_blank" rel="noreferrer" style={{flex:1,display:"block",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:10,padding:"12px",fontFamily:"'Oswald',sans-serif",fontSize:12,fontWeight:700,color:"#F9FAFB",letterSpacing:2,textDecoration:"none",textAlign:"center"}}>
            🍎 IOS APP
          </a>
          <a href={BAGS_APP_ANDROID} target="_blank" rel="noreferrer" style={{flex:1,display:"block",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:10,padding:"12px",fontFamily:"'Oswald',sans-serif",fontSize:12,fontWeight:700,color:"#F9FAFB",letterSpacing:2,textDecoration:"none",textAlign:"center"}}>
            🤖 ANDROID
          </a>
        </div>
        <a href={BAGS_DEV} target="_blank" rel="noreferrer" style={{display:"block",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"12px",fontFamily:"'Oswald',sans-serif",fontSize:12,fontWeight:700,color:"#6B7280",letterSpacing:2,textDecoration:"none",textAlign:"center"}}>
          🔑 GET API ACCESS → DEV.BAGS.FM
        </a>
      </div>

      {/* Recent Launches Feed */}
      <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:16}}>
        <div style={{marginBottom:14}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
            <div style={{fontFamily:"'Oswald',sans-serif",fontSize:16,fontWeight:700,letterSpacing:2,color:"#F9FAFB"}}>📡 RECENT BAGS.FM LAUNCHES</div>
            <button onClick={fetchFeed} style={{background:"rgba(217,119,6,0.15)",border:"1px solid rgba(217,119,6,0.3)",borderRadius:8,color:"#D97706",fontFamily:"'Oswald',sans-serif",fontSize:18,cursor:"pointer",padding:"4px 12px",lineHeight:1}}>
              {feedRefreshing ? "..." : "↻"}
            </button>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{fontFamily:"'Oswald',sans-serif",fontSize:10,color:"#6B7280",letterSpacing:1}}>Sorted by market cap • Auto-refreshes every 60s</div>
            {feedLastUpdated && (
              <span style={{fontFamily:"'Oswald',sans-serif",fontSize:9,color:"#4B5563",letterSpacing:1}}>
                {feedLastUpdated.toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>
        {feedLoading ? (
          <div style={{height:80,background:"rgba(255,255,255,0.03)",borderRadius:8,animation:"pulse 1.5s infinite",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <span style={{fontFamily:"'Oswald',sans-serif",fontSize:10,color:"#6B7280",letterSpacing:2}}>LOADING FEED...</span>
          </div>
        ) : feed && feed.length > 0 ? (
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {feed.map((p,i)=>(
              <a key={i} href={`https://bags.fm/${p.tokenMint}?ref=firechicken007`} target="_blank" rel="noreferrer" style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:"rgba(255,255,255,0.04)",borderRadius:10,padding:"14px 16px",textDecoration:"none",border:"1px solid rgba(255,255,255,0.07)",width:"100%",boxSizing:"border-box"}}>
                <div style={{display:"flex",alignItems:"center",gap:14,flex:1,minWidth:0}}>
                  {p.image && <img src={p.image} alt={p.name} style={{width:52,height:52,borderRadius:"50%",objectFit:"cover",flexShrink:0}} onError={e=>e.target.style.display="none"}/>}
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontFamily:"'Oswald',sans-serif",fontSize:20,fontWeight:700,color:"#F9FAFB",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>
                      {p.name} <span style={{color:"#6B7280",fontSize:15}}>({p.symbol})</span>
                    </div>
                    <div style={{display:"flex",gap:10,alignItems:"center",marginTop:5,flexWrap:"wrap"}}>
                      {(() => {
                        const mc = feedPrices[p.tokenMint]?.marketCap || 0;
                        let label, color;
                        if (p.status==="MIGRATED") { label="🎓 GRADUATED"; color="#10B981"; }
                        else if (p.status==="MIGRATING") { label="⏳ MIGRATING"; color="#F59E0B"; }
                        else if (mc >= 30000) { label="⚡ NEAR GRAD"; color="#D97706"; }
                        else if (mc >= 5000) { label="🔥 GAINING"; color="#F97316"; }
                        else { label="📈 EARLY"; color="#6B7280"; }
                        return <div style={{fontFamily:"'Oswald',sans-serif",fontSize:12,letterSpacing:1,color}}>{label}</div>;
                      })()}
                      {feedPrices[p.tokenMint]?.priceUsd && (
                        <div style={{fontFamily:"monospace",fontSize:13,color:"#FCD34D"}}>
                          ${parseFloat(feedPrices[p.tokenMint].priceUsd).toFixed(6)}
                        </div>
                      )}
                      {feedPrices[p.tokenMint]?.marketCap && (
                        <div style={{fontFamily:"'Oswald',sans-serif",fontSize:12,color:"#8B5CF6"}}>
                          MC ${parseInt(feedPrices[p.tokenMint].marketCap).toLocaleString()}
                        </div>
                      )}
                      {feedPrices[p.tokenMint]?.change24h !== undefined && (
                        <div style={{fontFamily:"'Oswald',sans-serif",fontSize:12,fontWeight:700,color:feedPrices[p.tokenMint].change24h>0?"#10B981":"#EF4444"}}>
                          {feedPrices[p.tokenMint].change24h>0?"+":""}{parseFloat(feedPrices[p.tokenMint].change24h).toFixed(1)}%
                        </div>
                      )}

                    </div>
                  </div>
                </div>
                <div style={{fontFamily:"'Oswald',sans-serif",fontSize:13,color:"#D97706",letterSpacing:1,flexShrink:0,marginLeft:10}}>TRADE →</div>
              </a>
            ))}
          </div>
        ) : (
          <div style={{textAlign:"center",padding:"20px 0",fontFamily:"'Oswald',sans-serif",fontSize:10,color:"#4B5563",letterSpacing:2}}>NO FEED DATA</div>
        )}
        <div style={{marginTop:10,textAlign:"center"}}>
          <a href="https://bags.fm?ref=firechicken007" target="_blank" rel="noreferrer" style={{fontFamily:"'Oswald',sans-serif",fontSize:9,color:"#D97706",letterSpacing:2,textDecoration:"none"}}>VIEW ALL ON BAGS.FM →</a>
        </div>
      </div>
    </div>
  );
}

// ── APP ICON SVG (School of Crypto Hard Knocks) ──

function CLKNTicker() {

  return (
    <div style={{
      display:"flex", alignItems:"center", gap:6,
      background:"rgba(217,119,6,0.1)", border:"1px solid rgba(217,119,6,0.3)",
      borderRadius:20, padding:"3px 10px", cursor:"pointer",
    }}>
      <div style={{width:5,height:5,borderRadius:"50%",background:"#10B981",animation:"pulse 2s infinite"}}/>
      <span style={{fontFamily:"'Oswald',sans-serif",fontSize:9,color:"#D97706",letterSpacing:1}}>CLKN</span>
      <span style={{fontFamily:"'Oswald',sans-serif",fontSize:9,color:"#FCD34D",letterSpacing:1}}>LIVE</span>
    </div>
  );
}

function CLKNWidget() {
  const [pool, setPool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [solAmount, setSolAmount] = useState("1");
  const [quote, setQuote] = useState(null);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [quoteError, setQuoteError] = useState(null);
  const [slippage, setSlippage] = useState(1);
  const [apiStatus, setApiStatus] = useState("connecting");
  const [meteoraPool, setMeteorPool] = useState(null);
  const [dexData, setDexData] = useState(null);
  const [holderCount, setHolderCount] = useState(null);
  const [fees, setFees] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null);

  const isGraduated = pool && pool.dammV2PoolKey;

  async function fetchMeteora(dammKey) {
    try {
      // Try Meteora datapi
      const res = await fetch(`https://damm-v2.datapi.meteora.ag/pools?address=${dammKey}`);
      const data = await res.json();
      if (data && data.data && data.data.length > 0) {
        setMeteorPool(data.data[0]);
        return;
      }
      // Fallback — try pool directly
      const res2 = await fetch(`https://damm-v2.datapi.meteora.ag/pool/${dammKey}`);
      const data2 = await res2.json();
      if (data2) setMeteorPool(data2);
    } catch (e) {
      console.log("Meteora fetch error:", e.message);
    }
  }

  async function fetchDex() {
    try {
      const res = await fetch(`https://api.dexscreener.com/token-pairs/v1/solana/${CLKN_MINT}`);
      const data = await res.json();
      if (data && data.length > 0) {
        // Find the most liquid pair
        const pair = data.sort((a,b) => (b.liquidity?.usd||0) - (a.liquidity?.usd||0))[0];
        setDexData(pair);
      }
    } catch (e) {}
  }

  async function fetchHelius() {
    try {
      const holdersRes = await fetch(`/api/holders?mint=${CLKN_MINT}`);
      const holdersData = await holdersRes.json();
      if (holdersData.success) setHolderCount(holdersData.holderCount);
    } catch (e) { console.log("Holders error:", e.message); }
    try {
      const feesRes = await fetch(`/api/fees`);
      const feesData = await feesRes.json();
      if (feesData.success) setFees(feesData.response);
    } catch (e) { console.log("Fees error:", e.message); }
  }

  async function fetchData() {
    try {
      setLoading(true);
      setApiStatus("connecting");
      const [poolRes] = await Promise.all([
        fetch(`/api/bags-proxy?endpoint=solana/bags/pools/token-mint&tokenMint=${CLKN_MINT}`),
      ]);
      const [poolData] = await Promise.all([poolRes.json()]);
      if (poolData.success) {
        setPool(poolData.response);
        if (poolData.response.dammV2PoolKey) {
          fetchMeteora(poolData.response.dammV2PoolKey);
        }
      }
      fetchDex();
      fetchHelius();
      setLastUpdated(new Date());
      setDebugInfo({
        pool: JSON.stringify(poolData).slice(0, 200),
      });
      setApiStatus("ok");
    } catch (e) {
      setApiStatus("error");
      setDebugInfo({ error: e.message });
    }
    finally { setLoading(false); }
  }

  async function fetchQuote(sol) {
    const num = parseFloat(sol);
    if (!num || num <= 0) { setQuote(null); return; }
    try {
      setQuoteLoading(true);
      setQuoteError(null);
      const lamports = Math.floor(num * LAMPORTS_PER_SOL);
      const slippageBps = Math.round(slippage * 100);
      const url = `https://lite-api.jup.ag/swap/v1/quote?inputMint=${SOL_MINT}&outputMint=${CLKN_MINT}&amount=${lamports}&slippageBps=${slippageBps}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.outAmount) setQuote(data);
      else setQuoteError("Quote unavailable");
    } catch (e) {
      setQuoteError("Could not fetch quote");
    } finally {
      setQuoteLoading(false);
    }
  }

  useEffect(() => { fetchData(); const i = setInterval(fetchData, 30000); return () => clearInterval(i); }, []);
  useEffect(() => { fetchQuote("1"); const i = setInterval(() => fetchQuote(solAmount), 30000); return () => clearInterval(i); }, []);

  const fmtSol = (n) => n ? parseFloat(n).toLocaleString(undefined,{maximumFractionDigits:3}) + " SOL" : "—";
  const fmtNum = (n, dec=2) => n ? parseFloat(n).toLocaleString(undefined,{maximumFractionDigits:dec}) : "—";
  const shortKey = (k) => k ? `${k.slice(0,6)}...${k.slice(-4)}` : "Not active";

  return (
    <div style={{padding:"0 16px 40px",maxWidth:520,margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{fontFamily:"'Oswald',sans-serif",fontSize:10,letterSpacing:4,color:"#D97706",marginBottom:4}}>LIVE TOKEN DATA</div>
        <h2 style={{fontFamily:"'Oswald',sans-serif",fontSize:26,color:"#F9FAFB",margin:"0 0 8px"}}>CLKN on Bags.fm</h2>
        <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:6,background:apiStatus==="ok"?"rgba(16,185,129,0.1)":apiStatus==="error"?"rgba(239,68,68,0.1)":"rgba(100,100,100,0.1)",border:`1px solid ${apiStatus==="ok"?"#10B981":apiStatus==="error"?"#EF4444":"#555"}`,borderRadius:20,padding:"4px 12px"}}>
            <div style={{width:7,height:7,borderRadius:"50%",background:apiStatus==="ok"?"#10B981":apiStatus==="error"?"#EF4444":"#888",animation:apiStatus==="connecting"?"pulse 1s infinite":"none"}}/>
            <span style={{fontFamily:"'Oswald',sans-serif",fontSize:9,letterSpacing:2,color:apiStatus==="ok"?"#10B981":apiStatus==="error"?"#EF4444":"#888"}}>
              {apiStatus==="ok"?"BAGS API CONNECTED":apiStatus==="error"?"BAGS API ERROR":"CONNECTING..."}
            </span>
          </div>
          <div style={{display:"inline-flex",alignItems:"center",gap:6,background:isGraduated?"rgba(212,175,55,0.1)":"rgba(59,130,246,0.1)",border:`1px solid ${isGraduated?"#D4AF37":"#3B82F6"}`,borderRadius:20,padding:"4px 12px"}}>
            <span style={{fontSize:10}}>{isGraduated?"🎓":"📈"}</span>
            <span style={{fontFamily:"'Oswald',sans-serif",fontSize:9,letterSpacing:2,color:isGraduated?"#D4AF37":"#3B82F6"}}>
              {isGraduated?"GRADUATED — METEORA":"BONDING CURVE"}
            </span>
          </div>
        </div>
      </div>

      {/* Bonding Curve Progress + Market Data — hidden after graduation */}
      {!isGraduated && (
        <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(59,130,246,0.3)",borderRadius:12,padding:16,marginBottom:12,boxShadow:"0 0 20px rgba(59,130,246,0.08)"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <div style={{fontFamily:"'Oswald',sans-serif",fontSize:9,letterSpacing:3,color:"#3B82F6"}}>📈 BONDING CURVE PROGRESS</div>
            <div style={{fontFamily:"'Oswald',sans-serif",fontSize:12,fontWeight:700,color:"#FCD34D"}}>
              {dexData && dexData.marketCap ? `${Math.min(Math.round((dexData.marketCap / 34500) * 100), 99)}%` : "..."}
            </div>
          </div>
          <div style={{height:10,background:"rgba(255,255,255,0.08)",borderRadius:20,overflow:"hidden",marginBottom:10}}>
            <div style={{
              height:"100%",
              width: dexData && dexData.marketCap ? `${Math.min(Math.round((dexData.marketCap / 34500) * 100), 99)}%` : "0%",
              background:"linear-gradient(90deg,#3B82F6,#06B6D4,#FCD34D)",
              borderRadius:20,
              boxShadow:"0 0 10px rgba(6,182,212,0.5)",
              transition:"width 1s ease"
            }}/>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <span style={{fontFamily:"'Oswald',sans-serif",fontSize:8,color:"#6B7280",letterSpacing:1}}>LAUNCH</span>
            <div style={{textAlign:"center"}}>
              <div style={{fontFamily:"'Oswald',sans-serif",fontSize:9,color:"#06B6D4",letterSpacing:1}}>🎓 GRADUATION → METEORA</div>
              <div style={{fontFamily:"'Oswald',sans-serif",fontSize:8,color:"#4B5563",letterSpacing:1,marginTop:2}}>DAMM V2 POOL INCOMING</div>
            </div>
            <span style={{fontFamily:"'Oswald',sans-serif",fontSize:8,color:"#FCD34D",letterSpacing:1}}>100%</span>
          </div>
          {/* Market Stats from DexScreener */}
          {dexData && (
            <div style={{display:"flex",gap:8}}>
              {[
                {label:"PRICE", value: dexData.priceUsd ? `$${parseFloat(dexData.priceUsd).toFixed(8)}` : "—", color:"#FCD34D"},
                {label:"MKT CAP", value: dexData.marketCap ? `$${fmtNum(dexData.marketCap,0)}` : "—", color:"#10B981"},
                {label:"24H VOL", value: dexData.volume?.h24 ? `$${fmtNum(dexData.volume.h24,0)}` : "—", color:"#8B5CF6"},
                {label:"LIQUIDITY", value: dexData.liquidity?.usd ? `$${fmtNum(dexData.liquidity.usd,0)}` : "—", color:"#06B6D4"},
              ].map(s=>(
                <div key={s.label} style={{flex:1,background:"rgba(255,255,255,0.04)",borderRadius:8,padding:"8px 4px",textAlign:"center"}}>
                  <div style={{fontFamily:"'Oswald',sans-serif",fontSize:7,letterSpacing:1,color:"#6B7280",marginBottom:3}}>{s.label}</div>
                  <div style={{fontFamily:"'Oswald',sans-serif",fontSize:11,fontWeight:700,color:s.color}}>{s.value}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Holder Count + Locks — Helius powered */}
      <div style={{display:"flex",gap:8,marginBottom:12}}>
        <div style={{flex:1,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:10,padding:"16px",textAlign:"center"}}>
          <div style={{fontFamily:"'Oswald',sans-serif",fontSize:11,letterSpacing:2,color:"#9CA3AF",marginBottom:6}}>👥 HOLDERS</div>
          <div style={{fontFamily:"'Oswald',sans-serif",fontSize:40,fontWeight:700,color:"#FCD34D",lineHeight:1}}>
            {holderCount !== null ? holderCount.toLocaleString() : "—"}
          </div>
          <div style={{fontFamily:"'Oswald',sans-serif",fontSize:9,color:"#6B7280",letterSpacing:1,marginTop:6}}>VIA HELIUS</div>
        </div>
        <div style={{flex:1,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(217,119,6,0.3)",borderRadius:10,padding:"16px",textAlign:"center"}}>
          <div style={{fontFamily:"'Oswald',sans-serif",fontSize:11,letterSpacing:2,color:"#D97706",marginBottom:6}}>💰 FEES EARNED</div>
          <div style={{fontFamily:"'Oswald',sans-serif",fontSize:28,fontWeight:700,color:"#FCD34D",lineHeight:1}}>
            {fees ? (parseInt(fees) / 1_000_000_000).toFixed(3) : "—"}
          </div>
          <div style={{fontFamily:"'Oswald',sans-serif",fontSize:9,color:"#6B7280",letterSpacing:1,marginTop:4}}>SOL LIFETIME</div>

        </div>
      </div>

      {/* Pool Info — switches between DBC and Meteora */}
      <div style={{background:"rgba(255,255,255,0.03)",border:`1px solid ${isGraduated?"rgba(212,175,55,0.3)":"rgba(255,255,255,0.08)"}`,borderRadius:12,padding:16,marginBottom:12,boxShadow:isGraduated?"0 0 20px rgba(212,175,55,0.1)":"none"}}>
        <div style={{fontFamily:"'Oswald',sans-serif",fontSize:9,letterSpacing:3,color:isGraduated?"#D4AF37":"#D97706",marginBottom:12}}>
          {isGraduated?"🎓 METEORA DAMM V2 POOL":"🏊 DBC POOL DATA"}
        </div>

        {/* DBC Pool — before graduation */}
        {!isGraduated && pool && (
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {[
              {label:"TOKEN MINT",value:shortKey(CLKN_MINT),color:"#06B6D4"},
              {label:"DBC POOL",value:shortKey(pool.dbcPoolKey),color:"#D97706"},
              {label:"DAMM V2",value:"Pending graduation",color:"#6B7280"},
            ].map(r=>(
              <div key={r.label} style={{background:"rgba(255,255,255,0.03)",borderRadius:8,padding:"8px 12px",display:"flex",justifyContent:"space-between"}}>
                <span style={{fontFamily:"'Oswald',sans-serif",fontSize:9,letterSpacing:2,color:"#4B5563"}}>{r.label}</span>
                <span style={{fontFamily:"monospace",fontSize:11,color:r.color}}>{r.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Graduated Pool — uses DexScreener data */}
        {isGraduated && (
          <div>
            {dexData ? (
              <div style={{display:"flex",flexDirection:"column",gap:6}}>
                {(() => {
                  const liqUsd = dexData.liquidity?.usd || 0;
                  const solPriceUsd = dexData.priceUsd && dexData.priceNative ? parseFloat(dexData.priceUsd) / parseFloat(dexData.priceNative) : 150;
                  const solInPool = solPriceUsd > 0 ? (liqUsd / 2) / solPriceUsd : 0;
                  const clknPriceUsd = parseFloat(dexData.priceUsd) || 0;
                  const clknInPool = clknPriceUsd > 0 ? (liqUsd / 2) / clknPriceUsd : 0;
                  return [
                  {label:"POOL ADDRESS",value:shortKey(pool.dammV2PoolKey),color:"#D4AF37"},
                  {label:"PRICE",value:dexData.priceUsd ? `$${parseFloat(dexData.priceUsd).toFixed(8)}` : "—",color:"#FCD34D"},
                  {label:"SOL IN POOL",value:solInPool > 0 ? `${fmtNum(solInPool,2)} SOL` : "—",color:"#06B6D4"},
                  {label:"CLKN IN POOL",value:clknInPool > 0 ? `${fmtNum(clknInPool,0)} CLKN` : "—",color:"#FCD34D"},
                  {label:"TOTAL LIQUIDITY",value:liqUsd ? `$${fmtNum(liqUsd,0)}` : "—",color:"#10B981"},
                  {label:"MARKET CAP",value:dexData.marketCap ? `$${fmtNum(dexData.marketCap,0)}` : "—",color:"#10B981"},
                  {label:"24H VOLUME",value:dexData.volume?.h24 ? `$${fmtNum(dexData.volume.h24,0)}` : "—",color:"#8B5CF6"},
                  {label:"24H CHANGE",value:dexData.priceChange?.h24 ? `${dexData.priceChange.h24 > 0 ? "+" : ""}${parseFloat(dexData.priceChange.h24).toFixed(2)}%` : "—",color:dexData.priceChange?.h24 > 0 ? "#10B981" : "#EF4444"},
                  ];
                })().map(r=>(
                  <div key={r.label} style={{background:"rgba(255,255,255,0.03)",borderRadius:8,padding:"8px 12px",display:"flex",justifyContent:"space-between"}}>
                    <span style={{fontFamily:"'Oswald',sans-serif",fontSize:10,letterSpacing:2,color:"#6B7280"}}>{r.label}</span>
                    <span style={{fontFamily:"monospace",fontSize:13,fontWeight:600,color:r.color}}>{r.value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{height:120,background:"rgba(255,255,255,0.03)",borderRadius:10,animation:"pulse 1.5s infinite",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <span style={{fontFamily:"'Oswald',sans-serif",fontSize:10,color:"#6B7280",letterSpacing:2}}>LOADING POOL DATA...</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Live Quote */}
      <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(217,119,6,0.25)",borderRadius:12,padding:16,marginBottom:12}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <div style={{fontFamily:"'Oswald',sans-serif",fontSize:9,letterSpacing:3,color:"#D97706"}}>💱 LIVE TRADE QUOTE</div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <span style={{fontFamily:"'Oswald',sans-serif",fontSize:8,color:"#6B7280",letterSpacing:1}}>SLIPPAGE</span>
            {[0.5,1,2,5].map(s=>(
              <button key={s} onClick={()=>setSlippage(s)} style={{background:slippage===s?"rgba(217,119,6,0.3)":"rgba(255,255,255,0.05)",border:`1px solid ${slippage===s?"rgba(217,119,6,0.6)":"rgba(255,255,255,0.1)"}`,borderRadius:4,padding:"2px 6px",color:slippage===s?"#D97706":"#6B7280",fontFamily:"'Oswald',sans-serif",fontSize:9,cursor:"pointer"}}>
                {s}%
              </button>
            ))}
          </div>
        </div>
        <div style={{background:"rgba(217,119,6,0.08)",borderRadius:10,padding:"14px 16px",marginBottom:12,textAlign:"center",border:"1px solid rgba(217,119,6,0.2)"}}>
          <div style={{fontFamily:"'Oswald',sans-serif",fontSize:10,color:"#6B7280",letterSpacing:2,marginBottom:6}}>{parseFloat(solAmount)||1} SOL CURRENTLY BUYS</div>
          {quoteLoading && !quote ? (
            <div style={{fontFamily:"'Oswald',sans-serif",fontSize:24,color:"#4B5563"}}>...</div>
          ) : quote ? (
            <div>
              <div style={{fontFamily:"'Oswald',sans-serif",fontSize:28,fontWeight:900,color:"#FCD34D",lineHeight:1}}>
                {parseInt(parseFloat(quote.outAmount) / Math.pow(10, 9)).toLocaleString()} CLKN
              </div>
              <div style={{marginTop:8,display:"flex",justifyContent:"center",gap:16,flexWrap:"wrap"}}>
                {(() => {
                  const SOL_PRICE_USD = dexData?.priceUsd && dexData?.priceNative ? parseFloat(dexData.priceUsd) / parseFloat(dexData.priceNative) : 150;
                  const tradeSizeUsd = parseFloat(solAmount||1) * SOL_PRICE_USD;
                  const liquidity = dexData?.liquidity?.usd || 0;
                  const realImpact = liquidity > 0 ? (tradeSizeUsd / liquidity) * 100 : null;
                  const impactColor = realImpact > 10 ? "#EF4444" : realImpact > 5 ? "#F59E0B" : "#10B981";
                  return (
                    <>
                      {realImpact !== null && (
                        <div style={{fontFamily:"'Oswald',sans-serif",fontSize:9,color:impactColor,letterSpacing:1,fontWeight:700}}>
                          IMPACT: ~{realImpact.toFixed(1)}%
                        </div>
                      )}
                      {quote.otherAmountThreshold && (
                        <div style={{fontFamily:"'Oswald',sans-serif",fontSize:9,color:"#F59E0B",letterSpacing:1}}>
                          MIN: {parseInt(parseFloat(quote.otherAmountThreshold) / Math.pow(10,9)).toLocaleString()} CLKN
                        </div>
                      )}
                      <div style={{fontFamily:"'Oswald',sans-serif",fontSize:9,color:"#6B7280",letterSpacing:1}}>
                        SLIP: {quote.slippageBps ? (quote.slippageBps/100).toFixed(1) : slippage}%
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          ) : quoteError ? (
            <div style={{fontFamily:"'Oswald',sans-serif",fontSize:12,color:"#EF4444"}}>{quoteError}</div>
          ) : null}
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <div style={{position:"relative",flex:1}}>
            <input
              type="number" min="0.001" step="0.1" value={solAmount}
              onChange={e => setSolAmount(e.target.value)}
              placeholder="Enter SOL amount"
              style={{width:"100%",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:8,padding:"10px 40px 10px 14px",color:"#F9FAFB",fontFamily:"'Oswald',sans-serif",fontSize:14,outline:"none",boxSizing:"border-box"}}
            />
            <span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",fontFamily:"'Oswald',sans-serif",fontSize:10,color:"#6B7280"}}>SOL</span>
          </div>
          <button onClick={() => fetchQuote(solAmount)} style={{background:"rgba(217,119,6,0.2)",border:"1px solid rgba(217,119,6,0.4)",borderRadius:8,padding:"10px 16px",color:"#D97706",fontFamily:"'Oswald',sans-serif",fontSize:11,letterSpacing:2,cursor:"pointer",whiteSpace:"nowrap"}}>
            GET QUOTE
          </button>
        </div>
      </div>

      {/* Trade Button */}
      <a href={CLKN_TRADE_LINK} target="_blank" rel="noreferrer" style={{display:"block",width:"100%",background:"linear-gradient(135deg,#D97706,#EF4444)",border:"none",borderRadius:10,padding:"14px",fontFamily:"'Oswald',sans-serif",fontSize:15,fontWeight:700,color:"#fff",letterSpacing:3,textDecoration:"none",textAlign:"center",boxShadow:"0 0 28px rgba(217,119,6,0.5)",marginBottom:8}}>
        🔥 TRADE CLKN ON BAGS.FM
      </a>
      <a href={JUPITER_TRADE_LINK} target="_blank" rel="noreferrer" style={{display:"block",width:"100%",background:"rgba(74,222,128,0.12)",border:"1px solid rgba(74,222,128,0.3)",borderRadius:10,padding:"13px",fontFamily:"'Oswald',sans-serif",fontSize:14,fontWeight:700,color:"#4ADE80",letterSpacing:3,textDecoration:"none",textAlign:"center",marginBottom:10,boxSizing:"border-box"}}>
        ⚡ BUY ON JUPITER
      </a>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"0 4px"}}>
        <span style={{fontFamily:"'Oswald',sans-serif",fontSize:8,color:"#4B5563",letterSpacing:1}}>
          {lastUpdated ? `Updated ${lastUpdated.toLocaleTimeString()}` : ""}
        </span>
        <button onClick={fetchData} style={{background:"none",border:"none",color:"#D97706",fontFamily:"'Oswald',sans-serif",fontSize:8,letterSpacing:2,cursor:"pointer"}}>
          ↻ REFRESH
        </button>
        <span style={{fontFamily:"'Oswald',sans-serif",fontSize:8,color:"#4B5563",letterSpacing:1}}>ref: firechicken007</span>
      </div>
    </div>
  );
}


function AppIcon({size=64}){
  return(
    <svg width={size} height={size} viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1a1a1a"/>
          <stop offset="100%" stopColor="#0a0a0a"/>
        </radialGradient>
        <radialGradient id="fire" cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor="#F97316" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#EF4444" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FCD34D"/>
          <stop offset="100%" stopColor="#D97706"/>
        </linearGradient>
        <linearGradient id="belt" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1F1F1F"/>
          <stop offset="45%" stopColor="#D4AF37"/>
          <stop offset="55%" stopColor="#D4AF37"/>
          <stop offset="100%" stopColor="#1F1F1F"/>
        </linearGradient>
      </defs>
      {/* background circle */}
      <circle cx="60" cy="60" r="58" fill="url(#bg)" stroke="#D97706" strokeWidth="2"/>
      {/* fire glow */}
      <circle cx="60" cy="60" r="50" fill="url(#fire)"/>
      {/* mortarboard hat */}
      <rect x="32" y="44" width="56" height="8" rx="2" fill="url(#gold)"/>
      <polygon points="60,28 88,44 60,44 32,44" fill="#1a1a1a" stroke="#D97706" strokeWidth="1.5"/>
      <polygon points="60,28 88,44 60,44 32,44" fill="#2a2a2a"/>
      <rect x="58" y="28" width="4" height="4" rx="1" fill="url(#gold)"/>
      {/* tassel */}
      <line x1="88" y1="44" x2="92" y2="52" stroke="#D4AF37" strokeWidth="1.5"/>
      <circle cx="92" cy="54" r="3" fill="#D4AF37"/>
      <line x1="92" y1="57" x2="90" y2="63" stroke="#D4AF37" strokeWidth="1"/>
      <line x1="92" y1="57" x2="92" y2="64" stroke="#D4AF37" strokeWidth="1"/>
      <line x1="92" y1="57" x2="94" y2="63" stroke="#D4AF37" strokeWidth="1"/>
      {/* black belt stripe */}
      <rect x="20" y="70" width="80" height="9" rx="4" fill="url(#belt)"/>
      {/* fist left */}
      <ellipse cx="34" cy="75" rx="10" ry="8" fill="#D4AF37" opacity="0.15"/>
      <text x="28" y="79" fontSize="14" fill="#D97706">✊</text>
      {/* fist right */}
      <ellipse cx="86" cy="75" rx="10" ry="8" fill="#D4AF37" opacity="0.15"/>
      <text x="78" y="79" fontSize="14" fill="#D97706">✊</text>
      {/* CLKN text */}
      <text x="60" y="100" textAnchor="middle" fontFamily="'Oswald',sans-serif" fontSize="11" fontWeight="900" fill="url(#gold)" letterSpacing="3">CLKN</text>
      <text x="60" y="112" textAnchor="middle" fontFamily="'Oswald',sans-serif" fontSize="6" fill="#6B7280" letterSpacing="2">SCHOOL</text>
    </svg>
  );
}

function Landing({onStart,onChallenge,onIncubator,completed}){
  const pct=Math.round((completed.length/LESSONS.length)*100);
  return(
    <div style={{textAlign:"center",padding:"0 20px 40px",maxWidth:520,margin:"0 auto"}}>
      {/* logo */}
      <div style={{position:"relative",display:"inline-block",marginBottom:6}}>
        <div style={{position:"absolute",inset:-16,background:"radial-gradient(circle,rgba(217,119,6,.25) 0%,transparent 70%)",borderRadius:"50%"}}/>
        <img src={LOGO_B64} alt="Cluck Norris" style={{width:200,height:200,objectFit:"cover",borderRadius:"50%",border:"3px solid #D97706",position:"relative",zIndex:1,filter:"drop-shadow(0 0 20px rgba(217,119,6,0.6))"}}/>
      </div>
      <div style={{fontFamily:"'Oswald',sans-serif",fontSize:14,letterSpacing:6,color:"#D97706",marginBottom:6}}>SCHOOL OF</div>
      <h1 style={{fontFamily:"'Oswald',sans-serif",fontSize:40,fontWeight:900,margin:"0 0 4px",background:"linear-gradient(135deg,#FCD34D,#F97316,#EF4444)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",textTransform:"uppercase",letterSpacing:1,lineHeight:1}}>Crypto Hard Knocks</h1>
      <div style={{fontFamily:"'Oswald',sans-serif",fontSize:13,color:"#6B7280",letterSpacing:4,marginBottom:20}}>POWERED BY CLKN</div>
      <p style={{color:"#9CA3AF",fontSize:16,lineHeight:1.7,marginBottom:24,fontStyle:"italic"}}>"No participation trophies. No hand-holding. Just hard knocks."</p>
      {completed.length>0&&(
        <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:10,padding:"12px 16px",marginBottom:20}}>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:"#9CA3AF",fontFamily:"'Oswald',sans-serif",letterSpacing:1,marginBottom:6}}><span>TRANSCRIPT</span><span>{completed.length}/{LESSONS.length} CLASSES PASSED</span></div>
          <div style={{height:5,background:"rgba(255,255,255,0.08)",borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",width:`${pct}%`,background:"linear-gradient(90deg,#F97316,#FCD34D)",borderRadius:3}}/></div>
          <div style={{marginTop:8,display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}>
            {LESSONS.map(l=><span key={l.id} style={{fontSize:10,color:completed.includes(l.id)?"#FCD34D":"#4B5563",fontFamily:"'Oswald',sans-serif"}}>{completed.includes(l.id)?"✓":"○"} {l.title.split(" ")[0]}</span>)}
          </div>
        </div>
      )}
      <button onClick={onStart} style={{background:"linear-gradient(135deg,#D97706,#EF4444)",border:"none",borderRadius:10,padding:"14px 44px",fontFamily:"'Oswald',sans-serif",fontSize:16,fontWeight:700,color:"#fff",letterSpacing:3,textTransform:"uppercase",cursor:"pointer",boxShadow:"0 0 28px rgba(217,119,6,0.5)"}}>
        {completed.length===0?"🏫 Start School":"📚 Back to Class"}
      </button>
      <p style={{marginTop:14,fontSize:13,color:"#6B7280",fontFamily:"'Oswald',sans-serif",letterSpacing:2}}>12 CLASSES • 72 EXAMS • NO EXTRA CREDIT</p>
      <div style={{marginTop:16,borderTop:"1px solid rgba(255,255,255,0.06)",paddingTop:16,display:"flex",flexDirection:"column",gap:10}}>
        <button onClick={onIncubator} style={{width:"100%",background:"rgba(96,165,250,0.1)",border:"2px solid rgba(96,165,250,0.4)",borderRadius:10,padding:"14px",fontFamily:"'Oswald',sans-serif",fontSize:16,fontWeight:700,color:"#60A5FA",letterSpacing:3,cursor:"pointer",boxShadow:"0 0 20px rgba(96,165,250,0.2)"}}>
          🥚 CLKN INCUBATOR
        </button>
        <p style={{marginTop:-4,fontSize:11,color:"#4B5563",fontFamily:"'Oswald',sans-serif",letterSpacing:1}}>CRYPTO NEWBIE? START HERE — 6 BEGINNER LESSONS</p>
        <button onClick={onChallenge} style={{width:"100%",background:"rgba(239,68,68,0.12)",border:"2px solid rgba(239,68,68,0.5)",borderRadius:10,padding:"14px",fontFamily:"'Oswald',sans-serif",fontSize:16,fontWeight:700,color:"#EF4444",letterSpacing:3,cursor:"pointer",boxShadow:"0 0 20px rgba(239,68,68,0.3)"}}>
          🥊 ULTIMATE CHALLENGE
        </button>
        <p style={{marginTop:-4,fontSize:11,color:"#4B5563",fontFamily:"'Oswald',sans-serif",letterSpacing:1}}>50 QUESTIONS • NO STUDY GUIDE • 94% TO PASS</p>
      </div>
      <a href={CLKN_TRADE_LINK} target="_blank" rel="noreferrer" style={{
        display:"inline-block",marginTop:16,
        background:"rgba(217,119,6,0.1)",border:"1px solid rgba(217,119,6,0.35)",
        borderRadius:10,padding:"12px 32px",
        fontFamily:"'Oswald',sans-serif",fontSize:13,fontWeight:700,
        color:"#D97706",letterSpacing:3,textDecoration:"none",
        boxShadow:"0 0 16px rgba(217,119,6,0.2)",
      }}>
        🔥 TRADE CLKN ON BAGS.FM
      </a>
      <a href={JUPITER_TRADE_LINK} target="_blank" rel="noreferrer" style={{display:"block",width:"100%",background:"rgba(74,222,128,0.12)",border:"1px solid rgba(74,222,128,0.3)",borderRadius:10,padding:"12px",fontFamily:"'Oswald',sans-serif",fontSize:13,fontWeight:700,color:"#4ADE80",letterSpacing:3,textDecoration:"none",textAlign:"center",marginTop:8,boxSizing:"border-box"}}>
        ⚡ BUY ON JUPITER
      </a>
    </div>
  );
}

function Select({onSelect,completed}){
  return(
    <div style={{padding:"0 16px 40px",maxWidth:520,margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:22}}>
        <img src={LOGO_B64} alt="Cluck Norris" style={{width:80,height:80,objectFit:"cover",borderRadius:"50%",border:"2px solid #D97706",filter:"drop-shadow(0 0 12px rgba(217,119,6,0.5))",marginBottom:8}}/>
        <div style={{fontFamily:"'Oswald',sans-serif",fontSize:10,letterSpacing:4,color:"#D97706",marginBottom:4}}>PICK YOUR POISON</div>
        <h2 style={{fontFamily:"'Oswald',sans-serif",fontSize:26,color:"#F9FAFB",margin:0}}>The Schoolyard</h2>
      </div>
      <div style={{display:"flex",gap:8,marginBottom:16}}>
        <a href={CLKN_TRADE_LINK} target="_blank" rel="noreferrer" style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:6,background:"rgba(217,119,6,0.1)",border:"1px solid rgba(217,119,6,0.3)",borderRadius:10,padding:"10px",textDecoration:"none"}}>
          <span style={{fontFamily:"'Oswald',sans-serif",fontSize:10,color:"#D97706",letterSpacing:1}}>🔥 BAGS.FM</span>
        </a>
        <a href={JUPITER_TRADE_LINK} target="_blank" rel="noreferrer" style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:6,background:"rgba(74,222,128,0.1)",border:"1px solid rgba(74,222,128,0.3)",borderRadius:10,padding:"10px",textDecoration:"none"}}>
          <span style={{fontFamily:"'Oswald',sans-serif",fontSize:10,color:"#4ADE80",letterSpacing:1}}>⚡ JUPITER</span>
        </a>
      </div>
      <div style={{display:"none"}}>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {LESSONS.map((l,i)=>{
          const done=completed.includes(l.id);
          const locked=i>0&&!completed.includes(LESSONS[i-1].id);
          return(
            <button key={l.id} onClick={()=>!locked&&onSelect(l.id)} style={{background:"rgba(255,255,255,0.03)",border:`1px solid ${done?l.color:locked?"rgba(255,255,255,0.05)":"rgba(255,255,255,0.1)"}`,borderRadius:12,padding:"14px 18px",cursor:locked?"not-allowed":"pointer",textAlign:"left",display:"flex",alignItems:"center",gap:14,opacity:locked?0.4:1,boxShadow:done?`0 0 16px ${l.glow}`:"none"}}>
              <div style={{fontSize:24,minWidth:36,textAlign:"center"}}>{done?"✅":locked?"🔒":l.icon}</div>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                  <span style={{fontFamily:"'Oswald',sans-serif",fontSize:15,color:"#F9FAFB",fontWeight:600}}>{l.title}</span>
                  <Belt belt={l.belt} small/>
                </div>
                <div style={{fontSize:11,color:"#6B7280",fontStyle:"italic"}}>"{l.quote.split("…")[0]}…"</div>
              </div>
              {!locked&&<div style={{color:l.color,fontSize:16}}>→</div>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Lesson({lesson:l,onComplete,onBack}){
  const [phase,setPhase]=useState("intro");
  const [qi,setQi]=useState(0);
  const [sel,setSel]=useState(null);
  const [answers,setAnswers]=useState([]);
  const [finalScore,setFinalScore]=useState(0);
  const [showExp,setShowExp]=useState(false);
  const shuffledQuestions = useMemo(() => l.questions.map(shuffleOptions), [l.id]);
  const q=shuffledQuestions[qi];
  function pick(i){if(sel!==null)return;setSel(i);setShowExp(true);}
  function next(){
    const a=[...answers,sel===q.correct];
    setAnswers(a);
    if(qi+1<shuffledQuestions.length){setQi(qi+1);setSel(null);setShowExp(false);}
    else{setFinalScore(a.filter(Boolean).length);setPhase("result");}
  }
  function retry(){setPhase("intro");setQi(0);setSel(null);setAnswers([]);setFinalScore(0);setShowExp(false);}
  const score=phase==="result"?finalScore:answers.filter(Boolean).length;
  const passed=score>=2;

  if(phase==="intro") return(
    <div style={{padding:"0 16px 40px",maxWidth:520,margin:"0 auto"}}>
      <button onClick={onBack} style={{background:"none",border:"none",color:"#6B7280",cursor:"pointer",fontFamily:"'Oswald',sans-serif",fontSize:11,letterSpacing:2,marginBottom:18,padding:0}}>← BACK</button>
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{fontSize:40,marginBottom:6}}>{l.icon}</div>
        <Belt belt={l.belt}/>
        <h2 style={{fontFamily:"'Oswald',sans-serif",fontSize:28,color:"#F9FAFB",margin:"8px 0 4px"}}>{l.title}</h2>
        <p style={{fontFamily:"Georgia,serif",fontStyle:"italic",color:l.color,fontSize:14,margin:0,lineHeight:1.5}}>"{l.quote}"</p>
      </div>
      <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:10,padding:16,marginBottom:16}}>
        <p style={{color:"#D1D5DB",fontSize:14,lineHeight:1.7,margin:0}}>{l.intro}</p>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:24}}>
        {l.concepts.map((c,i)=>(
          <div key={i} style={{background:"rgba(255,255,255,0.02)",borderLeft:`3px solid ${l.color}`,borderRadius:8,padding:"10px 14px"}}>
            <div style={{fontFamily:"'Oswald',sans-serif",fontSize:11,color:l.color,letterSpacing:1,marginBottom:3}}>{c.term}</div>
            <div style={{fontSize:12,color:"#9CA3AF",lineHeight:1.5}}>{c.def}</div>
          </div>
        ))}
      </div>
      <button onClick={()=>setPhase("quiz")} style={{width:"100%",background:l.color,border:"none",borderRadius:10,padding:"14px",fontFamily:"'Oswald',sans-serif",fontSize:15,fontWeight:700,color:"#fff",letterSpacing:3,cursor:"pointer",boxShadow:`0 0 20px ${l.glow}`}}>
        📝 TAKE THE EXAM
      </button>
    </div>
  );

  const shuffledQuestions2 = shuffledQuestions;
  if(phase==="quiz") return(
    <div style={{padding:"0 16px 40px",maxWidth:520,margin:"0 auto"}}>
      <div style={{marginBottom:20}}>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"#6B7280",fontFamily:"'Oswald',sans-serif",letterSpacing:1,marginBottom:5}}>
          <span>{l.title.toUpperCase()}</span><span>EXAM {qi+1} OF {shuffledQuestions.length}</span>
        </div>
        <div style={{height:4,background:"rgba(255,255,255,0.08)",borderRadius:2}}>
          <div style={{height:"100%",width:`${(qi/l.questions.length)*100}%`,background:l.color,borderRadius:2}}/>
        </div>
      </div>
      <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:20,marginBottom:14}}>
        <div style={{fontFamily:"'Oswald',sans-serif",fontSize:10,color:l.color,letterSpacing:2,marginBottom:8}}>EXAM QUESTION {qi+1}</div>
        <p style={{fontFamily:"'Oswald',sans-serif",fontSize:18,color:"#F9FAFB",margin:0,lineHeight:1.4}}>{q.q}</p>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:16}}>
        {q.options.map((opt,i)=>{
          let bg="rgba(255,255,255,0.03)",border="1px solid rgba(255,255,255,0.08)",color="#D1D5DB";
          if(sel!==null){
            if(i===q.correct){bg="rgba(16,185,129,0.15)";border="1px solid #10B981";color="#10B981";}
            else if(i===sel){bg="rgba(239,68,68,0.15)";border="1px solid #EF4444";color="#EF4444";}
          }
          return(<button key={i} onClick={()=>pick(i)} style={{background:bg,border,borderRadius:10,padding:"12px 14px",color,cursor:sel!==null?"default":"pointer",textAlign:"left",fontSize:14,display:"flex",gap:10,alignItems:"center"}}>
            <span style={{fontFamily:"'Oswald',sans-serif",fontSize:11,opacity:0.6,minWidth:18}}>{String.fromCharCode(65+i)}</span>{opt}
          </button>);
        })}
      </div>
      {showExp&&(<>
        <div style={{background:sel===q.correct?"rgba(16,185,129,0.08)":"rgba(239,68,68,0.08)",border:`1px solid ${sel===q.correct?"#10B981":"#EF4444"}`,borderRadius:10,padding:14,marginBottom:12}}>
          <div style={{fontFamily:"'Oswald',sans-serif",fontSize:10,letterSpacing:1,color:sel===q.correct?"#10B981":"#EF4444",marginBottom:5}}>{sel===q.correct?"✓ CORRECT  -  PROFESSOR NORRIS NOTES:":"✗ WRONG  -  PROFESSOR NORRIS CORRECTS YOU:"}</div>
          <p style={{margin:0,color:"#D1D5DB",fontSize:13,lineHeight:1.6}}>{q.explanation}</p>
        </div>
        <AskCluck context={l.title} compact={true}/>
        <button onClick={next} style={{width:"100%",background:l.color,border:"none",borderRadius:10,padding:"13px",fontFamily:"'Oswald',sans-serif",fontSize:14,fontWeight:700,color:"#fff",letterSpacing:2,cursor:"pointer",marginTop:8}}>
          {qi+1<l.questions.length?"NEXT QUESTION →":"SEE REPORT CARD →"}
        </button>
      </>)}
    </div>
  );

  return(
    <div style={{padding:"0 16px 40px",maxWidth:520,margin:"0 auto",textAlign:"center"}}>
      <div style={{fontSize:56,marginBottom:12}}>{passed?"🏆":"💀"}</div>
      <div style={{fontFamily:"'Oswald',sans-serif",fontSize:11,letterSpacing:4,color:passed?"#10B981":"#EF4444",marginBottom:6}}>{passed?"CLASS PASSED":"DETENTION"}</div>
      <h2 style={{fontFamily:"'Oswald',sans-serif",fontSize:30,color:"#F9FAFB",margin:"0 0 8px"}}>{score}/{l.questions.length} Correct</h2>
      <Belt belt={l.belt}/>
      <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:18,margin:"20px 0",textAlign:"left"}}>
        <div style={{fontFamily:"'Oswald',sans-serif",fontSize:10,letterSpacing:2,color:l.color,marginBottom:6}}>PROFESSOR NORRIS REMARKS:</div>
        <p style={{fontFamily:"Georgia,serif",fontStyle:"italic",color:"#D1D5DB",fontSize:15,margin:0,lineHeight:1.6}}>
          {passed?`"${l.quote} Now you know why."`:`"This school has no participation trophies. Hit the books. Try again."`}
        </p>
      </div>
      <div style={{display:"flex",gap:10}}>
        {!passed&&<button onClick={retry} style={{flex:1,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:10,padding:"13px",fontFamily:"'Oswald',sans-serif",fontSize:13,color:"#D1D5DB",cursor:"pointer",letterSpacing:2}}>↩ RETAKE</button>}
        <button onClick={()=>onComplete(l.id,passed)} style={{flex:2,background:passed?`linear-gradient(135deg,${l.color},#D97706)`:"rgba(239,68,68,0.2)",border:"none",borderRadius:10,padding:"13px",fontFamily:"'Oswald',sans-serif",fontSize:13,fontWeight:700,color:"#fff",cursor:"pointer",letterSpacing:2,boxShadow:passed?`0 0 20px ${l.glow}`:"none"}}>
          {passed?"NEXT CLASS →":"BACK TO SCHOOLYARD"}
        </button>
      </div>
    </div>
  );
}

function Complete({onRestart}){
  const [wallet, setWallet] = useState("");
  const [claimed, setClaimed] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const [isHolder, setIsHolder] = useState(false);
  const [holderBalance, setHolderBalance] = useState(0);

  async function claimSpot() {
    if (!wallet || wallet.length < 32) return;
    setClaiming(true);
    try {
      const res = await fetch("/api/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wallet, score: 12, total: 12, pct: 100, source: "GRADUATION" })
      });
      const data = await res.json();
      setClaimed(true);
      setIsHolder(data.isHolder || false);
      setHolderBalance(data.balance || 0);
    } catch(e) {
      setClaimed(true);
    }
    setClaiming(false);
  }

  return(
    <div style={{padding:"0 16px 40px",maxWidth:520,margin:"0 auto",textAlign:"center"}}>
      <div style={{position:"relative",display:"inline-block",marginBottom:12}}>
        <div style={{position:"absolute",inset:-24,background:"radial-gradient(circle,rgba(217,119,6,.4) 0%,transparent 70%)",borderRadius:"50%",animation:"pulse 2s infinite"}}/>
        <img src={LOGO_B64} alt="Cluck Norris" style={{width:150,height:150,objectFit:"cover",borderRadius:"50%",border:"3px solid #D97706",position:"relative",zIndex:1,filter:"drop-shadow(0 0 30px rgba(217,119,6,0.8))"}}/>
      </div>
      <div style={{fontFamily:"'Oswald',sans-serif",fontSize:10,letterSpacing:6,color:"#D97706",marginBottom:6}}>GRADUATED. FEW MAKE IT.</div>
      <h1 style={{fontFamily:"'Oswald',sans-serif",fontSize:34,fontWeight:900,background:"linear-gradient(135deg,#FCD34D,#F97316)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",margin:"0 0 6px"}}>HEADMASTER CERTIFIED</h1>
      <div style={{fontSize:24,margin:"8px 0 16px"}}>🎓📜🏆</div>
      <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(217,119,6,0.3)",borderRadius:12,padding:18,marginBottom:20,boxShadow:"0 0 28px rgba(217,119,6,0.2)"}}>
        <p style={{fontFamily:"Georgia,serif",fontStyle:"italic",color:"#FCD34D",fontSize:16,margin:"0 0 10px",lineHeight:1.5}}>"You graduated from the Hard Knocks. Most dropped out. The blockchain remembers those who stayed."</p>
        <div style={{fontFamily:"'Oswald',sans-serif",fontSize:10,color:"#D97706",letterSpacing:2}}> -  PROFESSOR NORRIS</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:20}}>
        {[["12","CLASSES"],["72","EXAMS"],["0","EXTRA CREDIT"]].map(([n,lb])=>(
          <div key={lb} style={{background:"rgba(255,255,255,0.04)",borderRadius:10,padding:"10px 6px",border:"1px solid rgba(255,255,255,0.07)"}}>
            <div style={{fontFamily:"'Oswald',sans-serif",fontSize:22,color:"#FCD34D"}}>{n}</div>
            <div style={{fontFamily:"'Oswald',sans-serif",fontSize:8,letterSpacing:2,color:"#6B7280"}}>{lb}</div>
          </div>
        ))}
      </div>

      {/* Wallet claim section */}
      <div style={{background:"rgba(212,175,55,0.08)",border:"1px solid rgba(212,175,55,0.3)",borderRadius:12,padding:18,marginBottom:16,textAlign:"left"}}>
        <div style={{textAlign:"center",marginBottom:12}}>
          <div style={{fontSize:28,marginBottom:6}}>🏆</div>
          <div style={{fontFamily:"'Oswald',sans-serif",fontSize:13,fontWeight:700,color:"#D4AF37",letterSpacing:2,marginBottom:4}}>YOU EARNED YOUR SPOT IN THE FLOCK</div>
          <p style={{fontFamily:"'Oswald',sans-serif",fontSize:11,color:"#9CA3AF",margin:0,lineHeight:1.6}}>
            Completing all 12 lessons is no small feat. Submit your Solana wallet to be considered for future CLKN airdrops and exclusive giveaways.
          </p>
        </div>
        {!claimed ? (
          <>
            <input
              value={wallet}
              onChange={e=>setWallet(e.target.value)}
              placeholder="Your Solana wallet address..."
              style={{width:"100%",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(212,175,55,0.3)",borderRadius:8,padding:"10px 12px",color:"#F9FAFB",fontFamily:"monospace",fontSize:11,marginBottom:10,boxSizing:"border-box",outline:"none"}}
            />
            <button onClick={claimSpot} disabled={!wallet||wallet.length<32||claiming} style={{width:"100%",background:wallet&&wallet.length>=32?"linear-gradient(135deg,#D4AF37,#F59E0B)":"rgba(255,255,255,0.05)",border:"none",borderRadius:8,padding:"12px",fontFamily:"'Oswald',sans-serif",fontSize:13,fontWeight:700,color:wallet&&wallet.length>=32?"#111":"#4B5563",letterSpacing:2,cursor:wallet&&wallet.length>=32?"pointer":"default"}}>
              {claiming ? "SUBMITTING..." : "🏆 CLAIM YOUR SPOT"}
            </button>
          </>
        ) : (
          <div style={{textAlign:"center",padding:"8px 0"}}>
            {isHolder ? (
              <div>
                <div style={{fontSize:36,marginBottom:8}}>🐔🔥</div>
                <div style={{fontFamily:"'Oswald',sans-serif",fontSize:15,fontWeight:900,color:"#D4AF37",letterSpacing:2,marginBottom:6}}>YOU'RE ALREADY IN THE FLOCK!</div>
                <div style={{fontFamily:"'Oswald',sans-serif",fontSize:12,color:"#FCD34D",marginBottom:8}}>HOLDING {parseInt(holderBalance).toLocaleString()} CLKN</div>
                <p style={{fontSize:12,color:"#9CA3AF",lineHeight:1.7,margin:0}}>Cluck Norris sees you. You finished the whole curriculum AND you hold CLKN. The flock appreciates you. 🙏</p>
              </div>
            ) : (
              <div>
                <div style={{fontSize:28,marginBottom:6}}>✅</div>
                <div style={{fontFamily:"'Oswald',sans-serif",fontSize:12,color:"#10B981",letterSpacing:2,marginBottom:6}}>WALLET SUBMITTED — YOU'RE IN THE FLOCK</div>
                <p style={{fontSize:11,color:"#6B7280",lineHeight:1.7,margin:0}}>
                  You finished the Hard Knocks but don't hold CLKN yet. Pick some up and become a full member of the flock. 🐔
                </p>
                <div style={{display:"flex",gap:8,marginTop:10,justifyContent:"center"}}>
                  <a href={CLKN_TRADE_LINK} target="_blank" rel="noreferrer" style={{background:"rgba(217,119,6,0.15)",border:"1px solid rgba(217,119,6,0.4)",borderRadius:8,padding:"6px 12px",textDecoration:"none",fontFamily:"'Oswald',sans-serif",fontSize:10,color:"#D97706",letterSpacing:1}}>🔥 BAGS.FM</a>
                  <a href={JUPITER_TRADE_LINK} target="_blank" rel="noreferrer" style={{background:"rgba(74,222,128,0.1)",border:"1px solid rgba(74,222,128,0.3)",borderRadius:8,padding:"6px 12px",textDecoration:"none",fontFamily:"'Oswald',sans-serif",fontSize:10,color:"#4ADE80",letterSpacing:1}}>⚡ JUPITER</a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div style={{display:"flex",gap:10,marginBottom:16}}>
        <a href={CLKN_TRADE_LINK} target="_blank" rel="noreferrer" style={{flex:1,background:"linear-gradient(135deg,#D97706,#EF4444)",borderRadius:10,padding:"13px",fontFamily:"'Oswald',sans-serif",fontSize:13,fontWeight:700,color:"#fff",letterSpacing:2,textDecoration:"none",textAlign:"center",boxShadow:"0 0 20px rgba(217,119,6,0.4)"}}>
          🔥 TRADE CLKN
        </a>
        <button onClick={onRestart} style={{flex:1,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:10,padding:"13px",fontFamily:"'Oswald',sans-serif",fontSize:13,color:"#D1D5DB",cursor:"pointer",letterSpacing:2}}>
          🔄 REPEAT THE YEAR
        </button>
      </div>
    </div>
  );
}

export default function App(){
  const [screen,setScreen]=useState("landing");
  const [lessonId,setLessonId]=useState(null);
  const [completed,setCompleted]=useState(()=>{
    try { const s=localStorage.getItem("clkn_completed"); return s?JSON.parse(s):[]; }
    catch(e){ return []; }
  });
  const lesson=LESSONS.find(l=>l.id===lessonId);

  useEffect(()=>{
    try { localStorage.setItem("clkn_completed",JSON.stringify(completed)); }
    catch(e){}
  },[completed]);

  function finish(id,passed){
    if(passed&&!completed.includes(id)){
      const next=[...completed,id];
      setCompleted(next);
      if(next.length===LESSONS.length){setScreen("complete");return;}
    }
    setScreen("select");
  }

  return(
    <div style={{minHeight:"100vh",background:"#0C0C0C",backgroundImage:"radial-gradient(ellipse at 20% 10%,rgba(217,119,6,.08) 0%,transparent 50%),radial-gradient(ellipse at 80% 90%,rgba(239,68,68,.06) 0%,transparent 50%)",color:"#F9FAFB"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700;900&display=swap');
        @keyframes pulse{0%,100%{opacity:.6;transform:scale(1)}50%{opacity:1;transform:scale(1.05)}}
        *{box-sizing:border-box} button{transition:all .15s ease}
      `}</style>
      {/* Header */}
      {/* Header */}
      <div style={{borderBottom:"1px solid rgba(255,255,255,0.08)",background:"rgba(0,0,0,0.6)",backdropFilter:"blur(10px)",padding:"12px 18px",position:"sticky",top:0,zIndex:100}}>
        {/* Top row */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
          <div onClick={()=>setScreen("landing")} style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}}>
            <AppIcon size={34}/>
            <div>
              <div style={{fontFamily:"'Oswald',sans-serif",fontSize:15,fontWeight:700,letterSpacing:2,color:"#D97706",lineHeight:1}}>CLUCK NORRIS</div>
              <div style={{fontFamily:"'Oswald',sans-serif",fontSize:9,color:"#6B7280",letterSpacing:2,lineHeight:1.4}}>SCHOOL OF CRYPTO HARD KNOCKS</div>
            </div>
          </div>
          <div style={{display:"flex",gap:5}}>
            {LESSONS.map(l=><div key={l.id} style={{width:7,height:7,borderRadius:"50%",background:completed.includes(l.id)?l.color:"rgba(255,255,255,0.1)"}}/>)}
          </div>
        </div>
        {/* Nav tabs — two rows */}
        <div style={{display:"flex",flexDirection:"column",gap:5}}>
          {/* Row 1 — main navigation */}
          <div style={{display:"flex",gap:5}}>
            <button onClick={()=>setScreen("landing")} style={{flex:1,background:screen==="landing"?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.04)",border:`1px solid ${screen==="landing"?"rgba(255,255,255,0.25)":"rgba(255,255,255,0.08)"}`,borderRadius:7,padding:"7px 0",fontFamily:"'Oswald',sans-serif",fontSize:10,fontWeight:700,color:screen==="landing"?"#F9FAFB":"#6B7280",letterSpacing:1,cursor:"pointer"}}>
              🏫 SCHOOL
            </button>
            <button onClick={()=>setScreen("incubator")} style={{flex:1,background:screen==="incubator"?"rgba(96,165,250,0.25)":"rgba(96,165,250,0.06)",border:`1px solid ${screen==="incubator"?"rgba(96,165,250,0.6)":"rgba(96,165,250,0.2)"}`,borderRadius:7,padding:"7px 0",fontFamily:"'Oswald',sans-serif",fontSize:10,fontWeight:700,color:"#60A5FA",letterSpacing:1,cursor:"pointer"}}>
              🥚 INCUBATOR
            </button>
            <button onClick={()=>setScreen("challenge")} style={{flex:1,background:screen==="challenge"?"rgba(239,68,68,0.25)":"rgba(239,68,68,0.06)",border:`1px solid ${screen==="challenge"?"rgba(239,68,68,0.6)":"rgba(239,68,68,0.2)"}`,borderRadius:7,padding:"7px 0",fontFamily:"'Oswald',sans-serif",fontSize:10,fontWeight:700,color:"#EF4444",letterSpacing:1,cursor:"pointer"}}>
              🥊 CHALLENGE
            </button>
            <button onClick={()=>setScreen("library")} style={{flex:1,background:screen==="library"?"rgba(217,119,6,0.25)":"rgba(217,119,6,0.06)",border:`1px solid ${screen==="library"?"rgba(217,119,6,0.6)":"rgba(217,119,6,0.2)"}`,borderRadius:7,padding:"7px 0",fontFamily:"'Oswald',sans-serif",fontSize:10,fontWeight:700,color:"#D97706",letterSpacing:1,cursor:"pointer"}}>
              📚 LIBRARY
            </button>
          </div>
          {/* Row 2 — data */}
          <div style={{display:"flex",gap:5}}>
            <button onClick={()=>setScreen(screen==="clkn"?"landing":"clkn")} style={{flex:1,background:screen==="clkn"?"rgba(217,119,6,0.25)":"rgba(217,119,6,0.08)",border:`1px solid ${screen==="clkn"?"rgba(217,119,6,0.6)":"rgba(217,119,6,0.2)"}`,borderRadius:7,padding:"7px 0",fontFamily:"'Oswald',sans-serif",fontSize:10,fontWeight:700,color:"#D97706",letterSpacing:1,cursor:"pointer"}}>
              📊 TOKEN DATA
            </button>
            <button onClick={()=>setScreen(screen==="bags"?"landing":"bags")} style={{flex:1,background:screen==="bags"?"rgba(255,255,255,0.1)":"rgba(255,255,255,0.04)",border:`1px solid ${screen==="bags"?"rgba(255,255,255,0.2)":"rgba(255,255,255,0.08)"}`,borderRadius:7,padding:"7px 0",fontFamily:"'Oswald',sans-serif",fontSize:10,fontWeight:700,color:"#9CA3AF",letterSpacing:1,cursor:"pointer"}}>
              🎒 BAGS INFO
            </button>
            <button onClick={()=>setScreen(screen==="flock"?"landing":"flock")} style={{flex:1,background:screen==="flock"?"rgba(217,119,6,0.25)":"rgba(217,119,6,0.06)",border:`1px solid ${screen==="flock"?"rgba(252,211,77,0.6)":"rgba(252,211,77,0.2)"}`,borderRadius:7,padding:"7px 0",fontFamily:"'Oswald',sans-serif",fontSize:10,fontWeight:700,color:"#FCD34D",letterSpacing:1,cursor:"pointer"}}>
              🎙️ FLOCK TALK
            </button>
            <button onClick={()=>setScreen(screen==="lplab"?"landing":"lplab")} style={{flex:1,background:screen==="lplab"?"rgba(16,185,129,0.25)":"rgba(16,185,129,0.06)",border:`1px solid ${screen==="lplab"?"rgba(16,185,129,0.6)":"rgba(16,185,129,0.2)"}`,borderRadius:7,padding:"7px 0",fontFamily:"'Oswald',sans-serif",fontSize:10,fontWeight:700,color:"#10B981",letterSpacing:1,cursor:"pointer"}}>
              ⚗️ LP LAB
            </button>
          </div>
        </div>
      </div>
      <div style={{paddingTop:28}}>
        {screen==="landing"&&<Landing onStart={()=>setScreen("select")} onChallenge={()=>setScreen("challenge")} onIncubator={()=>setScreen("incubator")} completed={completed}/>}
        {screen==="challenge"&&<UltimateChallenge onBack={()=>setScreen("landing")}/>}
        {screen==="incubator"&&<Incubator onComplete={()=>setScreen("select")} onBack={()=>setScreen("landing")}/>}
        {screen==="clkn"&&<CLKNWidget/>}
        {screen==="bags"&&<BagsPage/>}
        {screen==="flock"&&<FlockTalk/>}
        {screen==="lplab"&&<LPLab/>}
        {screen==="library"&&<Library/>}
        {screen==="select"&&<Select onSelect={id=>{setLessonId(id);setScreen("lesson");}} completed={completed}/>}
        {screen==="lesson"&&lesson&&<Lesson lesson={lesson} onComplete={finish} onBack={()=>setScreen("select")}/>}
        {screen==="complete"&&<Complete onRestart={()=>{setCompleted([]);setScreen("landing");}}/>}
      </div>
    </div>
  );
}

// ── LP LAB ──
const LP_LESSONS = [
  {
    id: 1,
    title: "What Is Liquidity?",
    icon: "💧",
    tagline: "The foundation. Everything else builds on this.",
    cluckHook: "Before you touch a single LP position, you need to understand what liquidity actually is. Most people skip this. Those people get wrecked. Sit down.",
    sections: [
      {
        heading: "The Basic Concept",
        body: `Liquidity is simply how easily an asset can be bought or sold without dramatically changing its price.

Think of it like water. A deep ocean — you can throw a rock in and barely see a ripple. A shallow puddle — that same rock creates waves that hit every edge.

In crypto, the "water" is the money sitting in a trading pool. More water = more liquidity = less price impact when you trade.

HIGH LIQUIDITY POOL:
• Large trades execute near the quoted price
• Tight bid/ask spread
• Price is stable under normal trading volume

LOW LIQUIDITY POOL:
• Even small trades move the price significantly
• Wide spread
• Vulnerable to price manipulation`
      },
      {
        heading: "Why Liquidity Matters To YOU",
        body: `Every time you swap a token you are interacting with a liquidity pool. The depth of that pool determines how good or bad your execution price is.

This is called SLIPPAGE — the difference between the price you expected and the price you actually got.

EXAMPLE:
You want to buy $100 worth of a token.
• Deep pool ($500K TVL) → You lose only $1.50 to slippage. You keep 98.5% of your value.
• Shallow pool ($10K TVL) → You lose $9 to slippage. You keep only 91% of your value.

That gap is money leaving your wallet. Permanently. Before the market even moves.

Hard Knocks Rule: ALWAYS check the pool liquidity before you buy. If you cannot find the pool depth, do not trade it.`
      },
      {
        heading: "Where Does Liquidity Come From?",
        body: `In traditional finance, large institutions called market makers provide liquidity. They sit on both sides of the order book and pocket the spread.

In DeFi, YOU can be the market maker. Anyone can deposit tokens into a liquidity pool and earn fees from every trade that passes through it.

This is the fundamental promise of DeFi liquidity:
• Traders get access to markets 24/7
• Liquidity providers earn passive income from trading fees
• No middleman takes the spread

The people depositing tokens into pools are called Liquidity Providers — LPs. Every lesson in this lab is building toward making you a smarter one.`
      },
      {
        heading: "Liquidity Across Protocols",
        body: `The same concept exists on every DEX in crypto. The implementation differs but the fundamentals are identical. Master the concept on one protocol and you can walk into any of them.`,
        table: {
          headers: ["Protocol", "Chain", "Type", "Known For"],
          rows: [
            ["Raydium", "Solana", "AMM + CLMM", "Highest Solana volume"],
            ["Orca", "Solana", "Whirlpools", "Concentrated LP, clean UI"],
            ["Meteora", "Solana", "DAMM + DLMM", "Dynamic fees, CLKN lives here"],
            ["Uniswap", "Ethereum", "v2 + v3", "The original DEX"],
            ["Curve", "Multi-chain", "StableSwap", "Stablecoin specialist"],
          ]
        }
      },
      {
        heading: "Common Mistakes",
        body: `These are the mistakes that cost people real money. Learn them here instead of the hard way.

❌ Trading illiquid tokens without checking pool depth first
❌ Setting slippage tolerance too high — bots will sandwich your transaction
❌ Setting slippage tolerance too low — your transactions will fail constantly
❌ Confusing token market cap with liquidity depth — they are not the same thing
❌ Assuming a token with a high price has deep liquidity — price and depth are independent
❌ Buying into a pool right after a large buy moved the price — you are the exit liquidity`
      }
    ],
    quiz: [
      {
        q: "What is slippage?",
        options: ["The fee paid to the DEX", "The difference between expected price and actual execution price", "The time it takes for a transaction to confirm", "The spread between buy and sell price"],
        correct: 1,
        explanation: "Slippage is the difference between the price you saw when you submitted a trade and the price you actually got when it executed. It's caused by low liquidity and other trades happening at the same time."
      },
      {
        q: "What happens when you make a large trade in a pool with very low liquidity?",
        options: ["The trade fails automatically", "Your trade moves the price significantly — you pay more than expected", "You get a better price because there's less competition", "Nothing — DEXs guarantee fixed prices"],
        correct: 1,
        explanation: "Low liquidity means your trade represents a large portion of the pool. The AMM formula pushes the price against you with every token you take out. This is called price impact — and it comes directly out of your pocket."
      },
      {
        q: "Who provides liquidity in DeFi pools?",
        options: ["Only the token creators", "Centralized exchanges", "Anyone — regular users who deposit their tokens and earn fees", "Only large institutions and market makers"],
        correct: 2,
        explanation: "In DeFi, anyone can be a liquidity provider. You deposit two tokens into a pool, earn a share of every trading fee generated, and can withdraw at any time. This is one of the most powerful concepts in all of DeFi."
      },
      {
        q: "A pool has $500,000 in TVL. Another pool has $5,000 in TVL. Which gives better trade execution?",
        options: ["The $5,000 pool — less competition", "The $500,000 pool — more liquidity means less price impact", "They are identical — DEXs normalize prices", "Depends on the token price"],
        correct: 1,
        explanation: "More liquidity always means less price impact for the same trade size. The $500,000 pool has 100x more depth so the same trade moves the price 100x less. Always trade in the deepest pool available."
      },
      {
        q: "What is TVL?",
        options: ["Total Volume Locked — the amount traded in 24 hours", "Total Value Locked — the combined dollar value of tokens in a pool", "Token Volatility Level — a measure of price swings", "Trade Validation Limit — maximum trade size allowed"],
        correct: 1,
        explanation: "TVL stands for Total Value Locked. It represents the combined dollar value of all tokens currently sitting in a liquidity pool. Higher TVL generally means deeper liquidity and less slippage for traders."
      },
      {
        q: "You set your slippage tolerance to 25% before a trade. What risk does this create?",
        options: ["Your transaction will fail", "MEV bots can sandwich your trade and extract value from your high tolerance", "The DEX will reject the trade", "Nothing — higher tolerance is always better"],
        correct: 1,
        explanation: "High slippage tolerance is an invitation for sandwich attacks. MEV bots see your pending transaction, buy ahead of you to push the price up, let your trade execute at the worse price you accepted, then sell immediately after. Set slippage as low as practically possible."
      },
      {
        q: "Which of these is a protocol-specific feature rather than a universal DeFi liquidity concept?",
        options: ["Impermanent loss", "Price impact", "Slippage", "Orca Whirlpools tick spacing"],
        correct: 3,
        explanation: "Impermanent loss, price impact, and slippage are universal concepts that apply to every AMM on every chain. Orca Whirlpools tick spacing is a specific implementation detail of Orca's concentrated liquidity system. Understanding the universal concepts first lets you navigate any protocol."
      }
    ],
    cluckVerdict: "Liquidity is the foundation. Every single lesson in this lab builds on what you just learned. If you skipped something, go back. The LP Lab has no shortcuts and no sympathy for lazy students."
  }
];

function LPLessonView({ lesson, onBack, onComplete }) {
  const [phase, setPhase] = useState("content"); // content | quiz | result
  const [openSection, setOpenSection] = useState(0);
  const [qi, setQi] = useState(0);
  const [sel, setSel] = useState(null);
  const [showExp, setShowExp] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [tradeSize, setTradeSize] = useState(500);

  const shuffledQuestions = useMemo(() => lesson.quiz.map(q => {
    const opts = [...q.options];
    const correctText = opts[q.correct];
    for (let i = opts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [opts[i], opts[j]] = [opts[j], opts[i]];
    }
    return { ...q, options: opts, correct: opts.indexOf(correctText) };
  }), [lesson.id]);

  const q = shuffledQuestions[qi];

  // Price impact calculator
  const shallowPool = 10000;
  const deepPool = 500000;
  const calcImpact = (poolSize, trade) => {
    const k = poolSize * poolSize;
    const newPool = poolSize + trade;
    const out = poolSize - k / newPool;
    const impact = ((trade - out) / trade) * 100;
    return Math.max(0, impact).toFixed(2);
  };
  const shallowImpact = calcImpact(shallowPool, tradeSize);
  const deepImpact = calcImpact(deepPool, tradeSize);

  function pickAnswer(i) {
    if (sel !== null) return;
    setSel(i);
    setShowExp(true);
  }

  function nextQuestion() {
    const a = [...answers, sel === q.correct];
    setAnswers(a);
    if (qi + 1 < shuffledQuestions.length) {
      setQi(qi + 1); setSel(null); setShowExp(false);
    } else {
      setScore(a.filter(Boolean).length);
      setPhase("result");
    }
  }

  if (phase === "quiz") return (
    <div style={{padding:"0 16px 40px",maxWidth:540,margin:"0 auto"}}>
      <button onClick={()=>setPhase("content")} style={{background:"none",border:"none",color:"#6B7280",fontFamily:"'Oswald',sans-serif",fontSize:10,letterSpacing:2,cursor:"pointer",marginBottom:16}}>← BACK TO LESSON</button>
      <div style={{fontFamily:"'Oswald',sans-serif",fontSize:10,color:"#10B981",letterSpacing:2,marginBottom:4}}>⚗️ LP LAB — LESSON {lesson.id} QUIZ</div>
      <div style={{fontFamily:"'Oswald',sans-serif",fontSize:10,color:"#6B7280",letterSpacing:1,marginBottom:16}}>QUESTION {qi+1} OF {shuffledQuestions.length}</div>
      <div style={{background:"rgba(16,185,129,0.06)",border:"1px solid rgba(16,185,129,0.2)",borderRadius:12,padding:"14px 16px",marginBottom:16}}>
        <div style={{fontFamily:"'Oswald',sans-serif",fontSize:15,color:"#F9FAFB",lineHeight:1.5}}>{q.q}</div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:12}}>
        {q.options.map((opt,i)=>{
          let bg = "rgba(255,255,255,0.04)";
          let border = "rgba(255,255,255,0.1)";
          let color = "#D1D5DB";
          if (sel !== null) {
            if (i === q.correct) { bg="rgba(16,185,129,0.15)"; border="#10B981"; color="#10B981"; }
            else if (i === sel) { bg="rgba(239,68,68,0.15)"; border="#EF4444"; color="#EF4444"; }
          }
          return (
            <button key={i} onClick={()=>pickAnswer(i)} style={{background:bg,border:`1px solid ${border}`,borderRadius:10,padding:"12px 14px",textAlign:"left",fontFamily:"'Oswald',sans-serif",fontSize:13,color,cursor:sel===null?"pointer":"default",letterSpacing:0.5}}>
              <span style={{color:"#6B7280",marginRight:8}}>{String.fromCharCode(65+i)}.</span>{opt}
            </button>
          );
        })}
      </div>
      {showExp && (
        <div style={{background:"rgba(16,185,129,0.06)",border:"1px solid rgba(16,185,129,0.2)",borderRadius:10,padding:14,marginBottom:12}}>
          <div style={{fontFamily:"'Oswald',sans-serif",fontSize:10,color:sel===q.correct?"#10B981":"#EF4444",letterSpacing:1,marginBottom:6}}>{sel===q.correct?"✓ CORRECT":"✗ NOT QUITE"} — CLUCK EXPLAINS:</div>
          <p style={{margin:0,fontSize:13,color:"#D1D5DB",lineHeight:1.7}}>{q.explanation}</p>
        </div>
      )}
      {showExp && (
        <>
          <AskCluck context={`LP Lab Lesson ${lesson.id}: ${lesson.title}`} compact={true}/>
          <button onClick={nextQuestion} style={{width:"100%",background:"linear-gradient(135deg,#10B981,#059669)",border:"none",borderRadius:10,padding:"13px",fontFamily:"'Oswald',sans-serif",fontSize:14,fontWeight:700,color:"#fff",letterSpacing:2,cursor:"pointer",marginTop:8}}>
            {qi+1<shuffledQuestions.length?"NEXT QUESTION →":"SEE RESULTS →"}
          </button>
        </>
      )}
    </div>
  );

  if (phase === "result") return (
    <div style={{padding:"0 16px 40px",maxWidth:540,margin:"0 auto",textAlign:"center"}}>
      <div style={{fontSize:48,marginBottom:12}}>{score===shuffledQuestions.length?"🏆":score>=3?"✅":"📚"}</div>
      <div style={{fontFamily:"'Oswald',sans-serif",fontSize:20,fontWeight:900,color:"#10B981",letterSpacing:2,marginBottom:8}}>
        {score}/{shuffledQuestions.length} CORRECT
      </div>
      <div style={{background:"rgba(16,185,129,0.08)",border:"1px solid rgba(16,185,129,0.25)",borderRadius:12,padding:16,marginBottom:16}}>
        <p style={{fontFamily:"Georgia,serif",fontStyle:"italic",color:"#FCD34D",fontSize:14,margin:"0 0 8px",lineHeight:1.6}}>
          {score===shuffledQuestions.length
            ? '"Perfect score. You actually read it. Rare in this schoolyard. Move on to the next lesson."'
            : score>=3
            ? '"Decent. You understand the basics. But decent doesn\'t survive this market. Review what you missed."'
            : '"You need to go back. Read every section again. The market doesn\'t grade on a curve."'}
        </p>
        <div style={{fontFamily:"'Oswald',sans-serif",fontSize:10,color:"#D97706",letterSpacing:2}}>— CLUCK NORRIS</div>
      </div>
      <div style={{display:"flex",gap:10}}>
        <button onClick={()=>{setPhase("content");setQi(0);setSel(null);setAnswers([]);setShowExp(false);}} style={{flex:1,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:10,padding:"12px",fontFamily:"'Oswald',sans-serif",fontSize:12,color:"#D1D5DB",cursor:"pointer",letterSpacing:1}}>
          📖 REVIEW LESSON
        </button>
        <button onClick={onComplete} style={{flex:1,background:"linear-gradient(135deg,#10B981,#059669)",border:"none",borderRadius:10,padding:"12px",fontFamily:"'Oswald',sans-serif",fontSize:12,fontWeight:700,color:"#fff",letterSpacing:1,cursor:"pointer"}}>
          NEXT LESSON →
        </button>
      </div>
    </div>
  );

  return (
    <div style={{padding:"0 16px 40px",maxWidth:540,margin:"0 auto"}}>
      <button onClick={onBack} style={{background:"none",border:"none",color:"#6B7280",fontFamily:"'Oswald',sans-serif",fontSize:10,letterSpacing:2,cursor:"pointer",marginBottom:16}}>← BACK TO LP LAB</button>

      {/* Header */}
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{fontSize:40,marginBottom:6}}>{lesson.icon}</div>
        <div style={{fontFamily:"'Oswald',sans-serif",fontSize:10,color:"#10B981",letterSpacing:3,marginBottom:4}}>⚗️ LP LAB — LESSON {lesson.id}</div>
        <h2 style={{fontFamily:"'Oswald',sans-serif",fontSize:26,fontWeight:900,color:"#F9FAFB",margin:"0 0 6px",letterSpacing:2}}>{lesson.title}</h2>
        <div style={{fontFamily:"'Oswald',sans-serif",fontSize:11,color:"#6B7280",letterSpacing:2}}>{lesson.tagline}</div>
      </div>

      {/* Cluck hook */}
      <div style={{background:"rgba(217,119,6,0.08)",border:"1px solid rgba(217,119,6,0.25)",borderRadius:12,padding:"14px 16px",marginBottom:20,display:"flex",gap:12,alignItems:"flex-start"}}>
        <img src={LOGO_B64} alt="CN" style={{width:36,height:36,borderRadius:"50%",objectFit:"cover",border:"2px solid #D97706",flexShrink:0}}/>
        <p style={{margin:0,fontFamily:"Georgia,serif",fontStyle:"italic",color:"#FCD34D",fontSize:13,lineHeight:1.7}}>{lesson.cluckHook}</p>
      </div>

      {/* Sections */}
      {lesson.sections.map((sec, i) => (
        <div key={i} style={{marginBottom:8}}>
          <button onClick={()=>setOpenSection(openSection===i?-1:i)} style={{width:"100%",background:openSection===i?"rgba(16,185,129,0.1)":"rgba(255,255,255,0.03)",border:`1px solid ${openSection===i?"rgba(16,185,129,0.4)":"rgba(255,255,255,0.08)"}`,borderRadius:openSection===i?"12px 12px 0 0":"12px",padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}}>
            <span style={{fontFamily:"'Oswald',sans-serif",fontSize:13,fontWeight:700,color:openSection===i?"#10B981":"#D1D5DB",letterSpacing:1}}>{sec.heading}</span>
            <span style={{color:openSection===i?"#10B981":"#6B7280",fontSize:16}}>{openSection===i?"▲":"▼"}</span>
          </button>
          {openSection===i && (
            <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(16,185,129,0.2)",borderTop:"none",borderRadius:"0 0 12px 12px",padding:"14px 16px"}}>
              <p style={{margin:"0 0 12px",fontSize:13,color:"#D1D5DB",lineHeight:1.8,whiteSpace:"pre-line"}}>{sec.body}</p>
              {sec.table && (
                <div style={{overflowX:"auto",marginTop:8}}>
                  <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
                    <thead>
                      <tr>{sec.table.headers.map((h,j)=>(
                        <th key={j} style={{background:"rgba(16,185,129,0.15)",padding:"8px 10px",textAlign:"left",fontFamily:"'Oswald',sans-serif",color:"#10B981",letterSpacing:1,borderBottom:"1px solid rgba(16,185,129,0.3)"}}>{h}</th>
                      ))}</tr>
                    </thead>
                    <tbody>
                      {sec.table.rows.map((row,j)=>(
                        <tr key={j} style={{borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
                          {row.map((cell,k)=>(
                            <td key={k} style={{padding:"8px 10px",color:k===0?"#FCD34D":"#D1D5DB",fontFamily:k===0?"'Oswald',sans-serif":"inherit",letterSpacing:k===0?1:0}}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Interactive: Liquidity Depth Visualizer */}
      <div style={{background:"rgba(16,185,129,0.06)",border:"1px solid rgba(16,185,129,0.25)",borderRadius:12,padding:16,marginTop:16,marginBottom:8}}>
        <div style={{fontFamily:"'Oswald',sans-serif",fontSize:11,color:"#10B981",letterSpacing:2,marginBottom:4}}>🧮 INTERACTIVE — LIQUIDITY DEPTH VISUALIZER</div>
        <p style={{fontFamily:"'Oswald',sans-serif",fontSize:11,color:"#9CA3AF",margin:"0 0 14px",lineHeight:1.6}}>See how pool depth affects your trade. Drag the slider to change trade size.</p>
        
        <div style={{marginBottom:14}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
            <span style={{fontFamily:"'Oswald',sans-serif",fontSize:11,color:"#D1D5DB",letterSpacing:1}}>TRADE SIZE</span>
            <span style={{fontFamily:"monospace",fontSize:14,color:"#FCD34D",fontWeight:700}}>${tradeSize.toLocaleString()}</span>
          </div>
          <input type="range" min="50" max="50000" step="50" value={tradeSize} onChange={e=>setTradeSize(Number(e.target.value))}
            style={{width:"100%",accentColor:"#10B981"}}/>
          <div style={{display:"flex",justifyContent:"space-between"}}>
            <span style={{fontFamily:"'Oswald',sans-serif",fontSize:9,color:"#4B5563"}}>$50</span>
            <span style={{fontFamily:"'Oswald',sans-serif",fontSize:9,color:"#4B5563"}}>$50,000</span>
          </div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          {[
            {label:"SHALLOW POOL",tvl:"$10,000 TVL",impact:shallowImpact,color:"#EF4444",bg:"rgba(239,68,68,0.08)",border:"rgba(239,68,68,0.3)"},
            {label:"DEEP POOL",tvl:"$500,000 TVL",impact:deepImpact,color:"#10B981",bg:"rgba(16,185,129,0.08)",border:"rgba(16,185,129,0.3)"},
          ].map((pool,i)=>(
            <div key={i} style={{background:pool.bg,border:`1px solid ${pool.border}`,borderRadius:10,padding:12,textAlign:"center"}}>
              <div style={{fontFamily:"'Oswald',sans-serif",fontSize:10,color:pool.color,letterSpacing:1,marginBottom:2}}>{pool.label}</div>
              <div style={{fontFamily:"'Oswald',sans-serif",fontSize:9,color:"#6B7280",marginBottom:8}}>{pool.tvl}</div>
              <div style={{fontFamily:"monospace",fontSize:26,fontWeight:700,color:pool.color,marginBottom:2}}>{pool.impact}%</div>
              <div style={{fontFamily:"'Oswald',sans-serif",fontSize:9,color:"#6B7280",letterSpacing:1}}>PRICE IMPACT</div>
              <div style={{marginTop:8,fontFamily:"'Oswald',sans-serif",fontSize:10,color:pool.color}}>
                You lose ${(tradeSize * pool.impact / 100).toFixed(2)} to impact
              </div>
            </div>
          ))}
        </div>
        {parseFloat(shallowImpact) > 5 && (
          <div style={{marginTop:10,background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.3)",borderRadius:8,padding:"8px 12px"}}>
            <p style={{margin:0,fontFamily:"'Oswald',sans-serif",fontSize:11,color:"#EF4444",lineHeight:1.6}}>
              ⚠️ That's a {shallowImpact}% price impact in the shallow pool. Cluck Norris would not make that trade.
            </p>
          </div>
        )}
      </div>

      {/* Cluck verdict */}
      <div style={{background:"rgba(217,119,6,0.06)",border:"1px solid rgba(217,119,6,0.2)",borderRadius:12,padding:"14px 16px",marginBottom:16,marginTop:8}}>
        <div style={{fontFamily:"'Oswald',sans-serif",fontSize:9,color:"#D97706",letterSpacing:2,marginBottom:6}}>🐔 CLUCK'S VERDICT</div>
        <p style={{margin:0,fontFamily:"Georgia,serif",fontStyle:"italic",color:"#FCD34D",fontSize:13,lineHeight:1.7}}>{lesson.cluckVerdict}</p>
      </div>

      <AskCluck context={`LP Lab Lesson ${lesson.id}: ${lesson.title}`} compact={true}/>
      <button onClick={()=>{setPhase("quiz");setQi(0);setSel(null);setAnswers([]);setShowExp(false);}} style={{width:"100%",background:"linear-gradient(135deg,#10B981,#059669)",border:"none",borderRadius:10,padding:"14px",fontFamily:"'Oswald',sans-serif",fontSize:15,fontWeight:700,color:"#fff",letterSpacing:3,cursor:"pointer",marginTop:12}}>
        ✅ TAKE THE QUIZ →
      </button>
    </div>
  );
}

const LP_LAB_KEY = "lplab_completed";

function getLPCompleted() {
  try {
    const stored = localStorage.getItem(LP_LAB_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch(e) { return []; }
}

function saveLPCompleted(arr) {
  try { localStorage.setItem(LP_LAB_KEY, JSON.stringify(arr)); } catch(e) {}
}

function LPLab() {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [completed, setCompleted] = useState(() => getLPCompleted());

  if (selectedLesson !== null) {
    return (
      <LPLessonView
        lesson={LP_LESSONS[selectedLesson]}
        onBack={()=>setSelectedLesson(null)}
        onComplete={()=>{
          const updated = [...new Set([...completed, selectedLesson])];
          setCompleted(updated);
          saveLPCompleted(updated);
          setSelectedLesson(null);
        }}
      />
    );
  }

  return (
    <div style={{padding:"0 16px 40px",maxWidth:540,margin:"0 auto"}}>
      {/* Header */}
      <div style={{textAlign:"center",marginBottom:24}}>
        <div style={{fontSize:36,marginBottom:6}}>⚗️</div>
        <h2 style={{fontFamily:"'Oswald',sans-serif",fontSize:28,fontWeight:900,color:"#F9FAFB",margin:"0 0 4px",letterSpacing:2}}>THE LP LAB</h2>
        <div style={{fontFamily:"'Oswald',sans-serif",fontSize:10,color:"#6B7280",letterSpacing:3,marginBottom:12}}>ADVANCED LIQUIDITY TRAINING</div>
        <div style={{background:"rgba(16,185,129,0.08)",border:"1px solid rgba(16,185,129,0.2)",borderRadius:10,padding:"10px 14px",display:"inline-block"}}>
          <p style={{margin:0,fontFamily:"'Oswald',sans-serif",fontSize:11,color:"#10B981",lineHeight:1.6,letterSpacing:0.5}}>
            Protocol-agnostic. Works on Meteora, Raydium, Orca, Uniswap — anywhere. Master the mechanics, not just the buttons.
          </p>
        </div>
      </div>

      {/* Lessons list */}
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {LP_LESSONS.map((lesson, i) => {
          const done = completed.includes(i);
          return (
            <button key={i} onClick={()=>setSelectedLesson(i)} style={{background:done?"rgba(16,185,129,0.08)":"rgba(255,255,255,0.03)",border:`1px solid ${done?"rgba(16,185,129,0.4)":"rgba(255,255,255,0.08)"}`,borderRadius:12,padding:"14px 16px",display:"flex",alignItems:"center",gap:14,cursor:"pointer",textAlign:"left"}}>
              <div style={{fontSize:28,flexShrink:0}}>{lesson.icon}</div>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                  <span style={{fontFamily:"'Oswald',sans-serif",fontSize:9,color:"#10B981",letterSpacing:2}}>LESSON {lesson.id}</span>
                  {done && <span style={{fontFamily:"'Oswald',sans-serif",fontSize:8,color:"#10B981",background:"rgba(16,185,129,0.15)",border:"1px solid rgba(16,185,129,0.3)",borderRadius:10,padding:"1px 6px",letterSpacing:1}}>✓ DONE</span>}
                </div>
                <div style={{fontFamily:"'Oswald',sans-serif",fontSize:15,fontWeight:700,color:"#F9FAFB",marginBottom:2,letterSpacing:1}}>{lesson.title}</div>
                <div style={{fontFamily:"'Oswald',sans-serif",fontSize:10,color:"#6B7280",letterSpacing:0.5}}>{lesson.tagline}</div>
              </div>
              <span style={{color:"#10B981",fontSize:16,flexShrink:0}}>→</span>
            </button>
          );
        })}

        {/* Coming soon lessons */}
        {[
          {n:2, title:"How AMMs Work", icon:"⚙️", tag:"The math that runs every DEX"},
          {n:3, title:"Impermanent Loss", icon:"📉", tag:"The #1 risk every LP must understand"},
          {n:4, title:"LP Fees & Earnings", icon:"💰", tag:"How you actually make money"},
          {n:5, title:"Concentrated Liquidity", icon:"🎯", tag:"More fees, less capital"},
          {n:6, title:"Price Bins & Ticks", icon:"📊", tag:"Meteora DLMM & Orca Whirlpools"},
          {n:7, title:"Single-Sided Deposits", icon:"↕️", tag:"DCA mechanics and launch pools"},
          {n:8, title:"Active vs Passive LP", icon:"⚖️", tag:"When to monitor, when to relax"},
          {n:9, title:"LP Risk Management", icon:"🛡️", tag:"Know your risk or the market will teach you"},
          {n:10, title:"Reading Pool Data", icon:"🔍", tag:"Volume, TVL, APR — what it all means"},
          {n:11, title:"Token Launch Liquidity", icon:"🚀", tag:"Bonding curves, graduation, Bags.fm"},
          {n:12, title:"Building a Real LP Strategy", icon:"♟️", tag:"Put it all together"},
        ].map((l,i)=>(
          <div key={i} style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)",borderRadius:12,padding:"14px 16px",display:"flex",alignItems:"center",gap:14,opacity:0.5}}>
            <div style={{fontSize:28,flexShrink:0}}>{l.icon}</div>
            <div style={{flex:1}}>
              <div style={{fontFamily:"'Oswald',sans-serif",fontSize:9,color:"#6B7280",letterSpacing:2,marginBottom:3}}>LESSON {l.n}</div>
              <div style={{fontFamily:"'Oswald',sans-serif",fontSize:15,fontWeight:700,color:"#9CA3AF",marginBottom:2,letterSpacing:1}}>{l.title}</div>
              <div style={{fontFamily:"'Oswald',sans-serif",fontSize:10,color:"#4B5563",letterSpacing:0.5}}>{l.tag}</div>
            </div>
            <span style={{fontFamily:"'Oswald',sans-serif",fontSize:8,color:"#4B5563",letterSpacing:1}}>COMING SOON</span>
          </div>
        ))}
      </div>
    </div>
  );
}
