/**
 * ============================================================
 * UNDANGAN ONLINE
 * APP.JS
 * VERSION 8
 *
 * V7:
 * - API Apps Script
 * - Data Pengantin
 * - Data Acara
 * - Google Maps
 * - Countdown
 *
 * V8:
 * - Premium Scroll Animation
 * - Scroll Reveal
 * - Stagger Animation
 * ============================================================
 */


/* ============================================================
   API APPS SCRIPT
============================================================ */

const API_URL =
  'https://script.google.com/macros/s/AKfycbwHwdmCvqNbqUd_X5h8n4XwwP7LCSXhFs_Rp_rBH0veEQdSz0VVi44-jID3v4iq5MBltQ/exec';


/* ============================================================
   ELEMENT
============================================================ */

const loadingScreen =
  document.getElementById('loadingScreen');

const app =
  document.getElementById('app');

const errorScreen =
  document.getElementById('errorScreen');

const errorMessage =
  document.getElementById('errorMessage');


/* ============================================================
   PENGANTIN
============================================================ */

const namaPengantin =
  document.getElementById('namaPengantin');

const namaPria =
  document.getElementById('namaPria');

const namaWanita =
  document.getElementById('namaWanita');

const quotePengantin =
  document.getElementById('quotePengantin');


/* ============================================================
   HERO
============================================================ */

const tanggalAcara =
  document.getElementById('tanggalAcara');

const lokasiAcara =
  document.getElementById('lokasiAcara');


/* ============================================================
   AKAD
============================================================ */

const akadTanggal =
  document.getElementById('akadTanggal');

const akadWaktu =
  document.getElementById('akadWaktu');

const akadLokasi =
  document.getElementById('akadLokasi');

const akadAlamat =
  document.getElementById('akadAlamat');

const akadMapsButton =
  document.getElementById('akadMapsButton');


/* ============================================================
   RESEPSI
============================================================ */

const resepsiTanggal =
  document.getElementById('resepsiTanggal');

const resepsiWaktu =
  document.getElementById('resepsiWaktu');

const resepsiLokasi =
  document.getElementById('resepsiLokasi');

const resepsiAlamat =
  document.getElementById('resepsiAlamat');

const resepsiMapsButton =
  document.getElementById('resepsiMapsButton');


/* ============================================================
   COUNTDOWN
============================================================ */

const countdownDate =
  document.getElementById('countdownDate');

const countdownTimer =
  document.getElementById('countdownTimer');

const countdownFinished =
  document.getElementById('countdownFinished');

const countdownDays =
  document.getElementById('countdownDays');

const countdownHours =
  document.getElementById('countdownHours');

const countdownMinutes =
  document.getElementById('countdownMinutes');

const countdownSeconds =
  document.getElementById('countdownSeconds');


/* ============================================================
   BUTTON
============================================================ */

const openInvitation =
  document.getElementById('openInvitation');


/* ============================================================
   GLOBAL
============================================================ */

let invitationData = null;

let countdownInterval = null;

let scrollObserver = null;


/* ============================================================
   START
============================================================ */

document.addEventListener(
  'DOMContentLoaded',
  function () {

    console.log(
      '===================================='
    );

    console.log(
      'UNDANGAN ONLINE - APP.JS V8'
    );

    console.log(
      '===================================='
    );

    loadInvitation();

  }
);


/* ============================================================
   LOAD API
============================================================ */

async function loadInvitation() {

  try {

    console.log(
      'Mengambil data dari Apps Script...'
    );


    const response =
      await fetch(
        API_URL + '?action=config&v=' + Date.now(),
        {
          method: 'GET',
          cache: 'no-store'
        }
      );


    if (!response.ok) {

      throw new Error(
        'Server Apps Script tidak dapat diakses.'
      );

    }


    const result =
      await response.json();


    console.log(
      'RESPON API:',
      result
    );


    if (
      !result ||
      result.success !== true
    ) {

      throw new Error(
        result && result.message
          ? result.message
          : 'Data undangan gagal dimuat.'
      );

    }


    invitationData =
      result.data || {};


    console.log(
      'DATA UNDANGAN:',
      invitationData
    );


    renderInvitation(
      invitationData
    );

  }

  catch (error) {

    console.error(
      'ERROR LOAD INVITATION:',
      error
    );


    showError(
      error.message
    );

  }

}


/* ============================================================
   RENDER INVITATION
============================================================ */

