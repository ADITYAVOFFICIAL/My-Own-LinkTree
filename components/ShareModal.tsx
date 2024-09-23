import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faCheckCircle, faChevronLeft, faChevronRight, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faWhatsapp, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const socialMediaLinks = [
  { name: 'Facebook', icon: faFacebook, handler: 'facebook' },
  { name: 'WhatsApp', icon: faWhatsapp, handler: 'whatsapp' },
  { name: 'LinkedIn', icon: faLinkedin, handler: 'linkedin' },
  { name: 'Email', icon: faPaperPlane, handler: 'email' },
];

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [toastVisible, setToastVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);

  if (!isOpen) return null;

  const handleCopy = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 3000);
    });
  };

  const handleShare = (platform: string) => {
    const currentUrl = encodeURIComponent(window.location.href);
    const message = encodeURIComponent("Check out Aditya Verma's Linktree at ");
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${message} ${currentUrl}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}&title=${message}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=Check this out&body=${message} ${currentUrl}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank');
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % socialMediaLinks.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + socialMediaLinks.length) % socialMediaLinks.length);
  };

  const displayedLinks = [
    socialMediaLinks[(currentIndex + 0) % socialMediaLinks.length],
    socialMediaLinks[(currentIndex + 1) % socialMediaLinks.length],
    socialMediaLinks[(currentIndex + 2) % socialMediaLinks.length],
  ];

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touchCurrentX = e.touches[0].clientX;
    const touchDifference = touchStartX - touchCurrentX;

    if (touchDifference > 50) {
      handleNext(); // Swipe left
    } else if (touchDifference < -50) {
      handlePrev(); // Swipe right
    }
  };

  return (
    <div className="fixed marb inset-0 grid flex items-center justify-center z-50 bg-black bg-opacity-50">
      <motion.div
        className="cardscaler relative flex flex-col items-center rounded-lg border-2 border-white bg-white text-black backdrop-blur-lg p-6 z-50 max-w-md mx-auto transition-transform duration-300 ease-in-out transform hover:scale-105"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={{
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.8 },
        }}
        transition={{ duration: 0.3 }}
        onAnimationComplete={(definition) => {
          if (definition === "exit") {
            onClose();
          }
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <header className="flex w-full items-center justify-between mb-4">
          <h2 className="font-semibold text-lg">Share My Linktree</h2>
          <button
            className="flex justify-center items-center rounded-md p-2 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
            onClick={onClose}
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M13.354 3.354 13.707 3 13 2.293l-.354.353zM2.647 12.647 2.293 13l.707.707.354-.353zm.707-10L3 2.292 2.293 3l.354.354zm9.293 10.707.353.353.707-.707-.353-.354zm0-10.708-10 10 .707.708 10-10zm-10 .708 10 10 .707-.707-10-10z"></path>
            </svg>
          </button>
        </header>
        <motion.div className="mb-4" initial="hidden" animate="visible" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 1 }}>
          <Image width={400} height={150} className="inline-flex rounded-lg object-cover" src="/banner.jpeg" alt="Share Linktree Preview" />
        </motion.div>
        <div className="relative flex items-center w-full mb-4">
          <button onClick={handlePrev} className="absolute left-0 p-2">
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <motion.div
            className="flex justify-center items-center gap-4 w-full transition-all duration-300"
            key={currentIndex} // Ensure the animation is triggered on index change
            initial={{ opacity: 0, x: -2 }} // Initial state for animation
            animate={{ opacity: 1, x: 0 }} // Animate to visible state
            exit={{ opacity: 0, x: 2 }} // Exit animation
            transition={{ duration: 1 }} // Duration for the animations
          >
            {displayedLinks.map((link, index) => (
              <div key={index} className="flex flex-col items-center justify-center gap-2 px-3 py-2 border-2 border-gray-300 bg-white text-black rounded-md cursor-pointer hover:bg-black hover:border-black hover:text-white transition duration-300 ease-in-out" onClick={() => handleShare(link.handler)}>
                <div className="bg-neutral-200 flex h-12 w-12 items-center justify-center rounded-xl">
                  <FontAwesomeIcon icon={link.icon} className="h-6 w-6 text-black" />
                </div>
                <span className="text-xs font-semibold">{link.name}</span>
              </div>
            ))}
          </motion.div>
          <button onClick={handleNext} className="absolute right-0 p-2">
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
        <div className="flex flex-col gap-4 w-full" data-testid="ShareModal-ShareList">
          <button
            className="flex flex-col items-center justify-center gap-2 px-3 py-2 border-2 border-gray-300 bg-white text-black rounded-md hover:bg-black hover:border-black hover:text-white transition duration-300 ease-in-out"
            onClick={handleCopy}
          >
            <div className="bg-neutral-200 flex h-12 w-12 items-center justify-center rounded-xl">
              <FontAwesomeIcon icon={faClipboard} className="h-6 w-6 text-black" />
            </div>
            <span className="text-xs font-semibold">Copy Link</span>
          </button>
        </div>
      </motion.div>
      {toastVisible && (
        <div className="fade fixed bottom-5 left-1/2 transform -translate-x-1/2 p-4 bg-white text-black rounded-lg shadow-md transition-opacity duration-300">
          <FontAwesomeIcon icon={faCheckCircle} className="mr-2 text-black" />Link copied!
        </div>
      )}
    </div>
  );
};

export default ShareModal;
