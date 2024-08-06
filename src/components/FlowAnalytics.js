import React, { useEffect, useState } from "react";
import FlowAnalyticsLogo from "../FlowAnalytics.svg"; // Make sure to adjust the import path as needed
import FlowMosaicLogo from "../FlowMosaic.svg"; // Make sure to adjust the import path as needed
import { fetchListingsSummary } from "../flow/analyticsscripts"; // Adjust the import path as needed

function FlowAnalytics() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchListingsSummary();
      setSummary(data);
    }
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <div className="bg-gradient-to-r from-purple-900 to-green-500 border border-black p-2 rounded-lg mb-4 flex items-center">
        <img
          src={FlowAnalyticsLogo}
          alt="Flow Analytics"
          className="h-10 mr-4"
        />
        <h2 className="text-2xl font-semibold">Flow Analytics</h2>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full mb-8">
          <div className="bg-gradient-to-r from-purple-900 to-green-500 border border-black p-2 rounded-lg mb-4 flex items-center">
            <img src={FlowMosaicLogo} alt="FlowMosaic" className="h-10 mr-4" />
            <h3 className="text-xl font-semibold">Price Summary</h3>
          </div>
          {summary ? (
            <div className="mb-6">
              <ul className="list-disc ml-4">
                {Object.keys(summary).map((key) =>
                  key !== "Listings Per Storefront" ? (
                    <li key={key} className="mb-2">
                      <span className="text-blue-500">{`${key}: ${summary[key]} listings`}</span>
                    </li>
                  ) : null
                )}
              </ul>
              <h3 className="text-xl font-semibold mt-4">
                Listings Per Storefront
              </h3>
              <ul className="list-disc ml-4">
                {summary["Listings Per Storefront"] &&
                  Object.keys(summary["Listings Per Storefront"]).map(
                    (address) => (
                      <li key={address} className="mb-2">
                        <span className="text-blue-500">{`${address}: ${summary["Listings Per Storefront"][address]} listings`}</span>
                      </li>
                    )
                  )}
              </ul>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default FlowAnalytics;
