class Node {
  constructor(key = null, value = null, nextNode = null) {
    this.key = key;
    this.value = value;
    this.nextNode = nextNode;
  }
}

export class linkedList extends Node {
  constructor(key) {
    super(key);
  }

  append(key, value, currentNode = this) {
    if (currentNode.key === null) {
      this.key = key;
      this.value = value;
      return this;
    }

    if (currentNode.nextNode === null && currentNode.key !== null) {
      currentNode.nextNode = new Node(key, value, null);
    } else {
      return this.append(key, value, currentNode.nextNode);
    }
  }

  prepend(input) {
    if (this.key === null) {
      this.key = input;
    } else {
      const newNode = new Node(input, null);
      // create a shallow copy of the object
      newNode.nextNode = Object.assign({}, this);

      this.key = newNode.key;
      this.nextNode = newNode.nextNode;
    }
  }

  changeValue(key, value, currentNode = this) {
    if (currentNode.key === key) {
      currentNode.value = value;
      return 0;
    } else {
      return this.changeValue(key, value, currentNode.nextNode);
    }
  }

  getValue(key, currentNode = this) {
    if (currentNode === null) {
      return null;
    }

    if (currentNode.key.toLowerCase() === key.toLowerCase()) {
      return currentNode.value;
    } else {
      return this.getValue(key, currentNode.nextNode);
    }
  }

  getValues(array = [], currentNode = this) {
    // console.log(array);

    if (currentNode === null) {
      return array;
    }

    if (currentNode.value !== null) {
      array.push(currentNode.value);
    }

    return this.getValues(array, currentNode.nextNode);
  }

  getKeyValues(array = [], currentNode = this) {
    // console.log(array);

    if (currentNode === null) {
      return array;
    }

    if (currentNode.value !== null) {
      array.push([currentNode.key, currentNode.value]);
    }

    return this.getKeyValues(array, currentNode.nextNode);
  }

  getKeys(array = [], currentNode = this) {
    // console.log(array);

    if (currentNode === null) {
      return array;
    }

    if (currentNode.key !== null) {
      array.push(currentNode.key);
    }

    return this.getKeys(array, currentNode.nextNode);
  }

  size(count = 0, currentNode = this) {
    if (this.key === null) {
      return 0;
    }

    if (currentNode === null) {
      return count;
    } else {
      return this.size((count += 1), currentNode.nextNode);
    }
  }

  head() {
    return this.key;
  }

  tail(currentNode = this) {
    if (currentNode.nextNode === null) {
      return currentNode.key;
    } else {
      return this.tail(currentNode.nextNode);
    }
  }

  at(index, count = 0, currentNode = this) {
    if (index === count) {
      return currentNode.key;
    } else {
      return this.at(index, (count += 1), currentNode.nextNode);
    }
  }

  pop(index = 0, currentNode = this) {
    const secondLastNode = this.size() - 1;

    if (currentNode.nextNode === null) {
      return;
    }

    if (secondLastNode === index) {
      currentNode.nextNode = null;
    } else {
      return this.pop((index += 1), currentNode.nextNode);
    }
  }

  contains(key, currentNode = this) {
    // Check for null first
    if (currentNode === null) {
      return false;
    }

    // Then check the key
    if (key.toLowerCase() === currentNode.key.toLowerCase()) {
      return true;
    }

    // Recurse
    return this.contains(key, currentNode.nextNode);
  }

  find(key, count = 0, currentNode = this) {
    if (key.toLowerCase() === currentNode.key.toLowerCase()) {
      return count;
    }
    if (currentNode.key === null) {
      return null;
    } else {
      return this.find(key, (count += 1), currentNode.nextNode);
    }
  }

  toString(currentNode = this, txtString = "") {
    if (currentNode === null) {
      txtString += "null";
      return txtString;
    }

    txtString += `( ${currentNode.key} ) -> `;
    return this.toString(currentNode.nextNode, txtString);
  }

  insertAt(key, index, currentNode = this, count = 0) {
    const maxSize = this.size() + 1;
    if (maxSize < index) {
      console.log("index outside list range");
      return 0;
    }

    if (index === count) {
      const newNode = new Node(key, null);
      newNode.nextNode = Object.assign({}, currentNode);

      currentNode.key = newNode.key;
      currentNode.nextNode = newNode.nextNode;
      return 0;
    } else {
      return this.insertAt(key, index, currentNode.nextNode, (count += 1));
    }
  }

  removeAt(index, currentNode = this, count = 0) {
    if (this.size() < index) {
      console.log("index outside list range");
      return 0;
    }

    // remove item at the end of the linked list
    if (index === this.size() - 1) {
      this.pop(index);
      return;
    }

    // rearrange the contents of the current index with values of the following linked list item
    if (index === count) {
      //   console.log(index, count);
      currentNode.key = currentNode.nextNode.key;
      currentNode.nextNode = currentNode.nextNode.nextNode;
    } else {
      return this.removeAt(index, currentNode.nextNode, (count += 1));
    }
  }
}
