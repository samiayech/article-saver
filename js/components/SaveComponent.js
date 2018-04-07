import SavedListItem from "./SavedListItem";
// SaveComponent class to genetate Html elements and get data from firebase
export default class SaveComponent{
    constructor(saveSection, sharedArrayIds, firebaseRef){
        this.saveSection = saveSection;
        this.sharedArrayIds = sharedArrayIds;
        this.firebaseRef = firebaseRef;
        this.saveHolder = ""; //to save ul element in it    
        this.generateHtml();
        console.log(this.saveHolder);
        this.loadFBdata();
    }
    // Insert HTML elements in the saved articles section
    generateHtml(){
        const html =`<h1 class="title">Saved Articles</h1>
                     <ul id="saveHolder"></ul>
                     `;
        this.saveSection.insertAdjacentHTML('afterbegin', html);
        this.saveHolder = document.getElementById('saveHolder'); 
    }

    // connect with firebase and retrieves IDs of Articles then store IDs in shared array
    loadFBdata(){
        this.firebaseRef.on("value", function(snapshot){ //snapshot can be another self chosen variable. (can also use functionname only then write in new line, function functionname(snapshot){})
                                                        // this executed function is bind to all property constructor by using bind(this) at the end of it ( or you can use arrow function as snapshot =>)
        let collection = snapshot.val(); //assign the result articles array to a variable

        for(let prop in collection){ // loop through an object array and get Ids
            //console.log(collection[prop]);
            this.sharedArrayIds.push(collection[prop]); // push all retrieved Ids in the shared array 
            new SavedListItem(collection[prop], this.saveHolder); //create an object of SavedListItem to get data from API                  
         }
        }.bind(this), function (errorObject) {
                console.log("The read failed: " + errorObject.code);
        });
    }
}