<?php
include 'db.php';

// Hata mesajlarını göster (DEBUG için)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Gelen veriyi al
$json = file_get_contents('php://input');
$sepet = json_decode($json);

if ($sepet === null) {
    die("Hata: Geçersiz JSON verisi!");
}

foreach ($sepet as $urun) {
    $urun_id = $urun->id;
    $fiyat = $urun->fiyat;
    
    $sorgu = $baglanti->prepare("INSERT INTO siparisler (urun_id, adet, toplam_fiyat) VALUES (?, 1, ?)");
    $sorgu->bind_param("id", $urun_id, $fiyat);
    
    if (!$sorgu->execute()) {
        die("Sorgu hatası: " . $baglanti->error);
    }
}

echo "Siparişiniz alındı! Sepet No: " . $baglanti->insert_id;
$baglanti->close();
?>