function renderInvitation(data) {

  console.log(
    '===================================='
  );

  console.log(
    'RENDER INVITATION'
  );

  console.log(
    '===================================='
  );


  /* ==========================================================
     PENGANTIN
  ========================================================== */

  const pengantin =
    data.pengantin || {};


  const pria =
    getFirstValue([
      pengantin.nama_pria,
      data.nama_pria,
      data.config?.nama_pria
    ]) ||
    'Nama Pria';


  const wanita =
    getFirstValue([
      pengantin.nama_wanita,
      data.nama_wanita,
      data.config?.nama_wanita
    ]) ||
    'Nama Wanita';


  const quote =
    getFirstValue([
      pengantin.quote,
      data.quote
    ]) ||
    '';


  /* ==========================================================
     ACARA
  ========================================================== */

  const acara =
    data.acara || {};


  /* ==========================================================
     AKAD
  ========================================================== */

  const akadDate =
    getFirstValue([
      acara.akad_tanggal,
      acara.tanggal_akad,
      data.akad_tanggal,
      data.tanggal_akad,
      data.config?.akad_tanggal
    ]) ||
    '-';


  const akadTime =
    getFirstValue([
      acara.akad_waktu,
      acara.waktu_akad,
      data.akad_waktu,
      data.waktu_akad,
      data.config?.akad_waktu
    ]) ||
    '-';


  const akadPlace =
    getFirstValue([
      acara.akad_lokasi,
      acara.lokasi_akad,
      data.akad_lokasi,
      data.lokasi_akad
    ]) ||
    '-';


  const akadAddress =
    getFirstValue([
      acara.akad_alamat,
      acara.alamat_akad,
      data.akad_alamat,
      data.alamat_akad
    ]) ||
    '-';


  /* ==========================================================
     RESEPSI
  ========================================================== */

  const resepsiDate =
    getFirstValue([
      acara.resepsi_tanggal,
      acara.tanggal_resepsi,
      data.resepsi_tanggal,
      data.tanggal_resepsi
    ]) ||
    akadDate ||
    '-';


  const resepsiTime =
    getFirstValue([
      acara.resepsi_waktu,
      acara.waktu_resepsi,
      data.resepsi_waktu,
      data.waktu_resepsi
    ]) ||
    '-';


  const resepsiPlace =
    getFirstValue([
      acara.resepsi_lokasi,
      acara.lokasi_resepsi,
      data.resepsi_lokasi,
      data.lokasi_resepsi
    ]) ||
    '-';


  const resepsiAddress =
    getFirstValue([
      acara.resepsi_alamat,
      acara.alamat_resepsi,
      data.resepsi_alamat,
      data.alamat_resepsi
    ]) ||
    '-';


  /* ==========================================================
     GOOGLE MAPS
  ========================================================== */

  const mapsUrl =
    getFirstValue([
      acara.maps_url,
      data.maps_url,
      data.config?.maps_url
    ]) ||
    '';


  /* ==========================================================
     DEBUG
  ========================================================== */

  console.log(
    'NAMA PRIA:',
    pria
  );

  console.log(
    'NAMA WANITA:',
    wanita
  );

  console.log(
    'AKAD TANGGAL:',
    akadDate
  );

  console.log(
    'AKAD WAKTU:',
    akadTime
  );

  console.log(
    'RESEPSI TANGGAL:',
    resepsiDate
  );

  console.log(
    'RESEPSI WAKTU:',
    resepsiTime
  );


  /* ==========================================================
     HERO
  ========================================================== */

  if (namaPengantin) {

    namaPengantin.textContent =
      pria + ' & ' + wanita;

  }


  if (tanggalAcara) {

    tanggalAcara.textContent =
      akadDate;

  }


  if (lokasiAcara) {

    lokasiAcara.textContent =
      akadAddress;

  }


  /* ==========================================================
     PENGANTIN
  ========================================================== */

  if (namaPria) {

    namaPria.textContent =
      pria;

  }


  if (namaWanita) {

    namaWanita.textContent =
      wanita;

  }


  if (quotePengantin) {

    quotePengantin.textContent =
      quote;

  }


  /* ==========================================================
     AKAD
  ========================================================== */

  if (akadTanggal) {

    akadTanggal.textContent =
      akadDate;

  }


  if (akadWaktu) {

    akadWaktu.textContent =
      akadTime;

  }


  if (akadLokasi) {

    akadLokasi.textContent =
      akadPlace;

  }


  if (akadAlamat) {

    akadAlamat.textContent =
      akadAddress;

  }


  /* ==========================================================
     RESEPSI
  ========================================================== */

  if (resepsiTanggal) {

    resepsiTanggal.textContent =
      resepsiDate;

  }


  if (resepsiWaktu) {

    resepsiWaktu.textContent =
      resepsiTime;

  }


  if (resepsiLokasi) {

    resepsiLokasi.textContent =
      resepsiPlace;

  }


  if (resepsiAlamat) {

    resepsiAlamat.textContent =
      resepsiAddress;

  }


  /* ==========================================================
     MAPS
  ========================================================== */

  setupMapsButton(
    akadMapsButton,
    mapsUrl
  );


  setupMapsButton(
    resepsiMapsButton,
    mapsUrl
  );


  /* ==========================================================
     COUNTDOWN
  ========================================================== */

  console.log(
    '===================================='
  );

  console.log(
    'MEMULAI COUNTDOWN'
  );

  console.log(
    '===================================='
  );


  startCountdown(
    akadDate,
    akadTime
  );


  /* ==========================================================
     HIDE LOADING
  ========================================================== */

  hideLoading();


  /* ==========================================================
     SCROLL ANIMATION
  ========================================================== */

  initScrollAnimations();

}


