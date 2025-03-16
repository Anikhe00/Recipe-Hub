import { fetchRandomMeal, fetchSearchMeal } from "./api.js";
import { createRecipeCard, clearRecipeSection } from "./ui.js";


// Bring in data from the html
const input = document.getElementById("search-input")
const recipeSection = document.getElementById("recipe-cards")

// Fetch random meals when the page loads
document.addEventListener("DOMContentLoaded", function() {
  // Check if we already have stored meals
  const storedMeals = localStorage.getItem('randomMeals');
  
  if (storedMeals) {
    // If we have stored meals, use them
    const meals = JSON.parse(storedMeals);
    clearRecipeSection();
    meals.forEach(meal => createRecipeCard(meal));
  } else {
    // If no stored meals, fetch new ones
    recipeSection.innerHTML = '<p>Loading recipes...</p>';
    loadRandomMeals().catch(error => {
      console.error('Failed to load random meals:', error);
      recipeSection.innerHTML = '<p>Failed to load recipes. Please try refreshing the page.</p>';
    });
  }
})

let debounceTimer;

// Listen for user input in the search field and fetch recipes from the API 
input.addEventListener("input", function(event){
  // Clear the previous timer
  clearTimeout(debounceTimer)

  // Prevent default form submission
  event.preventDefault()
  
  // Wait before firing API
  debounceTimer = setTimeout( function() {
    // Collect input data or value
    const searchInput = input.value.trim()

    // Check if user inputs a value and if any meal is found
    if (searchInput !== ""){
      // Clear recipes section to remove the random meals
      clearRecipeSection()
      // Show loading state
      recipeSection.innerHTML = '<p>Searching...</p>';
      
      fetchSearchMeal(searchInput, function(meals){
        clearRecipeSection();
        if (meals.length > 0){
          meals.forEach(createRecipeCard)
        } else {
          recipeSection.innerHTML = "<p>No recipes found. Try modifying your search.</p>"
        }
      })
    } else {
      // If input is cleared, show stored random meals
      const storedMeals = localStorage.getItem('randomMeals');
      clearRecipeSection();
      if (storedMeals) {
        const meals = JSON.parse(storedMeals);
        meals.forEach(meal => createRecipeCard(meal));
      }
    }
  // Delay API call by 0.7s
  }, 700)
})

// Fetch and display random meals sequentially
async function loadRandomMeals() {
  const totalMeals = 24;
  const fetchedMeals = new Set(); // To track unique meals
  const mealsArray = []; // Array to store all fetched meals

  clearRecipeSection();

  for (let i = 0; i < totalMeals; i++) {
    try {
      await new Promise((resolve, reject) => {
        fetchRandomMeal((meal) => {
          try {
            // Only add the meal if we haven't seen it before
            if (!fetchedMeals.has(meal.idMeal)) {
              fetchedMeals.add(meal.idMeal);
              createRecipeCard(meal);
              mealsArray.push(meal); // Store the meal in our array
            } else {
              // If we got a duplicate, try fetching another one
              i--;
            }
            resolve();
          } catch (error) {
            reject(error);
          }
        });
      });
    } catch (error) {
      console.error('Error loading meal:', error);
      continue;
    }
  }

  // Store all fetched meals in localStorage
  localStorage.setItem('randomMeals', JSON.stringify(mealsArray));
}