import { NextResponse, type NextRequest } from "next/server";
import { isAuthenticatedMiddleware } from "@middlewares/authentication";
import { getConfigs } from "@helpers/getConfigs";
import { getLocalSubdomainOrDomain } from "@helpers/getLocalSubdomainOrDomain";

export const middleware = async (request: NextRequest): Promise<NextResponse> => {
  const { headers, nextUrl } = request;
  const localSubdomainOrDomain = getLocalSubdomainOrDomain(headers);

  if (localSubdomainOrDomain === getConfigs("application").host)
    return NextResponse.redirect(`${getConfigs("application").URLs.www}${nextUrl.pathname}`);

  if (localSubdomainOrDomain === "www") {
    if (nextUrl.pathname.startsWith("/access") || nextUrl.pathname.startsWith("/get-started")) {
      const isAuthenticated = await isAuthenticatedMiddleware(request);
      if (isAuthenticated) return NextResponse.redirect(`${getConfigs("application").URLs.app}`);
    }

    nextUrl.pathname = `/www${nextUrl.pathname}`;
    return NextResponse.rewrite(nextUrl);
  }

  if (localSubdomainOrDomain === "app") {
    const isAuthenticated = await isAuthenticatedMiddleware(request);
    if (!isAuthenticated) return NextResponse.redirect(`${getConfigs("application").URLs.www}/access`);

    nextUrl.pathname = `/app${nextUrl.pathname}`;
    return NextResponse.rewrite(nextUrl);
  }

  if (localSubdomainOrDomain === "api") {
    nextUrl.pathname = `/api${nextUrl.pathname}`;
    return NextResponse.rewrite(nextUrl);
  }

  if (localSubdomainOrDomain === "webhook") {
    nextUrl.pathname = `/webhook${nextUrl.pathname}`;
    return NextResponse.rewrite(nextUrl);
  }

  nextUrl.pathname = `/${localSubdomainOrDomain}${nextUrl.pathname}`;
  return NextResponse.rewrite(nextUrl);
};

interface MiddlewareConfig {
  matcher: string[];
}

export const config: MiddlewareConfig = {
  matcher: ["/((?!_next|images|favicon.ico).*)"]
};
