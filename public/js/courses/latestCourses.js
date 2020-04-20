// fetch("/courses?format=json").then((res) => {
//   res.json().then((data) => {
//     var c = data;
//     c.length = 3;
//     if (c.length > 0) {
//       c.sort(function (a, b) {
//         return new Date(a.date) - new Date(b.date);
//       });
//       var temp = "";
//       data.forEach((course) => {
//         temp += `
//                 <div class="col-lg-4 mb-2">
//                   <div class="card">
//                     <img class="card-img-top" src="${course.image}" alt="Card image cap" />
//                     <div class="card-body">
//                     <h5 class="card-title"><a href="/courses/${course._id}">${course.title}</a></h5>
//                     <p class="card-text">${course.description}</p>
//                     </div>
//                     <div class="card-body">
//                       <button class="btn btn-primary btn-block join-button" data-id="${course._id}" style="cursor: pointer; color: #fff;">Join</button>
//                     </div>
//                   </div>
//                 </div>
//           `;
//       });
//     }
//     document.getElementById("latestCourses").innerHTML = temp;
//   });
// });

// let joinBtnListener = () => {
//   $(".join-button").click((event) => {
//     let $button =
//   })
// }

$(document).ready(() => {
  $("#latestCourses").html("");
  $.get("/courses?format=json", (data) => {
    let c = data;
    c.length = 3;
    if (c.length > 0) {
      data.forEach((course) => {
        $("#latestCourses").append(
          `
                  <div class="col-lg-4 mb-2">
                    <div class="card">
                      <img class="card-img-top" src="${course.image}" alt="Card image cap" />
                      <div class="card-body">
                      <h5 class="card-title"><a href="/courses/${course._id}">${course.title}</a></h5>
                      <p class="card-text">${course.description}</p>
                      </div>
                      <div class="card-body">
                        <button class="btn btn-primary btn-block join-btn" data-id="${course._id}" style="cursor: pointer; color: #fff;">Join</button>
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

let addJoinListener = () => {
  $(".join-btn").click((event) => {
    let $button = $(event.target);
    let courseId = $button.data("id");
    $.get(`/courses?format=json/${courseId}/join`, (data) => {
      if (data && data.success) {
        $button
          .text("Joined")
          .addClass("btn-secondary")
          .removeClass("btn-primary");
      } else {
        $button.text("Try Later");
      }
    });
  });
};
