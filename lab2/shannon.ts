import {frequencies} from "./input-values";

class ShannonFanoNode {
  encoding: string;
  frequency: number;

  constructor(frequency) {
    this.frequency = frequency;
    this.encoding = '';
  }
}

function shannonFano(nodes) {
  if (nodes.length === 1) {
    return nodes;
  }

  nodes.sort((a, b) => b.frequency - a.frequency);

  const totalFrequency = nodes.reduce((sum, node) => sum + node.frequency, 0);

  let currentSum = 0;
  let index = 0;

  for (let i = 0; i < nodes.length; i++) {
    if (currentSum + nodes[i].frequency / 2 >= totalFrequency / 2) {
      break;
    }
    currentSum += nodes[i].frequency;
    index = i;
  }

  const group1 = nodes.slice(0, index + 1);
  const group2 = nodes.slice(index + 1);

  group1.forEach(node => (node.encoding += '0'));
  group2.forEach(node => (node.encoding += '1'));

  return shannonFano(group1).concat(shannonFano(group2));
}

const nodes = frequencies.map(item => new ShannonFanoNode(item))
console.log(shannonFano(nodes));
