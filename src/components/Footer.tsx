import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-8 px-5">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-sm">
          &copy; {new Date().getFullYear()} CrowdLink. All rights reserved.
        </div>
        <div className="flex space-x-4">
          <a href="/terms" className="hover:text-gray-400">
            Terms of Use
          </a>
          <a href="/privacy" className="hover:text-gray-400">
            Privacy Policy
          </a>
          <a href="/contact" className="hover:text-gray-400">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
