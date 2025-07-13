import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-10 pt-10 pb-6 px-4 md:px-16 text-black w-full">
      {/* About Us Section - centered and separated */}
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center mb-10 px-2">
        <h2 className="text-3xl font-bold mb-3">About Us</h2>
        <p className="text-gray-700 text-base leading-relaxed max-w-2xl">
          <span className="font-semibold">Business Nexus®</span> is a modern business networking platform connecting entrepreneurs and investors for collaboration, mentorship, and growth. Our mission is to empower startups and investors to build meaningful partnerships and drive innovation. We provide secure messaging, role-based dashboards, and a seamless experience for all users.
        </p>
        <div className="mt-3 text-xs text-gray-400">&copy; {new Date().getFullYear()} Business Nexus. All rights reserved.</div>
      </div>
      {/* Divider */}
      <div className="w-full border-t border-gray-200 mb-8"></div>
      {/* Footer Links Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Company Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Company</h3>
          <ul className="space-y-1 text-sm">
            <li className="hover:text-black cursor-pointer transition-colors">About</li>
            <li className="hover:text-black cursor-pointer transition-colors">Careers</li>
            <li className="hover:text-black cursor-pointer transition-colors">Press</li>
            <li className="hover:text-black cursor-pointer transition-colors">Blog</li>
          </ul>
        </div>
        {/* Contact Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact</h3>
          <ul className="space-y-1 text-sm">
            <li className="hover:text-black cursor-pointer transition-colors">Support</li>
            <li className="hover:text-black cursor-pointer transition-colors">Email: <a href="mailto:support@businessnexus.com" className="underline">support@businessnexus.com</a></li>
            <li className="hover:text-black cursor-pointer transition-colors">GitHub: <a href="https://github.com/hussnainali17/Nexus" target="_blank" rel="noopener noreferrer" className="underline">Nexus</a></li>
            <li className="hover:text-black cursor-pointer transition-colors">LinkedIn</li>
          </ul>
        </div>
        {/* Legal Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Legal</h3>
          <ul className="space-y-1 text-sm">
            <li className="hover:text-black cursor-pointer transition-colors">Terms</li>
            <li className="hover:text-black cursor-pointer transition-colors">Privacy</li>
            <li className="hover:text-black cursor-pointer transition-colors">Cookies</li>
            <li className="hover:text-black cursor-pointer transition-colors">Security</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer