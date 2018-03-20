import axios from "axios";
import ResultListItem from "./components/ResultListItem";

const searchField = document.getElementById("searchField");
const resultHolder = document.getElementById("resultHolder");
let requestURL = "";
//const savedArticles = [];
document.querySelector("form").addEventListener("submit", handleFormSubmit);

function handleFormSubmit(e) {
  e.preventDefault();
  requestURL = `https://nieuws.vtm.be/feed/articles/solr?format=json&query=${searchField.value}`;			
  searchField.value = "";
  resultHolder.innerHTML = "";
  resultHolder.style.display = 'block';
  axios.get(requestURL)
  .then(function (response) {
 // console.log(response.data.response.items);
  response.data.response.items.forEach(function(article){
    let resultArticle = new ResultListItem(article, resultHolder);
  });
  })
  .catch(function (error) {
    console.log(error);
  });
}
