import { StretchTextareaDirective } from "./stretch-textarea";

describe('StretchTextarea', () => {
    it('should stretch the element on input', () => {
        const scrollHeight = 200;
        let element = {
            nativeElement: {
                scrollHeight: scrollHeight,
                style: {
                    height: '100px'
                }
            }
        };

        const directive = new StretchTextareaDirective(element);
        directive.onInput();

        let changedHeight = element.nativeElement.style.height.split('px')[0];
        expect(changedHeight).toBeGreaterThanOrEqual(scrollHeight);
    });
});