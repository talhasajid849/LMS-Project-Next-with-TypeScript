import type { StaticImageData } from "next/image";

type AvatarValue =
  | string
  | {
      url?: string | null;
    }
  | null
  | undefined;

export const getAvatarSrc = (
  avatar: AvatarValue,
  fallback: StaticImageData
): string | StaticImageData => {
  if (typeof avatar === "string") {
    const trimmedAvatar = avatar.trim();
    return trimmedAvatar ? trimmedAvatar : fallback;
  }

  if (avatar?.url) {
    const trimmedAvatarUrl = avatar.url.trim();
    return trimmedAvatarUrl ? trimmedAvatarUrl : fallback;
  }

  return fallback;
};
