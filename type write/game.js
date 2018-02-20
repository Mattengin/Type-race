$(document).ready(function () {
    //set sentences as variables
    var sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
    var sentenceIndex = 0;//set word to 0 index when is starts
////////////////////////////////////////////////////////////////////variables
    var letterIndex = 0;
    var currentLetterDiv = $("#next-letter");

    currentLetterDiv.text(currentLetter);
    $("#word").append(sentences[sentenceIndex]);

    var currentSentence = sentences[0];
    var currentLetter = currentSentence[0];
    var start;
    var done;
    var bad = 0; // to track mistakes
//////////////////////////////////////////////////////////////////////////////////////////////////getting the letters on the page
    $("#sentence").append(currentSentence); // setting the content of the sentence div to = currentSentence
    $("#next-letter").append(currentLetter); // setting the content of the next-letter div to = currentLetter
    //make the uppercase keyboard hidden on page load
    $("#keyboard-upper-container").hide(); // hides the uppercase keyboard
//////////////////////////////////////////////////////////////////////////////////swap the keyboard
    $(document).keydown(function (event) { 
        var keyDown = event.which;
        if (keyDown === 16) {
            $("#keyboard-upper-container").show();
            $("#keyboard-lower-container").hide();
        }
    })

    //hide uppercase keyboard on shift release and show lowercase
    $(document).keyup(function (event) {
        var keyUp = event.which;
        if (keyUp === 16) {
            $("#keyboard-upper-container").hide();
            $("#keyboard-lower-container").show();
        }
        $('.highlight').removeClass('highlight');
    });

    //////////////////////////////////////////////////////////////highlight things
    $(document).keypress(function (event) {
        var keyPress = event.which;
        $('#' + keyPress).addClass('highlight');
        var currentSentence = sentences[sentenceIndex];
        var currentLetter = currentSentence[letterIndex];

        if (start == undefined) { 
            start = event.timeStamp;
        }

        $("#highlightBlock").css("left", "+=15px");
/////////////////////////////////////////////////////////////////////keeps track
        letterIndex++; //advances the letterIndex by 1
        var nextLetter = currentSentence[letterIndex]; //so, the next letter will be the current letter 
        currentLetterDiv.text(nextLetter); 
/////////////////////////////////////////////////////////////////////glypicon on correct input
        if (letterIndex < currentSentence.length -1) { 
            if (event.which === currentLetter.charCodeAt()) {
                $("#feed").append("<span class = 'glyphicon glyphicon-thumbs-up'></span>"); 
            } 
            else {
                $("#feed").append("<span class = 'glyphicon glyphicon-thumbs-down'></span>");
                bad++; 
            }
        }
/////////////////////////////////////////////////////////so, this checks if you finshed the curent index and advances you to the next sentence
        if (letterIndex == currentSentence.length) { 
            $("#sentence").empty(); // empty the array 
            sentenceIndex++; 
            currentSentence = sentences[sentenceIndex];  
            $("#sentence").append(sentences[sentenceIndex]); 
            letterIndex = 0; 
            if (sentenceIndex < sentences.length - 1) { 
                var nextLetter = currentSentence[letterIndex];
            }
            currentLetterDiv.text(nextLetter); 
            $("#highlightBlock").css({ left: 17 }); 
            $("#feed").empty(); //empty the div
        }
/////////////////////////////////////////////////////////////////////////////end game stuff
        if (sentenceIndex > sentences.length - 1) { //if you're all the way through the sentences array
            done = event.timeStamp; 
            var time = (done - start);
            time /= 60000; 
            var speed = Math.round((54 / time) - (bad * 2)); //wpm math
            $("#next-letter").text("Nice work you typed " + speed + " words per minute, thats good right?"); 
            setTimeout(function () {
                var again = confirm("Another round??");
                if (again == true) {
                    window.location.reload(); 
                } else {
                    return;
                };
            }, 4000);
        };
    })
});