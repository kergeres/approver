"use strict";
// let database = [];

// async function loadData() {
//   let response = await fetch("../data/json.json");
//   let jsonData = await response.json();
//   database = jsonData
//   appendNav(database)
//   clickListener()

// }

// async function init() {
//   await loadData();

// }
// init();

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkpdg957656NHhYdug_fG5aR5_1rC2YYo",
  authDomain: "monsters-in-movies.firebaseapp.com",
  projectId: "monsters-in-movies",
  storageBucket: "monsters-in-movies.appspot.com",
  messagingSenderId: "662074601460",
  appId: "1:662074601460:web:504ca9afdc6835841613a1",
  measurementId: "G-LV81HRN89M"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);

const db = firebase.firestore();
const firebaseMonstersRef = db.collection("monsters");
const toUpload = db.collection("toUpload");

let database = [];
toUpload.onSnapshot(function (snapshotData) {

  snapshotData.forEach(doc => {
    let dt = doc.data();
    dt.id = doc.id;
    database.push(dt);

  }
  );
  appendNav(database)
});

// create new input for appearance, creator etc

// for appearance button
let addApp = () => {
  let appearanceButtonCounter = 1
  document.querySelector("#appearance-btn").addEventListener('click', () => {
    appearanceButtonCounter++;
    document.querySelector('#extracontainer-appearance').style.display = "unset"
    let newAppearanceField = `<input class="${appearanceButtonCounter} appearance " placeholder="appearance ${appearanceButtonCounter}" type="text" autocomplete="of"></input>`;
    let collecter = []
    let assistantAppearance = document.querySelectorAll(".appearance");
    assistantAppearance.forEach(tag => {
      collecter.push(tag.value)
    })
    document.querySelector("#extracontainer-appearance").innerHTML += newAppearanceField;
    inputValueSaver(collecter, "appearance")
  })
}


// for ability button
let addAbi = () => {
  let abilityButtonCounter = 1
  document.querySelector("#ability-btn").addEventListener('click', () => {
    abilityButtonCounter++;
    document.querySelector('#extracontainer-ability').style.display = "unset"
    let newField = `<input class="${abilityButtonCounter} ability" placeholder="ability ${abilityButtonCounter}" type="text" autocomplete="of"></input>`;
    let collecter = []
    let assistant = document.querySelectorAll(".ability");
    assistant.forEach(tag => {
      collecter.push(tag.value)
    })
    document.querySelector("#extracontainer-ability").innerHTML += newField;
    inputValueSaver(collecter, "ability")
  })
}



// for creator button
let addCre = () => {
  let creatorButtonCounter = 1
  document.querySelector("#creator-btn").addEventListener('click', () => {
    creatorButtonCounter++;
    document.querySelector('#extracontainer-creator').style.display = "unset"
    let newField = `<input class="${creatorButtonCounter} creator" placeholder="creator ${creatorButtonCounter}" type="text" autocomplete="of"></input>`;
    let collecter = []
    let assistant = document.querySelectorAll(".creator");
    assistant.forEach(tag => {
      collecter.push(tag.value)
    })
    document.querySelector("#extracontainer-creator").innerHTML += newField;
    inputValueSaver(collecter, "creator")
  })
}

let addExt = () => {
  // for exlinks button
  let extlinksButtonCounter = 1
  document.querySelector("#extlinks-btn").addEventListener('click', () => {
    extlinksButtonCounter++;
    document.querySelector('#extracontainer-extlinks').style.display = "unset"
    let newField = `<input class="${extlinksButtonCounter} extlinks" placeholder="extlinks ${extlinksButtonCounter}" type="text" autocomplete="of"></input>`;
    let collecter = []
    let assistant = document.querySelectorAll(".extlinks");
    assistant.forEach(tag => {
      collecter.push(tag.value)
    })
    document.querySelector("#extracontainer-extlinks").innerHTML += newField;
    inputValueSaver(collecter, "extlinks")
  })
}




document.querySelector(".search-input").addEventListener('keyup', (e) => {
  let srchValue = document.querySelector('.search-input').value
  searchPrograms(srchValue)
})

