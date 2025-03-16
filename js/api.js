// Generate a random meal
function fetchRandomMeal(recipe){
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (!data.meals || !data.meals[0]) {
        throw new Error('No meal data received');
      }
      recipe(data.meals[0]);
    })
    .catch(error => {
      console.error('Error fetching random meal:', error);
    });
}

// Fetch recipes from the API based on user input
function fetchSearchMeal(searchInput, recipeResult){
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (data.meals) {
        recipeResult(data.meals);
      } else {
        recipeResult([]);
      }
    })
    .catch(error => {
      console.error('Error fetching search results:', error);
      recipeResult([]);
    });
}

// Fetch meal details by ID
function fetchMealById(mealId, details) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (!data.meals || !data.meals[0]) {
        throw new Error('No meal found with that ID');
      }
      details(data.meals[0]);
    })
    .catch(error => {
      console.error('Error fetching meal details:', error);
    });
}

// Export functions
export {fetchRandomMeal, fetchSearchMeal, fetchMealById}