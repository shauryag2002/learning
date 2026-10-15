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


