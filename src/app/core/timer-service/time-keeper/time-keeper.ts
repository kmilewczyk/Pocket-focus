import { Injectable, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  filter,
  interval,
  Observable,
  Subject,
  Subscription,
} from 'rxjs';

@Injectable({ providedIn: 'root'})
export class TimeKeeper implements OnDestroy {
  intervalSub?: Subscription;

  private timeElapsedBase = 0;
  private timeElapsed = 0;
  private end = new Subject<number>();

  private tick = new Subject<number>();

  ngOnDestroy(): void {
    this.intervalSub?.unsubscribe();
    this.intervalSub = undefined;
  }

  public get tick$() {
    return this.tick.asObservable();
  }

  public get end$() {
    return this.end;
  }

  // In seconds or date
  public start(end: number | Date) {
    this.stop();

    if (end instanceof Date) {
      end = Math.floor((end.getTime() - Date.now()) / 1000);
    }

    if (end <= 0) {
      throw new Error('TimeKeeper received nonpositive value: ' + end);
    }

    this.intervalSub = interval(1000).subscribe((offset) => {
      this.timeElapsed = this.timeElapsedBase + offset + 1;

      this.tick.next(this.timeElapsed);

      if (this.timeElapsed >= end) {
        this.stop();
      }
    });
  }

  // Stops if the timer is running. Doesn't do anything else otherwise.
  public stop() {
    if (this.intervalSub) {
      this.intervalSub.unsubscribe();
      this.intervalSub = undefined;

      this.end.next(this.timeElapsed);

      this.timeElapsedBase = 0;
      this.timeElapsed = 0;
    }
  }

  public forward(seconds: number) {
    if (seconds < 0) {
      throw new Error(
        'Cannot forward time by negative amount. Use rewind() instead.'
      );
    }

    if (this.intervalSub) {
      this.timeElapsedBase += seconds;
    }
  }

  public rewind(seconds: number) {
    if (seconds < 0) {
      throw new Error(
        'Cannot rewind time by negative amount. Use forward() instead.'
      );
    }

    if (this.intervalSub) {
      this.timeElapsedBase = Math.max(0, this.timeElapsedBase - seconds);
    }
  }
}
