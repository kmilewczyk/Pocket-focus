import { TimerState } from "@app/shared/model/timer-state.model";
import { PomodoroTimerStrategy } from "./pomodoro-timer-strategy";
import { createDefineGetTimer, createDefineTimeRemaining, createExpectState, DefineGetTimerFunction, DefineTimeRemainingFunction, ExpectStateFunction } from "./shared";

describe('PomodoroTimerStrategy', () => {
    let strategy: PomodoroTimerStrategy;
    let timerService: any;
 
    let defineGetTimer: DefineGetTimerFunction;
    let defineTimeRemaining: DefineTimeRemainingFunction;
    let expectState: ExpectStateFunction;

    beforeEach(async () => {
      timerService = jasmine.createSpyObj('TimerService', ['getTimer']);
      strategy = new PomodoroTimerStrategy();
      defineGetTimer = createDefineGetTimer(timerService);
      defineTimeRemaining = createDefineTimeRemaining(timerService);
      expectState = createExpectState(timerService, strategy, defineGetTimer, defineTimeRemaining);
    });

    it('should have focusPeriod equal to 25 minutes', () => {
        expect(strategy.focusPeriod()).toEqual(25*60);
    });

    it('should have breakPeriod equal to 5 minutes', () => {
        expect(strategy.breakPeriod()).toEqual(5*60);
    });

    it('should start work with a focus period equal to 25 minutes', () => {
        defineTimeRemaining(30 * 60);
        defineGetTimer(TimerState.Dead);
        expect(strategy.onStartTimer(timerService)).toEqual({
            state: TimerState.Focus,
            stateDuration: 25 * 60,
        });
    });

    it('should go to break after a focus period', () => {
        expectState(30 * 60, strategy.onPeriodEnd, TimerState.Focus, TimerState.Break, 5 * 60);
    });

    it('should resume after interrruption', () => {
        expectState(30 * 60, strategy.onPeriodEnd, TimerState.Interruption, TimerState.Focus, 25 * 60);
    });

    it('should resume after paused', () => {
        expectState(30 * 60, strategy.onResumeTimer, TimerState.Paused, TimerState.Focus, 25 * 60);
    });

    it('should resume after break', () => {
        expectState(30 * 60, strategy.onPeriodEnd, TimerState.Break, TimerState.Focus, 25 * 60);
    });

    it('should resume after break', () => {
        expectState(30 * 60, strategy.onPeriodEnd, TimerState.Break, TimerState.Focus, 25 * 60);
    });
});