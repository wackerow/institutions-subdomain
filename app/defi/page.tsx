import type { Metadata } from "next/types"

import Hero from "@/components/Hero"

import AppGrid from "./_components/AppGrid"

// import oneInch from "@/public/images/defi-protocols/1inch.png"
// import aave from "@/public/images/defi-protocols/aave.png"
// import aerodrome from "@/public/images/defi-protocols/aerodrome.png"
// import balancer from "@/public/images/defi-protocols/balancer.png"
// import centrifuge from "@/public/images/defi-protocols/centrifuge.png"
// import circle from "@/public/images/defi-protocols/circle.png"
// import compound from "@/public/images/defi-protocols/compound.png"
// import cowSwap from "@/public/images/defi-protocols/cow-swap.png"
// import curve from "@/public/images/defi-protocols/curve.png"
// import eigenCloud from "@/public/images/defi-protocols/eigen-cloud.png"
// import ethena from "@/public/images/defi-protocols/ethena.png"
// import etherFi from "@/public/images/defi-protocols/ether-fi.png"
// import euler from "@/public/images/defi-protocols/euler.png"
// import fluid from "@/public/images/defi-protocols/fluid.png"
// import frax from "@/public/images/defi-protocols/frax.png"
// import ftBenji from "@/public/images/defi-protocols/ft-benji.png"
// import lido from "@/public/images/defi-protocols/lido.png"
// import liquidCollective from "@/public/images/defi-protocols/liquid-collective.png"
// import maple from "@/public/images/defi-protocols/maple.png"
// import moonwell from "@/public/images/defi-protocols/moonwell.png"
// import morpho from "@/public/images/defi-protocols/morpho.png"
// import ondo from "@/public/images/defi-protocols/ondo.png"
// import pendle from "@/public/images/defi-protocols/pendle.png"
// import polymarket from "@/public/images/defi-protocols/polymarket.png"
// import rocketPool from "@/public/images/defi-protocols/rocket-pool.png"
// import securitize from "@/public/images/defi-protocols/securitize.png"
// import sky from "@/public/images/defi-protocols/sky.png"
// import spark from "@/public/images/defi-protocols/spark.png"
// import stakewise from "@/public/images/defi-protocols/stakewise.png"
// import symbiotic from "@/public/images/defi-protocols/symbiotic.png"
// import synthetix from "@/public/images/defi-protocols/synthetix.png"
// import tether from "@/public/images/defi-protocols/tether.png"
// import uniswap from "@/public/images/defi-protocols/uniswap.png"
// import veda from "@/public/images/defi-protocols/veda.png"
// import wisdomTree from "@/public/images/defi-protocols/wisdom-tree.png"

