const newPostButton = document.querySelector(".new-post-btn");
const newPostForm = document.querySelector(".new-post-form");
const cancelButton = document.createElement("button");

cancelButton.textContent = "cancel";
cancelButton.classList.add("cancel-btn");
cancelButton.classList.add("button");
cancelButton.style.display = "none";

newPostButton.addEventListener("click", function() {
  newPostButton.style.display = "none";
  cancelButton.style.display = "block";
  newPostForm.style.display = "block";
});

cancelButton.addEventListener("click", function() {
  newPostButton.style.display = "block";
  cancelButton.style.display = "none";
  newPostForm.style.display = "none";
});

newPostButton.parentNode.insertBefore(cancelButton, newPostButton.nextSibling);