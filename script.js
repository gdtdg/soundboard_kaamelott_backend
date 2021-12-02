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
        soundList = await response.json();
        console.log(soundList);
        let allButtons = [];
        for (let file in soundList) {
            const newButton = createButton(soundList, file);
            allButtons += newButton;
        }
        document.getElementById('result').innerHTML = allButtons;

    }).catch(err => console.log("Erreur: " + err));
}

function playMusic(fileName) {
    let music = new Audio("http://localhost:8081/sounds/" + fileName);
    console.log(music);
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
        for (let file in soundList) {
            let tempFileName = removeUnderscoreFromString(file);
            if (tempFileName.includes(this.value) ||
                soundList[file].quote.includes(valueFormatted) ||
                soundList[file].author.includes(valueFormatted) ||
                soundList[file].season.includes(valueFormatted) ||
                soundList[file].episode_number.includes(valueFormatted) ||
                soundList[file].episode_name.includes(valueFormatted) ||
                soundList[file].episode_name.includes(this.value)) {
                console.log(this.value);
                console.log(file);
                const newButton = createButton(soundList, file);
                allButtons += newButton;
            }
        }
        document.getElementById('result').innerHTML += allButtons;
    }
}

let soundList;

document.addEventListener("DOMContentLoaded", initializeSoundList);

document.getElementById("recherche").addEventListener("input", search);
