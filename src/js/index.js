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
// move to Favor

  


// make a handler of button "get a joke"
let jokeResult = {};
function handleJoke() {
  const url = makeUrl();
  let objectForJoke = jokeRes(url).then(response => {
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
  }
    return jokeResult;
  }).then(
    res => {
      let cardJoke = document.createElement('div');
      cardJoke.classList.add('card-joke');
      let emptyHeart = document.createElement('div');
      emptyHeart.classList.add('empty-heart');
      emptyHeart.innerHTML = `<svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 17C9.71527 17 9.44077 16.9015 9.22684 16.7224C8.41888 16.0475 7.63992 15.4132 6.95267 14.8536L6.94916 14.8507C4.93423 13.2102 3.19427 11.7935 1.98364 10.3979C0.630341 8.83778 0 7.35852 0 5.74252C0 4.17244 0.563507 2.72395 1.58661 1.66367C2.62192 0.590857 4.04251 0 5.58716 0C6.74164 0 7.79892 0.348712 8.72955 1.03637C9.19922 1.38348 9.62494 1.80829 10 2.3038C10.3752 1.80829 10.8008 1.38348 11.2706 1.03637C12.2012 0.348712 13.2585 0 14.413 0C15.9575 0 17.3782 0.590857 18.4135 1.66367C19.4366 2.72395 20 4.17244 20 5.74252C20 7.35852 19.3698 8.83778 18.0165 10.3978C16.8059 11.7935 15.0661 13.2101 13.0515 14.8504C12.363 15.4108 11.5828 16.0461 10.773 16.7227C10.5592 16.9015 10.2846 17 10 17ZM5.58716 1.11932C4.37363 1.11932 3.25882 1.58203 2.44781 2.42232C1.62476 3.2753 1.17142 4.45439 1.17142 5.74252C1.17142 7.10165 1.70013 8.31719 2.88559 9.68375C4.03137 11.0047 5.73563 12.3923 7.70889 13.9989L7.71255 14.0018C8.4024 14.5635 9.18442 15.2003 9.99832 15.8802C10.8171 15.199 11.6003 14.5612 12.2916 13.9986C14.2647 12.392 15.9688 11.0047 17.1146 9.68375C18.2999 8.31719 18.8286 7.10165 18.8286 5.74252C18.8286 4.45439 18.3752 3.2753 17.5522 2.42232C16.7413 1.58203 15.6264 1.11932 14.413 1.11932C13.524 1.11932 12.7078 1.38931 11.9872 1.92171C11.3449 2.39637 10.8975 2.99642 10.6352 3.41627C10.5003 3.63217 10.2629 3.76105 10 3.76105C9.73709 3.76105 9.49966 3.63217 9.36478 3.41627C9.10263 2.99642 8.65524 2.39637 8.01285 1.92171C7.29218 1.38931 6.47598 1.11932 5.58716 1.11932Z" fill="#FF6767"/>
      </svg>`;
      emptyHeart.addEventListener('click', () => { 
        emptyHeart.innerHTML = `<svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.4134 1.66367C17.3781 0.590857 15.9575 0 14.413 0C13.2585 0 12.2012 0.348712 11.2704 1.03637C10.8008 1.38348 10.3752 1.80814 10 2.3038C9.62494 1.80829 9.19922 1.38348 8.7294 1.03637C7.79877 0.348712 6.74149 0 5.58701 0C4.04251 0 2.62177 0.590857 1.58646 1.66367C0.563507 2.72395 0 4.17244 0 5.74252C0 7.35852 0.630341 8.83778 1.98364 10.3979C3.19427 11.7935 4.93423 13.2102 6.94916 14.8507C7.63718 15.411 8.41705 16.046 9.22684 16.7224C9.44077 16.9015 9.71527 17 10 17C10.2846 17 10.5592 16.9015 10.7729 16.7227C11.5826 16.0461 12.363 15.4108 13.0513 14.8503C15.0659 13.2101 16.8059 11.7935 18.0165 10.3978C19.3698 8.83778 20 7.35852 20 5.74238C20 4.17244 19.4365 2.72395 18.4134 1.66367Z" fill="#FF6767"/>
        </svg>`;
        document.querySelector('.right-side').prepend(cardJoke);
      });
      cardJoke.append(emptyHeart);
      let jokeID = document.createElement('div');
      jokeID.classList.add('joke-id');
      jokeID.innerHTML = 'ID: <a href = "/">' + res.id + '</a>';
      cardJoke.append(jokeID);
      
      let chatPicture = document.createElement('div');
      chatPicture.classList.add('chat');
      chatPicture.innerHTML = `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="20" fill="#FFFFFF"/>
      <path d="M27.2504 11H12.7496C11.2335 11 10 12.2333 10 13.7496V22.6238C10 24.1367 11.2281 25.368 12.7399 25.3734V29.4004L18.5271 25.3734H27.2504C28.7665 25.3734 30 24.1399 30 22.6238V13.7496C30 12.2333 28.7665 11 27.2504 11ZM28.8281 22.6238C28.8281 23.4937 28.1204 24.2015 27.2504 24.2015H18.1594L13.9117 27.1573V24.2015H12.7496C11.8796 24.2015 11.1719 23.4937 11.1719 22.6238V13.7496C11.1719 12.8795 11.8796 12.1719 12.7496 12.1719H27.2504C28.1204 12.1719 28.8281 12.8795 28.8281 13.7496V22.6238Z" fill="#ABABAB"/>
      <path d="M15.3529 15.1407H24.6471V16.3126H15.3529V15.1407Z" fill="#ABABAB"/>
      <path d="M15.3529 17.6407H24.6471V18.8126H15.3529V17.6407Z" fill="#ABABAB"/>
      <path d="M15.3529 20.1407H24.6471V21.3126H15.3529V20.1407Z" fill="#ABABAB"/>
      </svg>`;
      cardJoke.append(chatPicture);
      let jokeText = document.createElement('div');
      jokeText.classList.add('joke-text');
      jokeText.innerHTML = res.value;
      cardJoke.append(jokeText);
      
      let lastUpdate = document.createElement('div');
      lastUpdate.classList.add('last-update');
      lastUpdate.innerHTML = `Last update: ${res.time} hours ago`;
      cardJoke.append(lastUpdate);
      
      let categ = document.createElement('div');
      categ.classList.add('topic');
      categ.classList.add('topic-card');
      categ.innerHTML = res.category;
      cardJoke.append(categ);

      document.querySelector('.left-side_wrapper-down').prepend(cardJoke);

  })
 
}




