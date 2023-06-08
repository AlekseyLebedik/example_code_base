import * as selectors from 'dw/core/helpers/title-env-selectors';

describe('App/selectors', () => {
  it('validates servicesAvailabilitySelector', () => {
    const services = [
      { name: 'achievements', configured: true },
      { name: 'matchmaking', configured: false },
    ];
    expect(
      selectors.servicesAvailabilitySelector({
        Components: { App: { servicesAvailability: services } },
        user: { projects: [] },
      })
    ).toEqual(services);
  });

  it('validates isServiceAvailableSelector', () => {
    const formatFn = selectors.isServiceAvailableSelector({
      Components: {
        App: {
          servicesAvailability: [
            { name: 'storages', configured: true },
            { name: 'matchmaking', configured: false },
          ],
        },
      },
      user: { projects: [] },
    });

    expect(
      formatFn({
        name: 'online-games',
        title: 'Online Games',
      })
    ).toBe(true);

    expect(
      formatFn({
        name: 'online-games',
        title: 'Online Gameas',
        availabilityCheck: 'matchmaking',
      })
    ).toBe(false);

    expect(
      formatFn({
        name: 'storages',
        title: 'Storages',
        availabilityCheck: 'storages',
      })
    ).toBe(true);
  });
});
