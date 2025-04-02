import "./styles.css";
import { linkedList } from "./linked-list-class";

class HashMap {
  constructor() {
    this.buckets = [];
    this.bucketSize = 16;
    this.bucketLimit = 0.75;
    this.items = 0;
  }

  checkLoadFactor() {
    const loadFactor = this.items / this.bucketSize;
    console.log(loadFactor);

    if (loadFactor > this.bucketLimit) {
      this.bucketSize *= 2;
      console.log("buckets doubled");
    }
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.bucketSize;
    }

    return hashCode;
  }

  set(key, value) {
    const hashKey = this.hash(key);
    let object = new linkedList();

    if (this.buckets[hashKey] === undefined) {
      this.buckets[hashKey] = object.append(key, value);
      this.items += 1;
      this.checkLoadFactor();
    } else {
      if (this.buckets[hashKey].contains(key) === true) {
        this.buckets[hashKey].changeValue(key, value);
        this.items += 1;
        this.checkLoadFactor();
        console.log("duplicate key found");
      } else {
        this.buckets[hashKey].append(key, value);
        this.items += 1;
        this.checkLoadFactor();
        console.log("same hashkey but different name");
      }
    }
  }

  get(key) {
    //  takes one argument as a key and returns the value that is assigned to this key. If a key is not found, return null.
    const hashKey = this.hash(key);

    if (this.buckets[hashKey] === undefined) {
      return null;
    } else {
      return this.buckets[hashKey].getValue(key);
    }
  }

  has(key) {
    // takes a key as an argument and returns true or false based on whether or not the key is in the hash map.
    const hashKey = this.hash(key);

    if (this.buckets[hashKey] === undefined) {
      return false;
    }

    if (this.buckets[hashKey].contains(key) === true) {
      return true;
    }

    return false;
  }

  remove(key) {
    const hashKey = this.hash(key);

    if (this.buckets[hashKey] === undefined) {
      return false;
    }

    if (this.buckets[hashKey].contains(key) === true) {
      const index = this.buckets[hashKey].find(key);
      console.log(index);
      this.buckets[hashKey].removeAt(index);
      this.items -= 1;
      this.checkLoadFactor();
      return true;
    }

    return false;
  }

  length() {
    // returns the number of stored keys in the hash map.
    let count = 0;

    this.buckets.forEach((element) => {
      count += element.size();
    });

    return count;
  }

  clear() {
    // removes all entries in the hash map.
    this.buckets = [];
    return this.buckets;
  }

  keys() {
    // returns an array containing all the keys inside the hash map.
    let keyArray = [];

    this.buckets.forEach((element) => {
      if (element) {
        keyArray = [...keyArray, ...element.getKeys()];
      }
    });

    return keyArray;
  }

  values() {
    // returns an array containing all the values.
    let valueArray = [];

    this.buckets.forEach((element) => {
      if (element) {
        valueArray = [...valueArray, ...element.getValues()];
      }
    });

    return valueArray;
  }

  entries() {
    // returns an array that contains each key, value pair
    let keyValue = [];

    this.buckets.forEach((element) => {
      if (element) {
        element.getKeyValues().forEach((element) => {
          if (element) {
            keyValue.push(element);
          }
        });
      }
    });

    return keyValue;
  }
}

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log(test.get("kite"));
console.log(test.entries());
console.log(test.values());
console.log(test.keys());
console.log(test.length());

console.log(test);
