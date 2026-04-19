import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/admin",
                    "/admin/",
                    "/login",
                    "/register",
                    "/verify-email",
                    "/reset-password",
                    "/forgot-password",
                    "/change-password",
                    "/my-profile",
                    "/dashboard",
                    "/api/",
                ],
            },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    };
}
