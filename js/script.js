/* #6 start the #external #action and say hello */
console.log("App is alive");

// CHANNELS ––––––––––––––––––––––––––––––––––––––––––––––––––

// current channel location
var currentChannel = {};
// my own channel location
var currentLocation = {
    longitude: 48.112076,
    latitude: 11.576779,
    what3words: '<a href="https://map.what3words.com/season.texted.trendy" target="_blank"><strong>season.texted.trendy</strong></a>'
};

console.log ("currentLocation", currentLocation);



// SWITCH CHANNELS
function switchChannel(channelName) {

    //#7 store channelName in the global variable currentChannel
    currentChannel = channelName;
    //#7 Log the currentChannel
    console.log("currentChannel", currentChannel);

    //Log the channel switch
    console.log("Tuning in to channel", channelName);

    //Write the new channel to the right app bar
    document.getElementById('channel-name').innerHTML = channelName.name;

    //#6 change the #channel #location
    document.getElementById('channel-location').innerHTML = channelName.location;

    /* #7 #liking channels on #click */
    (channelName.starred == true) ?
        $('#channel-star').attr('class', 'fas fa-star') :
        $('#channel-star').attr('class', 'far fa-star')


    /* #6 #highlight the selected #channel.
       This is inefficient (jQuery has to search all channel list items), but we'll change it later on */
    $('#channels li').removeClass('selected');
    $('#channels li:contains(' + channelName.name + ')').addClass('selected');

}

/* #6 #liking a channel on #click */
function star() {
    $('#channel-star').toggleClass('fas fa-star');
    $('#channel-star').toggleClass('far fa-star');
}



// TABBAR ––––––––––––––––––––––––––––––––––––––––––––––––––

function selectTab(tabId) {
    // #6 #taptab #remove selection from all buttons...
    $('#tab-bar button').removeClass('selected');

    //...#6 #taptab #log the new tab on change...
    console.log('Changing to tab', tabId);

    //...#6 #taptab #add selection to the given tab button
    $(tabId).addClass('selected');
}

// INPUT AREA ––––––––––––––––––––––––––––––––––––––––––––––––––

    function toggleEmojis(){
            $('#emojis').toggle(); // #toggle
        }



//#8 current date plus 15 minutes
var now15 = new Date();
now15.setMinutes (now15.getMinutes() +15);
now15 = new Date(now15);

//#8 current date
var now = Date.now();

//#8 expiresIn
var expiresInMilli = (now + 900000) - now;
var expiresInMin = expiresInMilli / 60000;

// MESSAGES––––––––––––––––––––––––––––––––––––––––––––––––––

// #8 Constructor Function for new chat messages
function Message(text){
    this.createdBy = currentLocation.what3words;
    this.latitude = currentLocation.latitude;
    this.longitude = currentLocation.longitude;
    this.createdOn = Date.now();
    this.expiresOn = this.createdOn + (1000 /*sec*/ * 60 /*min*/ * 15 /*hour*/ * 1 /*day*/ * 1);
    this.text = text;
    this.own = true;
}

// #8 sendMessage function
function sendMessage() {
    var writtenMessage = $('#input-message').val();

    var newMessage = new Message (writtenMessage);

    $('#messages').append(createMessageElement(newMessage));

    // #8 input is cleared after sending a message
    $('#input-message').val('');
}

// #8 sendMessage function
function sendMessage(){
    // creating new Message Element
    var sentMessage = new Message($('#messageInput').val());
    console.log(sentMessage);

    // Clearing input field
    $('#messageInput').val('');

    // Calling createMessageElement Function and appending it to Messages
    $('#messages').append(createMessageElement(sentMessage));

    $('#messages').scrollTop($('#messages').prop('scrollHeight'));
}

// #8 create message Element function
function createMessageElement(messageObject){

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const dayNames = [
        "Mon", "Tue", "Wed",
        "Thu", "Fri", "Sat", "Sun"
    ];

    // new expires in variable
    var expiresIn = Math.round((messageObject.expiresOn - messageObject.createdOn) / (60*1000) )

    // Temp parts of date to combine to string in datetostring
    var dTemp = new Date (messageObject.createdOn);
    var weekdayTemp = dTemp.getDay()-1;
    var dateTemp = dTemp.getDate();
    var monthTemp = dTemp.getMonth();
    var hourTemp = dTemp.getHours();
    var minutesTemp = dTemp.getMinutes();

    //  Combining parts of date top string by looking up values in const array at begging of function

    var dateToString =
        dayNames[weekdayTemp]
        + ', '+
        monthNames[monthTemp]
        +' '+
        dateTemp
        +'th, '+
        hourTemp
        +':'+
        minutesTemp;

    // retruning element that creates div with jQuery and appends all other channel meta
    return $('<div>').addClass('message own').append('<h3><a href="http://w3w.co/'+messageObject.createdBy+'" target="_blank"><strong>'+messageObject.createdBy+'</strong></a> '+dateToString+' <em>'+expiresIn+' min. left</em></h3> <p>'+messageObject.text+'</p><button>+5 min.</button>');
}


// CHANNELS LIST ––––––––––––––––––––––––––––––––––––––––––––––––––

// #8 function to list
function listChannels() {
    $('ul').append(createChannelElement(yummy));
    $('ul').append(createChannelElement(sevenContinents));
    $('ul').append(createChannelElement(killerApp));
    $('ul').append(createChannelElement(firstPersonOnMars));
    $('ul').append(createChannelElement(octoberfest));
}

function createChannelElement(channelName) {
    var channelListItem = $('<li onclick="switchChannel();">').text(channelName.name);
    var channelClassMeta = $('<span>').addClass('channel-meta').appendTo(channelListItem);
    $('<i>').addClass(channelName.starred ? 'fas fa-star':'far fa-star').appendTo(channelClassMeta);
    $('<span>').text((channelName.expiresIn / 60000) +' min').appendTo(channelClassMeta);
    $('<span>').text(channelName.messageCount+ ' new').appendTo(channelClassMeta);
    $('<i>').addClass('fa fa-chevron-right').appendTo(channelClassMeta);


    return channelListItem;
}
