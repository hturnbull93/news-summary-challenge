class StoryHandler {
  constructor(apiUrl = "https://content.guardianapis.com/search") {
    this.CONFIG = this.getJSON("/config.json");
    this.TODAY = new Date().toISOString().split("T")[0];
    this.RESULTS_NUMBER = 20;
    this.ORDER_BY = "newest";
    this.QUERY_STRING = `?from-date=${this.TODAY}&order-by=${this.ORDER_BY}&page-size=${this.RESULTS_NUMBER}&api-key=`;
    this.URL = apiUrl + this.QUERY_STRING;
    this.stories = this.fetchStories();
  }

  async getJSON(location) {
    let response = await fetch(location);
    let json = await response.json();
    return json;
  }

  async fetchStories() {
    let key = await this.CONFIG;
    let json = await this.getJSON(this.URL + key.guardianApiKey);
    let results = json.response.results;
    return results.map((story) => {
      return new Story(story.webTitle);
    });
  }

  async renderHeadlines() {
    let stories = await this.stories;
    let list = document.getElementById("article-list");
    stories.forEach((story) => {
      list.append(story.headlineComponent());
    });
  }
}