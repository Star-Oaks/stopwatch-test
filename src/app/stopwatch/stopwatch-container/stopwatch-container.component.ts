import { Component, OnInit, SimpleChanges } from '@angular/core';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-stopwatch-container',
  templateUrl: './stopwatch-container.component.html',
  styleUrls: ['./stopwatch-container.component.scss'],
})
export class StopwatchContainerComponent implements OnInit {
  dateItem = {
    clock: '',
    minutes: '',
    seconds: '',
    milliseconds: '',
    laps: [],
    counter: 0,
    running: false,
    startText: 'Start',
  };
  timerRef;
  private dateSubscribe: any;

  start: boolean;
  showTimerControls: boolean = true;

  constructor(private _storageService: StorageService) {
    this._storageService.changes.subscribe(() => {
      this.dateSubscribe = JSON.parse(this._storageService.getStorage());
      if (this.dateSubscribe.running) {
        this.distansStart(this.dateSubscribe);
      } else {
        this.distansStart(this.dateSubscribe);
      }
    });
  }
  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges) {
    if (changes['start'].currentValue) {
      this.startTimer();
    } else {
      this.clearTimer();
    }
  }
  distansStart(dataTime) {
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
  }

  startTimer() {
    if (this.dateSubscribe) {
      this.dateItem.running = !this.dateSubscribe.running;
    } else {
      this.dateItem.running = !this.dateItem.running;
    }
    if (this.dateItem.running) {
      this.dateItem.startText = 'Stop';
      const startTime = Date.now() - (this.dateItem.counter || 0);
      this.timerRef = setInterval(() => {
        this.dateItem.counter = Date.now() - startTime;
        this.dateItem.milliseconds = Math.floor(
          Math.floor(this.dateItem.counter % 1000) / 10
        ).toFixed(0);
        this.dateItem.minutes = Math.floor(
          this.dateItem.counter / 60000
        ).toString();
        this.dateItem.seconds = Math.floor(
          Math.floor(this.dateItem.counter % 60000) / 1000
        ).toFixed(0);
        if (Number(this.dateItem.minutes) < 10) {
          this.dateItem.minutes = '0' + this.dateItem.minutes;
        } else {
          this.dateItem.minutes = '' + this.dateItem.minutes;
        }
        if (Number(this.dateItem.milliseconds) < 10) {
          this.dateItem.milliseconds = '0' + this.dateItem.milliseconds;
        } else {
          this.dateItem.milliseconds = '' + this.dateItem.milliseconds;
        }
        if (Number(this.dateItem.seconds) < 10) {
          this.dateItem.seconds = '0' + this.dateItem.seconds;
        } else {
          this.dateItem.seconds = '' + this.dateItem.seconds;
        }

        this._storageService.store('time', JSON.stringify(this.dateItem));
      });
    } else {
      this.dateItem.startText = 'Resume';
      this._storageService.store('time', JSON.stringify(this.dateItem));
      clearInterval(this.timerRef);
    }
  }
  lapTimeSplit() {
    let lapTime =
      this.dateItem.minutes +
      ':' +
      this.dateItem.seconds +
      ':' +
      this.dateItem.milliseconds;
    this.dateItem.laps.push(lapTime);
    this._storageService.store('time', JSON.stringify(this.dateItem));
  }

  clearTimer() {
    this.dateItem.running = false;
    this.dateItem.startText = 'Start';
    this.dateItem.counter = 0;
    (this.dateItem.milliseconds = ''),
      (this.dateItem.seconds = ''),
      (this.dateItem.minutes = '');
    this.dateItem.laps = [];
    clearInterval(this.timerRef);
    this._storageService.store('time', JSON.stringify(this.dateItem));
  }

  ngOnDestroy() {
    clearInterval(this.timerRef);
  }
}
