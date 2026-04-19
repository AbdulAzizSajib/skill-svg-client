const rawSiteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const SITE_URL = rawSiteUrl.replace(/\/$/, "");

export const SITE_NAME = "Stack Symbols";

export const SITE_DESCRIPTION =
    "Free, high-quality tech stack SVG icons for developers and designers. Browse, copy, and embed with no attribution required.";

export const SITE_KEYWORDS = [
    "svg icons",
    "tech stack icons",
    "developer icons",
    "free svg",
    "stack symbols",
    "programming language icons",
    "framework icons",
    "logo svg",
];

export const DEFAULT_OG_IMAGE = "/not-found.svg";
