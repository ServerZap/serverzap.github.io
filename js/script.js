$(document).ready(function() {
    var audio = $('#background-music')[0];
    var video = $('#background-video')[0];
    var isPlaying = false;

    // Preload video metadata to reduce initial loading time
    video.preload = 'metadata';

    // Start playing the video and audio when the video is loaded
    video.oncanplay = function() {
        video.play();
        audio.play();
        isPlaying = false;
    };

    // Handle video loading errors
    video.onerror = function() {
        console.error('Error loading video');
    };

    async function getIP() {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            document.getElementById('main-text').innerText = `hi ${data.ip}`;
            keepchangingit(data);

        } catch (error) {
            console.error('Error fetching IP address:', error);
        }
    }

    function fadechange(newtext) {
        $('#main-text').fadeOut('slow', function() {
            document.getElementById('main-text').innerText = newtext;
            $('#main-text').fadeIn('slow')
        });
    }


    function keepchangingit(data) {
        sleep(5000).then(() => {
            fadechange(`welcome to serverzap.lol`);
            sleep(2000).then(() => {
                
            });
        }); 
    }

    // Handle button click
    $('#enter-button').click(function() {
        getIP();
        $('#enter-site').fadeOut('slow', function() {
            $('#content').fadeIn('slow', function() {
                // Play both audio and video
                audio.play();
                video.play();
            });
        });
    });

    $('#legacy').click(function() {
        fadechange(`welcome to serverzap.lol`);
        video.src = 'assets/sigma.png';
        
    });

    // i totally made this 👍👍
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Handle tab visibility change
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
            if (isPlaying) {
                audio.play();
                video.play();
            }
        } else {
            if (!audio.paused) {
                audio.pause();
            }
            if (!video.paused) {
                video.pause();
            }
        }
    });
    audio.onended = function() {
        video.pause();
        isPlaying = false;
    };

    video.onended = function() {
        audio.pause();
        isPlaying = false;
    };
});
