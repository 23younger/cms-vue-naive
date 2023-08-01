export function createPageLoadingGuard(router) {
  router.beforeEach(() => {
    // to and from are both route objects. must call `next`.
    window.$loadingBar?.start();
  });

  router.afterEach(() => {
    // to and from are both route objects.
    setTimeout(() => {
      window.$loadingBar?.finish();
    }, 200);
  });

  router.onError(() => {
    window.$loadingBar?.error();
  });
}
