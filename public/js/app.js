// public\js\app.js file for new post button and new post form functionality for logged in users only 

const newPostButton = document.querySelector(".new-post-btn"); // select the new post button
const newPostForm = document.querySelector(".new-post-form"); // select the new post form
const cancelButton = document.createElement("button"); // create the cancel button

cancelButton.textContent = "cancel"; // set the text of the cancel button
cancelButton.classList.add("cancel-btn"); // add the cancel button class
cancelButton.classList.add("button"); // add the button class
cancelButton.style.display = "none"; // hide the cancel button

// show and hide new post form and cancel button when clicked on the new post button
newPostButton.addEventListener("click", function () { // add an event listener to the new post button when clicked on the new post button
  newPostButton.style.display = "none";  // hide the new post button when clicked on the new post button
  cancelButton.style.display = "block"; // show the cancel button  when clicked on the cancel button
  newPostForm.style.display = "block"; // show the new post form  when clicked on the cancel button or the new post button
});


// show and hide new post form and cancel button when clicked on the new post button or the cancel button 
cancelButton.addEventListener("click", function () { // add an event listener to the cancel button when clicked on the cancel button
  newPostButton.style.display = "block"; // show the new post button when clicked on the cancel button
  cancelButton.style.display = "none"; // hide the cancel button when clicked on the cancel button
  newPostForm.style.display = "none"; // hide the new post form when clicked on the cancel button or the new post button
});

// insert cancel button before new post button if it exists (https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore)
newPostButton.parentNode.insertBefore(cancelButton, newPostButton.nextSibling); // insert the cancel button before the new post button (https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore)