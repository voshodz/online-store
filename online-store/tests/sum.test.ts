/* eslint-disable no-undef */

import myFunc from './sum';

test('name', () => {
  expect(1).toBe(1);
  expect(myFunc()).toBe(13);
});
