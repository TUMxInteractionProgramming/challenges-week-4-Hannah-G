/* #6 start the #external #action and say hello */
console.log("App is alive");

/**
 * #6 #Switcher function for the #channels name in the right app bar
 * @param channelName Text which is set
 */


// #7 GLOBAL VARIABLES
var currentChannel = {}

var currentLocation = {
    longitude: 48.112108,
    latitude: 11.576861,
    what3words: 'dichterin.übungen.ausfällt'
}

function switchChannel(channelName) {
    //Log the channel switch
    console.log("Tuning in to channel", channelName);

    // #7 Write the new channel to the right app bar
    $('#channel-name').html(channelName.name);

    //#6 change the #channel #location
    $("#channel-location").html('by <a href="http://w3w.co/upgrading.never.helps" target="_blank"><strong>upgrading.never.helps</strong></a>');

    /* #7 star depending on object property */
    if (channelName.starred == true){
        // $('#channel-star').removeClass('far fa-star');
        // $('#channel-star').addClass('fas fa-star');

    } else{
        // $('#channel-star').removeClass('fas fa-star');
        // $('#channel-star').addClass('far fa-star');
        $('#channel-star').toggleClass('fas fa-star far fa-star');
    }

    /* #6 #highlight the selected #channel.
       This is inefficient (jQuery has to search all channel list items), but we'll change it later on */
    $('#channels li').removeClass('selected');
    $('#channels li:contains(' + channelName.name + ')').addClass('selected');

    // #7 Setting channelName to currentChannel variable
    currentChannel = channelName;

    // Test console logs
    // console.log("Current Channel", currentChannel);
    // console.log("Current location", currentLocation);
}

/* #7 #liking a channel on #click */
function star() {
    $('#channel-star').toggleClass('fas fa-star far fa-star');

    // #7 writing new Status of Star in the refering object
    currentChannel.starred = !currentChannel.starred
}

// #7 function starList() {
//     // jQuery to display correct star in channel list
//     $('.fas').toggleClass('fas fa-star far fa-star');

//     // writing Status of Star in the refering object
//     currentChannel.starred = !currentChannel.starred
// }

/**
 * #6 #taptab selects the given tab
 * @param tabId #id of the tab
 */
function selectTab(tabId) {
    // #6 #taptab #remove selection from all buttons...
    $('#tab-bar button').removeClass('selected');

    //...#6 #taptab #log the new tab on change...
    console.log('Changing to tab', tabId);

    //...#6 #taptab #add selection to the given tab button, its id is passed via the #argument tabId
    $(tabId).addClass('selected');
}

/**
 * #6 #toggle (show/hide) the emojis menu #smile
 */
function toggleEmojis() {
    /* $('#emojis').show(); // #show */
    $('#emojis').toggle(); // #toggle
}

// #8 Constructor Function for new chat messages
function Message(text){
    this.createdBy = currentLocation.what3words;
    this.latitude = currentLocation.latitude;
    this.longitude = currentLocation.longitude;
    this.createdOn = Date.now();
    this.expiresOn = this.createdOn + (1000 /*sec*/ * 60 /*min*/ * 15 /*hour*/ * 1 /*day*/ * 1);
    this.text = text;
    own = true;
}

// #8 sendMessage function
function sendMessage(){
    // creating new Message Element
    var sentMessage = new Message($('#messageInput').val());

    // Calling createMessageElement Function and appending it to Messages
    $('#messages').append(createMessageElement(sentMessage));

    // Clearing Message field
    $('#messageInput').val('');

    // Logging of Sent Message
    console.log('This created by ' + sentMessage.createdBy);
    console.log('created on ' + sentMessage.createdOn);
    // console.log('date now  ' + Date.now());
    // Currently not working
    console.log('expires on ' + sentMessage.expiresOn);
    console.log('This is the sent Message ' + sentMessage.text);
}

// #8 create message Element function
function createMessageElement(messageObject){
    
    // new epxires in variable
    console.log('expires on ' + messageObject.expiresOn);
    var expiresIn = Math.round(Date.now() - messageObject.expiresOn);
    
    console.log('expires in ' + expiresIn);

    // creating new html elements
    return $('<div>').addClass('message').append('<h3><a href="'+messageObject.createdBy+'" target="_blank"><strong>'+messageObject.createdBy+'</strong></a> '+messageObject.createdOn+' <em>:expiresIn: min. left</em></h3> <p>'+messageObject.text+'</p><button>+5 min.</button>');
}