import React from 'react';

interface SupportContactProps {
  appName?: string;
  title?: string;
  supportEmail?: string;
  version?: string;
  authorName?: string;
  paypalUrl?: string;
}

const SupportContact: React.FC<SupportContactProps> = ({ 
  appName = "Invoicr",
  title = "Support & Contact",
  supportEmail = "40rrafael@gmail.com",
  version = "v1.0",
  authorName = "Rafa Rafael",
  paypalUrl = "https://paypal.me/rafarafael"
}) => {
  return (
    <div className="mt-8 bg-white rounded-lg shadow p-6">
      <div className="border-b border-gray-200 pb-4 mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mr-3">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          {title}
        </h3>
        <p className="text-gray-600 text-sm mt-1">Get help or provide feedback for {appName}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Technical Support */}
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364" />
            </svg>
          </div>
          <h4 className="font-medium text-gray-900 mb-2">Technical Support</h4>
          <p className="text-sm text-gray-600 mb-3">Need help with the extension?</p>
          <a 
            href={`mailto:${supportEmail}?subject=${appName} Support Request`}
            className="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact {appName}
          </a>
        </div>

        {/* Feedback */}
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
          </div>
          <h4 className="font-medium text-gray-900 mb-2">Feedback & Ideas</h4>
          <p className="text-sm text-gray-600 mb-3">Share your thoughts and suggestions</p>
          <a 
            href={`mailto:${supportEmail}?subject=${appName} Feedback`}
            className="inline-flex items-center px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Send Feedback
          </a>
        </div>

        {/* Support Development */}
        <div className="text-center p-4 bg-yellow-50 rounded-lg">
          <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h4 className="font-medium text-gray-900 mb-2">Support Development</h4>
          <p className="text-sm text-gray-600 mb-3">Help keep {appName} free and awesome</p>
          <a 
            href={paypalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-2 bg-yellow-600 text-white text-sm rounded-md hover:bg-yellow-700 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.908 24H2.139c-.235 0-.427-.19-.427-.427 0-.236.19-.427.427-.427h4.769V24zm1.639 0v-.854h6.915c.236 0 .427.19.427.427 0 .236-.19.427-.427.427H8.547zm6.915-.854c.236 0 .427-.19.427-.427V18.67c0-.236-.19-.427-.427-.427s-.427.19-.427.427v4.05c0 .236.19.427.427.427zM12 18.243c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zm0-10.975c2.748 0 4.975 2.227 4.975 4.975S14.748 17.218 12 17.218s-4.975-2.227-4.975-4.975S9.252 7.268 12 7.268z"/>
              <path d="M12 15.358c1.767 0 3.201-1.434 3.201-3.201S13.767 8.956 12 8.956s-3.201 1.434-3.201 3.201 1.434 3.201 3.201 3.201zm0-5.376c1.199 0 2.175.976 2.175 2.175s-.976 2.175-2.175 2.175-2.175-.976-2.175-2.175.976-2.175 2.175-2.175z"/>
            </svg>
            Donate via PayPal
          </a>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-500">
          Made with ❤️ by {authorName} • {appName} {version} • 
          <span className="ml-2">
            <a href={`mailto:${supportEmail}`} className="text-blue-600 hover:text-blue-800">{supportEmail}</a>
          </span>
        </p>
      </div>
    </div>
  );
};

export { SupportContact };
