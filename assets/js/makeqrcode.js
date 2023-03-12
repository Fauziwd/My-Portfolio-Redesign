// Ambil elemen HTML yang diperlukan
const form = document.querySelector('form');
const textInput = document.getElementById('text-input');
const generateButton = document.getElementById('generate-button');
const qrcodeContainer = document.querySelector('.qrcode-container');
const qrcodeElement = document.getElementById('qrcode');
const downloadButton = document.getElementById('download-button');

// Nonaktifkan tombol unduh pada awalnya
downloadButton.disabled = true;

// Fungsi untuk menghasilkan kode QR
function generateQRCode(event) {
  event.preventDefault();
  const text = textInput.value;

  // Periksa apakah teks tidak kosong
  if (text.trim() !== '') {
    // Generate kode QR
    QRCode.toCanvas(qrcodeElement, text, function (error) {
      if (error) {
        console.error(error);
        alert('Terjadi kesalahan saat menghasilkan kode QR!');
      } else {
        // Tampilkan tampilan kode QR
        qrcodeContainer.style.display = 'flex';

        // Aktifkan tombol unduh
        downloadButton.disabled = false;
      }
    });
  } else {
    alert('Masukkan teks atau tautan terlebih dahulu!');
  }
}

// Fungsi untuk mengunduh gambar kode QR
function downloadQRCode(event) {
  event.preventDefault();
  // Konversi kode QR menjadi gambar PNG
  const imageDataURL = qrcodeElement.toDataURL('image/png');

  // Buat tautan unduh
  const downloadLink = document.createElement('a');
  downloadLink.href = imageDataURL;
  downloadLink.download = 'qrcode.png';

  // Klik tautan unduh
  downloadLink.click();
}

// Tambahkan event listener pada tombol Generate
if (generateButton) {
  generateButton.addEventListener('click', generateQRCode);
}

// Tambahkan event listener pada tombol Unduh
if (downloadButton) {
  downloadButton.addEventListener('click', downloadQRCode);
}
