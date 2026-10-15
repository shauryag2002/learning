https://www.youtube.com/watch?v=ap-6PPAuK1Y&list=PLxnjbfm5MCHFbRlyVCAqpJFdIzPN_IPID&index=23

# Promises

A promise is a object which represents eventual completion or failure of an asynchronous operation.

## Issues with callback:
- Inversion of control: giving control of our code( function ) to other api.
- Pyramid of doom

## Promise States: 
1. Pending
2. Resolved (fulfilled)
3. Rejected

# benifits of promises over callbacks
1. you can resolve promise just once.
2. you can have 3 states of promise: pending, resolved, rejected.
3. if promise is resolved then data is immutable, you can not change it.

## Promise Constructor: 
A promise constructor takes 1 argument which is a function and this function takes 2 arguments resolve and reject.


https://www.youtube.com/watch?v=U74BJcr8NeQ&list=PLxnjbfm5MCHFbRlyVCAqpJFdIzPN_IPID&index=23

# How to create a Promise?

A Promise is created using the `Promise` constructor with the `new` keyword. It takes an executor function with two callback arguments: `resolve` and `reject`.

```javascript
const cart = ["shoes", "pants", "kurta"];

// Creating a promise (Producer)
function createOrder(cart) {
    const pr = new Promise((resolve, reject) => {
        // Validation / Business logic
        if (!validateCart(cart)) {
            // Reject with an Error object (best practice for stack traces)
            const err = new Error("Cart is not valid");
            reject(err);
        }

        // Logic to simulate async call (e.g. database / API)
        const orderId = "12345";
        if (orderId) {
            setTimeout(() => {
                resolve(orderId);
            }, 5000);
        }
    });

    return pr;
}

function validateCart(cart) {
    return cart.length > 0;
}
```

---

# Consuming a Promise

Once a promise is created, we consume it using `.then()` and `.catch()`.

```javascript
const promise = createOrder(cart);

promise
    .then(function (orderId) {
        console.log("Order ID:", orderId);
    })
    .catch(function (err) {
        console.log("Error:", err.message);
    });
```

---

# Promise Chaining

Promise chaining allows us to perform a sequence of dependent asynchronous tasks cleanly, without falling into callback hell (Pyramid of Doom).

```javascript
createOrder(cart)
    .then((orderId) => {
        console.log("Order created:", orderId);
        return proceedToPayment(orderId); // Returns another promise
    })
    .then((paymentInfo) => {
        console.log("Payment status:", paymentInfo);
        return showOrderSummary(paymentInfo);
    })
    .then((summary) => {
        console.log("Summary:", summary);
        return updateWalletBalance(summary);
    })
    .then((walletBalance) => {
        console.log("Updated wallet balance:", walletBalance);
    })
    .catch((err) => {
        console.log("Something went wrong:", err.message);
    });
```

### Golden Rules of Promise Chaining:
1. **Always `return`** inside `.then()`:
   - If you return a **value**, it gets wrapped in `Promise.resolve(value)` and passed to the next `.then()`.
   - If you return a **Promise**, the next `.then()` will wait until that promise settles.
   - If you **forget to return**, the next `.then()` receives `undefined`.
2. **Keep the chain flat**: Avoid nesting `.then()` inside another `.then()`. Always return and chain at the top level.

---

# Error Handling with `.catch()`

### 1. Catch-all at the end
Placing `.catch()` at the end of the chain will catch any rejection or thrown error from **any step** above it:
```javascript
createOrder(cart)
    .then(proceedToPayment)
    .then(showOrderSummary)
    .catch((err) => console.log(err)); // Catches error from ANY of the above
```

### 2. Intermediate `.catch()` (Error Recovery)
`.catch()` handles errors for only the `.then()` blocks that come **before** it. Any `.then()` chained **after** a `.catch()` will still execute:
```javascript
createOrder(cart)
    .then((orderId) => proceedToPayment(orderId))
    .catch((err) => {
        // If proceedToPayment fails, this catch handles it
        console.log("Payment failed, applying fallback:", err.message);
    })
    .then(() => {
        // This will ALWAYS run, even if payment failed above!
        console.log("Show generic order/support page");
    });
```
