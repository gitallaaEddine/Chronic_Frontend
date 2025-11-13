import { useState } from "react";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  FacebookIcon,
  WhatsappIcon,
  XIcon,
} from "react-share";

function ShareContainer({ isOpen, onClose, campaignUrl, campaignTitle }) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(campaignUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* Modal */}
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50 w-full max-w-md p-6"
        role="dialog"
        aria-labelledby="share-title"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2
            id="share-title"
            className="text-2xl font-bold text-secondary"
          >
            Quick share
          </h2>
          <button
            onClick={onClose}
            className="text-secondary/60 hover:text-secondary transition"
            aria-label="Close share dialog"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Copy Link Section */}
        <div className="mb-6">
          <label className="text-sm text-secondary/60 mb-2 block">
            Your unique link
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={campaignUrl}
              readOnly
              className="flex-1 px-4 py-3 border border-secondary/20 rounded-lg bg-secondary/5 text-secondary text-sm focus:outline-none focus:border-primary"
              aria-label="Campaign URL"
            />
            <button
              onClick={handleCopyLink}
              className="px-4 py-3 border border-secondary/20 rounded-lg hover:bg-secondary/5 transition flex items-center gap-2"
              aria-label="Copy link to clipboard"
            >
              {copied ? (
                <>
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm text-green-500">Copied</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5 text-secondary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm text-secondary">Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Social Share Section */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-secondary mb-4">
            Reach more donors by sharing
          </h3>
          <p className="text-sm text-secondary/60 mb-4">
            Share this campaign on your favorite social media platforms
          </p>

          <div className="grid grid-cols-2 gap-3">
            {/* Facebook */}
            <FacebookShareButton
              url={campaignUrl}
              quote={campaignTitle}
              className="flex items-center gap-3 px-4 py-3 border border-secondary/20 rounded-lg hover:bg-secondary/5 transition"
            >
              <FacebookIcon size={32} round />
              <span className="text-secondary font-medium">Facebook</span>
            </FacebookShareButton>

            {/* WhatsApp */}
            <WhatsappShareButton
              url={campaignUrl}
              title={campaignTitle}
              className="flex items-center gap-3 px-4 py-3 border border-secondary/20 rounded-lg hover:bg-secondary/5 transition"
            >
              <WhatsappIcon size={32} round />
              <span className="text-secondary font-medium">WhatsApp</span>
            </WhatsappShareButton>

            {/* X (Twitter) */}
            <TwitterShareButton
              url={campaignUrl}
              title={campaignTitle}
              className="flex items-center gap-3 px-4 py-3 border border-secondary/20 rounded-lg hover:bg-secondary/5 transition"
            >
              <XIcon size={32} round />
              <span className="text-secondary font-medium">X</span>
            </TwitterShareButton>

            {/* Instagram - Opens in new tab since no direct share API */}
            <button
              onClick={() => {
                window.open("https://www.instagram.com/", "_blank");
              }}
              className="flex items-center gap-3 px-4 py-3 border border-secondary/20 rounded-lg hover:bg-secondary/5 transition"
              aria-label="Share on Instagram"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
              <span className="text-secondary font-medium">Instagram</span>
            </button>

            {/* TikTok - Opens in new tab since no direct share API */}
            <button
              onClick={() => {
                window.open("https://www.tiktok.com/", "_blank");
              }}
              className="flex items-center gap-3 px-4 py-3 border border-secondary/20 rounded-lg hover:bg-secondary/5 transition"
              aria-label="Share on TikTok"
            >
              <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                </svg>
              </div>
              <span className="text-secondary font-medium">TikTok</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShareContainer;