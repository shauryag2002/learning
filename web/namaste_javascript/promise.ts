const cart = ["milk", "eggs", "sugar"];

const createOrder = () => {
    const promise = new Promise((resolve, reject) => {
        if (cart.length) {
            reject(new Error("Cart is empty"));
        } else {
            setTimeout(() => {
                resolve("Order created successfully");
            }, 5000)
        }
    });
    return promise;
};

const tryingPromise = createOrder();
tryingPromise
    .then((value) => {
        console.log(tryingPromise)
        console.log("Step 1: " + value);
        // throw new Error("Something went wrong");
        return "1234" + value;
    })
    .catch((error) => {
        console.log("Error: " + error);
        // return "1234" + error;
    })
    .then((value) => {
        console.log("Step 2: " + value);
        return "1234" + value;
    })
    .then((value) => {
        console.log("Step 3: " + value);
        return "1234" + value;
    })
    .catch((error) => {
        console.log(error);
    });

console.log(tryingPromise)