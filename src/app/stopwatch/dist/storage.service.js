"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StorageService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var StorageService = /** @class */ (function () {
    function StorageService() {
        this.onSubject = new rxjs_1.Subject();
        this.changes = this.onSubject.asObservable().pipe(operators_1.share());
        this.start();
    }
    StorageService.prototype.ngOnDestroy = function () {
        this.stop();
    };
    StorageService.prototype.getStorage = function () {
        return JSON.parse(localStorage.getItem('time'));
    };
    StorageService.prototype.store = function (key, data) {
        localStorage.setItem(key, JSON.stringify(data));
        this.onSubject.next({ key: key, value: data });
    };
    StorageService.prototype.clear = function (key) {
        localStorage.removeItem(key);
        this.onSubject.next({ key: key, value: null });
    };
    StorageService.prototype.start = function () {
        window.addEventListener('storage', this.storageEventListener.bind(this));
    };
    StorageService.prototype.storageEventListener = function (event) {
        if (event.storageArea == localStorage) {
            var v = void 0;
            try {
                v = JSON.parse(event.newValue);
            }
            catch (e) {
                v = event.newValue;
            }
            this.onSubject.next({ key: event.key, value: v });
        }
    };
    StorageService.prototype.stop = function () {
        window.removeEventListener('storage', this.storageEventListener.bind(this));
        this.onSubject.complete();
    };
    StorageService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], StorageService);
    return StorageService;
}());
exports.StorageService = StorageService;
