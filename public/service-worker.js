if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,i)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let t={};const d=e=>a(e,n),r={module:{uri:n},exports:t,require:d};s[n]=Promise.all(c.map((e=>r[e]||d(e)))).then((e=>(i(...e),t)))}}define(["./workbox-7a5d9f0f"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/171-0dea333ae250bcc0.js",revision:"0dea333ae250bcc0"},{url:"/_next/static/chunks/201.3ef88f16a64392d3.js",revision:"3ef88f16a64392d3"},{url:"/_next/static/chunks/256.9ac065f6238f1ee0.js",revision:"9ac065f6238f1ee0"},{url:"/_next/static/chunks/268.5ffeadc9d6ec62fe.js",revision:"5ffeadc9d6ec62fe"},{url:"/_next/static/chunks/275.6bc7c76b04f55586.js",revision:"6bc7c76b04f55586"},{url:"/_next/static/chunks/442-694f1c50d4a74985.js",revision:"694f1c50d4a74985"},{url:"/_next/static/chunks/584-2759632fc9c7cba8.js",revision:"2759632fc9c7cba8"},{url:"/_next/static/chunks/58a3678d-c3b8001aa44c54e5.js",revision:"c3b8001aa44c54e5"},{url:"/_next/static/chunks/61905917.1ddac6d8e1728504.js",revision:"1ddac6d8e1728504"},{url:"/_next/static/chunks/669.4aa4d43279392604.js",revision:"4aa4d43279392604"},{url:"/_next/static/chunks/675-37bfa04b0caf97c5.js",revision:"37bfa04b0caf97c5"},{url:"/_next/static/chunks/732.f63b257c3602dcab.js",revision:"f63b257c3602dcab"},{url:"/_next/static/chunks/778.4e8137400b8d609c.js",revision:"4e8137400b8d609c"},{url:"/_next/static/chunks/e39c296e.8fcaf8e4230d7eef.js",revision:"8fcaf8e4230d7eef"},{url:"/_next/static/chunks/ee9ce975-e357a86298b555a6.js",revision:"e357a86298b555a6"},{url:"/_next/static/chunks/framework-49c6cecf1f6d5795.js",revision:"49c6cecf1f6d5795"},{url:"/_next/static/chunks/main-51a4ec791555d11b.js",revision:"51a4ec791555d11b"},{url:"/_next/static/chunks/pages/_app-4f8d9bb8b1bef97a.js",revision:"4f8d9bb8b1bef97a"},{url:"/_next/static/chunks/pages/_error-7a92967bea80186d.js",revision:"7a92967bea80186d"},{url:"/_next/static/chunks/pages/index-2a3c642f3bb33235.js",revision:"2a3c642f3bb33235"},{url:"/_next/static/chunks/pages/safiya-fc1f7392a5d0dfca.js",revision:"fc1f7392a5d0dfca"},{url:"/_next/static/chunks/pages/uwmaps-8cc76556561a6e06.js",revision:"8cc76556561a6e06"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-140cbfdd24ed9caf.js",revision:"140cbfdd24ed9caf"},{url:"/_next/static/css/061789cdecfd8f4a.css",revision:"061789cdecfd8f4a"},{url:"/_next/static/css/e618860648befe11.css",revision:"e618860648befe11"},{url:"/_next/static/media/56d4c7a1c09c3371-s.woff2",revision:"43b1d1276722d640d51608db4600bb69"},{url:"/_next/static/media/7e6a2e30184bb114-s.p.woff2",revision:"bca21fe1983e7d9137ef6e68e05f3aee"},{url:"/_next/static/media/Notes.36722502.png",revision:"fc840ec56ad3b354677381814315d1f9"},{url:"/_next/static/media/bchm.438ef060.png",revision:"19867f2a469962b24d8e1c1f59797d9f"},{url:"/_next/static/media/colours.3c37b73c.png",revision:"d952a2d81272c8cc905d4335144bf7e0"},{url:"/_next/static/media/convo.ac3bc1b4.png",revision:"16bb913d27f040adf62bb724190fbfa5"},{url:"/_next/static/media/existing.c6a007c2.png",revision:"b691a232adeb37fc6e1e52cd07bc5e32"},{url:"/_next/static/media/final1.f79af40c.svg",revision:"b92efaff18fd8b46a02ab287262ec0d7"},{url:"/_next/static/media/hagey_hall_floor_plan.91b25901.webp",revision:"2052b35afa4c32b81833ee075de1d2fc"},{url:"/_next/static/media/identify.523fd2e0.png",revision:"45cd484297466a9e77b502d8dc4c567c"},{url:"/_next/static/media/infoarch.cdc0b9ec.png",revision:"178f8e40535fa038a05aa7b465247f31"},{url:"/_next/static/media/logo.a8b158ca.png",revision:"1f49f29b7c91317911db379f3728e834"},{url:"/_next/static/media/miro.372fe907.png",revision:"d6ece0d8fd4e04d8f759cdb644373f2e"},{url:"/_next/static/media/mountain.b631be49.png",revision:"8da77b4a616a3ac8a732dd6f3ba27bcb"},{url:"/_next/static/media/otherUni.3109d237.png",revision:"e1537bf31d410625bbfe378bf186dbc0"},{url:"/_next/static/media/rank.6e82ea2d.png",revision:"ddda914da165ad3d1fb8b159e1354031"},{url:"/_next/static/media/rooted.41cce4f3.png",revision:"5ae97ce9d55a1c100cb27ffe32c8c346"},{url:"/_next/static/media/specify.9acfebd8.png",revision:"51de4b7e61035f5dcaf9a7e7db8b5d97"},{url:"/_next/static/media/typography.10abaa84.png",revision:"ffd25c98bc893fb4e15218ee208d9678"},{url:"/_next/static/media/uwmaps.383027c1.png",revision:"84af0b08e23ae5260a0d4c78595ec1b9"},{url:"/_next/static/media/waterloo_campus.773e4f2d.jpg",revision:"6db00f60509439eac15d48692e0198c3"},{url:"/_next/static/media/wireframes.d4a66184.png",revision:"1aa3fdfc9581509038dad91f67ce8132"},{url:"/_next/static/sF-BQIt62CgjWayUpdrLo/_buildManifest.js",revision:"0da42e1bf16557656b85f70bdaf6605f"},{url:"/_next/static/sF-BQIt62CgjWayUpdrLo/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/assets/asl.png",revision:"e23d1b8561d72283f3650970be870d6d"},{url:"/assets/bchm.png",revision:"b1e08dd8a798067b3ef0ecbb0e639760"},{url:"/assets/blueprint.png",revision:"5b105b3b9dd9ccff5189cef1855a54d2"},{url:"/assets/estia.png",revision:"bcde4928f34be9f5d33ab9b29e039ae0"},{url:"/assets/infinitevps.webm",revision:"f7b371e070057472204ab2ae0b8915d4"},{url:"/assets/logo.png",revision:"fed91f37191877723ea7e98237d10874"},{url:"/assets/movieland.png",revision:"3e1aabc4d4a9b14cec7d45a030dd20fe"},{url:"/assets/onepassv2.png",revision:"030039ab241cc214d9e200e64bc7a70f"},{url:"/assets/port.png",revision:"cf749cf4824bf4e73a05bda818f00ada"},{url:"/assets/portfolio.webm",revision:"3c5c99872974c5db962f4aa1d8da08ce"},{url:"/assets/questrade.png",revision:"0cad04e764d929f608ea3d32b4a94e64"},{url:"/assets/questradefam.jpg",revision:"e36299a1c7b5161db74c2cf4e6291f9a"},{url:"/assets/scene.splinecode",revision:"a86155ea39bd500447e9c825ef110b58"},{url:"/assets/statsanity.png",revision:"bf66034222b6b03f978cdd0b63681d6f"},{url:"/assets/stockai.png",revision:"019e09d644ebc4e5d3219387fe56aa3e"},{url:"/assets/uoft.png",revision:"7f595aae72bedf599281f565cbc837b8"},{url:"/assets/wecv4.png",revision:"389a649ed7651cd9fada57b69988d847"},{url:"/assets/wrona.jpeg",revision:"89872f2806610edde5ea90ee8afbace6"},{url:"/favicon.ico",revision:"616c599539f2d93ae58aef39b27cd2bd"},{url:"/fonts/ClashGrotesk-Variable.woff2",revision:"218f4f81bdee5932a127929c6d693f0c"},{url:"/fonts/MarckScript-Regular.ttf",revision:"48d8d53dbcbec65e5464a14081efb1c4"},{url:"/icon-192x192.png",revision:"3d82a3c3a8f93ada0df0fac471f90a04"},{url:"/icon-256x256.png",revision:"163a0793bd04edca75d788db5be7e16f"},{url:"/icon-384x384.png",revision:"60d91c093fdce918a995cebcf4cfe957"},{url:"/icon-512x512.png",revision:"2d8845afaf9400bfd34c4b160c448e36"},{url:"/logo.png",revision:"616c599539f2d93ae58aef39b27cd2bd"},{url:"/manifest.json",revision:"d2f3f416ebf49a46841bbbfd8c2c5b86"},{url:"/robots.txt",revision:"cd9cd94aaa699e0a16e692b6bb16f672"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
