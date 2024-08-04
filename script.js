// To add in functions to items that is on the page.
function preparePage() {

    //Submit New Story - Start
    let submitBtn = document.querySelector("button#submit");

    submitBtn.addEventListener("click", function () {
        let getStory = document.querySelector("textarea[name='story']").value;
        let getAuthor = document.querySelector("input[name='author']").value;

        if(getStory != "" && getAuthor != ""){
            let wordcount = getStory.split(" ").length;

            if(wordcount <= 30)
            {
            addNewStory(storyBoard, getAuthor, getStory);
            loadStory();
            saveData(storyBoard);
            afterSubmit();
            }
            else{
                alert("Please reduce the amount of words.")
            }
        }
        else{
            alert("Please fill in the details.")
        }

    })
}

function loadStory() {

    let fullTemplate = "";
    let appendTo = document.querySelector(".storyHere");


    storyBoard.forEach(function (element) {

        let template = `<div class="storyBlock py-4 d-flex flex-wrap" data-storyID="${element.id}">
                                <div class="storyInfo d-flex w-100 align-items-center py-2 justify-content-center">
                                    <div class="fontSmall align-self-center authorName">${element.authorName}</div>

                                    <div class="storySet d-flex ms-auto justify-content-end">
                                        <div class=" ps-1"><i class="bi bi-pencil-fill storyEdit " data-editID="${element.id}" data-bs-toggle="modal" data-bs-target="#exampleModal"></i></div>
                                        <div class=" ps-1"><i class="bi bi-trash3-fill storyDelete" data-deleteID="${element.id}"></i></div>

                                    </div>
                                </div>
                                <div class="storyContent w-100 sentence">
                                    "${element.storyLine}"
                                </div>
                            </div>`;

        fullTemplate += template;


    });

    appendTo.innerHTML = fullTemplate;


    //Add in button function after load.
    allBtn();
}


//Edit button functions to created Elements.
function allBtn() {

    //Delete Btn - Start
    let deleteBtn = document.querySelectorAll(".storyDelete");

    for (let button of deleteBtn) {
        button.addEventListener("click", function (event) {

            let buttonId = Number(event.target.dataset.deleteid);

            let detectRecord = checkExist("index", buttonId);

            if (detectRecord >= 0) {
                deleteStory(storyBoard, detectRecord)
                loadStory();
                saveData(storyBoard);
            }

        })
    }
    //Delete Btn - End


    //Edit Btn - Start
    let editList = document.querySelectorAll(".storyEdit");


    for (let editBtn of editList) {

        editBtn.addEventListener("click", function (event) {

            let eventId = Number(event.target.dataset.editid);

            let detectRecord = checkExist("id", eventId);

            if (detectRecord) {

                // This data will be updated to the items id that we want to edit.
                let dateT = document.querySelector(".submitEdit");
                dateT.dataset.editentry = eventId;

                document.querySelector(".editAuthor").value = detectRecord.authorName;
                document.querySelector(".editStory").value = detectRecord.storyLine;

            }
        })
    }

    //Edit Btn - End


    // submit Edited - Start
    let editSubmit = document.querySelector(".submitEdit");
   


    editSubmit.addEventListener("click", function (event) {
        let myModalEl = document.getElementById('exampleModal');
        let modal = bootstrap.Modal.getInstance(myModalEl);

        let eventId = Number(event.target.dataset.editentry);
        modal.hide();

        let newAuthor = document.querySelector(".editAuthor").value;
        let newStory = document.querySelector(".editStory").value;

        let detectRecord = checkExist("id", eventId);

        if (detectRecord) {
            editStory(detectRecord, newAuthor, newStory);
        }

        loadStory();
        saveData(storyBoard);

    })
    // submit Edited - End;

}


//To start the application for the website.
function app() {

    //Loading the data storyBoard.
    document.addEventListener("DOMContentLoaded", async function () {
        storyBoard = await loadData();
        loadStory();
    })

    //Function for items that is on the webpage.
    preparePage();


}


app();
