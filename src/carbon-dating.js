const { NotImplementedError } = require('../lib');

const MODERN_ACTIVITY = 15;
const HALF_LIFE_PERIOD = 5730;

/**
 * Determine the age of archeological find by using
 * given MODERN_ACTIVITY and HALF_LIFE_PERIOD values
 *
 * @param {String} sampleActivity string representation of current activity
 * @return {Number | Boolean} calculated age in years or false
 * in case of incorrect sampleActivity
 *
 * @example
 *
 * dateSample('1') => 22387
 * dateSample('WOOT!') => false
 *
 */
function dateSample(sampleActivity) {
   // 1. Проверяем входные данные
  if (
    typeof sampleActivity !== 'string' ||
    isNaN(Number(sampleActivity)) ||
    Number(sampleActivity) <= 0 ||
    Number(sampleActivity) > MODERN_ACTIVITY
  ) {
    return false;
  }

  // 2. Преобразуем строку в число
  const activity = Number(sampleActivity);

  // 3. Применяем формулу
  const age = (HALF_LIFE_PERIOD / Math.LN2) * Math.log(MODERN_ACTIVITY / activity);

  // 4. Возвращаем округленное значение возраста
  return Math.ceil(age);
}

module.exports = {
  dateSample
};
