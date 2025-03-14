var songs = [
    {
        name: '2AM', 
        singer: 'JustaTee - BigDaddy', 
        path: 'music/2am.mp3',
        img: 'images/2am.jpg',
    },
    { 
        name: 'Mất Kết Nối', 
        singer: 'Dương Domic', 
        path: 'music/MatKetNoi.mp3',
        img: 'images/MatKetNoi.jpg',
    },
    {
        name: 'Crying Over You', 
        singer: 'JustaTee - Binz',
        path: 'music/CryingOverYou.mp3',
        img: 'images/CryingOverYou.jpg',
    },
    {
        name: 'Die With A Smile', 
        singer: 'Lady Gaga - Bruno Mars', 
        path: 'music/DieWithASmile.mp3',
        img: 'images/DieWithASmile.jpg',
    },
    {
        name: 'Ghé Qua', 
        singer: 'Dick x PC x Tofu', 
        path: 'music/GheQua.mp3',
        img: 'images/GheQua.jpg',
    },
    {
        name: 'Buồn Hay Vui', 
        singer: 'VSOUL x MCK x Obito x Ronboogz', 
        path: 'music/BuonHayVui.mp3',
        img: 'images/BuonHayVui.jpg',
    },
    {
        name: 'Wrong Times', 
        singer: 'Young Puppy - Dangrato', 
        path: 'music/WrongTimes.mp3',
        img: 'images/WrongTimes.jpg',
    },
    {
        name: 'Tràn Bộ Nhớ',
        singer: 'Dương Domic', 
        path: 'music/TranBoNho.mp3',
        img: 'images/TranBoNho.jpg',
    },
    {
        name: 'Birds Of A Feather', 
        singer: 'Billie Eilish', 
        path: 'music/BirdsOfAFeather.mp3',
        img: 'images/BirdsOfAFeather.jpg',
    },
    {
        name: 'Bâng Khuâng', 
        singer: 'Justatee', 
        path: 'music/BangKhuang.mp3',
        img: 'images/BangKhuang.jpg',
    },
    {
        name: 'Bầu Trời Mới',
        singer: 'Da Lab - Minh Tốc - Lam',
        path: 'music/BauTroiMoi.mp3',
        img: 'images/BauTroiMoi.jpg',
    }
]
 
const audio = document.createElement('audio')
var currentSong = 0
var numberOfSongs = songs.length
audio.src = songs[currentSong].path

const playBtn = document.querySelector('.btn-toggle-play')
const repeatBtn = document.querySelector('.btn-repeat')
const prevBtn = document.querySelector('.btn-prev')
const rewindBtn = document.querySelector('.btn-rewind')
const forwardBtn = document.querySelector('.btn-forward')
const nextBtn = document.querySelector('.btn-next')
const randomBtn = document.querySelector('.btn-random')
const playIcon = document.querySelector('.fa-play')
const pauseIcon = document.querySelector('.fa-pause')
const progressBar = document.querySelector('.progress')
const volumeBar = document.querySelector('#volume')
const playList = document.querySelector('.playlist')
const menuBtn = document.querySelector('.menu-btn')
const settingBtn = document.querySelector('.setting-btn')
const showInfoBtn = document.querySelector('.btn-toggle-info')
const exitBtn = document.querySelector('.btn-exit')
const yesBtn = document.querySelector('.btn-yes')
const noBtn = document.querySelector('.btn-no')

const currentSongName = document.querySelector('.dashboard .header h2')
const cd = document.querySelector('.dashboard .cd #cd-thumb')

function updateSongNameAndImg() {
    currentSongName.textContent = songs[currentSong].name
    cd.style.backgroundImage = `url("${songs[currentSong].img}")`
}

updateSongNameAndImg()

var songsHavePlayed = []
var favoriteSongs = []

function displayBtn(btn) {
    btn.classList.remove('hidden')
}

function hiddenBtn(btn) {
    btn.classList.add('hidden')
}

function checkHavePlayed(index) {
    return songsHavePlayed.includes(index)
}

