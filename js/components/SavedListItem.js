import axios from "axios";
var popupS = require('popups');  //import popup from Node Module
import $ from "jquery";         // import jQuery
require("jquery-mousewheel")($);
require("malihu-custom-scrollbar-plugin")($);  //require custom scroll bar from module

// SavedListItem Class to retrieve articles from API and insert it in the savetHolder section(ul)
export default class SavedListItem{
    constructor(retrievedSavedId, saveHolder, sharedArrayIds, firebaseRef, searchListHolder, noPages){
        this.retrievedSavedId = retrievedSavedId;   // retrieved ID from firebase
        this.saveHolder = saveHolder;              // ul
        this.sharedArrayIds = sharedArrayIds;      // shared array with ids
        this.firebaseRef = firebaseRef;
        this.responseSavedArticle = [];           // to save the retrieved certain article with its properties       
        this.saveListHolder = "";                // to save the li(listHolder) contains a certain retrieved article from API in it        
        this.searchListHolder;                  // searched article holder (ul)
        this.noPages = noPages;                 // no of pages
        this.noOfArticles = this.sharedArrayIds.length;   
        this.retrieveAPI();                     // get data(articles) from API
         //console.log(this.responseSavedArticle);  //but why the values inside the first element is not accessable
        this.setupEvents();  
    }
    //retrieve articles from API according their IDs
    retrieveAPI(){
        let dataRequest = "";
        dataRequest = `https://nieuws.vtm.be/feed/articles?format=json&fields=html&ids=${this.retrievedSavedId}`; // search link from API by id
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
                <div class="imgHolder">
                    <img href="#" alt="image" src="${this.responseSavedArticle[0].image.thumb}">
                </div>
                <div class="text">
                    <h2>${this.responseSavedArticle[0].title}</h2>
                    <time class="time">${this.responseSavedArticle[0].created.formatted}</time>
                    <span class="showMore">Show more..</span>
                    <a href="#" class="delete"></a>
                </div>
             </li>
            `; 
            //view 1articles in one page   
            if (this.noOfArticles > 10 && this.noPages == 1) {
                this.saveHolder.querySelector("#loadMore").style.display = "block";
              }
        this.saveHolder.insertAdjacentHTML("afterbegin", html);          // insert the li saved article in ul
        this.saveListHolder = this.saveHolder.querySelector(`#save-${this.retrievedSavedId}`); // refere to a certain(current) saved article(li)
        //this.saveListHolder = this.saveHolder.querySelector('li');
        // this.saveListHolder = document.getElementById(`save-${this.retrievedSavedId}`); // refere to a certain(current) saved article
              //console.log(this.saveListHolder);        
    }
    // important note: the event must be on ul and can not be on li directly because li is not recieved directly from instance object but it is generated here in this class
    setupEvents(){
        this.saveHolder.addEventListener('click', this.handelDelete.bind(this));  // delete event on recycle bin logo  
       // this.saveHolder.querySelector('li').addEventListener('click', this.handlePopup.bind(this));  // handle popup event on article(li)      
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
            if(searchListHolder.querySelector(`#search-${id}`)){
             //remove the colored heart of an article from the searchHolder related to an clicked(recycle bin) in saved article
                searchListHolder.querySelector(`#search-${id}`).classList.remove('true');
                     //console.log(searchListHolder.querySelector(`#search-${id}`));
            }            
            //update firebase
            this.firebaseRef.set(this.sharedArrayIds);
        }     //console.log(this.sharedArrayIds); 

        // if other elemnts are selected , then execute popups function to handle saved article by generating a details popup window
        if(e.target.nodeName != 'A'){ 
            console.log(e.target);  
            const id = e.target.parentElement.dataset.id;  
            if(this.retrievedSavedId == id || e.target.parentElement.parentElement.dataset.id == this.retrievedSavedId){
                popupS.modal({
                    title:   `${this.responseSavedArticle[0].title}`,
                    content: `
                        <div class="popup">
                            <img href="#" alt="image" src="${this.responseSavedArticle[0].image.medium}">
                            <time class="time">${this.responseSavedArticle[0].created.formatted}</time>
                            <p>${this.responseSavedArticle[0].text_html}</p>
                            <a href="${this.responseSavedArticle[0].url
                            }">Show original..</a>
                        </div>`
                }); 
            }
             //add scrollbar to popup window
            $(".popup").mCustomScrollbar({
                theme: "dark",
                advanced: { updateOnContentResize: true }
              });            
        }
    }
}