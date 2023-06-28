import {Tree as Tree} from "./bns-tree.js";

function createRandomArray(min, max, minNodeVal, maxNodeVal) {
    let iterations = Math.floor(Math.random() * (max - min) + min) + 1
    let arr = []
    console.log('iterations: ',iterations)

    for (let i = 0; i < iterations; i++) {
        let number = (Math.floor(Math.random() * (maxNodeVal - minNodeVal) + minNodeVal) + 1)
        arr.push(number)
    }
    return arr
}

function makeAndTestTree() {
    // Create tree
    let arr = createRandomArray(15, 30, 1, 100)
    let tree = new Tree(arr)
    console.log(tree.isBalanced())
    
    // Print tree
    tree.prettyPrint()

    // Print tree traversals
    console.log(tree.levelOrderRec())
    console.log(tree.preOrder())
    console.log(tree.inOrder())
    console.log(tree.postOrder())

    // Unbalance tree
    let newArr = createRandomArray(5, 10, 100, 200)
    newArr.forEach(el => tree.insert(el))
    tree.prettyPrint()
    console.log(tree.isBalanced())

    // Rebalance tree
    tree.rebalance()
    tree.prettyPrint()
    console.log(tree.isBalanced())
}


makeAndTestTree()