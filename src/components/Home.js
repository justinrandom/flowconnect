import React from "react";

function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow p-4">
        <h2 className="text-2xl font-semibold mb-4">Welcome to FlowConnect!</h2>
        <div>
          <p className="text-xl">
            This is the home page. Navigate to the Mosaic Portal to start
            exploring.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
