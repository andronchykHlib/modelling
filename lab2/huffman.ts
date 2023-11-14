import {frequencies} from "./input-values";

type THuffmanNode = HuffmanNode | null

class HuffmanNode {
  left: THuffmanNode;
  right: THuffmanNode;
  frequency: number

  constructor(frequency, left = null, right = null) {
    this.left = left;
    this.right = right;
    this.frequency = frequency;
  }
}

const buildHuffmanTree = (frequencyTable: number[]) => {
  const nodes: HuffmanNode[] = [];

  frequencyTable.map(p => nodes.push(new HuffmanNode(p)));

  while (nodes.length > 1) {
    nodes.sort((a, b) => a.frequency - b.frequency);
    const left = nodes.shift();
    const right = nodes.shift();
    const nextFrequency = left.frequency + right.frequency
    const parentNode = new HuffmanNode(nextFrequency, left, right);
    nodes.push(parentNode);
  }

  return nodes[0];
}

const encode = (root: THuffmanNode, encoding  = '') => {
  if (root) {
    if (!root.left && !root.right) {
      console.log(root.frequency, encoding);
      return;
    }
    encode(root.left, encoding + '0');
    encode(root.right, encoding + '1');
  }
}

const root = buildHuffmanTree(frequencies);
encode(root);
