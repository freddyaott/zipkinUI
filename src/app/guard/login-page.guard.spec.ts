import { TestBed, async, inject } from '@angular/core/testing';

import { LoginPageGuard } from './login-page.guard';

describe('LoginPageGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginPageGuard]
    });
  });

  it('should ...', inject([LoginPageGuard], (guard: LoginPageGuard) => {
    expect(guard).toBeTruthy();
  }));
});
