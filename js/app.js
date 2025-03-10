import { fetchRandomMeal, fetchSearchMeal } from "./api.js";
import { createRecipeCard, clearRecipeSection } from "./ui.js";


// Bring in data from the html
const form = document.getElementById("form")
const input = document.getElementById("search-input")
const recipeSection = document.getElementById("recipe-cards")

// Fetch 18 random meals when the page loads
document.addEventListener("DOMContentLoaded", function() {
  for (let x = 0; x < 18; x++){
    fetchRandomMeal(createRecipeCard)
  }
})

// Listen for user input in the search field and fetch recipes from the API 
input.addEventListener("input", function(event){
  
  // Collect input data or value
  const searchInput = input.value.trim()

  // Check if user inputs a value and if any meal is found
  if (searchInput !== ""){
    // Clear recipes section to remove the random meals
    clearRecipeSection()
    fetchSearchMeal(searchInput, function(meals){
      if (meals.length > 0){
        meals.forEach(createRecipeCard)
      }else {
        recipeSection.innerHTML = "<p>No Recipe Found. Try modifying your search.</>"
      }
    })
  } else {
    // If input is cleared, reload random meals
    clearRecipeSection()
    fetchRandomMeal(createRecipeCard)
  }
})