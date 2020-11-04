class Queue {
  constructor() {
    this._count = 0
    this._items = {}
    this._lowerstCount = 0
  }
  enqueue(element) {
    this._items[this._count] = element
    this._count++
  }
  dequeue() {
    if (this.isEmpty()) return undefined
    const result = this._items[this._lowerstCount]
    delete this._items[this._lowerstCount]
    this._lowerstCount++
    return result
  }
  isEmpty() {
    return this._count - this._lowerstCount
  }
}