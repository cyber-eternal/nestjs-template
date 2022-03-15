import { UnauthorizedException } from '@nestjs/common';
import { GqlAuthGuard } from './gql-auth.guard';

const createGqlContext = (req) => ({
  getArgByIndex(index) {
    const args = [null, null, { req }];
    return args[index];
  },
});

it('is a class', () => {
  expect(() => new GqlAuthGuard()).not.toThrow();
});

describe('getRequest()', () => {
  let authGuard;
  beforeEach(() => {
    authGuard = new GqlAuthGuard();
  });

  it('is a function', () => {
    expect(authGuard.getRequest).toEqual(expect.any(Function));
  });

  it('extracts request from graphql context', () => {
    const request = {};
    const context = createGqlContext(request);
    expect(authGuard.getRequest(context)).toBe(request);
  });
});

describe('canActivate()', () => {
  let authGuard;
  beforeEach(() => {
    authGuard = new GqlAuthGuard();
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
    const context = createGqlContext(request);
    expect(authGuard.canActivate(context)).toBe(true);
  });

  it('throws error when user is not available on the request', () => {
    const request = {};
    const context = createGqlContext(request);
    expect(() => authGuard.canActivate(context)).toThrowError(
      UnauthorizedException,
    );
  });
});
