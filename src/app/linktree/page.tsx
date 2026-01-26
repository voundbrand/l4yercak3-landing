'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { Background } from '@/components/background';
import { useLanguage } from '@/components/language-provider';
import { cn } from '@/lib/utils';

// YouTube video ID for the GTM masterclass
const YOUTUBE_VIDEO_ID = "LY4tOG9K69Q";

// Video Modal Component
function VideoModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors"
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <iframe
            src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0`}
            title="L4YERCAK3 Introduction"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Icons
const CommunityIcon = () => (
  <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PlatformIcon = () => (
  <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DesktopIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BoltIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Tech stack icons
const TechIcons: Record<string, React.ReactNode> = {
  react: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"/>
    </svg>
  ),
  tauri: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.912 0c-2.267 0-4.453.905-6.062 2.514a8.59 8.59 0 0 0-2.506 5.553 6.085 6.085 0 0 0-2.077 1.97A6.132 6.132 0 0 0 2.25 14.08a6.09 6.09 0 0 0 .883 3.15 6.085 6.085 0 0 0 2.077 1.97 8.59 8.59 0 0 0 2.506 5.553A8.571 8.571 0 0 0 13.778 27.27h.027a8.571 8.571 0 0 0 6.062-2.514 8.59 8.59 0 0 0 2.506-5.553 6.085 6.085 0 0 0 2.077-1.97 6.132 6.132 0 0 0 1.017-4.043 6.09 6.09 0 0 0-.883-3.15 6.085 6.085 0 0 0-2.077-1.97 8.59 8.59 0 0 0-2.506-5.553A8.571 8.571 0 0 0 13.939 0h-.027zm.027 2.514c1.68 0 3.293.668 4.48 1.856a6.352 6.352 0 0 1 1.856 4.48c0 .11-.004.22-.012.328a6.09 6.09 0 0 0-2.975-.777h-.027a6.085 6.085 0 0 0-4.282 1.777 6.132 6.132 0 0 0-1.777 4.282v.027c0 1.08.281 2.14.817 3.078a6.352 6.352 0 0 1-4.168-1.684 6.352 6.352 0 0 1-1.856-4.48c0-.11.004-.22.012-.328a6.09 6.09 0 0 0 2.975.777h.027a6.085 6.085 0 0 0 4.282-1.777 6.132 6.132 0 0 0 1.777-4.282v-.027a6.09 6.09 0 0 0-.817-3.078 6.352 6.352 0 0 1 3.688 1.512v.316zm-3.851 7.598a3.618 3.618 0 0 1 1.05 2.56v.016a3.6 3.6 0 0 1-1.05 2.543 3.6 3.6 0 0 1-2.543 1.05h-.016a3.618 3.618 0 0 1-2.56-1.05 3.6 3.6 0 0 1-1.05-2.543v-.016a3.618 3.618 0 0 1 1.05-2.56 3.6 3.6 0 0 1 2.543-1.05h.016a3.618 3.618 0 0 1 2.56 1.05zm7.824 3.969a3.618 3.618 0 0 1 1.05 2.56v.016a3.6 3.6 0 0 1-1.05 2.543 3.6 3.6 0 0 1-2.543 1.05h-.016a3.618 3.618 0 0 1-2.56-1.05 3.6 3.6 0 0 1-1.05-2.543v-.016a3.618 3.618 0 0 1 1.05-2.56 3.6 3.6 0 0 1 2.543-1.05h.016a3.618 3.618 0 0 1 2.56 1.05z" transform="scale(0.889)"/>
    </svg>
  ),
  vite: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="m8.286 10.578.512-8.657a.306.306 0 0 1 .247-.282L17.377.006a.306.306 0 0 1 .353.385l-1.558 5.403a.306.306 0 0 0 .352.385l2.388-.46a.306.306 0 0 1 .332.438l-6.79 13.55-.123.19a.294.294 0 0 1-.252.14c-.177 0-.35-.152-.305-.369l1.095-5.301a.306.306 0 0 0-.388-.355l-1.433.435a.306.306 0 0 1-.389-.354l.69-3.375a.306.306 0 0 0-.37-.36l-2.32.536a.306.306 0 0 1-.374-.316zm14.976-7.926L17.284 3.74l-.544 1.887 2.077-.4a.8.8 0 0 1 .84.369.8.8 0 0 1 .034.783L12.9 19.93l-.013.025-.015.023-.122.19a.801.801 0 0 1-.672.37.826.826 0 0 1-.634-.302.8.8 0 0 1-.16-.67l1.029-4.981-1.12.34a.81.81 0 0 1-.86-.262.802.802 0 0 1-.165-.67l.63-3.08-2.027.468a.808.808 0 0 1-.768-.233.81.81 0 0 1-.217-.6l.389-6.57-7.44-1.33a.612.612 0 0 0-.64.906L11.58 23.691a.612.612 0 0 0 1.066-.004l11.26-20.135a.612.612 0 0 0-.644-.9z"/>
    </svg>
  ),
  tailwind: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
    </svg>
  ),
  expo: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 20.084c.043.53.23 1.063.718 1.778.58.849 1.576 1.315 2.303.567.49-.505 5.794-9.776 8.35-13.29a.761.761 0 0 1 1.258 0c2.556 3.514 7.86 12.785 8.35 13.29.727.748 1.723.282 2.303-.567.57-.835.728-1.42.728-2.063 0-.426-8.26-15.207-9.013-16.449-.718-1.186-1.063-1.426-2.497-1.426s-1.78.24-2.497 1.426C9.26 4.593 1 19.374 1 19.8c0 .095-.003.19-.007.284H0z"/>
    </svg>
  ),
  typescript: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
    </svg>
  ),
};

const freeResources = [
  {
    id: 'layer-cake-systems',
    title: 'Layer Cake Systems',
    description: 'Go-to-market framework: ICP, Git, AI, storytelling & community.',
    repoHref: 'https://github.com/voundbrand/l4yercak3-systems',
    videoHref: 'https://youtu.be/LY4tOG9K69Q',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const boilerplates = [
  {
    id: 'getposted',
    title: 'GetPosted',
    description: 'Content tracking command center.',
    href: 'https://buy.polar.sh/polar_cl_NQt8HVWkCJALbX27SqdU4QfO8BIZti7qJhTVL1HisQV',
    price: 'Desktop App',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    techStack: ['react', 'typescript', 'vite', 'tailwind', 'tauri'] as const,
  },
  {
    id: 'atheon',
    title: 'Atheon',
    description: 'Speed-first workout tracker.',
    href: 'https://buy.polar.sh/polar_cl_Wg3IUOO3tqo0EVAx9LESYc0LwSUbDlA2IZGVr4Kzz7O',
    price: 'Expo RN',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    techStack: ['expo', 'react', 'typescript'] as const,
  },
];

const socials = [
  {
    id: 'twitter',
    href: 'https://x.com/notcleverhandle',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    label: 'X',
  },
  {
    id: 'linkedin',
    href: 'https://www.linkedin.com/in/therealremington/',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    label: 'LinkedIn',
  },
  {
    id: 'github',
    href: 'https://github.com/voundbrand',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
    label: 'GitHub',
  },
  {
    id: 'instagram',
    href: 'https://www.instagram.com/therealremington/',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
      </svg>
    ),
    label: 'Instagram',
  },
  {
    id: 'youtube',
    href: 'https://www.youtube.com/@therealremington',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    label: 'YouTube',
  },
];

export default function LinktreePage() {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const boilerplates = [
    {
      id: 'getposted',
      title: t('landing.linktree.boilerplates.getposted.title'),
      description: t('landing.linktree.boilerplates.getposted.description'),
      href: 'https://buy.polar.sh/polar_cl_NQt8HVWkCJALbX27SqdU4QfO8BIZti7qJhTVL1HisQV',
      price: t('landing.linktree.boilerplates.getposted.price'),
      icon: <DesktopIcon />,
      techStack: ['react', 'typescript', 'vite', 'tailwind', 'tauri'] as const,
    },
    {
      id: 'atheon',
      title: t('landing.linktree.boilerplates.atheon.title'),
      description: t('landing.linktree.boilerplates.atheon.description'),
      href: 'https://buy.polar.sh/polar_cl_Wg3IUOO3tqo0EVAx9LESYc0LwSUbDlA2IZGVr4Kzz7O',
      price: t('landing.linktree.boilerplates.atheon.price'),
      icon: <BoltIcon />,
      techStack: ['expo', 'react', 'typescript'] as const,
    },
  ];

  return (
    <main className="min-h-[100dvh] w-full relative overflow-x-hidden">
      <Background
        src="/layercake-bg.png"
        placeholder="/layercake-bg.png"
      />

      {/* Video Modal */}
      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />

      {/* Language Toggle - Top Left */}
      <div className="absolute top-4 md:top-6 left-4 md:left-6 z-20">
        <div className="flex items-center gap-1 p-1 rounded-full bg-white/10 backdrop-blur-sm">
          <button
            onClick={() => setLanguage('en')}
            className={cn(
              "px-2 py-1 rounded-full text-xs font-semibold transition-all duration-200",
              language === 'en'
                ? "bg-white/20 text-white"
                : "text-white/60 hover:text-white/80"
            )}
            aria-label={t('navigation.switchToEnglish')}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('de')}
            className={cn(
              "px-2 py-1 rounded-full text-xs font-semibold transition-all duration-200",
              language === 'de'
                ? "bg-white/20 text-white"
                : "text-white/60 hover:text-white/80"
            )}
            aria-label={t('navigation.switchToGerman')}
          >
            DE
          </button>
        </div>
      </div>

      {/* Safe area container with proper mobile padding */}
      <div className="relative z-10 min-h-[100dvh] flex flex-col items-center px-5 py-8 pb-safe sm:px-6 sm:py-12 md:py-16">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 sm:mb-8"
        >
          {/* Avatar */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4 rounded-full overflow-hidden border-2 border-white/30 shadow-lg shadow-black/20">
            <Image
              src="/Rem Profile Square 300.png"
              alt="Remington"
              width={96}
              height={96}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          {/* Headline */}
          <h1 className="font-serif text-xl sm:text-2xl md:text-3xl italic text-white mb-1.5 sm:mb-2 px-2">
            {t('landing.linktree.headline')}
          </h1>
          <p className="text-white/70 text-xs sm:text-sm md:text-base max-w-[280px] sm:max-w-sm mx-auto leading-relaxed">
            {t('landing.linktree.tagline')}
          </p>
        </motion.div>

        {/* Main Links */}
        <div className="w-full max-w-md space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
          {/* Community Link */}
          <motion.a
            href="https://www.skool.com/l4yercak3/about"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="block w-full p-3.5 sm:p-4 rounded-2xl backdrop-blur-md border transition-all duration-300 active:scale-[0.98] bg-white/15 border-white/30 hover:bg-white/25 hover:border-white/50"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-primary/30 text-white">
                <CommunityIcon />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-semibold text-white text-sm sm:text-base">
                    {t('landing.linktree.links.community.title')}
                  </h2>
                  <span className="px-2 py-0.5 bg-green-500/40 text-white text-[10px] sm:text-xs rounded-full font-medium">
                    {t('landing.linktree.links.community.badge')}
                  </span>
                </div>
                <p className="text-white/60 text-xs sm:text-sm truncate">
                  {t('landing.linktree.links.community.description')}
                </p>
              </div>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white/40 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </motion.a>

          {/* Platform Link */}
          <motion.a
            href="https://app.l4yercak3.com"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="block w-full p-3.5 sm:p-4 rounded-2xl backdrop-blur-md border transition-all duration-300 active:scale-[0.98] bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/40"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-white/10 text-white/80">
                <PlatformIcon />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-white text-sm sm:text-base">
                  {t('landing.linktree.links.platform.title')}
                </h2>
                <p className="text-white/60 text-xs sm:text-sm truncate">
                  {t('landing.linktree.links.platform.description')}
                </p>
              </div>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white/40 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </motion.a>
        </div>

        {/* Free Resources Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="w-full max-w-md mb-6 sm:mb-8"
        >
          <h3 className="text-white/50 text-[10px] sm:text-xs uppercase tracking-wider text-center mb-2.5 sm:mb-3">
            Free Resources
          </h3>
          <div className="space-y-2.5 sm:space-y-3">
            {freeResources.map((item) => (
              <div
                key={item.id}
                className="p-3.5 sm:p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-green-500/20 flex items-center justify-center text-green-400 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-white text-sm sm:text-base">{item.title}</h3>
                      <span className="px-2 py-0.5 bg-green-500/40 text-white text-[10px] sm:text-xs rounded-full font-medium">
                        Free
                      </span>
                    </div>
                    <p className="text-white/60 text-xs sm:text-sm mb-3">{item.description}</p>
                    <div className="flex items-center gap-2">
                      <a
                        href={item.repoHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white/80 hover:text-white text-xs sm:text-sm transition-all duration-300 active:scale-[0.98]"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                        </svg>
                        Repo
                      </a>
                      <a
                        href={item.videoHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 hover:border-red-500/50 text-white/80 hover:text-white text-xs sm:text-sm transition-all duration-300 active:scale-[0.98]"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                        Watch
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Boilerplates Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.45 }}
          className="w-full max-w-md mb-6 sm:mb-8"
        >
          <h3 className="text-white/50 text-[10px] sm:text-xs uppercase tracking-wider text-center mb-2.5 sm:mb-3">
            {t('landing.linktree.sections.boilerplates')}
          </h3>
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            {boilerplates.map((item) => (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 sm:p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md hover:bg-white/20 hover:border-white/40 transition-all duration-300 group active:scale-[0.98] cursor-pointer"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/10 flex items-center justify-center text-white/70 mb-2 sm:mb-3 group-hover:bg-white/20 transition-colors">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-white text-xs sm:text-sm mb-0.5 sm:mb-1">{item.title}</h3>
                <p className="text-white/50 text-[10px] sm:text-xs line-clamp-2 leading-relaxed">{item.description}</p>
                {/* Tech stack icons */}
                <div className="mt-2 sm:mt-3 flex items-center gap-1.5">
                  {item.techStack.map((tech) => (
                    <span key={tech} className="text-white/40 group-hover:text-white/60 transition-colors">
                      {TechIcons[tech]}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.55 }}
          className="flex items-center justify-center gap-3 sm:gap-4"
        >
          {socials.map((social) => (
            <a
              key={social.id}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 sm:w-10 sm:h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white hover:border-white/40 transition-all duration-300 active:scale-95"
              aria-label={social.label}
            >
              {social.icon}
            </a>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.65 }}
          className="mt-auto pt-8 sm:pt-12"
        >
          <Link
            href="/"
            className="text-white/40 text-[10px] sm:text-xs hover:text-white/60 transition-colors"
          >
            l4yercak3.com
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
