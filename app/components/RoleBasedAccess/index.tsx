"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface RoleBasedAccessProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

export default function RoleBasedAccess({
  allowedRoles,
  children,
}: RoleBasedAccessProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      const userRoles = session?.user?.roles;
      const hasAllowedRole = Array.isArray(userRoles)
        ? userRoles.some((role) => allowedRoles.includes(role))
        : allowedRoles.includes(userRoles as string);

      if (!hasAllowedRole) {
        router.push("/unauthorized");
      } else {
        setIsAuthorized(true);
      }
    }
  }, [status, session, router, allowedRoles]);

  if (status === "loading" || !isAuthorized) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
