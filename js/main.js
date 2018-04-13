import SaveComponent from "./components/SaveComponent";
import SearchComponent from "./components/SearchComponent";

// get holders from DOM
const searchSection = document.getElementById("search");
const saveSection = document.getElementById("save");

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCBtGD-vPUIySSFYwAdXArk64igNybw0sc",
  authDomain: "searcharticles-ad72a.firebaseapp.com",
  databaseURL: "https://searcharticles-ad72a.firebaseio.com",
  projectId: "searcharticles-ad72a",
  storageBucket: "searcharticles-ad72a.appspot.com",
  messagingSenderId: "902251444026"
};
firebase.initializeApp(config);

let DBcollection = "articles";
const firebaseRef = firebase.database().ref(`/${DBcollection}/`); // Make a reference to Firebase
let sharedArrayIds = []; // shared array, save selected articles( according their id) to be saved in firebase
console.log(sharedArrayIds);

const saveComponent = new SaveComponent(saveSection, sharedArrayIds, firebaseRef, searchListHolder);  // create saveComponent object
const saveHolder = saveComponent.saveHolder;      // saved article holder (ul)
const searchComponent = new SearchComponent(searchSection, sharedArrayIds, firebaseRef, saveHolder);  // create searchComponent object
const searchListHolder = searchComponent.searchListHolder;  // searched article holder (ul)

