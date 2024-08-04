//This is easier to reference. 
const JSON_BIN_BASE_URL="https://api.jsonbin.io/v3";
const JSON_BIN_ID  = "66a23a41e41b4d34e416ddac";

let storyBoard =[]; 

//Load Data
async function loadData (){
    let response = await axios.get(`${JSON_BIN_BASE_URL}/b/${JSON_BIN_ID}/latest`);
    return response.data.record;
}


//Save Data
async function saveData(objectToUpdate) {
    const response = await axios.put(`${JSON_BIN_BASE_URL}/b/${JSON_BIN_ID}`, storyBoard);

}

//Check and return data accordingly. 
function checkExist(checkFor, theRecord) {
    if (checkFor == "index") {
        let checked = storyBoard.findIndex(function (t) {
            return t.id == theRecord;
        });

        return checked;

    }

    if (checkFor == "id") {
        for (let thisId of storyBoard) {
            if (thisId.id == theRecord) {
                return thisId;
            }
        }
    }

}


//This is to add new story. 
function addNewStory(objectToUpdate,addAuthor,addStory) {

        let addStoryLine = {
            id: objectToUpdate.length + 1,
            authorName: addAuthor,
            storyLine: addStory,
        };

        objectToUpdate.push(addStoryLine);

}

//This is when you add a new story it will scroll to the new post.
function afterSubmit (){
        let containerScrollTo = document.querySelector(".storyContainer").clientHeight;
        window.scrollTo(0, containerScrollTo);
}

//This is to delete the story.
function deleteStory (objectToUpdate,itemToDelete)
{
    objectToUpdate.splice(itemToDelete, 1);
}

//This is to update the story.
function editStory(objectToUpdate,editedAuthor,editedStory){
    objectToUpdate.authorName = editedAuthor;
    objectToUpdate.storyLine = editedStory;
}