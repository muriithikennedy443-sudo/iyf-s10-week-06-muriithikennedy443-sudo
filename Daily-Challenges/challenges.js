// DAILY CHALLENGES - Async JavaScript

// DAY 1: Delayed Promise

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function runDay1() {
    console.log("Day 1: Delayed Promise");
    console.log("Waiting 2 seconds...");
    await delay(2000);
    console.log("This prints after 2 seconds");
}

// DAY 2: Promise Chain with Timing

function randomDelay(name) {
    const ms = Math.floor(Math.random() * 1000) + 500;
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`${name} completed in ${ms}ms`);
            resolve(name);
        }, ms);
    });
}

async function runDay2() {
    console.log("Day 2: Promise Chain");
    const start = Date.now();

    await randomDelay("Step 1")
        .then(() => randomDelay("Step 2"))
        .then(() => randomDelay("Step 3"));

    const total = Date.now() - start;
    console.log(`Total time: ${total}ms`);
}

// DAY 3: Error Handling - Default User

async function fetchUser(userId) {
    try {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/users/${userId}`
        );

        if (!response.ok) {
            if (response.status === 404) {
                console.log(`User ${userId} not found, returning default user`);
                return {
                    id: 0,
                    name: "Default User",
                    email: "default@example.com",
                    isDefault: true
                };
            }
            throw new Error(`HTTP error: ${response.status}`);
        }

        const user = await response.json();
        return user;

    } catch (error) {
        console.error("Fetch failed:", error.message);
        return {
            id: 0,
            name: "Default User",
            email: "default@example.com",
            isDefault: true
        };
    }
}

async function runDay3() {
    console.log("Day 3: Error Handling");

    // Valid user
    const user1 = await fetchUser(1);
    console.log("Valid user:", user1.name);

    // Non-existent user (404)
    const user999 = await fetchUser(9999);
    console.log("Invalid user result:", user999.name);
}

// DAY 4: Rewrite Callbacks with Async/Await

// Original callback version
function getUserCallback(userId, callback) {
    setTimeout(() => {
        callback({ id: userId, name: "Kennedy" });
    }, 500);
}

function getPostsCallback(userId, callback) {
    setTimeout(() => {
        callback([
            { id: 1, title: "Post 1" },
            { id: 2, title: "Post 2" }
        ]);
    }, 500);
}

// Rewritten with async/await
function getUser(userId) {
    return new Promise(resolve => {
        setTimeout(() => resolve({ id: userId, name: "Kennedy" }), 500);
    });
}

function getPosts(userId) {
    return new Promise(resolve => {
        setTimeout(() => resolve([
            { id: 1, title: "Post 1" },
            { id: 2, title: "Post 2" }
        ]), 500);
    });
}

async function runDay4() {
    console.log("Day 4: Rewrite with Async/Await");

    // Old way - callback hell
    console.log("Old callback way:");
    getUserCallback(1, function(user) {
        console.log("User (callback):", user.name);
        getPostsCallback(user.id, function(posts) {
            console.log("Posts (callback):", posts.length, "posts");
        });
    });

    // Wait for callbacks to finish
    await delay(1500);

    // New way - async/await
    console.log("New async/await way:");
    const user = await getUser(1);
    console.log("User (async):", user.name);
    const posts = await getPosts(user.id);
    console.log("Posts (async):", posts.length, "posts");
}
    

// DAY 5: Parallel Fetches with Promise.allSettled

async function runDay5() {
    console.log("Day 5: Parallel Fetches");

    const endpoints = [
        "https://jsonplaceholder.typicode.com/users/1",
        "https://jsonplaceholder.typicode.com/posts/1",
        "https://jsonplaceholder.typicode.com/todos/1"
    ];

    const promises = endpoints.map(url => fetch(url).then(r => r.json()));

    const results = await Promise.allSettled(promises);

    results.forEach((result, index) => {
        if (result.status === "fulfilled") {
            console.log(`Endpoint ${index + 1} succeeded:`, result.value);
        } else {
            console.log(`Endpoint ${index + 1} failed:`, result.reason);
        }
    });

    console.log("All challenges complete!");
}

// RUN ALL CHALLENGES IN ORDER

async function runAll() {
    await runDay1();
    await runDay2();
    await runDay3();
    await runDay4();
    await runDay5();
}

runAll();