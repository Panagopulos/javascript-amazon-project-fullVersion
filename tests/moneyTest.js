import { formatCurrency } from '../scripts/utils/money.js';

console.log('test suite: formatCurrency');

console.log('convert cents into dollars')

// Test Case 1
if (formatCurrency(2095) === '20.95') {
  console.log('passed')
} else {
  console.log('failed');
}

console.log('works with 0');
// Test Case 2
if (formatCurrency(0) === '0.00') {
  console.log('passed')
} else {
  console.log('failed');
}

console.log('rounds up to the nearest cent')
// Test Case 3
if (formatCurrency(2000.5) === '20.01' ) {
  console.log('passed')
} else {
  console.log('failed');
}