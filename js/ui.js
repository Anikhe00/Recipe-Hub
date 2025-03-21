const recipeSection = document.getElementById("recipe-cards")

// Create the recipe card using data exracted from the API
function createRecipeCard(meal) {

  // Extract recipe data and store in a variable
  const mealName = meal.strMeal
  const youtubeLink = meal.strYoutube
  const mealImage = meal.strMealThumb
  const mealCategory = meal.strCategory
  const mealId = meal.idMeal

  // Create recipe card and assign the data extracted from the API to the each counterparts

  let recipeCard = document.createElement("div")
  recipeCard.classList.add("recipe-card")

  let recipeImgIcon = document.createElement("div")
  recipeImgIcon.classList.add("img-and-like-icon")

  let recipeImg = document.createElement("img")
  recipeImg.classList.add("recipe-image")
  recipeImg.src = mealImage

  let likeContainer = document.createElement("div")
  likeContainer.classList.add("icon")

  let likeIcon = document.createElement("svg")
  likeIcon.classList.add("like-icon")
  likeIcon.innerHTML = `<svg class="like-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 4C4.4625 4 2 6.4625 2 9.5C2 15 8.5 20 12 21.163C15.5 20 22 15 22 9.5C22 6.4625 19.5375 4 16.5 4C14.64 4 12.995 4.9235 12 6.337C11.4928 5.61469 10.819 5.0252 10.0357 4.61841C9.25238 4.21162 8.38263 3.9995 7.5 4Z" fill="currenColor" fill-opacity="0.3" stroke="currenColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`

  let recipeDetails = document.createElement("div")
  recipeDetails.classList.add("recipe-details")

  let recipeName = document.createElement("p")
  recipeName.classList.add("recipe-name")
  recipeName.textContent = mealName

  let categoryContainer = document.createElement("div")
  categoryContainer.classList.add("category")

  let categoryIcon = document.createElement("svg")
  categoryIcon.classList.add("category-icon")
  categoryIcon.innerHTML = `<svg class="category-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="16" height="16" fill="none"/>
                <g id="fluent-emoji-high-contrast:fork-and-knife-with-plate">
                <g id="Group">
                <path id="Vector" d="M3.41 10.2875V12.2045C3.99572 12.9225 4.73397 13.501 5.57115 13.898C6.40833 14.2951 7.32344 14.5007 8.25 14.5C10.412 14.5 12.318 13.402 13.44 11.7335V9.04651C13.056 11.568 10.8785 13.5 8.25 13.5C6.073 13.5 4.2055 12.175 3.41 10.2875ZM12.515 5.18801V4.32701C12.5133 4.1371 12.5445 3.94833 12.607 3.76901C11.4415 2.63282 9.87766 1.99788 8.25 2.00001C6.79343 1.99784 5.38222 2.50653 4.262 3.43751L4.2645 3.46801L4.265 3.48151V4.83151C4.75749 4.25646 5.36874 3.79496 6.05667 3.47879C6.74461 3.16261 7.49289 2.99927 8.25 3.00001C10.007 3.00001 11.562 3.86301 12.515 5.18801Z" fill="currenColor"/>
                <path id="Vector_2" d="M12.25 8.2499C12.25 9.31077 11.8286 10.3282 11.0784 11.0783C10.3283 11.8285 9.31087 12.2499 8.25 12.2499C7.18913 12.2499 6.17172 11.8285 5.42157 11.0783C4.67143 10.3282 4.25 9.31077 4.25 8.2499C4.25 7.18904 4.67143 6.17162 5.42157 5.42148C6.17172 4.67133 7.18913 4.2499 8.25 4.2499C9.31087 4.2499 10.3283 4.67133 11.0784 5.42148C11.8286 6.17162 12.25 7.18904 12.25 8.2499ZM8.25 11.7499C8.70963 11.7499 9.16475 11.6594 9.58939 11.4835C10.014 11.3076 10.3999 11.0498 10.7249 10.7248C11.0499 10.3998 11.3077 10.0139 11.4836 9.58929C11.6595 9.16465 11.75 8.70953 11.75 8.2499C11.75 7.79028 11.6595 7.33515 11.4836 6.91051C11.3077 6.48587 11.0499 6.10003 10.7249 5.77503C10.3999 5.45002 10.014 5.19222 9.58939 5.01632C9.16475 4.84043 8.70963 4.7499 8.25 4.7499C7.32174 4.7499 6.4315 5.11865 5.77513 5.77503C5.11875 6.43141 4.75 7.32165 4.75 8.2499C4.75 9.17816 5.11875 10.0684 5.77513 10.7248C6.4315 11.3812 7.32174 11.7499 8.25 11.7499ZM14.995 3.9699C14.995 3.5199 14.63 3.1549 14.18 3.1549C13.53 3.1549 13.01 3.6799 13.015 4.3249V7.0999C13.015 7.7264 13.378 8.2874 13.94 8.5414V12.8499C13.94 13.1099 14.15 13.3199 14.41 13.3199H14.525C14.785 13.3199 14.995 13.1099 14.995 12.8499V3.9699ZM3.41 3.1549C3.31983 3.1549 3.23335 3.19072 3.16958 3.25449C3.10582 3.31825 3.07 3.40473 3.07 3.4949V4.8399C3.07 4.9399 2.99 5.0149 2.895 5.0149C2.795 5.0149 2.72 4.9349 2.72 4.8399V3.5099C2.72 3.3249 2.575 3.1599 2.39 3.1549C2.195 3.1499 2.035 3.3049 2.035 3.4949V4.8399C2.035 4.9399 1.955 5.0149 1.86 5.0149C1.76 5.0149 1.685 4.9349 1.685 4.8399V3.5099C1.685 3.3249 1.54 3.1599 1.355 3.1549C1.16 3.1499 1 3.3049 1 3.4949V5.7849C1 6.2359 1.2185 6.6384 1.5545 6.8894C1.855 7.0589 1.855 7.8349 1.855 7.8349V12.8449C1.855 13.1049 2.065 13.3149 2.325 13.3149H2.44C2.7 13.3149 2.91 13.1049 2.91 12.8449V7.8349C2.91 7.8349 2.91 7.0894 3.2105 6.8894C3.38242 6.76107 3.52205 6.59442 3.6183 6.4027C3.71456 6.21097 3.76479 5.99944 3.765 5.7849V3.4949C3.75994 3.40379 3.72046 3.318 3.65456 3.25488C3.58866 3.19177 3.50125 3.15603 3.41 3.1549Z" fill="currenColor"/>
                </g>
                </g>
                </svg>`
  let categoryName = document.createElement("p")
  categoryName.classList.add("category-name")
  categoryName.textContent = mealCategory

  // Make the card clickable
  recipeCard.addEventListener("click", function() {
    localStorage.setItem("selectedMeal", JSON.stringify(meal))
    window.location.href = `details.html`
  })

  // Append the content to their various parents
  categoryContainer.append(categoryIcon, categoryName)
  recipeDetails.append(recipeName, categoryContainer)
  likeContainer.append(likeIcon)
  recipeImgIcon.append(recipeImg, likeContainer)
  recipeCard.append(recipeImgIcon, recipeDetails)

  // Append the new recipe card to the UI
  recipeSection.append(recipeCard)
}

// Clear random meal cards and display new cards based on search results
function clearRecipeSection(){
  recipeSection.innerHTML = " "
}

// Export the functions
export {createRecipeCard}
export {clearRecipeSection}