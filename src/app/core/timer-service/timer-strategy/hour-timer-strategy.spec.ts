import { TimerState } from "@app/shared/model/timer-state.model";
import { HourTimerStrategy } from "./hour-timer-strategy";

describe('HourTimerStrategy', () => {
    let strategy: HourTimerStrategy;
    let timerService: any;
 
    let defineGetTimer = (state: TimerState, secondsLeft?: number) => {
        timerService.getTimer = jasmine.createSpy().and.returnValue({ state: state, secondsLeft: secondsLeft});
    };

    let defineTimeRemaining = (timeRemaining: number) => {
        timerService.timeRemaining = timeRemaining;
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
        strategy = new HourTimerStrategy();
    });

    it('should have focusPeriod equal to 50 minutes', () => {
        expect(strategy.focusPeriod()).toEqual(50*60);
    });

    it('should have breakPeriod equal to 10 minutes', () => {
        expect(strategy.breakPeriod()).toEqual(10*60);
    });

    it('should start work with a focus period equal to 50 minutes', () => {
        expect(strategy.onStartTimer(timerService)).toEqual({
            state: TimerState.Focus,
            stateDuration: 50 * 60,
        });
    });

    it('should go to break after a focus period', () => {
        expectState(60 * 60, TimerState.Focus, TimerState.Break, 10 * 60);
    });

    it('should resume after interrruption', () => {
        expectState(60 * 60, TimerState.Interruption, TimerState.Focus, 50 * 60);
    });

    it('should resume after paused', () => {
        expectState(60 * 60, TimerState.Paused, TimerState.Focus, 50 * 60);
    });

    it('should resume after break', () => {
        expectState(60 * 60, TimerState.Break, TimerState.Focus, 50 * 60);
    });

    it('should resume after break', () => {
        expectState(60 * 60, TimerState.Break, TimerState.Focus, 50 * 60);
    });

    it('should end after not time left', () => {
        expectState(0, TimerState.Break, TimerState.Dead, 0);
    });
});
