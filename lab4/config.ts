interface Influence {
  range: [number, number];
  intensity: number;
  perception: number;
  useCount: number;
}

export const states = [
  [0.3,0.5,0.8,null],
  [0,0.2,0.5,0.7],
  [null,0,0.4,0.6],
  [null,null,0,0.1],
]

export const influenceConfiguration: Set<Influence> = new Set();
[
  {range: [0.5,0.8], intensity:5, perception:1, useCount:0},
  {range: [0.3,0.4], intensity:10, perception:0.85, useCount:0},
  {range: [0.25,0.3], intensity:12, perception:0.75, useCount:0}
].forEach((i: Influence) => influenceConfiguration.add(i))
