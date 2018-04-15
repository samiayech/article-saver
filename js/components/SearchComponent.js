import SearchListItem from "./SearchListItem";
import axios from "axios";
export default class SearchComponent{
    constructor(searchSection, sharedArrayIds, firebaseRef, saveHolder){
        this.searchSection = searchSection;  //search section at the left side
        this.sharedArrayIds = sharedArrayIds; //shared array to push or remove the chosed article id
        this.firebaseRef = firebaseRef;      //firebase connection reference
        this.searchListHolder = "";          //ul to insert searched articles(li) in it
        this.form = "";                      //contains the form of searching field and button
        this.saveHolder = saveHolder;      // savelistHolder, saved article holder (ul)
        this.generateHTML();          
        this.setupEvents();
    }
    //generate the search section
    generateHTML(){
        const html =`<h1 class="title">Search Articles</h1>
                    <form action="">
                        <input id="searchField" type="text" placeholder="Find an article..">
                        <button id="button"><i class="fa fa-search"></i></button>
                    </form>
                     <ul id="searchListHolder" class="animate-bottom"></ul>
                `;
        this.searchSection.insertAdjacentHTML('beforeend', html); //insert html elements in search section
        this.searchListHolder = this.searchSection.querySelector('#searchListHolder'); // reference to ul      // why querySelector works and use this.searchSection doesnot work
        this.form = this.searchSection.querySelector('form'); //reference to the form            // why querySelector works and use this.searchSection doesnot work
    }

    setupEvents(){
        this.form.addEventListener("submit", this.handleFormSubmit.bind(this));
      //  this.searchListHolder.addEventListener('click', this.handleSearchHolder.bind(this));
    }
    
    handleFormSubmit(e) {
        e.preventDefault();
        //console.log(e); 
        document.querySelector('#loader').style.display = "block";   //show the loader
        //show results after 2000ms
        setTimeout(function(showResult){
            document.querySelector('#loader').style.display = "none";
            this.searchListHolder.style.display = 'block'; 
            document.querySelector('.copy').style.display = "block";
        }.bind(this), 2000);      
        let searchField = this.form.querySelector('#searchField').value; //reference to search field
        let requestURL = `https://nieuws.vtm.be/feed/articles/solr?format=json&query=${searchField}`;			
        searchField = ""; 
        console.log( this.searchListHolder); 
        this.searchListHolder.innerHTML = ""; 
        axios.get(requestURL)
        .then(function (response) {
            console.log(response.data.response.items);
            response.data.response.items.forEach(function(article){   //loop through the items property
            // let resultArticle = new ResultListItem(article, resultHolder, searchedArticles, saveId, undoSaveId); //result items
            new SearchListItem(article, this.searchListHolder, this.sharedArrayIds, this.firebaseRef, this.saveHolder); //result items
           }.bind(this));
        }.bind(this))
        .catch(function (error) {
        console.log(error);
        });
    }
}