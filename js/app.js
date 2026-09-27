/**
 * ============================================================
 * UNDANGAN ONLINE
 * APP.JS
 * VERSION 2 - STEP 5
 * ============================================================
 */


/**
 * ============================================================
 * KONFIGURASI API
 * ============================================================
 *
 * GANTI DENGAN URL WEB APP APPS SCRIPT KAMU.
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


/* ============================================================
   AKAD
============================================================ */

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


/* ============================================================
   RESEPSI
============================================================ */

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
 * DATA GLOBAL
 * ============================================================
 */

let invitationData = null;


/**
 * ============================================================
 * START
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
 * LOAD DATA
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
       JSON
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


  /* ==========================================================
     DATA PENGANTIN
  ========================================================== */

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


  /* ==========================================================
     DATA ACARA
  ========================================================== */

  const acara =
    data.acara || {};


  /* ==========================================================
     AKAD
  ========================================================== */

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


  /* ==========================================================
     RESEPSI
  ========================================================== */

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


  /* ==========================================================
     GOOGLE MAPS
  ========================================================== */

  const mapsUrl =
    acara.maps_url ||
    '';


  /* ==========================================================
     HERO
  ========================================================== */

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
     LOKASI UTAMA
  ========================================================== */

  if (lokasiAcara) {

    lokasiAcara.textContent =
      akadAddress;

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
     GOOGLE MAPS BUTTON
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
     SELESAI
  ========================================================== */

  hideLoading();

}


/**
 * ============================================================
 * SETUP GOOGLE MAPS BUTTON
 * ============================================================
 */

function setupMapsButton(
  button,
  url
) {

  if (!button) {

    return;

  }


  /* Jika URL tersedia */

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

    /*
     * Jika URL kosong,
     * tombol disembunyikan.
     */

    button.classList.add(
      'hidden'
    );

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
