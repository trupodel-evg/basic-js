const { NotImplementedError } = require('../lib');

/**
 * Extract season from given date and expose the enemy scout!
 *
 * @param {Date | FakeDate} date real or fake date
 * @returns {String} time of the year
 *
 * @example
 *
 * getSeason(new Date(2020, 02, 31)) => 'spring'
 *
 */
function getSeason(date) {
if (!date) {
    return 'Unable to determine the time of year!';
  }

  if (Object.getOwnPropertyNames(date).length > 0 || date instanceof Date === false) {
  throw new Error('Invalid date!');
  }

  try {
    const month = date.getMonth(); // 0..11

    if (month === 11 || month === 0 || month === 1) {
      return 'winter';
    }
    if (month >= 2 && month <= 4) {
      return 'spring';
    }
    if (month >= 5 && month <= 7) {
      return 'summer';
    }
    if (month >= 8 && month <= 10) {
      return 'autumn';
    }
  } catch (e) {
    throw new Error('Invalid date!');
  }
}

module.exports = {
  getSeason
};
