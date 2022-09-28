import { createPageLoadingGuard } from "./page_loading_guard";
import { createPageTitleGuard } from "./page_title_guard";
import { createPermissionGuard } from "./permission_guard";
import { autoLoginGuard } from "./autoLoginGuard";

export function createGuard(router) {
  autoLoginGuard(router);
  createPageLoadingGuard(router);
  createPermissionGuard(router);
  createPageTitleGuard(router);
}
