(function(t){function e(e){for(var s,a,i=e[0],c=e[1],l=e[2],d=0,p=[];d<i.length;d++)a=i[d],o[a]&&p.push(o[a][0]),o[a]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(t[s]=c[s]);u&&u(e);while(p.length)p.shift()();return n.push.apply(n,l||[]),r()}function r(){for(var t,e=0;e<n.length;e++){for(var r=n[e],s=!0,i=1;i<r.length;i++){var c=r[i];0!==o[c]&&(s=!1)}s&&(n.splice(e--,1),t=a(a.s=r[0]))}return t}var s={},o={user:0},n=[];function a(e){if(s[e])return s[e].exports;var r=s[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=t,a.c=s,a.d=function(t,e,r){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)a.d(r,s,function(e){return t[e]}.bind(null,s));return r},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=e,i=i.slice();for(var l=0;l<i.length;l++)e(i[l]);var u=c;n.push([3,"chunk-vendors"]),r()})({"03ac":function(t,e,r){"use strict";var s=r("4a8c"),o=r.n(s);o.a},"0895":function(t,e,r){"use strict";var s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"chat-rendering-window"},t._l(t.chats,function(e){return r("p",{staticClass:"each-message",class:["user"===e.from?"user":"runner"]},[t._v(t._s(e.from+": "+e.message))])}))},o=[],n={props:["chats"],data(){return{}},computed:{isUser(){return"user"===this.chat.from}}},a=n,i=(r("b56a"),r("2877")),c=Object(i["a"])(a,s,o,!1,null,null,null);c.options.__file="renderChat.vue";e["a"]=c.exports},1288:function(t,e,r){},"187f":function(t,e,r){},"1a7c":function(t,e,r){},"223f":function(t,e,r){},"2afc":function(t,e,r){},"2fe8":function(t,e,r){},3:function(t,e,r){t.exports=r("902e")},"3f34":function(t,e,r){},"41bb":function(t,e,r){"use strict";var s=r("187f"),o=r.n(s);o.a},"43a0":function(t,e,r){"use strict";var s=r("3f34"),o=r.n(s);o.a},"4a8c":function(t,e,r){},5199:function(t,e,r){},6084:function(t,e,r){"use strict";var s=r("1a7c"),o=r.n(s);o.a},"63ae":function(t,e,r){"use strict";var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"signin-button"},[s("a",{staticClass:"signin-button__link",attrs:{href:t.loginURL}},[s("img",{staticClass:"signin-button__g-image",attrs:{src:r("c616"),alt:"sign in with google"}})])])},o=[],n={props:["loginURL"]},a=n,i=(r("7ea8"),r("2877")),c=Object(i["a"])(a,s,o,!1,null,"471daa62",null);c.options.__file="signinButton.vue";e["a"]=c.exports},"661e":function(t,e,r){},"75e1":function(t,e,r){},7839:function(t,e,r){"use strict";var s=r("223f"),o=r.n(s);o.a},"7ea8":function(t,e,r){"use strict";var s=r("ac0c"),o=r.n(s);o.a},"7f9f":function(t,e,r){},8299:function(t,e,r){"use strict";var s=r("1288"),o=r.n(s);o.a},"902e":function(t,e,r){"use strict";r.r(e);var s=r("2b0e"),o=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("router-view")},n=[],a={},i=a,c=(r("d2f0"),r("2877")),l=Object(c["a"])(i,o,n,!1,null,null,null);l.options.__file="app.vue";var u=l.exports,d=r("8c4f"),p=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"components-after-login"},[t.showMenu?r("user-menu",{on:{hideMenu:t.hideMenu}}):t._e(),r("a",{staticClass:"menu__hamburger-icon",attrs:{href:""},on:{click:function(e){return e.preventDefault(),t.renderMenu(e)}}},[t._v("☰")]),r("router-view",{staticClass:"components",attrs:{pickUpLocation:t.pickUpLocation,dropLocation:t.dropLocation,socket:t.socket},on:{coords:t.getCoords}})],1)},h=[],f=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"menu-block"},[r("menu",{staticClass:"user-menu",on:{click:function(e){t.$emit("hideMenu")}}},[r("li",{staticClass:"close-menu"},[r("span",{on:{click:function(e){t.$emit("hideMenu")}}},[t._v("⬅")])]),r("li",{staticClass:"component-link"},[r("router-link",{attrs:{to:"/"}},[t._v("Place order")])],1),r("li",{staticClass:"component-link"},[r("router-link",{attrs:{to:"/showOrders"}},[t._v("Show my orders")])],1),r("li",{staticClass:"component-link"},[r("router-link",{attrs:{to:"/myProfile"}},[t._v("My profile")])],1),t._m(0)])])},m=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("li",{staticClass:"component-link"},[r("a",{attrs:{href:"https://dunzoclone.now.sh/user/signout",role:"button"}},[t._v("Sign out")])])}],v={},g=v,_=(r("03ac"),Object(c["a"])(g,f,m,!1,null,null,null));_.options.__file="userMenu.vue";var b=_.exports,k={components:{userMenu:b},data(){return{pickUpLocation:null,dropLocation:null,showMenu:!1,socket:"",urlMapsAPI:"https://maps.googleapis.com/maps/api/js?key=AIzaSyBFolxZ5fvkgwj500OM1IWsklOSz_dA63A&libraries=places",urlSocketio:"https://dunzoclone.now.sh/socket.io/socket.io.js",intervalId:null,showSideBar:!1}},methods:{hideMenu(){this.showMenu=!1},getCoords(t){console.log("got coordinates"),"provideDropAddress"===t[0]?this.dropLocation=t[1]:"providePickUpAddress"===t[0]&&(this.pickUpLocation=t[1])},renderMenu(){this.showMenu=!0},async getPublicVapidKey(){let t="https://dunzoclone.now.sh/publicVapidKey",e=await(await fetch(t)).json();return e},async initiateServiceWorker(){try{let t=await navigator.serviceWorker.getRegistration();if(!t){await navigator.serviceWorker.register("userSW.js",{scope:"/"})}let e=await t.pushManager.getSubscription(),r=!e;return e||(e=await t.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:await this.getPublicVapidKey()})),!!r&&e}catch(t){console.log(t)}},async subscribePushNotification(t){await fetch("https://dunzoclone.now.sh/subscribe",{mode:"cors",method:"post",body:JSON.stringify(t),headers:{"content-type":"application/json",authorization:document.cookie.split(";").map(t=>t.trim()).filter(t=>t.startsWith("access_token="))[0].substring(13)}})},loadScript(t){let e=document.createElement("script");e.setAttribute("src",t),e.setAttribute("async",!0),e.setAttribute("defer",!0),document.head.appendChild(e)},checkForSocket(){io&&(this.socket=io("https://dunzoclone.now.sh/"),clearInterval(this.intervalId))}},async mounted(){if(this.loadScript(this.urlMapsAPI),this.loadScript(this.urlSocketio),this.intervalId=setInterval(this.checkForSocket,3e3),navigator.serviceWorker){let t=await this.initiateServiceWorker();t&&this.subscribePushNotification(t)}}},y=k,w=(r("43a0"),Object(c["a"])(y,p,h,!1,null,null,null));w.options.__file="user.vue";var O=w.exports,C=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"login-component"},[t._m(0),r("div",{staticClass:"signin-button-block"},[t.fetchingURL?r("p",[t._v("loading")]):r("signin-button",{attrs:{loginURL:t.loginURL}})],1)])},S=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"heading"},[r("h1",{staticClass:"heading__h1"},[t._v("Dunzo-Clone")]),r("h2",{staticClass:"heading__user-greeting"},[t._v("Hey, User")])])}],L=r("63ae"),M={components:{signinButton:L["a"]},data(){return{loginURL:null}},methods:{async getLoginURL(){try{let t=await fetch("https://dunzoclone.now.sh/user/getLoginURL"),e=(await t.json()).url;return e}catch(t){return null}}},async mounted(){this.loginURL=await this.getLoginURL()},computed:{fetchingURL(){return!this.loginURL}}},j=M,D=(r("6084"),Object(c["a"])(j,C,S,!1,null,null,null));D.options.__file="login.vue";var I=D.exports,P=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"place-order-component"},[r("div",{staticClass:"place-order-form"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.orderDescription,expression:"orderDescription"}],staticClass:"place-order-form__description",attrs:{type:"text",placeholder:t.descriptionPlaceholder},domProps:{value:t.orderDescription},on:{input:[function(e){e.target.composing||(t.orderDescription=e.target.value)},t.removeStatusMessage]}}),r("pick-up-location",{on:{coords:t.getPickUpLocation}}),r("drop-location",{on:{coords:t.getDropLocation}}),r("button",{staticClass:"place-order-form__submitBtn",attrs:{disabled:t.disablePlaceBtn},on:{click:t.placeOrder}},[t._v("place")])],1),t.displayStatus?r("place-order-status",{staticClass:"place-order__status",attrs:{status:t.placementStatus}}):t._e()],1)},U=[],$=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"status-messages"},[t.invalidForm?r("p",[t._v("order form is incomplete, make sure order description is more than 10 characters and both addresses are filled")]):t.placed?r("p",[t._v("order has been placed successfully")]):t.notPlaced?r("p",[t._v("order did not get placed successfully, try again")]):t._e()])},x=[],B={props:["status"],computed:{invalidForm(){return this.status[0]},placed(){return this.status[1]},notPlaced(){return this.status[2]}}},F=B,E=(r("b94c"),Object(c["a"])(F,$,x,!1,null,null,null));E.options.__file="placeOrderStatus.vue";var z=E.exports,R=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"address-input-block"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.value,expression:"value"}],ref:"addressInput",staticClass:"address-input-field",attrs:{type:"text",placeholder:t.placeholder},domProps:{value:t.value},on:{input:function(e){e.target.composing||(t.value=e.target.value)}}})])},A=[],W={data(){return{autocomplete:null,intervalID:null,placeholder:"Enter a location",value:""}},methods:{createBounds(t,e){return new google.maps.Circle({center:t,radius:e})},getAutoCompleteObject(t){let e={types:["geocode"],placeIdOnly:!0,componentRestrictions:{country:"in"}},r=this.$refs.addressInput,s=new google.maps.places.Autocomplete(r,e);return s.setBounds(t.getBounds()),s.addListener("place_changed",this.emitCoords),s},async emitCoords(){let t=this.autocomplete.getPlace(),e=t.place_id,r=await this.getCoords(e),s=r.geometry.location.lat(),o=r.geometry.location.lng(),n=r.formatted_address;this.$emit("coords",{coords:{lat:s,lng:o},address:n})},async getCoords(t){let e=new google.maps.Geocoder,r=await this.obtainGeocode(e,t);return r},obtainGeocode(t,e){return new Promise((r,s)=>{t.geocode({placeId:e},(t,e)=>{"OK"===e?r(t[0]):s()})})},async createAutoComplete(){try{let t={lat:12.9833,lng:77.5833},e=1e5,r=this.createBounds(t,e);this.autocomplete=this.getAutoCompleteObject(r)}catch(t){console.error(t)}},checkForGoogle(){google&&(this.createAutoComplete(),clearInterval(this.intervalID))}},async mounted(){this.intervalID=setInterval(this.checkForGoogle,3e3)}},N=W,T=(r("b689"),Object(c["a"])(N,R,A,!1,null,null,null));T.options.__file="searchLocation.vue";var G=T.exports,J={components:{placeOrderStatus:z,pickUpLocation:G,dropLocation:G},data(){return{orderDescription:"",descriptionPlaceholder:"Type your order",postOrderUrl:"https://dunzoclone.now.sh/user/placeorder",pickUpLocation:{},dropLocation:{},displayStatus:!1,placementStatus:[0,0,0],reset:!1}},computed:{disablePlaceBtn(){return this.validateForm(this.orderDescription,this.pickUpLocation,this.dropLocation)}},methods:{removeStatusMessage(){this.displayStatus=!1},async placeOrder(){let t=this.validateForm(this.orderDescription,this.pickUpLocation,this.dropLocation);if(t){try{let t=this.constructOrderBody(this.orderDescription,this.pickUpLocation,this.dropLocation);await this.postOrder(t);this.placementStatus=[0,1,0]}catch(t){this.placementStatus=[0,0,1]}this.displayStatus=!0,this.orderDescription=""}else this.placementStatus=[1,0,0]},async postOrder(t){let e=(await(await fetch(this.postOrderUrl,this.constructFetchBody(t))).json()).status;return e},validateForm(t,e,r){return!!(t.length>=10&&e.coords&&r.coords)},getPickUpLocation(t){this.pickUpLocation.coords=t.coords,this.pickUpLocation.address=t.address},getDropLocation(t){this.dropLocation.coords=t.coords,this.dropLocation.address=t.address},constructOrderBody(t,e,r){return{description:t,from:[e.coords.lng,e.coords.lat],to:[r.coords.lng,r.coords.lat],fromAddr:e.address,toAddr:r.address}},constructFetchBody(t){return{method:"post",mode:"cors",headers:{authorization:document.cookie.split(";").map(t=>t.trim()).filter(t=>t.startsWith("access_token="))[0].substring(13),"content-type":"application/json"},body:JSON.stringify(t)}}}},K=J,V=(r("8299"),Object(c["a"])(K,P,U,!1,null,null,null));V.options.__file="placeOrder.vue";var q=V.exports,H=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"orders-list-block"},[r("ol",{staticClass:"order-list"},[0===t.orders.length?r("p",[t._v("No Orders found")]):t._l(t.orders,function(e){return r("li",{key:e._id},[r("orderList",{staticClass:"each-order",attrs:{order:e},on:{getdetails:t.changeRoute,cancelorder:t.cancelOrder}})],1)})],2)])},Z=[],Q=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{on:{click:function(e){t.$emit("getdetails",t.order._id)}}},[r("p",[t._v(t._s(t.order.status))]),r("p",[t._v(t._s(t.order.description))]),r("p",[t._v("PlacedOn: "+t._s(t.order.placedOn))]),r("button",{attrs:{disabled:t.disableCancelBtn},on:{click:function(e){e.preventDefault(),t.$emit("cancelorder",t.order._id)}}},[t._v("cancel")])])},X=[],Y={props:["order"],computed:{disableCancelBtn(){return"canceled"===this.order.status||"fulfilled"===this.order.status}}},tt=Y,et=(r("7839"),Object(c["a"])(tt,Q,X,!1,null,null,null));et.options.__file="orderList.vue";var rt=et.exports,st={components:{orderList:rt},data(){return{orders:[],ordersUrl:"https://dunzoclone.now.sh/user/getorders",urlCancelOrder:"https://dunzoclone.now.sh/user/cancelorder"}},async mounted(){this.orders=await this.getOrders(this.ordersUrl)},methods:{async getOrders(t){let e=await(await fetch(t,this.constructBodyToFetch())).json();return e.message},changeRoute(t){At.$router.push({path:`showOrderDetails/${t}`})},constructBodyToFetch(){return{headers:{"content-type":"application/json",authorization:document.cookie.split(";").map(t=>t.trim()).filter(t=>t.startsWith("access_token="))[0].substring(13)}}},async cancelOrder(t){let e=await(await fetch(this.urlCancelOrder,{...this.constructBodyToFetch(),method:"post",body:JSON.stringify({orderID:t})})).json();console.log(e)}}},ot=st,nt=(r("fcab"),Object(c["a"])(ot,H,Z,!1,null,null,null));nt.options.__file="showOrders.vue";var at=nt.exports,it=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("list-order-details",{attrs:{order:t.orderDetails}}),r("track-runner",{attrs:{orderId:t.orderId,socket:t.socket}})],1)},ct=[],lt=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"order-details-block"},[r("p",[t._v(t._s(t.order.status))]),r("p",[t._v(t._s(t.order.description))]),r("p",[t._v("Placed-On: "+t._s(t.order.placedOn))]),r("p",[t._v("Order-Id: "+t._s(t.order._id))]),r("p",[t._v("Pickup: "+t._s(t.order.fromAddr))]),r("p",[t._v("Drop: "+t._s(t.order.toAddr))]),r("p",[t._v("Runner: "+t._s(t.runner))]),r("button",{attrs:{disabled:t.disabledCancelBtn},on:{click:t.cancelOrder}},[t._v("cancel")]),r("button",{attrs:{disabled:t.disabledChat},on:{click:t.goToChat}},[t._v("chat with runner")])])},ut=[],dt={props:["order"],data(){return{urlCancelOrder:"https://dunzoclone.now.sh/user/cancelorder"}},computed:{runner(){return this.order.runner?this.order.runner.name:"not assigned"},disabledChat(){return"assigned"!==this.order.status&&"fulfilled"!==this.order.status},disabledCancelBtn(){return"assigned"!==this.order.status}},methods:{constructBodyToFetch(){return{headers:{"content-type":"application/json",authorization:document.cookie.split(";").map(t=>t.trim()).filter(t=>t.startsWith("access_token="))[0].substring(13)},method:"post",body:JSON.stringify({orderID:this.order._id})}},async cancelOrder(){let t=await(await fetch(this.urlCancelOrder,this.constructBodyToFetch())).json();console.log(t)},goToChat(){this.$router.push(`${this.$route.path}/chat`)}}},pt=dt,ht=(r("de5f"),Object(c["a"])(pt,lt,ut,!1,null,null,null));ht.options.__file="listOrderDetails.vue";var ft=ht.exports,mt=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"tracker-map"},[r("div",{ref:"map",attrs:{id:"map"}})])},vt=[],gt={props:["orderId","socket"],data(){return{map:null,lat:12.9608311,lng:76.64365539999994,marker:null,intervalID:null}},methods:{renderMap(){this.map=new google.maps.Map(this.$refs.map,{center:{lat:this.lat,lng:this.lng},zoom:13})},putMarker(){this.marker=new google.maps.Marker({map:this.map,position:{lat:parseFloat(this.lat),lng:this.lng},optimized:!1})},dropMarker(){this.marker.setMap(null),this.map.setCenter({lat:parseFloat(this.lat),lng:parseFloat(this.lng)}),this.putMarker()},electrifyMap(){this.renderMap(),this.putMarker(),this.socket.emit("position request",this.orderId),this.socket.on("runner position",t=>{console.log("runner position",t),this.lng=t[0],this.lat=t[1]})},checkForGoogle(){google&&(this.electrifyMap(),clearInterval(this.intervalID))}},watch:{lat(){this.dropMarker()},lng(){this.dropMarker()}},mounted(){this.intervalID=setInterval(this.checkForGoogle,3e3)}},_t=gt,bt=(r("41bb"),Object(c["a"])(_t,mt,vt,!1,null,null,null));bt.options.__file="trackRunner.vue";var kt=bt.exports,yt={props:["socket"],components:{listOrderDetails:ft,trackRunner:kt},data(){return{orderDetails:{},orderDetailsUrl:"https://dunzoclone.now.sh/user/getOrderDetails?orderID="}},computed:{orderId(){return this.$route.params.id},getOrderDetailsUrl(){return`${this.orderDetailsUrl}${this.orderId}`}},methods:{async getOrderDetails(t){try{return(await(await fetch(t,this.constructBodyToFetch())).json()).details}catch(t){}},constructBodyToFetch(){return{headers:{authorization:document.cookie.split(";").map(t=>t.trim()).filter(t=>t.startsWith("access_token="))[0].substring(13)}}}},async mounted(){this.orderDetails=await this.getOrderDetails(this.getOrderDetailsUrl)}},wt=yt,Ot=(r("bd0f"),Object(c["a"])(wt,it,ct,!1,null,null,null));Ot.options.__file="showOrderDetails.vue";var Ct=Ot.exports,St=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("div",{staticClass:"profile"},[r("img",{staticClass:"profile__pic",attrs:{src:t.profile.profilePicture,alt:"pic"}}),r("p",[t._v("Name: "+t._s(t.profile.name))]),r("p",[t._v("EmailId: "+t._s(t.profile.emailID))]),r("p",[t._v("First Signin: "+t._s(t.profile.firstSignedIn))]),r("p",[t._v("Recent Signin: "+t._s(t.profile.recentSignedIn))]),r("p",[t._v("Number of orders: "+t._s(t.profile.pastOrders.length))])])])},Lt=[],Mt={components:{userMenu:b},data(){return{getProfileUrl:"https://dunzoclone.now.sh/user/profile",profile:{}}},methods:{async getMyProfile(){let t=await fetch(this.getProfileUrl,this.constructFetchBody()),e=(await t.json())[0];return console.log(e),e},constructFetchBody(){return{headers:{authorization:document.cookie.split(";").map(t=>t.trim()).filter(t=>t.startsWith("access_token="))[0].substring(13)}}}},async mounted(){this.profile=await this.getMyProfile()}},jt=Mt,Dt=(r("e3c6"),Object(c["a"])(jt,St,Lt,!1,null,null,null));Dt.options.__file="userProfile.vue";var It=Dt.exports,Pt=r("9646"),Ut=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"chat-component"},[r("render-chat",{attrs:{chats:t.chats}}),r("div",{staticClass:"chat-input-box"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.message,expression:"message"}],attrs:{type:"text",placeholder:"Enter your message"},domProps:{value:t.message},on:{input:function(e){e.target.composing||(t.message=e.target.value)}}}),r("button",{attrs:{disabled:t.disabledSendBtn},on:{click:t.sendMessage}},[t._v("send")])])],1)},$t=[],xt=r("0895"),Bt={props:["socket"],components:{renderChat:xt["a"]},data(){return{message:"",chats:[],intervalId:null}},methods:{sendMessage(){this.socket.emit("chat message",[this.$route.params.id,this.message],t=>this.chats.push(t)),this.message=""},getPastMessages(t){this.chats=t},checkForSocket(){this.socket&&(this.socket.emit("join chat room",this.$route.params.id),this.socket.on("past messages",this.getPastMessages),this.socket.on("chat message",t=>this.chats.push(t)),clearInterval(this.intervalId))}},computed:{disabledSendBtn(){return!(this.message.length>0)}},mounted(){this.intervalId=setInterval(this.checkForSocket,3e3)}},Ft=Bt,Et=(r("c8a1"),Object(c["a"])(Ft,Ut,$t,!1,null,null,null));Et.options.__file="userChat.vue";var zt=Et.exports;s["a"].use(d["a"]);var Rt=new d["a"]({routes:[{path:"/login",component:I},{path:"/",component:O,children:[{path:"/",redirect:"/placeOrder"},{path:"/placeOrder",component:q},{path:"/showOrders",component:at},{path:"/showOrderDetails/:id",component:Ct},{path:"/showOrderDetails/:id/chat",component:zt},{path:"/myProfile",component:It},{path:"/about",component:Pt["a"]}]}]}),At=e["default"]=new s["a"]({router:Rt,render:t=>t(u)}).$mount("#app")},"93e7":function(t,e,r){},9410:function(t,e,r){"use strict";var s=r("93e7"),o=r.n(s);o.a},9646:function(t,e,r){"use strict";var s=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},o=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("p",[t._v("Developed by Karthik and Mukul")])])}],n={},a=n,i=(r("9410"),r("2877")),c=Object(i["a"])(a,s,o,!1,null,null,null);c.options.__file="about.vue";e["a"]=c.exports},ac0c:function(t,e,r){},b56a:function(t,e,r){"use strict";var s=r("5199"),o=r.n(s);o.a},b689:function(t,e,r){"use strict";var s=r("eb7e"),o=r.n(s);o.a},b8f1:function(t,e,r){},b94c:function(t,e,r){"use strict";var s=r("ccd3"),o=r.n(s);o.a},bd0f:function(t,e,r){"use strict";var s=r("2fe8"),o=r.n(s);o.a},c616:function(t,e,r){t.exports=r.p+"img/btn_google_signin_light_normal_web@2x.52a05e73.png"},c8a1:function(t,e,r){"use strict";var s=r("2afc"),o=r.n(s);o.a},ccd3:function(t,e,r){},d2f0:function(t,e,r){"use strict";var s=r("661e"),o=r.n(s);o.a},de5f:function(t,e,r){"use strict";var s=r("7f9f"),o=r.n(s);o.a},e3c6:function(t,e,r){"use strict";var s=r("b8f1"),o=r.n(s);o.a},eb7e:function(t,e,r){},fcab:function(t,e,r){"use strict";var s=r("75e1"),o=r.n(s);o.a}});
//# sourceMappingURL=user.56cf4d6f.js.map