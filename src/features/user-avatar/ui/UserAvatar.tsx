import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { type FC, useEffect, useMemo } from "react";

import UserIcon from "@/shared/icons/UserIcon.svg";
import { FILE_LIMITS } from "@/shared/lib/constants";

import { getAvatar } from "../api/getAvatar";

type UserAvatarProps = {
    userId: string | number;
    name: string;
    className?: string;
    size: number;
    avatarKey?: number;
};

export const UserAvatar: FC<UserAvatarProps> = ({
    userId,
    name,
    className,
    size,
    avatarKey = 0,
}) => {
    const { data: avatarBlob } = useQuery({
        queryKey: ["avatar", userId, avatarKey],
        queryFn: () => getAvatar(userId),
        staleTime: FILE_LIMITS.AVATAR.CACHE.STALE_TIME,
        gcTime: FILE_LIMITS.AVATAR.CACHE.GC_TIME,
        enabled: !!userId,
    });

    const avatarUrl = useMemo(() => {
        if (!avatarBlob || !(avatarBlob instanceof Blob)) return null;
        return URL.createObjectURL(avatarBlob);
    }, [avatarBlob]);

    useEffect(() => {
        return () => {
            if (avatarUrl) {
                URL.revokeObjectURL(avatarUrl);
            }
        };
    }, [avatarUrl]);

    if (!userId || !avatarUrl) {
        return <UserIcon width={size} height={size} viewBox="0 0 104 104" />;
    }

    return (
        <Image
            src={avatarUrl}
            alt={`${name} avatar`}
            className={className}
            width={size}
            height={size}
            style={{ objectFit: "cover" }}
            priority
        />
    );
};
