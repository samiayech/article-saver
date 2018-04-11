import SearchListItem from "./SearchListItem";
import axios from "axios";
export default class SearchComponent{
    constructor(searchSection, sharedArrayIds, firebaseRef){
        this.searchSection = searchSection;  //search section at the left side
        this.sharedArrayIds = sharedArrayIds; //shared array to push or remove the chosed article id
        this.firebaseRef = firebaseRef;      //firebase connection reference
        this.searchListHolder = "";          //ul to insert articles(li) in it
        this.form = "";                      //contains the form of searching field and button
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
                     <ul id="searchListHolder"></ul>
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
        let searchField = this.form.querySelector('#searchField').value; //reference to search field
        let requestURL = `https://nieuws.vtm.be/feed/articles/solr?format=json&query=${searchField}`;			
        searchField = ""; 
        console.log( this.searchListHolder); 
        this.searchListHolder.innerHTML = ""; 
        this.searchListHolder.style.display = 'block'; 
        axios.get(requestURL)
        .then(function (response) {
            console.log(response.data.response.items);
            response.data.response.items.forEach(function(article){   //loop through the items property
            // let resultArticle = new ResultListItem(article, resultHolder, searchedArticles, saveId, undoSaveId); //result items
            new SearchListItem(article, this.searchListHolder, this.sharedArrayIds, this.firebaseRef); //result items
           }.bind(this));
        }.bind(this))
        .catch(function (error) {
        console.log(error);
        });
    }
}