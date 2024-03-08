//Selectors

// const addBtns = document.querySelectorAll(".card .btn");
console.log(addBtns);//sepete ekleme butonları
const table = document.querySelector('.table')
console.log(table); // sepet tablosu
const tbody = document.querySelector(".tbody");
console.log(tbody); // sepet tablosu içindeki tbody

console.log(tbody); // sepet tablosu icindeki tbody
const myCart = document.querySelector(".shopcart");
console.log(myCart); // sepet sayfası icon 
const count = document.querySelector('.shopcart .count');
console.log(count); // sepet içindeki ürün sayısı

const btnApply = document.querySelector('.apply .btn');
console.log(btnApply); // sepeti onayla butonu

const btnDelete = document.querySelector('.shopcart .fa-trash-can');
console.log(btnDelete); // sepeti boşalt butonu

let sumCart = document.querySelector('.shopcart .sum-text');
console.log(sumCart); // sepet toplamı metni

let sumNumber = document.querySelector('.shopcart .number-product');
console.log(sumNumber);

// script.js

// Sepete ekleme butonlarını seçin
const addBtns = document.querySelectorAll(".card .btn");

// Her bir ekleme butonu için olay dinleyicisini ekle
addBtns.forEach((btn) => {
  btn.addEventListener("click", addToCart);
});

// Sepete ekleme fonksiyonu
function addToCart() {
  // Ürün bilgilerini alın
  const card = this.closest(".card");
  const productName = card.querySelector(".card-title").innerText;
  const productPrice = parseFloat(card.querySelector(".card-price").innerText.replace("₺", "").replace(",", "."));

  // Sepet tablosundaki tbody'yi seçin
  const tbody = document.querySelector(".tbody");

  // Yeni bir satır oluşturun
  const newRow = tbody.insertRow();

  // Satırın hücrelerini oluşturun ve verileri ekleyin
  const cellImg = newRow.insertCell(0);
  const cellProduct = newRow.insertCell(1);
  const cellCount = newRow.insertCell(2);
  const cellPrice = newRow.insertCell(3);
  const cellDelete = newRow.insertCell(4);

  cellImg.innerHTML = '<img src="' + card.querySelector(".card-img-top").src + '" alt="Product Image" width="50" />';
  cellProduct.textContent = productName;
  cellCount.textContent = "1";
  cellPrice.textContent = productPrice.toFixed(2);
  cellDelete.innerHTML = '<i class="fa-solid fa-trash-can" style="color: #8a0e0e; cursor: pointer;"></i>';

  // Sepet toplamını güncelle
  updateCartTotal();

  // Sepet ikonundaki ürün sayısını güncelle
  updateCartCount();
}

// Sepet toplamını güncelleme fonksiyonu
function updateCartTotal() {
  const sumNumber = document.querySelector('.shopcart .number-product');
  const sumCart = document.querySelector('.shopcart .sum-text');
  const tbody = document.querySelector(".tbody");

  let total = 0;

  // Satırları döngü ile gezerek toplamı hesapla
  for (let row of tbody.rows) {
    total += parseFloat(row.cells[3].textContent);
  }

  // Toplamı ve ürün sayısını güncelle
  sumCart.textContent = "SUMMARY: ";
  sumNumber.textContent = tbody.rows.length;

  // Sepet ikonundaki ürün sayısını güncelle
  updateCartCount();
}

// Sepet ikonundaki ürün sayısını güncelleme fonksiyonu
function updateCartCount() {
  const count = document.querySelector('.shopcart .count');
  const tbody = document.querySelector(".tbody");

  count.textContent = tbody.rows.length;
}

































