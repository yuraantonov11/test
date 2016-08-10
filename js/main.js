// Initialize Firebase
const CONFIG = {
    apiKey: "AIzaSyAHMBygqsGx4jMtg4HRh3jv9YHRRCuOeyc",
    authDomain: "cookbook-9b975.firebaseapp.com",
    databaseURL: "https://cookbook-9b975.firebaseio.com",
    storageBucket: "cookbook-9b975.appspot.com",
};

firebase.initializeApp(CONFIG);
var recipes = firebase.database().ref('recipes');

recipes.on('value', function(snapshot) {
    // updateStarCount(postElement, snapshot.val());
    console.log(snapshot.val());
});

function base64(file, callback){
    var coolFile = {};
    function readerOnload(e){
        var base64 = btoa(e.target.result);
        coolFile.base64 = base64;
        callback(coolFile)
    };

    var reader = new FileReader();
    reader.onload = readerOnload;

    var file = file[0].files[0];
    coolFile.filetype = file.type;
    coolFile.size = file.size;
    coolFile.filename = file.name;
    reader.readAsBinaryString(file);
}

function writeUserData(configs) {
    recipes.push(configs || {});
}

recipes.orderByChild("timestamp").limitToLast(5).on("value", function(snapshot) {
    parseRecipes(snapshot.val());
});

function parseRecipes(recipes){
    let recipesElement = $('<div class="row"></div>');
    console.log(recipesElement);
    for (let recipe in recipes){
        let item = recipes[recipe];
        console.log(recipe);
        var pattern = `
            <div class="col s12 m6">
              <div class="card">
                <div class="card-image">
                  <img src="images/sample-1.jpg">
                  <span class="card-title">${item.title}</span>
                </div>
                <div class="card-content">
                  <p>I am a very simple card. I am good at containing small bits of information.
                  I am convenient because I require little markup to use effectively.</p>
                </div>
                <div class="card-action">
                  <a href="#">This is a link</a>
                </div>
              </div>
            </div>`;
        if (recipes.hasOwnProperty(recipe)){
            recipesElement.append(pattern);
            console.log(recipesElement);
            console.log(pattern);
        }
    }
    $('#recipes').html(recipesElement);

}