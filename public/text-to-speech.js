var final_transcript = ''; 
var recognizing = false; 
var language = 'th-TH';  
$(function(){
        if (!('webkitSpeechRecognition' in window)) {
            alert("Your Browser does not support the Speech API");
        }else{
            var recognition = new webkitSpeechRecognition(); 
            recognition.continuous = true;         
            recognition.interimResults = true;     
            recognition.lang = language;        
 
            recognition.onstart = function() {
                recognizing = true; 
                $('#start_button').html('<i class="fas fa-microphone-slash"></i>'); 
            };
 
            recognition.onerror = function(event) {
                alert("There was a recognition error...");
            };
 
            recognition.onend = function() {
                recognizing = false;  
                $('#start_button').html('<i class="fas fa-microphone"></i>'); 
            };
 
            recognition.onresult = function(event) {
                var interim_transcript = ''; 
                for (var i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        final_transcript += event.results[i][0].transcript+' ';
                    } else { 
                        interim_transcript += event.results[i][0].transcript+' '; 
                    }
                }
                if(final_transcript.length > 0) {
                    console.log(final_transcript)
                    $('#inputMessage').val(final_transcript); 
                }
            };
 
            $("#start_button").click(function(e) {
                e.preventDefault();
                if (recognizing) {
                    recognition.stop();
                    $('#start_button').html('<i class="fas fa-microphone"></i>');
                    recognizing = false;
                } else {
                    final_transcript = '';
                    recognition.start();
                    $('#start_button').html('waiting');
                    $('#inputMessage').val('');
                }
            });
        }
});