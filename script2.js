// const sepeteEkleBtns = document.querySelectorAll('.card .btn')
const cards = document.querySelectorAll('.card')
const tbody = document.querySelector('tbody')
const sepetim = document.querySelector('.cart svg')
const table = document.querySelector('.table')
let sepet_toplam = document.querySelector('.sepet-toplamı')
let adet_toplamı = document.querySelector('.adet-toplamı')
const toplamDelete = document.querySelector('toplam-delete')
const count = document.getElementById('count')
const sepet_onay = document.querySelector('.btn-onay')






let stok = [
    {
        ürünAdı: 'Çubuklu Forma',
        stokAdet: 5
    },
    {
        ürünAdı: 'Sarı Baby Set',
        stokAdet: 4
    },
    {
        ürünAdı: 'Logo Şapka',
        stokAdet: 3
    },
    {
        ürünAdı: 'Kol saati',
        stokAdet: 2
    },
]
localStorage.setItem('stok', JSON.stringify(stok))

let sepetUrunler = []
let option
let ayniUrunIndex;

sepeteEkleBtns.forEach(sepeteEkle => {
    sepeteEkle.addEventListener('click', (e) => {
        option = parseInt(e.target.closest('.card').querySelector('#adet').value)

        const ürünBilgileri = {
            id: new Date().getTime(),
            ürünAdı: e.target.closest('.card').querySelector('.card-title').textContent,
            fiyat: parseFloat((e.target.closest('.card').querySelector('.card-price').textContent).replace('₺', '').replace('.', '').replace(',', '.')),
            img: e.target.closest('.card').querySelector('img').getAttribute('src'),
            adet: option
        }

        stok.forEach(ürün => {
            if (ürün.ürünAdı == ürünBilgileri.ürünAdı) {
                if(ürün.stokAdet == 0) {
                    alert('ürün tükendi')
                }else{
                    if (option > ürün.stokAdet) {
                        alert(`En fazla ${ürün.stokAdet} adet ekleyebilirsiniz`)
                        return
                    }else{
                        const ayniUrunIndex = sepetUrunler.findIndex(ürün => ürün.ürünAdı === ürünBilgileri.ürünAdı)
                        
                            if (ayniUrunIndex !== -1) {
                                const adetTd = document.getElementById('adet_' + sepetUrunler[ayniUrunIndex].id)
                                adetTd.textContent = parseInt(adetTd.textContent) + option
                                if(adetTd.textContent > ürün.stokAdet) {
                                    alert(`En fazla ${ürün.stokAdet} adet ekleyebilirsiniz`)
                                    adetTd.textContent = parseInt(adetTd.textContent) - option
                                    return
                                }else{
                                    const fiyatTd = document.getElementById('fiyat_' + sepetUrunler[ayniUrunIndex].id)
                                    fiyatTd.textContent = (ürünBilgileri.fiyat * parseInt(adetTd.textContent)).toFixed(2)
                    
                                }
                                
                            } else {
                                DOM(ürünBilgileri)
                                sepetUrunler.push(ürünBilgileri)
                            }
                        
                    }
                }
                
            }

        
        })




        option = 1
        toplamlar()
        localStorage.setItem("sepet", JSON.stringify(sepetUrunler))
    })
})


