// Bring in the Ui elements
const recipesName = document.getElementById("recipes-name")
const recipesCategory = document.getElementById("category")
const instructions = document.getElementById("Instructions")
const ingredientContainer = document.getElementById("ingredients")
const videoContainer = document.getElementById("video")
const imageContainer = document.getElementById("recip-image")

// Get tab elements
const tabButtons = document.querySelectorAll('.tab-button')
const tabContents = document.querySelectorAll('.tab-content')

// Add click event listeners to tab buttons
tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons and contents
    tabButtons.forEach(btn => btn.classList.remove('active'))
    tabContents.forEach(content => content.classList.remove('active'))
    
    // Add active class to clicked button
    button.classList.add('active')
    
    // Get the tab name from button text and activate corresponding content
    const tabName = button.textContent.trim()
    const targetContent = document.getElementById(tabName === 'Instructions' ? 'Instructions' : 'ingredients')
    targetContent.classList.add('active')
  })
})

// Get the meal ID from localStorage
document.addEventListener("DOMContentLoaded", function(){
  // Get the recipe from local storage
  const theMeal = localStorage.getItem("selectedMeal")
  const meal = JSON.parse(theMeal)

  if(meal) {
    // Store recipe details in variables
    const recipeName = meal.strMeal
    const categoryName = meal.strCategory
    const recipeImage = meal.strMealThumb
    const mealInstructions = meal.strInstructions
    const mealYoutube = meal.strYoutube

    let ingredients = []
    for (let i = 1; i <= 20; i++) {
      let ingredient = meal[`strIngredient${i}`]
      let measure = meal[`strMeasure${i}`]

      if (ingredient && ingredient.trim() !== "") {
        ingredients.push(`${measure} ${ingredient}`)
      }
    }

    // Update the UI using stored variables
    recipesName.textContent = recipeName
    recipesCategory.textContent = categoryName
    imageContainer.src = recipeImage
    videoContainer.innerHTML = `<iframe src="https://www.youtube.com/embed/${mealYoutube.split("=")[1]}" allowfullscreen></iframe>`
    
    // Create a document fragment for ingredients
    const ingredientsFragment = document.createDocumentFragment()
    
    // Create and append ingredient list items to the fragment
    ingredients.forEach(ingredient => {
      const li = document.createElement('li')
      li.textContent = ingredient
      ingredientsFragment.appendChild(li)
    })
    
    // Clear existing ingredients and add the new ones
    ingredientContainer.innerHTML = ''
    ingredientContainer.appendChild(ingredientsFragment)

    // Add instructions to the Instructions tab
    const instructionsList = document.createElement('ol')
    mealInstructions.split('\n').filter(step => step.trim()).forEach(step => {
      const li = document.createElement('li')
      li.textContent = step.trim()
      instructionsList.appendChild(li)
    })
    instructions.innerHTML = ''
    instructions.appendChild(instructionsList)
  }
})

const backToHome = document.getElementById("back-to-home")

backToHome.addEventListener("click", function(){
  window.history.back()
})