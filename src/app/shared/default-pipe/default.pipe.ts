import { Pipe, PipeTransform } from '@angular/core';
import { TimerService } from '@app/core/timer-service/timer.service';

@Pipe({
  name: 'default'
})
export class DefaultPipe implements PipeTransform {
  transform<T>(value: T | undefined | null, defaultValue: T): T {
    return value === undefined || value === null ? defaultValue : value;
  }
}
