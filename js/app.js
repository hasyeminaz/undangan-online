/**
 * ============================================================
 * UNDANGAN ONLINE
 * APP.JS
 * VERSION 2
 * ============================================================
 *
 * Frontend GitHub Pages
 * terhubung dengan Google Apps Script API
 *
 * ============================================================
 */


/**
 * ============================================================
 * KONFIGURASI API
 * ============================================================
 */

const API_URL =
  'GANTI_DENGAN_URL_WEB_APP_APPS_SCRIPT';


/**
 * ============================================================
 * ELEMENT HTML
 * ============================================================
 */

const loadingScreen =
  document.getElementById('loadingScreen');

const app =
  document.getElementById('app');

const errorScreen =
  document.getElementById('errorScreen');

const errorMessage =
  document.getElementById('errorMessage');

const namaPengantin =
  document.getElementById('namaPengantin');

const namaPria =
  document.getElementById('namaPria');

const namaWanita =
  document.getElementById('namaWanita');

const tanggalAcara =
  document.getElementById('tanggalAcara');

const lokasiAcara =
  document.getElementById('lokasiAcara');

const openInvitation =
  document.getElementById('openInvitation');


/**
 * ============================================================
 * DATA GLOBAL
 * ============================================================
 *
 * Data disimpan di sini agar nantinya fitur lain
 * seperti countdown, RSVP, gallery, dan tamu
 * bisa menggunakan data yang sama.
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
 * LOAD DATA UNDANGAN
 * ============================================================
 */

async function loadInvitation() {

  try {

    /**
     * --------------------------------------------------------
     * CEK URL API
     * --------------------------------------------------------
     */

    if (
      !API_URL ||
      API_URL ===
      'GANTI_DENGAN_URL_WEB_APP_APPS_SCRIPT'
    ) {

      throw new Error(
        'URL Apps Script belum diatur.'
      );

    }


    /**
     * --------------------------------------------------------
     * REQUEST KE GOOGLE APPS SCRIPT
     * --------------------------------------------------------
     */

    const response =
      await fetch(
        API_URL +
        '?action=config'
      );


    /**
     * --------------------------------------------------------
     * CEK RESPONSE HTTP
     * --------------------------------------------------------
     */

    if (!response.ok) {

      throw new Error(
        'Server Apps Script tidak dapat diakses.'
      );

    }


    /**
     * --------------------------------------------------------
     * PARSE JSON
     * --------------------------------------------------------
     */

    const result =
      await response.json();


    /**
     * --------------------------------------------------------
     * CEK RESPONSE API
     * --------------------------------------------------------
     */

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


    /**
     * --------------------------------------------------------
     * SIMPAN DATA GLOBAL
     * --------------------------------------------------------
     */

    invitationData =
      result.data || {};


    /**
     * --------------------------------------------------------
     * RENDER WEBSITE
     * --------------------------------------------------------
     */

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
 * RENDER DATA UNDANGAN
 * ============================================================
 */

function renderInvitation(data) {

  /**
   * --------------------------------------------------------
   * AMBIL DATA PENGANTIN
   * --------------------------------------------------------
   *
   * V2 menggunakan:
   *
   * data.pengantin
   *
   * tetapi tetap menyediakan fallback ke V1.
   */

  const pengantin =
    data.pengantin || {};


  /**
   * Nama pria
   */

  const pria =
    pengantin.nama_pria ||
    data.nama_pria ||
    'Nama Pria';


  /**
   * Nama wanita
   */

  const wanita =
    pengantin.nama_wanita ||
    data.nama_wanita ||
    'Nama Wanita';


  /**
   * --------------------------------------------------------
   * AMBIL DATA ACARA
   * --------------------------------------------------------
   */

  const acara =
    data.acara || {};


  /**
   * Tanggal utama
   *
   * Untuk sementara kita menggunakan tanggal akad.
   */

  const tanggal =
    acara.akad_tanggal ||
    data.tanggal ||
    '-';


  /**
   * Lokasi utama
   *
   * Untuk sementara menggunakan alamat akad.
   */

  const lokasi =
    acara.akad_alamat ||
    acara.akad_lokasi ||
    data.lokasi ||
    '-';


  /**
   * --------------------------------------------------------
   * MASUKKAN DATA KE HTML
   * --------------------------------------------------------
   */

  if (namaPria) {

    namaPria.textContent =
      pria;

  }


  if (namaWanita) {

    namaWanita.textContent =
      wanita;

  }


  if (namaPengantin) {

    namaPengantin.textContent =
      pria +
      ' & ' +
      wanita;

  }


  if (tanggalAcara) {

    tanggalAcara.textContent =
      tanggal;

  }


  if (lokasiAcara) {

    lokasiAcara.textContent =
      lokasi;

  }


  /**
   * --------------------------------------------------------
   * DATA BERHASIL DITAMPILKAN
   * --------------------------------------------------------
   */

  hideLoading();

}


/**
 * ============================================================
 * HIDE LOADING SCREEN
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

function showError(message) {

  /**
   * Sembunyikan loading
   */

  if (loadingScreen) {

    loadingScreen.classList.add(
      'hidden'
    );

  }


  /**
   * Sembunyikan aplikasi
   */

  if (app) {

    app.classList.add(
      'hidden'
    );

  }


  /**
   * Tampilkan pesan error
   */

  if (errorMessage) {

    errorMessage.textContent =
      message ||
      'Terjadi kesalahan.';

  }


  /**
   * Tampilkan error screen
   */

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
 * FUNGSI AKSES DATA
 * ============================================================
 *
 * Fungsi ini sengaja kita siapkan dari sekarang.
 *
 * Nanti fitur:
 * - Countdown
 * - RSVP
 * - Tamu
 * - Gallery
 * - Acara
 *
 * bisa mengambil data tanpa request API berulang-ulang.
 */


/**
 * Ambil seluruh data undangan
 */

function getInvitationData() {

  return invitationData;

}


/**
 * Ambil data pengantin
 */

function getPengantinData() {

  if (
    !invitationData
  ) {

    return {};

  }


  return (
    invitationData.pengantin ||
    {}
  );

}


/**
 * Ambil data acara
 */

function getAcaraData() {

  if (
    !invitationData
  ) {

    return {};

  }


  return (
    invitationData.acara ||
    {}
  );

}
