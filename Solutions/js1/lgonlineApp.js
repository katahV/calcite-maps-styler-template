/* 
This source is a compressed form of part of the git commit 
d3d6dd3babcdc490 2014-11-24 14:09:44 -0800
Uncompressed source is available from https://github.com/Esri/local-government-online-apps 
*/ 
/*

 | Copyright 2012 Esri
 |
 | Licensed under the Apache License, Version 2.0 (the "License");
 | you may not use this file except in compliance with the License.
 | You may obtain a copy of the License at
 |
 |    http://www.apache.org/licenses/LICENSE-2.0
 |
 | Unless required by applicable law or agreed to in writing, software
 | distributed under the License is distributed on an "AS IS" BASIS,
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 | See the License for the specific language governing permissions and
 | limitations under the License.
*/
define("js/lgonlineApp","dijit dijit/registry dojo/dom-construct dojo/on dojo/dom-style dojo/dom-class dojo/_base/array esri/arcgis/utils dojo/topic dojo/_base/Color".split(" "),function(q,t,k,p,n,r,l,u,g,s){dojo.require("esri.tasks.find");dojo.require("esri.tasks.locator");dojo.require("esri.tasks.query");dojo.require("esri.dijit.BasemapGallery");dojo.require("esri.layout");dojo.require("esri.dijit.Attribution");dojo.declare("js.LGObject",null,{constructor:function(a){var b,c,d=this;void 0!==a&&
dojo.safeMixin(this,a);this.checkPrerequisites&&this.checkPrerequisites();a={};this.rootId&&(a.id=this.rootId);this.rootClass?a.className=this.rootClass:a.style="display:none";void 0!==this.parentDiv?(b=this.parentDiv,(c=dojo.byId(b))||(b=null)):b=null;c&&c.getLGObject&&c.getLGObject().addItem?(this.rootDiv=k.create("div",a),c.getLGObject().addItem(this.rootDiv)):this.rootDiv=k.create("div",a,b);this.rootDiv.getLGObject=function(){return d}},getRootDiv:function(){return this.rootDiv},deleteDivFromDom:function(){this.rootDiv&&
this.rootDiv.parentNode.removeChild(this.rootDiv)},injectCSS:function(a){var b;b=document.createElement("style");b.setAttribute("type","text/css");b.styleSheet?b.styleSheet.cssText=a:(a=document.createTextNode(a),b.appendChild(a));a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(b,a);return b},checkForI18n:function(a){var b,c=a;this.i18n&&a&&1<a.length&&(b=a.substring(0,1),"@"===b&&(c=this.followAttributePath(this.i18n,a.substring(1))));return c},followAttributePath:function(a,
b){var c,d=a,e=b.split("."),e=b.split(".");for(c=0;c<e.length;c+=1)d=d[e[c]];return d},log:function(a,b){console&&console.log(a);b&&g.publish("error",a);window.gLogMessageBox&&window.gLogMessageBox.append(a)}});dojo.declare("js.LGColorizer",js.LGObject,{constructor:function(){var a="",b=this,c=["#fff","#333333","#5d5d5d"];l.some(this.colorTable,function(a){return b.theme===a.theme?(c=a.colors,!0):!1});a+=".appTheme{color:"+c[0]+";background-color:"+c[1]+"}";a+=".appThemeHover:hover{background-color:"+
c[2]+"}";this.injectCSS(a)}});dojo.declare("js.LGGraphic",js.LGObject,{constructor:function(){dojo.connect(window,"resize",this,this.handleWindowResize,!0);this.handleWindowResize()},setIsVisible:function(a){n.set(this.getRootDiv(),"display",a?"block":"none")},toggleVisibility:function(){var a="none"!==n.get(this.getRootDiv(),"display");n.set(this.getRootDiv(),"display",a?"none":"block")},handleWindowResize:function(){void 0!==this.fill&&!0===this.fill?this.fillParentDiv():void 0!==this.horizOffset&&
void 0!==this.vertOffset&&this.alignOver(this.rootDiv,this.rootDiv.parentNode,this.horizOffset,this.vertOffset)},fillParentDiv:function(){var a;this.rootDiv.parentNode&&(a={left:"0px",top:"0px",width:this.rootDiv.parentNode.clientWidth+"px",height:this.rootDiv.parentNode.clientHeight+"px"},dojo.style(this.rootDiv,a))},alignOver:function(a,b,c,d){var e,f,h,m=this;a&&b&&(e=dojo.marginBox(a),f=dojo.marginBox(b),h={},"number"===typeof c?h=this.insertHorizPositioningStyle(h,c,e,f):"object"===typeof c&&
l.forEach(c,function(a){h=m.insertHorizPositioningStyle(h,a,e,f)}),"number"===typeof d?h=this.insertVertPositioningStyle(h,d,e,f):"object"===typeof d&&l.forEach(d,function(a){h=m.insertVertPositioningStyle(h,a,e,f)}),dojo.style(a,h))},insertHorizPositioningStyle:function(a,b,c,d){0<b?a.left=b+"px":0===b?a.left=Math.round((d.w-c.w)/2)+"px":a.right=-b+"px";return a},insertVertPositioningStyle:function(a,b,c,d){0<b?a.top=b+"px":0===b?a.top=Math.round((d.h-c.h)/2)+"px":a.bottom=-b+"px";return a},applyTheme:function(a,
b){r.add(b||this.rootDiv,"appTheme");a&&r.add(b||this.rootDiv,"appThemeHover")}});dojo.declare("js.LGBusy",js.LGGraphic,{constructor:function(){this.busyImageClass&&dojo.addClass(this.rootDiv,this.busyImageClass)}});dojo.declare("js.LGCommand",js.LGGraphic,{constructor:function(){var a,b=this;this.applyTheme(!0);this.iconUrl&&(a={src:this.iconUrl},this.iconClass&&(a.className=this.iconClass),this.iconImg=dojo.create("img",a,this.rootDiv));this.displayText&&(a={innerHTML:this.checkForI18n(this.displayText)},
this.displayTextClass&&(a.className=this.displayTextClass),dojo.create("div",a,this.rootDiv));this.tooltip&&(this.rootDiv.title=this.checkForI18n(this.tooltip));this.publish&&(this.clickHandler=p(this.rootDiv,"click",this.handleClick));this.dependencyId&&(this.setIsVisible(!1),a=dojo.byId(this.dependencyId).getLGObject(),a.ready.then(function(){b.setIsVisible(!0)}))},handleClick:function(a){a=a.currentTarget.getLGObject();g.publish("command",a.publish);g.publish(a.publish,a.publishArg)}});dojo.declare("js.LGSearch",
js.LGObject,{constructor:function(){this.busyIndicator&&(this.busyIndicator=dojo.byId(this.busyIndicator).getLGObject())},search:function(){return null},toList:function(){return[]},publish:function(a,b){g.publish(a,b)},sortByLabel:function(a,b){var c=0;a&&b&&a.label&&b.label&&(c=a.label.localeCompare(b.label));return c},getRepresentativePoint:function(a){var b;"point"===a.type?b=a:"polygon"===a.type?(b=a.getExtent().getCenter(),a.contains(b)||(b=a.getPoint(0,0))):"polyline"===a.type&&(b=a.getPoint(0,
0));return b}});dojo.declare("js.LGSearchAddress",js.LGSearch,{constructor:function(){this.searcher=new esri.tasks.Locator(this.searchUrl);this.searcher.outSpatialReference=new esri.SpatialReference({wkid:this.outWkid});this.params={};this.params.outFields=this.outFields},search:function(a,b,c){this.params.address={};this.params.address[this.addressParamName]=a;this.searcher.addressToLocations(this.params,b,c)},toList:function(a){var b,c=this,d=[];a&&l.forEach(a,function(a){b=!1;a.score>=c.minimumScore&&
(c.validLocators?l.some(c.validLocators,function(c){if(a.attributes.Loc_name===c)return b=!0}):b=!0);b&&d.push({label:a.address,data:new esri.geometry.Point(a.location.x,a.location.y,new esri.SpatialReference({wkid:102100}))})});return d}});dojo.declare("js.LGSearchFeatureLayer",js.LGSearch,{constructor:function(){var a,b,c=this;if(!this.searchPattern||0>this.searchPattern.indexOf("${1}"))this.searchPattern="%${1}%";this.caseInsensitiveSearch=void 0===this.caseInsensitiveSearch||"true"===this.caseInsensitiveSearch||
!0===this.caseInsensitiveSearch?!0:!1;this.ready=new dojo.Deferred;a=dojo.byId(this.mapRootId).getLGObject();a.ready.then(function(){var d,e,f=",";try{if((b=a.getLayer(c.searchLayerName))&&b.url){c.searchURL=b.url;l.forEach(b.fields,function(a){f+=a.name+","});l.every(c.searchFields,function(a){d=a;return 0<=f.indexOf(","+a+",")})||(e='"'+d+'"<br>',e+=c.checkForI18n("@messages.searchFieldMissing")+"<br><hr><br>",e+=c.checkForI18n("@prompts.layerFields")+"<br>",1<f.length&&(e+=f.substring(1,f.length-
1)),c.log(e,!0));c.objectIdField=b.objectIdField;c.publishPointsOnly="boolean"===typeof c.publishPointsOnly?c.publishPointsOnly:!0;c.searcher=new esri.tasks.QueryTask(c.searchURL);c.generalSearchParams=new esri.tasks.Query;c.generalSearchParams.returnGeometry=!1;c.generalSearchParams.outSpatialReference=a.mapInfo.map.spatialReference;c.generalSearchParams.outFields=[b.objectIdField].concat(c.searchFields);c.objectSearchParams=new esri.tasks.Query;c.objectSearchParams.returnGeometry=!0;c.objectSearchParams.outSpatialReference=
a.mapInfo.map.spatialReference;c.log("Search layer "+c.searchLayerName+" set up for queries");c.ready.resolve(c);return}d=c.checkForI18n("@messages.searchLayerMissing")}catch(h){d=h.toString()}e='"'+c.searchLayerName+'"<br>';e+=d+"<br><hr><br>";e+=c.checkForI18n("@prompts.mapLayers")+"<br><ul>";l.forEach(a.getLayerNameList(),function(a){e+='<li>"'+a+'"</li>'});e+="</ul>";c.log(e,!0);c.ready.reject(c)})},checkPrerequisites:function(){var a,b=this;if(this.searchFields&&0<this.searchFields.length)a=
this.searchFields.split(","),this.searchFields=[],l.forEach(a,function(a){b.searchFields.push(a.trim())});else throw this.log("missing search fields"),"missing search fields";},search:function(a,b,c){var d,e="",f,h="";!0===this.caseInsensitiveSearch?(d=a.toUpperCase(),f="UPPER(${0}) LIKE '"+this.searchPattern+"'"):(d=a,f="${0} LIKE '"+this.searchPattern+"'");d=d.replace(/'/g,"''");l.forEach(this.searchFields,function(a){e=e+h+dojo.string.substitute(f,[a,d]);h="  OR  "});0<e.length&&(this.generalSearchParams.where=
e,this.searcher.execute(this.generalSearchParams,b,c))},toList:function(a,b){var c=this,d=[],e,f,h=b.toUpperCase();a&&a.features&&0<a.features.length&&(l.forEach(a.features,function(a){f="";l.some(c.searchFields,function(b){return a.attributes[b]&&(e=a.attributes[b].toString(),0<=e.toUpperCase().indexOf(h))?(f=e,!0):!1});""===f&&(f="result");d.push({label:f,data:a.attributes[c.objectIdField]})}),d.sort(c.sortByLabel));return d},publish:function(a,b){var c,d,e=this;this.busyIndicator&&this.busyIndicator.setIsVisible(!0);
this.objectSearchParams.where=this.objectIdField+"="+b;this.searcher.execute(this.objectSearchParams,function(b){b&&b.features&&0<b.features.length?(c=b.features[0],d=e.publishPointsOnly?e.getRepresentativePoint(c.geometry):c,g.publish(a,d)):e.log("LGSearchFeatureLayer_1: no results");e.busyIndicator&&e.busyIndicator.setIsVisible(!1)},function(a){e.log("LGSearchFeatureLayer_2: "+a.message);e.busyIndicator&&e.busyIndicator.setIsVisible(!1)})}});dojo.declare("js.LGDropdownBox",js.LGGraphic,{constructor:function(){var a=
this;this.applyTheme(!1);this.trigger&&(g.subscribe("command",function(b){b!==a.trigger&&a.setIsVisible(!1)}),g.subscribe(this.trigger,function(b){a.handleTrigger(b)}))},handleTrigger:function(){this.toggleVisibility()}});dojo.declare("js.LGMessageBox",js.LGDropdownBox,{constructor:function(){this.content&&0<this.content.length&&(this.rootDiv.innerHTML=this.content);touchScroll(this.rootDiv)}});dojo.declare("js.LGPublishEcho",js.LGDropdownBox,{handleTrigger:function(a){this.rootDiv.innerHTML=a.toString();
this.toggleVisibility()}});dojo.declare("js.LGLogBox",js.LGDropdownBox,{constructor:function(){window.gLogMessageBox=this;touchScroll(this.rootDiv)},append:function(a){"string"===typeof a?k.create("div",{innerHTML:a,style:"margin:2px"},this.rootDiv):"object"===typeof a&&null!==a&&this.rootDiv.appendChild(a)}});dojo.declare("js.LGSearchBoxByText",js.LGDropdownBox,{constructor:function(){var a=this,b,c,d,e,f,h,m,g;b=this.rootId+"_entry";k.create("label",{"for":b,innerHTML:this.checkForI18n(this.showPrompt)},
this.rootId);c=(new q.form.TextBox({id:b,value:"",trim:!0,placeHolder:this.hint,intermediateChanges:!0})).placeAt(this.rootId);n.set(t.byId(b).domNode,"width","99%");b=k.create("div",{className:this.resultsListBoxClass},this.rootId);d=k.create("table",{className:this.resultsListTableClass},b);e=k.create("tbody",{className:this.resultsListBodyClass},d);touchScroll(b);f=dojo.byId(this.searcher).getLGObject();h="";m=0;g=null;p(c,"change",function(){var b=c.get("value");h!==b&&(h=b,dojo.empty(e),clearTimeout(g),
0<b.length&&(g=setTimeout(function(){var c,d,g;c=k.create("tr",null,e);k.create("td",{className:a.resultsListSearchingClass},c);d=m=(new Date).getTime();f.search(b,function(c){d<m||(dojo.empty(e),c=f.toList(c,b),g=(new Date).getTime(),a.log("retd "+c.length+" items in "+(g-d)/1E3+" secs"),0<c.length&&l.forEach(c,function(b){var c;c=k.create("tr",null,e);c=k.create("td",{className:a.resultsListEntryClass,innerHTML:b.label},c);a.applyTheme(!0,c);p(c,"click",function(){f.publish(a.publish,b.data)})}))},
function(b){a.log("LGSearchBoxByText_1: "+b.message);h="";dojo.empty(e)})},1E3)))})}});dojo.declare("js.LGMapBasedMenuBox",js.LGDropdownBox,{constructor:function(){var a=this;this.ready=new dojo.Deferred;this.mapObj=dojo.byId(this.mapRootId).getLGObject();this.mapObj.ready.then(function(){a.onMapReady();a.ready.resolve(a)})},onMapReady:function(){return null}});dojo.declare("js.LGBasemapBox",js.LGMapBasedMenuBox,{onMapReady:function(){var a,b,c=this.getBasemapGroup();a=this.rootId+"_gallery";b=(new q.layout.ContentPane({id:a,
className:this.galleryClass})).placeAt(this.rootDiv);touchScroll(a);a=(new esri.dijit.BasemapGallery({showArcGISBasemaps:!0,basemapsGroup:c,bingMapsKey:this.mapObj.commonConfig.bingMapsKey,map:this.mapObj.mapInfo.map},dojo.create("div"))).placeAt(this.rootDiv);b.set("content",a.domNode);a.startup()},getBasemapGroup:function(){var a=null;this.basemapgroupTitle&&this.basemapgroupOwner&&0<this.basemapgroupTitle.length&&0<this.basemapgroupOwner.length&&(a={title:this.basemapgroupTitle,owner:this.basemapgroupOwner});
return a}});dojo.declare("js.LGLaunchUrl",js.LGObject,{constructor:function(){g.subscribe(this.sameWinTrigger,function(a){a&&window.open(a,"_parent")});g.subscribe(this.newWinTrigger,function(a){a&&window.open(a,"_blank")})}});dojo.declare("js.LGLocate",js.LGObject,{constructor:function(){var a=this;this.ready=new dojo.Deferred;Modernizr.geolocation?(g.subscribe(this.trigger,function(){navigator.geolocation.getCurrentPosition(function(b){a.log("go to "+b.coords.latitude+" "+b.coords.longitude);g.publish(a.publish,
new esri.geometry.Point(b.coords.longitude,b.coords.latitude,new esri.SpatialReference({wkid:4326})))},function(b){switch(b.code){case b.PERMISSION_DENIED:b=a.checkForI18n("@messages.geolocationDenied");break;case b.TIMEOUT:b=a.checkForI18n("@messages.geolocationTimeout");break;default:b=a.checkForI18n("@messages.geolocationUnavailable")}alert(b)},{timeout:3E4})}),this.ready.resolve(a)):this.ready.reject(a)}});dojo.declare("js.LGShare",js.LGObject,{constructor:function(){var a=this;this.busyIndicator&&
(this.busyIndicator=dojo.byId(this.busyIndicator).getLGObject());g.subscribe(this.trigger,function(){a.share()})},share:function(){var a=this,b;b=encodeURIComponent(this.getUrlToShare());this.tinyURLServiceURL&&0<this.tinyURLServiceURL.length?(this.busyIndicator&&this.busyIndicator.setIsVisible(!0),b=esri.substitute({url:b},this.tinyURLServiceURL),esri.request({url:b,handleAs:"json"},{useProxy:!1}).then(function(b){var d,e;try{if(d=a.followAttributePath(b,a.tinyURLResponseAttribute))e=esri.substitute({url:d},
a.shareUrl),g.publish(a.publish,e)}catch(f){a.log("LGShare_1: "+f.toString())}a.busyIndicator&&a.busyIndicator.setIsVisible(!1)},function(b){a.log("LGShare_2: "+b.toString());a.busyIndicator&&a.busyIndicator.setIsVisible(!1)})):(b=esri.substitute({url:b},this.shareUrl),g.publish(this.publish,b))},getUrlToShare:function(){return this.getAppUrl()},getAppUrl:function(){return window.location.toString()}});dojo.declare("js.LGShareAppExtents",js.LGShare,{getUrlToShare:function(){var a=this.getAppUrl();
return a+(0>a.indexOf("?")?"?":"&")+this.getMapExtentsArg()},getMapExtentsArg:function(){return"ex="+dojo.byId(this.mapRootId).getLGObject().getExtentsString()}});dojo.declare("js.LGFrame",js.LGGraphic,{constructor:function(){var a;a={};this.headerDivId&&(a.id=this.headerDivId);this.headerDivClass&&(a.className=this.headerDivClass);this.headerDiv=k.create("div",a,this.rootDiv);this.applyTheme(!1,this.headerDiv);a={};this.contentDivId&&(a.id=this.contentDivId);this.contentDivClass&&(a.className=this.contentDivClass);
this.contentDiv=k.create("div",a,this.rootDiv);this.handleWindowResize()},handleWindowResize:function(){this.inherited(arguments);this.resizeContentDiv()},resizeContentDiv:function(){var a,b,c;this.headerDiv&&this.contentDiv&&(a=dojo.marginBox(this.rootDiv),b=dojo.marginBox(this.headerDiv),c={},c.top=b.h+"px",c.height=a.h-b.h+"px",dojo.style(this.contentDiv,c))}});dojo.declare("js.LGGallery",js.LGGraphic,{constructor:function(){var a,b=this;a=k.create("table",null,this.rootDiv);this.applyTheme(!1,
a);dojo.connect(window,"resize",this,this.handleParentResize,!0);this.rootDiv.getContentDiv=function(){return b.addItem()};a=k.create("tbody",null,a);this.galleryRow=k.create("tr",null,a);a={innerHTML:"&lt;",style:{visibility:"hidden"}};this.arrowClass&&(a.className=this.arrowClass);this.leftArrow=k.create("td",a,this.galleryRow);this.applyTheme(!0,this.leftArrow);dojo.connect(this.leftArrow,"onclick",this,this.shiftLeft);a.innerHTML="&gt;";this.rightArrow=k.create("td",a,this.galleryRow);this.applyTheme(!0,
this.rightArrow);dojo.connect(this.rightArrow,"onclick",this,this.shiftRight);this.zeroItemWidth=dojo.marginBox(this.rootDiv).w;this.numItemsToDisplay=this.iFirstItem=this.numItems=this.itemWidth=0;this.handleParentResize()},addItem:function(a){var b;b={};"string"===typeof a&&(b.innerHTML=a);this.itemClass&&(b.className=this.itemClass);b=k.create("td",b);a&&b.appendChild(a);this.galleryRow.insertBefore(b,this.rightArrow);this.numItems+=1;this.firstItem||(this.firstItem=b,this.itemWidth=dojo.marginBox(b).w);
this.rootDiv.style.maxWidth=this.zeroItemWidth+this.numItems*this.itemWidth+"px";this.handleParentResize();return b},handleParentResize:function(){var a,b;a=dojo.marginBox(this.rootDiv.parentNode).w;b=this.zeroItemWidth+this.numItems*this.itemWidth;0!==this.numItems&&(b>a?(this.leftArrow.style.visibility="visible",this.rightArrow.style.visibility="visible",this.numItemsToDisplay=Math.max(Math.floor((a-this.zeroItemWidth)/this.itemWidth),1)):(this.leftArrow.style.visibility="hidden",this.rightArrow.style.visibility=
"hidden",this.numItemsToDisplay=this.numItems),this.iFirstItem=Math.min(this.iFirstItem,this.numItems-this.numItemsToDisplay),this.drawGallery())},shiftLeft:function(){this.iFirstItem=Math.min(this.iFirstItem+1,this.numItems-this.numItemsToDisplay);this.drawGallery()},shiftRight:function(){this.iFirstItem=Math.max(this.iFirstItem-1,0);this.drawGallery()},drawGallery:function(){var a,b=this.iFirstItem,c=this.iFirstItem+this.numItemsToDisplay,d=this.firstItem;for(a=0;a<b;)d.style.display="none",d=d.nextSibling,
a+=1;for(;a<c;)d.style.display="",d=d.nextSibling,a+=1;for(;a<this.numItems;)d.style.display="none",d=d.nextSibling,a+=1;this.handleWindowResize()}});dojo.declare("js.LGMap",js.LGGraphic,{constructor:function(){var a,b,c=null,d=this;this.ready=new dojo.Deferred;a={ignorePopups:!1};a.mapOptions=this.mapOptions||{};a.mapOptions.showAttribution=!0;if(this.xmin&&this.ymin&&this.xmax&&this.ymax)try{c={xmin:this.xmin,ymin:this.ymin,xmax:this.xmax,ymax:this.ymax,spatialReference:{}},c.spatialReference.wkid=
this.wkid?Number(this.wkid):102100,c=new esri.geometry.Extent(c)}catch(e){c=null}if(this.ex){b=this.ex.split(",");try{c={xmin:Number(b[0]),ymin:Number(b[1]),xmax:Number(b[2]),ymax:Number(b[3]),spatialReference:{}},c.spatialReference.wkid=4<b.length?Number(b[4]):102100,c=new esri.geometry.Extent(c)}catch(f){c=null}}this.commonConfig&&this.commonConfig.bingMapsKey&&(a.bingMapsKey=this.commonConfig.bingMapsKey);this.lineHiliteColor=new s(this.lineHiliteColor||"#00ffff");this.fillHiliteColor=new s(this.fillHiliteColor||
[0,255,255,.1]);this.webmap&&(this.mapId=this.webmap);u.createMap(this.mapId,this.rootDiv,a).then(function(a){d.mapInfo=a;a.map.spatialReference||(d.mapInfo.map.spatialReference=new esri.SpatialReference({wkid:102100}));dojo.connect(window,"resize",d.mapInfo.map,function(){d.mapInfo.map.resize();d.mapInfo.map.reposition()});c&&(c.spatialReference.wkid!==d.mapInfo.map.spatialReference.wkid?esri.config.defaults.geometryService?(a=new esri.tasks.ProjectParameters,a.geometries=[c],a.outSR=d.mapInfo.map.spatialReference,
esri.config.defaults.geometryService.project(a).then(function(a){c=a[0];d.mapInfo.map.setExtent(c)})):d.log("LGMap_1: Need geometry service to convert extents from wkid "+c.spatialReference.wkid+" to map's "+d.mapInfo.map.spatialReference.wkid):d.mapInfo.map.setExtent(c));d.tempGraphicsLayer=d.createGraphicsLayer("tempGraphicsLayer");d.positionHandle=g.subscribe("position",function(a){d.tempGraphicsLayer.clear();if(a.spatialReference.wkid===d.mapInfo.map.spatialReference.wkid)d.highlightPoint(a);
else if(4326===a.spatialReference.wkid&&102100===d.mapInfo.map.spatialReference.wkid)a=esri.geometry.geographicToWebMercator(a),d.highlightPoint(a);else if(esri.config.defaults.geometryService){var b=new esri.tasks.ProjectParameters;b.geometries=[a];b.outSR=d.mapInfo.map.spatialReference;esri.config.defaults.geometryService.project(b).then(function(b){a=b[0];d.highlightPoint(a)})}else d.log("LGMap_1: Need geometry service to convert position from wkid "+a.spatialReference.wkid+" to map's "+d.mapInfo.map.spatialReference.wkid)});
d.showFeatureHandle=g.subscribe("showFeature",function(a){d.tempGraphicsLayer.clear();d.highlightFeature(a)});d.ready.resolve(d)},function(){d.ready.reject(d)})},mapInfo:function(){return this.mapInfo},highlightPoint:function(a){this.mapInfo.map.centerAt(a);this.tempGraphicsLayer.add(new esri.Graphic(a,new esri.symbol.PictureMarkerSymbol("images/youAreHere.png",30,30),null,null))},highlightFeature:function(a){var b;(b=a.geometry.getExtent())?(this.mapInfo.map.setExtent(b.expand(4)),b="polyline"===
a.geometry.type?new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,this.lineHiliteColor,3):new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,this.lineHiliteColor,3),this.fillHiliteColor),this.tempGraphicsLayer.add(new esri.Graphic(a.geometry,b,a.attributes,null))):this.highlightPoint(a.geometry)},getExtentsString:function(){var a;a="";this.mapInfo&&this.mapInfo.map&&(a=this.mapInfo.map.extent,
a=a.xmin.toFixed().toString()+","+a.ymin.toFixed().toString()+","+a.xmax.toFixed().toString()+","+a.ymax.toFixed().toString()+","+a.spatialReference.wkid.toString());return a},getLayer:function(a){var b;l.some(this.mapInfo.itemInfo.itemData.operationalLayers,function(c){return c.title===a?(b=c.layerObject,!0):!1});return b},getLayerNameList:function(){var a=[];l.forEach(this.mapInfo.itemInfo.itemData.operationalLayers,function(b){a.push(b.title)});return a},createGraphicsLayer:function(a){var b=new esri.layers.GraphicsLayer;
b.id=a;return this.mapInfo.map.addLayer(b)}});dojo.declare("js.LGTitleBar",js.LGGraphic,{constructor:function(){var a;this.iconUrl&&0<this.iconUrl.length&&(a={src:this.iconUrl},this.iconClass&&(a.className=this.iconClass),k.create("img",a,this.rootDiv));this.title&&0<this.title.length&&(a={innerHTML:this.title},this.titleClass&&(a.className=this.titleClass),k.create("span",a,this.rootDiv),document.title=this.title);this.handleWindowResize()}});dojo.declare("js.LGCallMethods",js.LGObject,{constructor:function(){var a,
b=this;this.todo&&l.forEach(this.todo,function(c){try{if(a=dojo.byId(c.rootId))if(a=a.getLGObject())a[c.method](c.arg)}catch(d){b.log("LGCallMethods_1: "+d.toString())}})}})});
