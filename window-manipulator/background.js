const tinyUrl =  "https://tinyurl.com/"
function doFetch(url) {
    return fetch(tinyUrl + url,{
        method: 'GET'
    }).then((resp)=>{
        if (resp.status === 404) {
            return({success: `URL ${url} is available`})
        } else {
            return Promise.reject({error: `URL ${url} unavailable`})
        }
    }).catch(reason=>{
        let reasonStr = reasonStr
        if (typeof reason === 'object') {
            reasonStr = JSON.stringify(reason)
        }
        return ({error: `URL ${url}: could not verify (${reasonStr})`})
    })
}
browser.runtime.onMessage.addListener((msg,sender)=>{
    console.log("inside background sendmessage event handler")
    if (!!msg && msg.url) {
        return doFetch(msg.url)
    }
})