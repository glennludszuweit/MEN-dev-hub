fetch("/courses?format=json").then((res) => {
  res.json().then((data) => {
    var c = data;
    c.length = 3;
    if (c.length > 0) {
      c.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
      });
      var temp = "";
      data.forEach((course) => {
        temp += `
                <div class="col-lg-4 mb-2">
                  <div class="card">
                    <img class="card-img-top" src="${course.image}" alt="Card image cap" />
                    <div class="card-body">
                    <h5 class="card-title"><a href="/courses/${course._id}">${course.title}</a></h5>
                    <p class="card-text">${course.description}</p>
                    </div>
                    <div class="card-body">
                      <a href="#" class="btn btn-primary btn-block">Join</a>
                    </div>
                  </div>
                </div>
          `;
      });
    }
    document.getElementById("latestCourses").innerHTML = temp;
  });
});
