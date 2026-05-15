import {
  RiFacebookFill,
  RiGithubFill,
  RiInstagramLine,
  RiLinkedinFill,
  RiYoutubeLine,
} from 'react-icons/ri';
import type { IconType } from 'react-icons';

function XIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export type SocialPlatform =
  | 'twitter'
  | 'linkedin'
  | 'github'
  | 'instagram'
  | 'facebook'
  | 'youtube';

export const SOCIAL_ICONS: Record<SocialPlatform, IconType | typeof XIcon> = {
  twitter: XIcon,
  linkedin: RiLinkedinFill,
  github: RiGithubFill,
  instagram: RiInstagramLine,
  facebook: RiFacebookFill,
  youtube: RiYoutubeLine,
};
