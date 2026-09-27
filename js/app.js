/**
 * ============================================================
 * UNDANGAN ONLINE
 * APP.JS
 * VERSION 2 - STEP 6
 * ============================================================
 */


/**
 * ============================================================
 * KONFIGURASI API
 * ============================================================
 */

const API_URL =
  'https://script.google.com/macros/s/AKfycbwHwdmCvqNbqUd_X5h8n4XwwP7LCSXhFs_Rp_rBH0veEQdSz0VVi44-jID3v4iq5MBltQ/exec';


/**
 * ============================================================
 * ELEMENT HTML
 * ============================================================
 */


/* Loading */

const loadingScreen =
  document.getElementById(
    'loadingScreen'
  );


/* Application */

const app =
  document.getElementById(
    'app'
  );


/* Error */

const errorScreen =
  document.getElementById(
    'errorScreen'
  );


const errorMessage =
  document.getElementById(
    'errorMessage'
  );


/* Pengantin */

const namaPengantin =
  document.getElementById(
    'namaPengantin'
  );


const namaPria =
  document.getElementById(
    'namaPria'
  );


const namaWanita =
  document.getElementById(
    'namaWanita'
  );


const quotePengantin =
  document.getElementById(
    'quotePengantin'
  );


/* Hero */

const tanggalAcara =
  document.getElementById(
    'tanggalAcara'
  );


const lokasiAcara =
  document.getElementById(
    'lokasiAcara'
  );


/* Button */

const openInvitation =
  document.getElementById(
    'openInvitation'
  );


/**
 * ============================================================
 * AKAD
 * ============================================================
 */

const akadTanggal =
  document.getElementById(
    'akadTanggal'
  );


const akadWaktu =
  document.getElementById(
    'akadWaktu'
  );


const akadLokasi =
  document.getElementById(
    'akadLokasi'
  );


const akadAlamat =
  document.getElementById(
    'akadAlamat'
  );


const akadMapsButton =
  document.getElementById(
    'akadMapsButton'
  );


/**
 * ============================================================
 * RESEPSI
 * ============================================================
 */

const resepsiTanggal =
  document.getElementById(
    'resepsiTanggal'
  );


const resepsiWaktu =
  document.getElementById(
    'resepsiWaktu'
  );


const resepsiLokasi =
  document.getElementById(
    'resepsiLokasi'
  );


const resepsiAlamat =
  document.getElementById(
    'resepsiAlamat'
  );


const resepsiMapsButton =
  document.getElementById(
    'resepsiMapsButton'
  );


/**
 * ============================================================
 * COUNTDOWN
 * ============================================================
 */

const countdownDate =
  document.getElementById(
    'countdownDate'
  );


const countdownTimer =
  document.getElementById(
    'countdownTimer'
  );


const countdownFinished =
  document.getElementById(
    'countdownFinished'
  );


const countdownDays =
  document.getElementById(
    'countdownDays'
  );


const countdownHours =
  document.getElementById(
    'countdownHours'
  );


const countdownMinutes =
  document.getElementById(
    'countdownMinutes'
  );


const countdownSeconds =
  document.getElementById(
    'countdownSeconds'
  );


/**
 * ============================================================
 * DATA GLOBAL
 * ============================================================
 */

let invitationData = null;


/**
 * ID interval countdown.
 *
 * Disimpan supaya kita bisa menghentikannya
 * ketika waktu sudah habis.
 */

let countdownInterval = null;


/**
 * ============================================================
 * START APPLICATION
 * ============================================================
 */

document.addEventListener(
  'DOMContentLoaded',
  function () {

    loadInvitation();

  }
);


/**
 * ============================================================
 * LOAD DATA UNDANGAN
 * ============================================================
 */

async function loadInvitation() {

  try {


    /* --------------------------------------------------------
       CEK URL API
    -------------------------------------------------------- */

    if (
      !API_URL ||
      API_URL ===
        'GANTI_DENGAN_URL_WEB_APP_APPS_SCRIPT'
    ) {

      throw new Error(
        'URL Apps Script belum diatur.'
      );

    }


    /* --------------------------------------------------------
       REQUEST API
    -------------------------------------------------------- */

    const response =
      await fetch(
        API_URL +
        '?action=config'
      );


    /* --------------------------------------------------------
       CEK RESPONSE
    -------------------------------------------------------- */

    if (!response.ok) {

      throw new Error(
        'Server Apps Script tidak dapat diakses.'
      );

    }


    /* --------------------------------------------------------
       PARSE JSON
    -------------------------------------------------------- */

    const result =
      await response.json();


    /* --------------------------------------------------------
       CEK STATUS API
    -------------------------------------------------------- */

    if (
      !result ||
      result.success !== true
    ) {

      throw new Error(
        result &&
        result.message
          ? result.message
          : 'Data undangan gagal dimuat.'
      );

    }


    /* --------------------------------------------------------
       SIMPAN DATA
    -------------------------------------------------------- */

    invitationData =
      result.data || {};


    /* --------------------------------------------------------
       RENDER
    -------------------------------------------------------- */

    renderInvitation(
      invitationData
    );


  } catch (error) {

    console.error(
      'Gagal memuat undangan:',
      error
    );


    showError(
      error.message
    );

  }

}


