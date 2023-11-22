interface Job {
  start: number;
  duration: number;
}

const inputValues: Job[] = [{start: 0, duration: 12}, {start: 4, duration: 10},  {start: 6, duration: 5}, {start: 11, duration: 8}, {start: 14, duration: 6}, {start: 18, duration: 5}];

const calcSystemProductivity = (jobs: Job[]) => {
  const intervals = [];
  const dp: number[] = [jobs[0].start + jobs[0].duration];

  for (let i = 1; i < jobs.length; i++) {
    const currentJob = jobs[i];
    const prevJobEnd = dp[i - 1];
    const currentJobEnds = currentJob.start + currentJob.duration;
    const interval = Math.abs(prevJobEnd - currentJobEnds);
    dp.push(currentJobEnds);
    dp.sort();
    intervals.push(interval);
  }
  const intervalAvg = intervals.reduce((sum, interval) => sum + interval, 0) / intervals.length;

  return 1/intervalAvg;
}

console.log(calcSystemProductivity(inputValues));