/* ============================================================
   GET FIRST VALUE
============================================================ */

function getFirstValue(values) {

  for (
    let i = 0;
    i < values.length;
    i++
  ) {

    const value =
      values[i];


    if (
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ''
    ) {

      return value;

    }

  }


  return null;

}


/* ============================================================
   GOOGLE MAPS BUTTON
============================================================ */

function setupMapsButton(
  button,
  url
) {

  if (!button) {

    return;

  }


  if (
    url &&
    String(url).trim() !== ''
  ) {

    button.href =
      String(url).trim();


    button.target =
      '_blank';


    button.rel =
      'noopener noreferrer';


    button.classList.remove(
      'hidden'
    );

  }

  else {

    button.classList.add(
      'hidden'
    );

  }

}


/* ============================================================
   STEP 7
   SCROLL ANIMATION
============================================================ */

function initScrollAnimations() {

  console.log(
    '===================================='
  );

  console.log(
    'INITIALIZE SCROLL ANIMATIONS'
  );

  console.log(
    '===================================='
  );


  /*
   * Bersihkan observer sebelumnya
   */

  if (scrollObserver) {

    scrollObserver.disconnect();

    scrollObserver =
      null;

  }


  /*
   * Ambil semua section/card
   */

  const elements =
    document.querySelectorAll(
      '.section-card, ' +
      '.countdown-section, ' +
      '.event-heading, ' +
      '.event-card'
    );


  if (
    !elements ||
    elements.length === 0
  ) {

    console.warn(
      'Tidak ada elemen untuk animasi.'
    );

    return;

  }


  console.log(
    'Jumlah elemen animasi:',
    elements.length
  );


  /*
   * Tambahkan class reveal
   */

  elements.forEach(
    function (
      element,
      index
    ) {

      /*
       * Jika event card,
       * buat animasi sedikit berbeda
       */

      if (
        element.classList.contains(
          'event-card'
        )
      ) {

        /*
         * Card pertama dari kiri
         * Card kedua dari kanan
         */

        const eventCards =
          document.querySelectorAll(
            '.event-card'
          );


        const cardIndex =
          Array.from(
            eventCards
          ).indexOf(
            element
          );


        if (
          cardIndex % 2 === 0
        ) {

          element.classList.add(
            'reveal-left'
          );

        }

        else {

          element.classList.add(
            'reveal-right'
          );

        }

      }

      else if (
        element.classList.contains(
          'countdown-section'
        )
      ) {

        /*
         * Countdown menggunakan scale
         */

        element.classList.add(
          'reveal-scale'
        );

      }

      else {

        /*
         * Section lainnya
         * menggunakan fade-up
         */

        element.classList.add(
          'reveal'
        );

      }


      /*
       * Delay kecil untuk variasi
       */

      if (
        index % 4 === 1
      ) {

        element.classList.add(
          'reveal-delay-1'
        );

      }

      else if (
        index % 4 === 2
      ) {

        element.classList.add(
          'reveal-delay-2'
        );

      }

      else if (
        index % 4 === 3
      ) {

        element.classList.add(
          'reveal-delay-3'
        );

      }

    }
  );


  /*
   * Jika browser tidak mendukung
   * IntersectionObserver,
   * langsung tampilkan semuanya.
   */

  if (
    !('IntersectionObserver' in window)
  ) {

    console.warn(
      'IntersectionObserver tidak tersedia.'
    );


    elements.forEach(
      function (element) {

        element.classList.add(
          'active'
        );

      }
    );


    return;

  }


  /*
   * Buat observer
   */

  scrollObserver =
    new IntersectionObserver(
      function (
        entries
      ) {

        entries.forEach(
          function (
            entry
          ) {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                'active'
              );

            }

            else {

              /*
               * Hapus active ketika
               * keluar viewport supaya
               * animasi bisa muncul lagi
               * saat scroll kembali.
               */

              entry.target.classList.remove(
                'active'
              );

            }

          }
        );

      },
      {
        threshold: 0.15,

        rootMargin:
          '0px 0px -60px 0px'
      }
    );


  /*
   * Observe semua element
   */

  elements.forEach(
    function (element) {

      scrollObserver.observe(
        element
      );

    }
  );


  console.log(
    'SCROLL ANIMATION AKTIF'
  );

}


