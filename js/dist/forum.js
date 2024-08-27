/*! For license information please see forum.js.LICENSE.txt */
(()=>{var t={648:(t,e,r)=>{var o=r(288).default;function n(){"use strict";t.exports=n=function(){return r},t.exports.__esModule=!0,t.exports.default=t.exports;var e,r={},a=Object.prototype,s=a.hasOwnProperty,i=Object.defineProperty||function(t,e,r){t[e]=r.value},l="function"==typeof Symbol?Symbol:{},u=l.iterator||"@@iterator",c=l.asyncIterator||"@@asyncIterator",p=l.toStringTag||"@@toStringTag";function m(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{m({},"")}catch(e){m=function(t,e,r){return t[e]=r}}function f(t,e,r,o){var n=e&&e.prototype instanceof b?e:b,a=Object.create(n.prototype),s=new U(o||[]);return i(a,"_invoke",{value:N(t,r,s)}),a}function d(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}r.wrap=f;var v="suspendedStart",h="suspendedYield",y="executing",x="completed",g={};function b(){}function _(){}function w(){}var k={};m(k,u,(function(){return this}));var L=Object.getPrototypeOf,T=L&&L(L(C([])));T&&T!==a&&s.call(T,u)&&(k=T);var E=w.prototype=b.prototype=Object.create(k);function P(t){["next","throw","return"].forEach((function(e){m(t,e,(function(t){return this._invoke(e,t)}))}))}function O(t,e){function r(n,a,i,l){var u=d(t[n],t,a);if("throw"!==u.type){var c=u.arg,p=c.value;return p&&"object"==o(p)&&s.call(p,"__await")?e.resolve(p.__await).then((function(t){r("next",t,i,l)}),(function(t){r("throw",t,i,l)})):e.resolve(p).then((function(t){c.value=t,i(c)}),(function(t){return r("throw",t,i,l)}))}l(u.arg)}var n;i(this,"_invoke",{value:function(t,o){function a(){return new e((function(e,n){r(t,o,e,n)}))}return n=n?n.then(a,a):a()}})}function N(t,r,o){var n=v;return function(a,s){if(n===y)throw new Error("Generator is already running");if(n===x){if("throw"===a)throw s;return{value:e,done:!0}}for(o.method=a,o.arg=s;;){var i=o.delegate;if(i){var l=j(i,o);if(l){if(l===g)continue;return l}}if("next"===o.method)o.sent=o._sent=o.arg;else if("throw"===o.method){if(n===v)throw n=x,o.arg;o.dispatchException(o.arg)}else"return"===o.method&&o.abrupt("return",o.arg);n=y;var u=d(t,r,o);if("normal"===u.type){if(n=o.done?x:h,u.arg===g)continue;return{value:u.arg,done:o.done}}"throw"===u.type&&(n=x,o.method="throw",o.arg=u.arg)}}}function j(t,r){var o=r.method,n=t.iterator[o];if(n===e)return r.delegate=null,"throw"===o&&t.iterator.return&&(r.method="return",r.arg=e,j(t,r),"throw"===r.method)||"return"!==o&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+o+"' method")),g;var a=d(n,t.iterator,r.arg);if("throw"===a.type)return r.method="throw",r.arg=a.arg,r.delegate=null,g;var s=a.arg;return s?s.done?(r[t.resultName]=s.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,g):s:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,g)}function S(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function M(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function U(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(S,this),this.reset(!0)}function C(t){if(t||""===t){var r=t[u];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,a=function r(){for(;++n<t.length;)if(s.call(t,n))return r.value=t[n],r.done=!1,r;return r.value=e,r.done=!0,r};return a.next=a}}throw new TypeError(o(t)+" is not iterable")}return _.prototype=w,i(E,"constructor",{value:w,configurable:!0}),i(w,"constructor",{value:_,configurable:!0}),_.displayName=m(w,p,"GeneratorFunction"),r.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===_||"GeneratorFunction"===(e.displayName||e.name))},r.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,w):(t.__proto__=w,m(t,p,"GeneratorFunction")),t.prototype=Object.create(E),t},r.awrap=function(t){return{__await:t}},P(O.prototype),m(O.prototype,c,(function(){return this})),r.AsyncIterator=O,r.async=function(t,e,o,n,a){void 0===a&&(a=Promise);var s=new O(f(t,e,o,n),a);return r.isGeneratorFunction(e)?s:s.next().then((function(t){return t.done?t.value:s.next()}))},P(E),m(E,p,"Generator"),m(E,u,(function(){return this})),m(E,"toString",(function(){return"[object Generator]"})),r.keys=function(t){var e=Object(t),r=[];for(var o in e)r.push(o);return r.reverse(),function t(){for(;r.length;){var o=r.pop();if(o in e)return t.value=o,t.done=!1,t}return t.done=!0,t}},r.values=C,U.prototype={constructor:U,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(M),!t)for(var r in this)"t"===r.charAt(0)&&s.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function o(o,n){return i.type="throw",i.arg=t,r.next=o,n&&(r.method="next",r.arg=e),!!n}for(var n=this.tryEntries.length-1;n>=0;--n){var a=this.tryEntries[n],i=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var l=s.call(a,"catchLoc"),u=s.call(a,"finallyLoc");if(l&&u){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(l){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&s.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var n=o;break}}n&&("break"===t||"continue"===t)&&n.tryLoc<=e&&e<=n.finallyLoc&&(n=null);var a=n?n.completion:{};return a.type=t,a.arg=e,n?(this.method="next",this.next=n.finallyLoc,g):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),g},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),M(r),g}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var o=r.completion;if("throw"===o.type){var n=o.arg;M(r)}return n}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,o){return this.delegate={iterator:C(t),resultName:r,nextLoc:o},"next"===this.method&&(this.arg=e),g}},r}t.exports=n,t.exports.__esModule=!0,t.exports.default=t.exports},288:t=>{function e(r){return t.exports=e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.__esModule=!0,t.exports.default=t.exports,e(r)}t.exports=e,t.exports.__esModule=!0,t.exports.default=t.exports},357:(t,e,r)=>{var o=r(648)();t.exports=o;try{regeneratorRuntime=o}catch(t){"object"==typeof globalThis?globalThis.regeneratorRuntime=o:Function("r","regeneratorRuntime = r")(o)}}},e={};function r(o){var n=e[o];if(void 0!==n)return n.exports;var a=e[o]={exports:{}};return t[o](a,a.exports,r),a.exports}r.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return r.d(e,{a:e}),e},r.d=(t,e)=>{for(var o in e)r.o(e,o)&&!r.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var o={};(()=>{"use strict";r.r(o),r.d(o,{extend:()=>f});const t=flarum.core.compat["common/extenders"];var e=r.n(t);const n=flarum.core.compat["common/models/User"];var a=r.n(n);function s(t,e){return s=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},s(t,e)}function i(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,s(t,e)}const l=flarum.core.compat["common/Model"];var u=r.n(l),c=function(t){function e(){for(var e,r=arguments.length,o=new Array(r),n=0;n<r;n++)o[n]=arguments[n];return(e=t.call.apply(t,[this].concat(o))||this).name=u().attribute("name"),e.min_exp_required=u().attribute("min_exp_required"),e}return i(e,t),e}(u()),p=function(t){function e(){for(var e,r=arguments.length,o=new Array(r),n=0;n<r;n++)o[n]=arguments[n];return(e=t.call.apply(t,[this].concat(o))||this).user_id=u().attribute("user_id"),e.exp=u().attribute("exp"),e.type=u().attribute("type"),e.relationship=u().attribute("relationship"),e.created_at=u().attribute("created_at"),e}return i(e,t),e}(u());const f=[new(e().Model)(a()).attribute("expLevel").attribute("expPercent").attribute("expTotal").attribute("expNext").attribute("expNextNeed"),(new(e().Store)).add("levels",c).add("exp-logs",p)],d=flarum.core.compat["forum/app"];var v=r.n(d);const h=flarum.core.compat["common/extend"],y=flarum.core.compat["forum/components/UserPage"];var x=r.n(y);const g=flarum.core.compat["forum/components/PostUser"];var b=r.n(g);const _=flarum.core.compat["forum/components/UserCard"];var w=r.n(_);const k=flarum.core.compat["forum/components/CommentPost"];var L=r.n(k);flarum.core.compat["common/models/Post"];const T=flarum.core.compat["common/components/Button"];var E=r.n(T);const P=flarum.core.compat["forum/utils/UserControls"];var O=r.n(P);const N=flarum.core.compat["common/components/LinkButton"];var j=r.n(N);const S=flarum.core.compat["forum/components/NotificationGrid"];var M=r.n(S);const U=flarum.core.compat["common/app"];var C=r.n(U);const F=flarum.core.compat["common/Component"];var G=r.n(F);const B=flarum.core.compat["common/components/Tooltip"];var R=r.n(B);const I=flarum.core.compat["common/utils/extractText"];var q=r.n(I),A=function(t){function e(){return t.apply(this,arguments)||this}i(e,t);var r=e.prototype;return r.oninit=function(e){t.prototype.oninit.call(this,e)},r.view=function(){var t,e,r,o=this.attrs.user,n=!1;return t=C().forum.attribute("foskym-custom-levels.levelText")||q()(C().translator.trans("foskym-custom-levels.lib.defaults.level")),e=C().forum.attribute("foskym-custom-levels.expText")||q()(C().translator.trans("foskym-custom-levels.lib.defaults.exp")),r=C().forum.attribute("foskym-custom-levels.expTooltip")||q()(C().translator.trans("foskym-custom-levels.lib.defaults.tooltip")),o.expTotal()<0||o.expPercent()<0||o.expLevel()<0?(n=!0,e=q()(C().translator.trans("foskym-custom-levels.lib.error.calculation"))):(r=(r=(r=(r=r.replace("[expTotal]",o.expTotal())).replace("[expPercent]",o.expPercent())).replace("[nextLevel]",o.expNext())).replace("[expToNextLevel]",o.expNextNeed()),e=e.indexOf("[expTotal]")>-1?e.replace("[expTotal]",o.expTotal()):o.expTotal()+" "+e,t=t.indexOf("[level]")>-1?t.replace("[level]",o.expLevel()):t+" "+o.expLevel()),n?m("div",{class:"CustomLevel-level"},e):m(R(),{text:r},m("div",{class:"CustomLevel-level"},m("span",{class:"CustomLevel-text"},t),m("div",{class:"CustomLevel-bar"},m("div",{class:"CustomLevel-bar-value",style:"width: "+o.expPercent()+"%;"}))))},e}(G());const H=flarum.core.compat["common/components/LoadingIndicator"];var D=r.n(H);const Y=flarum.core.compat["common/components/Placeholder"];var z=r.n(Y);const J=flarum.core.compat["common/utils/humanTime"];var K=r.n(J),Q=function(t){function e(){for(var e,r=arguments.length,o=new Array(r),n=0;n<r;n++)o[n]=arguments[n];return(e=t.call.apply(t,[this].concat(o))||this).records=[],e.loading=!0,e.nomore=!1,e.page=0,e}i(e,t);var r=e.prototype;return r.oninit=function(e){t.prototype.oninit.call(this,e),this.loadUser(m.route.param("username")),this.loadRecords()},r.loadRecords=function(){var t=this;v().store.find("exp-logs",{page:this.page}).then((function(e){t.records=t.records.concat(e),t.loading=!1,e.length<10&&(t.nomore=!0),m.redraw()}))},r.loadMore=function(){this.page+=1,this.loadRecords()},r.content=function(){var t=this;if(0===this.records.length)return m(z(),{text:v().translator.trans("foskym-custom-levels.forum.log.no_records")});var e="";return v().forum.attribute("foskym-custom-levels.levelText")||q()(v().translator.trans("foskym-custom-levels.lib.defaults.level")),e=v().forum.attribute("foskym-custom-levels.expText")||q()(v().translator.trans("foskym-custom-levels.lib.defaults.exp")),v().forum.attribute("foskym-custom-levels.expTooltip")||q()(v().translator.trans("foskym-custom-levels.lib.defaults.tooltip")),m("div",{className:"ExpLogPage"},m("ul",{className:"ExpLogRecords"},this.records.map((function(t){return m("li",{className:"ExpLogRecord"},m("h5",null,m("span",null,(t.exp()>0?"+":"")+(e.indexOf("[expTotal]")>-1?e.replace("[expTotal]",t.exp()):t.exp()+" "+e)),m("span",null,K()(t.created_at()))),m("p",null,v().translator.trans("foskym-custom-levels.forum.log.type."+t.type()),m("span",null,t.relationship().post_id?m(j(),{href:"/d/"+t.relationship().discussion_id+"/"+t.relationship().post_number,target:"_blank"},v().translator.trans("foskym-custom-levels.forum.log.view")):t.relationship().discussion_id?m(j(),{href:"/d/"+t.relationship().discussion_id,target:"_blank"},v().translator.trans("foskym-custom-levels.forum.log.view")):"forum_quests"===t.type()&&"xypp-forum-quests"in flarum.extensions?m(j(),{href:"/quest_page",target:"_blank"},v().translator.trans("foskym-custom-levels.forum.log.view")):"store_purchase"===t.type()&&"xypp-store"in flarum.extensions?m(j(),{href:"/u/"+m.route.param("username")+"/purchase_history"},v().translator.trans("foskym-custom-levels.forum.log.view")):"")),m("hr",null))}))),this.loading&&m(D(),{display:"block"}),!this.loading&&!this.nomore&&m("div",{style:"text-align:center;padding:20px"},m(E(),{className:"Button Button--primary",disabled:this.loading,loading:this.loading,onclick:function(){return t.loadMore()}},v().translator.trans("foskym-custom-levels.forum.log.load_more"))),this.nomore&&m(z(),{text:v().translator.trans("foskym-custom-levels.forum.log.no_more")}))},e}(x());const V=flarum.core.compat["forum/components/Notification"];var W=r.n(V);flarum.core.compat["common/helpers/username"];var X=function(t){function e(){return t.apply(this,arguments)||this}i(e,t);var r=e.prototype;return r.icon=function(){return"fas fa-level-up-alt"},r.href=function(){var t=this.attrs.notification.fromUser();return v().route("user.expLogs",{username:t.username()})},r.content=function(){var t,e=this.attrs.notification.content()||{};return t=(t=v().forum.attribute("foskym-custom-levels.levelText")||q()(v().translator.trans("foskym-custom-levels.lib.defaults.level"))).indexOf("[level]")>-1?t.replace("[level]",e.level):t+" "+e.level,v().translator.trans("foskym-custom-levels.forum.notifications.level_updated",{level:t})},e}(W());const Z=flarum.core.compat["common/components/Modal"];var $=r.n(Z);const tt=flarum.core.compat["common/utils/Stream"];var et=r.n(tt),rt=function(t){function e(){return t.apply(this,arguments)||this}i(e,t);var r=e.prototype;return r.oninit=function(e){t.prototype.oninit.call(this,e),this.exp=et()(this.attrs.user.data.attributes.exp||0)},r.className=function(){return"EditExpModal Modal--small"},r.title=function(){return v().translator.trans("foskym-custom-levels.forum.modal.title",{user:this.attrs.user})},r.content=function(){var t=v().forum.attribute("foskym-custom-levels.expText")||q()(v().translator.trans("foskym-custom-levels.lib.defaults.exp"));return t=t.indexOf("[expTotal]")>-1?t.replace("[expTotal]",this.attrs.user.data.attributes.exp):this.attrs.user.data.attributes.exp+" "+t,m("div",{className:"Modal-body"},m("div",{className:"Form"},m("div",{className:"Form-group"},m("label",null,v().translator.trans("foskym-custom-levels.forum.modal.current")," ",t),m("input",{required:!0,className:"FormControl",type:"number",step:"1",bidi:this.exp})),m("div",{className:"Form-group"},E().component({className:"Button Button--primary",type:"submit",loading:this.loading},v().translator.trans("foskym-custom-levels.forum.modal.submit_button")))))},r.onsubmit=function(t){var e=this;t.preventDefault(),this.loading=!0,this.attrs.user.save({exp:this.exp()},{errorHandler:this.onerror.bind(this)}).then(this.hide.bind(this)).catch((function(){e.loading=!1,m.redraw()}))},e}($());function ot(t,e,r,o,n,a,s){try{var i=t[a](s),l=i.value}catch(t){return void r(t)}i.done?e(l):Promise.resolve(l).then(o,n)}function nt(t){return function(){var e=this,r=arguments;return new Promise((function(o,n){var a=t.apply(e,r);function s(t){ot(a,o,n,s,i,"next",t)}function i(t){ot(a,o,n,s,i,"throw",t)}s(void 0)}))}}var at,st,it,lt=r(357),ut=r.n(lt);const ct={addFrontendProviders:null==(at=flarum.extensions["xypp-store"])?void 0:at.addFrontendProviders,PurchaseHelper:null==(st=flarum.extensions["xypp-store"])?void 0:st.PurchaseHelper,UseHelper:null==(it=flarum.extensions["xypp-store"])?void 0:it.UseHelper};v().initializers.add("foskym/flarum-custom-levels",(function(){var t,e,r;"xypp-store"in flarum.extensions&&(t=C(),ct.addFrontendProviders("exp",t.translator.trans("foskym-custom-levels.lib.integrations.store.item_name"),function(){var e=nt(ut().mark((function e(r,o){return ut().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r.same_as_use_cnt=q()(t.translator.trans("foskym-custom-levels.lib.integrations.store.provider_data.same_as_use_cnt"));case 1:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}(),(function(e,r){var o=t.forum.attribute("foskym-custom-levels.expText")||q()(t.translator.trans("foskym-custom-levels.lib.defaults.exp"));return o=o.indexOf("[expTotal]")>-1?o.replace("[expTotal]",null==e?void 0:e.use_cnt()):(null==e?void 0:e.use_cnt())+" "+o,m("div",{style:"text-align:center;"},m("br",null),m("p",null,m("i",{class:"fas fa-level-up-alt"})),m("p",null,o))}),function(){var t=nt(ut().mark((function t(e){return ut().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return","");case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())),"fof-user-directory"in flarum.extensions&&(C(),r=null==(e=flarum.extensions["fof-user-directory"])?void 0:e.UserDirectoryState,(0,h.override)(r.prototype,"sortMap",(function(t){var e=t();return e.most_exp="-exp",e.least_exp="exp",e}))),"nodeloc-leaderboard"in flarum.extensions&&function(t){var e,r,o=null==(e=flarum.extensions["nodeloc-leaderboard"])?void 0:e.LeaderBoardState;(0,h.override)(o.prototype,"sortMap",(function(t){var e=t();return e.most_exp="-exp",e.least_exp="exp",e}));var n=null==(r=flarum.extensions["nodeloc-leaderboard"])?void 0:r.components;if(n){var a=null==n?void 0:n.LeaderBoardUserCard;(0,h.override)(a.prototype,"view",(function(t){this.attrs.user;var e=this.attrs.params.sort;return"most_exp"!==e&&"least_exp"!==e||(this.attrs.params.sort="exp"),t()}));var s=null==n?void 0:n.SmallUserCard;(0,h.override)(s.prototype,"view",(function(t){this.attrs.user;var e=this.attrs.params.sort;return"most_exp"!==e&&"least_exp"!==e||(this.attrs.params.sort="exp"),t()}))}}(C()),v().notificationComponents.levelUpdated=X,a().prototype.canEditExp=u().attribute("canEditExp"),(0,h.extend)(O(),"moderationControls",(function(t,e){e.canEditExp()&&t.add("exp",E().component({icon:"fas fa-level-up-alt",onclick:function(){return v().modal.show(rt,{user:e})}},v().translator.trans("foskym-custom-levels.forum.user_controls.edit_exp_button")))})),(0,h.extend)(M().prototype,"notificationTypes",(function(t){t.add("levelUpdated",{name:"levelUpdated",icon:"fas fa-level-up-alt",label:v().translator.trans("foskym-custom-levels.forum.settings.notify_level_updated")})})),v().routes["user.expLogs"]={path:"/u/:username/expLogs",component:Q},(0,h.extend)(x().prototype,"navItems",(function(t){v().session.user&&v().session.user.id()===this.user.id()&&t.add("expLogs",j().component({href:v().route("user.expLogs",{username:this.user.username()}),icon:"fas fa-level-up-alt"},[v().translator.trans("foskym-custom-levels.forum.label.exp_logs")]))})),(0,h.extend)(b().prototype,"view",(function(t){var e=this.attrs.post.user();e&&t.children.push(A.component({user:e}))})),(0,h.extend)(L().prototype,"headerItems",(function(t){var e=this.attrs.post.user();e&&t.add("custom-levels",A.component({user:e}),10)})),(0,h.extend)(w().prototype,"infoItems",(function(t){var e=this.attrs.user;e&&t.add("custom-levels",A.component({user:e}),50)}))}))})(),module.exports=o})();
//# sourceMappingURL=forum.js.map