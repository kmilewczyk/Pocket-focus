import { TimerState } from "@app/shared/model/timer-state.model";
import { TimerService } from "../timer.service";
import { HourTimerStrategy } from "./hour-timer-strategy";
import { createDefineGetTimer, createDefineTimeRemaining, createExpectState, DefineGetTimerFunction, DefineTimeRemainingFunction, ExpectStateFunction } from "./shared";
import { NextState } from "./timer-strategy.interface";

describe('HourTimerStrategy', () => {
  let strategy: HourTimerStrategy = new HourTimerStrategy();
  let timerService: any;

  let defineGetTimer: DefineGetTimerFunction;
  let defineTimeRemaining: DefineTimeRemainingFunction;

  let expectState: ExpectStateFunction;

  beforeEach(async () => {
    timerService = jasmine.createSpyObj('TimerService', ['getTimer']);
    strategy = new HourTimerStrategy();

    defineGetTimer = createDefineGetTimer(timerService);
    defineTimeRemaining = createDefineTimeRemaining(timerService);
    expectState = createExpectState(
      timerService,
      strategy,
      defineGetTimer,
      defineTimeRemaining
    );
  });

  it('should have focusPeriod equal to 50 minutes', () => {
    expect(strategy.focusPeriod()).toEqual(50 * 60);
  });

  it('should have breakPeriod equal to 10 minutes', () => {
    expect(strategy.breakPeriod()).toEqual(10 * 60);
  });

  it('should start work with a focus period equal to 50 minutes', () => {
    defineGetTimer(TimerState.Dead);
    expect(strategy.onStartTimer(timerService)).toEqual({
      state: TimerState.Focus,
      stateDuration: 50 * 60,
    });
  });

  it('should go to break after a focus period', () => {
    expectState(
      60 * 60,
      strategy.onPeriodEnd,
      TimerState.Focus,
      TimerState.Break,
      10 * 60
    );
  });

  it('should resume after interrruption', () => {
    expectState(
      60 * 60,
      strategy.onPeriodEnd,
      TimerState.Interruption,
      TimerState.Focus,
      50 * 60
    );
  });

  it('should resume after paused', () => {
    expectState(
      60 * 60,
      strategy.onResumeTimer,
      TimerState.Paused,
      TimerState.Focus,
      50 * 60
    );
  });

  it('should resume after break', () => {
    expectState(
      60 * 60,
      strategy.onPeriodEnd,
      TimerState.Break,
      TimerState.Focus,
      50 * 60
    );
  });

  it('should end after not time left', () => {
    expectState(0, strategy.onPeriodEnd, TimerState.Break, TimerState.Dead, 0);
  });
});

