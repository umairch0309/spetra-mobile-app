(this.webpackJsonpclouddoc=this.webpackJsonpclouddoc||[]).push([[34],{1046:function(t,e,n){},1228:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return O}));var r=n(0),i=n(27),s=n(118),u=n(397),c=n(110),o=n(637);var a=n(17),l=n(225),d=n(779),h=n(3);function f(){var t=Object(r.useState)([]),e=Object(s.a)(t,2),n=e[0],f=e[1],v=Object(i.c)((function(t){return t.auth})).user,p=null===v||void 0===v?void 0:v._id,b=null===v||void 0===v?void 0:v.role,O=Object(u.a)("notification",l.e),m=O.data,j=O.isLoading,y=function(t,e){var n=Object(c.b)();return Object(o.a)(e,{onSettled:function(){n.invalidateQueries(t)}})}("notification",l.i);Object(r.useEffect)((function(){var t;if(m)if((null===m||void 0===m||null===(t=m.data)||void 0===t?void 0:t.length)>3){var e,n=null===m||void 0===m||null===(e=m.data)||void 0===e?void 0:e.slice(0,3);f(n)}else f(null===m||void 0===m?void 0:m.data);return function(){}}),[m]);return Object(h.jsxs)("div",{className:"secDiv notificationSec",children:[j||Object(h.jsxs)("div",{className:"mainFlex",children:[Object(h.jsxs)("div",{className:"flexBetweenCenter",children:[Object(h.jsx)("div",{className:"secTitle mb-1",children:"Don\u2019t Forget"}),(null===n||void 0===n?void 0:n.length)>0&&Object(h.jsx)("div",{onClick:function(){f([]),y.mutate()},className:"clearText",children:"Clear"})]}),(null===n||void 0===n?void 0:n.length)<=0?Object(h.jsx)("div",{className:"textColor2 text-center mt-2",children:"No new notifications to note"}):null===n||void 0===n?void 0:n.map((function(t){return Object(h.jsx)(d.a,{item:t,userId:p,role:b},t._id)})),n.length>0&&Object(h.jsx)("div",{className:"centerDiv ",style:{borderRadius:"2rem"},children:Object(h.jsx)("div",{onClick:function(){return a.a.push("/dashboard/notification")},className:"textBlue pointer poppinsSb mt-4",children:"View all"})})]}),Object(h.jsx)("img",{src:"/images/notiBg.png",className:"imgBg d-none d-md-block",alt:"noti"})]})}var v=n(143);function p(){var t=Object(i.c)((function(t){return t.auth})),e=t.user,n=t.loading,r=null===e||void 0===e?void 0:e.role,s=Object(u.a)("counts",v.b),c=s.data,o=s.isLoading,a=null===c||void 0===c?void 0:c.data;return Object(h.jsx)("div",{children:Object(h.jsxs)("div",{className:"welcomeSec",children:[n||Object(h.jsxs)("div",{className:"secTitle mb-1",children:["Hi, ","".concat("doctor"===r?"Dr. ":"").concat(null===e||void 0===e?void 0:e.name)]}),Object(h.jsxs)("div",{className:"flexBetweenCenter welcomeFlex",children:[Object(h.jsxs)("div",{className:"welcomeCard consulationBg",children:[Object(h.jsx)("img",{src:"/images/newCons.png",className:"img"}),Object(h.jsxs)("div",{className:"title",children:["New",Object(h.jsx)("br",{})," Consultation Requests"]}),Object(h.jsx)("div",{className:"value",children:o?0:null===a||void 0===a?void 0:a.consultations})]}),Object(h.jsxs)("div",{className:"welcomeCard revenueBg",children:[Object(h.jsx)("img",{src:"/images/upIcon.png",className:"img"}),Object(h.jsxs)("div",{className:"title",children:["New",Object(h.jsx)("br",{})," Appointment Requests"]}),Object(h.jsx)("div",{className:"value",children:o?0:null===a||void 0===a?void 0:a.appointments})]}),Object(h.jsxs)("div",{className:"welcomeCard consulationBg2",children:[Object(h.jsx)("img",{src:"/images/tick.png",className:"img"}),Object(h.jsxs)("div",{className:"title",children:["Total",Object(h.jsx)("br",{})," Completed Consultations"]}),Object(h.jsx)("div",{className:"value",children:o?0:null===a||void 0===a?void 0:a.completed})]})]})]})})}var b=n(202);n(1046);function O(){var t=Object(i.b)();return Object(r.useEffect)((function(){return t(Object(b.a)("Dashboard")),function(){}}),[]),Object(h.jsxs)("div",{className:"contentRow dashboard",children:[Object(h.jsx)(p,{}),Object(h.jsx)(f,{})]})}},143:function(t,e,n){"use strict";n.d(e,"e",(function(){return c})),n.d(e,"h",(function(){return o})),n.d(e,"g",(function(){return a})),n.d(e,"b",(function(){return l})),n.d(e,"c",(function(){return d})),n.d(e,"a",(function(){return h})),n.d(e,"f",(function(){return f})),n.d(e,"d",(function(){return v}));var r=n(15),i=n(28),s=n(41),u=n.n(s),c=function(){return u.a.get("https://extreme-ip-lookup.com/json/")},o=function(t){return Object(i.c)(),r.a.post("/docprofile/new-booking",t)},a=function(){return r.a.get("/admin/get-social-links")},l=function(){return Object(i.c)(),r.a.get("/auth/dashboard-counts")},d=function(){return Object(i.c)(),r.a.get("/admin/all-speciality?featured=true")},h=function(){return Object(i.c)(),r.a.get("/admin/all-speciality")},f=function(){return Object(i.c)(),r.a.get("/patprofile")},v=function(){return Object(i.c)(),r.a.get("/insurance/profile")}},202:function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));var r=n(35),i=function(t){return{type:r.b,payload:t}}},225:function(t,e,n){"use strict";n.d(e,"e",(function(){return o})),n.d(e,"f",(function(){return a})),n.d(e,"i",(function(){return l})),n.d(e,"d",(function(){return d})),n.d(e,"g",(function(){return h})),n.d(e,"j",(function(){return f})),n.d(e,"a",(function(){return v})),n.d(e,"c",(function(){return p})),n.d(e,"b",(function(){return b})),n.d(e,"h",(function(){return O}));var r=n(16),i=n.n(r),s=n(25),u=n(15),c=n(28),o=function(){return Object(c.c)(),u.a.get("/notification/?seen=true")},a=function(){return Object(c.c)(),u.a.get("/notification/")},l=function(){return Object(c.c)(),u.a.delete("/notification/")},d=function(){return Object(c.c)(),u.a.get("/docprofile")},h=function(){return Object(c.c)(),u.a.get("/patprofile")},f=function(t){var e="physical"===(null===t||void 0===t?void 0:t.type)?{physicalTimeSlot:t.slots}:{videoTimeSlot:t.slots};return Object(c.c)(),u.a.put("/docprofile/update-event",e)},v=function(t){var e=t.queryKey[1];return Object(c.c)(),u.a.get("/booking/?visitType=physical&&count=".concat(e))},p=function(t){var e=t.queryKey[1];return Object(c.c)(),u.a.get("/booking/?visitType=video&&count=".concat(e))},b=function(){var t=Object(s.a)(i.a.mark((function t(){var e,n;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return Object(c.c)(),t.next=3,u.a.get("/chat/token");case 3:return e=t.sent,n=e.data,t.abrupt("return",n);case 6:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),O=function(t){var e=t.queryKey[1];return Object(c.c)(),u.a.get("/patprofile/get-payments?count=".concat(e))}},397:function(t,e,n){"use strict";n.d(e,"a",(function(){return g}));var r=n(2),i=n(9),s=n(1),u=n(8),c=n(20),o=n(19),a=n(32),l=n(12),d=function(t){function e(e,n){var r;return(r=t.call(this)||this).client=e,r.options=n,r.trackedProps=[],r.previousSelectError=null,r.bindMethods(),r.setOptions(n),r}Object(i.a)(e,t);var n=e.prototype;return n.bindMethods=function(){this.remove=this.remove.bind(this),this.refetch=this.refetch.bind(this)},n.onSubscribe=function(){1===this.listeners.length&&(this.currentQuery.addObserver(this),h(this.currentQuery,this.options)&&this.executeFetch(),this.updateTimers())},n.onUnsubscribe=function(){this.listeners.length||this.destroy()},n.shouldFetchOnReconnect=function(){return t=this.currentQuery,!1!==(e=this.options).enabled&&("always"===e.refetchOnReconnect||!1!==e.refetchOnReconnect&&v(t,e));var t,e},n.shouldFetchOnWindowFocus=function(){return t=this.currentQuery,!1!==(e=this.options).enabled&&("always"===e.refetchOnWindowFocus||!1!==e.refetchOnWindowFocus&&v(t,e));var t,e},n.destroy=function(){this.listeners=[],this.clearTimers(),this.currentQuery.removeObserver(this)},n.setOptions=function(t,e){var n=this.options,r=this.currentQuery;if(this.options=this.client.defaultQueryObserverOptions(t),"undefined"!==typeof this.options.enabled&&"boolean"!==typeof this.options.enabled)throw new Error("Expected enabled to be a boolean");this.options.queryKey||(this.options.queryKey=n.queryKey),this.updateQuery();var i=this.hasListeners();i&&f(this.currentQuery,r,this.options,n)&&this.executeFetch(),this.updateResult(e),!i||this.currentQuery===r&&this.options.enabled===n.enabled&&this.options.staleTime===n.staleTime||this.updateStaleTimeout(),!i||this.currentQuery===r&&this.options.enabled===n.enabled&&this.options.refetchInterval===n.refetchInterval||this.updateRefetchInterval()},n.getOptimisticResult=function(t){var e=this.client.defaultQueryObserverOptions(t),n=this.client.getQueryCache().build(this.client,e);return this.createResult(n,e)},n.getCurrentResult=function(){return this.currentResult},n.trackResult=function(t){var e=this,n={};return Object.keys(t).forEach((function(r){Object.defineProperty(n,r,{configurable:!1,enumerable:!0,get:function(){var n=r;return e.trackedProps.includes(n)||e.trackedProps.push(n),t[n]}})})),n},n.getNextResult=function(t){var e=this;return new Promise((function(n,r){var i=e.subscribe((function(e){e.isFetching||(i(),e.isError&&(null==t?void 0:t.throwOnError)?r(e.error):n(e))}))}))},n.getCurrentQuery=function(){return this.currentQuery},n.remove=function(){this.client.getQueryCache().remove(this.currentQuery)},n.refetch=function(t){return this.fetch(Object(r.a)({},t,{meta:{refetchPage:null==t?void 0:t.refetchPage}}))},n.fetchOptimistic=function(t){var e=this,n=this.client.defaultQueryObserverOptions(t),r=this.client.getQueryCache().build(this.client,n);return r.fetch().then((function(){return e.createResult(r,n)}))},n.fetch=function(t){var e=this;return this.executeFetch(t).then((function(){return e.updateResult(),e.currentResult}))},n.executeFetch=function(t){this.updateQuery();var e=this.currentQuery.fetch(this.options,t);return(null==t?void 0:t.throwOnError)||(e=e.catch(s.i)),e},n.updateStaleTimeout=function(){var t=this;if(this.clearStaleTimeout(),!s.e&&!this.currentResult.isStale&&Object(s.f)(this.options.staleTime)){var e=Object(s.r)(this.currentResult.dataUpdatedAt,this.options.staleTime)+1;this.staleTimeoutId=setTimeout((function(){t.currentResult.isStale||t.updateResult()}),e)}},n.updateRefetchInterval=function(){var t=this;this.clearRefetchInterval(),!s.e&&!1!==this.options.enabled&&Object(s.f)(this.options.refetchInterval)&&(this.refetchIntervalId=setInterval((function(){(t.options.refetchIntervalInBackground||c.a.isFocused())&&t.executeFetch()}),this.options.refetchInterval))},n.updateTimers=function(){this.updateStaleTimeout(),this.updateRefetchInterval()},n.clearTimers=function(){this.clearStaleTimeout(),this.clearRefetchInterval()},n.clearStaleTimeout=function(){clearTimeout(this.staleTimeoutId),this.staleTimeoutId=void 0},n.clearRefetchInterval=function(){clearInterval(this.refetchIntervalId),this.refetchIntervalId=void 0},n.createResult=function(t,e){var n,r=this.currentQuery,i=this.options,u=this.currentResult,c=this.currentResultState,o=this.currentResultOptions,l=t!==r,d=l?t.state:this.currentQueryInitialState,p=l?this.currentResult:this.previousQueryResult,b=t.state,O=b.dataUpdatedAt,m=b.error,j=b.errorUpdatedAt,y=b.isFetching,g=b.status,R=!1,x=!1;if(e.optimisticResults){var S=this.hasListeners(),C=!S&&h(t,e),E=S&&f(t,r,e,i);(C||E)&&(y=!0,O||(g="loading"))}if(e.keepPreviousData&&!b.dataUpdateCount&&(null==p?void 0:p.isSuccess)&&"error"!==g)n=p.data,O=p.dataUpdatedAt,g=p.status,R=!0;else if(e.select&&"undefined"!==typeof b.data)if(u&&b.data===(null==c?void 0:c.data)&&e.select===(null==o?void 0:o.select)&&!this.previousSelectError)n=u.data;else try{n=e.select(b.data),!1!==e.structuralSharing&&(n=Object(s.n)(null==u?void 0:u.data,n)),this.previousSelectError=null}catch(Q){Object(a.a)().error(Q),m=Q,this.previousSelectError=Q,j=Date.now(),g="error"}else n=b.data;if("undefined"!==typeof e.placeholderData&&"undefined"===typeof n&&("loading"===g||"idle"===g)){var w;if((null==u?void 0:u.isPlaceholderData)&&e.placeholderData===(null==o?void 0:o.placeholderData))w=u.data;else if(w="function"===typeof e.placeholderData?e.placeholderData():e.placeholderData,e.select&&"undefined"!==typeof w)try{w=e.select(w),!1!==e.structuralSharing&&(w=Object(s.n)(null==u?void 0:u.data,w)),this.previousSelectError=null}catch(Q){Object(a.a)().error(Q),m=Q,this.previousSelectError=Q,j=Date.now(),g="error"}"undefined"!==typeof w&&(g="success",n=w,x=!0)}return{status:g,isLoading:"loading"===g,isSuccess:"success"===g,isError:"error"===g,isIdle:"idle"===g,data:n,dataUpdatedAt:O,error:m,errorUpdatedAt:j,failureCount:b.fetchFailureCount,isFetched:b.dataUpdateCount>0||b.errorUpdateCount>0,isFetchedAfterMount:b.dataUpdateCount>d.dataUpdateCount||b.errorUpdateCount>d.errorUpdateCount,isFetching:y,isLoadingError:"error"===g&&0===b.dataUpdatedAt,isPlaceholderData:x,isPreviousData:R,isRefetchError:"error"===g&&0!==b.dataUpdatedAt,isStale:v(t,e),refetch:this.refetch,remove:this.remove}},n.shouldNotifyListeners=function(t,e){if(!e)return!0;if(t===e)return!1;var n=this.options,r=n.notifyOnChangeProps,i=n.notifyOnChangePropsExclusions;if(!r&&!i)return!0;if("tracked"===r&&!this.trackedProps.length)return!0;var s="tracked"===r?this.trackedProps:r;return Object.keys(t).some((function(n){var r=n,u=t[r]!==e[r],c=null==s?void 0:s.some((function(t){return t===n})),o=null==i?void 0:i.some((function(t){return t===n}));return u&&!o&&(!s||c)}))},n.updateResult=function(t){var e=this.currentResult;if(this.currentResult=this.createResult(this.currentQuery,this.options),this.currentResultState=this.currentQuery.state,this.currentResultOptions=this.options,!Object(s.p)(this.currentResult,e)){var n={cache:!0};!1!==(null==t?void 0:t.listeners)&&this.shouldNotifyListeners(this.currentResult,e)&&(n.listeners=!0),this.notify(Object(r.a)({},n,t))}},n.updateQuery=function(){var t=this.client.getQueryCache().build(this.client,this.options);if(t!==this.currentQuery){var e=this.currentQuery;this.currentQuery=t,this.currentQueryInitialState=t.state,this.previousQueryResult=this.currentResult,this.hasListeners()&&(null==e||e.removeObserver(this),t.addObserver(this))}},n.onQueryUpdate=function(t){var e={};"success"===t.type?e.onSuccess=!0:"error"!==t.type||Object(l.c)(t.error)||(e.onError=!0),this.updateResult(e),this.hasListeners()&&this.updateTimers()},n.notify=function(t){var e=this;u.a.batch((function(){t.onSuccess?(null==e.options.onSuccess||e.options.onSuccess(e.currentResult.data),null==e.options.onSettled||e.options.onSettled(e.currentResult.data,null)):t.onError&&(null==e.options.onError||e.options.onError(e.currentResult.error),null==e.options.onSettled||e.options.onSettled(void 0,e.currentResult.error)),t.listeners&&e.listeners.forEach((function(t){t(e.currentResult)})),t.cache&&e.client.getQueryCache().notify({query:e.currentQuery,type:"observerResultsUpdated"})}))},e}(o.a);function h(t,e){return function(t,e){return!1!==e.enabled&&!t.state.dataUpdatedAt&&!("error"===t.state.status&&!1===e.retryOnMount)}(t,e)||function(t,e){return!1!==e.enabled&&t.state.dataUpdatedAt>0&&("always"===e.refetchOnMount||!1!==e.refetchOnMount&&v(t,e))}(t,e)}function f(t,e,n,r){return!1!==n.enabled&&(t!==e||!1===r.enabled)&&("error"!==t.state.status||!1===r.enabled)&&v(t,n)}function v(t,e){return t.isStaleByTime(e.staleTime)}var p=n(0),b=n.n(p);function O(){var t=!1;return{clearReset:function(){t=!1},reset:function(){t=!0},isReset:function(){return t}}}var m=b.a.createContext(O()),j=n(110);function y(t,e){var n=b.a.useRef(!1),r=b.a.useState(0)[1],i=Object(j.b)(),s=b.a.useContext(m),c=i.defaultQueryObserverOptions(t);c.optimisticResults=!0,c.onError&&(c.onError=u.a.batchCalls(c.onError)),c.onSuccess&&(c.onSuccess=u.a.batchCalls(c.onSuccess)),c.onSettled&&(c.onSettled=u.a.batchCalls(c.onSettled)),c.suspense&&"number"!==typeof c.staleTime&&(c.staleTime=1e3),(c.suspense||c.useErrorBoundary)&&(s.isReset()||(c.retryOnMount=!1));var o=b.a.useState((function(){return new e(i,c)}))[0],a=o.getOptimisticResult(c);if(b.a.useEffect((function(){n.current=!0,s.clearReset();var t=o.subscribe(u.a.batchCalls((function(){n.current&&r((function(t){return t+1}))})));return o.updateResult(),function(){n.current=!1,t()}}),[s,o]),b.a.useEffect((function(){o.setOptions(c,{listeners:!1})}),[c,o]),c.suspense&&a.isLoading)throw o.fetchOptimistic(c).then((function(t){var e=t.data;null==c.onSuccess||c.onSuccess(e),null==c.onSettled||c.onSettled(e,null)})).catch((function(t){s.clearReset(),null==c.onError||c.onError(t),null==c.onSettled||c.onSettled(void 0,t)}));if((c.suspense||c.useErrorBoundary)&&a.isError&&!a.isFetching)throw a.error;return"tracked"===c.notifyOnChangeProps&&(a=o.trackResult(a)),a}function g(t,e,n){return y(Object(s.l)(t,e,n),d)}},637:function(t,e,n){"use strict";n.d(e,"a",(function(){return h}));var r=n(2),i=n(0),s=n.n(i),u=n(8),c=n(1),o=n(9),a=n(44),l=function(t){function e(e,n){var r;return(r=t.call(this)||this).client=e,r.setOptions(n),r.bindMethods(),r.updateResult(),r}Object(o.a)(e,t);var n=e.prototype;return n.bindMethods=function(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)},n.setOptions=function(t){this.options=this.client.defaultMutationOptions(t)},n.onUnsubscribe=function(){var t;this.listeners.length||(null==(t=this.currentMutation)||t.removeObserver(this))},n.onMutationUpdate=function(t){this.updateResult();var e={listeners:!0};"success"===t.type?e.onSuccess=!0:"error"===t.type&&(e.onError=!0),this.notify(e)},n.getCurrentResult=function(){return this.currentResult},n.reset=function(){this.currentMutation=void 0,this.updateResult(),this.notify({listeners:!0})},n.mutate=function(t,e){return this.mutateOptions=e,this.currentMutation&&this.currentMutation.removeObserver(this),this.currentMutation=this.client.getMutationCache().build(this.client,Object(r.a)({},this.options,{variables:"undefined"!==typeof t?t:this.options.variables})),this.currentMutation.addObserver(this),this.currentMutation.execute()},n.updateResult=function(){var t=this.currentMutation?this.currentMutation.state:Object(a.b)();this.currentResult=Object(r.a)({},t,{isLoading:"loading"===t.status,isSuccess:"success"===t.status,isError:"error"===t.status,isIdle:"idle"===t.status,mutate:this.mutate,reset:this.reset})},n.notify=function(t){var e=this;u.a.batch((function(){e.mutateOptions&&(t.onSuccess?(null==e.mutateOptions.onSuccess||e.mutateOptions.onSuccess(e.currentResult.data,e.currentResult.variables,e.currentResult.context),null==e.mutateOptions.onSettled||e.mutateOptions.onSettled(e.currentResult.data,null,e.currentResult.variables,e.currentResult.context)):t.onError&&(null==e.mutateOptions.onError||e.mutateOptions.onError(e.currentResult.error,e.currentResult.variables,e.currentResult.context),null==e.mutateOptions.onSettled||e.mutateOptions.onSettled(void 0,e.currentResult.error,e.currentResult.variables,e.currentResult.context))),t.listeners&&e.listeners.forEach((function(t){t(e.currentResult)}))}))},e}(n(19).a),d=n(110);function h(t,e,n){var i=s.a.useRef(!1),o=s.a.useState(0)[1],a=Object(c.k)(t,e,n),h=Object(d.b)(),f=s.a.useRef();f.current?f.current.setOptions(a):f.current=new l(h,a);var v=f.current.getCurrentResult();s.a.useEffect((function(){i.current=!0;var t=f.current.subscribe(u.a.batchCalls((function(){i.current&&o((function(t){return t+1}))})));return function(){i.current=!1,t()}}),[]);var p=s.a.useCallback((function(t,e){f.current.mutate(t,e).catch(c.i)}),[]);if(v.error&&f.current.options.useErrorBoundary)throw v.error;return Object(r.a)({},v,{mutate:p,mutateAsync:v.mutate})}},779:function(t,e,n){"use strict";var r=n(1192),i=n(618),s=n(28),u=n(3);e.a=function(t){var e,n,c,o,a=t.item,l=t.userId,d=t.role;return Object(u.jsxs)("div",{className:"flexBetweenCenter notificationDiv",children:[Object(u.jsxs)("div",{className:"flexCenter",children:[Object(u.jsx)("img",{src:"/images/notiBell.png",className:"img",alt:"noti"}),Object(u.jsx)("div",{className:"d-flex",children:Object(u.jsx)("div",{className:"title",children:"".concat("video"===(null===a||void 0===a||null===(e=a.booking)||void 0===e?void 0:e.visitType)?"Consulation":"Appointment"," with ").concat(null===(n=a["patient"===d?"doctorData":"patientData"])||void 0===n?void 0:n.name," at ").concat(Object(r.a)(Object(i.a)(null===a||void 0===a||null===(c=a.booking)||void 0===c||null===(o=c.bookingDate)||void 0===o?void 0:o.start),"Pp")," ")})})]}),Object(u.jsx)("button",{onClick:function(){return Object(s.b)(a.booking,l)},className:"btn btn-outline-primary btn-sm",children:"join"})]})}}}]);
//# sourceMappingURL=34.19a1d672.chunk.js.map