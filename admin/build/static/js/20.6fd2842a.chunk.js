(this.webpackJsonpadmin=this.webpackJsonpadmin||[]).push([[20],{677:function(t,e,n){"use strict";n.d(e,"m",(function(){return i})),n.d(e,"n",(function(){return u})),n.d(e,"g",(function(){return o})),n.d(e,"a",(function(){return c})),n.d(e,"p",(function(){return d})),n.d(e,"f",(function(){return s})),n.d(e,"h",(function(){return l})),n.d(e,"w",(function(){return f})),n.d(e,"q",(function(){return m})),n.d(e,"r",(function(){return g})),n.d(e,"s",(function(){return p})),n.d(e,"l",(function(){return v})),n.d(e,"c",(function(){return N})),n.d(e,"j",(function(){return b})),n.d(e,"v",(function(){return j})),n.d(e,"k",(function(){return D})),n.d(e,"b",(function(){return h})),n.d(e,"i",(function(){return w})),n.d(e,"t",(function(){return O})),n.d(e,"e",(function(){return T})),n.d(e,"d",(function(){return y})),n.d(e,"u",(function(){return x})),n.d(e,"o",(function(){return k}));var r=n(68),a={headers:{"x-access-token":localStorage.adminToken}},i=function(){return r.a.get("/admin/counts",a)},u=function(){return r.a.get("/admin/all-patients",a)},o=function(t){var e=t.status,n=t.id;return r.a.put("/admin/deactive-user/".concat(n),{status:e},a)},c=function(){return r.a.get("/admin/active-doctors",a)},d=function(){return r.a.get("/admin/pending-doctors",a)},s=function(t){return console.log(t),r.a.put("/admin/approve-doc-form/".concat(t),{},a)},l=function(t){return console.log(t),r.a.put("/admin/decline-doc-form/".concat(t),{},a)},f=function(){return r.a.get("/insurance/form?status=accepted",a)},m=function(){return r.a.get("/insurance/form?status=pending",a)},g=function(){return r.a.get("/insurance/form?status=rejected",a)},p=function(t){var e=t.id,n=t.status;return r.a.put("/insurance/form/".concat(e),{status:n},a)},v=function(){return r.a.get("/admin/all-speciality",a)},N=function(t){var e=t.formData;return r.a.post("/admin/new-speciality",e,a)},b=function(t){return r.a.delete("/admin/delete-speciality/".concat(t),a)},j=function(t){var e=t.data,n=t.id;return r.a.put("/admin/update-speciality/".concat(n),e,a)},D=function(){return r.a.get("/admin/all-languages",a)},h=function(t){return r.a.post("/admin/new-language",t,a)},w=function(t){return console.log(t),r.a.delete("/admin/delete-language/".concat(t),a)},O=function(t){return r.a.post("/admin/update-password",t,a)},T=function(){return r.a.get("/admin/all-consultations",a)},y=function(){return r.a.get("/admin/all-appointments",a)},x=function(t){return r.a.post("/admin/update-social-links",t,a)},k=function(){return r.a.get("/admin/get-social-links",a)}},689:function(t,e,n){"use strict";n.d(e,"a",(function(){return s}));var r=n(681),a=n(678),i=36e5,u={dateTimeDelimiter:/[T ]/,timeZoneDelimiter:/[Z ]/i,timezone:/([Z+-].*)$/},o=/^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/,c=/^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/,d=/^([+-])(\d{2})(?::?(\d{2}))?$/;function s(t,e){Object(a.a)(1,arguments);var n=e||{},i=null==n.additionalDigits?2:Object(r.a)(n.additionalDigits);if(2!==i&&1!==i&&0!==i)throw new RangeError("additionalDigits must be 0, 1 or 2");if("string"!==typeof t&&"[object String]"!==Object.prototype.toString.call(t))return new Date(NaN);var u,o=l(t);if(o.date){var c=f(o.date,i);u=m(c.restDateString,c.year)}if(isNaN(u)||!u)return new Date(NaN);var d,s=u.getTime(),g=0;if(o.time&&(g=p(o.time),isNaN(g)||null===g))return new Date(NaN);if(!o.timezone){var v=new Date(s+g),b=new Date(0);return b.setFullYear(v.getUTCFullYear(),v.getUTCMonth(),v.getUTCDate()),b.setHours(v.getUTCHours(),v.getUTCMinutes(),v.getUTCSeconds(),v.getUTCMilliseconds()),b}return d=N(o.timezone),isNaN(d)?new Date(NaN):new Date(s+g+d)}function l(t){var e,n={},r=t.split(u.dateTimeDelimiter);if(r.length>2)return n;if(/:/.test(r[0])?(n.date=null,e=r[0]):(n.date=r[0],e=r[1],u.timeZoneDelimiter.test(n.date)&&(n.date=t.split(u.timeZoneDelimiter)[0],e=t.substr(n.date.length,t.length))),e){var a=u.timezone.exec(e);a?(n.time=e.replace(a[1],""),n.timezone=a[1]):n.time=e}return n}function f(t,e){var n=new RegExp("^(?:(\\d{4}|[+-]\\d{"+(4+e)+"})|(\\d{2}|[+-]\\d{"+(2+e)+"})$)"),r=t.match(n);if(!r)return{year:null};var a=r[1]&&parseInt(r[1]),i=r[2]&&parseInt(r[2]);return{year:null==i?a:100*i,restDateString:t.slice((r[1]||r[2]).length)}}function m(t,e){if(null===e)return null;var n=t.match(o);if(!n)return null;var r=!!n[4],a=g(n[1]),i=g(n[2])-1,u=g(n[3]),c=g(n[4]),d=g(n[5])-1;if(r)return function(t,e,n){return e>=1&&e<=53&&n>=0&&n<=6}(0,c,d)?function(t,e,n){var r=new Date(0);r.setUTCFullYear(t,0,4);var a=r.getUTCDay()||7,i=7*(e-1)+n+1-a;return r.setUTCDate(r.getUTCDate()+i),r}(e,c,d):new Date(NaN);var s=new Date(0);return function(t,e,n){return e>=0&&e<=11&&n>=1&&n<=(b[e]||(j(t)?29:28))}(e,i,u)&&function(t,e){return e>=1&&e<=(j(t)?366:365)}(e,a)?(s.setUTCFullYear(e,i,Math.max(a,u)),s):new Date(NaN)}function g(t){return t?parseInt(t):1}function p(t){var e=t.match(c);if(!e)return null;var n=v(e[1]),r=v(e[2]),a=v(e[3]);return function(t,e,n){if(24===t)return 0===e&&0===n;return n>=0&&n<60&&e>=0&&e<60&&t>=0&&t<25}(n,r,a)?n*i+6e4*r+1e3*a:NaN}function v(t){return t&&parseFloat(t.replace(",","."))||0}function N(t){if("Z"===t)return 0;var e=t.match(d);if(!e)return 0;var n="+"===e[1]?-1:1,r=parseInt(e[2]),a=e[3]&&parseInt(e[3])||0;return function(t,e){return e>=0&&e<=59}(0,a)?n*(r*i+6e4*a):NaN}var b=[31,null,31,30,31,30,31,31,30,31,30,31];function j(t){return t%400===0||t%4===0&&t%100}},867:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return s}));n(680);var r=n(676),a=(n(1),n(870)),i=n(689),u=n(821),o=(n(692),n(677)),c=n(684),d=n(30);function s(){var t=Object(u.a)("allAppointments",o.d),e=t.data,n=t.isLoading;return Object(d.jsxs)(d.Fragment,{children:[n&&Object(d.jsx)(c.a,{}),n||Object(d.jsx)("div",{className:"bg-white p-3 ",children:Object(d.jsx)(r.n,{responsive:!0,items:null===e||void 0===e?void 0:e.data,fields:[{key:"patientName",label:"Patient Name"},{key:"doctorName",label:"Doctor Name"},{key:"reasonOfVisit",label:"Reason of Visit"},{key:"status",label:"Status"},{key:"fee",label:"Fee"},{key:"createdAt"}],columnFilter:!0,tableFilter:!0,footer:!0,itemsPerPageSelect:!0,itemsPerPage:5,hover:!0,sorter:!0,pagination:!0,scopedSlots:{createdAt:function(t){return Object(d.jsx)("td",{children:Object(a.a)(Object(i.a)(t.createdAt),"PPp")})},reasonOfVisit:function(t){return Object(d.jsx)("td",{children:t.reasonOfVisit})},status:function(t){return Object(d.jsx)("td",{children:t.status})},patientName:function(t){return Object(d.jsx)("td",{children:t.patientName})},doctorName:function(t){return Object(d.jsx)("td",{children:t.doctorName})},fee:function(t){return Object(d.jsx)("td",{children:t.fee})}}})})]})}}}]);
//# sourceMappingURL=20.6fd2842a.chunk.js.map