import React from "react";
import Header from "./components/header";

export default function Contact() {
  // Validate form
  function validateForm(e) {
    const form = document.getElementById("contactForm");
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];

    function openModal() {
      modal.style.display = "block";
    }

    span.onclick = function () {
      modal.style.display = "none";
    };

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };

    e.preventDefault();
    if (form) {
      let fNameInput = document.getElementById("fname");
      let lNameInput = document.getElementById("lname");
      let emailInput = document.getElementById("email");
      let pNumberInput = document.getElementById("pNumber");
      let commentsInput = document.getElementById("comments");
      var emailRegx = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)?$/;
      var pNumberRegx =
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
      let fNameValidation = document.getElementById("fNameValidation");
      let lNameValidation = document.getElementById("lNameValidation");
      let emailValidation = document.getElementById("emailValidation");
      let pNumberValidation = document.getElementById("pNumberValidation");
      let commentsValidation = document.getElementById("commentsValidation");
      let validCounter = 0;

      let fName = fNameInput.value.toString().trim();
      let lName = lNameInput.value.toString().trim();
      let email = emailInput.value.toString().trim();
      let pNumber = pNumberInput.value.toString().trim();
      let comments = commentsInput.value.toString();

      if (fName === "") {
        fNameInput.style.backgroundColor = "rgb(232, 132, 132)";
        fNameValidation.innerHTML = "Please enter your first name";
      } else {
        fNameInput.style.backgroundColor = "";
        fNameValidation.innerHTML = "";
        validCounter++;
      }

      if (lName === "") {
        lNameInput.style.backgroundColor = "rgb(232, 132, 132)";
        lNameValidation.innerHTML = "Please enter your last name";
      } else {
        lNameInput.style.backgroundColor = "";
        lNameValidation.innerHTML = "";
        validCounter++;
      }

      if (email === "") {
        emailInput.style.backgroundColor = "rgb(232, 132, 132)";
        emailValidation.innerHTML = "Please enter your email";
      } else if (emailRegx.test(email)) {
        emailInput.style.backgroundColor = "";
        emailValidation.innerHTML = "";
        validCounter++;
      } else {
        emailInput.style.backgroundColor = "rgb(232, 132, 132)";
        emailValidation.innerHTML = "Please enter a valid email";
      }

      if (pNumber === "") {
        pNumberInput.style.backgroundColor = "rgb(232, 132, 132)";
        pNumberValidation.innerHTML = "Please enter a number";
      } else if (pNumberRegx.test(pNumber)) {
        pNumberInput.style.backgroundColor = "";
        pNumberValidation.innerHTML = "";
        validCounter++;
      } else {
        pNumberInput.style.backgroundColor = "rgb(232, 132, 132)";
        pNumberValidation.innerHTML = "Please enter a valid number";
      }

      if (comments === "") {
        commentsInput.style.backgroundColor = "rgb(232, 132, 132)";
        commentsValidation.innerHTML = "Please enter a comment";
      } else {
        commentsInput.style.backgroundColor = "";
        commentsValidation.innerHTML = "";
        validCounter++;
      }

      if (validCounter === 5) {
        document.getElementById(
          "thankYouMessage"
        ).innerHTML = `Thank you ${fName} ${lName} for sending us a message!`;
        fNameInput.value = "";
        lNameInput.value = "";
        emailInput.value = "";
        pNumberInput.value = "";
        commentsInput.value = "";
      }

      openModal();
      window.setTimeout(function () {
        modal.style.display = "none";
        document.getElementById("thankYouMessage").innerHTML = "";
        validCounter = 0;
      }, 5000);
    }
  }

  // Return the JSX for the Contact component
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>GameGO</title>
      <Header />
      <main id="contact-main">
        <h1>SEND US A MESSAGE</h1>
        <div id="myModal" className="modal">
          <div className="modal-content">
            <span className="close">×</span>
            <ul id="validNotificatin">
              <li id="fNameValidation" />
              <li id="lNameValidation" />
              <li id="emailValidation" />
              <li id="pNumberValidation" />
              <li id="commentsValidation" />
              <li id="thankYouMessage" />
            </ul>
          </div>
        </div>
        <div className="contact-form">
          <form id="contactForm" onSubmit={validateForm}>
            <div className="form-section">
              <label htmlFor="fname">FIRST NAME</label>
              <input type="text" name="fname" id="fname" autoComplete="off" />
              <small>John/Jane</small>
            </div>
            <div className="form-section">
              <label htmlFor="lname">LAST NAME</label>
              <input type="text" name="lname" id="lname" autoComplete="off" />
              <small>Doe</small>
            </div>
            <div className="form-section">
              <label htmlFor="email">EMAIL</label>
              <input type="text" name="email" id="email" autoComplete="off" />
              <small>youremail@email.com</small>
            </div>
            <div className="form-section">
              <label htmlFor="pNumber">PHONE NUMBER</label>
              <input
                type="text"
                name="pNumber"
                id="pNumber"
                autoComplete="off"
              />
              <small>###-###-####</small>
            </div>
            <div className="form-section">
              <label htmlFor="comments">COMMENTS</label>
              <textarea name="comments" id="comments" defaultValue={""} />
            </div>
            <button id="contact-submit">Submit</button>
          </form>
        </div>
      </main>
    </>
  );
}
