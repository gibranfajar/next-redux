const formatDate = (tanggal: string) => {
  // Array bulan dalam Bahasa Indonesia
  const bulanIndo = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  // Mengonversi string tanggal (DD/MM/YYYY) menjadi objek Date
  const [day, month, year] = tanggal.split("/");
  const date = new Date(`${year}-${month}-${day}`);

  // Mendapatkan nama bulan dari array bulanIndo
  const bulan = bulanIndo[date.getMonth()];

  // Mengembalikan format tanggal "1 Januari 2025"
  return `${parseInt(day, 10)} ${bulan} ${year}`;
};
export default formatDate;
