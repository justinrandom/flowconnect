import React from "react";
import FlowLogo from "../flow.svg";
import OpenAILogo from "../openai.svg";

function Footer() {
  return (
    <footer className="bg-slate-800 text-white relative bottom-0 left-0 w-full">
      <div className="flex items-center justify-center py-4">
        <div className="flex items-center px-4">
          <a
            href="https://www.onflow.org/"
            aria-label="Flow logo"
            className="flex items-center"
          >
            <img src={FlowLogo} alt="Flow logo" className="h-16 mr-2" />
          </a>
          <div className="flex flex-col">
            <span className="text-sm">Built on</span>
            <span className="text-xl font-bold">flow</span>
          </div>
        </div>
        <div className="flex flex-col items-center px-4">
          <span className="text-sm">Powered by</span>
          <a
            href="https://openai.com/"
            aria-label="OpenAI logo"
            className="mt-1"
          >
            <img src={OpenAILogo} alt="OpenAI logo" className="h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
