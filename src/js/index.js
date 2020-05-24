'use strict';

const urls = {
  random: 'https://api.chucknorris.io/jokes/random',
  category: 'https://api.chucknorris.io/jokes/random?category={category}',
  search: 'https://api.chucknorris.io/jokes/search?query={query}',
}
// block radio inputs
const modes = document.getElementsByName('r-c-s');
const categories = document.getElementsByName('an-ca-ce-dev');
const cat = document.getElementById('topics');
const sea = document.querySelector('.search');
const seaText = document.querySelector('.search-text');
let checkedId = 'random';
let checkedCategory = 'animal';
cat.style.display = 'none';
sea.style.top = '310px'
// choose the mode of request
function modeChange() {
  for (let mode of modes) {
  if (mode.checked) checkedId = mode.id;
  }
  if (checkedId !== 'categor') {
    cat.style.display = 'none';
    sea.style.top = '310px';
  } else {
    cat.style.display = 'block';
    sea.style.top = '367px'
  }
  checkedId === 'search' ?
    seaText.classList.remove('disp-none') :
    seaText.classList.add('disp-none');
  return checkedId
}
// choose the category of request
function modeCategory() {
  if (checkedId !== 'categor') return;
  for (let category of categories) { 
    category.nextElementSibling.firstElementChild.classList.remove('checked');
    if (category.checked) checkedCategory = category.id;
  }
  let findedInput = '.view-' + checkedCategory;
  let checkedInput = document.querySelector(findedInput).firstElementChild;
  checkedInput.classList.add('checked');
  return checkedCategory; 
}
// make url
const baseUrl = 'https://api.chucknorris.io/jokes/';
const searchValue = document.getElementById('search-text');

function makeUrl() {
  if (checkedCategory && checkedId === 'categor')  {
    return baseUrl + 'random?category=' + checkedCategory;  
  }
  if (checkedId === 'search' && searchValue.value.length >= 3) {
    return baseUrl + 'search?query=' + searchValue.value;
  }
  if (checkedId === 'random') {
    return baseUrl + 'random';
  }
}

// fetchin response
async function jokeRes(url) {
  let resp = await fetch(url);
  if (resp.ok) {
    return resp.json();
  }
  throw('Failed request' + resp.status);
}

// make a handler of button "get a joke"
let jokeResult = {};

function handleJoke() {
  const url = makeUrl();
  jokeRes(url).then(response => {
    if (response.hasOwnProperty('result') && response.result.length > 0) {
      jokeResult.value = response.result[0].value;
      jokeResult.id = response.result[0].id;
      jokeResult.time = Math.round(parseInt(Date.now() - Date.parse(response.result[0].created_at)) / 3600000);
      jokeResult.category = checkedCategory;
    } else {
    jokeResult.value = response.value;
    jokeResult.id =response.id;
    jokeResult.time = Math.round(parseInt(Date.now() - Date.parse(response.created_at)) / 3600000);
    jokeResult.category = checkedCategory;
    console.log(response.created_at);

  }
    console.log(jokeResult);
    return jokeResult;
  })
 
}




// block making of req
const getJoke = document.getElementById('get-joke');
getJoke.addEventListener('click', handleJoke);



// const jokeText = document.querySelector('.joke-text');
// let result = jokeRes(urls.random)
//   .then(response => {
//   jokeText.innerHTML = response.value;
//   // add ...
//   return response.id;
// });






