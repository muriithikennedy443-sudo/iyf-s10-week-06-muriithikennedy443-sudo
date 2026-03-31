// TASK 11.4 - Async/Await

// Helper functions

function getUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({ id: userId, name: "Kennedy" });
            } else {
                reject("Invalid user ID");
            }
        }, 1000);
    });
}

function getUserPosts(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve([
                    { id: 1, title: "Post 1" },
                    { id: 2, title: "Post 2" }
                ]);
            } else {
                reject("Invalid user ID");
            }
        }, 1000);
    });
}

function getPostComments(postId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (postId > 0) {
                resolve([
                    { id: 1, text: "Great post!" },
                    { id: 2, text: "Thanks for sharing!" }
                ]);
            } else {
                reject("Invalid post ID");
            }
        }, 1000);
    });
}

// EXERCISE 1: Converting to Async/Await

// Promise chain version
function getDataWithPromises() {
    return getUserData(1)
        .then(user => getUserPosts(user.id))
        .then(posts => getPostComments(posts[0].id))
        .then(comments => comments);
}

// Async/Await version 
async function getDataWithAsync() {
    const user = await getUserData(1);
    const posts = await getUserPosts(user.id);
    const comments = await getPostComments(posts[0].id);
    return comments;
}

// Using it
getDataWithAsync().then(comments => console.log("Comments:", comments));

// Or inside another async function
async function main() {
    const comments = await getDataWithAsync();
    console.log("Main got comments:", comments);
}

main();

// EXERCISE 2: Error Handling with Try/Catch

async function fetchUserData(userId) {
    try {
        const user = await getUserData(userId);
        const posts = await getUserPosts(user.id);
        return { user, posts };
    } catch (error) {
        console.error("Failed to fetch:", error);
        throw error;
    }
}

// Test with valid ID
fetchUserData(1).then(result => {
    console.log("Fetched user:", result.user);
    console.log("Fetched posts:", result.posts);
});

// Test with invalid ID 
fetchUserData(-1).catch(err => {
    console.log("Caught invalid user error:", err);
});


// EXERCISE 3: Parallel with Async/Await

async function getAllUsers() {
    // Sequential (slow) - ~3 seconds
    const user1 = await getUserData(1);
    const user2 = await getUserData(2);
    const user3 = await getUserData(3);
    console.log("Sequential users:", [user1, user2, user3]);

    // Parallel (fast) - ~1 second
    const [u1, u2, u3] = await Promise.all([
        getUserData(1),
        getUserData(2),
        getUserData(3)
    ]);
    console.log("Parallel users:", [u1, u2, u3]);

    return [u1, u2, u3];
}

getAllUsers();

// BUILD: Rewrite callback hell with async/await

async function getFullData() {
    try {
        const user = await getUserData(1);
        console.log("User:", user);

        const posts = await getUserPosts(user.id);
        console.log("Posts:", posts);

        const comments = await getPostComments(posts[0].id);
        console.log("Comments:", comments);
    } catch (error) {
        console.error("Error:", error);
    }
}

getFullData();