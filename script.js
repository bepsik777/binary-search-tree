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
            if (a > b) return 1
            if (b < a) return -1
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

    insert(value, root = this.root) {
        if(value === root.data) return
        if(value < root.data && root.left === null) return root.left = new Node(value)
        if(value > root.data && root.right === null) return root.right = new Node(value)

        if (value < root.data) {
            root = root.left 
            this.insert(value, root)
        }

        if (value > root.data) {
            root = root.right
            this.insert(value, root)
        }
    }

    delete(value, root = this.root) {
        let target
        let ancestor

        if (root.data === value) {
            target = root
        }

        while (root !== null && root.data !== value) {
            // console.log(root.data)

            if (root.left === null && root.right === null) return

            if (root.left && root.left.data === value) {
                target = root.left
                ancestor = root
            } 

            if (root.right && root.right.data === value) {
                target = root.right
                ancestor = root
            }

            if (value < root.data) {
                root = root.left
            } else if (value > root.data) {
                root = root.right
            }


        }
 
        // if target is a leaf node
        if (!target.left && !target.right) {            
            if (ancestor.right === target) {
                ancestor.right = null
            } else if (ancestor.left === target) {
                ancestor.left = null
            }
        } 

        // if target has 1 child
        if ((target.left && !target.right) && ancestor.right === target) {
            ancestor.right = target.left
        } else if ((!target.left && target.right) && ancestor.right === target) {
            ancestor.right = target.right
        } else if ((target.left && !target.right) && ancestor.left === target) {
            ancestor.left = target.left
        } else if ((!target.left && target.right) && ancestor.left === target) {
            ancestor.left = target.right
        }

        // if target has 2 child
        if (target.left && target.right) {
            console.log(target)
            //find the next biggest node from right branch
            let beforeNextBiggest = target
            let nextBiggest = target.right

            while (nextBiggest.left !== null) {
                beforeNextBiggest = nextBiggest
                nextBiggest = nextBiggest.left
            }
            if (nextBiggest === target.right) {
                target.data = nextBiggest.data
                beforeNextBiggest.right = null
            } else if (!nextBiggest.right) {
                console.log('target', target, 'next biggest', nextBiggest, 'before next biggest', beforeNextBiggest)          
                target.data = nextBiggest.data
                beforeNextBiggest.left = null
            }  else {     
                console.log('target', target, 'next biggest', nextBiggest, 'before next biggest', beforeNextBiggest)          
                target.data = nextBiggest.data
                beforeNextBiggest.left = nextBiggest.right
                // beforeNextBiggest.right = nextBiggest.right
                
                // beforeNextBiggest.right = nextBiggest.right
            }

        } 
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


tree.insert(10)
tree.insert(34)
tree.insert(35)
// tree.delete(33)
// tree.delete(34)
// tree.delete(9)
// tree.delete(8)
// tree.delete(4)
// tree.delete(20)
// tree.delete(10)
tree.delete(100)

prettyPrint(tree.root)


// console.log(set)
// console.log(Array.isArray(set))