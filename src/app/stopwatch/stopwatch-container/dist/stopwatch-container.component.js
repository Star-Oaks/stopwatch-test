"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StopwatchContainerComponent = void 0;
var core_1 = require("@angular/core");
var StopwatchContainerComponent = /** @class */ (function () {
    function StopwatchContainerComponent(_storageService) {
        var _this = this;
        this._storageService = _storageService;
        this.dateItem = {
            clock: '',
            minutes: '',
            seconds: '',
            milliseconds: '',
            laps: [],
            counter: 0,
            running: false,
            startText: 'Start'
        };
        this.showTimerControls = true;
        this._storageService.changes.subscribe(function () {
            _this.dateSubscribe = JSON.parse(_this._storageService.getStorage());
            if (_this.dateSubscribe.running) {
                _this.distansStart(_this.dateSubscribe);
            }
            else {
                _this.distansStart(_this.dateSubscribe);
            }
        });
    }
    StopwatchContainerComponent.prototype.ngOnInit = function () { };
    StopwatchContainerComponent.prototype.ngOnChanges = function (changes) {
        if (changes['start'].currentValue) {
            this.startTimer();
        }
        else {
            this.clearTimer();
        }
    };
    StopwatchContainerComponent.prototype.distansStart = function (dataTime) {
        this.dateItem.clock = dataTime.clock;
        this.dateItem.minutes = dataTime.minutes;
        this.dateItem.seconds = dataTime.seconds;
        this.dateItem.milliseconds = dataTime.milliseconds;
        this.dateItem.laps = dataTime.laps;
        this.dateItem.counter = dataTime.counter;
        this.dateItem.running = dataTime.running;
        this.dateItem.startText = dataTime.startText;
        if (!this.dateItem.running) {
            clearInterval(this.timerRef);
        }
    };
    StopwatchContainerComponent.prototype.startTimer = function () {
        var _this = this;
        if (this.dateSubscribe) {
            this.dateItem.running = !this.dateSubscribe.running;
        }
        else {
            this.dateItem.running = !this.dateItem.running;
        }
        if (this.dateItem.running) {
            this.dateItem.startText = 'Stop';
            var startTime_1 = Date.now() - (this.dateItem.counter || 0);
            this.timerRef = setInterval(function () {
                _this.dateItem.counter = Date.now() - startTime_1;
                _this.dateItem.milliseconds = Math.floor(Math.floor(_this.dateItem.counter % 1000) / 10).toFixed(0);
                _this.dateItem.minutes = Math.floor(_this.dateItem.counter / 60000).toString();
                _this.dateItem.seconds = Math.floor(Math.floor(_this.dateItem.counter % 60000) / 1000).toFixed(0);
                if (Number(_this.dateItem.minutes) < 10) {
                    _this.dateItem.minutes = '0' + _this.dateItem.minutes;
                }
                else {
                    _this.dateItem.minutes = '' + _this.dateItem.minutes;
                }
                if (Number(_this.dateItem.milliseconds) < 10) {
                    _this.dateItem.milliseconds = '0' + _this.dateItem.milliseconds;
                }
                else {
                    _this.dateItem.milliseconds = '' + _this.dateItem.milliseconds;
                }
                if (Number(_this.dateItem.seconds) < 10) {
                    _this.dateItem.seconds = '0' + _this.dateItem.seconds;
                }
                else {
                    _this.dateItem.seconds = '' + _this.dateItem.seconds;
                }
                _this._storageService.store('time', JSON.stringify(_this.dateItem));
            });
        }
        else {
            this.dateItem.startText = 'Resume';
            this._storageService.store('time', JSON.stringify(this.dateItem));
            clearInterval(this.timerRef);
        }
    };
    StopwatchContainerComponent.prototype.lapTimeSplit = function () {
        var lapTime = this.dateItem.minutes +
            ':' +
            this.dateItem.seconds +
            ':' +
            this.dateItem.milliseconds;
        this.dateItem.laps.push(lapTime);
        this._storageService.store('time', JSON.stringify(this.dateItem));
    };
    StopwatchContainerComponent.prototype.clearTimer = function () {
        this.dateItem.running = false;
        this.dateItem.startText = 'Start';
        this.dateItem.counter = 0;
        (this.dateItem.milliseconds = ''),
            (this.dateItem.seconds = ''),
            (this.dateItem.minutes = '');
        this.dateItem.laps = [];
        clearInterval(this.timerRef);
        this._storageService.store('time', JSON.stringify(this.dateItem));
    };
    StopwatchContainerComponent.prototype.ngOnDestroy = function () {
        clearInterval(this.timerRef);
    };
    StopwatchContainerComponent = __decorate([
        core_1.Component({
            selector: 'app-stopwatch-container',
            templateUrl: './stopwatch-container.component.html',
            styleUrls: ['./stopwatch-container.component.scss']
        })
    ], StopwatchContainerComponent);
    return StopwatchContainerComponent;
}());
exports.StopwatchContainerComponent = StopwatchContainerComponent;
