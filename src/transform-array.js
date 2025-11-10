const { NotImplementedError } = require('../lib');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr ) {

  if (!Array.isArray(arr)) {
    throw new Error("'arr' parameter must be an instance of the Array!");
  }

  
  if (arr.length === 0) {
    return [];
  }

  const result = [];
  const controlSequences = [
    '--discard-next',
    '--discard-prev',
    '--double-next',
    '--double-prev'
  ];

  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];

   
    if (controlSequences.includes(current)) {
      
      if (current === '--discard-next' && i + 1 < arr.length) {
        i++; 
        continue;
      }

     
      if (current === '--double-next' && i + 1 < arr.length) {
        result.push(arr[i + 1]);
        continue;
      }

      
      if (current === '--discard-prev' && result.length > 0) {
        
        const lastResultIndex = result.length - 1;
        if (lastResultIndex >= 0 && arr[i - 1] === result[lastResultIndex]) {
          result.pop();
        }
        continue;
      }

      
      if (current === '--double-prev' && i > 0) {
      
        const prevIndex = i - 1;
        if (prevIndex >= 0 && !controlSequences.includes(arr[prevIndex])) {
          
          if (result.length > 0 && result[result.length - 1] === arr[prevIndex]) {
            result.push(arr[prevIndex]);
          }
        }
        continue;
      }
      
      continue;
    }

    result.push(current);
  }

  return result;
}

module.exports = {
  transform
};
