import { TimerState } from "@app/shared/model/timer-state.model";
import { PomodoroTimerStrategy } from "./pomodoro-timer-strategy";

describe('PomodoroTimerStrategy', () => {
    let strategy: PomodoroTimerStrategy;
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
        strategy = new PomodoroTimerStrategy();
    });

    it('should have focusPeriod equal to 25 minutes', () => {
        expect(strategy.focusPeriod()).toEqual(25*60);
    });

    it('should have breakPeriod equal to 5 minutes', () => {
        expect(strategy.breakPeriod()).toEqual(5*60);
    });

    it('should start work with a focus period equal to 25 minutes', () => {
        expect(strategy.onStartTimer(timerService)).toEqual({
            state: TimerState.Focus,
            stateDuration: 25 * 60,
        });
    });

    it('should go to break after a focus period', () => {
        expectState(30 * 60, TimerState.Focus, TimerState.Break, 5 * 60);
    });

    it('should resume after interrruption', () => {
        expectState(30 * 60, TimerState.Interruption, TimerState.Focus, 25 * 60);
    });

    it('should resume after paused', () => {
        expectState(30 * 60, TimerState.Paused, TimerState.Focus, 25 * 60);
    });

    it('should resume after break', () => {
        expectState(30 * 60, TimerState.Break, TimerState.Focus, 25 * 60);
    });

    it('should resume after break', () => {
        expectState(30 * 60, TimerState.Break, TimerState.Focus, 25 * 60);
    });
});