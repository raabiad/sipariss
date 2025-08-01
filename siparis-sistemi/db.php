<?php
$sunucu = "localhost";
$kullanici = "root";
$sifre = "";
$veritabani = "siparis_sistemi";

// Bağlantı oluştur
$baglanti = new mysqli($sunucu, $kullanici, $sifre, $veritabani);

// Bağlantıyı kontrol et
if ($baglanti->connect_error) {
    die("Bağlantı hatası: " . $baglanti->connect_error);
}
?>