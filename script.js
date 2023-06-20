class Node {

    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {

    constructor(arr) {
        arr = [...new Set(arr)]
        arr.sort((a,b) => {
            if (a > b) return -1
            if (b < a) return 1
        })
        console.log(arr)
        this.root = this.buildTree(arr, 0, arr.length - 1)
    }

    buildTree(arr, start, end) {
        // arr = [...new Set(arr)]
        // arr.sort()
        
        if(start > end) return null
        let mid = Math.floor((start + end) / 2)
        // console.log(arr, mid, start, end)
        
        let root = new Node(arr[mid])
        root.left = this.buildTree(arr, start, mid-1)
        root.right = this.buildTree(arr, mid + 1, end)

        return root
    }
}

function prettyPrint(node, prefix = "", isLeft = true)  {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

let arr = [1, 2, 1, 4, 2, 5, 8, 3, 9, 20, 33, 100, 215]
const tree = new Tree(arr, 0, arr.length - 1)


console.log(tree)
prettyPrint(tree.root)


// console.log(set)
// console.log(Array.isArray(set))