/* ============================================================
   START COUNTDOWN
============================================================ */

function startCountdown(
  dateString,
  timeString
) {

  console.log(
    '------------------------------------'
  );

  console.log(
    'START COUNTDOWN'
  );

  console.log(
    'Tanggal:',
    dateString
  );

  console.log(
    'Waktu:',
    timeString
  );


  /* ==========================================================
     CLEAR INTERVAL LAMA
  ========================================================== */

  if (countdownInterval) {

    clearInterval(
      countdownInterval
    );

    countdownInterval =
      null;

  }


  /* ==========================================================
     TAMPILKAN TANGGAL COUNTDOWN
  ========================================================== */

  if (countdownDate) {

    if (
      dateString &&
      dateString !== '-'
    ) {

      countdownDate.textContent =
        String(dateString) +
        (
          timeString &&
          timeString !== '-'
            ? ' • ' + String(timeString)
            : ''
        );

    }

    else {

      countdownDate.textContent =
        '-';

    }

  }


  /* ==========================================================
     PARSE TARGET DATE
  ========================================================== */

  const targetDate =
    parseIndonesianDate(
      dateString,
      timeString
    );


  console.log(
    'TARGET COUNTDOWN:',
    targetDate
  );


  if (!targetDate) {

    console.error(
      'Tanggal countdown tidak dapat dibaca.'
    );


    showCountdownError();

    return;

  }


  console.log(
    'TARGET TIMESTAMP:',
    targetDate.getTime()
  );


  /* ==========================================================
     TAMPILKAN TIMER
  ========================================================== */

  if (countdownTimer) {

    countdownTimer.classList.remove(
      'hidden'
    );

  }


  if (countdownFinished) {

    countdownFinished.classList.add(
      'hidden'
    );

  }


  /* ==========================================================
     UPDATE PERTAMA
  ========================================================== */

  updateCountdown(
    targetDate
  );


  /* ==========================================================
     UPDATE SETIAP 1 DETIK
  ========================================================== */

  countdownInterval =
    setInterval(
      function () {

        updateCountdown(
          targetDate
        );

      },
      1000
    );


  console.log(
    'COUNTDOWN INTERVAL AKTIF'
  );

}


/* ============================================================
   PARSE TANGGAL INDONESIA
============================================================ */

