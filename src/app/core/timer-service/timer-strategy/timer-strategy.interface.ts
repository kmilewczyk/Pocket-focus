import { TimerState } from "@app/shared/model/timer-state.model";
import { TimerService } from "../timer.service";

export type NextState = {
    state: TimerState,
    stateDuration: number,
}

export interface TimerStrategy {
    onStartTimer(timerService: TimerService): NextState;
    // onRequestBreak();
    // onRequestInterruption
    onStateSwitch(timerService: TimerService): NextState;
    focusPeriod(): number;
    breakPeriod(): number;
}