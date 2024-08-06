const fcl = require("@onflow/fcl");
const t = require("@onflow/types");

const fetchListingsScript = (storefrontAddress) => `
import NFTStorefrontV2 from 0x3cdbb3d569211ff3

pub fun main(): [{String: AnyStruct}] {
    let storefrontAddress: Address = ${storefrontAddress}
    let priceCriteria = [
        0.30,
        0.60,
        0.90,
        1.20,
        5.00,
        20.00,
        100.00,
        500.00,
        2000.00
    ] as [UFix64]

    let storefront = getAccount(storefrontAddress)
        .getCapability<&NFTStorefrontV2.Storefront{NFTStorefrontV2.StorefrontPublic}>(
            NFTStorefrontV2.StorefrontPublicPath
        )
        .borrow()
        ?? panic("Could not borrow Storefront from provided address")

    let listingIDs = storefront.getListingIDs()
    var listings: [{String: AnyStruct}] = []

    for listingID in listingIDs {
        let listing = storefront.borrowListing(listingResourceID: listingID)
            ?? panic("Could not borrow listing with ID: ".concat(listingID.toString()))

        let details = listing.getDetails()

        for price in priceCriteria {
            if details.salePrice <= price {
                listings.append({
                    "priceCriteria": price,
                    "listing": details
                })
                break
            }
        }

        if details.salePrice > 2000.00 {
            listings.append({
                "priceCriteria": 2001.00,
                "listing": details
            })
        }
    }

    return listings
}
`;

const storefrontAddresses = [
  "0x1adda8b67f032725",
  "0xf6a7c01b3ab1e048",
  "0x6d98bea6a815ed9e",
  "0xa53983fe32592ca9",
  "0xc14a8aabf4856105",
  "0xac3aa282a41abebc",
  // "0x1e3eafa1edf66f72",
  // "0xbe9c633840e40df3",
  //  "0x3cdbb3d569211ff3",
  // "0xa93445435d83a4a9",
  // "0x536319d7c0a35e41",
  // "0xd4d92c832da9ca5e",
  // "0x17d96d0407d94193",
  // "0xb4c92cec57e4c86c",
  //"0x0d9e8f259ee27033",
  // "0xc14a8aabf4856105",
];

async function fetchListingsSummary() {
  const summary = {
    "Under $0.30": 0,
    "$0.30 - $0.60": 0,
    "$0.60 - $0.90": 0,
    "$0.90 - $1.20": 0,
    "$1.20 - $5.00": 0,
    "$5.00 - $20.00": 0,
    "$20.00 - $100.00": 0,
    "$100.00 - $500.00": 0,
    "$500.00 - $2000.00": 0,
    "$2000.00 and above": 0,
    "Total Listings": 0,
    "Listings Per Storefront": {},
  };

  for (const address of storefrontAddresses) {
    const response = await fcl.query({
      cadence: fetchListingsScript(address),
    });

    const listingsCount = response.length;
    summary["Listings Per Storefront"][address] = listingsCount;

    response.forEach((item) => {
      const price = parseFloat(item.priceCriteria);

      if (price <= 0.3) {
        summary["Under $0.30"] += 1;
      } else if (price <= 0.6) {
        summary["$0.30 - $0.60"] += 1;
      } else if (price <= 0.9) {
        summary["$0.60 - $0.90"] += 1;
      } else if (price <= 1.2) {
        summary["$0.90 - $1.20"] += 1;
      } else if (price <= 5.0) {
        summary["$1.20 - $5.00"] += 1;
      } else if (price <= 20.0) {
        summary["$5.00 - $20.00"] += 1;
      } else if (price <= 100.0) {
        summary["$20.00 - $100.00"] += 1;
      } else if (price <= 500.0) {
        summary["$100.00 - $500.00"] += 1;
      } else if (price <= 2000.0) {
        summary["$500.00 - $2000.00"] += 1;
      } else {
        summary["$2000.00 and above"] += 1;
      }
    });

    summary["Total Listings"] += listingsCount;
  }

  return summary;
}

module.exports = { fetchListingsSummary };