function playSong(index) {
    if (!checkHavePlayed(index)) {
        songsHavePlayed.push(index)
    }
    updateSongNameAndImg()
    updatePlaylistHighlight()
    currentSong = index
    audio.src = songs[index].path
    var inputTime = progressBar.value
    audio.addEventListener('loadedmetadata', () => {
        audio.currentTime = inputTime/100 * audio.duration
    }, { once: true })
    
    cdThumbAnimate.currentTime = 0
    audio.play()
}

function updateIndex() {
    let songElements = document.querySelectorAll('.option-remove')
    songElements.forEach((songElement, index) => {
        songElement.setAttribute('index', index)
    })
}

function updatePlaylistHighlight() {
    songs.forEach((song, index) => {
        const songElement = playList.children[index];
        if (index === currentSong) {
            songElement.classList.add('active');
        } 
        else {
            songElement.classList.remove('active');
        }
    })
}

function removeFromFavorite(index) {
    var songName = songs[index].name
    favoriteSongs.forEach((song, i) => {
        if (song.name == songName) {
            favoriteSongs.splice(i, 1)
        }
    })
}

var index = 0

songs.forEach((song) => {
    const songElement = document.createElement('div')
    songElement.classList.add('song')
    songElement.innerHTML = `
        <div class="thumb" style="background-image: url('${song.img}')"></div>
        <div class="body">
            <h3 class="title">${song.name}</h3>
            <p class="author">${song.singer}</p>
        </div>
        <div class="option">
            <i class="fas fa-ellipsis-h"></i>
            <div class="option-list hidden">
                <div class="option-remove" index='${index++}'>Remove this song from playlist</div>
                <div class="option-favorite hidden">Add to favorite</div>
            </div>
        </div>
    `
    playList.appendChild(songElement)
})

var songElements = document.querySelectorAll('.song')
songElements.forEach((songElement, index) => {
    songElement.style.cursor = 'pointer'
    songElement.addEventListener('click', () => {
        currentSong = index
        progressBar.value = 0
        playSong(currentSong)
        displayBtn(pauseIcon)
        hiddenBtn(playIcon)
        updateMediaSession()
    })
})

updatePlaylistHighlight()

const cdThumbAnimate = cd.animate(
    [{ transform: "rotate(360deg)" }],
    {
        duration: 10000,
        iterations: Infinity,
    }
)

cdThumbAnimate.pause()

audio.onplay = function () {
    audio.isPlaying = true;
    cdThumbAnimate.play();
}

audio.onpause = function () {
    audio.isPlaying = false;
    cdThumbAnimate.pause();
}

audio.ontimeupdate = () => {
    progressBar.value = audio.currentTime / audio.duration * 100
    if (audio.currentTime >= audio.duration) {
        currentSong++
        if (currentSong >= songs.length) {
            currentSong = 0
        }
        progressBar.value = 0
        playSong(currentSong)
    }
    updatePlaylistHighlight()
}

progressBar.addEventListener('input', () => {
    audio.currentTime = progressBar.value / 100 * audio.duration
})

audio.volume = volumeBar.value
volumeBar.addEventListener('input', () => {
    audio.volume = volumeBar.value
})

btns = document.querySelectorAll('.btn')
btns.forEach((btn) => {
    btn.style.cursor = 'pointer'
})

playBtn.addEventListener('click', () => {
    if (audio.paused) {
        if (audio.currentTime == 0) {
            var inputTime = progressBar.value
            audio.addEventListener('loadedmetadata', () => {
                audio.currentTime = (inputTime / 100) * audio.duration
            }, { once: true })
            playSong(currentSong)
        }
        else {
            audio.play()
        }
        displayBtn(pauseIcon)
        hiddenBtn(playIcon)
    } 
    else {
        audio.pause()
        displayBtn(playIcon)
        hiddenBtn(pauseIcon)
    }
})

repeatBtn.addEventListener('click', () => {
    audio.currentTime = 0
})

prevBtn.addEventListener('click', () => {
    currentSong--
    if (currentSong < 0) {
        currentSong = songs.length - 1
    }
    playSong(currentSong)
    displayBtn(pauseIcon)
    hiddenBtn(playIcon)  
})

