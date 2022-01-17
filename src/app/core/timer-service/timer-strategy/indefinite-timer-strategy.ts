import { TimerService } from "../timer.service";
import { NextState, TimerStrategy } from "./timer-strategy.interface";

export class IndefiniteTimerStrategy implements TimerStrategy {
    workPeriod(): number {
        throw new Error("Method not implemented.");
    }

    breakPeriod(): number {
        throw new Error("Method not implemented.");
    }

    onStartTimer(timerService: TimerService): NextState {
        throw new Error("Method not implemented.");
    }

    onStateSwitch(timerService: TimerService): NextState {
        throw new Error("Method not implemented.");
    }
}

