SERVER_PATH = "http://localhost:3000" // where your server is hosted

function speedCalc(duration) {
    return (0.75 * Math.log10((duration/60)) + 1).toFixed(2)
}

const setSpeed = (speed) => {
  try {
    document.querySelector("video").playbackRate = speed
  } catch {
    
  }
}

const calculatedSpeedUp = () => {
    var durationString = document.getElementsByClassName("ytp-time-duration")[0].innerHTML
    var duration = parseInt(durationString.split(':')[0])* 60 + parseInt(durationString.split(':')[1])
    if (speedCalc(duration) != NaN) {
        setSpeed(duration > 60 ? speedCalc(duration) : duration)
    }
}

const checkMusic = () => {
  try
  {
    document.getElementById("structured-description").querySelector("#items").getElementsByTagName("ytd-horizontal-card-list-renderer")[0].getAttribute("has-video-attribute-view-models")
    return chrome.storage.local.set({"speed":1})
    
  } catch (TypeError) {
  }
}

const aiSpeedUp = async (title) => {
    const response = await fetch(SERVER_PATH+'/predict',{method:'post',headers:{'Content-Type':"Application/JSON"},body:JSON.stringify({'message':title})})
    const prediction = await response.json()
    chrome.storage.local.set({"speed":prediction.prediction})
}

var lastTitle = undefined
setInterval(() => {
    var title = document.getElementsByClassName("ytp-title-text")[0].children[0].innerHTML
    if (title) {
    }
    if (title !== lastTitle) {
        lastTitle = title
        chrome.storage.local.get(['ai']).then((result) => {
          aiEnabled = result.ai
          if (aiEnabled) {
            aiSpeedUp(title)
          }
        })
        
    }
},500)


setInterval(() => {
  chrome.storage.local.get(["speed"]).then((result) => {
    setSpeed(result.speed)
  })
  chrome.storage.local.get(['ai']).then((result) => {
    aiEnabled = result.ai
  })
  checkMusic()
},500)

