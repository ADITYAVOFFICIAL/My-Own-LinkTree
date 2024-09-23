"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAws, faLinkedin, faMedium, faGithub, faMicrosoft } from "@fortawesome/free-brands-svg-icons";
import { faFire, faLink } from "@fortawesome/free-solid-svg-icons"; // Import fire and link icons
import { SiCodeforces, SiLeetcode } from "react-icons/si"; // Import specific icons from react-icons

interface SocialCardProps {
  platform: string;
  url: string;
}

const SocialCard: React.FC<SocialCardProps> = ({ platform, url }) => {
  const getIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "aws community":
        return <FontAwesomeIcon icon={faAws} size="2x" />;
      case "linkedin":
        return <FontAwesomeIcon icon={faLinkedin} size="2x" />;
      case "medium":
        return <FontAwesomeIcon icon={faMedium} size="2x" />;
      case "leetcode":
        return <SiLeetcode size="2em" />; // Use specific icon for Leetcode
      case "codeforces":
        return <SiCodeforces size="2em" />; // Use specific icon for Codeforces
      case "portfolio website":
        return <FontAwesomeIcon icon={faFire} size="2x" />;
      case "github":
        return <FontAwesomeIcon icon={faGithub} size="2x" />;
      case "microsoft learn":
        return <FontAwesomeIcon icon={faMicrosoft} size="2x" />;
      default:
        return <FontAwesomeIcon icon={faLink} size="2x" />; // Fallback icon
    }
  };

  return (
    <div className="social-card grid-cols-5 marginer relative group w-64 p-4 border-2 border-white bg-white text-black rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:bg-transparent hover:text-white hover:border-white hover:shadow-lg hover:shadow-white/50">
      <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center">
        <div className="h-10 w-10 flex justify-center items-center rounded-full transition duration-300 ease-in-out group-hover:bg-transparent">
          {getIcon(platform)} {/* Render the icon dynamically */}
        </div>
        <p className="ml-4 text-lg font-medium transition duration-0 ease-in-out group-hover:text-white">{platform}</p>
      </a>
    </div>
  );
};

const SocialLinks: React.FC = () => {
  const links = [
    { platform: "AWS Community", url: "https://community.aws/@adityaver" },
    { platform: "Microsoft Learn", url: "https://learn.microsoft.com/users/adityaverma-9520/?wt.mc_id=studentamb_375369" },
    { platform: "Github", url: "https://github.com/ADITYAVOFFICIAL/" },
    { platform: "Linkedin", url: "https://www.linkedin.com/in/adityave/" },
    { platform: "Portfolio Website", url: "https://adityaver.vercel.app/" },
    { platform: "Medium", url: "https://medium.com/@adityaver" },
    { platform: "Leetcode", url: "https://leetcode.com/adityaver" },
    { platform: "CodeForces", url: "https://codeforces.com/profile/adityaver" },
  ];

  return (
    <div className="flex flex-wrap justify-center lg:gap-4 md:gap-0 sm:gap-0 md:grid md:grid-cols-2 lg:grid-cols-4">
      {links.map((link) => (
        <SocialCard key={link.platform} platform={link.platform} url={link.url} />
      ))}
    </div>
  );
};

export default SocialLinks;
