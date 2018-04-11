import Heart from "./Heart";
//to generate and view the searched articles in ul
export default class SearchListItem{
    constructor(article, searchListHolder, sharedArrayIds, firebaseRef ){
        this.article = article;                    // the result of searched articles
        this.id = this.article.fields.entity_id;   // article id
        this.searchListHolder = searchListHolder;  //ul
        this.sharedArrayIds = sharedArrayIds;      // shared array
        this.firebaseRef = firebaseRef;
        this.listResult = "";  // article (li)
        this.generateHTML();
    }
    //generate the searched article and insert it in ul
    generateHTML(){ 
        const html = `
        <li data-id='${this.id}' id='search-${this.id}' class='article'>
            <h2>${this.article.title}</h2>
            <a href="#" class="heart"></a>
       </li>
    `;    
        //${this.article.fields.entity_id}
        this.searchListHolder.insertAdjacentHTML("beforeend", html);
        this.listResult = this.searchListHolder.querySelector(`#search-${this.id}`); //reference to the article(li)
        //create a heart object to handle save and remove events
       // let heartElement = new Heart(this.id, this.listResult, this.sharedArrayIds, this.firebaseRef); //new heart object  //may be use saveholder here from the savecomponent
    }
}