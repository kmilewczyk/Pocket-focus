import { TimerState } from "@app/shared/model/timer-state.model";
import { IndefiniteTimerStrategy } from "./indefinite-timer-strategy";

describe('IndefiniteTimerStrategy', () => {
    let strategy: IndefiniteTimerStrategy;
    let timerService: any;
 
    let defineGetTimer = (state: TimerState, secondsLeft?: number) => {
        timerService.getTimer = jasmine.createSpy().and.returnValue({ state: state, secondsLeft: secondsLeft});
    };

    let defineTimeRemaining = (timeRemaining: number) => {
        timerService.timeRemaining = timeRemaining;
    };

    let definePeriodSecondsElapsed = (periodSecondsElapsed: number) => {
        timerService.periodSecondsElapsed = periodSecondsElapsed;
    };

    let defineTotalSessionTimem = (totalSessionTime: number) => {
        timerService.getTotalSessionTime = jasmine.createSpy().and.returnValue(totalSessionTime);
    };

    
    let expectState = (
      timeRemaining: number,
      currentState: TimerState,
      nextState: TimerState,
      stateDuration: number
    ) => {
        defineTimeRemaining(timeRemaining);
        defineGetTimer(currentState, undefined);

        expect(strategy.onStateSwitch(timerService)).toEqual({
            state: nextState,
            stateDuration: stateDuration,
        });
    };

    beforeEach(async () => {
        timerService = jasmine.createSpyObj('TimerService', ['getTimer'])
        strategy = new IndefiniteTimerStrategy(timerService);
    });

    it('should have focusPeriod equal to totalSessionTime', () => {
        defineTotalSessionTimem(31 * 60);
        expect(strategy.focusPeriod()).toEqual(31*60);
    });

    it('should have breakPeriod equal to 20 minutes after 100 minutes', () => {
        definePeriodSecondsElapsed(100 * 60);
        expect(strategy.breakPeriod()).toEqual(20*60);
    });

    it('should start work with a focus period equal to totalSessionTime', () => {
        defineTotalSessionTimem(77 * 60);
        expect(strategy.onStartTimer(timerService)).toEqual({
            state: TimerState.Focus,
            stateDuration: 77 * 60,
        });
    });

    it('should end after a focus period', () => {
        definePeriodSecondsElapsed(5 * 60);
        expectState(60 * 60, TimerState.Focus, TimerState.Dead, 0);
    });

    it('should resume after interrruption', () => {
        expectState(60 * 60, TimerState.Interruption, TimerState.Focus, 60 * 60);
    });

    it('should resume after paused', () => {
        expectState(60 * 60, TimerState.Paused, TimerState.Focus, 60 * 60);
    });

    it('should resume after break', () => {
        expectState(60 * 60, TimerState.Break, TimerState.Focus, 60 * 60);
    });

    it('should resume after break', () => {
        expectState(60 * 60, TimerState.Break, TimerState.Focus, 60 * 60);
    });

    it('should end after not time left', () => {
        expectState(0, TimerState.Break, TimerState.Dead, 0);
    });
});