function searchPrograms(value) {

  let filteredPrograms = []
  for (const item of database) {
    let title = item.monster.mname.toLowerCase();

    if (title.includes(value.toLowerCase())) {
      filteredPrograms.push(item);
    }
  }

  appendNav(filteredPrograms);
}

function appendNav(items) {
  let temlplete = ""

  for (let item of items) {

    temlplete += `<label for="mobileicon"><p class="navAppended">${item.monster.mname}</p></label> `

  }
  // onclick="appendProfile(${item.id})"
  document.querySelector(".item-title-container").innerHTML = temlplete
  clickListener()

}


let clickListener = () => {

  let cbox = document.querySelectorAll(".navAppended");
  cbox.forEach(box => {
    box.addEventListener('click', (e) => {
      appendProfile(e.target.innerHTML)
    })
  }
  )
}
clickListener()


function appendProfile(bejon) {


  let htmlTemplate = `

  <form class="upload-form">
            <div class="user-field">
                <div class="input-container firstname-container">
                    <input id="firstname" type="text" name="firstname" autocomplete="on">
                    <label for="firstname">firstname</label>
                </div>
                <div class="input-container lastname-container">
                    <input id="lastname" type="text" name="lastname" autocomplete="on">
                    <label for="lastname">lastname</label>
                </div>
                <div class="input-container email-container">
                    <input id="email" type="email" name="email" autocomplete="on">
                    <label for="email">email</label>
                </div>
                <div class="input-container uAge-container">
                    <input id="uAge" type="text" name="uAge" autocomplete="of">
                    <label for="uAge">Age</label>
                </div>
                
            </div>

            <div class="image-contenct-container" > <img class="image-container"></div>
           
            <div class="content-field">
            <div class="input-container-small imageSrc-container">
            <input id="imageSrc" type="text" name="imageSrc" autocomplete="of">
            <label for="age">imageSrc</label>

        </div>
                <input id="img-to-upload" type="file">
                <input id="img-to-uploadd" type="file">
                <label for="img-to-upload">Choose image</label>
                <div class="input-container mname-container">
                    <input required id="mname" type="text" name="mname" autocomplete="of">
                    <label class="addAble" for="mname">Creature's name</label>

                </div>

                <div id="appearance-container" class="input-container appearance-container">

                    <input class="appearance 2" type="text" name="appearance" autocomplete="of">
                    <div id="extracontainer-appearance"></div>
                    <label class="addAbleA " for="appearance">appearance</label>
                    <button id="appearance-btn" type="button"><i class="fas fa-plus"></i></button>

                </div>
                <div class="input-container-small height-container">
                    <input id="height" type="text" name="height" autocomplete="of">
                    <label for="height">height</label>
                    <!-- <button type="button"><i class="fas fa-plus"></i></button> -->
                    <select id="heightUnit">
                        <option>centimeter</option>
                        <option>meter</option>
                        <option>inches</option>
                        <option>feet</option>
                    </select>

                </div>
                <div class="input-container-small weight-container">
                    <input id="weight" type="text" name="weight" autocomplete="of">
                    <label for="weight">weight</label>
                    <!-- <button type="button"><i class="fas fa-plus"></i></button> -->
                    <select id="weightUnit">
                        <option>gram</option>
                        <option>kilogram</option>
                        <option>pound</option>
                    </select>

                </div>
                <div class="input-container-small age-container">
                    <input id="age" type="text" name="age" autocomplete="of">
                    <label for="age">age</label>

                </div>
                <div class="input-container-small birth-container">
                    <div class="birth-container-small">
                        <input minlength="2" maxlength="2" placeholder="dd" id="dd" type="text" name="dd"
                            autocomplete="of">
                        <input minlength="2" maxlength="2" placeholder="mm" id="mm" type="text" name="mm"
                            autocomplete="of">
                        <input minlength="4" maxlength="4" placeholder="yyyy" id="yyyy" type="text" name="yyyy"
                            autocomplete="of">
                    </div>
                    <label class="addAble" for="birth">birth</label>
                </div>
                <div class="input-container-small pog-container">
                    <input id="pog" type="text" name="pog" autocomplete="of">
                    <label for="pog">place of origin</label>
                </div>
                <div class="input-container-small ageCalcQ-container">
                    <input id="ageCalcQ" type="text" name="ageCalcQ" autocomplete="of">
                    <label for="ageCalcQ">ageCalcQ</label>
                </div>
                <div id="ability-container" class="input-container-small ability-container">
                    <input class="ability 1" id="ability" type="text" name="ability" autocomplete="of">
                    <div id="extracontainer-ability"></div>
                    <label for="ability">ability</label>
                    <button id="ability-btn" type="button"><i class="fas fa-plus"></i></button>

                </div>
                <div id="creator-container" class="input-container-small creator-container">
                    <input class="1 creator" id="creator" type="text" name="creator" autocomplete="of">
                    <div id="extracontainer-creator"></div>
                    <label for="creator">creator</label>
                    <button id="creator-btn" type="button"><i class="fas fa-plus"></i></button>

                </div>
                <div class="history-container">
                    <textarea id="history" type="text" name="history" autocomplete="of"></textarea>
                    <label for="history">History</label>
                </div>
                <div class="about-container">
                    <textarea id="about" type="text" name="about" autocomplete="of"></textarea>
                    <label for="about">about</label>
                </div>

                <div id="extlinks-container" class="input-container-small extlinks-container">
                    <input class="1 extlinks" id="extlinks" type="text" name="extlinks" autocomplete="of">
                    <div id="extracontainer-extlinks"></div>
                    <label for="extlinks">external links</label>
                    <button id="extlinks-btn" type="button"><i class="fas fa-plus"></i></button>
                </div>
                <div class="submit-button-container">

                    <button id="toHomePage" type="button"><a href="../index.html">go back</a></button>
                    <button id="submit" type="button">upload</button>
                </div>


            </div>
        </form>`;
  document.querySelector(".content-container").innerHTML = htmlTemplate;

  for (let iterator of database) {
    ;
    if (iterator.monster.mname == bejon) {

      let toList = (inArray) => {
        let templt = ``
        for (const gpard of inArray) {

          if (gpard.innerHTML != "" || gpard.innerHTML != " ")
            templt += `${gpard}<br>`;
        }
        return templt
      }
      document.querySelector('#firstname').value = iterator.user.firstname
      document.querySelector('#lastname').value = iterator.user.lastname
      document.querySelector('#email').value = iterator.user.email
      document.querySelector('#uAge').value = iterator.user.age

      document.querySelector('#mname').value = iterator.monster.mname
      document.querySelector('.appearance').value = iterator.monster.appearance
      document.querySelector('#height').value = iterator.monster.height
      document.querySelector('#heightUnit').value = iterator.monster.heightUnit
      document.querySelector('#weight').value = iterator.monster.weight
      document.querySelector('#weightUnit').value = iterator.monster.weightUnit
      // document.querySelector('#birth').value = iterator.monster.birth  
      document.querySelector('#pog').value = iterator.monster.pog
      document.querySelector('.ability').value = iterator.monster.ability
      document.querySelector('#history').value = iterator.monster.history
      document.querySelector('.creator').value = iterator.monster.creator
      document.querySelector('#about').value = iterator.monster.about
      document.querySelector('#dd').value = iterator.monster.birth.dd
      document.querySelector('#mm').value = iterator.monster.birth.mm
      document.querySelector('#yyyy').value = iterator.monster.birth.yyyy
      document.querySelector('#ageCalcQ').value = iterator.monster.birth.ageCalcQ
      document.querySelector('#extlinks').value = iterator.monster.extlinks
      document.querySelector('.image-container').src = iterator.monster.images[0]
      document.querySelector('#imageSrc').value = iterator.monster.images[0]

      fireStoreUpload(iterator.id)
      addAbi()
      addApp()
      addCre()
      addExt()

    }




  }







  let segedtomb = document.querySelectorAll('td')
  for (const elem of segedtomb) {
    // console.log(elem.children[0] && elem.children[1]);
    if (elem.innerHTML == "" || elem.innerHTML == " " || elem.innerHTML == "  " || elem.innerHTML.includes(" <br>")) {
      console.log(elem);
      elem.parentElement.remove()
    }
  }
}





