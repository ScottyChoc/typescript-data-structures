/*
    Data Structures in TypeScript

    To Compile:
        tsc structures.ts
        (optionally: tsc structures.ts --noImplicitAny)
    To run:
        node structures.js

*/

// Basic wrapper for a primitive
class Item {
    constructor(
        public value: number | string | boolean
    ) {}
}

function assert(val1: any, val2: any, message: string) {
    if (val1 !== val2) {
        console.log("Assertion Failed: ", message);
        console.log(val1, "does not equal", val2);
    }
}

// 1. Stack

/*
 * A stack is a LIFO (Last In First Out) data structure. We use a stack when we
 * need to keep track of data that is nested, or when we need to make sure that
 * we solve all the sub-problems before solving a main problem. JavaScript uses
 * a stack to keep track of our function calls.
 */

class Stack {
    // set up our storage, and keep it from prying eyes
    private storage: Item[];

    constructor() {
        // initialize our storage so that it actually is an array.
        this.storage = [];
    }

    addItem(i: Item): void {
        // void means that this function doesn't return anything.
        // to add an item, push that item onto the end of the array.
        this.storage.push(i);
    }

    getLastItem(): Item {
        // todo: remove and return the last item on the storage
        return this.storage.pop();
    }

    peekLastItem(): Item {
        // todo: return a reference to the last item in storage without removing
        return this.storage[this.storage.length - 1];
    }

    isEmpty(): boolean {
        // todo: return true if storage is empty, false otherwise
        if (this.storage.length === 0) {
            return true;
        }
        return false;
    }
}

let st: Stack = new Stack();
assert(st.isEmpty(), true, "Stack is empty on creation");

st.addItem(new Item(3));
assert(st.isEmpty(), false, "Stack is not empty after one item added");

let i: Item = st.peekLastItem();
assert(i.value, 3, "Peeking last item gets us the last item");
assert(st.isEmpty(), false, "Stack is not emptied by peeking");

let i2: Item = st.getLastItem();
assert(i2.value, 3, "Stack returns last item on getLastItem");
assert(st.isEmpty(), true, "Stack is empty after popping last item");


// 2. Queue

/*
 * A queue is a FIFO (First In First Out) data structure. We use a queue when we
 * want to handle things in the order they are recieved. JavaScript uses a queue
 * to handle asynch functions in the order that they fire.
 */

 // Write, from scratch, an implementation of a Queue, and at least one test for
 // each method on the Queue.


class Queue {
    private storage: Item[];
    constructor() {
        this.storage = [];
    }
    addItem(i: Item): void {
        this.storage.unshift(i);
    }
    getFirstItem(): Item {
        return this.storage.shift();
    }
    peekFirstItem(): Item {
        return this.storage[0];
    }
    isEmpty(): boolean {
        if (this.storage.length === 0) {
            return true;
        }
        return false;
    }
}

let qu: Queue = new Queue();
assert(qu.isEmpty(), true, "Queue is empty on creation");

qu.addItem(new Item(3));
assert(qu.isEmpty(), false, "Queue is not empty after one item added");

let j: Item = qu.peekFirstItem();
assert(j.value, 3, "Peeking first item gets us the first item");
assert(qu.isEmpty(), false, "Queue is not emptied by peeking");

let j2: Item = qu.getFirstItem();
assert(j2.value, 3, "Queue returns first item on getFirstItem");
assert(qu.isEmpty(), true, "Queue is empty after popping last item");

 // 3. Pick a Data Structure

 /* Pick one structure from http://en.wikipedia.org/wiki/List_of_data_structures
  * and implement it in
  * TypeScript. Be sure to include tests! Make sure to choose something that
  * will be a good challenge for you! (Go with "Heap" if you're unsure. Ask Erty
  * if you need help :)
  */


 // My data structure is associative array!

class Pair {
    constructor(
        public key: string,
        public value: number | string | boolean
    ) {}
    toString(): string {
        return `${this.key}, ${this.value}`;
    }
}

class associativeArray {
    public storage: Pair[];
    constructor() {
        this.storage = [];
    }

    isEmpty(): boolean {
        if (this.storage.length === 0) {
            return true;
        }
        return false;
    }

    // Add or insert: add a new (key,value) pair to the collection, binding the new key to its new value. The arguments to this operation are the key and the value.

    insert(key, value): void {
        let p: Pair = new Pair(key, value);
        this.storage.push(p);
        // console.log(`${p} has been added to storage`);
    }

    // Reassign: replace the value in one of the (key,value) pairs that are already in the collection, binding an old key to a new value. As with an insertion, the arguments to this operation are the key and the value.

    reassign(key, newValue): void {
        for (let p of this.storage) {
            if (p.key === key) {
                p.value = newValue;
                // console.log(`${p.value} has been assigned to ${p.key}`);
                return;
            }
        }
        console.log(`${key} not found`);
        return;
    }

    // Remove or delete: remove a (key,value) pair from the collection, unbinding a given key from its value. The argument to this operation is the key.

    remove(keyToRemove): void { 
        for (let p in this.storage) {
            if (this.storage[p].key === keyToRemove) {
                // console.log(this.storage[p]);
                this.storage.splice(p, 1);
                // console.log(`Pair with key ${keyToRemove} was removed`);
                return;
            }
        }
        console.log(`${keyToRemove} not found`);
        return;
    }

    // Lookup: find the value (if any) that is bound to a given key. The argument to this operation is the key, and the value is returned from the operation. If no value is found, some associative array implementations raise an exception.

    lookup(key): any {
        for (let p in this.storage) {
            if (this.storage[p].key === key) {
                // console.log(this.storage[p].value);
                return this.storage[p].value;
            }
        }
        console.log(`${key} not found`);
    }
}

// Tests:

let aa: associativeArray = new associativeArray();
assert(aa.isEmpty(), true, "Associative Array is empty on creation");

aa.insert("isSuperCool", "true");
assert(aa.isEmpty(), false, "Associative Array is not empty after inserting one pair");

aa.remove("isSuperCool");
assert(aa.isEmpty(), true, "Associative Array is empty after removing one pair");

aa.insert("drink", "whiskey");

aa.reassign("drink", "tea");
let t = aa.storage[0].value;
assert(t, "tea", "t is not tea 😜");

let t2 = aa.storage[0];
assert(aa.lookup(t2.key), t2.value, "The value returned doesn't match the key you looked up");
