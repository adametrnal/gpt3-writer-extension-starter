const insert = (content) => {
    //Find the gmail message window
    const elements = document.querySelectorAll('[aria-label="Message Body"]');

    if(elements.length === 0) {
        return;
    }

    //not totally sure why we get an array of 4 elements, but the correct one appears to be the last
    const element = elements[elements.length-1]
    
    //do my formatting
    const outputArr = content.split("\n");
    let outputStr = "";

    for(let i=2; i < outputArr.length; i++){
      let lineItem = outputArr[i].split("|");
      let giftItem = {name:lineItem[1], price:lineItem[2], review:lineItem[3]};
      outputStr += `${i-1}. ${giftItem.name}, ${giftItem.price} - ${giftItem.review}<br>`;
    }

    //insert the text
    element.innerHTML = outputStr;

}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'inject') {
        const {content} = request;

        const result = insert(content);

        console.log(content);
        
        if(!result) {
            sendResponse({ status: 'failed'});
        }
        sendResponse({ status: 'success'});
    }
});