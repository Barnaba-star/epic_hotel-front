import {
  MatRipple
} from "./chunk-XICD362A.js";
import {
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

// node_modules/@angular/material/fesm2022/ripple-module.mjs
var _MatRippleModule = class _MatRippleModule {
};
__name(_MatRippleModule, "MatRippleModule");
__publicField(_MatRippleModule, "ɵfac", /* @__PURE__ */ __name(function MatRippleModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _MatRippleModule)();
}, "MatRippleModule_Factory"));
__publicField(_MatRippleModule, "ɵmod", ɵɵdefineNgModule({
  type: _MatRippleModule,
  imports: [MatCommonModule, MatRipple],
  exports: [MatRipple, MatCommonModule]
}));
__publicField(_MatRippleModule, "ɵinj", ɵɵdefineInjector({
  imports: [MatCommonModule, MatCommonModule]
}));
var MatRippleModule = _MatRippleModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatRippleModule, [{
    type: NgModule,
    args: [{
      imports: [MatCommonModule, MatRipple],
      exports: [MatRipple, MatCommonModule]
    }]
  }], null, null);
})();

export {
  MatRippleModule
};
//# sourceMappingURL=chunk-URWHBK7B.js.map