nextBtn.addEventListener('click', () => {
    currentSong++
    if (currentSong >= songs.length) {
        currentSong = 0
    }
    playSong(currentSong)
    displayBtn(pauseIcon)
    hiddenBtn(playIcon)  
})

rewindBtn.addEventListener('click', () => {
    audio.currentTime -= 10
    if (audio.currentTime <= 0) {
        currentSong--
        if (currentSong < 0) {
            currentSong = songs.length - 1
        }
        playSong(currentSong)
    }
})

forwardBtn.addEventListener('click', () => {
    audio.currentTime += 10
    if (audio.currentTime >= audio.duration) {
        currentSong++
        if (currentSong >= songs.length) {
            currentSong = 0
        }
        progressBar.value = 0
        playSong(currentSong)
    }
})

randomBtn.addEventListener('click', () => {
    if (songsHavePlayed.length === songs.length) {
        songsHavePlayed.length = 0
    }
    let randomIndex
    do {
        randomIndex = Math.floor(Math.random() * songs.length)
    } while (checkHavePlayed(randomIndex))
    playSong(randomIndex)
    displayBtn(pauseIcon)
    hiddenBtn(playIcon)
})

let options = document.querySelectorAll('.option')
options.forEach((option) => {
    option.addEventListener('click', (e) => {
        e.stopPropagation()
        const optionList = option.querySelector('.option-list')
        displayBtn(optionList)
    })
})

const body = document.querySelector('body')
body.addEventListener('click', () => {
    options.forEach((option) => {
        const optionList = option.querySelector('.option-list')
        hiddenBtn(optionList)
        hiddenBtn(document.querySelector('.favorite-list'))
        hiddenBtn(document.querySelector('.setting-menu'))
        displayBtn(settingBtn)
    })
})

let optionRemove = document.querySelectorAll('.option-remove')
optionRemove.forEach((remove) => {
    remove.addEventListener('click', (e) => {
        e.stopPropagation()
        var currentIndex = parseInt(remove.getAttribute('index'))
        if (currentIndex == currentSong)
        {
            removeFromFavorite(currentIndex)
            songs.splice(currentIndex, 1)
            playList.removeChild(playList.children[currentIndex])
            if (currentSong >= songs.length) {
                currentSong = 0
            }
            if (audio.isPlaying) {
                playSong(currentSong)
            }
            else {
                updateSongNameAndImg()
                updatePlaylistHighlight()
            }
        }
        else
        {
            removeFromFavorite(currentIndex)
            songs.splice(currentIndex, 1)
            playList.removeChild(playList.children[currentIndex])
        }
        updateIndex()
    })
})

let optionFavorite = document.querySelectorAll('.option-favorite')
optionFavorite.forEach((favorite) => {
    favorite.addEventListener('click', (e) => {
        e.stopPropagation()
        var currentIndex = parseInt(favorite.parentElement.querySelector('.option-remove').getAttribute('index'))
        var songName = songs[currentIndex].name
        var check = false
        favoriteSongs.forEach((song) => {
            if (song.name == songName) {
                check = true
            }
        })
        if (!check) {
            favoriteSongs.push(songs[currentIndex])
            updateFavorite()
            const favoriteList = document.querySelector('.favorite-list')
            console.log(favoriteList)
        }
        favorite.parentElement.classList.add('hidden') 
    })
})

function updateFavorite() {
    const lists = document.querySelectorAll('[list]')
    const base = document.querySelector('.favorite-song ul li')
    base.classList.remove('hidden')
    lists.forEach((list) => {
        const template = list.innerHTML
        const dataVariable = list.getAttribute('list')
        const data = window[dataVariable]
        if (data.length > 0) {
            const html = data.map(item => `
                <li>${item.name}: ${item.singer}</li>
            `).join('');
            list.innerHTML = html;
        }
    })
}

