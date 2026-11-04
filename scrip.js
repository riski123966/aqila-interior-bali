
document.addEventListener("DOMContentLoaded", function () {

    // ===== WHATSAPP =====
    // Format nomor: 62 tanpa angka 0 di depan
    var NOMOR = "6282314046635";

    function link(teks) {
        return "https://wa.me/" + NOMOR + "?text=" + encodeURIComponent(teks);
    }

    // Tombol WhatsApp melayang
    var tombolWA = document.getElementById("wa");

    if (tombolWA) {
        tombolWA.href = link(
            "Halo, saya mau tanya soal plafon PVC dan interior."
        );
    }

    // ===== FORMULIR PENAWARAN =====
    var formulir = document.getElementById("f");

    if (formulir) {
        formulir.addEventListener("submit", function (e) {
            e.preventDefault();

            var pesan =
                "Halo, saya " + document.getElementById("n").value +
                ". Saya butuh: " + document.getElementById("k").value +
                ". Lokasi/ukuran: " +
                (document.getElementById("m").value || "-") +
                ". Mohon info penawarannya.";

            window.open(link(pesan), "_blank", "noopener");
        });
    }

    // ===== PERBESAR FOTO GALERI =====
    var dlg = document.getElementById("zoom");

    document.querySelectorAll(".gallery img").forEach(function (im) {
        im.parentElement.addEventListener("click", function () {
            dlg.querySelector("img").src = im.src;
            dlg.showModal();
        });
    });

    if (dlg) {
        dlg.addEventListener("click", function () {
            dlg.close();
        });
    }

    // ===== MENU HAMBURGER HP =====
    var mb = document.getElementById("menuBtn");
    var nv = document.getElementById("nav");

    if (mb && nv) {
        mb.addEventListener("click", function () {
            var terbuka = nv.classList.toggle("open");
            mb.setAttribute("aria-expanded", terbuka);
        });

        // Tutup menu setelah pilihan diklik
        nv.querySelectorAll("a").forEach(function (a) {
            a.addEventListener("click", function () {
                nv.classList.remove("open");
                mb.setAttribute("aria-expanded", "false");
            });
        });
    }

    // ===== ANIMASI GALERI DARI KANAN =====
    var gallery = document.querySelector(".gallery");

    if (gallery) {
        var photos = gallery.querySelectorAll("figure");

        // Periksa pengaturan animasi perangkat
        var reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (!reducedMotion && "IntersectionObserver" in window) {

            gallery.classList.add("is-ready");

            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        var index = Array.from(photos).indexOf(entry.target);

                        setTimeout(function () {
                            entry.target.classList.add("show");
                        }, index * 120);

                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.15
            });

            photos.forEach(function (photo) {
                observer.observe(photo);
            });

        }
    }

});
