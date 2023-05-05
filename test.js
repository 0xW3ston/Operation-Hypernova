const NodeCache = require('node-cache');
const mainCache = new NodeCache();

let startSet = process.hrtime();
mainCache.set("{user:'test121213',AUTH_ID:'TEST1'}",'q54sdq5s4d5qsd6qs54dq6s5dq');
let stopSet = process.hrtime();

console.log(`Time taken to set cache: ${stopSet[0] - startSet[0]}s ${stopSet[1] - startSet[1]}ns`);

const NUM_SETS = 1000000;
const NUM_GETS = 1000000;

startSet = process.hrtime();
for (let i = 0; i < NUM_SETS; i++) {
    mainCache.set(`key${i}`, `q54sdq5s4${i}d5qsd6q${i}sq54sdq5s4d5qsd${i}${i}${i}6qs54dq6s5dqq54${i}sdq5s4d5qsd6qs54${i}dq6s5dqq54sdq5s4d5qsd6qs54dq6s5d${i}qq54sdq5s4d5qsd${i}6qs54dq6s5dqq54sdq5s4d5qsd6qs54dq6s5dqq54sdq5s4d5qsd6qs54dq6s5dqq54sdq5s4d5qsd6qs54dq6s5dqq54sdq5s4d5qsd6qs54dq6s5dqq54sdq5s4d5qsd6qs54dq6s5dqq54sdq5s4d5qsd6qs54dq6s5dqq54sdq5s4d5qsd6qs54dq6s5dqq54sdq5s4d5qsd6qs54dq6s5dqq54sdq5s4d5qsd6qs54dq6s5dqq54sdq5s4d5qsd6qs54dq6s5dqq54sdq5s4d5qsd6qs54dq6s5dqq54sdq5s4d5qsd6qs54dq6s5dqq54sdq5s4d5qsd6qs54dq6s5dqq54sdq5s4d5qsd6qs54dq6s5dqq54sdq5s4d5qsd6qs54dq6s5dqq54sdq5s4d5qsd6qs54dq6s5dqq54sdq5s4d5qsd6qs54dq6s5dqq54sdq5s4d5qsd6qs54dq6s5dqq54sdq5s4d5qsd6qs54dq6s5dqq54sdq5s4d5qsd6qs54dq6s5dqq54sdq5s4d5qsd6qs54dq6s5dq54dq6s5dq${i}`,10);
}
stopSet = process.hrtime();

console.log(`Time taken to set cache: ${stopSet[0] - startSet[0]}s ${stopSet[1] - startSet[1]}ns`);

startSet = process.hrtime();
for (let i = 0; i < NUM_GETS; i++) {
  const value = mainCache.get(`key${i}`);
}
stopSet = process.hrtime();

console.log(`Time taken to set cache: ${stopSet[0] - startSet[0]}s ${stopSet[1] - startSet[1]}ns`);