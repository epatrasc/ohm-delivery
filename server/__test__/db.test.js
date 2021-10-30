const db = require('../src/db/db');
const { valid_statuses: VALID_STATUSES } = require('../data/constants.json');

describe('Test db', () => {
  describe('getOhmById', () => {
    test('returns Ohm object', async () => {
      expect.assertions(1);
      expect(await db.getOhmById('1')).toBeDefined();
    });

    test('has a valid history', async () => {
      expect.assertions(1);
      const ohm = await db.getOhmById('1');

      const isValidStatus = VALID_STATUSES.includes(ohm.history[0].state);
      expect(isValidStatus).toBe(true);
    });
  });

  describe('getOhmByTrackingId', () => {
    test('returns Ohm object', async () => {
      expect.assertions(1);
      expect(await db.getOhmByTrackingId('1e62adfe')).toBeDefined();
    });
  });

  describe('updateOhmStateById', () => {
    it('should add a new history item and update state', async () => {
      expect.assertions(2);
      const ohm = await db.updateOhmStateById('1', 'fake');

      const lastItem = ohm.history[ohm.history.length - 1];

      expect(lastItem).toEqual(expect.objectContaining({ state: 'fake', at: expect.any(String) }));
      expect(ohm.status).toBe('fake');
    });
  });

  it('should add reason to history when is present', async () => {
    expect.assertions(1);
    const ohm = await db.updateOhmStateById('1', 'fake', 'this is a reason description');

    expect(ohm.comment).toBe('this is a reason description');
  });
});
