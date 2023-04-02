import { MasterService } from './master.service';
import { ValueService } from './value.service';
import { FakeValueService } from './value-fake.service';

describe('MasterService', () => {
  let service: MasterService;

  beforeEach(() => {
    service = new MasterService(
      new FakeValueService() as unknown as ValueService
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created', () => {
    expect(service.getValue()).toBe('my value');
  });

  it('should return "other value" from fake object ', () => {
    const fake = { getValue: () => 'other value' } as ValueService;
    let service = new MasterService(fake);
    expect(service.getValue()).toBe('other value');
  });

  it('should call getValue from fake object', () => {
    const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getValue']);

    valueServiceSpy.getValue.and.returnValue('fake value');

    let service = new MasterService(valueServiceSpy);
    expect(service.getValue()).toBe('fake value');
    expect(valueServiceSpy.getValue).toHaveBeenCalled();
    expect(valueServiceSpy.getValue).toHaveBeenCalledTimes(1);
  });
});
