import { isAuthenticatedMiddleware } from "middlewares";
import { getLocalSubdomainOrDomain } from "helpers";
import { NextResponse, type NextRequest } from "next/server";
import { getSettings } from "settings";

export const middleware = async (request: NextRequest): Promise<NextResponse> => {
  const { pathname } = request.nextUrl;
  const { headers, nextUrl } = request;
  const localSubdomainOrDomain = getLocalSubdomainOrDomain(headers);

  if (localSubdomainOrDomain === getSettings("application").host)
    return NextResponse.redirect(`${getSettings("application").URLs.www}${pathname}`);

  if (localSubdomainOrDomain === "www") {
    if (pathname.startsWith("/access") || pathname.startsWith("/get-started")) {
      const isAuthenticated = await isAuthenticatedMiddleware(request);
      if (isAuthenticated) return NextResponse.redirect(`${getSettings("application").URLs.app}`);
    }

    nextUrl.pathname = `/www${pathname}`;
    return NextResponse.rewrite(nextUrl);
  }

  if (localSubdomainOrDomain === "app") {
    const isAuthenticated = await isAuthenticatedMiddleware(request);
    if (!isAuthenticated) return NextResponse.redirect(`${getSettings("application").URLs.www}/access`);

    nextUrl.pathname = `/app${pathname}`;
    return NextResponse.rewrite(nextUrl);
  }

  if (localSubdomainOrDomain === "api") {
    nextUrl.pathname = `/api${pathname}`;
    return NextResponse.rewrite(nextUrl);
  }

  nextUrl.pathname = `/${localSubdomainOrDomain}${pathname}`;
  return NextResponse.rewrite(nextUrl);
};

interface MiddlewareConfig {
  matcher: string[];
}

export const config: MiddlewareConfig = {
  matcher: ["/((?!_next|images|favicon.ico).*)"]
};
