'use strict'

//this is best viewed in modern browser that supports ES6

let tempData = [];

window.onload = function() {
  onStart();
}

function onStart () {
  $.ajax({
    url: 'https://api.github.com/users',
    type: 'get',
    dataType: 'json',
  }).success(dataset => {
    if (dataset.length > 0) {
      dataset.forEach(data => {
        const followers = data.followers_url
        const repos = data.repos_url
        tempData.push({
          userID: data.login,
          avatar: data.avatar_url,
          htmlUrl: data.html_url,
          followers: followers.length,
          repos: repos.length,
          type: data.type
        })
      })
    } else {
      //if no data, display this!
      $('#main').html(`<div class="thumbnail ">No data available.</div>`)
    }
  }).done(data =>{
    print()
  })
}

function print() {
  //clear the container before sorting
  $('.container').html('');
  for (let value of tempData) {
    const thumbnail =
    `<div class="thumbnail">
      <div class="content">
        <img src="${value.avatar}"</img>
        <div class="info">
          <div class="name">${value.userID}</div>
          <div>Followers: ${value.followers}</div>
          <div>Repos: ${value.repos}</div>
          <div>Type: ${value.type}</div>
          <a href="${value.htmlUrl}">View profile</a>
        </div>
      </div>
    </div>`
    $('.container').append(thumbnail)
  }
}

function sortData(param) {
  var value = param.value;
  //only works for ES6
  tempData = tempData.sort(function(a, b) {
    if (typeof a[value] == 'string') {
      return (a[value].toLowerCase() > b[value].toLowerCase());
    }
      return (a[value] > b[value]);
  });
  print()
}
