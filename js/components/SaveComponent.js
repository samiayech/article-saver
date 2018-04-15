import SavedListItem from "./SavedListItem";
// SaveComponent class to genetate Html elements and get data from firebase
export default class SaveComponent{
    constructor(saveSection, sharedArrayIds, firebaseRef, searchListHolder, noPages){
        this.saveSection = saveSection;        // save section holder
        this.sharedArrayIds = sharedArrayIds;  // shared array
        this.firebaseRef = firebaseRef;
        this.saveHolder = ""; //ul element to save li(article) element in it    
        this.searchListHolder = searchListHolder;   // searched article holder (ul)
        this.noPages = noPages;   // no of pages
        this.generateHtml();
        //console.log(this.saveHolder);
        this.loadFBdata();
    }
    // Insert HTML elements in the saved articles section
    generateHtml(){
        const html =`<h1 class="title">Saved Articles</h1>
                     <ul id="saveHolder">
                     <a href="#" id="loadMore">load more...</a>
                     </ul>
                     `;
        this.saveSection.insertAdjacentHTML('afterbegin', html);
        this.saveHolder = this.saveSection.querySelector('#saveHolder'); 
        //this.saveHolder = document.getElementById('saveHolder'); 
    }

    // connect with firebase and retrieves IDs of Articles then store IDs in shared array
    loadFBdata(){
        //???????important question: must use once() function not on() but why???????? on() will make the output repeatly retrieved but once() means get the elements one time 
        this.firebaseRef.once("value", function(snapshot){   //snapshot can be another self chosen variable. (can also use functionname only then write in new line, function functionname(snapshot){})
                                                             // this executed function is bind to all property constructor by using bind(this) at the end of it ( or you can use arrow function as snapshot =>)
        let collection = snapshot.val();        //assign the result articles array to a variable
        for(let prop in collection){            // loop through an object array and get Ids
            this.sharedArrayIds.push(collection[prop]);     // push all retrieved Ids in the shared array 
            new SavedListItem(collection[prop], this.saveHolder, this.sharedArrayIds, this.firebaseRef, this.searchListHolder, this.noPages);     //create an object of SavedListItem to get data from API                  
         }
        }.bind(this), function (errorObject) {
                console.log("The read failed: " + errorObject.code);
        });
    }
}