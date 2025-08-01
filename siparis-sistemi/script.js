let sepet = [];

// Ürünleri API'den çek
fetch('https://dummyjson.com/products')
    .then(response => response.json())
    .then(data => {
        const urunler = data.products.slice(0, 10); // İlk 10 ürünü al
        urunleriGoster(urunler);
    });

function urunleriGoster(urunler) {
    const urunlerDiv = document.getElementById('urunler');
    
    urunler.forEach(urun => {
        const urunDiv = document.createElement('div');
        urunDiv.className = 'urun';
        urunDiv.innerHTML = `
            <img src="${urun.thumbnail}" alt="${urun.title}">
            <h3>${urun.title}</h3>
            <p>${urun.price} TL</p>
            <button onclick="sepeteEkle(${urun.id}, '${urun.title}', ${urun.price})">Sepete Ekle</button>
        `;
        urunlerDiv.appendChild(urunDiv);
    });
}

function sepeteEkle(id, ad, fiyat) {
    sepet.push({ id, ad, fiyat });
    sepetiGuncelle();
}

function sepetiGuncelle() {
    const sepetListesi = document.getElementById('sepet-listesi');
    const toplamElement = document.getElementById('toplam');
    
    sepetListesi.innerHTML = '';
    let toplam = 0;
    
    sepet.forEach(urun => {
        const li = document.createElement('li');
        li.textContent = `${urun.ad} - ${urun.fiyat} TL`;
        sepetListesi.appendChild(li);
        toplam += urun.fiyat;
    });
    
    toplamElement.textContent = `Toplam: ${toplam.toFixed(2)} TL`;
}

function sepetiOnayla() {
    if (sepet.length === 0) {
        alert('Sepetiniz boş!');
        return;
    }
    
    fetch('islem.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(sepet)
    })
    .then(response => response.text())
    .then(data => {
        alert('Siparişiniz alındı! ' + data);
        sepet = [];
        sepetiGuncelle();
    });
}