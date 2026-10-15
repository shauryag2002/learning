// const cart = ["milk", "eggs", "sugar"];

// const createOrder = () => {
//     const promise = new Promise((resolve, reject) => {
//         if (cart.length) {
//             reject(new Error("Cart is empty"));
//         } else {
//             setTimeout(() => {
//                 resolve("Order created successfully");
//             }, 5000)
//         }
//     });
//     return promise;
// };

// const tryingPromise = createOrder();
// tryingPromise
//     .then((value) => {
//         console.log(tryingPromise)
//         console.log("Step 1: " + value);
//         // throw new Error("Something went wrong");
//         return "1234" + value;
//     })
//     .catch((error) => {
//         console.log("Error: " + error);
//         // return "1234" + error;
//     })
//     .then((value) => {
//         console.log("Step 2: " + value);
//         return "1234" + value;
//     })
//     .then((value) => {
//         console.log("Step 3: " + value);
//         return "1234" + value;
//     })
//     .catch((error) => {
//         console.log(error);
//     });

// console.log(tryingPromise)

// ============================================================================
// PROMISE COMBINATORS: Promise.all, Promise.allSettled, Promise.race, Promise.any
// ============================================================================

// Dummy promises with different timers:
const p1 = new Promise((resolve, reject) => {
    // setTimeout(() => resolve("P1 Success (3s)"), 3000);
    setTimeout(() => reject("P1 Failed (1s)"), 1000);
});

const p2 = new Promise((resolve, reject) => {
    // setTimeout(() => resolve("P2 Success (1s)"), 1000);
    // Uncomment below to test failure cases:
    setTimeout(() => reject("P2 Failed (1s)"), 1000);
});

const p3 = new Promise((resolve, reject) => {
    // setTimeout(() => resolve("P3 Success (2s)"), 2000);
    setTimeout(() => reject("P3 Failed (1s)"), 1000);

});

// write a api.github.com user api and use promise combinators

const fetchGithubUser = async () => {
    const [user, repos, gists] = await Promise.all([
        fetch("https://api.github.com/users/shaurya397").then(res => res.json()),
        fetch("https://api.github.com/users/shaurya397/repos").then(res => res.json()),
        fetch("https://api.github.com/users/shaurya397/gists").then(res => res.json()),
    ]);
    console.log(user);
    console.log(repos);
    console.log(gists);
};
fetchGithubUser();
// 1. Promise.all -> "Fail-Fast" / All or Nothing
// - Waits for ALL to resolve -> returns array of all results [res1, res2, res3]
// - If ANY fails -> immediately rejects with the first error (doesn't wait for others)
// /*
Promise.all([p1, p2, p3])
    .then((results) => {
        console.log("Promise.all Success:", results);
    })
    .catch((err) => {
        console.error("Promise.all Error:", err);
    });
// */

// 2. Promise.allSettled -> "Wait for Everyone, Never Fails"
// - Always waits for ALL promises to finish (settle), regardless of resolve or reject
// - Returns an array of objects:
//   { status: 'fulfilled', value: ... } or { status: 'rejected', reason: ... }
// /*
Promise.allSettled([p1, p2, p3])
    .then((results) => {
        console.log("Promise.allSettled Results:", results);
    })
// */ 

// 3. Promise.race -> "First one to Settle Wins" (Resolve OR Reject)
// - Returns the result or error of whichever promise finishes FIRST
// /*
Promise.race([p1, p2, p3])
    .then((firstResult) => {
        console.log("Promise.race Winner:", firstResult);
    })
    .catch((firstErr) => {
        console.error("Promise.race First Error:", firstErr);
    });
// */

// 4. Promise.any -> "First SUCCESS Wins"
// - Waits for the FIRST promise to RESOLVE (ignores early rejections)
// - If ALL promises reject -> Throws an AggregateError with array of all errors (.errors)
/*
Promise.any([p1, p2, p3])
    .then((firstSuccess) => {
        console.log("Promise.any First Resolved:", firstSuccess);
    })
    .catch((err) => {
        console.error("Promise.any AggregateError:", err.errors);
    });
*/
