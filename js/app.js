/**
 * ============================================================
 * UNDANGAN ONLINE
 * APP.JS
 * VERSION 2 - STEP 4
 * ============================================================
 *
 * Frontend:
 * GitHub Pages
 *
 * Backend:
 * Google Apps Script
 *
 * Database:
 * Google Sheets
 * ============================================================
 */


/**
 * ============================================================
 * KONFIGURASI API
 * ============================================================
 *
 * PENTING:
 *
 * GANTI URL DI BAWAH DENGAN URL WEB APP APPS SCRIPT
 * YANG SUDAH KAMU PUNYA.
 *
 * Contoh:
 *
 * https://script.google.com/macros/s/XXXXXXXX/exec
 */

const API_URL =
  'GANTI_DENGAN_URL_WEB_APP_APPS_SCRIPT';


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


/* Main application */

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


/* Lokasi utama */

const lokasiAcara =
  document.getElementById(
    'lokasiAcara'
  );


/* Button */

const openInvitation =
  document.getElementById(
    'openInvitation'
  );


/* Akad */

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


/* Resepsi */

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


/**
 * ============================================================
 * DATA GLOBAL
 * ============================================================
 */

let invitationData = null;


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
       CEK HTTP
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
       CEK STATUS
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


  const panggilanPria =
    pengantin.panggilan_pria ||
    '';


  const panggilanWanita =
    pengantin.panggilan_wanita ||
    '';


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


  /* Akad */

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


  /* Resepsi */

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
   * NAMA PENGANTIN
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


  /**
   * ==========================================================
   * QUOTE
   * ==========================================================
   */

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
   * DATA SELESAI
   * ==========================================================
   */

  hideLoading();

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
 *
 * Fungsi ini akan kita gunakan pada fitur berikutnya.
 */


/**
 * Seluruh data
 */

function getInvitationData() {

  return invitationData;

}


/**
 * Data pengantin
 */

function getPengantinData() {

  if (!invitationData) {

    return {};

  }


  return (
    invitationData.pengantin ||
    {}
  );

}


/**
 * Data acara
 */

function getAcaraData() {

  if (!invitationData) {

    return {};

  }


  return (
    invitationData.acara ||
    {}
  );

}
