import * as RadixAvatar from "@radix-ui/react-avatar";
import { PersonIcon } from "@radix-ui/react-icons";
import { ReactNode } from "react";
import styles from "./Avatar.module.css";

type AvatarProps = {
  alt: string;
  delayMs?: number;
  fallback?: ReactNode;
  src: string;
};
const Avatar = ({ alt, delayMs, fallback, src }: AvatarProps) => (
  <RadixAvatar.Root className={styles.AvatarRoot}>
    <RadixAvatar.Image className={styles.AvatarImage} src={src} alt={alt} />
    <RadixAvatar.Fallback
      className={styles.AvatarFallback}
      delayMs={delayMs ?? 600}
    >
      {fallback ?? <PersonIcon />}
    </RadixAvatar.Fallback>
  </RadixAvatar.Root>
);

export default Avatar;
