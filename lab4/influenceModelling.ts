import {influenceConfiguration, states} from "./config";

const getRandomInRange = (min: number, max: number) => {
  const floatRandom = Math.random();
  const difference = max - min;
  const random = difference * floatRandom;

  return random + min
}

const getRandomInfluenceByIntensity = () => {
  const influencesArray = Array.from(influenceConfiguration);

  const totalIntensity = influencesArray.reduce(
      (sum, influence) => sum + influence.intensity,
      0
  );

  if (Math.random() < 0.5) {
    return null;
  }

  const randomValue = Math.random() * totalIntensity;

  let cumulativeIntensity = 0;
  for (let item of influencesArray) {
    cumulativeIntensity += item.intensity;
    if (randomValue <= cumulativeIntensity) {
      const randomIntensityInRange = getRandomInRange(item.range[0], item.range[1]);

      item.useCount++;

      if (item.useCount === item.intensity) {
        influenceConfiguration.delete(item);
      }

      // console.log({r: item.perception * randomIntensityInRange, randomIntensityInRange, range: item.range})

      return item.perception * randomIntensityInRange;
    }
  }

  return null;
}

const simulateInfluence = () => {
  let stateProgress = 0;
  let currentState = 0;

  for (let i = 1; i < 31; i++) {
    console.log("'".repeat(i), i)
    const density = getRandomInfluenceByIntensity();

    if (currentState === states.length) {
      return {currentState, day: i};
    }

    if (!density) {
      continue;
    }

    const stateData = states[currentState];
    stateProgress += density;
    console.log({stateProgress});
    // @ts-ignore
    const nextLevel = stateData.findLastIndex((value) => value && stateProgress >= value) + 1;

    if (nextLevel > currentState) {
      console.log({stateData, stateProgress, nextLevel, density});
      stateProgress = 0;
      currentState = nextLevel;
    }
  }
}

console.log(simulateInfluence());
