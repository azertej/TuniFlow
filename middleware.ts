import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/ask-question(.*)"]);
const isPublicRoute = createRouteMatcher(["/", "/api/webhooks", "/question/:id","/tags","/tags/:id","/profile/:id","/community","/jobs"]);
const isIgnoredRoute = createRouteMatcher(["/api/webhooks", "/api/chatgbt"]);
export default clerkMiddleware((auth, req) => {
  if(isIgnoredRoute(req)){
    return
  }
  if (!isPublicRoute(req) && isProtectedRoute(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};