export class DateItem {
  clock: string;
  minutes: string;
  seconds: string;
  milliseconds: string;
  laps: Array<string> = [];
  counter: number = 0;
  running: boolean = false;
  startText: string = 'Start';
}