function parseIndonesianDate(
  dateString,
  timeString
) {

  if (
    dateString === undefined ||
    dateString === null ||
    String(dateString).trim() === '' ||
    String(dateString).trim() === '-'
  ) {

    return null;

  }


  /* ==========================================================
     OBJECT DATE
  ========================================================== */

  if (
    dateString instanceof Date
  ) {

    if (
      !isNaN(
        dateString.getTime()
      )
    ) {

      return applyTimeToDate(
        new Date(dateString),
        timeString
      );

    }

  }


  const original =
    String(dateString).trim();


  console.log(
    'PARSE DATE:',
    original
  );


  /* ==========================================================
     FORMAT ISO
  ========================================================== */

  if (
    /^\d{4}-\d{2}-\d{2}/.test(
      original
    )
  ) {

    const isoMatch =
      original.match(
        /^(\d{4})-(\d{2})-(\d{2})/
      );


    if (isoMatch) {

      const year =
        parseInt(
          isoMatch[1],
          10
        );


      const month =
        parseInt(
          isoMatch[2],
          10
        ) - 1;


      const day =
        parseInt(
          isoMatch[3],
          10
        );


      return createWIBDate(
        year,
        month,
        day,
        timeString
      );

    }

  }


  /* ==========================================================
     BULAN INDONESIA
  ========================================================== */

  const months = {

    januari: 0,
    februari: 1,
    maret: 2,
    april: 3,
    mei: 4,
    juni: 5,
    juli: 6,
    agustus: 7,
    september: 8,
    oktober: 9,
    november: 10,
    desember: 11

  };


  const cleanDate =
    original
      .toLowerCase()
      .replace(/,/g, '')
      .replace(/\./g, '')
      .replace(/\s+/g, ' ')
      .trim();


  const parts =
    cleanDate.split(' ');


  console.log(
    'DATE PARTS:',
    parts
  );


  if (
    parts.length >= 3
  ) {

    const day =
      parseInt(
        parts[0],
        10
      );


    const month =
      months[
        parts[1]
      ];


    const year =
      parseInt(
        parts[2],
        10
      );


    if (
      !isNaN(day) &&
      month !== undefined &&
      !isNaN(year)
    ) {

      console.log(
        'PARSED:',
        day,
        month,
        year
      );


      return createWIBDate(
        year,
        month,
        day,
        timeString
      );

    }

  }


  /* ==========================================================
     FALLBACK JAVASCRIPT
  ========================================================== */

  const fallback =
    new Date(
      original
    );


  if (
    !isNaN(
      fallback.getTime()
    )
  ) {

    return applyTimeToDate(
      fallback,
      timeString
    );

  }


  return null;

}


/* ============================================================
   CREATE WIB DATE
============================================================ */

function createWIBDate(
  year,
  month,
  day,
  timeString
) {

  let hours = 0;

  let minutes = 0;

  let seconds = 0;


  /* ==========================================================
     PARSE JAM
  ========================================================== */

  if (
    timeString &&
    String(timeString).trim() !== '' &&
    String(timeString).trim() !== '-'
  ) {

    const timeText =
      String(timeString).trim();


    const timeMatch =
      timeText.match(
        /(\d{1,2}):(\d{2})(?::(\d{2}))?/
      );


    if (timeMatch) {

      hours =
        parseInt(
          timeMatch[1],
          10
        );


      minutes =
        parseInt(
          timeMatch[2],
          10
        );


      seconds =
        timeMatch[3]
          ? parseInt(
              timeMatch[3],
              10
            )
          : 0;

    }

  }


  /* ==========================================================
     VALIDASI JAM
  ========================================================== */

  if (
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59 ||
    seconds < 0 ||
    seconds > 59
  ) {

    console.error(
      'Jam tidak valid:',
      hours,
      minutes,
      seconds
    );


    return null;

  }


  /* ==========================================================
     WIB UTC +7
  ========================================================== */

  const utcTimestamp =
    Date.UTC(
      year,
      month,
      day,
      hours - 7,
      minutes,
      seconds
    );


  const result =
    new Date(
      utcTimestamp
    );


  if (
    isNaN(
      result.getTime()
    )
  ) {

    return null;

  }


  return result;

}


/* ============================================================
   APPLY TIME
============================================================ */

function applyTimeToDate(
  date,
  timeString
) {

  if (
    !date ||
    isNaN(
      date.getTime()
    )
  ) {

    return null;

  }


  if (
    !timeString ||
    String(timeString).trim() === '' ||
    String(timeString).trim() === '-'
  ) {

    return date;

  }


  const timeMatch =
    String(timeString)
      .match(
        /(\d{1,2}):(\d{2})(?::(\d{2}))?/
      );


  if (!timeMatch) {

    return date;

  }


  const hours =
    parseInt(
      timeMatch[1],
      10
    );


  const minutes =
    parseInt(
      timeMatch[2],
      10
    );


  const seconds =
    timeMatch[3]
      ? parseInt(
          timeMatch[3],
          10
        )
      : 0;


  const result =
    new Date(date);


  result.setUTCHours(
    hours - 7,
    minutes,
    seconds,
    0
  );


  return result;

}


/* ============================================================
   UPDATE COUNTDOWN
============================================================ */

