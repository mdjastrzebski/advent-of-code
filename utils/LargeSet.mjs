export class LargeSet {
  constructor(keySelector, sharedSelector = null) {
    this._cacheSets = [];

    this.keySelector = keySelector;
    this.sharedSelector = sharedSelector;
    this.size = 0;
    this.hits = 0;
  }

  has(key) {
    const shardSet = this._ensureShard(key);
    const keyString = this.keySelector(key);

    this.hits = this.hits + 1;
    return shardSet.has(keyString);
  }

  add(key) {
    const shardSet = this._ensureShard(key);
    const keyString = this.keySelector(key);

    this.size = this.size + 1;
    shardSet.add(keyString);
  }

  get hitRatio() {
    return (this.hits / this.size).toFixed(2);
  }

  _ensureShard(key) {
    const shard = this?.sharedSelector(key) ?? 0;
    const set = this._cacheSets[shard];
    if (set) {
      return set;
    }

    const newSet = new Set();
    this._cacheSets[shard] = newSet;
    return newSet;
  }
}
