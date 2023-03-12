// memeriksa apakah daftar tugas sudah ada di local storage
var toDoList;
if (localStorage.getItem("toDoList")) {
  toDoList = JSON.parse(localStorage.getItem("toDoList"));
} else {
  toDoList = [];
}

// menampilkan daftar tugas ke layar
function displayToDoList() {
  var list = "";
  for (var i = 0; i < toDoList.length; i++) {
    list += '<tr><td class="toDoItem">' + toDoList[i].nama + '</td>' +
            '<td>' + toDoList[i].deadline + '</td>' +
            '<td>' + toDoList[i].catatan + '</td>' +
            '<td><input type="checkbox" class="completeCheckbox" onclick="completeToDoItem(' + i + ')"></td>' +
            '<td><button class="deleteButton" onclick="deleteToDoItem(' + i + ')">Hapus</button></td></tr>';
  }
  document.getElementById("toDoList").innerHTML = list;

  // menambahkan event listener ke setiap tombol "Tandai Selesai"
  var checkboxes = document.getElementsByClassName("completeCheckbox");
  for (var j = 0; j < checkboxes.length; j++) {
    checkboxes[j].addEventListener("click", function(event) {
      event.stopPropagation();
      var confirmed = confirm("Apakah tugas ini sudah selesai?");
      if (confirmed) {
        var index = parseInt(event.target.parentNode.parentNode.rowIndex) - 1;
        completeToDoItem(index);
        deleteToDoItem(index);
      } else {
        event.target.checked = false;
      }
    });
  }
}

// menambahkan tugas ke dalam daftar
function addToDoItem() {
  var toDoItem = {
    nama: document.getElementById("toDoInput").value,
    deadline: document.getElementById("deadlineInput").value,
    catatan: document.getElementById("noteInput").value
  };
  if (toDoItem.nama) {
    toDoList.push(toDoItem);
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
    displayToDoList();
    document.getElementById("toDoInput").value = "";
    document.getElementById("deadlineInput").value = "";
    document.getElementById("noteInput").value = "";
  }
}

// menghapus tugas dari daftar dan local storage
function deleteToDoItem(index) {
  toDoList.splice(index, 1);
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
  displayToDoList();
}

// menandai tugas sebagai selesai
function completeToDoItem(index) {
  var item = document.getElementsByClassName("toDoItem")[index];
  if (item.classList.contains("completed")) {
    item.classList.remove("completed");
  } else {
    item.classList.add("completed");
  }
}

// menampilkan daftar tugas saat halaman dimuat
displayToDoList();

// menambahkan event listener ke tombol tambah
document.getElementById("addButton").addEventListener("click", function(event) {
  event.preventDefault();
  addToDoItem();
});
