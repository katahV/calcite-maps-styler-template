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
  "application/widgets/FindPlaces",
  "application/widgets/ShareMapCoords",

  "dojo/query",
  "dojo/_base/declare"
], function (
  FindPlaces, MapCoords,
  query, declare
) {

  return declare(null, {

    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------

    constructor: function (view, searchWidget) {
      this._view = view;
      this._searchWidget = searchWidget;
    },

  	setExtensions: function(options) {
      if (options.home) {
        this._setHomeEvents();        
      }
      if (options.compass) {
        this._setCompassEvents();      
      }
      if (options.navToggle) {
        this._setNavToggleEvents();      
      }
      if (options.findPlaces) {
        this._setFindPlacesEvents();
      }
      if (options.mapCoords) {
        this._setMapCoords(options.mapCoordsShare);
      }
      if (options.popup) {
        this._setPopupCollapseEvents();        
      }
    },

    _setCompassEvents: function() {
      var view = this._view;
      if (view) {
        view.then(function() {
          var compass = view.ui.find("compass");
          if (compass) { 
            
            function setCompassVisible() {
              if (view.viewpoint) {
                var rotation = Math.round(view.viewpoint.rotation);
                var visible = (rotation !== 0 && rotation !== 360);
                if (visible !== compass.widget.visible) {
                    compass.widget.visible = visible; // TODO - fade in/out
                }                  
              }
            }
            
            if (view.type === "2d") {
              view.watch("rotation", function(rotation) { //
                setCompassVisible();
              });
            } else {
              view.watch("scale", function() {
                  setCompassVisible();
              });
              view.watch("stationary", function(stationary) {
                if (stationary) {
                  setCompassVisible();
                }
              });
            }
          }
        });
      }
    },

    _setHomeEvents: function(home) {
      var view = this._view;
      if (view) {
        view.then(function() {
          var home = view.ui.find("home");
          if (home) {
            var homeWidget = home.widget;

            homeWidget._state = {
              ready: false,
              clicked:false
            }
            
            function setHomeVisible(visible) {
              if (homeWidget._state.ready) {
                if (homeWidget._state.clicked) {
                  homeWidget.visible = false;
                  homeWidget._state.clicked = false;
                } else {
                  if (homeWidget.visible !== visible) {
                    homeWidget.visible = visible; // TODO - fade in/out
                  }
                }
              }
            }
            
            homeWidget.viewModel.watch("state", function(result) {
              if (result === "going-home") {
                homeWidget._state.clicked = true;            
              }
            });

            function doneLoading(evt) {
              //console.log(evt + ": ready: " + view.ready + " | working: " + view.layerViewManager.factory.working + " | stationary: " + view.stationary + " | updating: " + view.updating);
              if (!view.layerViewManager.factory.working && view.stationary && !view.updating || view.interacting) {
                if (!homeWidget._state.ready) {
                  homeWidget._state.ready = true;
                  setHomeVisible(false);
                } else {
                  setHomeVisible(true);
                }
              }
            }
            
            view.layerViewManager.factory.watch("working", function(newVal, oldVal) {
              doneLoading("LayerViewManager");
            });
            view.watch("stationary", function(newVal, oldVal) {
              doneLoading("Stationary");
            });
            view.watch("updating", function(newVal, oldVal) {
              doneLoading("Updating");
            });
            view.watch("interacting", function(newVal, oldVal) {
              doneLoading("interacting");
            });
          }
        });
      }
    },

    _setNavToggleEvents: function() {
      var view = this._view;
      if (view) {
        view.then(function() {
          var navtoggle = view.ui.find("navtoggle");
          if (navtoggle) {
            query(".esri-navigation-toggle__button--rotate").addClass("hidden");
            query(".esri-navigation-toggle__button--pan, .esri-navigation-toggle__button--rotate").on("click", function(e) {
              query(".esri-navigation-toggle__button--pan, .esri-navigation-toggle__button--rotate").toggleClass("hidden");
            });
          } 
        });
      }
    },

    // Find places on click-hold

    _setFindPlacesEvents: function() {
      var view = this._view;
      var searchWidget = this._searchWidget;
      if (view && searchWidget) {
        new FindPlaces(view, searchWidget);
      }
    },

    _setMapCoords: function(share) {
      var view = this._view;
      if (view) {
        new MapCoords(view, share);
      }
    },

     // Collapsible popup

    _setPopupCollapseEvents: function() {
      var view = this._view;
      if (view) {
        view.then(function() {
          query(".esri-popup__header-title").on("click", function(e){
            query(".esri-popup__main-container").toggleClass("esri-popup-collapsed");
            view.popup.reposition();
          });                  
        });
      }
    }

  })
});