import { DefaultPipe } from './default.pipe';

describe('DefaultPipe', () => {
  let pipe: DefaultPipe;

  beforeEach(() => {
    pipe = new DefaultPipe();
  });

  it('creates an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('provides a default on undefined', () => {
    expect(pipe.transform<number>(undefined, 1338)).toEqual(1338);
  });

  it('provides a default on null', () => {
    expect(pipe.transform<string>(null, 'viceroy')).toEqual('viceroy');
  });

  it('doesn\'t change input on proper type', () => {
    let dict = { a: "cart", b: "wheel" };
    expect(pipe.transform<{ a: string, b: string }>(dict, { a: 'robert', b: 'knight'})).toEqual(dict);
  });
});
