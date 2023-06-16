import { async } from 'regenerator-runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';
import PaginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import searchView from './views/searchView.js';
import paginationView from './views/paginationView.js';

// const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// Javascript, Nodejs, React, Typescript, Angular, SpringBoot, Java

// Burası parcel ile ilgili
// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    // resultsView.renderSpinner();
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();
    // renderSpinner(recipeContainer);

    // Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // Loading Recipe
    await model.loadRecipe(id);
    // const { recipe } = model.state;

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    // alert(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) {
      console.log(`${query}`);
      resultsView._clear();
      resultsView.renderError(`Please write a recipe !`);
      return;
    }
    // if (!query) return;   `Sadece return ediyor, diğeri spinner'i temizleyip error message bastırıyor.`

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) render results
    // console.log(model.state.search.results);

    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    // 4) render pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

// controlRecipes();

// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);

// Publisher subscriber pattern !

// Publisher subscriber pattern !

const controlPagination = function (goToPage) {
  console.log(' page Controller');

  // Render new results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 4) Render new pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe servings
  model.updateServings(newServings);

  //Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};

init();
