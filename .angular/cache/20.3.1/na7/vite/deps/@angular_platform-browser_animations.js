import {
  AnimationDriver,
  AnimationEngine,
  AnimationRendererFactory,
  AnimationStyleNormalizer,
  NoopAnimationDriver,
  WebAnimationsDriver,
  WebAnimationsStyleNormalizer
} from "./chunk-ETIWKODF.js";
import {
  BrowserModule
} from "./chunk-TXQXBXCS.js";
import {
  DomRendererFactory2
} from "./chunk-HHSL5KYY.js";
import "./chunk-RU2G4SYM.js";
import "./chunk-4PJLUBIZ.js";
import "./chunk-MNDS4BZZ.js";
import {
  ANIMATION_MODULE_TYPE,
  DOCUMENT,
  Inject,
  Injectable,
  NgModule,
  NgZone,
  RendererFactory2,
  performanceMarkFeature,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵinject
} from "./chunk-ORCB6XAU.js";
import "./chunk-LHLOJ3XF.js";
import "./chunk-LJH4O3X7.js";
import "./chunk-HRWU5MP2.js";
import {
  __name,
  __publicField
} from "./chunk-TJFVSI2U.js";

// node_modules/@angular/platform-browser/fesm2022/animations.mjs
var _InjectableAnimationEngine = class _InjectableAnimationEngine extends AnimationEngine {
  // The `ApplicationRef` is injected here explicitly to force the dependency ordering.
  // Since the `ApplicationRef` should be created earlier before the `AnimationEngine`, they
  // both have `ngOnDestroy` hooks and `flush()` must be called after all views are destroyed.
  constructor(doc, driver, normalizer) {
    super(doc, driver, normalizer);
  }
  ngOnDestroy() {
    this.flush();
  }
};
__name(_InjectableAnimationEngine, "InjectableAnimationEngine");
__publicField(_InjectableAnimationEngine, "ɵfac", /* @__PURE__ */ __name(function InjectableAnimationEngine_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _InjectableAnimationEngine)(ɵɵinject(DOCUMENT), ɵɵinject(AnimationDriver), ɵɵinject(AnimationStyleNormalizer));
}, "InjectableAnimationEngine_Factory"));
__publicField(_InjectableAnimationEngine, "ɵprov", ɵɵdefineInjectable({
  token: _InjectableAnimationEngine,
  factory: _InjectableAnimationEngine.ɵfac
}));
var InjectableAnimationEngine = _InjectableAnimationEngine;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InjectableAnimationEngine, [{
    type: Injectable
  }], () => [{
    type: Document,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }, {
    type: AnimationDriver
  }, {
    type: AnimationStyleNormalizer
  }], null);
})();
function instantiateDefaultStyleNormalizer() {
  return new WebAnimationsStyleNormalizer();
}
__name(instantiateDefaultStyleNormalizer, "instantiateDefaultStyleNormalizer");
function instantiateRendererFactory(renderer, engine, zone) {
  return new AnimationRendererFactory(renderer, engine, zone);
}
__name(instantiateRendererFactory, "instantiateRendererFactory");
var SHARED_ANIMATION_PROVIDERS = [{
  provide: AnimationStyleNormalizer,
  useFactory: instantiateDefaultStyleNormalizer
}, {
  provide: AnimationEngine,
  useClass: InjectableAnimationEngine
}, {
  provide: RendererFactory2,
  useFactory: instantiateRendererFactory,
  deps: [DomRendererFactory2, AnimationEngine, NgZone]
}];
var BROWSER_NOOP_ANIMATIONS_PROVIDERS = [{
  provide: AnimationDriver,
  useClass: NoopAnimationDriver
}, {
  provide: ANIMATION_MODULE_TYPE,
  useValue: "NoopAnimations"
}, ...SHARED_ANIMATION_PROVIDERS];
var BROWSER_ANIMATIONS_PROVIDERS = [
  // Note: the `ngServerMode` happen inside factories to give the variable time to initialize.
  {
    provide: AnimationDriver,
    useFactory: /* @__PURE__ */ __name(() => false ? new NoopAnimationDriver() : new WebAnimationsDriver(), "useFactory")
  },
  {
    provide: ANIMATION_MODULE_TYPE,
    useFactory: /* @__PURE__ */ __name(() => false ? "NoopAnimations" : "BrowserAnimations", "useFactory")
  },
  ...SHARED_ANIMATION_PROVIDERS
];
var _BrowserAnimationsModule = class _BrowserAnimationsModule {
  /**
   * Configures the module based on the specified object.
   *
   * @param config Object used to configure the behavior of the `BrowserAnimationsModule`.
   * @see {@link BrowserAnimationsModuleConfig}
   *
   * @usageNotes
   * When registering the `BrowserAnimationsModule`, you can use the `withConfig`
   * function as follows:
   * ```ts
   * @NgModule({
   *   imports: [BrowserAnimationsModule.withConfig(config)]
   * })
   * class MyNgModule {}
   * ```
   */
  static withConfig(config) {
    return {
      ngModule: _BrowserAnimationsModule,
      providers: config.disableAnimations ? BROWSER_NOOP_ANIMATIONS_PROVIDERS : BROWSER_ANIMATIONS_PROVIDERS
    };
  }
};
__name(_BrowserAnimationsModule, "BrowserAnimationsModule");
__publicField(_BrowserAnimationsModule, "ɵfac", /* @__PURE__ */ __name(function BrowserAnimationsModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _BrowserAnimationsModule)();
}, "BrowserAnimationsModule_Factory"));
__publicField(_BrowserAnimationsModule, "ɵmod", ɵɵdefineNgModule({
  type: _BrowserAnimationsModule,
  exports: [BrowserModule]
}));
__publicField(_BrowserAnimationsModule, "ɵinj", ɵɵdefineInjector({
  providers: BROWSER_ANIMATIONS_PROVIDERS,
  imports: [BrowserModule]
}));
var BrowserAnimationsModule = _BrowserAnimationsModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BrowserAnimationsModule, [{
    type: NgModule,
    args: [{
      exports: [BrowserModule],
      providers: BROWSER_ANIMATIONS_PROVIDERS
    }]
  }], null, null);
})();
function provideAnimations() {
  performanceMarkFeature("NgEagerAnimations");
  return [...BROWSER_ANIMATIONS_PROVIDERS];
}
__name(provideAnimations, "provideAnimations");
var _NoopAnimationsModule = class _NoopAnimationsModule {
};
__name(_NoopAnimationsModule, "NoopAnimationsModule");
__publicField(_NoopAnimationsModule, "ɵfac", /* @__PURE__ */ __name(function NoopAnimationsModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NoopAnimationsModule)();
}, "NoopAnimationsModule_Factory"));
__publicField(_NoopAnimationsModule, "ɵmod", ɵɵdefineNgModule({
  type: _NoopAnimationsModule,
  exports: [BrowserModule]
}));
__publicField(_NoopAnimationsModule, "ɵinj", ɵɵdefineInjector({
  providers: BROWSER_NOOP_ANIMATIONS_PROVIDERS,
  imports: [BrowserModule]
}));
var NoopAnimationsModule = _NoopAnimationsModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NoopAnimationsModule, [{
    type: NgModule,
    args: [{
      exports: [BrowserModule],
      providers: BROWSER_NOOP_ANIMATIONS_PROVIDERS
    }]
  }], null, null);
})();
function provideNoopAnimations() {
  return [...BROWSER_NOOP_ANIMATIONS_PROVIDERS];
}
__name(provideNoopAnimations, "provideNoopAnimations");
export {
  ANIMATION_MODULE_TYPE,
  BrowserAnimationsModule,
  NoopAnimationsModule,
  provideAnimations,
  provideNoopAnimations,
  InjectableAnimationEngine as ɵInjectableAnimationEngine
};
/*! Bundled license information:

@angular/platform-browser/fesm2022/animations.mjs:
  (**
   * @license Angular v20.3.0
   * (c) 2010-2025 Google LLC. https://angular.io/
   * License: MIT
   *)
*/
//# sourceMappingURL=@angular_platform-browser_animations.js.map
