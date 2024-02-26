const playToggle = document.body.querySelector('#play-toggle')
const play = document.body.querySelector('#play');
const pause = document.body.querySelector('#pause');
const heart = document.body.querySelector('#heart');
const fillHeart = document.body.querySelector('#fill-heart');
const shuffle = document.body.querySelector('#shuffle');
const repeat = document.body.querySelector('#repeat');

localStorage.setItem('status' , 'pause');

let like = localStorage.getItem('like');
if(like === 'true'){
    heart.classList.toggle('hidden');
    fillHeart.classList.toggle('hidden');
}

let repeatMusic = localStorage.getItem('repeat');
if(repeatMusic === 'true'){
    shuffle.classList.toggle('hidden');
    repeat.classList.toggle('hidden');
}

const wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: '#dadada',
    progressColor: '#000000',
    barWidth: 3,
    barRadius: 4,
    height: 80,
    cursorWidth: 0,
    Response: true,
    url: './assets/music/Pixies-Where-Is-My-Mind.mp3',
})

wavesurfer.on('interaction', ()=> {
    localStorage.setItem('status' , 'play');
    wavesurfer.play();
});

wavesurfer.on('click', ()=> {
    localStorage.setItem('status', 'play');
    wavesurfer.play();
    play.classList.add('hidden');
    pause.classList.remove('hidden');
});

wavesurfer.on('finish', ()=> {
    repeatMusic = localStorage.getItem('repeat');
    if(repeatMusic === 'true'){
        wavesurfer.play()
    }else{
        localStorage.setItem('status', 'pause');
        play.classList.toggle('hidden');
        pause.classList.toggle('hidden');
    }
});

wavesurfer.on('timeupdate', (e)=> {
    let current_minute = Math.floor(e / 60);
    let current_second = Math.floor(e - (current_minute * 60));

    document.body.querySelector('#current_time').textContent = `${current_minute}:${current_second < 10 ? '0'+current_second : current_second}`;
});

wavesurfer.on('ready', (e)=> {
    let duration_minute = Math.floor(e / 60);
    let duration_second = Math.floor(e - (duration_minute * 60));

    document.querySelector('#duration').textContent = `${duration_minute}:${duration_second}`;
});

playToggle.addEventListener('click', ()=> {
    let musicStatus = localStorage.getItem('status');

    if(musicStatus === 'pause'){
        wavesurfer.play();
        localStorage.setItem('status' , 'play');
    }else{
        wavesurfer.pause();
        localStorage.setItem('status' , 'pause');
    }

    play.classList.toggle('hidden');
    pause.classList.toggle('hidden');
});

heart.addEventListener('click', ()=> {
    heart.classList.toggle('hidden');
    fillHeart.classList.toggle('hidden');
    localStorage.setItem('like' , 'true');
});

fillHeart.addEventListener('click', ()=> {
    heart.classList.toggle('hidden');
    fillHeart.classList.toggle('hidden');
    localStorage.setItem('like' , 'false');
});

shuffle.addEventListener('click', ()=> {
   shuffle.classList.toggle('hidden');
   repeat.classList.toggle('hidden');
   localStorage.setItem('repeat' , 'true');
});

repeat.addEventListener('click', ()=> {
    shuffle.classList.toggle('hidden');
    repeat.classList.toggle('hidden');
    localStorage.setItem('repeat' , 'false');
});