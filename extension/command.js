const reset = document.getElementById("reset")
const input = document.getElementById("speed")
const speedIndicator = document.getElementById("speedIndicator")
const ai = document.getElementById("ai")



reset.addEventListener('click',(async () => {
    input.value = 1
    ai.checked = false
}))

chrome.storage.local.get(["speed"]).then((result) => {   
    
    if (result.speed) {
        speedIndicator.innerHTML = result.speed+'x'
        input.value = result.speed
    } else {
        input.value = 1
    }


    chrome.storage.local.get(["ai"]).then((result) => {
    if (result.ai) {
        ai.checked = result.ai
    } else {
        ai.checked = false
    }

    setInterval(() => {
        chrome.storage.local.set({'ai':ai.checked})
        if (!ai.checked) {
            speedIndicator.innerHTML = input.value + 'x'
            chrome.storage.local.set({'speed':input.value})
        }
    },50)
    })

})