export default function Page() {
  // const categories = [
  //   "dex",
  //   "lending-borrowing",
  //   "rwa-yield",
  //   "staking",
  //   "synthetic",
  // ] as const

  // type CategoryKey = (typeof categories)[number]

  // type Platform = {
  //   name: string
  //   description: string
  //   imgSrc: StaticImageData
  //   href: string
  // }

  // type CategoryDetails = {
  //   heading: string
  //   subtext: string
  //   platforms: Platform[]
  // }

  // const ecosystem: Record<CategoryKey, CategoryDetails> = {
  //   dex: {
  //     heading: "Decentralized Exchanges (DEXs)",
  //     subtext:
  //       "A small selection of DeFi applications that run on Ethereum and its Layer-2 networks",
  //     platforms: [
  //       {
  //         name: "1inch",
  //         description:
  //           "A DEX aggregator that sources liquidity from across DEXs and networks to find the best possible swapping routes and rates.",
  //         imgSrc: oneInch,
  //         href: "https://1inch.com/",
  //       },
  //       {
  //         name: "Aerodrome",
  //         description:
  //           "A decentralized exchange on the Base L2 that combines an AMM with a governance and protocol reward model designed to align incentives.",
  //         imgSrc: aerodrome,
  //         href: "https://aerodrome.finance/",
  //       },
  //       {
  //         name: "Balancer",
  //         description:
  //           "A DeFi protocol that acts as an automated portfolio manager and liquidity provider, allowing users to create or invest in customizable liquidity pools.",
  //         imgSrc: balancer,
  //         href: "https://balancer.fi/",
  //       },
  //       {
  //         name: "CoWSwap",
  //         description:
  //           "A DEX aggregator built around frequent batch auctions to provide MEV protection, find optimal liquidity, and minimize fees, matching trades peer-to-peer and sending unfilled orders to underlying AMMs.",
  //         imgSrc: cowSwap,
  //         href: "https://swap.cow.fi/",
  //       },
  //       {
  //         name: "Curve",
  //         description:
  //           "A DEX and AMM focused on efficient trading for stablecoins and volatile tokens, using a unique AMM formula to minimize slippage for similarly-priced assets.",
  //         imgSrc: curve,
  //         href: "https://www.curve.finance/",
  //       },
  //       {
  //         name: "Fluid",
  //         description:
  //           "A DeFi protocol that offers lending, borrowing, and trading on top of a unified liquidity layer, allowing users to maximize yield and optimize capital efficiency through integrated debt and liquidity products.",
  //         imgSrc: fluid,
  //         href: "https://fluid.io/",
  //       },
  //       {
  //         name: "Uniswap",
  //         description:
  //           "A DEX protocol that enables permissionless peer-to-peer trading, through a smart contract-based AMM system that allows anyone to create custom pairs and supply liquidity.",
  //         imgSrc: uniswap,
  //         href: "https://app.uniswap.org/",
  //       },
  //     ],
  //   },
  //   "lending-borrowing": {
  //     heading: "Lending & Borrowing",
  //     subtext:
  //       "Borrow against onchain collateral and earn yield for supplying liquidity, via smart contracts with programmable terms",
  //     platforms: [
  //       {
  //         name: "Aave",
  //         description:
  //           "A non-custodial protocol where users can create liquidity markets and participate as suppliers or borrowers, earning interest on supplied digital assets and borrowing against them.",
  //         imgSrc: aave,
  //         href: "https://aave.com/",
  //       },
  //       {
  //         name: "Compound",
  //         description:
  //           "An algorithmic, autonomous interest rate protocol that allows users to earn interest by lending digital assets to borrowers, designed for developers to build DeFi applications on top of. ",
  //         imgSrc: compound,
  //         href: "https://compound.finance/",
  //       },
  //       {
  //         name: "Euler",
  //         description:
  //           "A permissionless protocol for lending, borrowing, and swapping digital assets, featuring asset tiers and reactive interest rates to manage risk, with a modular lending platform for developers to create and connect custom lending vaults.",
  //         imgSrc: euler,
  //         href: "https://www.euler.finance/",
  //       },
  //       {
  //         name: "Fluid",
  //         description:
  //           "A DeFi protocol that offers lending, borrowing, and trading on top of a unified liquidity layer, allowing users to maximize yield and optimize capital efficiency through integrated debt and liquidity products.",
  //         imgSrc: fluid,
  //         href: "https://fluid.io/",
  //       },
  //       {
  //         name: "Maple",
  //         description:
  //           "A decentralized credit market that provides undercollateralized loans to institutional borrowers, and allows lenders to earn yield by supplying liquidity to these curated loans.",
  //         imgSrc: maple,
  //         href: "https://maple.finance/",
  //       },
  //       {
  //         name: "Moonwell",
  //         description:
  //           "An open lending and borrowing protocol designed to simplify the onchain user experience, featuring single-sided liquidity pools and overcollateralized borrowing across markets.",
  //         imgSrc: moonwell,
  //         href: "https://moonwell.fi/",
  //       },
  //       {
  //         name: "Morpho",
  //         description:
  //           "A decentralized protocol for overcollateralized, vault-based lending and borrowing, aiming to improve the capital efficiency of lending pools through isolated markets, risk curators, and portfolio allocators.",
  //         imgSrc: morpho,
  //         href: "https://morpho.org/",
  //       },
  //       {
  //         name: "Sky",
  //         description:
  //           "A DeFi protocol (created by the MakerDAO community) that offers a suite of tools for trading, converting, staking, and earning yield from digital assets, including the USDS stablecoin. ",
  //         imgSrc: sky,
  //         href: "https://sky.money/",
  //       },
  //       {
  //         name: "Spark",
  //         description:
  //           "A DeFi protocol focused on earning savings on stablecoin holdings, providing liquidity across DeFi markets, and borrowing via a USDS-centric money market protocol. ",
  //         imgSrc: spark,
  //         href: "https://spark.fi/",
  //       },
  //     ],
  //   },
  //   "rwa-yield": {
  //     heading: "Real-World Assets (RWA) & Onchain Yield",
  //     subtext:
  //       "Tokenized offchain assets, like T-Bills, commodities, or real estate, and onchain comparables to familiar yield instruments",
  //     platforms: [
  //       {
  //         name: "Centrifuge",
  //         description:
  //           "An asset-agnostic lending protocol that aims to make credit more accessible to businesses, allowing them to tokenize real-world assets and use them as onchain collateral.",
  //         imgSrc: centrifuge,
  //         href: "https://centrifuge.io/",
  //       },
  //       {
  //         name: "Circle",
  //         description:
  //           "A global financial technology firm that provides payments and financial infrastructure, tokenized money market funds, and more, best known for issuing the fully-regulated USD Coin (USDC) stablecoin. ",
  //         imgSrc: circle,
  //         href: "https://www.circle.com/",
  //       },
  //       {
  //         name: "Ethena",
  //         description:
  //           "A synthetic dollar protocol focused on providing a crypto-native solution for money, offering USDe, a stablecoin backed by crypto assets and corresponding short futures positions, and a dollar-denominated savings account.",
  //         imgSrc: ethena,
  //         href: "https://ethena.fi/",
  //       },
  //       {
  //         name: "Franklin Templeton BENJI",
  //         description:
  //           "A mobile app that allows investors to browse tokenized securities, digital assets, and invest in the Franklin OnChain U.S. Government Money Fund (BENJI), the first tokenized money fund natively issued on a blockchain.",
  //         imgSrc: ftBenji,
  //         href: "https://digitalassets.franklintempleton.com/benji/",
  //       },
  //       {
  //         name: "Frax",
  //         description:
  //           "A fractional-algorithmic stablecoin ecosystem that aims to provide scalable, decentralized, and algorithmic money in place of fixed-supply digital assets.",
  //         imgSrc: frax,
  //         href: "https://frax.com/",
  //       },
  //       {
  //         name: "Ondo",
  //         description:
  //           "A DeFi protocol focused on making institutional-grade financial products and services, like tokenized U.S. Treasuries, accessible onchain. ",
  //         imgSrc: ondo,
  //         href: "https://ondo.finance/",
  //       },
  //       {
  //         name: "Pendle",
  //         description:
  //           "A DeFi protocol for trading interest rate derivatives via the tokenization of future yield, allowing users to lock in future yield from yield-bearing tokens, speculate on yield movements, and provide liquidity for yield-bearing tokens. ",
  //         imgSrc: pendle,
  //         href: "https://www.pendle.finance/",
  //       },
  //       {
  //         name: "Securitize",
  //         description:
  //           "A platform for tokenizing real-world assets and  issuing and managing digital asset securities onchain, allowing businesses to raise capital and investors to trade tokenized shares in funds and private companies.",
  //         imgSrc: securitize,
  //         href: "https://securitize.io/",
  //       },
  //       {
  //         name: "Sky",
  //         description:
  //           "A DeFi protocol (created by the MakerDAO community) that offers a suite of tools for trading, converting, staking, and earning yield from digital assets, including the USDS stablecoin. ",
  //         imgSrc: sky,
  //         href: "https://sky.money/",
  //       },
  //       {
  //         name: "Tether",
  //         description:
  //           "Issuer of the the USDT stablecoin, a stablecoin pegged to the U.S. dollar that’s focused on using fiat currencies onchain.",
  //         imgSrc: tether,
  //         href: "https://tether.to/en/",
  //       },
  //       {
  //         name: "Veda",
  //         description:
  //           "A vault infrastructure platform for institutions to launch and manage custom onchain products at scale. ",
  //         imgSrc: veda,
  //         href: "https://veda.tech/",
  //       },
  //       {
  //         name: "WisdomTree",
  //         description:
  //           "A global asset manager that offers a range of exchange-traded products (ETPs), including physically-backed crypto ETPs.",
  //         imgSrc: wisdomTree,
  //         href: "https://www.wisdomtree.com/",
  //       },
  //     ],
  //   },
  //   staking: {
  //     heading: "Staking & Restaking",
  //     subtext:
  //       "Stake ETH through a staking network to help secure Ethereum and earn rewards, or restake LSTs to help secure other protocols",
  //     platforms: [
  //       {
  //         name: "EtherFi",
  //         description:
  //           "A restaking platform to earn additional rewards on stablecoins, liquid staking tokens, and other digital assets, with deposits represented by a liquid restaking token that can be used across DeFi, and automated strategy vaults.",
  //         imgSrc: etherFi,
  //         href: "https://www.ether.fi/",
  //       },
  //       {
  //         name: "EigenCloud",
  //         description:
  //           "A platform built on EigenLayer restaking that provides verifiable computing for AI and other complex applications, leveraging Ethereum's security through restaked ETH and restaked liquid staking tokens.",
  //         imgSrc: eigenCloud,
  //         href: "https://www.eigencloud.xyz/",
  //       },
  //       {
  //         name: "Lido",
  //         description:
  //           "A DAO-managed liquid staking network that allows users to stake their ETH and other PoS assets to earn staking rewards, with staked assets represented by stETH, a liquid staking token that can be used in DeFi and is issued to represent staking rewards. ",
  //         imgSrc: lido,
  //         href: "https://lido.fi/",
  //       },
  //       {
  //         name: "Liquid Collective",
  //         description:
  //           "A liquid staking network built to provide a secure, decentralized way to stake ETH across operators and platforms, with staked assets represented by LsETH, a liquid staking token that can be used in DeFi while accruing staking rewards that’s designed to meet institutional security and compliance requirements.",
  //         imgSrc: liquidCollective,
  //         href: "https://liquidcollective.io/",
  //       },
  //       {
  //         name: "Rocket Pool",
  //         description:
  //           "A liquid staking protocol focused on decentralization and censorship resistance, allowing users with as little as 0.01 ETH to participate in staking and receive a liquid staking token (rETH) that can be used in DeFi while it continues to accrue staking rewards. ",
  //         imgSrc: rocketPool,
  //         href: "https://rocketpool.net/",
  //       },
  //       {
  //         name: "Stakewise",
  //         description:
  //           "A liquid staking platform that offers both solo and pooled staking options, backed by a decentralized network of custom staking vaults, with a unified liquid staking token (osETH) that can be used in DeFi while it continues to accrue staking rewards.  ",
  //         imgSrc: stakewise,
  //         href: "https://www.stakewise.io/",
  //       },
  //       {
  //         name: "Symbiotic",
  //         description:
  //           "A restaking protocol that enables users to secure additional blockchain networks by restaking their existing staked assets and liquid staking tokens, with a flexible and modular system for networks to manage independent rewards and penalties.",
  //         imgSrc: symbiotic,
  //         href: "https://symbiotic.fi/",
  //       },
  //     ],
  //   },
  //   synthetic: {
  //     heading: "Predictions & Synthetics",
  //     subtext:
  //       "Trade on the outcome of future events via smart contract, or access tokens that track the value of any asset",
  //     platforms: [
  //       {
  //         name: "Polymarket",
  //         description:
  //           "A decentralized prediction market where users can bet on the outcomes of real-world events by buying and selling shares in different possible outcomes.",
  //         imgSrc: polymarket,
  //         href: "https://polymarket.com/",
  //       },
  //       {
  //         name: "Synthetix",
  //         description:
  //           "A liquidity protocol for creating synthetic digital assets that track the value of any asset, allowing users to gain exposure to a wide range of instruments without holding them directly.",
  //         imgSrc: synthetix,
  //         href: "https://www.synthetix.io/",
  //       },
  //     ],
  //   },
  // }
  return (
    <main className="row-start-2 flex flex-col items-center sm:items-start">
      <Hero heading="The Home of Decentralized Finance" shape="eth-glyph">
        <p>
          Ethereum introduced the world to decentralized finance (DeFi): open
          financial systems built on smart contracts.
        </p>
        <p>
          100% uptime, battle-tested and secure infrastructure, and the deepest
          liquidity layer of any blockchain—Ethereum is for DeFi.
        </p>
      </Hero>
      <article className="max-w-8xl mx-auto w-full space-y-10 px-4 py-10 sm:px-10 sm:py-20 md:space-y-20">
        <section id="ecosystem" className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-h3s">Ethereum&apos;s DeFi Ecosystem</h2>
            <p className="text-muted-foreground font-medium">
              A small selection of DeFi applications that run on Ethereum and
              its Layer 2 networks
            </p>
          </div>

          <hr className="border-muted" />

          <AppGrid />
        </section>
      </article>
    </main>
  )
}

export const metadata: Metadata = {
  title: "The Home of Decentralized Finance",
  description:
    "Ethereum introduced the world to decentralized finance (DeFi): open financial systems built on smart contracts.",
}
