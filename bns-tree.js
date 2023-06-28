class Node {

    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

export default class Tree {

    constructor(arr) {
        arr = [...new Set(arr)]
        arr.sort((a,b) => {
            if (a > b) return 1
            if (b < a) return -1
        })
        this.root = this.buildTree(arr, 0, arr.length - 1)
    }

    buildTree(arr, start, end) {
        if(start > end) return null
        let mid = Math.floor((start + end) / 2)
        
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
            ancestor = null
        }

        while (root !== null && root.data !== value) {
            // console.log(root.data)

            if (root.left === null && root.right === null) return console.log('value not found in the tree:', value)

            if (root.left && root.left.data === value) {
                target = root.left
                ancestor = root
            } 

            if (root.right && root.right.data === value) {
                target = root.right
                ancestor = root
            }

            //change current node after each iteration
            if (value < root.data) {
                root = root.left
            } else if (value > root.data) {
                root = root.right
            }
        }
        
        if (root === null) return false
 
        // if target is a leaf node
        if (!target.left && !target.right) {            
            if (ancestor.right === target) {
                ancestor.right = null
            } else if (ancestor.left === target) {
                ancestor.left = null
            }
        } 

        // if target has 1 child
        //root node with left child
        if ((target.left && !target.right) && ancestor=== null) { 
            target.data = target.left.data
            target.left = null
            //root node with right child
        } else if((!target.left && target.right) && ancestor=== null) {
            target.data = target.right.data
            target.right = null
        } else if ((target.left && !target.right) && ancestor.right === target) {
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
            
            target.data = nextBiggest.data

            if (beforeNextBiggest === target) {
                beforeNextBiggest.right = nextBiggest.right
              } else {
                beforeNextBiggest.left = nextBiggest.right
              }
            
          
        } 
    }

    find (value, root = this.root) {
        if (root === null) return false
        if (root.data === value) return root
        // if (!root.right && !root.left) return false


        if (value < root.data) {
            root = this.find(value, root.left)
        } else if (value > root.data) {
            root = this.find(value, root.right)
        } 
        return root
    }

    log (root) {
        console.log(root, 'i am working')
    }

    levelOrderRec (func, root = this.root, queue = [root], array = []) {
        if (queue.length === 0 && !func) return array
        if (queue.length === 0) return
             
        if (root.left) {
            queue.push(root.left)
    }
        if (root.right) {
            queue.push(root.right)
    }
        queue.shift()

        if (func) {
            func(root)
            return this.levelOrderRec(func, queue[0], queue)
    } else if (!func) {
            array.push(root)
            // console.log(array)
            return this.levelOrderRec(func, queue[0], queue, array)
        }
    }

    levelOrderItr (func, currNode = this.root, queue = [currNode]) {
        let arr = []
        while (queue.length !== 0) {
            currNode = queue[0]
            if (currNode.left) queue.push(currNode.left)
            if (currNode.right) queue.push(currNode.right)
            queue.shift()

            if (func) {
                func(currNode)
            } else if (!func) {
                arr.push(currNode)
            }
        }
        if (!func) return arr
    }

    preOrder(func, currNode = this.root, arr = []) {
        if (currNode === null) return

        if (func) func(currNode)
        if (!func) arr.push(currNode.data)

        this.preOrder(func, currNode.left, arr)
        this.preOrder(func, currNode.right, arr)

        if (!func) return arr
    }

    inOrder(func, currNode = this.root, arr = []) {
        if (currNode === null) return

        this.inOrder(func, currNode.left, arr)
        if (func) func(currNode)
        if (!func) arr.push(currNode.data)
        this.inOrder(func, currNode.right, arr)

        if (!func) return arr
    }

    postOrder(func, currNode = this.root, arr = []) {
        if (currNode === null) return

        this.postOrder(func, currNode.left, arr)
        this.postOrder(func, currNode.right, arr)

        if (func) func(currNode)
        if (!func) {
            arr.push(currNode.data)
            return arr
        }
    }

    height(node) {
        if (node === null) return 0
        if (typeof node !== 'object') node = this.find(node)
        const leftHeight = this.height(node.left)
        const rightHeight = this.height(node.right)

        return Math.max(leftHeight, rightHeight) + 1
    }

    depth(node, currNode = this.root, count = 0) {
        let depth = 0
        console.log(currNode)

        while (currNode.data !== node) {
            if ((node < currNode.data && !currNode.left) || (node > currNode.data && !currNode.right)) {
                console.log('no such value in the tree')
                return false
            }

            if (node < currNode.data) {
            currNode = currNode.left
            } else if (node > currNode.data) {
                currNode = currNode.right
            }
            depth += 1
        }
        return depth
    }

    isBalanced() {
        if (!this.root.left && this.root.right) return true
        let leftHeight = this.height(this.root.left)
        let rightHeight = this.height(this.root.right)
        let biggest = Math.max(leftHeight, rightHeight)
        let smallest = Math.min(leftHeight, rightHeight)

        if (biggest - smallest > 1) { 
            return false
        } else {
            return true
        }
    }

    rebalance() {
        if (this.isBalanced() === false) {
            let sortedArray = this.inOrder()
            let newTree = new Tree(sortedArray)
            this.root = newTree.root
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
// let arr = [1, 2, 3, 4, 5, 6]
const tree = new Tree(arr, 0, arr.length - 1)

prettyPrint(tree.root)

// prettyPrint(tree.root)
// console.log('----------------------------')
// tree.insert(10)
// tree.insert(34)
// tree.insert(35)
// tree.insert(36)
// tree.delete(33)
// tree.delete(34)
// tree.delete(9)
// tree.delete(8)
// tree.delete(4)
// tree.delete(20)
// tree.delete(10)
// tree.delete(100000)
// tree.delete(100)
// tree.delete(1)
// tree.delete(3)

// prettyPrint(tree.root)
// tree.delete(8)
// prettyPrint(tree.root)
// console.log('founded!', tree.find(89))
// console.log('founded!', tree.find(200))
// console.log(tree.find(2100))
// console.log(tree.find(9))
// tree.levelOrderRec(tree.log)
// console.log('no func' ,tree.levelOrderRec())
// console.log('no func' ,tree.levelOrderItr())
// console.log('with func' ,tree.levelOrderItr(tree.log))
// tree.preOrder(tree.log)
// console.log('no func', tree.inOrder())
// tree.postOrder(tree.log)
// console.log(tree.height(35))
// console.log(tree.find(215))
// console.log(tree.depth(33))
// console.log(tree.isBalanced())
// tree.rebalance()
// prettyPrint(tree.root)


// console.log(set)
// console.log(Array.isArray(set))