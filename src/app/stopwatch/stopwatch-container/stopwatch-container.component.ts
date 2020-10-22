import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubscriptionLike } from 'rxjs';
import { DateItem } from '../models/date-item.model';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-stopwatch-container',
  templateUrl: './stopwatch-container.component.html',
  styleUrls: ['./stopwatch-container.component.scss'],
})
export class StopwatchContainerComponent implements OnInit, OnDestroy {
  public dateItem: DateItem = new DateItem();
  private timerRef: number;
  private dateSubscribe: DateItem;
  public start: boolean;
  private subscription: SubscriptionLike;

  constructor(private _storageService: StorageService) {}

  ngOnInit(): void {
    this.subscription = this._storageService.changes.subscribe(() => {
      this.dateSubscribe = this._storageService.getStorage();
      if (this.dateSubscribe.running) {
        this.distansStart(this.dateSubscribe);
      } else {
        this.distansStart(this.dateSubscribe);
      }
    });
  }
  ngOnDestroy(): void {
    clearInterval(this.timerRef);
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  private distansStart(dataTime: DateItem) {
    this.dateItem = dataTime;
    if (!this.dateItem.running) {
      clearInterval(this.timerRef);
    }
  }

  public startTimer(): void {
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

        this._storageService.store('time', this.dateItem);
      });
    } else {
      this.dateItem.startText = 'Resume';
      this._storageService.store('time', this.dateItem);
      clearInterval(this.timerRef);
    }
  }
  public lapTimeSplit(): void {
    let lapTime =
      this.dateItem.minutes +
      ':' +
      this.dateItem.seconds +
      ':' +
      this.dateItem.milliseconds;
    this.dateItem.laps.push(lapTime);
    this._storageService.store('time', this.dateItem);
  }

  public clearTimer(): void {
    clearInterval(this.timerRef);
    this.dateItem = new DateItem();
    this._storageService.store('time', this.dateItem);
  }
}
