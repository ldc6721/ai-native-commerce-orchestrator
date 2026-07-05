import { HealthController } from './health.controller';

describe('HealthController', () => {
  it('returns scaffold health status', () => {
    const controller = new HealthController();

    expect(controller.getHealth()).toEqual({
      status: 'ok',
      service: 'backend',
    });
  });
});
