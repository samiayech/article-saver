//import SavedListItem from "./components/SavedListItem";
// SaveComponent class to genetate Html elements and get data from firebase
export default class SaveComponent{
    constructor(saveSection, savedArticleId, firebaseRef){
        this.saveSection = saveSection;
        this.savedArticleId = savedArticleId;
        this.firebaseRef = firebaseRef;
        this.saveHolder = "";
        this.generateHtml();
        this.loadFBdata();
    }
    // Insert HTML elements in the saved articles section
    generateHtml(){
        const html =`<h1 class="title">Saved Articles</h1>
                     <ul id="saveHolder"></ul>
                     `;
        this.saveSection.insertAdjacentHTML5('afterbegin', html);
        this.saveHolder = this.saveSection.getElementById('saveHolder'); 
    }

    // connect with firebase and retrieves IDs of Articles
    loadFBdata(){
        firebaseRef.on("value", function(snapshot){ //scapshot can be another self chosen variable. (can also use functionname only then write in new line, function functionname(snapshot){})
        let collection = snapshot.val(); //assign the result articles array to a variable
        for(let prop in collection){ // loop through an object array and get Ids
        //console.log(collection[prop]);
        savedArticleId.push(collection[prop]); // push all retrieved Ids in the shared array 
       // new SavedListItem(collection[prop], this.saveHolder); //create an object of SavedListItem to get data from API
        }
        });
    }
}