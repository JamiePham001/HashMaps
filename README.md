# HashMap and LinkedList Implementation

## Overview

A JavaScript implementation of a HashMap with collision handling using LinkedLists. Features automatic resizing and full CRUD operations.

## HashMap Class

### Core Methods

| Method            | Description            | Complexity           |
| ----------------- | ---------------------- | -------------------- |
| `set(key, value)` | Stores key-value pair  | O(1) avg, O(n) worst |
| `get(key)`        | Retrieves value by key | O(1) avg, O(n) worst |
| `has(key)`        | Checks key existence   | O(1) avg, O(n) worst |
| `remove(key)`     | Deletes key-value pair | O(1) avg, O(n) worst |
| `clear()`         | Resets the HashMap     | O(1)                 |

### Utility Methods

| Method      | Returns                    |
| ----------- | -------------------------- |
| `keys()`    | Array of all keys          |
| `values()`  | Array of all values        |
| `entries()` | Array of [key,value] pairs |
| `length()`  | Count of stored items      |

## LinkedList Class

Used for collision resolution in HashMap.

### Key Operations

- **Node Management**: `append()`, `prepend()`, `insertAt()`
- **Search**: `contains()`, `find()`, `at()`
- **Removal**: `removeAt()`, `pop()`
- **Traversal**: `head()`, `tail()`, `size()`

## Implementation Features

### HashMap Internals

```javascript
{
  buckets: [],         // Array of LinkedLists
  bucketSize: 16,      // Initial capacity
  bucketLimit: 0.75,   // Load factor threshold
  items: 0            // Current item count
}
```

## Hashing Algorithm

```javascript
hash(key) {
  let hashCode = 0;
  const primeNumber = 31;
  for (let i = 0; i < key.length; i++) {
    hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.bucketSize;
  }
  return hashCode;
}
```

## Usage Example

```javascript
const map = new HashMap();

// Basic operations
map.set("color", "blue");
map.get("color"); // 'blue'
map.has("color"); // true
map.remove("color");

// Bulk operations
map.set("fruit", "apple");
map.set("vehicle", "car");
console.log(map.keys()); // ['fruit', 'vehicle']
console.log(map.entries()); // [['fruit','apple'], ['vehicle','car']]
```

## Performance Notes

- **Automatic resizing**: Occurs when load factor exceeds 0.75
- **Collision handling**: Uses chaining with LinkedLists
- **Hashing**: Implements prime number (31) for optimal distribution

## Testing

The implementation includes comprehensive test coverage for:

- **Basic CRUD operations**

  - Set/get functionality
  - Existence checking
  - Removal operations

- **Collision scenarios**

  - Hash bucket collisions
  - Duplicate key handling

- **Resizing behavior**

  - Automatic bucket expansion
  - Load factor calculations
  - Rehashing of existing elements

- **Edge cases**
  - Empty map operations
  - Null/undefined values
  - Extreme data volumes
