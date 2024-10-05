const fs = require('fs').promises; // Using promises for async file operations
let items = []; // Array to hold items
let categories = []; // Array to hold categories

// Function to initialize the data from JSON files
async function initialize() {
    try {
        const itemsData = await fs.readFile('./items.json', 'utf8'); // Adjust the path as necessary
        items = JSON.parse(itemsData);
        
        const categoriesData = await fs.readFile('./categories.json', 'utf8'); // Adjust the path as necessary
        categories = JSON.parse(categoriesData);
        console.log("Data initialized successfully.");

      } catch (err) {
        console.error("Failed to initialize data:", err);
        throw new Error("unable to read items or categories file");
    }
}

// Function to get published items
function getPublishedItems() {
    return new Promise((resolve, reject) => {
        const publishedItems = items.filter(item => item.published);
        if (publishedItems.length === 0) {
            return reject("no published items found");
        }
        resolve(publishedItems);
    });
}

// Function to get categories
function getCategories() {
    return new Promise((resolve, reject) => {
        if (categories.length === 0) {
            return reject("no categories found");
        }
        resolve(categories);
    });
}

// Function to get items by category
function getItemsByCategory(categoryId) {
    return new Promise((resolve, reject) => {
        const filteredItems = items.filter(item => item.category === categoryId && item.published);
        if (filteredItems.length === 0) {
            return reject("no items found for this category");
        }
        resolve(filteredItems);
    });
}

// Export functions for use in server.js
module.exports = {
    initialize,
    getPublishedItems,
    getCategories,
    getItemsByCategory,
};
