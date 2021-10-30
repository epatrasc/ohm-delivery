const db = require('../db/db');

const transitions = {
  CREATED: () => 'PREPARING',
  PREPARING: () => 'READY',
  READY: () => 'IN_DELIVERY',
  IN_DELIVERY: (hasReason) => (hasReason ? 'REFUSED' : 'DELIVERED'),
};

const getOhmById = async (id) => {
  const ohm = await db.getOhmById(id);

  if (!ohm) {
    return db.getOhmByTrackingId(id);
  }

  return ohm;
};

const nextState = async (id, reason) => {
  const ohm = await db.getOhmById(id);

  const { state } = ohm.history[ohm.history.length - 1];

  const nextTransition = transitions[state];

  if (!nextTransition) return ohm;

  const newState = transitions[state](reason);

  return db.updateOhmStateById(id, newState, reason);
};

module.exports = {
  getOhmById,
  nextState,
};
