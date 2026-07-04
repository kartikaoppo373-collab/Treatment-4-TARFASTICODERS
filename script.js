// ====================================================================
// LOGIKA BARU: TOMBOL PESAN (Menggunakan LocalStorage agar Pindah Halaman)
// ====================================================================

// Ambil data keranjang lama yang sudah tersimpan di browser (jika ada)
let cart = JSON.parse(localStorage.getItem('cafeCart')) || [];

const orderButtons = document.querySelectorAll('.btn-order');

orderButtons.forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseInt(button.getAttribute('data-price'));

        // Cari tahu apakah barang sudah pernah diklik sebelumnya
        let existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            // Kalau sudah ada, cukup tambahkan jumlahnya (+1)
            existingItem.quantity = (existingItem.quantity || 1) + 1;
        } else {
            // Kalau belum ada, masukkan data barang baru dengan quantity = 1
            cart.push({ name, price, quantity: 1 });
        }

        // Simpan ke localStorage browser
        localStorage.setItem('cafeCart', JSON.stringify(cart));

        alert(`${name} telah ditambahkan ke keranjang belanja!`);
    });
});


// ====================================================================
// LOGIKA LAMA: FITUR FILTER KATEGORI MENU (Tetap Dipertahankan/Gak Dihapus)
// ====================================================================

const filterButtons = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Hapus class 'active' dari semua tombol, lalu tambahkan ke tombol yang diklik
        document.querySelector('.filter-btn.active').classList.remove('active');
        button.classList.add('active');

        const selectedCategory = button.getAttribute('data-category');

        // Sembunyikan atau tampilkan menu berdasarkan kategori
        menuItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            
            if (selectedCategory === 'all' || itemCategory === selectedCategory) {
                item.style.display = 'block'; // Tampilkan
            } else {
                item.style.display = 'none'; // Sembunyikan
            }
        });
    });
});
