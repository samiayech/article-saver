export default class ResultListItem{
    constructor(article, resultHolder){
        this.article = article;
        console.log(this.article);
        this.resultHolder = resultHolder;
        this.generateHTML();
        //this.setupEvents();
    }
    generateHTML() {
        const html = `
                 <div class="article">
                    <li>${this.article.fields.entity_id}</li>
                </div>
            `;
        this.resultHolder.insertAdjacentHTML("beforeend", html);
      }
    

}