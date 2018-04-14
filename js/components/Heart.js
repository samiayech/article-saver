import SavedListItem from "./SavedListItem";

//Heart class to develop events and functions on the Heart logo
export default class Heart{
    constructor(articleId, listResult, sharedArrayIds, firebaseRef, saveHolder, savedArticleId){
        this.articleId = articleId;                    // the id of searched articles
        this.listResult = listResult;                 // searched li(article)
        this.sharedArrayIds = sharedArrayIds;      // shared array
        this.firebaseRef = firebaseRef;
        this.saveHolder = saveHolder;           // save section holder (ul)
        this.savedArticleId = savedArticleId;   //true/false
        this.initializeHeart();  //to initialize heart color related to searched and saved articles simultaneously
        this.setupEvent();      // event on Heart element
    }
    initializeHeart(){
        if(this.savedArticleId == true){
            this.listResult.classList.add('true');   // add checked(color)
        }
        else{
            this.listResult.classList.remove('true');   // remain a heart without color 
        }
    }
    //important Note: here the event is done on li(listResult) because it is recieved from an object,
    // but if it i generated here in this class so can not make an event on it !!!!!!
    setupEvent(){
        this.listResult.querySelector('.heart').addEventListener('click', this.handleHeart.bind(this));
    }
    //handle heart element to save an article or remove an article from firebase
    handleHeart(e){
        e.preventDefault();
        console.log(`clicked: ${this.articleId}`);
        //console.log(e.target.parentElement);
        if(e.target.parentElement.classList.contains('true')){  // if a heart is previously checked (clicked)
         e.target.parentElement.classList.remove('true');  //undo checked
        //remove a particular id from the shared array
        /* this.sharedArrayIds = this.sharedArrayIds.filter(function(element){
            return element != this.articleId;  // return all array element that not equal the id 
            }.bind(this));*/

         //remove a particular id from the shared array
        let index = this.sharedArrayIds.indexOf(this.articleId);
        this.sharedArrayIds.splice(index,1);
        //remove an article from the saveHolder related to an clicked(uncolored) searched article
        saveHolder.querySelector(`#save-${this.articleId}`).remove();
             //console.log(saveHolder.querySelector(`#save-${this.articleId}`));       
        }
        else{ //if a heart is not previously checked, then add color to it and push the shared array          
            e.target.parentElement.classList.add('true'); 
            this.sharedArrayIds.push(this.articleId);
            //create new object of SearchListItem to be added in the save holder
            new SavedListItem(this.articleId, saveHolder, this.sharedArrayIds, this.firebaseRef);
        }
        console.log(this.sharedArrayIds);
        //update firebase 
        this.firebaseRef.set(this.sharedArrayIds); 
    }
}