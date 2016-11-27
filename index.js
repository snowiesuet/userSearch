'use strict'

window.onload = function() {
  onStart();
}

function onStart () {
  $.ajax({
    url: 'data.json',
    type: 'get',
    dataType: 'json',
  }).done(dataset => {
    if (dataset.length > 0) {
      dataset.forEach(data => {
        const userID = data.login
        const avatar = data.avatar_url
        const htmlUrl = data.html_url
        const followers = data.followers_url
        const repos = data.repos_url
        const type = data.type
        const rowTemplate =
          `<div class="thumbnail">
            <div class="content">
              <img src="${avatar}"</img>
              <div class="info">
                <div class="name">${userID}</div>
                <div>Followers: ${followers.length}</div>
                <div>Repos: ${repos.length}</div>
                <div>Type: ${type}</div>
                <a href="${htmlUrl}">View more</a>
              </div>
            </div>
          </div>`
      $('.container').append(rowTemplate)
      })
    } else {
      //if no data, display this!
      $('#searchResults').html(`<div class="thumbnail ">No data available.</div>`)
    }
  })
}

function sortData(value) {
  arr = arr.sort(function(a, b) {
    return (a[value] > b[value]);
  });
}
