export class FakeValueService {
  constructor() {}

  getValue() {
    return 'my value';
  }

  setValue(value: string) {}

  getPromiseValue() {
    return Promise.resolve(' my value');
  }
}
