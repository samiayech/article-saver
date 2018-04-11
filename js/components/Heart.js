//Heart class to develop events and functions on the Heart logo
export default class Heart{
    constructor(articleId, listResult, sharedArrayIds, firebaseRef){
        this.articleId = articleId;                    // the id of searched articles
        this.listResult = listResult;                 // li(article)
        this.sharedArrayIds = sharedArrayIds;      // shared array
        this.firebaseRef = firebaseRef;
       // initializeHeart(); //to initialize heart color related to searched and saved articles
        this.setupEvent(); // event on Heart element
    }
    setupEvent(){
        this.listResult.querySelector('.heart').addEventListener('click', this.handleHeart.bind(this));
    }
    //handle heart element to save an article or remove an article from firebase
    handleHeart(e){
        e.preventDefault();
        console.log(`clicked: ${this.articleId}`);
        console.log(e.target.parentElement);
        if(e.target.parentElement.classList.contains('true')){  // if a heart is previously checked (clicked)
         e.target.parentElement.classList.remove('true');  //undo checked
        //remove a particular id from the shared array
         //this filter function is not ideal because it cashed the previously removed index
        /* this.sharedArrayIds = this.sharedArrayIds.filter(function(element){
            return element != this.articleId;  // return all array element that not equal the id 
            }.bind(this));*/

         //remove a particular id from the shared array
        let index = this.sharedArrayIds.indexOf(this.articleId);
        this.sharedArrayIds.splice(index,1);
        }
        else{ //if a heart is not previously checked, then add color to it and push the shared array          
            e.target.parentElement.classList.add('true'); 
            this.sharedArrayIds.push(this.articleId);
        }
        console.log(this.sharedArrayIds);
        //update firebase 
        this.firebaseRef.set(this.sharedArrayIds); 
    }
}