function updateCountdown(
  targetDate
) {

  if (
    !targetDate ||
    isNaN(
      targetDate.getTime()
    )
  ) {

    return;

  }


  const now =
    new Date();


  const difference =
    targetDate.getTime() -
    now.getTime();


  /* ==========================================================
     SELESAI
  ========================================================== */

  if (
    difference <= 0
  ) {

    finishCountdown();

    return;

  }


  /* ==========================================================
     HARI
  ========================================================== */

  const days =
    Math.floor(
      difference /
      (
        1000 *
        60 *
        60 *
        24
      )
    );


  /* ==========================================================
     JAM
  ========================================================== */

  const hours =
    Math.floor(
      (
        difference %
        (
          1000 *
          60 *
          60 *
          24
        )
      ) /
      (
        1000 *
        60 *
        60
      )
    );


  /* ==========================================================
     MENIT
  ========================================================== */

  const minutes =
    Math.floor(
      (
        difference %
        (
          1000 *
          60 *
          60
        )
      ) /
      (
        1000 *
        60
      )
    );


  /* ==========================================================
     DETIK
  ========================================================== */

  const seconds =
    Math.floor(
      (
        difference %
        (
          1000 *
          60
        )
      ) /
      1000
    );


  /* ==========================================================
     UPDATE HTML
  ========================================================== */

  setCountdownValue(
    countdownDays,
    days
  );


  setCountdownValue(
    countdownHours,
    hours
  );


  setCountdownValue(
    countdownMinutes,
    minutes
  );


  setCountdownValue(
    countdownSeconds,
    seconds
  );


  /* ==========================================================
     PASTIKAN TIMER TAMPIL
  ========================================================== */

  if (countdownTimer) {

    countdownTimer.classList.remove(
      'hidden'
    );

  }


  if (countdownFinished) {

    countdownFinished.classList.add(
      'hidden'
    );

  }

}


/* ============================================================
   FORMAT ANGKA
============================================================ */

function setCountdownValue(
  element,
  value
) {

  if (!element) {

    console.warn(
      'Element countdown tidak ditemukan.'
    );

    return;

  }


  element.textContent =
    String(
      Math.max(
        0,
        value
      )
    ).padStart(
      2,
      '0'
    );

}


/* ============================================================
   COUNTDOWN SELESAI
============================================================ */

function finishCountdown() {

  console.log(
    'COUNTDOWN SELESAI'
  );


  if (countdownInterval) {

    clearInterval(
      countdownInterval
    );


    countdownInterval =
      null;

  }


  if (countdownTimer) {

    countdownTimer.classList.add(
      'hidden'
    );

  }


  if (countdownFinished) {

    countdownFinished.classList.remove(
      'hidden'
    );

  }

}


/* ============================================================
   COUNTDOWN ERROR
============================================================ */

function showCountdownError() {

  console.error(
    'COUNTDOWN ERROR'
  );


  /*
   * Timer sengaja tetap ditampilkan.
   */

  if (countdownTimer) {

    countdownTimer.classList.remove(
      'hidden'
    );

  }


  if (countdownFinished) {

    countdownFinished.classList.add(
      'hidden'
    );

  }


  if (countdownDays) {

    countdownDays.textContent =
      '00';

  }


  if (countdownHours) {

    countdownHours.textContent =
      '00';

  }


  if (countdownMinutes) {

    countdownMinutes.textContent =
      '00';

  }


  if (countdownSeconds) {

    countdownSeconds.textContent =
      '00';

  }

}


/* ============================================================
   HIDE LOADING
============================================================ */

function hideLoading() {

  if (loadingScreen) {

    loadingScreen.classList.add(
      'hidden'
    );

  }


  if (app) {

    app.classList.remove(
      'hidden'
    );

  }

}


/* ============================================================
   SHOW ERROR
============================================================ */

function showError(
  message
) {

  console.error(
    'SHOW ERROR:',
    message
  );


  if (loadingScreen) {

    loadingScreen.classList.add(
      'hidden'
    );

  }


  if (app) {

    app.classList.add(
      'hidden'
    );

  }


  if (errorMessage) {

    errorMessage.textContent =
      message ||
      'Terjadi kesalahan.';

  }


  if (errorScreen) {

    errorScreen.classList.remove(
      'hidden'
    );

  }

}


/* ============================================================
   BUKA UNDANGAN
============================================================ */

if (openInvitation) {

  openInvitation.addEventListener(
    'click',
    function () {

      window.scrollTo({

        top:
          window.innerHeight,

        behavior:
          'smooth'

      });

    }
  );

}


/* ============================================================
   DATA ACCESS
============================================================ */

function getInvitationData() {

  return invitationData;

}


function getPengantinData() {

  if (!invitationData) {

    return {};

  }


  return (
    invitationData.pengantin ||
    {}
  );

}


function getAcaraData() {

  if (!invitationData) {

    return {};

  }


  return (
    invitationData.acara ||
    {}
  );

}
