// public\js\app.js file for new post button and new post form functionality for logged in users only 

const newPostButton = document.querySelector(".new-post-btn"); // select the new post button
const newPostForm = document.querySelector(".new-post-form"); // select the new post form
const cancelButton = document.createElement("button"); // create the cancel button

cancelButton.textContent = "cancel"; // set the text of the cancel button
cancelButton.classList.add("cancel-btn"); // add the cancel button class
cancelButton.classList.add("button"); // add the button class
cancelButton.style.display = "none"; // hide the cancel button

// show and hide new post form and cancel button
newPostButton.addEventListener("click", function() { 
  newPostButton.style.display = "none"; 
  cancelButton.style.display = "block";
  newPostForm.style.display = "block";
});
 

// show and hide new post form and cancel button
cancelButton.addEventListener("click", function() {
  newPostButton.style.display = "block";
  cancelButton.style.display = "none";
  newPostForm.style.display = "none";
});

// insert cancel button before new post button
newPostButton.parentNode.insertBefore(cancelButton, newPostButton.nextSibling);