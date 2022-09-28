export function createPageLoadingGuard(router) {
  router.beforeEach(() => {
    // to and from are both route objects. must call `next`.
    window.$loadingBar?.start();
  });

  router.afterEach(() => {
    // to and from are both route objects.
    window.$loadingBar?.finish();
  });

  router.onError(() => {
    window.$loadingBar?.error();
  });
}
