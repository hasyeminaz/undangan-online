/**
 * ==========================================
 * KONFIGURASI
 * ==========================================
 *
 * GANTI URL DI BAWAH DENGAN URL
 * WEB APP GOOGLE APPS SCRIPT
 */

const API_URL =
  'GANTI_DENGAN_URL_APPS_SCRIPT';


/**
 * ==========================================
 * ELEMENT
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
  () => {

    loadInvitation();

  }
);


/**
 * ==========================================
 * LOAD DATA
 * ==========================================
 */

async function loadInvitation() {

  try {

    if (
      !API_URL ||
      API_URL === 'GANTI_DENGAN_URL_APPS_SCRIPT'
    ) {

      throw new Error(
        'URL Apps Script belum diatur.'
      );

    }


    const response =
      await fetch(
        `${API_URL}?action=config`
      );


    if (!response.ok) {

      throw new Error(
        'Server tidak memberikan response yang valid.'
      );

    }


    const result =
      await response.json();


    if (!result.success) {

      throw new Error(
        result.message ||
        'Data tidak berhasil diambil.'
      );

    }


    const data =
      result.data || {};


    renderInvitation(data);


  } catch (error) {

    console.error(error);

    showError(
      error.message
    );

  }

}


/**
 * ==========================================
 * RENDER DATA
 * ==========================================
 */

function renderInvitation(data) {

  const pria =
    data.nama_pria || 'Nama Pria';

  const wanita =
    data.nama_wanita || 'Nama Wanita';

  const tanggal =
    data.tanggal || '-';

  const lokasi =
    data.lokasi || '-';


  namaPria.textContent =
    pria;

  namaWanita.textContent =
    wanita;

  namaPengantin.textContent =
    `${pria} & ${wanita}`;

  tanggalAcara.textContent =
    tanggal;

  lokasiAcara.textContent =
    lokasi;


  hideLoading();

}


/**
 * ==========================================
 * HIDE LOADING
 * ==========================================
 */

function hideLoading() {

  loadingScreen.classList.add(
    'hidden'
  );

  app.classList.remove(
    'hidden'
  );

}


/**
 * ==========================================
 * SHOW ERROR
 * ==========================================
 */

function showError(message) {

  loadingScreen.classList.add(
    'hidden'
  );

  app.classList.add(
    'hidden'
  );

  errorMessage.textContent =
    message ||
    'Terjadi kesalahan.';

  errorScreen.classList.remove(
    'hidden'
  );

}


/**
 * ==========================================
 * OPEN INVITATION
 * ==========================================
 */

openInvitation.addEventListener(
  'click',
  () => {

    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });

  }
);