/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    let cMinDepth = null;
    let toVisitQueue = [];
    this.root ? toVisitQueue = [[this.root,1]] : cMinDepth = 0;
    while (toVisitQueue.length) {
      const current = toVisitQueue.shift();
      const currDepth = current[1];

      if (current[0].left===null && current[0].right===null) {
        cMinDepth = cMinDepth===null ? currDepth: Math.min(currDepth, cMinDepth);
      }
      
      for (let child of [current[0].left, current[0].right]) { 
        if (child) { toVisitQueue.push([child,currDepth+1]) }
      }
    }
    return cMinDepth;
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    let cMaxDepth = null;
    let toVisitQueue = [];
    this.root ? (toVisitQueue = [[this.root, 1]]) : (cMaxDepth = 0);
    while (toVisitQueue.length) {
      const current = toVisitQueue.shift();
      const currDepth = current[1];

      if (current[0].left === null && current[0].right === null) {
        cMaxDepth = cMaxDepth === null ? 
          currDepth : 
          Math.max(currDepth, cMaxDepth);
      }

      for (let child of [current[0].left, current[0].right]) {
        if (child) {
          toVisitQueue.push([child, currDepth + 1]);
        }
      }
    }
    return cMaxDepth;
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum(node=this.root) {
    if (!node) return 0;
    if (node.left === null && node.right === null) return node.val;
    let lSum = node.left ? this.maxSum(node.left) : 0;
    let rSum = node.right ? this.maxSum(node.right) : 0;

    let rtnBranch = null;
    
    if (lSum > 0 && lSum >= rSum) {
      rtnBranch = node.val + lSum;
    } else if (rSum > 0 && rSum > lSum){
      rtnBranch = node.val + rSum;
    } else {
      rtnBranch = node.val;
    }
    if (this.root === node){
      return rtnBranch > lSum + rSum ? 
        lSum + rSum + node.val : 
        rtnBranch;
    } else {
      return rtnBranch;
    }
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    let smVal = null;
    const toVisitQueue = [this.root];

    while (toVisitQueue.length && this.root) {
      const current = toVisitQueue.shift();

      if (smVal===null) {
        smVal = current.val > lowerBound ? current.val : null;
      } else if (current.val > lowerBound && smVal > current.val) {
        smVal = current.val;
      }
      
      for (let child of [current.left, current.right]) {
        if (child) toVisitQueue.push(child);
      }
    }
    return smVal;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    const toVisitQueue = [ [this.root, 1, null] ];
    let node1Level = null;
    let node2Level = null;

    while (toVisitQueue.length && this.root) {
      const current = toVisitQueue.shift();
      const [currNode,currNodeLvl, parentNode] = [current[0],current[1],current[2]];

      if (currNode === node1) node1Level = [currNodeLvl, parentNode];
      if (currNode === node2) node2Level = [currNodeLvl, parentNode];
      for (let child of [currNode.left, currNode.right]) {
        if (child) toVisitQueue.push([child, currNodeLvl + 1, currNode]);
      };
    }
    return node1Level[0] === node2Level[0] && node1Level[1] != node2Level[1];
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize() {

  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize() {

  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
