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
  });

  let displayMessage = (message) => {
    $("#chat").prepend(
      $("<div>").html(
        `<div class="media mb-3">
            <div class="media-body ml-3">
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
    let data = results.data;
    if (!data || !data.courses) return;
    data.courses.forEach((course) => {
      $("#coursesIndex").append(
        `
                  <hr />
                  <div class="row mb-3 mt-3">
                    <div class="col-lg-3">
                      <img class="img-thumbnail" src="${
                        course.image
                      }" alt="Course Image" />
                    </div>
                    <div class="col-lg-8 mt-2">
                      <h3><a href="/courses/${course._id}">${
          course.title
        }</a></h3>
                      <p>${course.description}</p>
                      <button class="btn btn-sm join-btn ${
                        course.joined ? "btn-secondary" : "btn-primary"
                      }" data-id="${course._id}" style="color: #fff;">${
          course.join ? "Joined" : "Join"
        }</button>
                    </div>
                    <div class="col-lg-1 mt-2">
                      <h4>
                        $ ${course.cost}<span>
                      </h4>
                    </div>
                  </div>
          `
      );
    });
  }).then(() => {
    addJoinListener();
  });

  //////////LATEST COURSES//////////
  $("#latestCourses").html("");
  $.get("/courses?format=json", (data) => {
    let c = data;
    c.length = 3;
    if (c.length > 0) {
      c.forEach((course) => {
        $("#latestCourses").append(
          `
                <div class="col-lg-4 mb-3">
                  <div class="card">
                    <img class="card-img-top" src="${
                      course.image
                    }" alt="Card image cap" />
                    <div class="card-body">
                    <h5 class="card-title"><a href="/courses/${course._id}">${
            course.title
          }</a></h5>
                    <p class="card-text">${course.description}</p>
                    </div>
                    <div class="card-body">
                      <button class="btn btn-block join-btn ${
                        course.joined ? "btn-secondary" : "btn-primary"
                      }" data-id="${course._id}" style="color: #fff;">${
            course.join ? "Joined" : "Join"
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
