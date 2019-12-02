var request = new XMLHttpRequest()
var clientId = "rld6l7li16hvcrbjo0k00sslkbs4k1"
var streamer = 'RagnarozSR'
var userId = null
var authorization = null

request.open('GET', 'https://api.twitch.tv/helix/users?login=' + streamer)
request.setRequestHeader('Client-ID', clientId)
request.send()
request.onload = function () {
    var res = JSON.parse(request.response)
    userId = res.data[0].id
    getLatestFollower(userId)
}

function getLatestFollower(id) {
    request.open('GET', 'https://api.twitch.tv/kraken/channels/' + id + '/follows');
    request.setRequestHeader('Client-ID', clientId)
    request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json')
    request.send()
    request.onload = function() {
        var follows = JSON.parse(request.response)
        document.getElementById('followContentText').innerHTML = follows.follows[0].user.display_name
        setTimeout(function() {
            getLatestFollower(id)
        }, 60000)
    }
}