/**
 * ============================================================
 * RENDER UNDANGAN
 * ============================================================
 */

function renderInvitation(
  data
) {


  /**
   * ==========================================================
   * DATA PENGANTIN
   * ==========================================================
   */

  const pengantin =
    data.pengantin || {};


  const pria =
    pengantin.nama_pria ||
    data.nama_pria ||
    'Nama Pria';


  const wanita =
    pengantin.nama_wanita ||
    data.nama_wanita ||
    'Nama Wanita';


  const quote =
    pengantin.quote ||
    '';


  /**
   * ==========================================================
   * DATA ACARA
   * ==========================================================
   */

  const acara =
    data.acara || {};


  /**
   * ==========================================================
   * AKAD
   * ==========================================================
   */

  const akadDate =
    acara.akad_tanggal ||
    data.tanggal ||
    '-';


  const akadTime =
    acara.akad_waktu ||
    '-';


  const akadPlace =
    acara.akad_lokasi ||
    '-';


  const akadAddress =
    acara.akad_alamat ||
    '-';


  /**
   * ==========================================================
   * RESEPSI
   * ==========================================================
   */

  const resepsiDate =
    acara.resepsi_tanggal ||
    '-';


  const resepsiTime =
    acara.resepsi_waktu ||
    '-';


  const resepsiPlace =
    acara.resepsi_lokasi ||
    '-';


  const resepsiAddress =
    acara.resepsi_alamat ||
    '-';


  /**
   * ==========================================================
   * GOOGLE MAPS
   * ==========================================================
   */

  const mapsUrl =
    acara.maps_url ||
    '';


  /**
   * ==========================================================
   * HERO
   * ==========================================================
   */

  if (namaPengantin) {

    namaPengantin.textContent =
      pria +
      ' & ' +
      wanita;

  }


  if (tanggalAcara) {

    tanggalAcara.textContent =
      akadDate;

  }


  /**
   * ==========================================================
   * PENGANTIN
   * ==========================================================
   */

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


  /**
   * ==========================================================
   * LOKASI UTAMA
   * ==========================================================
   */

  if (lokasiAcara) {

    lokasiAcara.textContent =
      akadAddress;

  }


  /**
   * ==========================================================
   * AKAD
   * ==========================================================
   */

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


  /**
   * ==========================================================
   * RESEPSI
   * ==========================================================
   */

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


  /**
   * ==========================================================
   * GOOGLE MAPS BUTTON
   * ==========================================================
   */

  setupMapsButton(
    akadMapsButton,
    mapsUrl
  );


  setupMapsButton(
    resepsiMapsButton,
    mapsUrl
  );


  /**
   * ==========================================================
   * COUNTDOWN
   * ==========================================================
   */

  startCountdown(
    akadDate,
    akadTime
  );


  /**
   * ==========================================================
   * SELESAI
   * ==========================================================
   */

  hideLoading();

}


/**
 * ============================================================
 * GOOGLE MAPS BUTTON
 * ============================================================
 */

function setupMapsButton(
  button,
  url
) {

  if (!button) {

    return;

  }


  if (
    url &&
    url.trim() !== ''
  ) {

    button.href =
      url.trim();

    button.target =
      '_blank';

    button.rel =
      'noopener noreferrer';

    button.classList.remove(
      'hidden'
    );


    button.setAttribute(
      'aria-label',
      'Buka lokasi di Google Maps'
    );


  } else {

    button.classList.add(
      'hidden'
    );

  }

}


/**
 * ============================================================
 * COUNTDOWN
 * ============================================================
 *
 * Countdown menggunakan:
 *
 * akad_tanggal
 * akad_waktu
 *
 * dari Google Sheets.
 *
 * Contoh:
 *
 * 2 April 2026
 * 08:00 WIB
 *
 * ============================================================
 */

function startCountdown(
  dateString,
  timeString
) {


  /**
   * Bersihkan interval sebelumnya
   */

  if (countdownInterval) {

    clearInterval(
      countdownInterval
    );

  }


  /**
   * Tampilkan tanggal countdown
   */

  if (countdownDate) {

    if (
      dateString &&
      dateString !== '-'
    ) {

      countdownDate.textContent =
        dateString +
        (
          timeString &&
          timeString !== '-'
            ? ' • ' + timeString
            : ''
        );

    } else {

      countdownDate.textContent =
        '-';

    }

  }


  /**
   * Konversi tanggal ke Date
   */

  const targetDate =
    parseIndonesianDate(
      dateString,
      timeString
    );


  /**
   * Jika tanggal tidak valid
   */

  if (!targetDate) {

    showCountdownError();

    return;

  }


  /**
   * Jalankan countdown pertama kali
   */

  updateCountdown(
    targetDate
  );


  /**
   * Update setiap 1 detik
   */

  countdownInterval =
    setInterval(
      function () {

        updateCountdown(
          targetDate
        );

      },
      1000
    );

}


