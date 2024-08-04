import React from "react";
import FlowCommunitiesLogo from "../FlowCommunities.svg"; // Make sure to adjust the import path as needed
import FlowMosaicLogo from "../FlowMosaic.svg"; // Make sure to adjust the import path as needed

function FlowCommunities() {
  const communities = {
    "NBA Top Shot": {
      Discords: [
        { name: "TopShot", link: "https://discord.gg/thAhaMXH" },
        {
          name: "Collectin & Connectin - TopShot Community",
          link: "https://discord.gg/nmZxwV8d",
        },
        {
          name: "Jurassic Pack Discord - DM Twitter for Invite",
          link: "https://x.com/TheJurassicPack",
        },
      ],
      Subreddits: [
        { name: "/r/NBATopShot", link: "https://www.reddit.com/r/NBATopShot" },
      ],
      Podcasts: [
        {
          name: "Badge County Explorer",
          link: "https://topshotexplorer.com/",
          episodes: [
            {
              name: "Apple Podcasts",
              link: "https://podcasts.apple.com/us/podcast/badge-county-an-nba-top-shot-podcast/id1645200613?i=1000618127557",
            },
            {
              name: "Spotify",
              link: "https://open.spotify.com/episode/0NaNtccMhqn2xCWSTKqsLA?si=b220f1d7bcf44f97&nd=1",
            },
          ],
        },
        {
          name: "First Mint",
          link: "https://podcasts.apple.com/ca/podcast/the-first-mint-podcast/id1547852755",
        },
      ],
      Analytics: [
        {
          name: "Livetoken - Tools for NBA Top Shot",
          link: "https://discord.gg/Y5m5WTUn",
        },
        {
          name: "CryptoSlam - Stats for Flow NFT Collections",
          link: "https://cryptoslam.io/",
        },
        {
          name: "TopShot Explorer - Set and Play Explorer",
          link: "https://topshotexplorer.com/",
        },
        {
          name: "OTMNFT - Analytics (Gated by Cost)",
          link: "https://www.otmnft.com/",
        },
      ],
    },
    "NFL All Day": {
      Discords: [{ name: "NFL AD", link: "https://discord.gg/ervCXZMs" }],
      Subreddits: [
        { name: "/r/NFLAllDay", link: "https://www.reddit.com/r/nflallday" },
      ],
      Analytics: [
        {
          name: "OTMNFT - Analytics (Gated by Cost)",
          link: "https://www.otmnft.com/",
        },
      ],
    },
    Marketplaces: {
      Discords: [
        {
          name: "Flowty - Marketplace and Loans",
          link: "https://discord.gg/zAtfkgBN",
        },
        {
          name: "Flowverse - Flow News and Statistics",
          link: "https://discord.gg/96Zv3W9Z",
        },
      ],
    },
    NewsStatistics: {
      Discords: [
        {
          name: "Flowverse - Flow News and Statistics",
          link: "https://discord.gg/96Zv3W9Z",
        },
      ],
    },
    Development: {
      Discords: [
        { name: "DeFi Increment.fi", link: "https://discord.gg/kAywMGfU" },
        { name: "Flow Blockchain", link: "https://discord.gg/flowblockchain" },
        { name: "Developer Academy", link: "https://discord.gg/mX6BsX6g" },
        { name: "FindLabs - Development", link: "https://discord.gg/yxnuvDN6" },
      ],
      Portals: [
        {
          name: "Flow Developer Portal",
          link: "https://developers.flow.com/",
        },
        {
          name: "Flow Blockchain",
          link: "https://flow.com/",
        },
      ],
    },
    Sports: {
      Discords: [{ name: "AFL Mint", link: "https://discord.gg/32jMgSut" }],
    },
    General: {
      Discords: [
        { name: "Dapper Community", link: "https://discord.gg/cVn4ydKH" },
      ],
      Subreddits: [{ name: "/r/Flow", link: "https://www.reddit.com/r/Flow" }],
    },
  };

  return (
    <div className="p-4">
      <div className="bg-gradient-to-r from-purple-900 to-green-500 border border-black p-2 rounded-lg mb-4 flex items-center">
        <img
          src={FlowCommunitiesLogo}
          alt="Flow Communities"
          className="h-10 mr-4"
        />
        <h2 className="text-2xl font-semibold">Flow Communities</h2>
      </div>
      <div className="flex flex-wrap">
        {Object.keys(communities).map((project) => (
          <div key={project} className="w-full mb-8">
            <div className="bg-gradient-to-r from-purple-900 to-green-500 border border-black p-2 rounded-lg mb-4 flex items-center">
              <img
                src={FlowMosaicLogo}
                alt="FlowMosaic"
                className="h-10 mr-4"
              />
              <h3 className="text-xl font-semibold">{project}</h3>
            </div>
            {Object.keys(communities[project]).map((category) => (
              <div key={category} className="mb-6">
                <h4 className="text-lg font-semibold mb-2">{category}</h4>
                <ul className="list-disc ml-4">
                  {communities[project][category].map((item) => (
                    <li key={item.name} className="mb-2">
                      <a
                        href={item.link}
                        className="text-blue-500 hover:text-blue-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.name}
                      </a>
                      {item.episodes && (
                        <ul className="list-circle ml-4 mt-1">
                          {item.episodes.map((episode) => (
                            <li key={episode.name}>
                              <a
                                href={episode.link}
                                className="text-blue-400 hover:text-blue-500 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {episode.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FlowCommunities;
