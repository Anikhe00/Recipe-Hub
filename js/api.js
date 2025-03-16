// Generate a random meal
function fetchRandomMeal(recipe){
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
  .then(response => response.json())
  .then(data => recipe(data.meals[0]))
  .catch()
}

// Fetch recipes from the API based on user input
function fetchSearchMeal(searchInput, recipeResult){
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
  .then(response => response.json())
  .then(data => {
    if (data.meals){
      recipeResult(data.meals)
    } else recipeResult([])
  })
  .catch()
}

// Fetch meal details by ID
function fetchMealById(mealId, details) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
  .then(response => response.json())
  .then(data => details(data.meals[0]))
  .catch()
}

// Export both function
export {fetchRandomMeal, fetchSearchMeal, fetchMealById}