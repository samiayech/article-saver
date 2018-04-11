import axios from "axios";
// SavedListItem Class to retrieve articles from API and insert it in the savetHolder section(ul)
export default class SavedListItem{
    constructor(retrievedSavedId, saveHolder, sharedArrayIds, firebaseRef){
        this.retrievedSavedId = retrievedSavedId;   // retrieved ID from firebase
        this.saveHolder = saveHolder;              // ul
        this.sharedArrayIds = sharedArrayIds;      // shared array with ids
        this.firebaseRef = firebaseRef;
        this.responseSavedArticle = [];           // to save the retrieved certain article with its properties       
        this.saveListHolder = "";                // to save the li(listHolder) contains a certain retrieved article from API in it        
        this.retrieveAPI();                     // get data(articles) from API
       // console.log(this.responseSavedArticle);  //but why the values inside the first element is not accessable
       this.setupEvents();
       
    }
    //retrieve articles from API according their IDs
    retrieveAPI(){
        let dataRequest = "";
        dataRequest = `https://nieuws.vtm.be/feed/articles?format=json&ids=${this.retrievedSavedId}`; // search link from API by id
        axios.get(dataRequest)         //get the Api data related to a certain retrieved Id
        .then(function(response) {      // you can use here  arrow function(response=>) instead of bind(this)
          this.responseSavedArticle.push(response.data.response.items[0]);   //current retrieved saved article from  Api related to a certain Id
          console.log(response.data.response.items[0]);       // show the title of the reteieved saved article    
          this.generateHTML();
        }.bind(this))
        .catch(function (error) {
          console.log(error);
        });
      }

      //write saved items(article) to the Dom inside the savelistHolder
    generateHTML(){
        const html = `
            <li data-id='${this.retrievedSavedId}' id='save-${this.retrievedSavedId}' class='savedArticle'>
                <img href="#" alt="image" src="${this.responseSavedArticle[0].image.thumb}">
                <div>
                    <h2>${this.responseSavedArticle[0].title}</h2>
                    <span>${this.responseSavedArticle[0].created.formatted}</span>
                    <a href="#" class="delete"></a>
                </div>
             </li>
            `;    
        this.saveHolder.insertAdjacentHTML("beforeend", html);          // insert the li saved article in ul
        this.saveListHolder = this.saveHolder.querySelector(`#save-${this.retrievedSavedId}`); // refere to a certain(current) saved article
        //this.saveListHolder = document.getElementById(`save-${this.retrievedSavedId}`); // refere to a certain(current) saved article
        //console.log(this.saveListHolder);
    }
    
    setupEvents(){
        this.saveHolder.addEventListener('click', this.handelDelete.bind(this));  // delete event on recycle bin logo     
    }

    // function to delete a certian retrieved article from:
    // 1- save section.  2- related Id from the shared memory array.  3- related Id from firebase
    handelDelete(e){
        e.preventDefault();
        if(e.target.nodeName == 'A'){
            const id = e.target.parentElement.parentElement.dataset.id;     // this is obtained easily from <li data-id='${this.retrievedSavedId}' /li>
            //console.log(id);
            e.target.parentElement.parentElement.remove();   // remove li from ul from the DOM
            //remove a particular id from the shared array
            this.sharedArrayIds = this.sharedArrayIds.filter(function(element){
                return element != id;  // return all array element that not equal the id
            })
            //update firebase
            this.firebaseRef.set(this.sharedArrayIds);
        }
        //console.log(this.sharedArrayIds);
    }
}