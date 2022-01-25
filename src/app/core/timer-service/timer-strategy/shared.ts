import { TimerState } from "@app/shared/model/timer-state.model";
import { TimerService } from "../timer.service";
import { NextState } from "./timer-strategy.interface";

export type DefineGetTimerFunction = ((state: TimerState, secondsLeft?: number) => void);
export type DefineTimeRemainingFunction = ((timeRemaining: number) => void);
export type ExpectStateFunction = (timeRemaining: number, method: (timerService: TimerService) => NextState, currentState: TimerState, nextState: TimerState, stateDuration: number) => void;
export type DefinePeriodSecondsElapsedFunction = (periodSecondsElapsed: number) => void;
export type DefineTotalSessionTimeFunction = (totalSessionTime: number) => void;

export function createDefineGetTimer(timerService: any): DefineGetTimerFunction {
  return (state: TimerState, secondsLeft?: number) => {
    timerService.getTimer = jasmine
      .createSpy()
      .and.returnValue({ state: state, secondsLeft: secondsLeft });
  }
}

export function createDefineTimeRemaining(timerService: any): DefineTimeRemainingFunction{
  return (timeRemaining: number) => {
    timerService.timeRemaining = timeRemaining;
  };
}

export function createExpectState(
  timerService: any,
  strategy: any,
  defineGetTimer: any,
  defineTimeRemaining: any
): ExpectStateFunction {
  return ((
    timeRemaining: number,
    method: (timerService: TimerService) => NextState,
    currentState: TimerState,
    nextState: TimerState,
    stateDuration: number
  ) => {
    defineTimeRemaining(timeRemaining);
    defineGetTimer(currentState, undefined);

    expect(method.bind(strategy)(timerService)).toEqual({
      state: nextState,
      stateDuration: stateDuration,
    });
  });
}

export function createDefinePeriodSecondsElapsed(
  timerService: any
): DefinePeriodSecondsElapsedFunction {
  return (periodSecondsElapsed: number) => {
    timerService.periodSecondsElapsed = periodSecondsElapsed;
  };
}

export function createDefineTotalSessionTime(
  timerService: TimerService
): DefineTotalSessionTimeFunction {
  return (totalSessionTime: number) => {
    timerService.getTotalSessionTime = jasmine
      .createSpy()
      .and.returnValue(totalSessionTime);
  };
}