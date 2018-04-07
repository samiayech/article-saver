import axios from "axios";
// SavedListItem Class to retrieve articles from API and insert it in the savetHolder section(ul)
export default class SavedListItem{
    constructor(retrievedSavedId, saveHolder){
        this.retrievedSavedId = retrievedSavedId;   // retrieved ID from firebase
        this.saveHolder = saveHolder;   //ul
        // this.title = "";    //store the title of the article
        // this.link = "";    //store the url of the article (more details)
        // this.date = "";    //store the date(formatted) of the article
        this.responseSavedArticle = []; //to save the retrieved certain article with its properties       
        this.saveListHolder = "";   // to save the li(listHolder) contains a certain retrieved article from API in it
        this.retrieveAPI();   // get data(articles) from API
        //console.log(this.responseSavedArticle[0]); //but why the values inside the first element is not accessable
    }
    //retrieve articles from API according their IDs
    retrieveAPI(){
                         /////////////////////////////////////////////////////////////////////////////////////////
                              /////  initialize saved articles   //////
                              // this must be at the beginning of executing main.js //
                  // 1- get the array from firebase : connect the firebase then use functions to get the array
                  // 2- loop through the array and for every id create an object of SavedListItem type to generate a saved article section as follows

        let dataRequest = "";
        dataRequest = `https://nieuws.vtm.be/feed/articles?format=json&ids=${this.retrievedSavedId}`; // search link from API by id
        axios.get(dataRequest) //get the Api data related to a certain retrieved Id
        .then(function(response) { // you can use here only arrow function(response=>) instead of bind(this)
          this.responseSavedArticle.push(response.data.response.items[0]); //current retrieved saved article from  Api related to a certain Id
         // console.log(response.data.response.items[0]);     // show the title of the reteieved saved article    
          //let savedArticle = new SavedListItem(saveHolder, collection[prop], response, deleteId);  // saved items
          this.generateHTML();
        }.bind(this))
        .catch(function (error) {
          console.log(error);
        });

      }

      //write saved items(article) to the Dom inside the savelistHolder
    generateHTML(){
        const html = `
            <li id='save-${this.retrievedSavedId}' class='savedArticle'>
                <span>${this.responseSavedArticle[0].title}</span>
                <a href="#" class="delete"></a>
             </li>
            `;    
        this.saveHolder.insertAdjacentHTML("beforeend", html); // insert the li saved article in ul
        this.saveListHolder = document.getElementById('save-${this.retrievedSavedId'); // refere to a certain(current) saved article
    }
}