// block making of req
const getJoke = document.getElementById('get-joke');
getJoke.addEventListener('click', handleJoke);

{/* <div class="card-joke">
            <div class="empty-heart">
              <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 17C9.71527 17 9.44077 16.9015 9.22684 16.7224C8.41888 16.0475 7.63992 15.4132 6.95267 14.8536L6.94916 14.8507C4.93423 13.2102 3.19427 11.7935 1.98364 10.3979C0.630341 8.83778 0 7.35852 0 5.74252C0 4.17244 0.563507 2.72395 1.58661 1.66367C2.62192 0.590857 4.04251 0 5.58716 0C6.74164 0 7.79892 0.348712 8.72955 1.03637C9.19922 1.38348 9.62494 1.80829 10 2.3038C10.3752 1.80829 10.8008 1.38348 11.2706 1.03637C12.2012 0.348712 13.2585 0 14.413 0C15.9575 0 17.3782 0.590857 18.4135 1.66367C19.4366 2.72395 20 4.17244 20 5.74252C20 7.35852 19.3698 8.83778 18.0165 10.3978C16.8059 11.7935 15.0661 13.2101 13.0515 14.8504C12.363 15.4108 11.5828 16.0461 10.773 16.7227C10.5592 16.9015 10.2846 17 10 17ZM5.58716 1.11932C4.37363 1.11932 3.25882 1.58203 2.44781 2.42232C1.62476 3.2753 1.17142 4.45439 1.17142 5.74252C1.17142 7.10165 1.70013 8.31719 2.88559 9.68375C4.03137 11.0047 5.73563 12.3923 7.70889 13.9989L7.71255 14.0018C8.4024 14.5635 9.18442 15.2003 9.99832 15.8802C10.8171 15.199 11.6003 14.5612 12.2916 13.9986C14.2647 12.392 15.9688 11.0047 17.1146 9.68375C18.2999 8.31719 18.8286 7.10165 18.8286 5.74252C18.8286 4.45439 18.3752 3.2753 17.5522 2.42232C16.7413 1.58203 15.6264 1.11932 14.413 1.11932C13.524 1.11932 12.7078 1.38931 11.9872 1.92171C11.3449 2.39637 10.8975 2.99642 10.6352 3.41627C10.5003 3.63217 10.2629 3.76105 10 3.76105C9.73709 3.76105 9.49966 3.63217 9.36478 3.41627C9.10263 2.99642 8.65524 2.39637 8.01285 1.92171C7.29218 1.38931 6.47598 1.11932 5.58716 1.11932Z" fill="#FF6767"/>
              </svg>
            </div>
            <div class="joke-id">ID: <a href="/">XNaAxUduSw6zANDaIEab7A </a> 
            </div>
            <div class="chat">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="20" fill="#FFFFFF"/>
                  <path d="M27.2504 11H12.7496C11.2335 11 10 12.2333 10 13.7496V22.6238C10 24.1367 11.2281 25.368 12.7399 25.3734V29.4004L18.5271 25.3734H27.2504C28.7665 25.3734 30 24.1399 30 22.6238V13.7496C30 12.2333 28.7665 11 27.2504 11ZM28.8281 22.6238C28.8281 23.4937 28.1204 24.2015 27.2504 24.2015H18.1594L13.9117 27.1573V24.2015H12.7496C11.8796 24.2015 11.1719 23.4937 11.1719 22.6238V13.7496C11.1719 12.8795 11.8796 12.1719 12.7496 12.1719H27.2504C28.1204 12.1719 28.8281 12.8795 28.8281 13.7496V22.6238Z" fill="#ABABAB"/>
                  <path d="M15.3529 15.1407H24.6471V16.3126H15.3529V15.1407Z" fill="#ABABAB"/>
                  <path d="M15.3529 17.6407H24.6471V18.8126H15.3529V17.6407Z" fill="#ABABAB"/>
                  <path d="M15.3529 20.1407H24.6471V21.3126H15.3529V20.1407Z" fill="#ABABAB"/>
                  </svg>                                  
            </div>
            <div class="joke-text">
              Some text from API
            </div>
            <div class="last-update">
              Last update: Some time ago
            </div>
            <div class="topic topic-card">
              Category
            </div> 
                              
          </div> */}







// const jokeText = document.querySelector('.joke-text');
// let result = jokeRes(urls.random)
//   .then(response => {
//   jokeText.innerHTML = response.value;
//   // add ...
//   return response.id;
// });






