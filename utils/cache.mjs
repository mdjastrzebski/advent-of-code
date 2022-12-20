export class Cache {
  constructor(keySelector, sharedSelector = null) {
    this._cacheMaps = [];

    this.keySelector = keySelector;
    this.sharedSelector = sharedSelector;
    this.size = 0;
    this.hits = 0;
  }

  get(key) {
    const shard = this._ensureShard(key);
    const keyString = this.keySelector(key);

    this.hits = this.hits + 1;
    return shard.get(keyString);
  }

  set(key, value) {
    const shard = this._ensureShard(key);
    const keyString = this.keySelector(key);

    this.size = this.size + 1;
    return shard.set(keyString, value);
  }

  get hitRatio() {
    return (this.hits / this.size).toFixed(2);
  }

  _ensureShard(key) {
    const shard = this?.sharedSelector(key) ?? 0;
    const map = this._cacheMaps[shard];
    if (map) {
      return map;
    }

    const newMap = new Set();
    this._cacheMaps[shard] = newMap;
    return newMap;
  }
}
