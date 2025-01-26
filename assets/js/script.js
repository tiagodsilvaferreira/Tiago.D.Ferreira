'use strict';

console.log("Script Loaded");

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// // add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

//filter variables
let filterItems = document.querySelectorAll("[data-filter-item]");

const updateFilterItems = function () {
  filterItems = document.querySelectorAll("[data-filter-item]");
};

// Array to store selected tags
let selectedTags = [];

// Filter function with exclusive matching
const filterFunc = function () {
  console.log("Selected Tags:", selectedTags); // Debugging

  for (let i = 0; i < filterItems.length; i++) {
    const itemCategories = filterItems[i].dataset.category.split(",").map(tag => tag.trim());

    // Show item if "all" is selected or if it contains all selected tags
    if (selectedTags.includes("all") || selectedTags.every(tag => itemCategories.includes(tag))) {
      filterItems[i].classList.add("active"); // Show item
    } else {
      filterItems[i].classList.remove("active"); // Hide item
    }
  }
};



// Event listener to handle multiple tag selection and "all" selection
for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase();


    if (selectedValue === "all") {
      // Clear all other tags and set selectedTags to only "all"
      selectedTags = ["all"];

      // Remove active class from all buttons and add it only to "all"
      filterBtn.forEach(btn => btn.classList.remove("active"));
      this.classList.add("active");
    } else {
      // Remove "all" if another tag is selected
      selectedTags = selectedTags.filter(tag => tag !== "all");

      // Toggle the selected tag in selectedTags array
      if (selectedTags.includes(selectedValue)) {
        // Remove the tag if already selected
        selectedTags = selectedTags.filter(tag => tag !== selectedValue);
        this.classList.remove("active");
      } else {
        // Add the tag if it’s not selected
        selectedTags.push(selectedValue);
        this.classList.add("active");
      }
    }

    // Update the filter to show matching posts
    filterFunc();
  });
}


// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
  
}

const initializeFilterButtons = function () {
  const filterBtn = document.querySelectorAll("[data-filter-btn]");
  console.log("Reinitializing filter buttons, found:", filterBtn.length);

  for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function () {
      const selectedValue = this.innerText.toLowerCase();
  
  
      if (selectedValue === "all") {
        // Clear all other tags and set selectedTags to only "all"
        selectedTags = ["all"];
  
        // Remove active class from all buttons and add it only to "all"
        filterBtn.forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");
      } else {
        // Remove "all" if another tag is selected
        selectedTags = selectedTags.filter(tag => tag !== "all");
  
        // Toggle the selected tag in selectedTags array
        if (selectedTags.includes(selectedValue)) {
          // Remove the tag if already selected
          selectedTags = selectedTags.filter(tag => tag !== selectedValue);
          this.classList.remove("active");
        } else {
          // Add the tag if it’s not selected
          selectedTags.push(selectedValue);
          this.classList.add("active");
        }
      }
  
      // Update the filter to show matching posts
      filterFunc();
    });
  }


};

window.openInNewTab = function (url) {
  console.log("Opening in new tab:", url);
  window.open(url, '_blank');
};

window.downloadPDF = function (url) {
  console.log("Downloading PDF:", url);
  const link = document.createElement('a');
  link.href = url;
  link.download = url.split('/').pop(); // Use the filename from the URL
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

