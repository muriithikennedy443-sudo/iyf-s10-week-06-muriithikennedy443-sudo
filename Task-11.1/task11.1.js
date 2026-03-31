// TASK 11.1 - Understanding Async JavaScript

// EXERCISE 1: Synchronous vs Asynchronous Code

// Synchronous - runs in order, blocks until done
console.log("1 - start");
console.log("2 - middle");
console.log("3 - end");
// Output: 1, 2, 3 (in order)

// Asynchronous - doesn't block
console.log("1 - start");
setTimeout(() => {
    console.log("2 - This is delayed");
}, 2000);
console.log("3 - end");
// Output: 1, 3, 2 (after 2 seconds)

// Predict the output
console.log("A");
setTimeout(() => console.log("B"), 0);
console.log("C");
setTimeout(() => console.log("D"), 100);
console.log("E");
// Answer: A, C, E, B, D
// Because setTimeout is always asynchronous, 
// even with 0ms. synchronous code runs first, then the event loop processes the timers.

// EXERCISE 2: Callbacks Patterns

// fetchData example given by instructor
function fetchData(callback) {
    setTimeout(() => {
        const data = { name: "John", age: 25 };
        callback(data);
    }, 1000);
}

fetchData(function(data) {
    console.log("Data received:", data);
});

// My loadUser FUNCTION
function loadUser(userId, callback) {
    setTimeout(() => {
        // Simulating a database returning user info
        const user = {
            id: userId,
            name: "Kennedy",
            email: "muriithikennedy443@gmail.com"
        };
        callback(user); 
    }, 1500); 
}

// Testing loadUser
console.log("Looking for user...");
loadUser(42, function(user) {
    console.log("User loaded:", user);
});