const low = require('lowdb');
const lodash = require('lodash');
const FileAsync = require('lowdb/adapters/FileAsync');

const adapter = new FileAsync('db.json');
const config = require('../../data/db.config.json');

const db = (async () => {
  const dbInstance = await low(adapter);
  await dbInstance.defaults(config).write();
  return dbInstance;
})();

const getOhmById = async (id) => {
  const dbInstance = await db;
  const ohm = dbInstance.get('ohms')
    .find({ id })
    .value();

  return ohm;
};

const getOhmByTrackingId = async (trackingId) => {
  const dbInstance = await db;
  const ohm = dbInstance.get('ohms')
    .find({ trackingId })
    .value();

  return ohm;
};

const updateOhmStateById = async (id, state, reason) => {
  const dbInstance = await db;

  const ohm = dbInstance.get('ohms')
    .find({ id })
    .value();

  // handle no item found
  if (!ohm) return undefined;

  // update state and history
  const item = lodash.omitBy({
    state,
    at: Date.now().toString(),
  }, lodash.isNil);

  ohm.status = state;
  ohm.comment = reason || null;
  ohm.history.push(item);

  await dbInstance.write();

  return dbInstance.get('ohms')
    .find({ id })
    .value();
};

module.exports = { getOhmById, getOhmByTrackingId, updateOhmStateById };
