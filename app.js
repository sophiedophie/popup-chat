$(document).ready(function() {
    $('#chatInput').css('display', 'none');
    $('#chatContents').css('display', 'none');
});

var usrMsgInput = document.getElementById('userMessage');
var usrMsgSubmitBtn = document.getElementById('chatSubmit');
var chatContents = document.getElementById('chatContents');
var boxes = document.getElementsByClassName('box');
var userTemplate = "<div class='circle user-name'><div class='name'>User</div></div><div class='template template-user'><div class='conversations'><p>${message}</p></div></div>"
var ownerTemplate = "<div class='box'><div class='circle owner-name'><div class='name'>CoED</div></div><div class='template template-owner'><div class='conversations'><p>${message}</p></div></div></div>"
var emptyVar;

// as next step > if api.ai etc can be used (answering is available) then return message from CoED that we need message to process your question
// only user can input and don't need to see 'chatContents.children.length%2'

function sendMessage() {
    if (!usrMsgInput.value) {
        alert('you need to input message');
        return;
    }
    var template;
    chatContents.children.length % 2 === 0 ? template = ownerTemplate : template = userTemplate;
    
    template = template.replace('${message}', usrMsgInput.value);
    emptyVar = document.createElement('DIV');
    emptyVar.setAttribute('class', 'box')
    emptyVar.innerHTML = template;
    chatContents.appendChild(emptyVar);
    // scroll into view
    setTimeout(function(){
        document.getElementsByClassName('box')[chatContents.children.length - 1].scrollIntoView();            
    }, 300)

    // end of message sending
    usrMsgInput.value = '';
    emptyVar = '';
}

function showArea() {
    $('#chatArea').height(350);
    $('#chatContents')[0].style.display = '';
    $('#chatInput')[0].style.display = '';
}

function hideArea() {
    $('#chatArea').height(0);
    $('#chatContents')[0].style.display = 'none';
    $('#chatInput')[0].style.display = 'none';
}

var btn = document.getElementsByClassName('alignRight')[0];
btn.addEventListener('click', function() {
    $('#chatArea').height() === 0 ? showArea() : hideArea();
});

usrMsgInput.addEventListener('keydown', function(e){
    if (e.keyCode === 13) {
        sendMessage();
    }
});

usrMsgSubmitBtn.addEventListener('click', sendMessage);
