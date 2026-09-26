/**
 * ==========================================
 * UNDANGAN ONLINE
 * APP.JS - V1
 * ==========================================
 */


/**
 * ==========================================
 * KONFIGURASI API
 * ==========================================
 *
 * GANTI URL DI BAWAH DENGAN
 * WEB APP URL GOOGLE APPS SCRIPT
 *
 * Contoh:
 * https://script.google.com/macros/s/XXXXXXXX/exec
 */

const API_URL =
  'GANTI_DENGAN_URL_WEB_APP_APPS_SCRIPT';


/**
 * ==========================================
 * ELEMENT HTML
 * ==========================================
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
 * ==========================================
 * START APPLICATION
 * ==========================================
 */

document.addEventListener(
  'DOMContentLoaded',
  function () {

    loadInvitation();

  }
);


/**
 * ==========================================
 * LOAD DATA DARI APPS SCRIPT
 * ==========================================
 */

async function loadInvitation() {

  try {

    /**
     * Cek URL API
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
     * Request ke Google Apps Script
     */

    const response =
      await fetch(
        API_URL + '?action=config'
      );


    /**
     * Cek HTTP response
     */

    if (!response.ok) {

      throw new Error(
        'Server Apps Script tidak dapat diakses.'
      );

    }


    /**
     * Ambil JSON
     */

    const result =
      await response.json();


    /**
     * Cek status API
     */

    if (!result.success) {

      throw new Error(
        result.message ||
        'Data undangan gagal dimuat.'
      );

    }


    /**
     * Ambil data
     */

    const data =
      result.data || {};


    /**
     * Tampilkan data
     */

    renderInvitation(data);


  } catch (error) {

    console.error(
      'ERROR:',
      error
    );


    showError(
      error.message
    );

  }

}


/**
 * ==========================================
 * RENDER DATA KE WEBSITE
 * ==========================================
 */

function renderInvitation(data) {

  /**
   * Data pengantin
   */

  const pria =
    data.nama_pria ||
    'Nama Pria';

  const wanita =
    data.nama_wanita ||
    'Nama Wanita';


  /**
   * Data acara
   */

  const tanggal =
    data.tanggal ||
    '-';

  const lokasi =
    data.lokasi ||
    '-';


  /**
   * Nama pria
   */

  namaPria.textContent =
    pria;


  /**
   * Nama wanita
   */

  namaWanita.textContent =
    wanita;


  /**
   * Nama pasangan
   */

  namaPengantin.textContent =
    pria + ' & ' + wanita;


  /**
   * Tanggal acara
   */

  tanggalAcara.textContent =
    tanggal;


  /**
   * Lokasi acara
   */

  lokasiAcara.textContent =
    lokasi;


  /**
   * Sembunyikan loading
   */

  hideLoading();

}


/**
 * ==========================================
 * HIDE LOADING
 * ==========================================
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
 * ==========================================
 * SHOW ERROR
 * ==========================================
 */

function showError(message) {

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
 * ==========================================
 * BUTTON BUKA UNDANGAN
 * ==========================================
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
