import { TimerState } from "@app/shared/model/timer-state.model";
import { TimerService } from "../timer.service";

export type NextState = {
    state: TimerState,
    stateDuration: number,
}

export interface TimerStrategy {
    focusPeriod(): number;
    breakPeriod(): number;

    onStartTimer(timerService: TimerService): NextState;
    onPeriodEnd(timerService: TimerService): NextState;
    onRequestBreak(timerService: TimerService): NextState;
    onRequestInterruption(timerService: TimerService): NextState;
    onResumeTimer(timerService: TimerService): NextState;
    onStopTimer(timerService: TimerService): NextState;
}