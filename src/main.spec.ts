const appMock = {
  setGlobalPrefix: jest.fn(),
  useGlobalPipes: jest.fn(),
  enableCors: jest.fn(),
  listen: jest.fn().mockResolvedValue(undefined),
};

const createMock = jest.fn().mockResolvedValue(appMock);

jest.mock('@nestjs/core', () => ({
  NestFactory: {
    create: (...args: unknown[]) => createMock(...args),
  },
}));

jest.mock('./app.module', () => ({
  AppModule: class AppModule {},
}));

import './main';

describe('main bootstrap', () => {
  it('should configure app and start listening', async () => {
    await new Promise((resolve) => setImmediate(resolve));

    expect(createMock).toHaveBeenCalledTimes(1);
    expect(appMock.setGlobalPrefix).toHaveBeenCalledWith('api/v1');
    expect(appMock.enableCors).toHaveBeenCalledTimes(1);
    expect(appMock.listen).toHaveBeenCalledWith(3000);

    const pipeInstance = appMock.useGlobalPipes.mock.calls[0][0];
    expect(pipeInstance).toBeDefined();
    expect(pipeInstance.constructor.name).toBe('ValidationPipe');
  });
});
