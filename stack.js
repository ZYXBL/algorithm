class Stack {
  constructor() {
    this._count = 0
    this._item = {}
  }

  push(element) {
    this._item[this._count] = element
    this._count++
  }

  pop() {
    if (this.isEmpty()) return undefined
    this._count--
    const result = this._item[this._count]
    delete this._item[this._count]
    return result
  }

  isEmpty() {
    return this._count === 0
  }

  size() {
    return this._count
  }

  clear() {
    this._item = {}
    this._count = 0
  }
}

// function Stack() {
//   this.items = []
// }

// Stack.prototype = {
//   push: function (item) {
//     this.items.push(item)
//   },
//   pop: function () {
//     if (this.isEmpty()) return undefined
//     return this.items.pop()
//   },
//   top: function () {
//     if (this.isEmpty()) return undefined
//     return this.items[this.items.length - 1]
//   },
//   clear: function () {
//     this.items = []
//     // this.items.length = 0
//   },
//   isEmpty: function () {
//     return this.items.length === 0
//   },
//   size: function () {
//     return this.items.length
//   }
// }

const stack = new Stack()
stack.push(1)
stack.push(2)
stack.push(3)
// console.log(stack.pop())
// console.log(stack.pop())
// console.log(stack.pop())
// console.log(stack.pop())
// console.log(stack.isEmpty())
stack.clear()
console.log(stack.items)
stack.push(3)
console.log(stack.items)

// 闭合的符号
function is_sigle_brackets(string) {
  const stack = new Stack()
  const sign = {
    '{': '}',
    '[': ']',
    '(': ')'
  }
  const signback = {
    '}': '{',
    ']': '[',
    ')': '('
  }

  for (let i = 0, len = string.length; i < len; i++) {
    let item = string[i]
    // 遇到左边字符入栈
    if (item in sign) {
      stack.push(sign[item])
    } else if (item in signback) {
      // 闭环字符 
      // 栈为空，返回失败
      if (stack.isEmpty()) {
        return false
      }
      const last = stack.pop()
      if (last != item) {
        // 栈顶与最新闭环字符不同
        return false
      }
    }
  }
  return stack.isEmpty()
}

console.log(is_sigle_brackets('jlksjf(sdkfjasl(Klfasl))'))
console.log(is_sigle_brackets('jlksjf(sdkfjasl(Klfasl)))('))
console.log(is_sigle_brackets('{}jl{90[]ks}jf(sdkfjasl(Klfasl))'))


// 后缀运算
// [4, 15, 6, '/', '+']
// 4 + (15 / 6) = 6
function calc_exp(exp) {
  const stack = new Stack()

  for (let i = 0, len = exp.length; i < len; i++) {
    const current = exp[i]
    if (/\d/.test(current)) {
      // 当前数据是number
      stack.push(current)
    } else if (stack.size() < 2) {
      // 栈内数据小于两个
      return NaN
    } else {
      const first = stack.pop()
      const last = stack.pop()
      stack.push(eval(last + current + first))
    }
  }
  if (stack.size() > 1) return NaN
  return parseInt(stack.pop())
}

console.log(calc_exp([4, 15, 6, '/', '+']))
console.log(calc_exp([4, 15, '/', '+']))
console.log(calc_exp([4, 15, 7, '/', '-']))
console.log(calc_exp([4, '2', '3', '-']))
