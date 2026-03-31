# Week 06: Async JavaScript & Fetch API

## Author
- **Name:** Kennedy Muriithi
- **GitHub:** [@muriithikennedy443-sudo](https://github.com/muriithikennedy443-sudo)
- **Date:** March 31, 2026

## Project Description
A collection of JavaScript tasks covering asynchronous programming concepts including callbacks, promises, async/await, and the Fetch API. The final project is a fully functional Weather Dashboard built with the OpenWeatherMap API.

## Technologies Used
- HTML5
- CSS3
- JavaScript (ES6+)
- Node.js
- Fetch API
- OpenWeatherMap API
- localStorage API
- JSONPlaceholder API

## Features

- Understanding the JavaScript event loop
- Callback pattern and callback hell demonstration
- Promise creation, chaining, Promise.all and Promise.race
- Async/await conversion from promise chains
- Error handling with try/catch/finally
- Sequential vs parallel async execution
- Fetching data from real REST APIs
- Displaying API data dynamically in the DOM
- Live search filtering
- Sort by name A-Z and Z-A
- Filter users by city using dropdown
- Weather search by city name
- Weather icon, temperature, humidity, wind, pressure display
- Error handling for invalid cities and network issues
- Loading states while fetching
- Recent searches saved in localStorage

## How to Run

```bash
cd Task-11.1
node task11.1.js
```

### For browser tasks (Task 12.1 - 12.4 & Weather Dashboard)
1. Open the folder in VS Code
2. Right-click `index.html`
3. Click **Open with Live Server**

### For Weather Dashboard
1. Get a free API key from [openweathermap.org](https://openweathermap.org)
2. Open `Weather-Dashboard/app.js`
3. Replace `"your_api_key_here"` with your actual API key
4. Open `index.html` with Live Server

## Lessons Learned
- How the JavaScript event loop handles synchronous and asynchronous code
- Why callbacks lead to "callback hell" and how promises solve that problem
- How async/await makes asynchronous code read like synchronous code
- How to fetch data from real REST APIs using the Fetch API
- How to handle API errors gracefully with try/catch/finally
- How to display dynamic API data in the DOM
- How to implement live search, sorting and filtering
- How to use localStorage to persist data across sessions

## Challenges Faced
- Understanding why setTimeout with 0ms still runs after synchronous code
- Managing deeply nested callbacks and refactoring them to promises
- Getting git push to work with unrelated histories error
- Understanding the difference between sequential and parallel async execution
- Handling different API error types (404, network failure, invalid key)
- Keeping UI states (loading, error, success) in sync with async operations