/**
 * ============================================================
 * PARSE TANGGAL INDONESIA
 * ============================================================
 *
 * Mendukung:
 *
 * 2 April 2026
 * 02 April 2026
 * 2 April 2026
 *
 * ============================================================
 */

function parseIndonesianDate(
  dateString,
  timeString
) {

  if (
    !dateString ||
    dateString === '-'
  ) {

    return null;

  }


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
    String(
      dateString
    )
      .trim()
      .toLowerCase()
      .replace(
        /,/g,
        ''
      );


  const parts =
    cleanDate.split(
      /\s+/
    );


  if (
    parts.length < 3
  ) {

    return null;

  }


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
    isNaN(day) ||
    month === undefined ||
    isNaN(year)
  ) {

    return null;

  }


  /**
   * Default waktu
   */

  let hours = 0;

  let minutes = 0;

  let seconds = 0;


  /**
   * Ambil waktu dari:
   *
   * 08:00 WIB
   * 13:00 WIB
   */

  if (
    timeString &&
    timeString !== '-'
  ) {

    const timeMatch =
      String(
        timeString
      ).match(
        /(\d{1,2}):(\d{2})/
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

    }

  }


  /**
   * Indonesia WIB = UTC+7
   *
   * Kita buat timestamp UTC
   * agar countdown konsisten.
   */

  const utcTime =
    Date.UTC(
      year,
      month,
      day,
      hours - 7,
      minutes,
      seconds
    );


  return new Date(
    utcTime
  );

}


/**
 * ============================================================
 * UPDATE COUNTDOWN
 * ============================================================
 */

function updateCountdown(
  targetDate
) {

  const now =
    new Date();


  const difference =
    targetDate.getTime() -
    now.getTime();


  /**
   * Jika waktu sudah tiba
   * atau sudah lewat.
   */

  if (
    difference <= 0
  ) {

    finishCountdown();

    return;

  }


  /**
   * Hitung hari
   */

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


  /**
   * Hitung jam
   */

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


  /**
   * Hitung menit
   */

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


  /**
   * Hitung detik
   */

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


  /**
   * Tampilkan
   */

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


  /**
   * Pastikan timer terlihat
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

}


/**
 * ============================================================
 * SET COUNTDOWN VALUE
 * ============================================================
 */

function setCountdownValue(
  element,
  value
) {

  if (!element) {

    return;

  }


  element.textContent =
    String(
      value
    ).padStart(
      2,
      '0'
    );

}


/**
 * ============================================================
 * COUNTDOWN SELESAI
 * ============================================================
 */

function finishCountdown() {

  /**
   * Hentikan interval
   */

  if (countdownInterval) {

    clearInterval(
      countdownInterval
    );

    countdownInterval =
      null;

  }


  /**
   * Sembunyikan angka countdown
   */

  if (countdownTimer) {

    countdownTimer.classList.add(
      'hidden'
    );

  }


  /**
   * Tampilkan pesan
   */

  if (countdownFinished) {

    countdownFinished.classList.remove(
      'hidden'
    );

  }

}


/**
 * ============================================================
 * COUNTDOWN ERROR
 * ============================================================
 */

function showCountdownError() {

  if (countdownTimer) {

    countdownTimer.classList.add(
      'hidden'
    );

  }


  if (countdownFinished) {

    countdownFinished.classList.remove(
      'hidden'
    );


    const title =
      countdownFinished.querySelector(
        'h3'
      );


    const text =
      countdownFinished.querySelector(
        'p'
      );


    if (title) {

      title.textContent =
        'Tanggal Belum Diatur';

    }


    if (text) {

      text.textContent =
        'Silakan periksa tanggal acara pada Spreadsheet.';

    }

  }

}


/**
 * ============================================================
 * HIDE LOADING
 * ============================================================
 */

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


/**
 * ============================================================
 * SHOW ERROR
 * ============================================================
 */

function showError(
  message
) {

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


/**
 * ============================================================
 * BUTTON BUKA UNDANGAN
 * ============================================================
 */

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


/**
 * ============================================================
 * DATA ACCESS
 * ============================================================
 */


/* Seluruh data */

function getInvitationData() {

  return invitationData;

}


/* Data pengantin */

function getPengantinData() {

  if (!invitationData) {

    return {};

  }


  return (
    invitationData.pengantin ||
    {}
  );

}


/* Data acara */

function getAcaraData() {

  if (!invitationData) {

    return {};

  }


  return (
    invitationData.acara ||
    {}
  );

}
