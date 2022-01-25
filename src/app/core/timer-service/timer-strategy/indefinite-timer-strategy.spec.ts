import { TimerState } from "@app/shared/model/timer-state.model";
import { IndefiniteTimerStrategy } from "./indefinite-timer-strategy";
import { createDefineGetTimer, createDefinePeriodSecondsElapsed, createDefineTimeRemaining, createDefineTotalSessionTime, createExpectState, DefineGetTimerFunction, DefinePeriodSecondsElapsedFunction, DefineTimeRemainingFunction, DefineTotalSessionTimeFunction, ExpectStateFunction } from "./shared";

describe('IndefiniteTimerStrategy', () => {
    let strategy: IndefiniteTimerStrategy;
    let timerService: any;
 
    let defineGetTimer: DefineGetTimerFunction;
    let defineTimeRemaining: DefineTimeRemainingFunction; 
    let definePeriodSecondsElapsed: DefinePeriodSecondsElapsedFunction;
    let defineTotalSessionTime: DefineTotalSessionTimeFunction;
    let expectState: ExpectStateFunction;

    beforeEach(async () => {
        timerService = jasmine.createSpyObj('TimerService', ['getTimer'])
        strategy = new IndefiniteTimerStrategy(timerService);

        defineGetTimer = createDefineGetTimer(timerService);
        defineTimeRemaining = createDefineTimeRemaining(timerService);
        definePeriodSecondsElapsed = createDefinePeriodSecondsElapsed(timerService);
        defineTotalSessionTime = createDefineTotalSessionTime(timerService);
        expectState = createExpectState(timerService, strategy, defineGetTimer, defineTimeRemaining);
    });

    it('should have focusPeriod equal to totalSessionTime', () => {
        defineTimeRemaining(31 * 60);
        defineTotalSessionTime(31 * 60);
        expect(strategy.focusPeriod()).toEqual(31*60);
    });

    it('should have breakPeriod equal to 20 minutes after 100 minutes', () => {
        definePeriodSecondsElapsed(100 * 60);
        expect(strategy.breakPeriod()).toEqual(20*60);
    });

    it('should start work with a focus period equal to totalSessionTime', () => {
        defineTotalSessionTime(77 * 60);
        defineTimeRemaining(77 * 60);
        defineGetTimer(TimerState.Dead);
        expect(strategy.onStartTimer(timerService)).toEqual({
            state: TimerState.Focus,
            stateDuration: 77 * 60,
        });
    });

    it('should end after a focus period', () => {
        defineTotalSessionTime(60 * 60);
        definePeriodSecondsElapsed(5 * 60);
        expectState(0 * 60, strategy.onPeriodEnd, TimerState.Focus, TimerState.Dead, 0);
    });

    it('should resume after interrruption', () => {
        defineTotalSessionTime(77 * 60);
        expectState(60 * 60, strategy.onPeriodEnd, TimerState.Interruption, TimerState.Focus, 60 * 60);
    });

    it('should resume after paused', () => {
        defineTotalSessionTime(77 * 60);
        expectState(60 * 60, strategy.onResumeTimer, TimerState.Paused, TimerState.Focus, 60 * 60);
    });

    it('should resume after break', () => {
        defineTotalSessionTime(77 * 60);
        expectState(60 * 60, strategy.onPeriodEnd, TimerState.Break, TimerState.Focus, 60 * 60);
    });

    it('should end after not time left', () => {
        defineTotalSessionTime(77 * 60);
        expectState(0, strategy.onPeriodEnd, TimerState.Break, TimerState.Dead, 0);
    });
});

