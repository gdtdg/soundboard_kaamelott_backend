function createButton(soundList, file) {
    return `<button type="button" class="bouton" 
                        value="${soundList[file].quote}" 
                        title="${soundList[file].author} - Livre ${soundList[file].season}, épisode ${soundList[file].episode_number} - ${soundList[file].episode_name}" 
                        onclick="playMusic('${soundList[file].file_name}')">${soundList[file].quote} 
                        <img class="right_float" src="./portraits/${soundList[file].author}.jpg" alt="portrait of ${soundList[file].author}" /></button>`;
}

function initializeSoundList() {
    let url = `http://localhost:8081/sound-list`;
    fetch(url).then(async (response) => {
        globalState.soundList = await response.json();
        console.log(globalState.soundList);
        let allButtons = [];
        for (let file in globalState.soundList) {
            const newButton = createButton(globalState.soundList, file);
            allButtons += newButton;
        }
        document.getElementById('result').innerHTML = allButtons;

    }).catch(err => console.log("Erreur: " + err));
}

function playMusic(fileName) {
    if (globalState.media && !globalState.media.ended) {
        globalState.media.volume = 0;
    }
    let music = new Audio("http://localhost:8081/sounds/" + fileName);
    globalState.media = music;
    music.play();
}

function firstLetterUpperCase(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function removeUnderscoreFromString(file) {
    return soundList[file].file_name.replace(/_/g, " ");
}

function search() {
    if (this.value.length === 0) {
        document.getElementById('result').innerHTML = "";
        initializeSoundList();
    } else {
        let valueFormatted = firstLetterUpperCase(this.value);
        console.log(valueFormatted);
        document.getElementById('result').innerHTML = "";
        let allButtons = [];
        for (let file in globalState.soundList) {
            let tempFileName = removeUnderscoreFromString(file);
            if (tempFileName.includes(this.value) ||
                globalState.soundList[file].quote.includes(valueFormatted) ||
                globalState.soundList[file].author.includes(valueFormatted) ||
                globalState.soundList[file].season.includes(valueFormatted) ||
                globalState.soundList[file].episode_number.includes(valueFormatted) ||
                globalState.soundList[file].episode_name.includes(valueFormatted) ||
                globalState.soundList[file].episode_name.includes(this.value)) {
                console.log(this.value);
                console.log(file);
                const newButton = createButton(globalState.soundList, file);
                allButtons += newButton;
            }
        }
        document.getElementById('result').innerHTML += allButtons;
    }
}

const globalState = {
    media: undefined,
    soundList: undefined
};

document.addEventListener("DOMContentLoaded", initializeSoundList);

document.getElementById("recherche").addEventListener("input", search);
