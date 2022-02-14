import{ref as dataRef, get,set, update, remove} from 'firebase/database';
import {db} from '../libs/firebaseConfig';

function hockeySticks ({key,title,hand, price, imageUrl}){
    const template =
    `<aside class="sticks" data-key="${key}">
        <figure>
            <img src="${imageUrl}" width="160" alt="${title}">
            <figcaption><h2>Title: ${title}</h2></figcaption>
            <figcaption><h2>Price: $${price}</h2></figcaption>
            <figcaption><h2>Hand: ${hand}</h2></figcaption>
        </figure>
        <footer>
            <button id="edit" data-key="${key}">Edit</button>
            <button id="delete" data-key="${key}">Delete</button>
        </footer>
        <div id="myModal" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <p>The item has been successfully deleted</p>
            </div>
        </div>
    </aside>`

    const element = document.createRange().createContextualFragment(template).children[0];
    addStickControls(element)
    return element
}

function addStickControls(stick){
    stick.querySelector('#edit').addEventListener('click', onEditStick);
    stick.querySelector('#delete').addEventListener('click', onDeleteStick);
    var span = document.getElementsByClassName("close")[0];
}

function onEditStick(e){
    const key = e.target.dataset.key;
    sessionStorage.setItem('key',key)
    window.location.assign('update.html')
}

function onDeleteStick(e){
    const key = e.target.dataset.key;
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
        remove(dataRef(db,'sticks/' + key));
        window.location.assign('index.html')
    }
}

export{hockeySticks}