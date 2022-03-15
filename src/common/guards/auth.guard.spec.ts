import { UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

const createHttpContext = (request) => ({
  switchToHttp: () => ({
    getRequest: () => request,
  }),
});

it('is a class', () => {
  expect(() => new AuthGuard()).not.toThrow();
});

describe('getRequest()', () => {
  let authGuard;
  beforeEach(() => {
    authGuard = new AuthGuard();
  });

  it('is a function', () => {
    expect(authGuard.getRequest).toEqual(expect.any(Function));
  });

  it('extracts request from http context', () => {
    const request = {};
    const context = createHttpContext(request);
    expect(authGuard.getRequest(context)).toBe(request);
  });
});

describe('canActivate()', () => {
  let authGuard;
  beforeEach(() => {
    authGuard = new AuthGuard();
  });

  it('is a function', () => {
    expect(authGuard.canActivate).toEqual(expect.any(Function));
  });

  it('returns true when user is available on request', () => {
    const request = {
      user: {
        id: 5,
      },
    };
    const context = createHttpContext(request);
    expect(authGuard.canActivate(context)).toBe(true);
  });

  it('throws error when user is not available on the request', () => {
    const request = {};
    const context = createHttpContext(request);
    expect(() => authGuard.canActivate(context)).toThrowError(
      UnauthorizedException,
    );
  });
});
