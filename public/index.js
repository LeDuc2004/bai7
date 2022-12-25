function doimau(i) {
    let getfriend = document.querySelectorAll(".sun");
    getfriend.forEach((item) => {
      item.setAttribute("style", "background-color:");
    });
    document
      .getElementById("doimau" + i).setAttribute("style", "background-color:rgb(239, 115, 135);color:white");
      localStorage.setItem("diem",i)
  }
if (localStorage.getItem("diem") != null) {
    document.getElementById(`doimau${Number(localStorage.getItem("diem"))}`).setAttribute("style", "background-color:rgb(239, 115, 135);color:white");
}



  function getTodo() {
    fetch("http://localhost:3000/api/v1/todos")
      .then((rep) => rep.json())
      .then((data) => arr(data));
    function arr(data) {
      let result = "";
      let rate = 0
      for (let i = 0; i < data.length; i++) {
          rate += Number(data[i].diem)
          result += `
          <div class="topSoon">
          <div class="numInside">${Number(data[i].diem)}</div>
          <div>
            <i onclick="fix(${i})" class="fa-solid fa-pen-to-square"></i
            ><i onclick="deletE(${i})" class="fa-solid fa-x"></i>
          </div>
        </div>
        <div class="soon">${data[i].content}</div>
          
          `;
        
      }
      document.getElementById("Reviews").innerHTML =   `${data.length} Reviews`
      document.getElementById("list").innerHTML = result;
      document.getElementById("rating").innerHTML = `Average rating ${(rate/data.length).toFixed(1)}`
    }
  }
  getTodo();
// Post
  function addTodo() {
if (document.getElementById("content").value.split(" ").join("").length < 10) {
     document.getElementById("toithieu").style.display = ""
}else if (localStorage.getItem("diem") == null ) {
    document.getElementById("toithieu").innerHTML = "Hãy chọn điểm số trước khi bình luận"

    document.getElementById("toithieu").style.display = ""
}else{
        fetch("http://localhost:3000/api/v1/todos")
      .then((rep) => rep.json())
      .then((data) => arr1(data));
    function arr1(data) {
      let doituong = {
        diem: `${localStorage.getItem("diem")}`,
        content:`${document.getElementById("content").value}`
      };
      data.unshift(doituong);
  
      fetch("http://localhost:3000/receive", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then(data)
        .catch((err) => console.log(err));
      document.getElementById("content").value = "";
      document.getElementById("toithieu").style.display = "none"
    getTodo();
    }
}


  }
  // Delete

  function deletE(num) {
      
      fetch("http://localhost:3000/api/v1/todos")
        .then((rep) => rep.json())
        .then((data) => arr1(data));
      function arr1(data) {
        for (let i = 0; i < data.length; i++) {
          if (Number(i) == num) {
            data.splice(i, 1);
          }
        }
    
        fetch("http://localhost:3000/receive", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then(data)
          .catch((err) => console.log(err));
 
        getTodo();
      }
    }

    function fix(index) {
      let person = prompt("Nhập tin nhắn mới");
      if (person != null && person.split(" ").join("").length > 10 ) {

        fetch("http://localhost:3000/api/v1/todos")
        .then((rep) => rep.json())
        .then((data) => arr1(data));
      function arr1(data) {

        
        for (let i = 0; i < data.length; i++) {
          if (Number(i) == index) {
            let doituong ={ "diem": `${data[i].diem}`, "content": `${person}` }
            data.splice(i, 1, doituong);
          }
        }
    
        fetch("http://localhost:3000/receive", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then(data)
          .catch((err) => console.log(err));
 
        getTodo();
      }

        
      }else{
        alert("Bình luận mới phải > 10 ký tự")
        

      }
    }
  