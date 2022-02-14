import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import {ref as databaseRef, push, set, get} from 'firebase/database'
import { db, storage  } from "./libs/firebaseConfig";


document.forms["stickForm"].addEventListener("submit", onAddRental);
document.querySelector("#stickImage").addEventListener("change", onImageSelected);

//Loading form submit event handler
function onAddRental(e) {
    e.preventDefault();
    uploadNewVacactionRenal();
    }


function onImageSelected(e) {
    let file = e.target.files[0];
    document.querySelector(".display img").src = URL.createObjectURL(file);
}

async function uploadNewVacactionRenal() {
    const title = document.querySelector('#stickTitle').value.trim();
    const price = document.querySelector('#stickPrice').value.trim();
    const file = document.querySelector('#stickImage').files[0]
    const hand = document.querySelector('#stickHand').value.trim();

    const imageRef =     storageRef( storage, `images/${file.name}`);
    const dataRef =  databaseRef( db, 'sticks')
    const uploadResult = await uploadBytes(imageRef, file);
    const imageUrl =  await getDownloadURL(imageRef) 
    console.log(imageUrl)
    const storagePath = uploadResult.metadata.fullPath;
    const itemRef = push(dataRef)
    
    set(itemRef,{
    key:itemRef.key,
    sku:`jhrv${itemRef.key}`,
    storagePath,
    imageUrl,
    title,
    price,
    hand
    })
    
}

