// TASK 11.3 - Promise Chaining

// Helper functions (reused from Task 11.2)

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

// EXERCISE 1: Chain Promises

getUserData(1)
    .then(user => {
        console.log("User:", user);
        return getUserPosts(user.id);
    })
    .then(posts => {
        console.log("Posts:", posts);
        return getPostComments(posts[0].id);
    })
    .then(comments => {
        console.log("Comments:", comments);
    })
    .catch(error => {
        console.error("Error:", error);
    });

// EXERCISE 2: Promise.all

const promise1 = getUserData(1);
const promise2 = getUserData(2);
const promise3 = getUserData(3);

Promise.all([promise1, promise2, promise3])
    .then(results => {
        console.log("All users:", results);
    })
    .catch(error => {
        console.error("One failed:", error);
    });

// EXERCISE 3: Promise.race


const fast = new Promise(resolve => setTimeout(() => resolve("Fast wins!"), 500));
const slow = new Promise(resolve => setTimeout(() => resolve("Slow wins!"), 2000));

Promise.race([fast, slow])
    .then(result => {
        console.log("Winner:", result);
    });

// BUILD: Fetch 3 users simultaneously

Promise.all([getUserData(1), getUserData(2), getUserData(3)])
    .then(users => {
        console.log("--- All 3 users fetched at once ---");
        users.forEach(user => console.log(user));
    })
    .catch(error => {
        console.error("Error fetching users:", error);
    });