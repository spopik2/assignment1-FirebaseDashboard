import{ref as dataRef, get,set, update} from 'firebase/database';
import {db} from './libs/firebaseConfig';
import{hockeySticks} from './templates/hockeySticks';


async function pageInit(){
    const stickRef = dataRef(db, 'sticks/');
    const stickSnapShot = await get(stickRef)
    const data = stickSnapShot.val()
    
    const cards =Object.values(data).map(stick=>{
        const card = hockeySticks(stick)
        document.querySelector('main').append(card)
        return null
    });
}
pageInit()