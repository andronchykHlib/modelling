interface Job {
  start: number;
  duration: number;
}

const inputValues: Job[] = [{start: 0, duration: 15}, {start: 3, duration: 9},  {start: 7, duration: 10}, {start: 12, duration: 6}, {start: 15, duration: 7}, {start: 20, duration: 4}];

const calcSystemProductivity = (jobs: Job[]) => {
  const intervals = [];
  const dp: number[] = [jobs[0].start + jobs[0].duration];

  for (let i = 1; i < jobs.length; i++) {
    const currentJob = jobs[i];
    const currentJobEnds = currentJob.start + currentJob.duration;
    dp.push(currentJobEnds);
  }

  dp.sort().forEach((item, index) => {
    if (index  + 1 === dp.length) {
      return;
    }

    intervals.push(Math.abs(item - dp[index + 1]));
  })

  const intervalAvg = intervals.reduce((sum, interval) => sum + interval, 0) / intervals.length;

  return 1/intervalAvg;
}

console.log(calcSystemProductivity(inputValues));
