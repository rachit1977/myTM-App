import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const PUBLIC_PATHS = [
  "/login",
  "/signup",
  "/forgot-password",
  "/api/auth",
  "/api/signup",
  "/_next",
  "/favicon.ico",
  "/icon.png",
  "/apple-icon.png",
  "/manifest.webmanifest",
];

const PUBLIC_FILE = /\.(png|jpg|jpeg|svg|gif|webp|ico|webmanifest|txt)$/i;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Always allow public paths and static files
  if (
    PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/")) ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Root redirects to login (handled by app/page.tsx already, but covered here too)
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // On HTTPS deployments NextAuth writes the session cookie with the
  // `__Secure-` prefix — pass secureCookie so getToken looks for the
  // right name. Without this, middleware can't read the JWT and every
  // request would redirect to /login even for authenticated users.
  const secureCookie =
    req.nextUrl.protocol === "https:" ||
    process.env.NEXTAUTH_URL?.startsWith("https://") === true;
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie,
  });

  // Token must exist AND carry a real user id from authorize()
  const uid = (token as { uid?: unknown } | null)?.uid;
  if (!token || typeof uid !== "string" || uid.length === 0) {
    const url = new URL("/login", req.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
