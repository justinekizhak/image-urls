window.onload = function () {
  chrome.runtime.onMessage.addListener(function (msg, _, sendResponse) {
    if (msg.action === 'getAlt') {
      const data = document.body.querySelectorAll('button img')
      if (data.length > 1) {
        sendResponse(data[1].alt)
      } else {
        sendResponse(null)
      }
    } else if (msg.action === 'getCreator') {
      const data = document.head.querySelector("meta[name='twitter:creator']")
        .content
      sendResponse(data)
    } else if (msg.action === 'getTitle') {
      const data = document.head.querySelector("meta[name='twitter:title']")
        .content
      sendResponse(data)
    } else if (msg.action === 'getImageUrl') {
      const data = document.body.querySelectorAll('button img')
      if (data.length > 1) {
        sendResponse(data[1].baseURI)
      } else {
        sendResponse(null)
      }
    }
  })
}
