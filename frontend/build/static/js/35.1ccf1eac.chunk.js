(this.webpackJsonpclouddoc=this.webpackJsonpclouddoc||[]).push([[35],{118:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var i=n(213);function a(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var n=[],i=!0,a=!1,r=void 0;try{for(var c,o=e[Symbol.iterator]();!(i=(c=o.next()).done)&&(n.push(c.value),!t||n.length!==t);i=!0);}catch(l){a=!0,r=l}finally{try{i||null==o.return||o.return()}finally{if(a)throw r}}return n}}(e,t)||Object(i.a)(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},1218:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return Z}));var i=n(118),a=n(0),r=n(27),c=n(107),o=n(17),l=(n(35),n(61)),s=n(30),d=n(28),j=n(3);function u(){var e,t,n=Object(r.c)((function(e){return e.auth})).user,i="None"!==(null===n||void 0===n||null===(e=n.image)||void 0===e?void 0:e.url)?d.d+(null===n||void 0===n||null===(t=n.image)||void 0===t?void 0:t.url):"",a=Object(r.b)();return Object(j.jsxs)("div",{className:"headerProfile",style:{minHeight:"fit-content"},children:[Object(j.jsx)("img",{src:i||"/images/userIcon.png",className:"icon profileImg img pointer",style:{height:"20px",width:"20px"},alt:"noit"}),Object(j.jsxs)("div",{className:"dropDown",style:{maxHeight:"auto !important"},children:[Object(j.jsx)(l.a,{to:"/",children:Object(j.jsx)("div",{className:"item",children:"Home"})}),Object(j.jsx)(l.a,{to:"/dashboard/setting",children:Object(j.jsx)("div",{className:"item",children:"Profile Setting"})}),Object(j.jsx)("div",{className:"divider"}),Object(j.jsx)("div",{onClick:function(){a(Object(s.d)()),o.a.push("/")},className:"item basicTitleSemiBold",children:"Log out"})]})]})}function f(e){var t=e.active,n=e.setHandleActive,i=Object(r.c)((function(e){return e.dashboard})).title;Object(r.b)(),Object(c.h)().pathname;return Object(j.jsx)("div",{children:Object(j.jsxs)("nav",{className:"flexBetweenCenter dashboardNavBar ",children:[Object(j.jsx)("div",{className:"d-inline d-md-none",children:Object(j.jsxs)("div",{onClick:function(){return n(!t)},className:t?" dashboardNavaBarButton activeSideBar ":"dashboardNavaBarButton",children:[Object(j.jsx)("div",{className:"dashboardNavBarLine dashboardNavBarLine1"}),Object(j.jsx)("div",{className:"dashboardNavBarLine dashboardNavBarLine2"}),Object(j.jsx)("div",{className:"dashboardNavBarLine dashboardNavBarLine3"})]})}),"string"===typeof i?Object(j.jsx)("a",{class:"navBrand",children:i}):i,Object(j.jsxs)("div",{className:"flexCenter navIcons",children:[Object(j.jsx)("img",{onClick:function(){return o.a.push("/dashboard/notification")},style:{width:"18px"},src:"/images/noti.png",className:"icon pointer",alt:"noit"}),Object(j.jsx)(u,{})]})]})})}function b(e){var t=e.colorOne,n=e.colorTwo;return Object(j.jsx)("div",{children:Object(j.jsxs)("svg",{width:"40",height:"40",viewBox:"0 0 48 48",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[Object(j.jsx)("g",{filter:"url(#filter0_d)",children:Object(j.jsx)("circle",{cx:"24",cy:"24",r:"19",fill:t})}),Object(j.jsx)("path",{d:"M22.2396 18H18.8021C18.3598 18 18 18.3598 18 18.8021V20.8646C18 21.3069 18.3598 21.6667 18.8021 21.6667H22.2396C22.6819 21.6667 23.0417 21.3069 23.0417 20.8646V18.8021C23.0417 18.3598 22.6819 18 22.2396 18Z",fill:n}),Object(j.jsx)("path",{d:"M22.2396 22.5833H18.8021C18.3598 22.5833 18 22.943 18 23.3854V28.1979C18 28.6402 18.3598 28.9999 18.8021 28.9999H22.2396C22.6819 28.9999 23.0417 28.6402 23.0417 28.1979V23.3854C23.0417 22.943 22.6819 22.5833 22.2396 22.5833Z",fill:n}),Object(j.jsx)("path",{d:"M28.1976 25.3333H24.7601C24.3178 25.3333 23.958 25.693 23.958 26.1354V28.1979C23.958 28.6402 24.3178 28.9999 24.7601 28.9999H28.1976C28.6399 28.9999 28.9997 28.6402 28.9997 28.1979V26.1354C28.9997 25.693 28.6399 25.3333 28.1976 25.3333Z",fill:n}),Object(j.jsx)("path",{d:"M28.1976 18H24.7601C24.3178 18 23.958 18.3598 23.958 18.8021V23.6146C23.958 24.0569 24.3178 24.4167 24.7601 24.4167H28.1976C28.6399 24.4167 28.9997 24.0569 28.9997 23.6146V18.8021C28.9997 18.3598 28.6399 18 28.1976 18V18Z",fill:n}),Object(j.jsx)("defs",{children:Object(j.jsxs)("filter",{id:"filter0_d",x:"0",y:"0",width:"48",height:"48",filterUnits:"userSpaceOnUse","color-interpolation-filters":"sRGB",children:[Object(j.jsx)("feFlood",{"flood-opacity":"0",result:"BackgroundImageFix"}),Object(j.jsx)("feColorMatrix",{in:"SourceAlpha",type:"matrix",values:"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"}),Object(j.jsx)("feOffset",{}),Object(j.jsx)("feGaussianBlur",{stdDeviation:"2.5"}),Object(j.jsx)("feColorMatrix",{type:"matrix",values:"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"}),Object(j.jsx)("feBlend",{mode:"normal",in2:"BackgroundImageFix",result:"effect1_dropShadow"}),Object(j.jsx)("feBlend",{mode:"normal",in:"SourceGraphic",in2:"effect1_dropShadow",result:"shape"})]})})]})})}function h(e){var t=e.colorOne,n=e.colorTwo;return Object(j.jsxs)("svg",{width:"40",height:"40",viewBox:"0 0 48 48",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[Object(j.jsx)("g",{filter:"url(#filter0_d)",children:Object(j.jsx)("circle",{cx:"24",cy:"24",r:"19",fill:t})}),Object(j.jsx)("path",{d:"M28.8237 19.0122H28.6866V19.6954C28.6866 19.8896 28.5291 20.0471 28.335 20.0471C28.1407 20.0471 27.9834 19.8896 27.9834 19.6954V19.0122H26.9527V19.6954C26.9527 19.8896 26.7952 20.0471 26.6011 20.0471C26.4068 20.0471 26.2495 19.8896 26.2495 19.6954V19.0122H25.2188V19.6954C25.2188 19.8896 25.0613 20.0471 24.8672 20.0471C24.6731 20.0471 24.5156 19.8896 24.5156 19.6954V19.0122H23.4844V19.6954C23.4844 19.8896 23.3269 20.0471 23.1328 20.0471C22.9387 20.0471 22.7812 19.8896 22.7812 19.6954V19.0122H21.7505V19.6954C21.7505 19.8896 21.5932 20.0471 21.3989 20.0471C21.2048 20.0471 21.0473 19.8896 21.0473 19.6954V19.0122H20.0166V19.6954C20.0166 19.8896 19.8593 20.0471 19.665 20.0471C19.4709 20.0471 19.3134 19.8896 19.3134 19.6954V19.0122H19.1761C18.5276 19.0122 18 19.54 18 20.189V20.8879H30V20.189C30 19.54 29.4722 19.0122 28.8237 19.0122Z",fill:n}),Object(j.jsx)("path",{d:"M23.6501 26.0089V27.1407H24.3502V26.0089C24.3502 25.8148 24.5075 25.6572 24.7018 25.6572H25.8328V24.9571H24.7018C24.5075 24.9571 24.3502 24.7995 24.3502 24.6054V23.4736H23.6501V24.6054C23.6501 24.7995 23.4926 24.9571 23.2986 24.9571H22.167V25.6572H23.2986C23.4926 25.6572 23.6501 25.8148 23.6501 26.0089Z",fill:n}),Object(j.jsx)("path",{d:"M18 27.8461C18 28.4951 18.5276 29.0229 19.1761 29.0229H28.8237C29.4722 29.0229 30 28.4951 30 27.8461V21.5913H18V27.8461ZM21.4638 24.6053C21.4638 24.411 21.6213 24.2537 21.8154 24.2537H22.947V23.1219C22.947 22.9275 23.1042 22.7702 23.2985 22.7702H24.7017C24.8958 22.7702 25.0533 22.9275 25.0533 23.1219V24.2537H26.1844C26.3784 24.2537 26.5359 24.411 26.5359 24.6053V26.0088C26.5359 26.2032 26.3784 26.3605 26.1844 26.3605H25.0533V27.4923C25.0533 27.6867 24.8958 27.844 24.7017 27.844H23.2985C23.1042 27.844 22.947 27.6867 22.947 27.4923V26.3605H21.8154C21.6213 26.3605 21.4638 26.2032 21.4638 26.0088V24.6053Z",fill:n}),Object(j.jsx)("path",{d:"M23.4844 18.329C23.4844 18.1349 23.3269 17.9773 23.1328 17.9773C22.9387 17.9773 22.7812 18.1349 22.7812 18.329V19.0122H23.4844V18.329Z",fill:n}),Object(j.jsx)("path",{d:"M21.7505 18.329C21.7505 18.1349 21.5932 17.9773 21.3989 17.9773C21.2049 17.9773 21.0474 18.1349 21.0474 18.329V19.0122H21.7505V18.329Z",fill:n}),Object(j.jsx)("path",{d:"M20.0166 18.329C20.0166 18.1349 19.8593 17.9773 19.665 17.9773C19.471 17.9773 19.3135 18.1349 19.3135 18.329V19.0122H20.0166V18.329Z",fill:n}),Object(j.jsx)("path",{d:"M28.6865 18.329C28.6865 18.1349 28.529 17.9773 28.335 17.9773C28.1407 17.9773 27.9834 18.1349 27.9834 18.329V19.0122H28.6865V18.329Z",fill:n}),Object(j.jsx)("path",{d:"M26.9526 18.329C26.9526 18.1349 26.7951 17.9773 26.6011 17.9773C26.4068 17.9773 26.2495 18.1349 26.2495 18.329V19.0122H26.9526V18.329Z",fill:n}),Object(j.jsx)("path",{d:"M25.2188 18.329C25.2188 18.1349 25.0612 17.9773 24.8672 17.9773C24.6731 17.9773 24.5156 18.1349 24.5156 18.329V19.0122H25.2188V18.329Z",fill:n}),Object(j.jsx)("defs",{children:Object(j.jsxs)("filter",{id:"filter0_d",x:"0",y:"0",width:"48",height:"48",filterUnits:"userSpaceOnUse","color-interpolation-filters":"sRGB",children:[Object(j.jsx)("feFlood",{"flood-opacity":"0",result:"BackgroundImageFix"}),Object(j.jsx)("feColorMatrix",{in:"SourceAlpha",type:"matrix",values:"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"}),Object(j.jsx)("feOffset",{}),Object(j.jsx)("feGaussianBlur",{stdDeviation:"2.5"}),Object(j.jsx)("feColorMatrix",{type:"matrix",values:"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"}),Object(j.jsx)("feBlend",{mode:"normal",in2:"BackgroundImageFix",result:"effect1_dropShadow"}),Object(j.jsx)("feBlend",{mode:"normal",in:"SourceGraphic",in2:"effect1_dropShadow",result:"shape"})]})})]})}function m(e){var t=e.colorOne,n=e.colorTwo;return Object(j.jsxs)("svg",{width:"40",height:"40",viewBox:"0 0 48 48",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[Object(j.jsxs)("g",{filter:"url(#filter0_d)",children:[Object(j.jsx)("path",{d:"M24 43C34.4934 43 43 34.4934 43 24C43 13.5066 34.4934 5 24 5C13.5066 5 5 13.5066 5 24C5 34.4934 13.5066 43 24 43Z",fill:t}),Object(j.jsx)("path",{d:"M24 18C20.1402 18 17 20.8261 17 24.3C17 25.5143 17.3841 26.6905 18.1126 27.7076C17.9747 29.2329 17.6051 30.3652 17.0684 30.9017C16.9975 30.9726 16.9797 31.0811 17.0245 31.1707C17.0642 31.2507 17.1459 31.3 17.2334 31.3C17.2441 31.3 17.2548 31.2993 17.2658 31.2976C17.3603 31.2843 19.5555 30.9684 21.1433 30.0519C22.0449 30.4156 23.0053 30.6 24 30.6C27.8598 30.6 31 27.7738 31 24.3C31 20.8261 27.8598 18 24 18ZM20.7334 25.2333C20.2186 25.2333 19.8 24.8147 19.8 24.3C19.8 23.7853 20.2186 23.3667 20.7334 23.3667C21.2481 23.3667 21.6667 23.7853 21.6667 24.3C21.6667 24.8147 21.2481 25.2333 20.7334 25.2333ZM24 25.2333C23.4853 25.2333 23.0667 24.8147 23.0667 24.3C23.0667 23.7853 23.4853 23.3667 24 23.3667C24.5148 23.3667 24.9334 23.7853 24.9334 24.3C24.9334 24.8147 24.5148 25.2333 24 25.2333ZM27.2667 25.2333C26.7519 25.2333 26.3334 24.8147 26.3334 24.3C26.3334 23.7853 26.7519 23.3667 27.2667 23.3667C27.7814 23.3667 28.2 23.7853 28.2 24.3C28.2 24.8147 27.7814 25.2333 27.2667 25.2333Z",fill:n})]}),Object(j.jsx)("defs",{children:Object(j.jsxs)("filter",{id:"filter0_d",x:"0",y:"0",width:"48",height:"48",filterUnits:"userSpaceOnUse","color-interpolation-filters":"sRGB",children:[Object(j.jsx)("feFlood",{"flood-opacity":"0",result:"BackgroundImageFix"}),Object(j.jsx)("feColorMatrix",{in:"SourceAlpha",type:"matrix",values:"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"}),Object(j.jsx)("feOffset",{}),Object(j.jsx)("feGaussianBlur",{stdDeviation:"2.5"}),Object(j.jsx)("feColorMatrix",{type:"matrix",values:"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"}),Object(j.jsx)("feBlend",{mode:"normal",in2:"BackgroundImageFix",result:"effect1_dropShadow"}),Object(j.jsx)("feBlend",{mode:"normal",in:"SourceGraphic",in2:"effect1_dropShadow",result:"shape"})]})})]})}function x(e){var t=e.colorOne,n=e.colorTwo;return Object(j.jsxs)("svg",{width:"40",height:"40",viewBox:"0 0 48 48",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[Object(j.jsx)("g",{filter:"url(#filter0_d)",children:Object(j.jsx)("circle",{cx:"24",cy:"24",r:"19",fill:t})}),Object(j.jsx)("path",{d:"M20.9805 25.3945H20.5605V26.2148H20.9805C21.212 26.2148 21.4004 26.0308 21.4004 25.8047C21.4004 25.5785 21.212 25.3945 20.9805 25.3945Z",fill:n}),Object(j.jsx)("path",{d:"M26.4395 17.2402V19.4609H28.713L26.4395 17.2402Z",fill:n}),Object(j.jsx)("path",{d:"M26.0195 20.2812C25.7876 20.2812 25.5996 20.0976 25.5996 19.8711V17H18.4609C18.229 17 18.041 17.1836 18.041 17.4102V30.5898C18.041 30.8164 18.229 31 18.4609 31H28.5391C28.771 31 28.959 30.8164 28.959 30.5898V20.2812H26.0195ZM20.1406 19.4609H24.3398C24.5718 19.4609 24.7598 19.6446 24.7598 19.8711C24.7598 20.0976 24.5718 20.2812 24.3398 20.2812H20.1406C19.9087 20.2812 19.7207 20.0976 19.7207 19.8711C19.7207 19.6446 19.9087 19.4609 20.1406 19.4609ZM23.375 28.6026C23.539 28.7627 23.539 29.0224 23.375 29.1826C23.211 29.3428 22.9451 29.3428 22.7812 29.1826L22.3382 28.75L21.8924 29.1854C21.7284 29.3456 21.4625 29.3456 21.2985 29.1854C21.1345 29.0253 21.1345 28.7656 21.2985 28.6054L21.7444 28.1699L20.5826 27.0352H20.5605V28.0742C20.5605 28.3007 20.3725 28.4843 20.1406 28.4843C19.9087 28.4843 19.7207 28.3007 19.7207 28.0742C19.7207 27.7272 19.7207 25.2957 19.7207 24.9844C19.7207 24.7579 19.9087 24.5742 20.1406 24.5742H20.9805C21.6751 24.5742 22.2402 25.1262 22.2402 25.8047C22.2402 26.2616 21.9838 26.6608 21.6043 26.873L22.3382 27.5899L22.7832 27.1553C22.9471 26.9951 23.213 26.9951 23.377 27.1553C23.541 27.3154 23.541 27.5751 23.377 27.7353L22.9321 28.1699L23.375 28.6026ZM26.8594 26.8438H24.3398C24.1079 26.8438 23.9199 26.6601 23.9199 26.4336C23.9199 26.2071 24.1079 26.0234 24.3398 26.0234H26.8594C27.0913 26.0234 27.2793 26.2071 27.2793 26.4336C27.2793 26.6601 27.0913 26.8438 26.8594 26.8438ZM26.8594 25.2031H24.3398C24.1079 25.2031 23.9199 25.0195 23.9199 24.793C23.9199 24.5665 24.1079 24.3828 24.3398 24.3828H26.8594C27.0913 24.3828 27.2793 24.5665 27.2793 24.793C27.2793 25.0195 27.0913 25.2031 26.8594 25.2031ZM26.8594 23.5625H20.1406C19.9087 23.5625 19.7207 23.3789 19.7207 23.1523C19.7207 22.9258 19.9087 22.7422 20.1406 22.7422H26.8594C27.0913 22.7422 27.2793 22.9258 27.2793 23.1523C27.2793 23.3789 27.0913 23.5625 26.8594 23.5625ZM26.8594 21.9219H20.1406C19.9087 21.9219 19.7207 21.7382 19.7207 21.5117C19.7207 21.2852 19.9087 21.1016 20.1406 21.1016H26.8594C27.0913 21.1016 27.2793 21.2852 27.2793 21.5117C27.2793 21.7382 27.0913 21.9219 26.8594 21.9219Z",fill:n}),Object(j.jsx)("defs",{children:Object(j.jsxs)("filter",{id:"filter0_d",x:"0",y:"0",width:"48",height:"48",filterUnits:"userSpaceOnUse","color-interpolation-filters":"sRGB",children:[Object(j.jsx)("feFlood",{"flood-opacity":"0",result:"BackgroundImageFix"}),Object(j.jsx)("feColorMatrix",{in:"SourceAlpha",type:"matrix",values:"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"}),Object(j.jsx)("feOffset",{}),Object(j.jsx)("feGaussianBlur",{stdDeviation:"2.5"}),Object(j.jsx)("feColorMatrix",{type:"matrix",values:"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"}),Object(j.jsx)("feBlend",{mode:"normal",in2:"BackgroundImageFix",result:"effect1_dropShadow"}),Object(j.jsx)("feBlend",{mode:"normal",in:"SourceGraphic",in2:"effect1_dropShadow",result:"shape"})]})})]})}function O(e){var t=e.colorOne,n=e.colorTwo;return Object(j.jsxs)("svg",{width:"40",height:"40",viewBox:"0 0 48 48",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[Object(j.jsxs)("g",{filter:"url(#filter0_d)",children:[Object(j.jsx)("path",{d:"M24 43C34.4934 43 43 34.4934 43 24C43 13.5066 34.4934 5 24 5C13.5066 5 5 13.5066 5 24C5 34.4934 13.5066 43 24 43Z",fill:t}),Object(j.jsx)("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M28.6705 17.4566C28.8446 17.2998 29.0954 17.2616 29.3082 17.3597C29.5222 17.4549 29.659 17.6685 29.6559 17.9028V30.0972C29.6569 30.2434 29.6038 30.3848 29.5067 30.4941C29.2899 30.7381 28.9164 30.7601 28.6724 30.5434L27.7531 29.7301C27.7279 29.7079 27.6901 29.708 27.6651 29.7304L26.4151 30.8481C26.1891 31.0505 25.847 31.0505 25.6209 30.8481L24.3722 29.7314C24.3471 29.709 24.3091 29.709 24.284 29.7314L23.0353 30.8481C22.8093 31.0507 22.4671 31.0507 22.2411 30.8481L20.9914 29.7304C20.9665 29.708 20.9288 29.7079 20.9038 29.7301L19.9853 30.5434C19.8759 30.6407 19.7344 30.6941 19.5879 30.6931C19.261 30.6909 18.9978 30.4241 19 30.0972V17.9028C18.9989 17.7565 19.0521 17.6149 19.1494 17.5055C19.3662 17.2616 19.7398 17.2398 19.9837 17.4566L20.903 18.2699C20.9282 18.2921 20.9659 18.292 20.991 18.2696L22.2408 17.1519C22.4669 16.9494 22.809 16.9494 23.0351 17.1519L24.2838 18.2686C24.3089 18.291 24.3469 18.291 24.372 18.2686L25.6206 17.1519C25.8466 16.9494 26.1888 16.9494 26.4148 17.1519L27.6645 18.2696C27.6894 18.292 27.7271 18.2921 27.752 18.2699L28.6705 17.4566ZM24.4227 22.7518V24.3857L25.8213 25.2158L26.0566 24.8187L24.9128 24.1406V22.7518H24.4227ZM21.8082 24.0589C21.8082 22.4348 23.1219 21.1178 24.7477 21.1178C26.3735 21.1178 27.6905 22.4348 27.6905 24.0589C27.6905 25.6831 26.3735 27 24.7477 27C23.9357 27 23.202 26.67 22.671 26.1373L23.1334 25.6749C23.5468 26.0883 24.117 26.3464 24.7494 26.3464C26.0124 26.3464 27.0369 25.3219 27.0369 24.0589C27.0369 22.7959 26.0124 21.7714 24.7494 21.7714C23.4863 21.7714 22.4618 22.7959 22.4618 24.0589H23.4422L22.1236 25.3791L22.1007 25.3317L20.8279 24.0589H21.8082Z",fill:n})]}),Object(j.jsx)("defs",{children:Object(j.jsxs)("filter",{id:"filter0_d",x:"0",y:"0",width:"48",height:"48",filterUnits:"userSpaceOnUse","color-interpolation-filters":"sRGB",children:[Object(j.jsx)("feFlood",{"flood-opacity":"0",result:"BackgroundImageFix"}),Object(j.jsx)("feColorMatrix",{in:"SourceAlpha",type:"matrix",values:"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"}),Object(j.jsx)("feOffset",{}),Object(j.jsx)("feGaussianBlur",{stdDeviation:"2.5"}),Object(j.jsx)("feColorMatrix",{type:"matrix",values:"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"}),Object(j.jsx)("feBlend",{mode:"normal",in2:"BackgroundImageFix",result:"effect1_dropShadow"}),Object(j.jsx)("feBlend",{mode:"normal",in:"SourceGraphic",in2:"effect1_dropShadow",result:"shape"})]})})]})}var p=[{component:b,name:"Dashboard",link:"/dashboard"},{component:x,name:"Consultation",link:"/dashboard/consulation"},{component:h,name:"Appointments",link:"/dashboard/appointment"},{component:m,name:"Messaging",link:"/dashboard/messages"},{component:O,name:"Payment History",link:"/dashboard/payment-history"}],v=[{component:b,name:"Dashboard",link:"/dashboard"},{component:x,name:"Consultation",link:"/dashboard/consulation"},{name:"Appointments",component:h,link:"/dashboard/appointment"},{name:"Messaging",component:m,link:"/dashboard/messages"},{component:O,name:"Payment History",link:"/dashboard/payment-history"},{component:h,name:"Appointments Setting",link:"/dashboard/physical-setting"},{component:x,name:"Consultation Setting",link:"/dashboard/video-setting"}];n(915);var C=Object(c.i)((function(e){var t=e.active,n=e.setHandleActive,c=e.location,s=Object(r.c)((function(e){return e.auth})),d=s.user,u=s.loading,f=null===d||void 0===d?void 0:d.role,b=u?[]:"patient"===f?p:v,h=Object(a.useState)(b[0]),m=Object(i.a)(h,2),x=m[0],O=m[1],C=function(e,t){return Object(j.jsx)(e,{colorOne:t?"#48afc9":"#FFFFFF",colorTwo:t?"#FFF":"#727272"})},g=c.pathname;return Object(a.useEffect)((function(){var e=b.find((function(e){return g===(null===e||void 0===e?void 0:e.link)}));return e&&O(e),function(){O(b[0])}}),[g,b]),Object(j.jsxs)(j.Fragment,{children:[Object(j.jsxs)("div",{className:"sideBar sideBarDiv d-none d-md-block",children:[Object(j.jsx)("div",{className:"centerDiv",children:Object(j.jsx)("img",{onClick:function(){return o.a.push("/")},src:"/images/logoBlue.svg",className:"logo"})}),Object(j.jsx)("div",{className:"itemsFlex",children:Object(j.jsx)("div",{className:"w-100",children:b.length>0&&b.map((function(e,t){var n=(null===x||void 0===x?void 0:x.link)===(null===e||void 0===e?void 0:e.link);return Object(j.jsx)(l.a,{to:null===e||void 0===e?void 0:e.link,children:Object(j.jsxs)("div",{onClick:function(){return O(e)},className:n?"DashboardSideBarItem sideBarItemActive":"DashboardSideBarItem",children:[Object(j.jsx)("div",{style:{width:"40px"},children:(null===e||void 0===e?void 0:e.component)&&C(null===e||void 0===e?void 0:e.component,n)}),Object(j.jsx)("div",{className:"title",children:null===e||void 0===e?void 0:e.name})]},t)})}))})})]}),Object(j.jsxs)("div",{className:"d-block d-md-none",children:[Object(j.jsx)("div",{onClick:function(){return n(!1)},className:t?"sideBarModal sideBarModalActive":"sideBarModal"}),Object(j.jsxs)("div",{className:t?"sideBarM sideBarDiv sideBarMActive":"sideBarM sideBarDiv",children:[Object(j.jsx)("div",{className:"centerDiv",children:Object(j.jsx)("img",{onClick:function(){return o.a.push("/")},src:"/images/logo.svg",className:"logo"})}),Object(j.jsx)("div",{className:"itemsFlex",children:Object(j.jsx)("div",{className:"w-100",children:b.length>0&&b.map((function(e,t){var i=(null===x||void 0===x?void 0:x.link)===(null===e||void 0===e?void 0:e.link);return Object(j.jsx)(l.a,{to:null===e||void 0===e?void 0:e.link,children:Object(j.jsxs)("div",{onClick:function(){O(e),n(!1)},className:i?"DashboardSideBarItem sideBarItemActive":"DashboardSideBarItem",children:[Object(j.jsx)("div",{style:{width:"40px"},children:(null===e||void 0===e?void 0:e.component)&&C(null===e||void 0===e?void 0:e.component,i)}),Object(j.jsx)("div",{className:"title",children:null===e||void 0===e?void 0:e.name})]},t)})}))})})]})]})]})})),g=(n(916),Object(a.lazy)((function(){return Promise.all([n.e(4),n.e(34)]).then(n.bind(null,1228))}))),y=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(2),n.e(3),n.e(4),n.e(20)]).then(n.bind(null,1231))})),w=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(2),n.e(3),n.e(4),n.e(21)]).then(n.bind(null,1211))})),B=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(2),n.e(7),n.e(14),n.e(36)]).then(n.bind(null,1229))})),H=Object(a.lazy)((function(){return Promise.all([n.e(4),n.e(42)]).then(n.bind(null,1214))})),V=Object(a.lazy)((function(){return Promise.all([n.e(4),n.e(41)]).then(n.bind(null,1215))})),M=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(3),n.e(5),n.e(7),n.e(11)]).then(n.bind(null,1232))})),N=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(2),n.e(3),n.e(5),n.e(18)]).then(n.bind(null,1224))})),S=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(2),n.e(3),n.e(4),n.e(22)]).then(n.bind(null,1216))})),k=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(4),n.e(43),n.e(38)]).then(n.bind(null,1217))})),L=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(2),n.e(3),n.e(5),n.e(12)]).then(n.bind(null,1223))}));function Z(){var e=Object(j.jsx)("div",{className:"pt-3 text-center",children:Object(j.jsx)("div",{className:"sk-spinner sk-spinner-pulse"})}),t=Object(a.useState)(!1),n=Object(i.a)(t,2),l=n[0],s=n[1],d=Object(r.c)((function(e){return e.auth})),u=d.isAuth,b=d.loading;return Object(a.useEffect)((function(){return b||u||o.a.push("/"),function(){}}),[b,u]),Object(j.jsxs)("div",{className:"dashboardMainDiv",children:[Object(j.jsx)(C,{active:l,setHandleActive:s}),Object(j.jsxs)("div",{className:"headerSec",children:[Object(j.jsx)(f,{active:l,setHandleActive:s}),Object(j.jsx)("div",{className:"contentMainSec",id:"contentSec",children:Object(j.jsx)(a.Suspense,{fallback:e,children:Object(j.jsxs)(c.d,{children:[Object(j.jsx)(c.b,{exact:!0,path:"/dashboard",component:g}),Object(j.jsx)(c.b,{path:"/dashboard/consulation",exact:!0,component:y}),Object(j.jsx)(c.b,{path:"/dashboard/consulation/detail",component:V}),Object(j.jsx)(c.b,{path:"/dashboard/appointment",exact:!0,component:w}),Object(j.jsx)(c.b,{path:"/dashboard/appointment/detail",component:H}),Object(j.jsx)(c.b,{path:"/dashboard/messages",component:B}),Object(j.jsx)(c.b,{path:"/dashboard/physical-setting",component:M}),Object(j.jsx)(c.b,{path:"/dashboard/video-setting",component:N}),Object(j.jsx)(c.b,{path:"/dashboard/payment-history",component:S}),Object(j.jsx)(c.b,{path:"/dashboard/notification",component:k}),Object(j.jsx)(c.b,{path:"/dashboard/setting",component:L})]})})})]})]})}},213:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var i=n(237);function a(e,t){if(e){if("string"===typeof e)return Object(i.a)(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(i.a)(e,t):void 0}}},237:function(e,t,n){"use strict";function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,i=new Array(t);n<t;n++)i[n]=e[n];return i}n.d(t,"a",(function(){return i}))},61:function(e,t,n){"use strict";n.d(t,"a",(function(){return m}));var i=n(107),a=n(9),r=n(0),c=n.n(r),o=n(14),l=(n(24),n(2)),s=n(11),d=n(13);c.a.Component;c.a.Component;var j=function(e,t){return"function"===typeof e?e(t):e},u=function(e,t){return"string"===typeof e?Object(o.c)(e,null,null,t):e},f=function(e){return e},b=c.a.forwardRef;"undefined"===typeof b&&(b=f);var h=b((function(e,t){var n=e.innerRef,i=e.navigate,a=e.onClick,r=Object(s.a)(e,["innerRef","navigate","onClick"]),o=r.target,d=Object(l.a)({},r,{onClick:function(e){try{a&&a(e)}catch(t){throw e.preventDefault(),t}e.defaultPrevented||0!==e.button||o&&"_self"!==o||function(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}(e)||(e.preventDefault(),i())}});return d.ref=f!==b&&t||n,c.a.createElement("a",d)}));var m=b((function(e,t){var n=e.component,a=void 0===n?h:n,r=e.replace,m=e.to,x=e.innerRef,O=Object(s.a)(e,["component","replace","to","innerRef"]);return c.a.createElement(i.e.Consumer,null,(function(e){e||Object(d.a)(!1);var n=e.history,i=u(j(m,e.location),e.location),s=i?n.createHref(i):"",h=Object(l.a)({},O,{href:s,navigate:function(){var t=j(m,e.location),i=Object(o.e)(e.location)===Object(o.e)(u(t));(r||i?n.replace:n.push)(t)}});return f!==b?h.ref=t||x:h.innerRef=x,c.a.createElement(a,h)}))})),x=function(e){return e},O=c.a.forwardRef;"undefined"===typeof O&&(O=x);O((function(e,t){var n=e["aria-current"],a=void 0===n?"page":n,r=e.activeClassName,o=void 0===r?"active":r,f=e.activeStyle,b=e.className,h=e.exact,p=e.isActive,v=e.location,C=e.sensitive,g=e.strict,y=e.style,w=e.to,B=e.innerRef,H=Object(s.a)(e,["aria-current","activeClassName","activeStyle","className","exact","isActive","location","sensitive","strict","style","to","innerRef"]);return c.a.createElement(i.e.Consumer,null,(function(e){e||Object(d.a)(!1);var n=v||e.location,r=u(j(w,n),n),s=r.pathname,V=s&&s.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1"),M=V?Object(i.f)(n.pathname,{path:V,exact:h,sensitive:C,strict:g}):null,N=!!(p?p(M,n):M),S=N?function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.filter((function(e){return e})).join(" ")}(b,o):b,k=N?Object(l.a)({},y,f):y,L=Object(l.a)({"aria-current":N&&a||null,className:S,style:k,to:r},H);return x!==O?L.ref=t||B:L.innerRef=B,c.a.createElement(m,L)}))}))},915:function(e,t,n){},916:function(e,t,n){}}]);
//# sourceMappingURL=35.1ccf1eac.chunk.js.map