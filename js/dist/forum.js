(()=>{var e={n:t=>{var o=t&&t.__esModule?()=>t.default:()=>t;return e.d(o,{a:o}),o},d:(t,o)=>{for(var r in o)e.o(o,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:o[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};(()=>{"use strict";e.r(t),e.d(t,{extend:()=>i});const o=flarum.core.compat["common/extenders"];var r=e.n(o);const n=flarum.core.compat["common/models/User"];var a=e.n(n);function c(e,t){return c=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},c(e,t)}function l(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,c(e,t)}const s=flarum.core.compat["common/Model"];var u=e.n(s),p=function(e){function t(){for(var t,o=arguments.length,r=new Array(o),n=0;n<o;n++)r[n]=arguments[n];return(t=e.call.apply(e,[this].concat(r))||this).name=u().attribute("name"),t.min_exp_required=u().attribute("min_exp_required"),t}return l(t,e),t}(u());const i=[new(r().Model)(a()).attribute("expLevel").attribute("expPercent").attribute("expTotal").attribute("expNext").attribute("expNextNeed"),(new(r().Store)).add("levels",p)],v=flarum.core.compat["forum/app"];var f=e.n(v);const d=flarum.core.compat["common/extend"],x=flarum.core.compat["forum/components/PostUser"];var y=e.n(x);const b=flarum.core.compat["forum/components/UserCard"];var h=e.n(b);const P=flarum.core.compat["forum/components/CommentPost"];var _=e.n(P);flarum.core.compat["common/models/Post"];const L=flarum.core.compat["common/app"];var O=e.n(L);const T=flarum.core.compat["common/Component"];var C=e.n(T);const j=flarum.core.compat["common/components/Tooltip"];var w=e.n(j);const N=flarum.core.compat["common/utils/extractText"];var g=e.n(N),k=function(e){function t(){return e.apply(this,arguments)||this}l(t,e);var o=t.prototype;return o.oninit=function(t){e.prototype.oninit.call(this,t)},o.view=function(){var e,t,o=this.attrs.user,r=!1;return e=O().forum.attribute("foskym-custom-levels.levelText")||g()(O().translator.trans("foskym-custom-levels.lib.defaults.level")),t=O().forum.attribute("foskym-custom-levels.expText")||g()(O().translator.trans("foskym-custom-levels.lib.defaults.exp")),o.expTotal()<0||o.expPercent()<0||o.expLevel()<0?(r=!0,t=g()(O().translator.trans("foskym-custom-levels.lib.error.calculation"))):(t=(t=(t=(t=t.replace("[expTotal]",o.expTotal())).replace("[expPercent]",o.expPercent())).replace("[nextLevel]",o.expNext())).replace("[expToNextLevel]",o.expNextNeed()),e=e.indexOf("[level]")>-1?e.replace("[level]",o.expLevel()):e+" "+o.expLevel()),r?m("div",{class:"CustomLevel-level"},t):m(w(),{text:t},m("div",{class:"CustomLevel-level"},m("span",{class:"CustomLevel-text"},e),m("div",{class:"CustomLevel-bar"},m("div",{class:"CustomLevel-bar-value",style:"width: "+o.expPercent()+"%;"}))))},t}(C());f().initializers.add("foskym/flarum-custom-levels",(function(){(0,d.extend)(y().prototype,"view",(function(e){var t=this.attrs.post.user();t&&e.children.push(k.component({user:t}))})),(0,d.extend)(_().prototype,"headerItems",(function(e){var t=this.attrs.post.user();t&&e.add("custom-levels",k.component({user:t}),10)})),(0,d.extend)(h().prototype,"infoItems",(function(e){var t=this.attrs.user;t&&e.add("custom-levels",k.component({user:t}),50)}))}))})(),module.exports=t})();
//# sourceMappingURL=forum.js.map