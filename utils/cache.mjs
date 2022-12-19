export class Cache {
  constructor(keySelector, sharedSelector = null) {
    this.keySelector = keySelector;
    this.sharedSelector = sharedSelector;
    this.cacheMaps = [];
  }

  get(key) {
    const shard = this.sharedSelector(key);
    if (!map) {
      map = new Map();
      this.cacheMaps[shard] = map;
    }

    const keyString = this.keySelector(key);
    return map.get(keyString);
  }

  set(key, value) {
    const shard = this.sharedSelector(key);
    if (!map) {
      map = new Map();
      this.cacheMaps[shard] = map;
    }

    const keyString = this.keySelector(key);
    return map.set(keyString, value);
  }
}