menuBtn.addEventListener('click', (e) => {
    e.stopPropagation()
    const favoriteList = document.querySelector('.favorite-list')
    if (favoriteList.classList.contains('hidden')) {
        displayBtn(favoriteList)
    }
    else {
        hiddenBtn(favoriteList)
    }
})

settingBtn.addEventListener('click', (e) => {
    e.stopPropagation()
    const settingMenu = document.querySelector('.setting-menu')
    if (settingMenu.classList.contains('hidden')) {
        displayBtn(settingMenu)
        hiddenBtn(settingBtn)
    }
})

const plusIcon = document.querySelector('.fa-plus')
const minusIcon = document.querySelector('.fa-minus')
const infoDisplay = document.querySelector('.info-display')
showInfoBtn.addEventListener('click', (e) => {
    e.stopPropagation()
    if (infoDisplay.classList.contains('hidden')) {
        displayBtn(infoDisplay)
        hiddenBtn(plusIcon)
        displayBtn(minusIcon)
    }
    else {
        hiddenBtn(infoDisplay)
        displayBtn(plusIcon)
        hiddenBtn(minusIcon)
    }
})

const exitPopUp = document.querySelector('.exit-popup')
exitBtn.addEventListener('click', (e) => {
    e.stopPropagation()
    displayBtn(exitPopUp)
})

exitPopUp.addEventListener('click', (e) => {
    e.stopPropagation()
    hiddenBtn(exitPopUp)
})

yesBtn.addEventListener('click', (e) => {
    e.stopPropagation()
    window.close()
})

noBtn.addEventListener('click', (e) => {
    e.stopPropagation()
    hiddenBtn(exitPopUp)
})

function updateMediaSession() {
    if ('mediaSession' in navigator) {
        const currentSongData = songs[currentSong]
        navigator.mediaSession.metadata = new MediaMetadata({
            title: currentSongData.name,
            artist: currentSongData.singer,
            artwork: [
                { src: currentSongData.img, sizes: '96x96', type: 'image/jpg' },
                { src: currentSongData.img, sizes: '128x128', type: 'image/jpg' },
                { src: currentSongData.img, sizes: '192x192', type: 'image/jpg' },
                { src: currentSongData.img, sizes: '256x256', type: 'image/jpg' },
                { src: currentSongData.img, sizes: '384x384', type: 'image/jpg' },
                { src: currentSongData.img, sizes: '512x512', type: 'image/jpg' },
            ]
        })

        navigator.mediaSession.setActionHandler('play', () => {
            audio.play()
        })

        navigator.mediaSession.setActionHandler('pause', () => {
            audio.pause()
        })

        navigator.mediaSession.setActionHandler('seekbackward', () => {
            audio.currentTime -= 10
            if (audio.currentTime <= 0) {
                currentSong--
                if (currentSong < 0) {
                    currentSong = songs.length - 1
                }
                playSong(currentSong)
            }
        })

        navigator.mediaSession.setActionHandler('seekforward', () => {
            audio.currentTime += 10
            if (audio.currentTime >= audio.duration) {
                currentSong++
                if (currentSong >= songs.length) {
                    currentSong = 0
                }
                playSong(currentSong)
            }
        })

        navigator.mediaSession.setActionHandler('previoustrack', () => {
            currentSong--
            if (currentSong < 0) {
                currentSong = songs.length - 1
            }
            playSong(currentSong)
        })

        navigator.mediaSession.setActionHandler('nexttrack', () => {
            currentSong++
            if (currentSong >= songs.length) {
                currentSong = 0
            }
            playSong(currentSong)
        })

        function playSong(index) {
            currentSong = index
            audio.src = songs[currentSong].path
            audio.currentTime = 0
            progressBar.value = 0
            cdThumbAnimate.currentTime = 0
            updateSongNameAndImg()
            updatePlaylistHighlight()
            updateMediaSession()
            var inputTime = progressBar.value
            audio.addEventListener('loadedmetadata', () => {
                audio.currentTime = (inputTime / 100) * audio.duration
            }, { once: true })
            updateSongNameAndImg()
            updatePlaylistHighlight()
            audio.play()
        }
    }
}

updateMediaSession()