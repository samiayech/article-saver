import axios from "axios";
// SavedListItem Class to retrieve articles from API and insert it in the listHolder
export default class SavedListItem{
    constructor(retrievedId, saveHolder){
        this.savedId = savedId; // retrieved ID from firebase
        this.saveHolder = saveHolder;
        this.retrieveArticle = ""; // to save the li retrieved articles from API in it
        this.retrieveAPI(); // get data(articles) from API
        this.generateHTML();
    }
    retrievdeAPI(){
        //the ruslt from axios will be as an array contains elements
       // so choose which element is reauired and save it in variables to be used in the generatehtml function

    }
    generateHTML(){

    }
}