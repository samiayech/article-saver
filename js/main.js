import SaveComponent from "./components/SaveComponent";

// get holders from DOM
const searchField = document.getElementById("searchField");
const searchSection = document.getElementById("search");
const saveSection = document.getElementById("save");

let DBcollection = "articles";
const firebaseRef = firebase.database().ref(`/${DBcollection}/`); // Make a reference to Firebase
let savedArticleId = []; // saved selected articles( according their id) to be saved in firebase

const saveComponent = new SaveComponent(saveSection, savedArticleId, firebaseRef);  // create saveComponent object
