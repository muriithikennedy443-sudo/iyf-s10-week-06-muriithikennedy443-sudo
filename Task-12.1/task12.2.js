// TASK 12.1 - Fetch API Basics

// EXERCISE 1: Your First Fetch

fetch("https://jsonplaceholder.typicode.com/users/1")
    .then(response => {
        console.log("Response object:", response);
        console.log("Status:", response.status);
        console.log("OK:", response.ok);
        return response.json(); // Parse JSON
    })
    .then(data => {
        console.log("User data:", data);
    })
    .catch(error => {
        console.error("Fetch error:", error);
    });

// EXERCISE 2: Fetch with Async/Await

async function getUser(id) {
    try {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/users/${id}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch user:", error);
    }
}

// PRACTICE: Fetch and display

// 1. A single user
async function getSingleUser() {
    const user = await getUser(1);
    console.log("Single user:", user);
}

// 2. All users
async function getAllUsers() {
    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );
        const users = await response.json();
        console.log("All users:", users);
    } catch (error) {
        console.error("Error fetching all users:", error);
    }
}

// 3. Posts for user 1
async function getUserPosts() {
    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users/1/posts"
        );
        const posts = await response.json();
        console.log("User 1 posts:", posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
}

getSingleUser();
getAllUsers();
getUserPosts();