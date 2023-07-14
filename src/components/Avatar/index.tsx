import * as Avatar from "@radix-ui/react-avatar";
import styles from "./Avatar.module.css";

type AvatarProps = {
  alt: string;
  delayMs?: number;
  fallback: string;
  src: string;
};
const AvatarDemo = ({ alt, delayMs, fallback, src }: AvatarProps) => (
  <Avatar.Root className={styles.AvatarRoot}>
    <Avatar.Image className={styles.AvatarImage} src={src} alt={alt} />
    <Avatar.Fallback className={styles.AvatarFallback} delayMs={delayMs || 600}>
      {fallback}
    </Avatar.Fallback>
  </Avatar.Root>
);

export default AvatarDemo;