window.addEventListener('scroll', () => {
  let headerBar = document.querySelector(".header-bar")
  headerBar.classList.toggle('scroll-header-shrinker', window.scrollY > 0)
})




// create new input for appearance, creator etc



// stora value in inputfields to avoid innerHTML clear
let inputValueSaver = (dataIn, inputName) => {
  let assistant = document.querySelectorAll(`.${inputName}`);
  assistant.forEach(tag => {
    for (let i = 0; i < dataIn.length; i++) {
      if (tag.className.split(" ")[0] == i + 1) {
        tag.value = dataIn[i]
      }
    }

  })

}




function fireStoreUpload(idToDelete) {
  document.querySelector('#submit').addEventListener('click', () => {

    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDay()
    let hour = date.getHours()
    let min = date.getMinutes()
    let sec = date.getSeconds()

    let extime = `${year}/${month}/${day} ${hour}:${min}:${sec}`



    let firstname = document.querySelector('#firstname').value
    let lastname = document.querySelector('#lastname').value
    let email = document.querySelector('#email').value
    let imgToUpload = document.querySelector('#img-to-upload').value
    let mname = document.querySelector('#mname').value


    // let imgToFirebase = () => {
    //     fireabaseStorage.storage().ref(`/test/` `/${imgToUpload}.jpg`).put
    // }
    // imgToFirebase()
    let appearance = []
    document.querySelectorAll(".appearance").forEach(tag => {
      appearance.push(tag.value)
    })
    let ability = []
    document.querySelectorAll(".ability").forEach(tag => {
      ability.push(tag.value)
    })
    let creator = []
    document.querySelectorAll(".creator").forEach(tag => {
      creator.push(tag.value)
    })
    let extlinks = []
    document.querySelectorAll(".extlinks").forEach(tag => {
      extlinks.push(tag.value)
    })


    let height = document.querySelector('#height').value
    let heightUnit = document.querySelector('#heightUnit').value
    let weight = document.querySelector('#weight').value
    let weightUnit = document.querySelector('#weightUnit').value
    let stringBirth = `${document.querySelector('#yyyy').value}-${document.querySelector('#mm').value}-${document.querySelector('#dd').value}`
    let age = document.querySelector('#age').value != "" ? document.querySelector('#age').value : ""
    let uAge = document.querySelector('#uAge').value != "" ? document.querySelector('#uAge').value : ""
    let birth = document.querySelector('#yyyy').value != "" ? new Date(parseInt(document.querySelector('#yyyy').value), parseInt(document.querySelector('#mm').value), parseInt(document.querySelector('#dd').value)) : (age * 31556952)

    let yyyy = document.querySelector('#yyyy').value
    let mm = document.querySelector('#mm').value
    let dd = document.querySelector('#dd').value
    let pog = document.querySelector('#pog').value
    // let ability = document.querySelector('#ability').value
    // let creator = document.querySelector('#creator').value
    let history = document.querySelector('#history').value
    let about = document.querySelector('#about').value
    let imageSrc = document.querySelector('#imageSrc').value
    let ageCalcQ = document.querySelector('#ageCalcQ').value != "" ? document.querySelector('#ageCalcQ').value : ""
    // let extlinks = document.querySelector('#extlinks').value

    firebaseMonstersRef.doc().set(
      {
        exTime: extime,
        time: extime,
        user: {
          firstname: firstname,
          lastname: lastname,
          email: email,
          age: uAge,
        },
        monster: {
          mname: mname,
          appearance: appearance,
          height: height,
          heightUnit: heightUnit,
          weight: weight,
          weightUnit: weightUnit,
          birth: {
            stringBirth: stringBirth,
            yyyy: yyyy,
            dd: dd,
            mm: mm,
            ageCalcQ: ageCalcQ
          },
          pog: pog,
          ability: ability,
          creator: creator,
          history: history,
          about: about,
          extlinks: extlinks,
          images: imageSrc

        }


      }
    )
    toUpload.doc(idToDelete).delete()
  })
}








