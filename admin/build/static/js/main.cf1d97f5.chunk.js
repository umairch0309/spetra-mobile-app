(this.webpackJsonpadmin=this.webpackJsonpadmin||[]).push([[2],{20:function(e,t,a){"use strict";a.d(t,"f",(function(){return n})),a.d(t,"g",(function(){return i})),a.d(t,"e",(function(){return r})),a.d(t,"k",(function(){return c})),a.d(t,"l",(function(){return o})),a.d(t,"j",(function(){return l})),a.d(t,"c",(function(){return s})),a.d(t,"d",(function(){return u})),a.d(t,"b",(function(){return d})),a.d(t,"i",(function(){return p})),a.d(t,"h",(function(){return b})),a.d(t,"a",(function(){return h}));var n="LOGIN_REQUEST",i="LOGIN_SUCCESS",r="LOGIN_FAIL",c="REGISTER_USER_REQUEST",o="REGISTER_USER_SUCCESS",l="REGISTER_USER_FAIL",s="LOAD_USER_REQUEST",u="LOAD_USER_SUCCESS",d="LOAD_USER_FAIL",p="LOGOUT_USER_SUCCESS",b="LOGOUT_USER_FAIL",h="CLEAR_ERRORS"},517:function(e,t){!function(){if("function"===typeof window.CustomEvent)return!1;function e(e,t){t=t||{bubbles:!1,cancelable:!1,detail:void 0};var a=document.createEvent("CustomEvent");return a.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),a}e.prototype=window.Event.prototype,window.CustomEvent=e}(),Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector),Element.prototype.closest||(Element.prototype.closest=function(e){var t=this;do{if(Element.prototype.matches.call(t,e))return t;t=t.parentElement||t.parentNode}while(null!==t&&1===t.nodeType);return null})},542:function(e,t,a){},543:function(e,t,a){},546:function(e,t,a){"use strict";a.r(t);a(128),a(137),a(138),a(139),a(140),a(141),a(142),a(143),a(144),a(145),a(146),a(147),a(148),a(149),a(150),a(190),a(192),a(193),a(194),a(195),a(196),a(198),a(152),a(201),a(202),a(92),a(205),a(206),a(208),a(209),a(210),a(211),a(212),a(213),a(217),a(218),a(219),a(220),a(221),a(222),a(223),a(158),a(108),a(225),a(227),a(228),a(229),a(230),a(231),a(232),a(233),a(235),a(236),a(237),a(238),a(239),a(240),a(241),a(242),a(160),a(243),a(244),a(245),a(247),a(249),a(250),a(251),a(252),a(253),a(255),a(256),a(257),a(259),a(260),a(261),a(263),a(264),a(265),a(266),a(267),a(268),a(269),a(271),a(272),a(273),a(274),a(275),a(276),a(277),a(278),a(279),a(163),a(280),a(281),a(282),a(283),a(289),a(290),a(291),a(292),a(293),a(294),a(295),a(296),a(297),a(298),a(299),a(300),a(301),a(302),a(165),a(305),a(306),a(167),a(307),a(308),a(309),a(310),a(116),a(311),a(312),a(315),a(316),a(317),a(318),a(320),a(321),a(322),a(323),a(324),a(325),a(326),a(327),a(328),a(329),a(330),a(331),a(332),a(333),a(334),a(335),a(336),a(337),a(338),a(339),a(345),a(346),a(347),a(348),a(349),a(350),a(351),a(352),a(353),a(354),a(355),a(356),a(357),a(358),a(359),a(360),a(361),a(362),a(363),a(364),a(365),a(366),a(367),a(368),a(369),a(370),a(371),a(372),a(373),a(374),a(375),a(376),a(377),a(120),a(379),a(420),a(422),a(423),a(424),a(425),a(426),a(428),a(429),a(430),a(431),a(432),a(433),a(434),a(435),a(437),a(438),a(439),a(440),a(441),a(442),a(443),a(444),a(445),a(446),a(447),a(448),a(449),a(450),a(451),a(452),a(453),a(454),a(455),a(456),a(457),a(458),a(459),a(460),a(461),a(463),a(465),a(466),a(467),a(468),a(469),a(470),a(471),a(472),a(473),a(474),a(475),a(476),a(477),a(478),a(479),a(480),a(481),a(482),a(483),a(484),a(485),a(486),a(487),a(488),a(489),a(490),a(491),a(492),a(493),a(494),a(495),a(497),a(383),a(384),a(385),a(499),a(500),a(501),a(502),a(503),a(504),a(505),a(386),a(388),a(389),a(390),a(391),a(393),a(172),a(508),a(513),a(517);var n=a(1),i=a.n(n),r=a(69),c=a.n(r),o=a(16),l=a(547),s=a(75),u=a(101),d=a(68),p=a(404),b=a(57),h=(a(542),a(543),a(99)),m=a(405),f=a(406),v=function(){function e(t){var a=t.timeout,n=t.onTimeout,i=t.onExpired;Object(m.a)(this,e),this.timeout=a,this.onTimeout=n;var r=parseInt(localStorage.getItem("_expiredTime"),10);r>0&&r<Date.now()?i():(this.eventHandler=this.updateExpiredTime.bind(this),this.tracker(),this.startInterval())}return Object(f.a)(e,[{key:"startInterval",value:function(){var e=this;this.updateExpiredTime(),this.interval=setInterval((function(){parseInt(localStorage.getItem("_expiredTime"),10)<Date.now()&&e.onTimeout&&(e.onTimeout(),e.cleanUp())}),1e3)}},{key:"updateExpiredTime",value:function(){var e=this;this.timeoutTracker&&clearTimeout(this.timeoutTracker),this.timeoutTracker=setTimeout((function(){localStorage.setItem("_expiredTime",Date.now()+1e3*e.timeout)}),300)}},{key:"tracker",value:function(){window.addEventListener("mousemove",this.eventHandler),window.addEventListener("scroll",this.eventHandler),window.addEventListener("keydown",this.eventHandler)}},{key:"cleanUp",value:function(){localStorage.removeItem("_expiredTime"),clearInterval(this.interval),window.removeEventListener("mousemove",this.eventHandler),window.removeEventListener("scroll",this.eventHandler),window.removeEventListener("keydown",this.eventHandler)}}]),e}(),E=a(30),O=Object(E.jsx)("div",{className:"pt-3 text-center",children:Object(E.jsx)("div",{className:"sk-spinner sk-spinner-pulse"})}),g=i.a.lazy((function(){return Promise.all([a.e(1),a.e(9)]).then(a.bind(null,872))})),j=i.a.lazy((function(){return Promise.all([a.e(1),a.e(10)]).then(a.bind(null,845))}));var S=function(){s.a.configure();var e=localStorage.adminToken,t=Object(u.c)();if(e){var a=Object(p.a)(e),r=Date.now()/1e3;a.exp<r&&(localStorage.removeItem("adminToken"),t(Object(h.c)()),b.a.push("/login")),Object(d.b)(e),t(Object(h.b)())}else t(Object(h.b)());return Object(n.useEffect)((function(){var e=new v({timeout:1200,onTimeout:function(){localStorage.removeItem("jwtToken"),t(Object(h.c)()),b.a.push("/login")},onExpired:function(){console.log("expire")}});return function(){e.cleanUp()}}),[]),Object(E.jsx)(l.c,{forceRefresh:!0,history:b.a,children:Object(E.jsx)(i.a.Suspense,{fallback:O,children:Object(E.jsxs)(l.d,{children:[Object(E.jsx)(l.b,{exact:!0,path:"/admin/login",name:"Login Page",render:function(e){return Object(E.jsx)(j,Object(o.a)({},e))}}),Object(E.jsx)(l.b,{path:"/",name:"Home",render:function(e){return Object(E.jsx)(g,Object(o.a)({},e))}})]})})})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var w=a(648),y=a(649),k=a(650),C=a(651),T=a(652),x=a(653),I=a(654),L=a(655),A=a(656),_=a(657),R=a(658),U=a(659),P=a(660),B=a(661),D=a(662),F=a(663),G=a(664),N=a(665),H=a(666),M=a(667),X=a(668),z=a(669),J=a(670),V=a(671),Q=a(642),W=a(643),Y=a(644),q=a(645),$=a(646),K=a(647),Z=a(551),ee=a(552),te=a(553),ae=a(554),ne=a(555),ie=a(556),re=a(557),ce=a(558),oe=a(559),le=a(560),se=a(561),ue=a(562),de=a(563),pe=a(564),be=a(565),he=a(566),me=a(567),fe=a(568),ve=a(569),Ee=a(570),Oe=a(571),ge=a(572),je=a(573),Se=a(574),we=a(575),ye=a(576),ke=a(577),Ce=a(578),Te=a(579),xe=a(580),Ie=a(581),Le=a(582),Ae=a(583),_e=a(584),Re=a(585),Ue=a(586),Pe=a(587),Be=a(588),De=a(589),Fe=a(590),Ge=a(591),Ne=a(592),He=a(593),Me=a(594),Xe=a(595),ze=a(596),Je=a(597),Ve=a(598),Qe=a(599),We=a(600),Ye=a(601),qe=a(602),$e=a(603),Ke=a(604),Ze=a(605),et=a(606),tt=a(607),at=a(608),nt=a(609),it=a(610),rt=a(611),ct=a(612),ot=a(613),lt=a(614),st=a(615),ut=a(616),dt=a(617),pt=a(618),bt=a(619),ht=a(620),mt=a(621),ft=a(622),vt=a(623),Et=a(624),Ot=a(625),gt=a(626),jt=a(627),St=a(628),wt=a(629),yt=a(630),kt=a(631),Ct=a(632),Tt=a(633),xt=a(634),It=a(635),Lt=a(636),At=a(637),_t=a(638),Rt=a(639),Ut=a(640),Pt=a(641),Bt=Object.assign({},{cilAlignCenter:Z.a,cilAlignLeft:ee.a,cilAlignRight:te.a,cilApplicationsSettings:ae.a,cilArrowRight:ne.a,cilArrowTop:ie.a,cilAsterisk:re.a,cilBan:ce.a,cilBasket:oe.a,cilBell:le.a,cilBold:se.a,cilBookmark:ue.a,cilCalculator:de.a,cilCalendar:pe.a,cilCloudDownload:be.a,cilChartPie:he.a,cilCheck:me.a,cilChevronBottom:fe.a,cilChevronLeft:ve.a,cilChevronRight:Ee.a,cilChevronTop:Oe.a,cilCircle:ge.a,cilCheckCircle:je.a,cilCode:Se.a,cilCommentSquare:we.a,cilCreditCard:ye.a,cilCursor:ke.a,cilCursorMove:Ce.a,cilDrop:Te.a,cilDollar:xe.a,cilEnvelopeClosed:Ie.a,cilEnvelopeLetter:Le.a,cilEnvelopeOpen:Ae.a,cilEuro:_e.a,cilGlobeAlt:Re.a,cilGrid:Ue.a,cilFile:Pe.a,cilFullscreen:Be.a,cilFullscreenExit:De.a,cilGraph:Fe.a,cilHome:Ge.a,cilInbox:Ne.a,cilIndentDecrease:He.a,cilIndentIncrease:Me.a,cilInputPower:Xe.a,cilItalic:ze.a,cilJustifyCenter:Je.a,cilJustifyLeft:Ve.a,cilLaptop:Qe.a,cilLayers:We.a,cilLightbulb:Ye.a,cilList:qe.a,cilListNumbered:$e.a,cilListRich:Ke.a,cilLocationPin:Ze.a,cilLockLocked:et.a,cilMagnifyingGlass:tt.a,cilMap:at.a,cilMoon:nt.a,cilNotes:it.a,cilOptions:rt.a,cilPaperclip:ct.a,cilPaperPlane:ot.a,cilPencil:lt.a,cilPeople:st.a,cilPhone:ut.a,cilPrint:dt.a,cilPuzzle:pt.a,cilSave:bt.a,cilScrubber:ht.a,cilSettings:mt.a,cilShare:ft.a,cilShareAll:vt.a,cilShareBoxed:Et.a,cilShieldAlt:Ot.a,cilSpeech:gt.a,cilSpeedometer:jt.a,cilSpreadsheet:St.a,cilStar:wt.a,cilSun:yt.a,cilTags:kt.a,cilTask:Ct.a,cilTrash:Tt.a,cilUnderline:xt.a,cilUser:It.a,cilUserFemale:Lt.a,cilUserFollow:At.a,cilUserUnfollow:_t.a,cilX:Rt.a,cilXCircle:Ut.a,cilWarning:Pt.a},{cifUs:Q.a,cifBr:W.a,cifIn:Y.a,cifFr:q.a,cifEs:$.a,cifPl:K.a},{cibSkype:w.a,cibFacebook:y.a,cibTwitter:k.a,cibLinkedin:C.a,cibFlickr:T.a,cibTumblr:x.a,cibXing:I.a,cibGithub:L.a,cibStackoverflow:A.a,cibYoutube:_.a,cibDribbble:R.a,cibInstagram:U.a,cibPinterest:P.a,cibVk:B.a,cibYahoo:D.a,cibBehance:F.a,cibReddit:G.a,cibVimeo:N.a,cibCcMastercard:H.a,cibCcVisa:M.a,cibStripe:X.a,cibPaypal:z.a,cibGooglePay:J.a,cibCcAmex:V.a}),Dt=a(77),Ft=a(178),Gt=a(20),Nt=["type"],Ht={sidebarShow:"responsive"},Mt=Object(Dt.b)({sideBarState:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ht,t=arguments.length>1?arguments[1]:void 0,a=t.type,n=Object(Ft.a)(t,Nt);switch(a){case"set":return Object(o.a)(Object(o.a)({},e),n);default:return e}},auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{user:{}},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case Gt.f:case Gt.k:return Object(o.a)(Object(o.a)({},e),{},{loading:!0,isAuthenticated:!1});case Gt.c:return Object(o.a)(Object(o.a)({},e),{},{loadLoading:!0,isAuthenticated:!1});case Gt.g:return Object(o.a)(Object(o.a)({},e),{},{loading:!1,user:t.payload,isAuthenticated:!0,loginError:{},signInError:{}});case Gt.d:return Object(o.a)(Object(o.a)({},e),{},{loadLoading:!1,user:t.payload,isAuthenticated:!0,loginError:{},signInError:{}});case Gt.l:return Object(o.a)(Object(o.a)({},e),{},{loading:!1,user:t.payload,isAuthenticated:!1,loginError:{},signInError:{}});case Gt.b:return{loading:!1,isAuthenticated:!1,user:{},error:t.payload};case Gt.e:return Object(o.a)(Object(o.a)({},e),{},{loading:!1,loginError:t.payload,user:null,isAuthenticated:!1});case Gt.j:return Object(o.a)(Object(o.a)({},e),{},{loading:!1,signInError:t.payload,user:null,isAuthenticated:!1});case Gt.i:return{loading:!1,isAuthenticated:!1,user:{}};case Gt.h:return Object(o.a)(Object(o.a)({},e),{},{loading:!1,error:t.payload});case Gt.a:return Object(o.a)(Object(o.a)({},e),{},{loginError:null,signInError:null});default:return e}}}),Xt=a(408),zt=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||Dt.c,Jt=Object(Dt.d)(Mt,zt(Object(Dt.a)(Xt.a))),Vt=a(672),Qt=a(549);i.a.icons=Bt;var Wt=new Vt.a;c.a.render(Object(E.jsx)(u.a,{store:Jt,children:Object(E.jsx)(Qt.a,{client:Wt,children:Object(E.jsx)(S,{})})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},57:function(e,t,a){"use strict";var n=a(47),i=Object(n.a)();t.a=i},68:function(e,t,a){"use strict";a.d(t,"b",(function(){return r}));var n=a(126),i=a.n(n);t.a=i.a.create({baseURL:"https://streamlive.asia/api/v1"});var r=function(e){e?i.a.defaults.headers.common["x-access-token"]=e:delete i.a.defaults.headers.common["x-access-token"]}},99:function(e,t,a){"use strict";a.d(t,"a",(function(){return p})),a.d(t,"b",(function(){return b})),a.d(t,"c",(function(){return h}));var n=a(58),i=a.n(n),r=a(16),c=a(100),o=(a(75),a(68)),l=a(124),s=a.n(l),u=a(57),d=a(20),p=function(e){return function(){var t=Object(c.a)(i.a.mark((function t(a){var n,c,l,p,b;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,a({type:d.f}),t.next=4,o.a.post("/admin/logIn",Object(r.a)({},e));case 4:n=t.sent,c=n.data.token,localStorage.setItem("adminToken",c),Object(o.b)(c),a({type:d.g,payload:n.data}),s.a.fire({position:"top-end",icon:"success",title:"Authentication Successfull !",showConfirmButton:!1,timer:2e3}),"Admin"===n.data.user.userStatus&&u.a.push("/admin/dashboard"),t.next=17;break;case 13:t.prev=13,t.t0=t.catch(0),a({type:d.e,payload:null===(l=t.t0.response)||void 0===l?void 0:l.data}),s.a.fire({position:"top-end",icon:"error",title:"Authentication Failed !",text:null===t.t0||void 0===t.t0||null===(p=t.t0.response)||void 0===p||null===(b=p.data)||void 0===b?void 0:b.message,showConfirmButton:!1,timer:2e3});case 17:case"end":return t.stop()}}),t,null,[[0,13]])})));return function(e){return t.apply(this,arguments)}}()},b=function(){return function(){var e=Object(c.a)(i.a.mark((function e(t){var a,n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=localStorage.adminToken,e.prev=1,t({type:d.c}),e.next=5,o.a.get("/admin/me",{headers:{"x-access-token":a||""}});case 5:n=e.sent,t({type:d.d,payload:n.data}),"Admin"===n.data.user.userStatus&&u.a.push("/admin/dashboard"),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(1),t({type:d.b});case 13:case"end":return e.stop()}}),e,null,[[1,10]])})));return function(t){return e.apply(this,arguments)}}()},h=function(){return function(){var e=Object(c.a)(i.a.mark((function e(t){var a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=localStorage.adminToken;try{a&&localStorage.removeItem("adminToken"),t({type:d.i})}catch(n){t({type:d.h}),s.a.fire({position:"top-end",icon:"error",title:"Logout Failed",showConfirmButton:!1,timer:2e3})}case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}}},[[546,3,4]]]);
//# sourceMappingURL=main.cf1d97f5.chunk.js.map