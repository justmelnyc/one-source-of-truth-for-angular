"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var store_1 = require('@ngrx/store');
var proximity_selector_component_1 = require('./components/proximity-selector.component');
var search_box_component_1 = require('./components/search-box.component');
var search_reducer_1 = require('./reducers/search.reducer');
var youtube_service_1 = require("./services/youtube.service");
var storeManager = store_1.provideStore({ currentSearch: search_reducer_1.SearchReducer });
var AppComponent = (function () {
    function AppComponent(store, youtube) {
        var _this = this;
        this.store = store;
        this.youtube = youtube;
        this.title = 'One Source of Truth for Angular 2';
        this.searchResults = [];
        this.currentSearch = this.store.select('currentSearch');
        this.youtube.searchResults.subscribe(function (results) { return _this.searchResults = results; });
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentSearch.subscribe(function (state) {
            _this.state = state;
            if (state && state.name && state.name.length > 0) {
                _this.youtube.search(state);
            }
            else {
                _this.searchResults = [];
            }
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            providers: [storeManager],
            directives: [search_box_component_1.SearchBox, proximity_selector_component_1.ProximitySelector],
            template: "\n    <section class=\"col-md-8\">\n        <h1>{{title}}</h1>\n        <div class=\"row col-md-8\">\n            <search-box [store]=\"store\"></search-box>\n            <proximity-selector [store]=\"store\"></proximity-selector>\n        </div>\n        <div class=\"row col-md-8\">\n            <p>\n                Try to type something in the searchbox, play with the location and with radius: the above state will\n                always be consistent and up to date.\n            </p>\n            <p>{{ state | json }}</p>\n        </div>\n        <div class=\"row col-md-8\">\n            <div *ngFor=\"let result of searchResults\" class=\"thumbnail col-sm-6 col-md-4\">\n                <div class=\"caption\">\n                    <h3>{{ result.title }}</h3>\n                </div>\n                <!--<img src=\"{{ result.thumbnailUrl }}\" />-->\n            </div>\n        </div>\n    </section>\n    "
        }), 
        __metadata('design:paramtypes', [store_1.Store, youtube_service_1.YouTubeService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map