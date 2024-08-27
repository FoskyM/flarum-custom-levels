(()=>{var t={n:e=>{var s=e&&e.__esModule?()=>e.default:()=>e;return t.d(s,{a:s}),s},d:(e,s)=>{for(var n in s)t.o(s,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:s[n]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};(()=>{"use strict";t.r(e),t.d(e,{extend:()=>v});const s=flarum.core.compat["common/extenders"];var n=t.n(s);const o=flarum.core.compat["common/models/User"];var r=t.n(o);function a(t,e){return a=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},a(t,e)}function l(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,a(t,e)}const i=flarum.core.compat["common/Model"];var c=t.n(i),u=function(t){function e(){for(var e,s=arguments.length,n=new Array(s),o=0;o<s;o++)n[o]=arguments[o];return(e=t.call.apply(t,[this].concat(n))||this).name=c().attribute("name"),e.min_exp_required=c().attribute("min_exp_required"),e}return l(e,t),e}(c()),p=function(t){function e(){for(var e,s=arguments.length,n=new Array(s),o=0;o<s;o++)n[o]=arguments[o];return(e=t.call.apply(t,[this].concat(n))||this).user_id=c().attribute("user_id"),e.exp=c().attribute("exp"),e.type=c().attribute("type"),e.relationship=c().attribute("relationship"),e.created_at=c().attribute("created_at"),e}return l(e,t),e}(c());const v=[new(n().Model)(r()).attribute("expLevel").attribute("expPercent").attribute("expTotal").attribute("expNext").attribute("expNextNeed"),(new(n().Store)).add("levels",u).add("exp-logs",p)],d=flarum.core.compat["admin/app"];var f=t.n(d);flarum.core.compat.extend;const g=flarum.core.compat["admin/components/ExtensionPage"];var h=t.n(g);const x=flarum.core.compat["common/components/Button"];var y=t.n(x);const b=flarum.core.compat["admin/components/AdminPage"];var k=t.n(b);const N=flarum.core.compat["common/app"];var F=t.n(N);const T=flarum.core.compat["common/Component"];var _=t.n(T);const C=flarum.core.compat["common/components/Tooltip"];var P=t.n(C);const L=flarum.core.compat["common/utils/extractText"];var S=t.n(L),w=function(t){function e(){return t.apply(this,arguments)||this}l(e,t);var s=e.prototype;return s.oninit=function(e){t.prototype.oninit.call(this,e)},s.view=function(){var t,e,s,n=this.attrs.user,o=!1;return t=F().forum.attribute("foskym-custom-levels.levelText")||S()(F().translator.trans("foskym-custom-levels.lib.defaults.level")),e=F().forum.attribute("foskym-custom-levels.expText")||S()(F().translator.trans("foskym-custom-levels.lib.defaults.exp")),s=F().forum.attribute("foskym-custom-levels.expTooltip")||S()(F().translator.trans("foskym-custom-levels.lib.defaults.tooltip")),n.expTotal()<0||n.expPercent()<0||n.expLevel()<0?(o=!0,e=S()(F().translator.trans("foskym-custom-levels.lib.error.calculation"))):(s=(s=(s=(s=s.replace("[expTotal]",n.expTotal())).replace("[expPercent]",n.expPercent())).replace("[nextLevel]",n.expNext())).replace("[expToNextLevel]",n.expNextNeed()),e=e.indexOf("[expTotal]")>-1?e.replace("[expTotal]",n.expTotal()):n.expTotal()+" "+e,t=t.indexOf("[level]")>-1?t.replace("[level]",n.expLevel()):t+" "+n.expLevel()),o?m("div",{class:"CustomLevel-level"},e):m(P(),{text:s},m("div",{class:"CustomLevel-level"},m("span",{class:"CustomLevel-text"},t),m("div",{class:"CustomLevel-bar"},m("div",{class:"CustomLevel-bar-value",style:"width: "+n.expPercent()+"%;"}))))},e}(_());const M=flarum.core.compat["common/helpers/avatar"];var B=t.n(M),O=function(t){function e(){for(var e,s=arguments.length,n=new Array(s),o=0;o<s;o++)n[o]=arguments[o];return(e=t.call.apply(t,[this].concat(n))||this).user=f().session.user,e}l(e,t);var s=e.prototype;return s.oninit=function(e){t.prototype.oninit.call(this,e)},s.refresh=function(){var t=this;f().store.find("users",f().session.user.id()).then((function(e){t.user=e,m.redraw()}))},s.header=function(t){return m("[",null)},s.content=function(){var t=f().extensionData.getSettings("foskym-custom-levels");return m("div",{className:"ExtensionPage-settings"},m("div",{className:""},m("div",{className:"Form"},t.map(this.buildSettingComponent.bind(this)),m("div",{className:"Form-group"},m("label",null,f().translator.trans("foskym-custom-levels.admin.preview")),m("div",{style:"margin-left: 6px"},B()(this.user)),w.component({user:this.user})),this.submitButton())))},s.saveSettings=function(e){var s=this;return t.prototype.saveSettings.call(this,e).then((function(){return s.refresh()}))},e}(k());const D=flarum.core.compat["common/components/Page"];var j=t.n(D);const E=flarum.core.compat["common/components/Modal"];var A=t.n(E);const q=flarum.core.compat["common/utils/Stream"];var R=t.n(q),I=function(t){function e(){for(var e,s=arguments.length,n=new Array(s),o=0;o<s;o++)n[o]=arguments[o];return(e=t.call.apply(t,[this].concat(n))||this).level=void 0,e.fields=[],e.values=void 0,e.loading=!1,e}l(e,t);var s=e.prototype;return s.oninit=function(e){var s=this;t.prototype.oninit.call(this,e),this.level=this.attrs.level,this.fields=["name","min_exp_required"],this.values=this.fields.reduce((function(t,e){return t[e]=R()(s.level[e]()||""),t}),{})},s.className=function(){return"EditLevelModal Modal--large"},s.title=function(){return f().translator.trans("foskym-custom-levels.admin.levels.edit_level")},s.content=function(){var t=this;return m("div",{className:"Modal-body"},m("form",{onsubmit:this.onsubmit.bind(this)},m("div",{className:"CustomLevels-Columns"},m("div",{className:"CustomLevels-Column"},this.fields.slice(0,parseInt((this.fields.length/2).toFixed(0))).map((function(e){return m("div",{className:"Form-group"},m("label",null,f().translator.trans("foskym-custom-levels.admin.levels."+e)),m("input",{className:"FormControl",bidi:t.values[e]}))}))),m("div",{className:"CustomLevels-Column"},this.fields.slice(parseInt((this.fields.length/2).toFixed(0)),this.fields.length).map((function(e){return m("div",{className:"Form-group"},m("label",null,f().translator.trans("foskym-custom-levels.admin.levels."+e)),m("input",{className:"FormControl",bidi:t.values[e]}))})))),m("div",{className:"Form-group"},y().component({type:"submit",className:"Button Button--primary Button--block EditLevelModal-save",loading:this.loading},f().translator.trans("core.admin.settings.submit_button")))))},s.onsubmit=function(t){var e=this;t.preventDefault(),this.loading=!0;var s=this.fields.reduce((function(t,s){return t[s]=e.values[s](),t}),{});this.level.save(s).then((function(){e.loading=!1,m.redraw(),e.hide()}))},e}(A()),z=function(t){function e(){for(var e,s=arguments.length,n=new Array(s),o=0;o<s;o++)n[o]=arguments[o];return(e=t.call.apply(t,[this].concat(n))||this).translationPrefix="foskym-custom-levels.admin.levels.",e.levels=[],e}l(e,t);var s=e.prototype;return s.oninit=function(e){var s=this;t.prototype.oninit.call(this,e),f().store.find("levels").then((function(t){s.levels=t,m.redraw()}))},s.view=function(){var t=this;return m("div",{class:"CustomLevels-levelsPage"},m(".Form-group",[m("table",[m("thead",m("tr",[["name","min_exp_required"].map((function(e){return m("th",f().translator.trans(t.translationPrefix+e))})),m("th")])),m("tbody",[this.levels.map((function(e,s){return m("tr",[["name","min_exp_required"].map((function(t){return m("td",e[t]())})),m("td",[y().component({className:"Button Button--icon",icon:"fas fa-edit",onclick:function(){return t.showEditModal(e)}}),y().component({className:"Button Button--icon",icon:"fas fa-times",onclick:function(){confirm(S()(f().translator.trans(t.translationPrefix+"delete_confirmation")))&&(e.delete(),t.levels.splice(s,1))}})])])})),m("tr",m("td",{colspan:2},y().component({className:"Button Button--block",onclick:function(){f().store.createRecord("levels").save({name:t.levels.length,min_exp_required:0}).then((function(e){t.levels.push(e),t.showEditModal(e)}))}},f().translator.trans(this.translationPrefix+"add_button"))))])])]))},s.showEditModal=function(t){f().modal.show(I,{level:t})},e}(j()),U=function(t){function e(){for(var e,s=arguments.length,n=new Array(s),o=0;o<s;o++)n[o]=arguments[o];return(e=t.call.apply(t,[this].concat(n))||this).translationPrefix="foskym-custom-levels.admin.pages.",e.pages={index:O,levels:z},e.icons={index:"home",levels:"list"},e}l(e,t);var s=e.prototype;return s.content=function(){var t=m.route.param().page||"index";return m("div",{className:"ExtensionPage-settings CustomLevels"},m("div",{className:"CustomLevels-menu"},m("div",{className:"container"},this.menuButtons(t))),m("div",{className:"container CustomLevels-container"},this.pageContent(t)))},s.menuButtons=function(t){var e=this;return Object.keys(this.pages).map((function(s){return y().component({className:"Button "+(t===s?"item-selected":""),onclick:function(){return m.route.set(f().route("extension",{id:"foskym-custom-levels",page:s}))},icon:e.iconForPage(s)},f().translator.trans(e.translationPrefix+s))}))},s.iconForPage=function(t){return"fas fa-"+this.icons[t]||0},s.pageContent=function(t){var e=this.pages[t];return e?m(e,null):null},e}(h());f().initializers.add("foskym/flarum-custom-levels",(function(){f().extensionData.for("foskym-custom-levels").registerPage(U).registerSetting((function(){return m("div",{className:"Form-group"},m("label",null,f().translator.trans("foskym-custom-levels.admin.settings.levelText")),m("div",{class:"helpText"},f().translator.trans("foskym-custom-levels.admin.settings.levelDesc")),m("input",{type:"text",className:"FormControl",bidi:this.setting("foskym-custom-levels.levelText"),placeholder:f().translator.trans("foskym-custom-levels.lib.defaults.level")}))})).registerSetting((function(){return m("div",{className:"Form-group"},m("label",null,f().translator.trans("foskym-custom-levels.admin.settings.expText")),m("div",{class:"helpText"},f().translator.trans("foskym-custom-levels.admin.settings.expDesc")),m("input",{type:"text",className:"FormControl",bidi:this.setting("foskym-custom-levels.expText"),placeholder:f().translator.trans("foskym-custom-levels.lib.defaults.exp")}))})).registerSetting((function(){return m("div",{className:"Form-group"},m("label",null,f().translator.trans("foskym-custom-levels.admin.settings.expTooltip")),m("div",{class:"helpText"},f().translator.trans("foskym-custom-levels.admin.settings.expTooltipDesc")),m("input",{type:"text",className:"FormControl",bidi:this.setting("foskym-custom-levels.expTooltip"),placeholder:f().translator.trans("foskym-custom-levels.lib.defaults.tooltip")}))})).registerSetting((function(){return m("div",{className:"Form-group"},m("label",null,f().translator.trans("foskym-custom-levels.admin.settings.expForPost")),m("div",{class:"helpText"},f().translator.trans("foskym-custom-levels.admin.settings.expForPostDesc")),m("input",{type:"text",className:"FormControl",bidi:this.setting("foskym-custom-levels.expForPost")}))})).registerSetting((function(){return m("div",{className:"Form-group"},m("label",null,f().translator.trans("foskym-custom-levels.admin.settings.postMinLength")),m("input",{type:"number",className:"FormControl",bidi:this.setting("foskym-custom-levels.postMinLength")}))})).registerSetting((function(){return m("div",{className:"Form-group"},m("label",null,f().translator.trans("foskym-custom-levels.admin.settings.postMaxTimes")),m("input",{type:"number",className:"FormControl",bidi:this.setting("foskym-custom-levels.postMaxTimes")}))})).registerSetting((function(){return m("div",{className:"Form-group"},m("label",null,f().translator.trans("foskym-custom-levels.admin.settings.expForDiscussion")),m("div",{class:"helpText"},f().translator.trans("foskym-custom-levels.admin.settings.expForDiscussionDesc")),m("input",{type:"text",className:"FormControl",bidi:this.setting("foskym-custom-levels.expForDiscussion")}))})).registerSetting((function(){return m("div",{className:"Form-group"},m("label",null,f().translator.trans("foskym-custom-levels.admin.settings.discussionMaxTimes")),m("input",{type:"number",className:"FormControl",bidi:this.setting("foskym-custom-levels.discussionMaxTimes")}))})).registerSetting((function(){return m("div",{className:"Form-group"},m("label",null,f().translator.trans("foskym-custom-levels.admin.settings.expForLike")),m("div",{class:"helpText"},f().translator.trans("foskym-custom-levels.admin.settings.expForLikeDesc")),m("input",{type:"text",className:"FormControl",bidi:this.setting("foskym-custom-levels.expForLike")}))})).registerSetting({setting:"foskym-custom-levels.autoRemove",label:f().translator.trans("foskym-custom-levels.admin.settings.autoRemove"),type:"select",options:{0:f().translator.trans("foskym-custom-levels.admin.auto_remove.0"),1:f().translator.trans("foskym-custom-levels.admin.auto_remove.1"),2:f().translator.trans("foskym-custom-levels.admin.auto_remove.2")},default:"1"}).registerSetting({setting:"foskym-custom-levels.cascadeRemove",label:f().translator.trans("foskym-custom-levels.admin.settings.cascadeRemove"),type:"checkbox"}).registerPermission({icon:"fas fa-level-up-alt",label:f().translator.trans("foskym-custom-levels.admin.permissions.edit_exp"),permission:"user.edit_exp"},"moderate")}))})(),module.exports=e})();
//# sourceMappingURL=admin.js.map