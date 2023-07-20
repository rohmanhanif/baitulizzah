import published from "../tiddlers/published.json";

export default function () {
    let datanya = published;
    let data_baru = [];
    for (let { title, published_date, slug, text } of datanya) {
        let formattedStr;
        function ambil_tanggal() {
            let tanggalnya = published_date.slice(0, 8);
            let str = tanggalnya;
            formattedStr = str.slice(0, 4) + "-" + str.slice(4, 6) + "-" + str.slice(6, 8);

            // console.log(formattedStr); // Output: "2023-07-19"
        }
        ambil_tanggal();

        let imageURL;
        function ambil_gambar() {
            let str = text;
            let startIndex = str.indexOf('src="') + 5; // mencari indeks awal dari URL gambar
            let endIndex = str.indexOf('"', startIndex); // mencari indeks akhir dari URL gambar
            imageURL = str.substring(startIndex, endIndex); // mengambil substring yang berisi URL gambar

            // console.log(imageURL);
        }
        ambil_gambar();

        let ringkasan;
        function ambil_ringkasan() {
            // Menghapus semua tag HTML menggunakan ekspresi reguler
            let str = text;
            let plainText = str.replace(/<[^>]+>/g, '');

            let words = plainText.split(/\s+/);
            let thirtyWords = words.slice(0, 30).join(' ');


            ringkasan = thirtyWords;
        }
        ambil_ringkasan();

        function formatTanggal(inputDate) {
            const daysInIndonesian = [
                "Minggu",
                "Senin",
                "Selasa",
                "Rabu",
                "Kamis",
                "Jumat",
                "Sabtu"
            ];

            const monthsInIndonesian = [
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
                "Desember"
            ];

            const dateParts = inputDate.split("-");
            const year = dateParts[0];
            const month = parseInt(dateParts[1]) - 1;
            const day = parseInt(dateParts[2]);

            const date = new Date(year, month, day);
            const dayOfWeek = daysInIndonesian[date.getDay()];
            const monthInIndonesian = monthsInIndonesian[month];

            const formattedDate = `${dayOfWeek}, ${day} ${monthInIndonesian} ${year}`;
            return formattedDate;
        }

        data_baru.push({
            title, published_date: new Date(formattedStr), slug, text, gambar: imageURL, ringkasan, tanggal_diformat: formatTanggal(formattedStr)
        });
    }
    return data_baru;
}