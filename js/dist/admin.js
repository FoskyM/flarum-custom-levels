(()=>{var e={n:t=>{var s=t&&t.__esModule?()=>t.default:()=>t;return e.d(s,{a:s}),s},d:(t,s)=>{for(var l in s)e.o(s,l)&&!e.o(t,l)&&Object.defineProperty(t,l,{enumerable:!0,get:s[l]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};(()=>{"use strict";e.r(t);const s=flarum.core.compat["common/app"];e.n(s)().initializers.add("foskym/flarum-custom-levels",(function(){console.log("[foskym/flarum-custom-levels] Hello, forum and admin!")}));const l=flarum.core.compat["admin/app"];var o=e.n(l);flarum.core.compat.extend,o().initializers.add("foskym/flarum-custom-levels",(function(){o().extensionData.for("foskym-custom-levels").registerSetting((function(){return m("div",{className:"Form-group"},m("label",null,o().translator.trans("foskym-custom-levels.admin.settings.levelText")),m("div",{class:"helpText"},o().translator.trans("foskym-custom-levels.admin.settings.levelDesc")),m("input",{type:"text",className:"FormControl",bidi:this.setting("foskym-custom-levels.levelText"),placeholder:o().translator.trans("foskym-custom-levels.lib.defaults.level")}))})).registerSetting((function(){return m("div",{className:"Form-group"},m("label",null,o().translator.trans("foskym-custom-levels.admin.settings.expText")),m("div",{class:"helpText"},o().translator.trans("foskym-custom-levels.admin.settings.expDesc")),m("input",{type:"text",className:"FormControl",bidi:this.setting("foskym-custom-levels.expText"),placeholder:o().translator.trans("foskym-custom-levels.lib.defaults.exp")}))})).registerSetting((function(){return m("div",{className:"Form-group"},m("label",null,o().translator.trans("foskym-custom-levels.admin.settings.expFormula")),m("div",{class:"helpText"},o().translator.trans("foskym-custom-levels.admin.settings.expFormulaDesc1")),m("div",{class:"helpText"},o().translator.trans("foskym-custom-levels.admin.settings.expFormulaDesc2")),m("div",{class:"helpText"},o().translator.trans("foskym-custom-levels.admin.settings.expFormulaDesc3")),m("textarea",{rows:3,style:"max-width: 400px;",className:"FormControl",bidi:this.setting("foskym-custom-levels.expFormula"),placeholder:o().translator.trans("foskym-custom-levels.lib.defaults.expFormula")}))})).registerSetting((function(){return m("div",{className:"Form-group"},m("label",null,o().translator.trans("foskym-custom-levels.admin.settings.levelFormula")),m("div",{class:"helpText"},o().translator.trans("foskym-custom-levels.admin.settings.levelFormulaDesc")),m("input",{type:"text",className:"FormControl",bidi:this.setting("foskym-custom-levels.levelFormula"),placeholder:o().translator.trans("foskym-custom-levels.lib.defaults.levelFormula")}))}))}))})(),module.exports=t})();
//# sourceMappingURL=admin.js.map