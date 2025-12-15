import { createMemoryHistory } from "@tanstack/history";
import { json, mergeHeaders } from "@tanstack/router-core/ssr/client";
import { trimPathRight, getLocationChangeInfo, handleHashScroll, isNotFound, defaultGetScrollRestorationKey, restoreScroll, storageKey, rootRouteId, createControlledPromise, isRedirect, defaultSerovalPlugins, makeSerovalPlugin, createSerializationAdapter, isResolvedRedirect, executeRewriteInput, makeSsrSerovalPlugin } from "@tanstack/router-core";
import { getOrigin, attachRouterServerSsrUtils, transformReadableStreamWithRouter, defineHandlerCallback } from "@tanstack/router-core/ssr/server";
import { AsyncLocalStorage } from "node:async_hooks";
import { H3Event, toResponse } from "h3-v2";
import invariant from "tiny-invariant";
import { fromJSON, toCrossJSONStream, toCrossJSONAsync } from "seroval";
import * as Solid$1 from "solid-js/web";
import { createComponent, Dynamic, ssr, ssrHydrationKey, ssrStyleProperty, escape, ssrAttribute, mergeProps } from "solid-js/web";
import * as Solid from "solid-js";
import { createSignal, onCleanup } from "solid-js";
import warning from "tiny-warning";
import { isbot } from "isbot";
var _tmpl$$2 = ["<div", ' style="', '"><div style="', '"><strong style="', '">Something went wrong!</strong><button style="', '">', '</button></div><div style="', '"></div><!--$-->', "<!--/--></div>"], _tmpl$2 = ["<div", '><pre style="', '">', "</pre></div>"], _tmpl$3 = ["<code", ">", "</code>"];
function CatchBoundary(props) {
  return createComponent(Solid.ErrorBoundary, {
    fallback: (error, reset) => {
      var _a;
      (_a = props.onCatch) == null ? void 0 : _a.call(props, error);
      Solid.createEffect(Solid.on([props.getResetKey], () => reset(), {
        defer: true
      }));
      return createComponent(Dynamic, {
        get component() {
          return props.errorComponent ?? ErrorComponent;
        },
        error,
        reset
      });
    },
    get children() {
      return props.children;
    }
  });
}
function ErrorComponent({
  error
}) {
  const [show, setShow] = Solid.createSignal(process.env.NODE_ENV !== "production");
  return ssr(_tmpl$$2, ssrHydrationKey(), ssrStyleProperty("padding:", ".5rem") + ssrStyleProperty(";max-width:", "100%"), ssrStyleProperty("display:", "flex") + ssrStyleProperty(";align-items:", "center") + ssrStyleProperty(";gap:", ".5rem"), ssrStyleProperty("font-size:", "1rem"), ssrStyleProperty("appearance:", "none") + ssrStyleProperty(";font-size:", ".6em") + ssrStyleProperty(";border:", "1px solid currentColor") + ssrStyleProperty(";padding:", ".1rem .2rem") + ssrStyleProperty(";font-weight:", "bold") + ssrStyleProperty(";border-radius:", ".25rem"), show() ? "Hide Error" : "Show Error", ssrStyleProperty("height:", ".25rem"), show() ? ssr(_tmpl$2, ssrHydrationKey(), ssrStyleProperty("font-size:", ".7em") + ssrStyleProperty(";border:", "1px solid red") + ssrStyleProperty(";border-radius:", ".25rem") + ssrStyleProperty(";padding:", ".3rem") + ssrStyleProperty(";color:", "red") + ssrStyleProperty(";overflow:", "auto"), error.message ? ssr(_tmpl$3, ssrHydrationKey(), escape(error.message)) : escape(null)) : escape(null));
}
function useStore(store, selector = (d) => d, options = {}) {
  const [signal, setSignal] = createSignal(selector(store.state));
  const equal = options.equal ?? shallow;
  const unsub = store.subscribe(() => {
    const data = selector(store.state);
    if (equal(signal(), data)) {
      return;
    }
    setSignal(() => data);
  });
  onCleanup(() => {
    unsub();
  });
  return signal;
}
function shallow(objA, objB) {
  if (Object.is(objA, objB)) {
    return true;
  }
  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
    return false;
  }
  if (objA instanceof Map && objB instanceof Map) {
    if (objA.size !== objB.size) return false;
    for (const [k, v] of objA) {
      if (!objB.has(k) || !Object.is(v, objB.get(k))) return false;
    }
    return true;
  }
  if (objA instanceof Set && objB instanceof Set) {
    if (objA.size !== objB.size) return false;
    for (const v of objA) {
      if (!objB.has(v)) return false;
    }
    return true;
  }
  if (objA instanceof Date && objB instanceof Date) {
    if (objA.getTime() !== objB.getTime()) return false;
    return true;
  }
  const keysA = Object.keys(objA);
  if (keysA.length !== Object.keys(objB).length) {
    return false;
  }
  for (let i = 0; i < keysA.length; i++) {
    if (!Object.prototype.hasOwnProperty.call(objB, keysA[i]) || !Object.is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }
  return true;
}
const routerContext = Solid.createContext(null);
function getRouterContext() {
  if (typeof document === "undefined") {
    return routerContext;
  }
  if (window.__TSR_ROUTER_CONTEXT__) {
    return window.__TSR_ROUTER_CONTEXT__;
  }
  window.__TSR_ROUTER_CONTEXT__ = routerContext;
  return routerContext;
}
function useRouter(opts) {
  const value = Solid.useContext(getRouterContext());
  warning(!(((opts == null ? void 0 : opts.warn) ?? true) && !value), "useRouter must be used inside a <RouterProvider> component!");
  return value;
}
function deepEqual(a, b) {
  if (Object.is(a, b)) return true;
  if (typeof a !== "object" || a === null || typeof b !== "object" || b === null) {
    return false;
  }
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
    if (!deepEqual(a[key], b[key])) return false;
  }
  return true;
}
function useRouterState(opts) {
  const contextRouter = useRouter({
    warn: (opts == null ? void 0 : opts.router) === void 0
  });
  const router = (opts == null ? void 0 : opts.router) || contextRouter;
  return useStore(router.__store, (state) => {
    if (opts == null ? void 0 : opts.select) return opts.select(state);
    return state;
  }, {
    // Use deep equality to match behavior of solid-store 0.7.0 which used
    // reconcile(). This ensures updates work correctly when selectors
    // return new object references but with the same values.
    equal: deepEqual
  });
}
const usePrevious = (fn) => {
  return Solid.createMemo((prev = {
    current: null,
    previous: null
  }) => {
    const current = fn();
    if (prev.current !== current) {
      prev.previous = prev.current;
      prev.current = current;
    }
    return prev;
  });
};
function useIntersectionObserver(ref, callback, intersectionObserverOptions = {}, options = {}) {
  const isIntersectionObserverAvailable = typeof IntersectionObserver === "function";
  let observerRef = null;
  Solid.createEffect(() => {
    const r = ref();
    if (!r || !isIntersectionObserverAvailable || options.disabled) {
      return;
    }
    observerRef = new IntersectionObserver(([entry]) => {
      callback(entry);
    }, intersectionObserverOptions);
    observerRef.observe(r);
    Solid.onCleanup(() => {
      observerRef == null ? void 0 : observerRef.disconnect();
    });
  });
  return () => observerRef;
}
const matchContext = Solid.createContext(() => void 0);
const dummyMatchContext = Solid.createContext(() => void 0);
function Transitioner() {
  const router = useRouter();
  let mountLoadForRouter = {
    router,
    mounted: false
  };
  const isLoading = useRouterState({
    select: ({
      isLoading: isLoading2
    }) => isLoading2
  });
  if (router.isServer) {
    return null;
  }
  const [isSolidTransitioning, startSolidTransition] = Solid.useTransition();
  const hasPendingMatches = useRouterState({
    select: (s) => s.matches.some((d) => d.status === "pending")
  });
  const previousIsLoading = usePrevious(isLoading);
  const isAnyPending = () => isLoading() || isSolidTransitioning() || hasPendingMatches();
  const previousIsAnyPending = usePrevious(isAnyPending);
  const isPagePending = () => isLoading() || hasPendingMatches();
  const previousIsPagePending = usePrevious(isPagePending);
  router.startTransition = (fn) => {
    Solid.startTransition(() => {
      startSolidTransition(fn);
    });
  };
  Solid.onMount(() => {
    const unsub = router.history.subscribe(router.load);
    const nextLocation = router.buildLocation({
      to: router.latestLocation.pathname,
      search: true,
      params: true,
      hash: true,
      state: true,
      _includeValidateSearch: true
    });
    if (trimPathRight(router.latestLocation.href) !== trimPathRight(nextLocation.href)) {
      router.commitLocation({
        ...nextLocation,
        replace: true
      });
    }
    Solid.onCleanup(() => {
      unsub();
    });
  });
  Solid.createRenderEffect(() => {
    Solid.untrack(() => {
      if (
        // if we are hydrating from SSR, loading is triggered in ssr-client
        typeof window !== "undefined" && router.ssr || mountLoadForRouter.router === router && mountLoadForRouter.mounted
      ) {
        return;
      }
      mountLoadForRouter = {
        router,
        mounted: true
      };
      const tryLoad = async () => {
        try {
          await router.load();
        } catch (err) {
          console.error(err);
        }
      };
      tryLoad();
    });
  });
  Solid.createRenderEffect(Solid.on([previousIsLoading, isLoading], ([previousIsLoading2, isLoading2]) => {
    if (previousIsLoading2.previous && !isLoading2) {
      router.emit({
        type: "onLoad",
        ...getLocationChangeInfo(router.state)
      });
    }
  }));
  Solid.createComputed(Solid.on([isPagePending, previousIsPagePending], ([isPagePending2, previousIsPagePending2]) => {
    if (previousIsPagePending2.previous && !isPagePending2) {
      router.emit({
        type: "onBeforeRouteMount",
        ...getLocationChangeInfo(router.state)
      });
    }
  }));
  Solid.createRenderEffect(Solid.on([isAnyPending, previousIsAnyPending], ([isAnyPending2, previousIsAnyPending2]) => {
    if (previousIsAnyPending2.previous && !isAnyPending2) {
      const changeInfo = getLocationChangeInfo(router.state);
      router.emit({
        type: "onResolved",
        ...changeInfo
      });
      router.__store.setState((s) => ({
        ...s,
        status: "idle",
        resolvedLocation: s.location
      }));
      if (changeInfo.hrefChanged) {
        handleHashScroll(router);
      }
    }
  }));
  return null;
}
function SafeFragment(props) {
  return props.children;
}
var _tmpl$$1 = ["<p", ">Not Found</p>"];
function CatchNotFound(props) {
  const resetKey = useRouterState({
    select: (s) => `not-found-${s.location.pathname}-${s.status}`
  });
  return createComponent(CatchBoundary, {
    getResetKey: () => resetKey(),
    onCatch: (error) => {
      var _a;
      if (isNotFound(error)) {
        (_a = props.onCatch) == null ? void 0 : _a.call(props, error);
      } else {
        throw error;
      }
    },
    errorComponent: ({
      error
    }) => {
      var _a;
      if (isNotFound(error)) {
        return (_a = props.fallback) == null ? void 0 : _a.call(props, error);
      } else {
        throw error;
      }
    },
    get children() {
      return props.children;
    }
  });
}
function DefaultGlobalNotFound() {
  return ssr(_tmpl$$1, ssrHydrationKey());
}
function renderRouteNotFound(router, route, data) {
  if (!route.options.notFoundComponent) {
    if (router.options.defaultNotFoundComponent) {
      return createComponent(router.options.defaultNotFoundComponent, data);
    }
    if (process.env.NODE_ENV === "development") {
      warning(route.options.notFoundComponent, `A notFoundError was encountered on the route with ID "${route.id}", but a notFoundComponent option was not configured, nor was a router level defaultNotFoundComponent configured. Consider configuring at least one of these to avoid TanStack Router's overly generic defaultNotFoundComponent (<p>Not Found</p>)`);
    }
    return createComponent(DefaultGlobalNotFound, {});
  }
  return createComponent(route.options.notFoundComponent, data);
}
var _tmpl$ = ["<script", ' class="$tsr">', "<\/script>"];
function ScriptOnce({
  children
}) {
  var _a;
  const router = useRouter();
  if (!router.isServer) {
    return null;
  }
  return ssr(_tmpl$, ssrHydrationKey() + ssrAttribute("nonce", escape((_a = router.options.ssr) == null ? void 0 : _a.nonce, true), false), children + ';typeof $_TSR !== "undefined" && $_TSR?.c()');
}
function ScrollRestoration() {
  const router = useRouter();
  if (!router.isScrollRestoring || !router.isServer) {
    return null;
  }
  if (typeof router.options.scrollRestoration === "function") {
    const shouldRestore = router.options.scrollRestoration({
      location: router.latestLocation
    });
    if (!shouldRestore) {
      return null;
    }
  }
  const getKey = router.options.getScrollRestorationKey || defaultGetScrollRestorationKey;
  const userKey = getKey(router.latestLocation);
  const resolvedKey = userKey !== defaultGetScrollRestorationKey(router.latestLocation) ? userKey : void 0;
  const restoreScrollOptions = {
    storageKey,
    shouldScrollRestoration: true
  };
  if (resolvedKey) {
    restoreScrollOptions.key = resolvedKey;
  }
  return createComponent(ScriptOnce, {
    get children() {
      return `(${restoreScroll.toString()})(${JSON.stringify(restoreScrollOptions)})`;
    }
  });
}
const Match = (props) => {
  const router = useRouter();
  const matchState = useRouterState({
    select: (s) => {
      const match = s.matches.find((d) => d.id === props.matchId);
      if (!match) {
        return null;
      }
      return {
        routeId: match.routeId,
        ssr: match.ssr,
        _displayPending: match._displayPending
      };
    }
  });
  if (!matchState()) return null;
  const route = () => router.routesById[matchState().routeId];
  const resolvePendingComponent = () => route().options.pendingComponent ?? router.options.defaultPendingComponent;
  const routeErrorComponent = () => route().options.errorComponent ?? router.options.defaultErrorComponent;
  const routeOnCatch = () => route().options.onCatch ?? router.options.defaultOnCatch;
  const routeNotFoundComponent = () => {
    var _a;
    return route().isRoot ? (
      // If it's the root route, use the globalNotFound option, with fallback to the notFoundRoute's component
      route().options.notFoundComponent ?? ((_a = router.options.notFoundRoute) == null ? void 0 : _a.options.component)
    ) : route().options.notFoundComponent;
  };
  const resolvedNoSsr = matchState().ssr === false || matchState().ssr === "data-only";
  const ResolvedSuspenseBoundary = () => Solid.Suspense;
  const ResolvedCatchBoundary = () => routeErrorComponent() ? CatchBoundary : SafeFragment;
  const ResolvedNotFoundBoundary = () => routeNotFoundComponent() ? CatchNotFound : SafeFragment;
  const resetKey = useRouterState({
    select: (s) => s.loadedAt
  });
  const parentRouteId = useRouterState({
    select: (s) => {
      var _a;
      const index = s.matches.findIndex((d) => d.id === props.matchId);
      return (_a = s.matches[index - 1]) == null ? void 0 : _a.routeId;
    }
  });
  const ShellComponent = route().isRoot ? route().options.shellComponent ?? SafeFragment : SafeFragment;
  return createComponent(ShellComponent, {
    get children() {
      return [createComponent(matchContext.Provider, {
        value: () => props.matchId,
        get children() {
          return createComponent(Dynamic, {
            get component() {
              return ResolvedSuspenseBoundary();
            },
            get fallback() {
              return (
                // Don't show fallback on server when using no-ssr mode to avoid hydration mismatch
                router.isServer || resolvedNoSsr ? void 0 : createComponent(Dynamic, {
                  get component() {
                    return resolvePendingComponent();
                  }
                })
              );
            },
            get children() {
              return createComponent(Dynamic, {
                get component() {
                  return ResolvedCatchBoundary();
                },
                getResetKey: () => resetKey(),
                get errorComponent() {
                  return routeErrorComponent() || ErrorComponent;
                },
                onCatch: (error) => {
                  var _a;
                  if (isNotFound(error)) throw error;
                  warning(false, `Error in route match: ${matchState().routeId}`);
                  (_a = routeOnCatch()) == null ? void 0 : _a(error);
                },
                get children() {
                  return createComponent(Dynamic, {
                    get component() {
                      return ResolvedNotFoundBoundary();
                    },
                    fallback: (error) => {
                      if (!routeNotFoundComponent() || error.routeId && error.routeId !== matchState().routeId || !error.routeId && !route().isRoot) throw error;
                      return createComponent(Dynamic, mergeProps({
                        get component() {
                          return routeNotFoundComponent();
                        }
                      }, error));
                    },
                    get children() {
                      return createComponent(Solid.Switch, {
                        get children() {
                          return [createComponent(Solid.Match, {
                            when: resolvedNoSsr,
                            get children() {
                              return createComponent(Solid.Show, {
                                get when() {
                                  return !router.isServer;
                                },
                                get fallback() {
                                  return createComponent(Dynamic, {
                                    get component() {
                                      return resolvePendingComponent();
                                    }
                                  });
                                },
                                get children() {
                                  return createComponent(MatchInner, {
                                    get matchId() {
                                      return props.matchId;
                                    }
                                  });
                                }
                              });
                            }
                          }), createComponent(Solid.Match, {
                            when: !resolvedNoSsr,
                            get children() {
                              return createComponent(MatchInner, {
                                get matchId() {
                                  return props.matchId;
                                }
                              });
                            }
                          })];
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      }), parentRouteId() === rootRouteId ? [createComponent(OnRendered, {}), createComponent(ScrollRestoration, {})] : null];
    }
  });
};
function OnRendered() {
  const router = useRouter();
  const location = useRouterState({
    select: (s) => {
      var _a;
      return (_a = s.resolvedLocation) == null ? void 0 : _a.state.__TSR_key;
    }
  });
  Solid.createEffect(Solid.on([location], () => {
    router.emit({
      type: "onRendered",
      ...getLocationChangeInfo(router.state)
    });
  }));
  return null;
}
const MatchInner = (props) => {
  const router = useRouter();
  const matchState = useRouterState({
    select: (s) => {
      const match2 = s.matches.find((d) => d.id === props.matchId);
      if (!match2) {
        return null;
      }
      const routeId = match2.routeId;
      const remountFn = router.routesById[routeId].options.remountDeps ?? router.options.defaultRemountDeps;
      const remountDeps = remountFn == null ? void 0 : remountFn({
        routeId,
        loaderDeps: match2.loaderDeps,
        params: match2._strictParams,
        search: match2._strictSearch
      });
      const key = remountDeps ? JSON.stringify(remountDeps) : void 0;
      return {
        key,
        routeId,
        match: {
          id: match2.id,
          status: match2.status,
          error: match2.error,
          _forcePending: match2._forcePending,
          _displayPending: match2._displayPending
        }
      };
    }
  });
  if (!matchState()) return null;
  const route = () => router.routesById[matchState().routeId];
  const match = () => matchState().match;
  const componentKey = () => matchState().key ?? matchState().match.id;
  const out = () => {
    const Comp = route().options.component ?? router.options.defaultComponent;
    if (Comp) {
      return createComponent(Comp, {});
    }
    return createComponent(Outlet, {});
  };
  const keyedOut = () => createComponent(Solid.Show, {
    get when() {
      return componentKey();
    },
    keyed: true,
    children: (_key) => out()
  });
  return createComponent(Solid.Switch, {
    get children() {
      return [createComponent(Solid.Match, {
        get when() {
          return match()._displayPending;
        },
        children: (_) => {
          const [displayPendingResult] = Solid.createResource(() => {
            var _a;
            return (_a = router.getMatch(match().id)) == null ? void 0 : _a._nonReactive.displayPendingPromise;
          });
          return displayPendingResult();
        }
      }), createComponent(Solid.Match, {
        get when() {
          return match()._forcePending;
        },
        children: (_) => {
          const [minPendingResult] = Solid.createResource(() => {
            var _a;
            return (_a = router.getMatch(match().id)) == null ? void 0 : _a._nonReactive.minPendingPromise;
          });
          return minPendingResult();
        }
      }), createComponent(Solid.Match, {
        get when() {
          return match().status === "pending";
        },
        children: (_) => {
          const pendingMinMs = route().options.pendingMinMs ?? router.options.defaultPendingMinMs;
          if (pendingMinMs) {
            const routerMatch = router.getMatch(match().id);
            if (routerMatch && !routerMatch._nonReactive.minPendingPromise) {
              if (!router.isServer) {
                const minPendingPromise = createControlledPromise();
                routerMatch._nonReactive.minPendingPromise = minPendingPromise;
                setTimeout(() => {
                  minPendingPromise.resolve();
                  routerMatch._nonReactive.minPendingPromise = void 0;
                }, pendingMinMs);
              }
            }
          }
          const [loaderResult] = Solid.createResource(async () => {
            var _a;
            await new Promise((r) => setTimeout(r, 0));
            return (_a = router.getMatch(match().id)) == null ? void 0 : _a._nonReactive.loadPromise;
          });
          const FallbackComponent = route().options.pendingComponent ?? router.options.defaultPendingComponent;
          return [FallbackComponent && pendingMinMs > 0 ? createComponent(Dynamic, {
            component: FallbackComponent
          }) : null, loaderResult()];
        }
      }), createComponent(Solid.Match, {
        get when() {
          return match().status === "notFound";
        },
        children: (_) => {
          invariant(isNotFound(match().error), "Expected a notFound error");
          return createComponent(Solid.Show, {
            get when() {
              return matchState().routeId;
            },
            keyed: true,
            children: (_routeId) => renderRouteNotFound(router, route(), match().error)
          });
        }
      }), createComponent(Solid.Match, {
        get when() {
          return match().status === "redirected";
        },
        children: (_) => {
          invariant(isRedirect(match().error), "Expected a redirect error");
          const [loaderResult] = Solid.createResource(async () => {
            var _a;
            await new Promise((r) => setTimeout(r, 0));
            return (_a = router.getMatch(match().id)) == null ? void 0 : _a._nonReactive.loadPromise;
          });
          return loaderResult();
        }
      }), createComponent(Solid.Match, {
        get when() {
          return match().status === "error";
        },
        children: (_) => {
          if (router.isServer) {
            const RouteErrorComponent = (route().options.errorComponent ?? router.options.defaultErrorComponent) || ErrorComponent;
            return createComponent(RouteErrorComponent, {
              get error() {
                return match().error;
              },
              info: {
                componentStack: ""
              }
            });
          }
          throw match().error;
        }
      }), createComponent(Solid.Match, {
        get when() {
          return match().status === "success";
        },
        get children() {
          return keyedOut();
        }
      })];
    }
  });
};
const Outlet = () => {
  const router = useRouter();
  const matchId = Solid.useContext(matchContext);
  const routeId = useRouterState({
    select: (s) => {
      var _a;
      return (_a = s.matches.find((d) => d.id === matchId())) == null ? void 0 : _a.routeId;
    }
  });
  const route = () => router.routesById[routeId()];
  const parentGlobalNotFound = useRouterState({
    select: (s) => {
      const matches = s.matches;
      const parentMatch = matches.find((d) => d.id === matchId());
      if (!parentMatch) {
        return false;
      }
      return parentMatch.globalNotFound;
    }
  });
  const childMatchId = useRouterState({
    select: (s) => {
      var _a;
      const matches = s.matches;
      const index = matches.findIndex((d) => d.id === matchId());
      const v = (_a = matches[index + 1]) == null ? void 0 : _a.id;
      return v;
    }
  });
  const childMatchStatus = useRouterState({
    select: (s) => {
      var _a;
      const matches = s.matches;
      const index = matches.findIndex((d) => d.id === matchId());
      return (_a = matches[index + 1]) == null ? void 0 : _a.status;
    }
  });
  const shouldShowNotFound = () => childMatchStatus() !== "redirected" && parentGlobalNotFound();
  return createComponent(Solid.Show, {
    get when() {
      return !shouldShowNotFound() && childMatchId();
    },
    get fallback() {
      return createComponent(Solid.Show, {
        get when() {
          return shouldShowNotFound();
        },
        get children() {
          return renderRouteNotFound(router, route(), void 0);
        }
      });
    },
    children: (matchIdAccessor) => {
      const currentMatchId = Solid.createMemo(() => matchIdAccessor());
      return createComponent(Solid.Show, {
        get when() {
          return routeId() === rootRouteId;
        },
        get fallback() {
          return createComponent(Match, {
            get matchId() {
              return currentMatchId();
            }
          });
        },
        get children() {
          return createComponent(Solid.Suspense, {
            get fallback() {
              return createComponent(Dynamic, {
                get component() {
                  return router.options.defaultPendingComponent;
                }
              });
            },
            get children() {
              return createComponent(Match, {
                get matchId() {
                  return currentMatchId();
                }
              });
            }
          });
        }
      });
    }
  });
};
function Matches() {
  const router = useRouter();
  const ResolvedSuspense = router.isServer || typeof document !== "undefined" && router.ssr ? SafeFragment : Solid.Suspense;
  const rootRoute = () => router.routesById[rootRouteId];
  const PendingComponent = rootRoute().options.pendingComponent ?? router.options.defaultPendingComponent;
  const OptionalWrapper = router.options.InnerWrap || SafeFragment;
  return createComponent(OptionalWrapper, {
    get children() {
      return createComponent(ResolvedSuspense, {
        get fallback() {
          return PendingComponent ? createComponent(PendingComponent, {}) : null;
        },
        get children() {
          return [createComponent(Transitioner, {}), createComponent(MatchesInner, {})];
        }
      });
    }
  });
}
function MatchesInner() {
  const router = useRouter();
  const matchId = useRouterState({
    select: (s) => {
      var _a;
      return (_a = s.matches[0]) == null ? void 0 : _a.id;
    }
  });
  const resetKey = useRouterState({
    select: (s) => s.loadedAt
  });
  const matchComponent = () => {
    return createComponent(Solid.Show, {
      get when() {
        return matchId();
      },
      get children() {
        return createComponent(Match, {
          get matchId() {
            return matchId();
          }
        });
      }
    });
  };
  return createComponent(matchContext.Provider, {
    value: matchId,
    get children() {
      return router.options.disableGlobalCatchBoundary ? matchComponent() : createComponent(CatchBoundary, {
        getResetKey: () => resetKey(),
        errorComponent: ErrorComponent,
        onCatch: (error) => {
          warning(false, `The following error wasn't caught by any route! At the very leas
    t, consider setting an 'errorComponent' in your RootRoute!`);
          warning(false, error.message || error.toString());
        },
        get children() {
          return matchComponent();
        }
      });
    }
  });
}
function RouterContextProvider({
  router,
  children,
  ...rest
}) {
  router.update({
    ...router.options,
    ...rest,
    context: {
      ...router.options.context,
      ...rest.context
    }
  });
  const routerContext2 = getRouterContext();
  const OptionalWrapper = router.options.Wrap || SafeFragment;
  return createComponent(OptionalWrapper, {
    get children() {
      return createComponent(routerContext2.Provider, {
        value: router,
        get children() {
          return children();
        }
      });
    }
  });
}
function RouterProvider({
  router,
  ...rest
}) {
  return createComponent(RouterContextProvider, mergeProps({
    router
  }, rest, {
    children: () => createComponent(Matches, {})
  }));
}
function StartServer(props) {
  return createComponent(RouterProvider, {
    get router() {
      return props.router;
    }
  });
}
const TSS_FORMDATA_CONTEXT = "__TSS_CONTEXT";
const TSS_SERVER_FUNCTION = Symbol.for("TSS_SERVER_FUNCTION");
const X_TSS_SERIALIZED = "x-tss-serialized";
const X_TSS_RAW_RESPONSE = "x-tss-raw";
const startStorage = new AsyncLocalStorage();
async function runWithStartContext(context, fn) {
  return startStorage.run(context, fn);
}
function getStartContext(opts) {
  const context = startStorage.getStore();
  if (!context && (opts == null ? void 0 : opts.throwIfNotFound) !== false) {
    throw new Error(
      `No Start context found in AsyncLocalStorage. Make sure you are using the function within the server runtime.`
    );
  }
  return context;
}
const getStartOptions = () => getStartContext().startOptions;
function flattenMiddlewares(middlewares) {
  const seen = /* @__PURE__ */ new Set();
  const flattened = [];
  const recurse = (middleware) => {
    middleware.forEach((m) => {
      if (m.options.middleware) {
        recurse(m.options.middleware);
      }
      if (!seen.has(m)) {
        seen.add(m);
        flattened.push(m);
      }
    });
  };
  recurse(middlewares);
  return flattened;
}
function getDefaultSerovalPlugins() {
  const start = getStartOptions();
  const adapters = start == null ? void 0 : start.serializationAdapters;
  return [
    ...(adapters == null ? void 0 : adapters.map(makeSerovalPlugin)) ?? [],
    ...defaultSerovalPlugins
  ];
}
const eventStorage = new AsyncLocalStorage();
function requestHandler(handler) {
  return (request, requestOpts) => {
    const h3Event = new H3Event(request);
    const response = eventStorage.run(
      { h3Event },
      () => handler(request, requestOpts)
    );
    return toResponse(response, h3Event);
  };
}
function getH3Event() {
  const event = eventStorage.getStore();
  if (!event) {
    throw new Error(
      `No StartEvent found in AsyncLocalStorage. Make sure you are using the function within the server runtime.`
    );
  }
  return event.h3Event;
}
function getResponse() {
  const event = getH3Event();
  return event._res;
}
async function getStartManifest() {
  const { tsrStartManifest } = await import("./assets/_tanstack-start-manifest_v-Cr78mjhI.js");
  const startManifest = tsrStartManifest();
  const rootRoute = startManifest.routes[rootRouteId] = startManifest.routes[rootRouteId] || {};
  rootRoute.assets = rootRoute.assets || [];
  let script = `import('${startManifest.clientEntry}')`;
  rootRoute.assets.push({
    tag: "script",
    attrs: {
      type: "module",
      async: true
    },
    children: script
  });
  const manifest2 = {
    routes: Object.fromEntries(
      Object.entries(startManifest.routes).flatMap(([k, v]) => {
        const result = {};
        let hasData = false;
        if (v.preloads && v.preloads.length > 0) {
          result["preloads"] = v.preloads;
          hasData = true;
        }
        if (v.assets && v.assets.length > 0) {
          result["assets"] = v.assets;
          hasData = true;
        }
        if (!hasData) {
          return [];
        }
        return [[k, result]];
      })
    )
  };
  return manifest2;
}
const manifest = {};
async function getServerFnById(id) {
  const serverFnInfo = manifest[id];
  if (!serverFnInfo) {
    throw new Error("Server function info not found for " + id);
  }
  const fnModule = await serverFnInfo.importer();
  if (!fnModule) {
    console.info("serverFnInfo", serverFnInfo);
    throw new Error("Server function module not resolved for " + id);
  }
  const action = fnModule[serverFnInfo.functionName];
  if (!action) {
    console.info("serverFnInfo", serverFnInfo);
    console.info("fnModule", fnModule);
    throw new Error(
      `Server function module export not resolved for serverFn ID: ${id}`
    );
  }
  return action;
}
let regex = void 0;
const handleServerAction = async ({
  request,
  context
}) => {
  const controller = new AbortController();
  const signal = controller.signal;
  const abort = () => controller.abort();
  request.signal.addEventListener("abort", abort);
  if (regex === void 0) {
    regex = new RegExp(`${"/_serverFn/"}([^/?#]+)`);
  }
  const method = request.method;
  const url = new URL(request.url, "http://localhost:3000");
  const match = url.pathname.match(regex);
  const serverFnId = match ? match[1] : null;
  const search = Object.fromEntries(url.searchParams.entries());
  const isCreateServerFn = "createServerFn" in search;
  if (typeof serverFnId !== "string") {
    throw new Error("Invalid server action param for serverFnId: " + serverFnId);
  }
  const action = await getServerFnById(serverFnId);
  const formDataContentTypes = [
    "multipart/form-data",
    "application/x-www-form-urlencoded"
  ];
  const contentType = request.headers.get("Content-Type");
  const serovalPlugins = getDefaultSerovalPlugins();
  function parsePayload(payload) {
    const parsedPayload = fromJSON(payload, { plugins: serovalPlugins });
    return parsedPayload;
  }
  const response = await (async () => {
    try {
      let result = await (async () => {
        if (formDataContentTypes.some(
          (type) => contentType && contentType.includes(type)
        )) {
          invariant(
            method.toLowerCase() !== "get",
            "GET requests with FormData payloads are not supported"
          );
          const formData = await request.formData();
          const serializedContext = formData.get(TSS_FORMDATA_CONTEXT);
          formData.delete(TSS_FORMDATA_CONTEXT);
          const params = {
            context,
            data: formData
          };
          if (typeof serializedContext === "string") {
            try {
              const parsedContext = JSON.parse(serializedContext);
              const deserializedContext = fromJSON(parsedContext, {
                plugins: serovalPlugins
              });
              if (typeof deserializedContext === "object" && deserializedContext) {
                params.context = { ...context, ...deserializedContext };
              }
            } catch {
            }
          }
          return await action(params, signal);
        }
        if (method.toLowerCase() === "get") {
          invariant(
            isCreateServerFn,
            "expected GET request to originate from createServerFn"
          );
          let payload = search.payload;
          payload = payload ? parsePayload(JSON.parse(payload)) : {};
          payload.context = { ...context, ...payload.context };
          return await action(payload, signal);
        }
        if (method.toLowerCase() !== "post") {
          throw new Error("expected POST method");
        }
        let jsonPayload;
        if (contentType == null ? void 0 : contentType.includes("application/json")) {
          jsonPayload = await request.json();
        }
        if (isCreateServerFn) {
          const payload = jsonPayload ? parsePayload(jsonPayload) : {};
          payload.context = { ...payload.context, ...context };
          return await action(payload, signal);
        }
        return await action(...jsonPayload);
      })();
      if (result.result instanceof Response) {
        result.result.headers.set(X_TSS_RAW_RESPONSE, "true");
        return result.result;
      }
      if (!isCreateServerFn) {
        result = result.result;
        if (result instanceof Response) {
          return result;
        }
      }
      if (isNotFound(result)) {
        return isNotFoundResponse(result);
      }
      const response2 = getResponse();
      let nonStreamingBody = void 0;
      if (result !== void 0) {
        let done = false;
        const callbacks = {
          onParse: (value) => {
            nonStreamingBody = value;
          },
          onDone: () => {
            done = true;
          },
          onError: (error) => {
            throw error;
          }
        };
        toCrossJSONStream(result, {
          refs: /* @__PURE__ */ new Map(),
          plugins: serovalPlugins,
          onParse(value) {
            callbacks.onParse(value);
          },
          onDone() {
            callbacks.onDone();
          },
          onError: (error) => {
            callbacks.onError(error);
          }
        });
        if (done) {
          return new Response(
            nonStreamingBody ? JSON.stringify(nonStreamingBody) : void 0,
            {
              status: response2 == null ? void 0 : response2.status,
              statusText: response2 == null ? void 0 : response2.statusText,
              headers: {
                "Content-Type": "application/json",
                [X_TSS_SERIALIZED]: "true"
              }
            }
          );
        }
        const encoder = new TextEncoder();
        const stream = new ReadableStream({
          start(controller2) {
            callbacks.onParse = (value) => controller2.enqueue(encoder.encode(JSON.stringify(value) + "\n"));
            callbacks.onDone = () => {
              try {
                controller2.close();
              } catch (error) {
                controller2.error(error);
              }
            };
            callbacks.onError = (error) => controller2.error(error);
            if (nonStreamingBody !== void 0) {
              callbacks.onParse(nonStreamingBody);
            }
          }
        });
        return new Response(stream, {
          status: response2 == null ? void 0 : response2.status,
          statusText: response2 == null ? void 0 : response2.statusText,
          headers: {
            "Content-Type": "application/x-ndjson",
            [X_TSS_SERIALIZED]: "true"
          }
        });
      }
      return new Response(void 0, {
        status: response2 == null ? void 0 : response2.status,
        statusText: response2 == null ? void 0 : response2.statusText
      });
    } catch (error) {
      if (error instanceof Response) {
        return error;
      }
      if (isNotFound(error)) {
        return isNotFoundResponse(error);
      }
      console.info();
      console.info("Server Fn Error!");
      console.info();
      console.error(error);
      console.info();
      const serializedError = JSON.stringify(
        await Promise.resolve(
          toCrossJSONAsync(error, {
            refs: /* @__PURE__ */ new Map(),
            plugins: serovalPlugins
          })
        )
      );
      const response2 = getResponse();
      return new Response(serializedError, {
        status: (response2 == null ? void 0 : response2.status) ?? 500,
        statusText: response2 == null ? void 0 : response2.statusText,
        headers: {
          "Content-Type": "application/json",
          [X_TSS_SERIALIZED]: "true"
        }
      });
    }
  })();
  request.signal.removeEventListener("abort", abort);
  return response;
};
function isNotFoundResponse(error) {
  const { headers, ...rest } = error;
  return new Response(JSON.stringify(rest), {
    status: 404,
    headers: {
      "Content-Type": "application/json",
      ...headers || {}
    }
  });
}
const HEADERS = {
  TSS_SHELL: "X-TSS_SHELL"
};
const createServerRpc = (functionId, splitImportFn) => {
  return Object.assign(splitImportFn, {
    functionId,
    [TSS_SERVER_FUNCTION]: true
  });
};
const ServerFunctionSerializationAdapter = createSerializationAdapter({
  key: "$TSS/serverfn",
  test: (v) => {
    if (typeof v !== "function") return false;
    if (!(TSS_SERVER_FUNCTION in v)) return false;
    return !!v[TSS_SERVER_FUNCTION];
  },
  toSerializable: ({ functionId }) => ({ functionId }),
  fromSerializable: ({ functionId }) => {
    const fn = async (opts, signal) => {
      const serverFn = await getServerFnById(functionId);
      const result = await serverFn(opts ?? {}, signal);
      return result.result;
    };
    return createServerRpc(functionId, fn);
  }
});
function getStartResponseHeaders(opts) {
  const headers = mergeHeaders(
    {
      "Content-Type": "text/html; charset=utf-8"
    },
    ...opts.router.state.matches.map((match) => {
      return match.headers;
    })
  );
  return headers;
}
function createStartHandler(cb) {
  const ROUTER_BASEPATH = "/";
  let startRoutesManifest = null;
  let startEntry = null;
  let routerEntry = null;
  const getEntries = async () => {
    if (routerEntry === null) {
      routerEntry = await import("./assets/router-DXx_4i-b.js").then((n) => n.r);
    }
    if (startEntry === null) {
      startEntry = await import("./assets/start-HYkvq4Ni.js");
    }
    return {
      startEntry,
      routerEntry
    };
  };
  const startRequestResolver = async (request, requestOpts) => {
    var _a, _b;
    let router = null;
    let cbWillCleanup = false;
    try {
      const origin = getOrigin(request);
      const url = new URL(request.url);
      const href = url.href.replace(url.origin, "");
      const startOptions = await ((_a = (await getEntries()).startEntry.startInstance) == null ? void 0 : _a.getOptions()) || {};
      const serializationAdapters = [
        ...startOptions.serializationAdapters || [],
        ServerFunctionSerializationAdapter
      ];
      const requestStartOptions = {
        ...startOptions,
        serializationAdapters
      };
      const getRouter = async () => {
        if (router) return router;
        router = await (await getEntries()).routerEntry.getRouter();
        const isPrerendering = process.env.TSS_PRERENDERING === "true";
        let isShell = process.env.TSS_SHELL === "true";
        if (isPrerendering && !isShell) {
          isShell = request.headers.get(HEADERS.TSS_SHELL) === "true";
        }
        const history = createMemoryHistory({
          initialEntries: [href]
        });
        router.update({
          history,
          isShell,
          isPrerendering,
          origin: router.options.origin ?? origin,
          ...{
            defaultSsr: requestStartOptions.defaultSsr,
            serializationAdapters: [
              ...requestStartOptions.serializationAdapters,
              ...router.options.serializationAdapters || []
            ]
          },
          basepath: ROUTER_BASEPATH
        });
        return router;
      };
      const requestHandlerMiddleware = handlerToMiddleware(
        async ({ context }) => {
          const response2 = await runWithStartContext(
            {
              getRouter,
              startOptions: requestStartOptions,
              contextAfterGlobalMiddlewares: context,
              request
            },
            async () => {
              try {
                if (href.startsWith("/_serverFn/")) {
                  return await handleServerAction({
                    request,
                    context: requestOpts == null ? void 0 : requestOpts.context
                  });
                }
                const executeRouter = async ({
                  serverContext
                }) => {
                  const requestAcceptHeader = request.headers.get("Accept") || "*/*";
                  const splitRequestAcceptHeader = requestAcceptHeader.split(",");
                  const supportedMimeTypes = ["*/*", "text/html"];
                  const isRouterAcceptSupported = supportedMimeTypes.some(
                    (mimeType) => splitRequestAcceptHeader.some(
                      (acceptedMimeType) => acceptedMimeType.trim().startsWith(mimeType)
                    )
                  );
                  if (!isRouterAcceptSupported) {
                    return json(
                      {
                        error: "Only HTML requests are supported here"
                      },
                      {
                        status: 500
                      }
                    );
                  }
                  if (startRoutesManifest === null) {
                    startRoutesManifest = await getStartManifest();
                  }
                  const router2 = await getRouter();
                  attachRouterServerSsrUtils({
                    router: router2,
                    manifest: startRoutesManifest
                  });
                  router2.update({ additionalContext: { serverContext } });
                  await router2.load();
                  if (router2.state.redirect) {
                    return router2.state.redirect;
                  }
                  await router2.serverSsr.dehydrate();
                  const responseHeaders = getStartResponseHeaders({ router: router2 });
                  cbWillCleanup = true;
                  const response4 = await cb({
                    request,
                    router: router2,
                    responseHeaders
                  });
                  return response4;
                };
                const response3 = await handleServerRoutes({
                  getRouter,
                  request,
                  executeRouter,
                  context
                });
                return response3;
              } catch (err) {
                if (err instanceof Response) {
                  return err;
                }
                throw err;
              }
            }
          );
          return response2;
        }
      );
      const flattenedMiddlewares = startOptions.requestMiddleware ? flattenMiddlewares(startOptions.requestMiddleware) : [];
      const middlewares = flattenedMiddlewares.map((d) => d.options.server);
      const ctx = await executeMiddleware(
        [...middlewares, requestHandlerMiddleware],
        {
          request,
          context: (requestOpts == null ? void 0 : requestOpts.context) || {}
        }
      );
      const response = ctx.response;
      if (isRedirect(response)) {
        if (isResolvedRedirect(response)) {
          if (request.headers.get("x-tsr-redirect") === "manual") {
            return json(
              {
                ...response.options,
                isSerializedRedirect: true
              },
              {
                headers: response.headers
              }
            );
          }
          return response;
        }
        if (response.options.to && typeof response.options.to === "string" && !response.options.to.startsWith("/")) {
          throw new Error(
            `Server side redirects must use absolute paths via the 'href' or 'to' options. The redirect() method's "to" property accepts an internal path only. Use the "href" property to provide an external URL. Received: ${JSON.stringify(response.options)}`
          );
        }
        if (["params", "search", "hash"].some(
          (d) => typeof response.options[d] === "function"
        )) {
          throw new Error(
            `Server side redirects must use static search, params, and hash values and do not support functional values. Received functional values for: ${Object.keys(
              response.options
            ).filter((d) => typeof response.options[d] === "function").map((d) => `"${d}"`).join(", ")}`
          );
        }
        const router2 = await getRouter();
        const redirect = router2.resolveRedirect(response);
        if (request.headers.get("x-tsr-redirect") === "manual") {
          return json(
            {
              ...response.options,
              isSerializedRedirect: true
            },
            {
              headers: response.headers
            }
          );
        }
        return redirect;
      }
      return response;
    } finally {
      if (router && !cbWillCleanup) {
        (_b = router.serverSsr) == null ? void 0 : _b.cleanup();
      }
      router = null;
    }
  };
  return requestHandler(startRequestResolver);
}
async function handleServerRoutes({
  getRouter,
  request,
  executeRouter,
  context
}) {
  const router = await getRouter();
  let url = new URL(request.url);
  url = executeRewriteInput(router.rewrite, url);
  const pathname = url.pathname;
  const { matchedRoutes, foundRoute, routeParams } = router.getMatchedRoutes(pathname);
  const isExactMatch = foundRoute && routeParams["**"] === void 0;
  const middlewares = flattenMiddlewares(
    matchedRoutes.flatMap((r) => {
      var _a;
      return (_a = r.options.server) == null ? void 0 : _a.middleware;
    }).filter(Boolean)
  ).map((d) => d.options.server);
  const server2 = foundRoute == null ? void 0 : foundRoute.options.server;
  if (server2 && isExactMatch) {
    if (server2.handlers) {
      const handlers = typeof server2.handlers === "function" ? server2.handlers({
        createHandlers: (d) => d
      }) : server2.handlers;
      const requestMethod = request.method.toUpperCase();
      const handler = handlers[requestMethod] ?? handlers["ANY"];
      if (handler) {
        const mayDefer = !!foundRoute.options.component;
        if (typeof handler === "function") {
          middlewares.push(handlerToMiddleware(handler, mayDefer));
        } else {
          const { middleware } = handler;
          if (middleware && middleware.length) {
            middlewares.push(
              ...flattenMiddlewares(middleware).map((d) => d.options.server)
            );
          }
          if (handler.handler) {
            middlewares.push(handlerToMiddleware(handler.handler, mayDefer));
          }
        }
      }
    }
  }
  middlewares.push(
    handlerToMiddleware((ctx2) => executeRouter({ serverContext: ctx2.context }))
  );
  const ctx = await executeMiddleware(middlewares, {
    request,
    context,
    params: routeParams,
    pathname
  });
  const response = ctx.response;
  return response;
}
function throwRouteHandlerError() {
  if (process.env.NODE_ENV === "development") {
    throw new Error(
      `It looks like you forgot to return a response from your server route handler. If you want to defer to the app router, make sure to have a component set in this route.`
    );
  }
  throw new Error("Internal Server Error");
}
function throwIfMayNotDefer() {
  if (process.env.NODE_ENV === "development") {
    throw new Error(
      `You cannot defer to the app router if there is no component defined on this route.`
    );
  }
  throw new Error("Internal Server Error");
}
function handlerToMiddleware(handler, mayDefer = false) {
  if (mayDefer) {
    return handler;
  }
  return async ({ next: _next, ...rest }) => {
    const response = await handler({ ...rest, next: throwIfMayNotDefer });
    if (!response) {
      throwRouteHandlerError();
    }
    return response;
  };
}
function executeMiddleware(middlewares, ctx) {
  let index = -1;
  const next = async (ctx2) => {
    index++;
    const middleware = middlewares[index];
    if (!middleware) return ctx2;
    let result;
    try {
      result = await middleware({
        ...ctx2,
        // Allow the middleware to call the next middleware in the chain
        next: async (nextCtx) => {
          const nextResult = await next({
            ...ctx2,
            ...nextCtx,
            context: {
              ...ctx2.context,
              ...(nextCtx == null ? void 0 : nextCtx.context) || {}
            }
          });
          return Object.assign(ctx2, handleCtxResult(nextResult));
        }
        // Allow the middleware result to extend the return context
      });
    } catch (err) {
      if (isSpecialResponse(err)) {
        result = {
          response: err
        };
      } else {
        throw err;
      }
    }
    return Object.assign(ctx2, handleCtxResult(result));
  };
  return handleCtxResult(next(ctx));
}
function handleCtxResult(result) {
  if (isSpecialResponse(result)) {
    return {
      response: result
    };
  }
  return result;
}
function isSpecialResponse(err) {
  return isResponse(err) || isRedirect(err);
}
function isResponse(response) {
  return response instanceof Response;
}
const renderRouterToStream = async ({
  request,
  router,
  responseHeaders,
  children
}) => {
  var _a, _b, _c;
  const {
    writable,
    readable
  } = new TransformStream();
  const docType = Solid$1.ssr("<!DOCTYPE html>");
  const serializationAdapters = ((_a = router.options) == null ? void 0 : _a.serializationAdapters) || ((_b = router.options.ssr) == null ? void 0 : _b.serializationAdapters);
  const serovalPlugins = serializationAdapters == null ? void 0 : serializationAdapters.map((adapter) => {
    const plugin = makeSsrSerovalPlugin(adapter, {
      didRun: false
    });
    return plugin;
  });
  const stream = Solid$1.renderToStream(() => [docType, children()], {
    nonce: (_c = router.options.ssr) == null ? void 0 : _c.nonce,
    plugins: serovalPlugins
  });
  if (isbot(request.headers.get("User-Agent"))) {
    await stream;
  }
  stream.pipeTo(writable);
  const responseStream = transformReadableStreamWithRouter(router, readable);
  return new Response(responseStream, {
    status: router.state.statusCode,
    headers: responseHeaders
  });
};
const defaultStreamHandler = defineHandlerCallback(async ({
  request,
  router,
  responseHeaders
}) => await renderRouterToStream({
  request,
  router,
  responseHeaders,
  children: () => createComponent(StartServer, {
    router
  })
}));
const fetch = createStartHandler(defaultStreamHandler);
function createServerEntry(entry) {
  return {
    async fetch(...args) {
      return await entry.fetch(...args);
    }
  };
}
const server = createServerEntry({ fetch });
export {
  Outlet as O,
  useRouterState as a,
  useIntersectionObserver as b,
  createServerEntry,
  dummyMatchContext as d,
  server as default,
  matchContext as m,
  useRouter as u
};
