$(document).ready(() => {
  //////////Chat with Socket.io//////////
  var socket = io();
  $("#chatForm").submit(() => {
    let text = $("#chat-input").val();
    let userName = $("#chat-userName").val();
    let userId = $("#chat-userId").val();
    socket.emit("message", {
      content: text,
      userName: userName,
      userId: userId,
    });
    $("#chat-input").val("");
    return false;
  });

  socket.on("message", (message) => {
    displayMessage(message);
    for (let i = 0; i < 5; i++) {
      $(".chat-icon").fadeOut(500).fadeIn(500);
    }
  });

  socket.on("load all messages", (data) => {
    data.forEach((message) => {
      displayMessage(message);
    });
  });

  socket.on("user disconnected", () => {
    console.log("User left.");
    // displayMessage({
    //   userName: "Notice",
    //   content: "User left the chat",
    // });
  });

  let displayMessage = (message) => {
    $("#chat").prepend(
      $("<div>").html(
        `<div class="media mb-3">
            <div class="media-body">
            <div class="small font-weight-bold ${getCurrentUserClass(
              message.user
            )}">
              ${message.userName}
            </div>
            <div class="bg-light rounded py-2 px-3">
              <p class="text-small mb-0 text-muted">
                ${message.content}
              </p>
            </div>
          </div>
        </div>`
      )
    );
  };

  let getCurrentUserClass = (id) => {
    let userId = $("#chat-userId").val();
    return userId === id ? "current-user" : "";
  };

  //////////COURSES IMAGE UPLOAD//////////
  $(document).on("change", ".btn-file :file", function () {
    var input = $(this),
      label = input.val().replace(/\\/g, "/").replace(/.*\//, "");
    input.trigger("fileselect", [label]);
  });

  $(".btn-file :file").on("fileselect", function (event, label) {
    var input = $(this).parents(".input-group").find(":text"),
      log = label;

    if (input.length) {
      input.val(log);
    } else {
      if (log) alert(log);
    }
  });
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $("#img-upload").attr("src", e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  $("#imgInp").change(function () {
    readURL(this);
  });

  //////////COURSES INDEX//////////
  $("#coursesIndex").html("");
  $.get("/api/courses", (results = {}) => {
    let c = results.data;
    if (c.courses.length > 0) {
      c.courses.forEach((course) => {
        $("#coursesIndex").append(
          `
                <div>
                  <hr />
                  <div class="course-gallery row mb-3 mt-3">
                    <div class="col-lg-4">
                      <img class="img-thumbnail" src="${
                        course.image
                      }" alt="Course Image" />
                    </div>
                    <div class="col-lg-8 mt-2">
                      <h3 class="course-title"><a href="#">${
                        course.title
                      }</a></h3>
                      <p>${course.description}</p>
                      <p>${course.author}</p>
                      <button class="btn btn-sm join-btn ${
                        course.joined ? "btn-secondary" : "btn-primary"
                      }" data-id="${course._id}" style="color: #fff;">${
            !course.joined ? "Join" : "Joined"
          }</button>
                    </div>
                  </div>
                  </div>
          `
        );
      });
    }
  }).then(() => {
    addJoinListener();
  });

  //////////SEARCH COURSE//////////
  let search = document.getElementById("search");
  search.addEventListener("keyup", filterResults);
  function filterResults() {
    let searchValue = document.getElementById("search").value.toUpperCase();
    let courses = document.getElementById("coursesIndex");
    let courseTitle = courses.querySelectorAll(".course-title");

    for (let i = 0; i < courseTitle.length; i++) {
      let a = courseTitle[i].getElementsByTagName("a")[0];
      if (a.innerHTML.toUpperCase().indexOf(searchValue) > -1) {
        courseTitle[i].style.display = "block";
      } else {
        courseTitle[i].parentElement.parentElement.parentElement.style.display =
          "none";
        document.getElementById(
          "formCol"
        ).innerHTML = `<p><a href="/courses">Back to courses</a></p>`;
      }
    }
  }

  //////////LATEST COURSES//////////
  $("#latestCourses").html("");
  $.get("/api/courses", (results = {}) => {
    let c = results.data;
    c.courses.length = 3;
    if (c.courses.length > 0) {
      c.courses.forEach((course) => {
        $("#latestCourses").append(
          `
                <div class="col-lg-4 mb-3">
                  <div class="card">
                    <img class="card-img-top" src="${
                      course.image
                    }" alt="Card image cap" />
                    <div class="card-body" style="max-height: 150px;">
                    <h5 class="card-title">${course.title}</h5>
                    <p class="card-text">${course.description.slice(
                      0,
                      100
                    )} ...</p>
                    </div>
                    <div class="card-body">
                      <button class="btn btn-block join-btn ${
                        course.joined ? "btn-secondary" : "btn-primary"
                      }" data-id="${course._id}" style="color: #fff;">${
            course.joined ? "Joined" : "Join"
          }</button>
                    </div>
                  </div>
                </div>
        `
        );
      });
    }
  }).then(() => {
    addJoinListener();
  });
});

//////////BUTTON LISTENER/////////
let addJoinListener = () => {
  $(".join-btn").click((event) => {
    let $button = $(event.target);
    let courseId = $button.data("id");
    location.reload();
    $.get(`/api/courses/${courseId}/join`, (results = {}) => {
      let data = results.data;
      if (data && data.success) {
        $button
          .text("Joined")
          .addClass("btn-secondary")
          .removeClass("btn-primary");
      } else {
        $button
          .text("Login to Join")
          .addClass("btn-danger")
          .removeClass("btn-primary");
      }
    });
  });
};

//////////Google MAPS//////////
function initMap() {
  var options = {
    center: { lat: 51.2277, lng: 6.7735 },
    zoom: 10,
  };

  var map = new google.maps.Map(document.getElementById("map"), options);

  var marker = new google.maps.Marker({
    position: { lat: 51.29409, lng: 6.81929 },
    map: map,
  });

  // var infoWindow = new google.maps.InfoWindow({
  //   content: `<h4>gngLAB GmbH</h4>`,
  // });

  // marker.addListener("click", function () {
  //   infoWindow.open(map, marker);
  // });
}
