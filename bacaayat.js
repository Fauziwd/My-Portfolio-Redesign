

$(document).ready(function() {
  $("#mulai-btn").click(function() {
    $(".content").show();
    $(this).hide();
  });
});


$(document).ready(function() {
  $.ajax({
    url: "https://api.quran.com/api/v4/chapters",
    dataType: "json",
    success: function(result) {
      var suratList = $("#surat-list");
      $.each(result.chapters, function(i, surat) {
        suratList.append("<tr><td>" + surat.id + "</td><td><a href='#' class='surat-link' data-surat-id='" + surat.id + "'>" + surat.name_simple + "</a></td><td>" + surat.translated_name.name + "</td><td>" + surat.verses_count + "</td></tr>");
      });
    }
  });
});

$(document).on("click", ".surat-link", function(e) {
  e.preventDefault();
  var suratId = $(this).data("surat-id");
  
  // buat AJAX request untuk mendapatkan detail surat
  $.ajax({
    url: "https://api.alquran.cloud/v1/surah/" + suratId,
    dataType: "json",
    success: function(result) {
      // ambil informasi tentang surat
      var suratNama = result.data.englishName;
      
      // tampilkan informasi tentang surat
      var infoSurat = $("<div>").addClass("info-surat");
      var namaSurat = $("<h1>").text(suratNama);
      
      infoSurat.append(namaSurat);
      $(".deskripsi-surat").empty();
      $(".deskripsi-surat").append(infoSurat);
      
      // loop untuk menampilkan semua ayat pada surat yang dipilih
      for (var i = 0; i < result.data.ayahs.length; i++) {
        var nomorAyat = result.data.ayahs[i].numberInSurah;
        var ayat = result.data.ayahs[i].text;
        
        // tampilkan informasi tentang ayat
        var infoAyat = $("<h2>").addClass("info-ayat");
        var nomor = $("<b>").text(nomorAyat).addClass("nomor_ayat");
        var isiAyat = $("<p>").text(ayat);
        
        infoAyat.append(nomor);
        infoAyat.append(isiAyat);
        
        $(".deskripsi-surat").append(infoAyat);
      }
    }
  });
});


$(document).on("click", ".ayat-link", function(e) {
  e.preventDefault();
  var suratId = $(this).data("surat-id");
  var ayatId = $(this).data("ayat-id");
  $.ajax({
    url: "https://api.quran.com/api/v4/chapters/" + suratId + "/verses/" + ayatId,
    dataType: "json",
    success: function(result) {
      var ayatText = result.verse.text;
      var ayatNumber = result.verse.verse_number;
      var ayatTranslation = result.verse.translations[0].text;
      var ayatTafsir = result.verse.translations[1].text;
      $("#ayat-info").html("<h3>Ayat " + ayatNumber + "</h3><p>" + ayatText + "</p><h4>Terjemahan:</h4><p>" + ayatTranslation + "</p><h4>Tafsir:</h4><p>" + ayatTafsir + "</p>");
    }
  });
});

function showAyat(surat) {
  const ayatList = document.getElementById("ayat-list");
  ayatList.innerHTML = "";

  // tampilkan ayat
  for (let i = 0; i < data[surat - 1].ayat.length; i++) {
    const ayat = data[surat - 1].ayat[i];
    const row = `
      <tr class="info-ayat">
        <td>${ayat.no}</td>
        <td>${ayat.text.ar}</td>
        <td>${ayat.text.id}</td>
      </tr>
    `;
    ayatList.innerHTML += row;

    // tambahkan kode untuk mengubah harakat
    const ayatContainer = ayatList.querySelectorAll('tr')[i];
    const harakat = ayatContainer.querySelectorAll('.harakat');
    for (let j = 0; j < harakat.length; j++) {
      harakat[j].style.color = 'red'; // ganti warna harakat menjadi merah
    }
  }
};

$(document).on("click", ".ayat-link", function(e) {
e.preventDefault();
var suratId = $(this).data("surat-id");
var ayatId = $(this).data("ayat-id");
$.ajax({
url: "https://api.quran.com/api/v4/chapters/" + suratId + "/verses/" + ayatId + "/translations/en",
dataType: "json",
success: function(result) {
var ayatTranslation = result.translation.text;
alert(ayatTranslation);
}
});
});

// tambahkan kode untuk terjemahan ayat
$(document).on("click", ".ayat-link", function(e) {
  e.preventDefault();
  var suratId = $(this).data("surat-id");
  var ayatId = $(this).data("ayat-id");
  $.ajax({
    url: "https://api.quran.com/api/v4/chapters/" + suratId + "/verses/" + ayatId,
    dataType: "json",
    success: function(result) {
      var ayatText = result.verse.text;
      var ayatNumber = result.verse.verse_number;
      var ayatTranslation = result.verse.translations[0].text;
      var ayatTafsir = result.verse.translations[1].text;
      $("#ayat-info").html("<h3>Ayat " + ayatNumber + "</h3><p>" + ayatText + "</p><h4>Terjemahan:</h4><p>" + ayatTranslation + "</p><h4>Tafsir:</h4><p>" + ayatTafsir + "</p>");
    }
  });
});

