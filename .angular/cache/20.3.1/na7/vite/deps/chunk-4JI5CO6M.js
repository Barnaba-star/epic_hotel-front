import {
  MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER,
  MatTooltip,
  TooltipComponent
} from "./chunk-237UKS7W.js";
import {
  OverlayModule
} from "./chunk-LNIGWTG2.js";
import {
  CdkScrollableModule
} from "./chunk-OXUUY424.js";
import {
  A11yModule,
  MatCommonModule
} from "./chunk-RUDMB6FW.js";
import {
  NgModule,
  setClassMetadata,
  ɵɵdefineInjector,
  ɵɵdefineNgModule
} from "./chunk-ORCB6XAU.js";
import {
  __name,
  __publicField
} from "./chunk-TJFVSI2U.js";

// node_modules/@angular/material/fesm2022/tooltip-module.mjs
var _MatTooltipModule = class _MatTooltipModule {
};
__name(_MatTooltipModule, "MatTooltipModule");
__publicField(_MatTooltipModule, "ɵfac", /* @__PURE__ */ __name(function MatTooltipModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _MatTooltipModule)();
}, "MatTooltipModule_Factory"));
__publicField(_MatTooltipModule, "ɵmod", ɵɵdefineNgModule({
  type: _MatTooltipModule,
  imports: [A11yModule, OverlayModule, MatCommonModule, MatTooltip, TooltipComponent],
  exports: [MatTooltip, TooltipComponent, MatCommonModule, CdkScrollableModule]
}));
__publicField(_MatTooltipModule, "ɵinj", ɵɵdefineInjector({
  providers: [MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER],
  imports: [A11yModule, OverlayModule, MatCommonModule, MatCommonModule, CdkScrollableModule]
}));
var MatTooltipModule = _MatTooltipModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTooltipModule, [{
    type: NgModule,
    args: [{
      imports: [A11yModule, OverlayModule, MatCommonModule, MatTooltip, TooltipComponent],
      exports: [MatTooltip, TooltipComponent, MatCommonModule, CdkScrollableModule],
      providers: [MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER]
    }]
  }], null, null);
})();

export {
  MatTooltipModule
};
//# sourceMappingURL=chunk-4JI5CO6M.js.map
