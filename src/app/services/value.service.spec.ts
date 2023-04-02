import { TestBed } from '@angular/core/testing';

import { ValueService } from './value.service';

describe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValueService],
    });
    service = TestBed.inject(ValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Tests for getValue', () => {
    it('should return value', () => {
      const rta = service.getValue();
      expect(rta).toBe('my value');
    });
  });

  describe('Tests for setValue', () => {
    it('should set value', () => {
      expect(service.getValue()).toBe('my value');
      service.setValue('new value');
      const rta = service.getValue();
      expect(rta).toBe('new value');
    });
  });

  describe('Tests for getPromiseValue', () => {
    it('should return value with then', (done) => {
      service.getPromiseValue().then((rta) => {
        expect(rta).toBe('value');
        done();
      });
    });

    it('should return value with async/await', async () => {
      const rta = await service.getPromiseValue();
      expect(rta).toBe('value');
    });
  });
});