//! Dom a yazma
const DOM = ({ id, ürünAdı, fiyat, img, adet }) => {
    const tr = document.createElement("tr")
    const appendTd = (content) => {
        const td = document.createElement("td")
        td.textContent = content
        return td
    }

    //Resim
    const imageTd = document.createElement('td');
    imageTd.classList.add('class', 'w-25');
    const image = document.createElement('img');
    image.classList.add('img-fluid');
    imageTd.appendChild(image);
    image.setAttribute('src', `${img}`);

    //çöp sepeti
    const çöpSepetiTd = document.createElement('td');
    const çöpSepeti = document.createElement('i');
    çöpSepeti.id = id;
    çöpSepeti.classList.add('fas', 'fa-trash-can', 'remove');
    çöpSepetiTd.appendChild(çöpSepeti);

    //adet
    const adetTd = document.createElement('td');
    adetTd.textContent = adet;
    adetTd.style.textAlign = 'center';
    adetTd.id = 'adet_' + id;

    //fiyat
    const fiyatTd = document.createElement('td');
    fiyatTd.textContent = (fiyat * adet).toFixed(2);
    fiyatTd.id = 'fiyat_' + id;

    //satıra ekle
    tr.append(
        imageTd,
        appendTd(ürünAdı),
        adetTd,
        fiyatTd,
        çöpSepetiTd
    );
    tr.id = id;
    tbody.prepend(tr);
};

//!sepet silme iconu dinleme
tbody.addEventListener('click', (e) => {
    if (e.target.classList.contains('toplam-delete')) {
        confirm('Sepeti boşaltmak istediğinizden emin misiniz?');
        if (confirm) {
            const tumTrler = document.querySelectorAll('tbody tr');
            for (let i = 0; i < tumTrler.length - 1; i++) {
                tumTrler[i].remove();
                sepetUrunler.length = 0;
            }
            adet_toplamı.textContent = ''
            sepet_toplam.textContent = ''
            window.location.reload()
            localStorage.removeItem('sepet')
        }
    } else if (e.target.classList.contains('remove')) {
        e.target.parentElement.parentElement.remove()
        const id = e.target.id
        sepetUrunler = sepetUrunler.filter((ürün) => ürün.id != id)
        const silinenTutar = Number((e.target.parentElement.parentElement).children[3].textContent)
        sepet_toplam.textContent = (Number(sepet_toplam.textContent) - silinenTutar).toFixed(2)
        const silinenAdet = Number((e.target.parentElement.parentElement).children[2].textContent)
        adet_toplamı.textContent -= silinenAdet
        localStorage.setItem('sepet', JSON.stringify(sepetUrunler))

        if (tbody.children.length == 1) {
            window.location.reload()
        }
    }
    toplamlar()
})

//!Sepete tıklama
sepetim.addEventListener('click', () => {
    if (tbody.children.length > 1) {
        table.classList.toggle('hidden')
    } else {
        table.classList.add('hidden')
    }
})

//!  toplamları hesaplama
const toplamlar = () => {
    const adetler = document.querySelectorAll('tbody tr')
    let toplamAdet = 0
    let toplamTutar = 0
    for (let i = 0; i < adetler.length - 1; i++) {
        toplamAdet += Number(adetler[i].children[2].textContent)
        toplamTutar += Number(adetler[i].children[3].textContent)
    }
    // console.log(toplamAdet)
    adet_toplamı.textContent = toplamAdet
    adet_toplamı.style.textAlign = 'center'
    sepet_toplam.textContent = toplamTutar.toFixed(2)
    count.textContent = toplamAdet
}

//!sayfa yüklendiğinde...
window.addEventListener("load", () => {
    sepetUrunler = JSON.parse(localStorage.getItem("sepet")) || []
    // console.log(sepetUrunler)
    sepetUrunler.forEach(ürün => {
        DOM(ürün)
    })
    toplamlar()
    stok = JSON.parse(localStorage.getItem('stok')) || [] //! atamayı unutma!!!!
    console.log(stok);
})

//! ürün alma
sepet_onay.addEventListener('click', () => {
    stok.forEach(ürün => {
        sepetUrunler.forEach(sepetürün => {
            if(sepetürün.ürünAdı == ürün.ürünAdı) {
                ürün.stokAdet -= sepetürün.adet
                console.log(stok)
                sepetUrunler = []
                localStorage.setItem('stok', JSON.stringify(stok))
                localStorage.setItem('sepet', JSON.stringify(sepetUrunler))
                table.innerHTML = ''
                alert('iyi günlerde kullanın')
                window.location.reload()
            }
        })
    })
})
