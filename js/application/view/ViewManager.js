/*
 | Copyright 2016 Esri
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
define([
  "application/view/widgetslayout",
  "application/widgets/WidgetsExt",
  "application/base/message",

  "boilerplate/ItemHelper",

  "esri/views/ui/Component",

  "esri/widgets/Zoom",
  "esri/widgets/Home",
  "esri/widgets/NavigationToggle",
  "esri/widgets/Locate", 
  "esri/widgets/Track", 
  "esri/widgets/Compass",
  "esri/widgets/Search",
  "esri/widgets/Legend",
  "esri/widgets/LayerList",
  "esri/widgets/BasemapToggle",
  "esri/widgets/Attribution",

  "esri/layers/UnsupportedLayer",
  "esri/layers/UnknownLayer",

  "esri/geometry/Point",
  "esri/Viewpoint",
  "esri/Camera",
  "esri/geometry/support/webMercatorUtils",
  "esri/tasks/GeometryService",
  "esri/tasks/support/ProjectParameters",
  "esri/geometry/SpatialReference",

  "esri/core/watchUtils",

  "dojo/dom",
  "dojo/dom-attr",
  "dojo/dom-class",
  "dojo/query",
  "dojo/dom-construct",
  "dojo/Deferred",
  "dojo/_base/lang",
  "dojo/promise/all",

  "dojo/_base/declare",
], function (
  WIDGETS_LAYOUT, WidgetsExt, Message,
  ItemHelper,
  Component,
  Zoom, Home, NavigationToggle, Locate, Track, Compass, Search, Legend, LayerList, BasemapToggle, Attribution,
  UnsupportedLayer, UnknownLayer,
  Point, Viewpoint, Camera, webMercatorUtils, GeometryService, ProjectParameters, SpatialReference,
  watchUtils,
  dom, domAttr, domClass, query, domConstruct, Deferred, lang, all,
  declare
) {

  return declare(null, {

    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------

    constructor: function (boilerplate) {

      this._boilerplate = boilerplate;

      var widgetsLayoutName = boilerplate.config.widgetslayout;

      this.widgetsLayout = this._getWidgetsLayout(widgetsLayoutName);

      this._showErrors = boilerplate.config.showerrors;

      this._geometryService = new GeometryService("https://utility.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");

    },

    //--------------------------------------------------------------------------
    //
    //  Variables
    //
    //--------------------------------------------------------------------------

    _boilerplate: null,

    _webItem: null,

    _defaultViewOptions: {
      padding: {top: 15, bottom: 30},
      ui: {
        components: ["attribution"],
        padding: {top: 15, left: 15, right: 15, bottom: 15}
      }
    },

    _defaultWidgetsLayoutName: "top-left",

    _defaultWidgetPosition: "top-left",

    _defaultPopupDockPosition: "top-right",

    _widgetsExt: null,

    _errorMessage: {
      webMapOrSceneUnknownItemType: "Web Map or Web Scene could not be created. Unknown item type.",
      webMapOrSceneLoadFailureLong: "could not be fully loaded. Stay tuned as <a target='_blank' href='https://developers.arcgis.com/javascript/latest/guide/migrating/index.html#webmap'>full support</a> for webmaps with the <a target='_blank' href='https://developers.arcgis.com/javascript/'>ArcGIS API for Javascript 4</a> is coming soon!",
      webMapOrSceneNotFullyLoaded: "could not be fully loaded.",
      layerLoadFailure: "A layer could not be loaded"
    },

    _showErrors: false,

    //--------------------------------------------------------------------------
    //
    //  Public Members
    //
    //--------------------------------------------------------------------------

    view: null,

    widgetsLayout: null,

    searchWidget: null,

    legendWidget: null,

    layerListWidget: null,

    // View

    createViewFromItem: function(webItem, viewOptions) {
      var deferred = new Deferred();
      viewOptions = viewOptions || {};
      this._webItem = webItem;

      // Promise return values
      var results = {
        view: null,
        webMap: null,
        webScene: null
      }
      var itemHelper = new ItemHelper();

      function loadAll(webMapOrWebScene, options, ref) {
        // Load view
        ref._loadView(webMapOrWebScene, options)
          .then(function(view){
            ref.view = view;
            results.view = view;
            // Load map
            ref._loadMap(webMapOrWebScene)
              .then(function(map){
                // Option to override basemap
                ref._setBasemap(map);
                // Set view map
                view.map = map;
                deferred.resolve(results);
              })
              .otherwise(function(err){
                deferred.reject(err);
              });
          })
          .otherwise(function(err){
            deferred.reject(err);
          });
      }

      // Load map or scene view
      if (webItem.data.type === "Web Map") {
        itemHelper.createWebMap(webItem)
          .then(function(webMap) {
            results.webMap = webMap;
            loadAll(webMap, viewOptions, this);
          }.bind(this))
          .otherwise(function(error) {
            deferred.reject(error);
          }.bind(this));
      } else if (webItem.data.type === "Web Scene") {
        itemHelper.createWebScene(webItem)
          .then(function(webScene) {
            results.webScene = webScene;
            loadAll(webScene, viewOptions, this);
          }.bind(this))
          .otherwise(function(error) {
            deferred.reject(error);
          }.bind(this));
      } else {
        deferred.reject(new Error(this._errorMessage.webMapOrSceneUnknownItemType));
      }
      return deferred.promise;
    },

    // Create the map/scene view
    
    _loadView: function(webMapOrWebScene, options) {
      var deferredView = new Deferred();
      // View options
      options = options || { ui:{} };
      var defaultOptions = this._defaultViewOptions;
      var allOptions = lang.mixin({}, defaultOptions, options);
      allOptions.ui = lang.mixin({}, defaultOptions.ui, allOptions.ui);
      // Create view
      var module = webMapOrWebScene.portalItem.type === "Web Map" ? "esri/views/MapView" : "esri/views/SceneView";
      require([module], function(View){
        var view = new View(allOptions);
        deferredView.resolve(view);
      });
      return deferredView.promise;
    },

    // Load map

    _loadMap:function (webMapOrWebScene) {
      var deferredMap = new Deferred();
      // Work-around for MapView zoom property bug
      // Load the webmap
      webMapOrWebScene.load()
        .then(function(webmapscene){
          this._reportLayerLoadErrors(webmapscene.allLayers);
          // Load the map or scene
          webmapscene.load()  
            .then(function(map){
              deferredMap.resolve(map); // Done!
            }.bind(this)) // map
              .otherwise(function(error){
                error.userMsg = "Basemap could not be loaded";
                deferredMap.reject(error);
              });
          }.bind(this)) // webmap/webscene
          .otherwise(function(error){
            var userMsg = webMapOrWebScene.portalItem.type + " " + this._errorMessage.webMapOrSceneNotFullyLoaded;
            error.userMsg = "Basemap could not be loaded";
            deferredMap.reject(error);
          });
      return deferredMap;
    },
    
    // Widgets for the app

    createAppWidgets: function() {
      var view = this.view;
      if (view) {
        var settings = this._boilerplate.settings;
        this.searchWidget = this._createSearchWidget(settings.widgetSearch.containerId, {view: view});
        this.legendWidget = this._createLegendWidget(settings.widgetLegend.containerId, {view: view});
        this.layerListWidget = this._createlayerListWidget(settings.widgetLayers.containerId, {view: view});
      }
    },

    // Widgets for the map/scene view

    createMapWidgets: function() {
      var view = this.view;
      if (view) {
        var config = this._boilerplate.config;
        var options = {
          visible: true
        }
        // Add widgets
        if (config.widgetzoom) {
          this._addWidget("zoom", config.widgetzoom, options);
        }
        if (config.widgethome) {
          this._addWidget("home", config.widgethome, options);
        }
        if (config.widgetnavtoggle && view.type !== "2d") {
          this._addWidget("navtoggle", config.widgetnavtoggle, options);
        }
        if (config.widgetcompass) {
          this._addWidget("compass", config.widgetcompass, options);
        }
        if (config.widgetlocate) {
          this._addWidget("locate", config.widgetlocate, options);
        }
        if (config.widgettrack) {
          this._addWidget("track", config.widgettrack, options);          
        }
        if (config.widgetsearch) {
          this._addWidget("search", config.widgetsearch, options);
        }        
        if (config.widgetbasemaptoggle) {
          options.nextBasemap = config.widgetnextbasemap; // TODO
          this._addWidget("basemaptoggle", config.widgetbasemaptoggle, options);
        }
      }
    },

    setPopupPosition: function(position) {
      var view = this.view;
      if (view) {
        view.then(function() {
          var position = position || this._boilerplate.config.dockposition || this._defaultPopupDockPosition;
          if (position.match(/^(top-left|top-center|top-right|bottom-left|bottom-center|bottom-right)$/)) {
            view.popup.dockOptions = {
              position: position
            }
          } else if (position.match(/^(none)$/)) {
            view.popup.dockEnabled = false;
            view.popup.dockOptions = {
              buttonEnabled: false
            }
          } else {
            view.popup.dockOptions = {
              position: this._defaultPopupDockPosition
            }
          }                   
        }.bind(this));
      }
    },

    setWidgetExtensions: function(widgetOptions) {
      var view = this.view;
      var search = this.searchWidget;
      if (view && search) {
        // Widget extensions
        var widgetsExt = new WidgetsExt(view, search);
        widgetsExt.setExtensions(widgetOptions);
        this._widgetsExt = widgetsExt;
      }
    },

    _getNumber: function (n, min, max, rnd, def) {
      var n = parseFloat(n);
      if (!isNaN(n) && isFinite(n)) {
        if (n >= min && n <=max) {
          n = Math.round(n * rnd) / rnd; 
        } else {
          n = def;
        }
        return n;
      } else {
        return null;
      }
    },

    setViewpoint: function() {
      var view = this.view;
      if (view) {
        var is2d = view.type === "2d";
        // Params
        var lat = this._getNumber(this._boilerplate.config.lat, -90, 90, 100000, null);
        var lon = this._getNumber(this._boilerplate.config.lon, -180, 180, 100000, null);
        var x = this._getNumber(this._boilerplate.config.x, -100000000, 10000000, 1000, null);
        var y = this._getNumber(this._boilerplate.config.y, -100000000, 10000000, 1000, null);
        var zoom = this._getNumber(this._boilerplate.config.zoom, 0, 18, 1, null);
        var scale = this._getNumber(this._boilerplate.config.scale, 250, 500000000, 1, null);
        var tilt = this._getNumber(this._boilerplate.config.tilt, 0, 90, 1, null);
        var altitude = this._getNumber(this._boilerplate.config.altitude, 0, 1000000000, 1, null);
        var rotation = this._getNumber(this._boilerplate.config.rotation, 0, 360, 1, null);
        var heading = this._getNumber(this._boilerplate.config.heading, 0, 360, 1, null);
        var wkid = this._getNumber(this._boilerplate.config.wkid, 0, 1000000, 1, null);
        // Project point if necessary
        var geometryService = this._geometryService;
       
        // No location params provided
        if (((!zoom && !scale && !tilt && !altitude && !rotation && !heading)) && ((!lat && !lon) || (!x && !y && !wkid))) {
          return;
        }

        // Re-center and zoom if there are valid params
        view
          .then(function() {
            getCenter(lat, lon, x, y, view, geometryService)
              .then(zoomMap)
              .then(setHomeWidget, function(error){
                console.log(error);
              }.bind(this));
          }.bind(this))
          .otherwise(function(err){
            console.log(err);
          });

        function getCenter(lat, lon, x, y, view, geometryService) {
          var deferred = new Deferred();
          // Create point from params
          var pt = new Point();
          // Geographic
          if (lat && lon) {  
            pt.latitude = lat;
            pt.longitude = lon;
            pt.spatialReference = SpatialReference.WGS84;
          } else if (x && y && wkid) {  // Web Mercator
            pt.x = x;
            pt.y = y;
            pt.spatialReference = new SpatialReference({
              wkid: wkid
            });
          } else {  // Coord params missing, use center
            pt = view.center.clone();
          }
          // Project point if necessary
          if (!pt.spatialReference.equals(view.spatialReference.wkid)) {
            // Geographic or WebMercator
            if (webMercatorUtils.canProject(pt, view.spatialReference)) {
              pt = webMercatorUtils.project(pt, view.spatialReference);
              deferred.resolve(pt);
            } else { // Project
              var params = new ProjectParameters({
                geometries: [pt],
                outSR: view.spatialReference
              });
              geometryService.project(params)
                .then(function(result){
                  var ptProj = result && result[0];
                  deferred.resolve(ptProj);
                }.bind(this))
                .otherwise(function(err){
                  pt = view.center.clone();
                  deferred.resolve(pt);
                }.bind(this));
            }
          } else {
            deferred.resolve(pt);
          }
          return deferred;
        }

        function zoomMap(pt) {
          var params = {};
          // Center
          params.center = pt;
          // Altitude
          if (altitude) {
            pt.z = altitude;
          }
          // Scale (prevails)
          if (scale) {
            params.scale = scale;
          } else if (zoom) { // Zoom
            params.zoom = zoom;
          }
          // Rotation
          if (is2d && rotation) {
            params.rotation = rotation;
          }
          // Heading
          if (!is2d && heading) {
            params.heading = heading;
          }
          // Set viewpoint and params, tilt secondarily to maintain center point
          return view.goTo(params)
            .then(function(){
              if (!is2d && tilt) {
                return view.goTo({
                  center: pt,
                  tilt: tilt
                }, {duration: 500}); 
              }
            }.bind(this));
        }
      
        function setHomeWidget() {
          var home = view.ui.find("home").widget;
          if (home) {
            home.viewpoint = view.viewpoint.clone();
          }   
        }

      }
    },

    _getBasemap: function() {
      var validBasemap;
      var basemap = this._boilerplate.config.basemap;
      if (basemap) {
        if (basemap.match(/^(streets|satellite|hybrid|terrain|topo|gray|dark-gray|oceans|national-geographic|osm|dark-gray-vector|gray-vector|streets-vector|topo-vector|streets-night-vector|streets-relief-vector|streets-navigation-vector)$/)) {
          validBasemap = basemap;
        }
      }
      return validBasemap;
    },

    _setBasemap: function(map) {
      var basemap = this._boilerplate.config.basemap;
      if (map && basemap) {
        if (basemap.match(/^(streets|satellite|hybrid|terrain|topo|gray|dark-gray|oceans|national-geographic|osm|dark-gray-vector|gray-vector|streets-vector|topo-vector|streets-night-vector|streets-relief-vector|streets-navigation-vector)$/)) {
          map.basemap = basemap;          
        }
      }
    },

    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------

    _addWidget: function(name, position, options) {
      if (this.view) {
        if (position && position !== "hide") { // TODO
          var widget = this._createWidget(name, options);
          if (widget) {
            var component = this._createComponent(name, widget);
            // Can provide custom position
            if (position === "show") {
              position = this._getDefaultWidgetPosition(name); 
            } else {
              position = this._returnValidPosition(position);
            }
            this.view.ui.add(component, position);
          }
        }
      }
    },

    _createComponent: function(name, widget) {
      var component = new Component({
          node: widget, 
          id: name
        });
      return component;
    },

    _createWidget: function(name, options) {
      var view = this.view;
      var widget = null;
      var viewModel = {
          view: view
        };
      var allOptions = lang.mixin(viewModel, options);
      switch (name) {
        case "zoom":
          widget = new Zoom(allOptions);
          break;
        case "home":
          widget = new Home(allOptions);
          break;
        case "navtoggle":
          widget = new NavigationToggle(allOptions);
          break;
        case "compass":
          widget = new Compass(allOptions);
          break;
        case "locate":
          widget = new Locate(allOptions);
          break;
        case "track":
          widget = new Track(allOptions);
          break;
        case "basemaptoggle":
          widget = new BasemapToggle({
            viewModel: viewModel,
            nextBasemap: options.nextBasemap
          });
          break;
        case "search":
          widget = new Search(allOptions);
          break;
        default:
          widget = null;
      }

      return widget;
    },

    _returnValidPosition: function(position) {
      if (position === WIDGETS_LAYOUT.POSITION.topLeft || 
        position === WIDGETS_LAYOUT.POSITION.topRight || 
        position === WIDGETS_LAYOUT.POSITION.bottomLeft || 
        position === WIDGETS_LAYOUT.POSITION.bottomRight) {
        return position;
      } else {
        return this._defaultWidgetPosition;
      }
    },

    _getWidgetsLayout: function(widgetsLayoutName) {
      var widgetsLayout;
      widgetsLayoutName = widgetsLayoutName || this._defaultWidgetsLayoutName;
      widgetsLayoutName = widgetsLayoutName.toLowerCase();
      switch (widgetsLayoutName) {
        case "top-left":
          widgetsLayout = WIDGETS_LAYOUT.topLeft;
          break;
        case "top-right":
          widgetsLayout = WIDGETS_LAYOUT.topRight;
          break;
        case "bottom-left":
          widgetsLayout = WIDGETS_LAYOUT.bottomLeft;
          break;
        case "bottom-right":
          widgetsLayout = WIDGETS_LAYOUT.bottomRight;
          break;
        default:
          widgetsLayout = WIDGETS_LAYOUT.topLeft; // Default
      }
      return widgetsLayout;
    },

    _getDefaultWidgetPosition: function(name) {
      var position;
      var widgetsLayout = this.widgetsLayout;
      if (name && widgetsLayout) {
        if (widgetsLayout.hasOwnProperty(name)) {
          position = widgetsLayout[name];
        } else {
          position = this._defaultWidgetPosition; // Default
        }
      }
      return position;
    },

    _createSearchWidget: function(id, searchOptions) {
      var search;
      if (id) {
        var options =   {
          highlightEnabled: false,
          popupEnabled: true,
          showPopupOnSelect: true
        }
        lang.mixin(options, searchOptions);
        search = new Search(options, id);
        search.startup();
      }
      return search;
    },

    _createLegendWidget: function(id, legendOptions) {
      var legend;
      if (id) {
        var options = {};
        lang.mixin(options, legendOptions);
        legend = new Legend(options, id);
      }
      return legend;
    },

    _createlayerListWidget: function(id, layerListOptions) {
      var layerList;
      layerListOptions = layerListOptions || {};
      if (id) {
        //var options = {};
        //lang.mixin(options, legendOptions);
        layerList = new LayerList(layerListOptions, id);
      }
      return layerList;
    },

    // Webmap/webscene layer check

    _reportLayerLoadErrors: function(allLayers) {
      var webItemType = this._webItem.data.type;
      allLayers.forEach(function(layer) {
        if (layer instanceof UnsupportedLayer) {
          Message.show(Message.type.snap, new Error(this._errorMessage.layerLoadFailure + ". " + layer.title + " is unsupported."), true, this._showErrors);
        } else if (layer instanceof UnknownLayer) {
          Message.show(Message.type.snap, new Error(this._errorMessage.layerLoadFailure + ". " + " is an unknown type."), true, this._showErrors);
        } else {
          layer.load().otherwise(function(error){
            error.userMsg = this._errorMessage.layerLoadFailure + ". " + layer.title;
            Message.show(Message.type.snap, error, true, this._showErrors);
          }.bind(this));
        }
      }.bind(this));   
    }

  })
});
