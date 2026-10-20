https://www.youtube.com/watch?v=9T4z98JcHR0&list=PLxnjbfm5MCHFbRlyVCAqpJFdIzPN_IPID&index=26

# The `this` Keyword in JavaScript

In JavaScript, `this` is a keyword whose value depends on **how** and **where** it is being called (runtime binding).

---

## Quick Reference Summary

| Context | Non-Strict Mode | Strict Mode (`"use strict"`) |
| :--- | :--- | :--- |
| **Global space** | `window` (browser) / `global` (Node) | `window` (browser) / `global` (Node) |
| **Inside a function** | `window` (via `this` substitution) | `undefined` |
| **Function called as `window.fn()`** | `window` | `window` |
| **Inside an object's method** | The object calling the method | The object calling the method |
| **Inside an arrow function** | Lexical context (enclosing scope) | Lexical context (enclosing scope) |
| **Inside a DOM event listener** | The HTML element itself | The HTML element itself |
| **Inside a constructor / class** | The newly created instance | The newly created instance |

---

## 1. `this` in Global Space

At the top-level (outside any function):
```javascript
console.log(this); // In Browser: window object
```

- In browsers: `this` points to the `window` object.
- In Node.js: `this` points to `module.exports` (`{}`) at top-level module, or `global`.
- **`globalThis`**: A standardized keyword introduced in ES2020 that points to the global object across all environments (Browser, Node.js, Web Workers).

---

## 2. `this` inside a Function

Inside a regular function, `this` behaves differently based on **strict mode**:

```javascript
// Non-Strict Mode
function x() {
    console.log(this); // window
}
x();
```

```javascript
// Strict Mode
"use strict";

function x() {
    console.log(this); // undefined
}
x();
```

---

## 3. What is Strict Mode?

Introduced in **ECMAScript 5 (ES5)**, `"use strict"` is a directive that enables a stricter, safer operating mode in JavaScript.

### Key benefits of Strict Mode:
1. **Eliminates silent errors**: Catches mistakes by throwing errors instead of failing silently (e.g. assigning to undeclared variables: `x = 10` throws `ReferenceError`).
2. **Disables bad/legacy syntax**: Disallows `with` statements, duplicate parameter names (`function foo(a, a)`), and octal literals (`0123`).
3. **Auto-enabled by default** in modern features like **ES6 Classes** and **ES Modules** (`import` / `export`).

---

## 4. What is `this` Substitution & Why does `this` work differently in Strict Mode?

In **non-strict mode** (also known as *"sloppy mode"*), JavaScript has a legacy mechanism called **`this` substitution**:

> When a function is called without any calling context (e.g., `fn()`), the execution context's `this` is initially `undefined`. 
> In **non-strict mode**, if `this` is `undefined` or `null`, JavaScript automatically **substitutes** it with the **global object** (`window` in browsers).
> In **strict mode**, this automatic substitution is **disabled** — so `this` remains `undefined`.

### Why was `this` changed in Strict Mode? (3 Major Reasons)

#### 1. Preventing Accidental Global Pollution (The "Forgot `new`" Bug)
Before ES6 classes, constructor functions were standard:
```javascript
function User(name) {
    this.name = name;
}

// Suppose a developer accidentally calls it without 'new':
User("Shaurya"); 
```
- **In Non-Strict Mode**: `this` substitutes to `window`. You just silently created `window.name = "Shaurya"`! This pollutes or overwrites vital global properties.
- **In Strict Mode**: `this` is `undefined`. Running `this.name = name` immediately crashes with:
  `TypeError: Cannot set property 'name' of undefined`.
  The bug is caught instantly instead of causing hidden side-effects.

#### 2. Security & Preventing Global Leaks
In non-strict mode, any third-party script, utility, or sandboxed untrusted code could gain complete access to the global `window` object simply by doing:
```javascript
function getGlobal() {
    return this; // returns window in non-strict mode!
}
```
Strict mode prevents this leak by keeping `this` as `undefined`.

#### 3. Semantic Correctness & Predictability
If you call `x()`, you did **not** specify any object to run it on. It makes no logical sense for JavaScript to pretend you meant `window.x()`.
- If you genuinely want `window`, you should explicitly call `window.x()`.
- If you call `x()`, `this` should faithfully reflect that there is no caller (`undefined`).

---

## 5. `this` Value Depends on How the Function is Called

The value of `this` is evaluated at **runtime** based on the call site:

```javascript
"use strict";

function x() {
    console.log(this);
}

x();          // undefined (called without reference)
window.x();   // window    (called with reference to window object)
```

---

## 6. `this` inside an Object's Method

- **Function vs. Method**: If a function is defined as a property of an object, it is called a **method**.
- When a method is invoked, `this` refers to the **object that called the method**:

```javascript
const obj = {
    a: 10,
    x: function () {
        console.log(this);      // refers to obj: { a: 10, x: [Function: x] }
        console.log(this.a);    // 10
    }
};

obj.x(); // Here, 'obj' is calling 'x', so 'this' is 'obj'
```

---

## 7. Sharing Methods: `call()`, `apply()`, and `bind()`

You can override and explicitly set what `this` points to using `call`, `apply`, and `bind`.

```javascript
const student1 = {
    name: "Shaurya",
    printName: function () {
        console.log(this.name);
    }
};

student1.printName(); // "Shaurya"

const student2 = {
    name: "Akshay"
};

// We want student2 to reuse student1's printName method:
student1.printName.call(student2); // "Akshay" (this points to student2)
```

### Differences between `call`, `apply`, and `bind`:

```javascript
function printDetails(hometown, state) {
    console.log(`${this.name} from ${hometown}, ${state}`);
}

// 1. call: arguments passed individually (comma-separated)
printDetails.call(student1, "Delhi", "Delhi");

// 2. apply: arguments passed as an array
printDetails.apply(student2, ["Dehradun", "Uttarakhand"]);

// 3. bind: does NOT invoke immediately; returns a copy of the function with 'this' permanently bound
const printStudent2 = printDetails.bind(student2, "Dehradun", "Uttarakhand");
printStudent2(); // Invoked later
```

---

## 8. `this` inside Arrow Functions (Lexical `this`)

> **Arrow functions do NOT have their own `this`.**
> They capture/retain the `this` value of their **enclosing lexical context** (where the arrow function is written).

### Example A: Arrow function directly inside an object
```javascript
const obj = {
    a: 10,
    x: () => {
        console.log(this); // window!
    }
};

obj.x();
// Explanation: The enclosing lexical context of obj.x is the Global Space, where 'this' is window.
```

### Example B: Arrow function nested inside a regular method
```javascript
const obj2 = {
    a: 20,
    x: function () {
        // Enclosing lexical context of y is function x()
        // In function x(), 'this' is obj2
        const y = () => {
            console.log(this); // obj2: { a: 20, x: [Function: x] }
        };
        y();
    }
};

obj2.x();
```

---

## 9. `this` inside DOM Elements

In HTML event handlers, `this` refers to the **HTML DOM element** that received the event:

```html
<button onclick="console.log(this)">Click Me</button>
<!-- Logs: <button onclick="...">Click Me</button> -->
```

```javascript
const btn = document.querySelector("#myBtn");
btn.addEventListener("click", function () {
    console.log(this); // Refers to the button DOM element
});
```

---

## 10. `this` inside Classes and Constructors

Inside constructor functions or classes, `this` refers to the **newly created instance**:

```javascript
class Person {
    constructor(name) {
        this.name = name; // 'this' is the new instance being created
    }
}

const p1 = new Person("Shaurya");
console.log(p1.name); // "Shaurya"
```