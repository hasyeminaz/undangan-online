/**
 * ============================================================
 * UNDANGAN ONLINE
 * APP.JS
 * STEP 6 - COUNTDOWN
 * ============================================================
 */

const API_URL =
  'https://script.google.com/macros/s/AKfycbwHwdmCvqNbqUd_X5h8n4XwwP7LCSXhFs_Rp_rBH0veEQdSz0VVi44-jID3v4iq5MBltQ/exec';


/* ============================================================
   ELEMENT
============================================================ */

const loadingScreen = document.getElementById('loadingScreen');
const app = document.getElementById('app');
const errorScreen = document.getElementById('errorScreen');
const errorMessage = document.getElementById('errorMessage');

const namaPengantin = document.getElementById('namaPengantin');
const namaPria = document.getElementById('namaPria');
const namaWanita = document.getElementById('namaWanita');
const quotePengantin = document.getElementById('quotePengantin');

const tanggalAcara = document.getElementById('tanggalAcara');
const lokasiAcara = document.getElementById('lokasiAcara');

const akadTanggal = document.getElementById('akadTanggal');
const akadWaktu = document.getElementById('akadWaktu');
const akadLokasi = document.getElementById('akadLokasi');
const akadAlamat = document.getElementById('akadAlamat');
const akadMapsButton = document.getElementById('akadMapsButton');

const resepsiTanggal = document.getElementById('resepsiTanggal');
const resepsiWaktu = document.getElementById('resepsiWaktu');
const resepsiLokasi = document.getElementById('resepsiLokasi');
const resepsiAlamat = document.getElementById('resepsiAlamat');
const resepsiMapsButton = document.getElementById('resepsiMapsButton');

const countdownDate = document.getElementById('countdownDate');
const countdownTimer = document.getElementById('countdownTimer');
const countdownFinished = document.getElementById('countdownFinished');

const countdownDays = document.getElementById('countdownDays');
const countdownHours = document.getElementById('countdownHours');
const countdownMinutes = document.getElementById('countdownMinutes');
const countdownSeconds = document.getElementById('countdownSeconds');

const openInvitation = document.getElementById('openInvitation');


/* ============================================================
   GLOBAL
============================================================ */

let invitationData = null;
let countdownInterval = null;


/* ============================================================
   START
============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  loadInvitation();
});


/* ============================================================
   LOAD API
============================================================ */

async function loadInvitation() {

  try {

    const response = await fetch(
      API_URL + '?action=config',
      {
        method: 'GET',
        cache: 'no-cache'
      }
    );

    if (!response.ok) {
      throw new Error(
        'Server Apps Script tidak dapat diakses.'
      );
    }

    const result = await response.json();

    console.log('RESPON API:', result);

    if (!result || result.success !== true) {
      throw new Error(
        result && result.message
          ? result.message
          : 'Data undangan gagal dimuat.'
      );
    }

    invitationData = result.data || {};

    console.log(
      'DATA UNDANGAN:',
      invitationData
    );

    renderInvitation(invitationData);

  } catch (error) {

    console.error(
      'ERROR LOAD INVITATION:',
      error
    );

    showError(error.message);

  }

}


/* ============================================================
   RENDER
============================================================ */

function renderInvitation(data) {

  console.log(
    'DATA RENDER:',
    data
  );


  /* ----------------------------------------------------------
     PENGANTIN
  ---------------------------------------------------------- */

  const pengantin = data.pengantin || {};

  const pria = getFirstValue([
    pengantin.nama_pria,
    data.nama_pria,
    data.config?.nama_pria
  ]) || 'Nama Pria';

  const wanita = getFirstValue([
    pengantin.nama_wanita,
    data.nama_wanita,
    data.config?.nama_wanita
  ]) || 'Nama Wanita';

  const quote = getFirstValue([
    pengantin.quote,
    data.quote
  ]) || '';


  /* ----------------------------------------------------------
     ACARA
  ---------------------------------------------------------- */

  const acara = data.acara || {};


  /* ----------------------------------------------------------
     AKAD
  ---------------------------------------------------------- */

  const akadDate = getFirstValue([
    acara.akad_tanggal,
    acara.tanggal_akad,
    data.akad_tanggal,
    data.tanggal_akad,
    data.config?.akad_tanggal
  ]) || '-';

  const akadTime = getFirstValue([
    acara.akad_waktu,
    acara.waktu_akad,
    data.akad_waktu,
    data.waktu_akad,
    data.config?.akad_waktu
  ]) || '-';

  const akadPlace = getFirstValue([
    acara.akad_lokasi,
    acara.lokasi_akad,
    data.akad_lokasi,
    data.lokasi_akad
  ]) || '-';

  const akadAddress = getFirstValue([
    acara.akad_alamat,
    acara.alamat_akad,
    data.akad_alamat,
    data.alamat_akad
  ]) || '-';


  /* ----------------------------------------------------------
     RESEPSI
  ---------------------------------------------------------- */

  const resepsiDate = getFirstValue([
    acara.resepsi_tanggal,
    acara.tanggal_resepsi,
    data.resepsi_tanggal
  ]) || akadDate || '-';

  const resepsiTime = getFirstValue([
    acara.resepsi_waktu,
    acara.waktu_resepsi,
    data.resepsi_waktu
  ]) || '-';

  const resepsiPlace = getFirstValue([
    acara.resepsi_lokasi,
    acara.lokasi_resepsi,
    data.resepsi_lokasi
  ]) || '-';

  const resepsiAddress = getFirstValue([
    acara.resepsi_alamat,
    acara.alamat_resepsi,
    data.resepsi_alamat
  ]) || '-';


  /* ----------------------------------------------------------
     MAPS
  ---------------------------------------------------------- */

  const mapsUrl = getFirstValue([
    acara.maps_url,
    data.maps_url
  ]) || '';


  /* ----------------------------------------------------------
     DEBUG
  ---------------------------------------------------------- */

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


  /* ----------------------------------------------------------
     HERO
  ---------------------------------------------------------- */

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


  /* ----------------------------------------------------------
     PENGANTIN
  ---------------------------------------------------------- */

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


  /* ----------------------------------------------------------
     AKAD
  ---------------------------------------------------------- */

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


  /* ----------------------------------------------------------
     RESEPSI
  ---------------------------------------------------------- */

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


  /* ----------------------------------------------------------
     MAPS
  ---------------------------------------------------------- */

  setupMapsButton(
    akadMapsButton,
    mapsUrl
  );

  setupMapsButton(
    resepsiMapsButton,
    mapsUrl
  );


  /* ----------------------------------------------------------
     COUNTDOWN
  ---------------------------------------------------------- */

  startCountdown(
    akadDate,
    akadTime
  );


  /* ----------------------------------------------------------
     SHOW APP
  ---------------------------------------------------------- */

  hideLoading();

}


/* ============================================================
   GET VALUE
============================================================ */

function getFirstValue(values) {

  for (let i = 0; i < values.length; i++) {

    const value = values[i];

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
   MAPS BUTTON
============================================================ */

function setupMapsButton(button, url) {

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

  } else {

    button.classList.add(
      'hidden'
    );

  }

}


/* ============================================================
   COUNTDOWN
============================================================ */

function startCountdown(
  dateString,
  timeString
) {

  if (countdownInterval) {

    clearInterval(
      countdownInterval
    );

    countdownInterval = null;

  }


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


  console.log(
    'COUNTDOWN DATE:',
    dateString
  );

  console.log(
    'COUNTDOWN TIME:',
    timeString
  );


  const targetDate =
    parseIndonesianDate(
      dateString,
      timeString
    );


  console.log(
    'TARGET DATE:',
    targetDate
  );


  if (!targetDate) {

    showCountdownError();

    return;

  }


  updateCountdown(
    targetDate
  );


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


/* ============================================================
   PARSE DATE INDONESIA
============================================================ */

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


  /* ----------------------------------------------------------
     ISO DATE
  ---------------------------------------------------------- */

  if (
    typeof dateString === 'string' &&
    /^\d{4}-\d{2}-\d{2}/.test(
      dateString
    )
  ) {

    const isoDate =
      new Date(dateString);

    if (
      !isNaN(
        isoDate.getTime()
      )
    ) {

      return applyTimeToDate(
        isoDate,
        timeString
      );

    }

  }


  /* ----------------------------------------------------------
     BULAN INDONESIA
  ---------------------------------------------------------- */

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
    String(dateString)
      .trim()
      .toLowerCase()
      .replace(/,/g, '');


  const parts =
    cleanDate.split(/\s+/);


  if (parts.length < 3) {
    return null;
  }


  const day =
    parseInt(
      parts[0],
      10
    );

  const month =
    months[parts[1]];

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


  /* ----------------------------------------------------------
     WAKTU
  ---------------------------------------------------------- */

  let hours = 0;
  let minutes = 0;
  let seconds = 0;


  if (
    timeString &&
    timeString !== '-'
  ) {

    const timeMatch =
      String(timeString)
        .match(
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


  /* ----------------------------------------------------------
     WIB UTC+7
  ---------------------------------------------------------- */

  const utcTimestamp =
    Date.UTC(
      year,
      month,
      day,
      hours - 7,
      minutes,
      seconds
    );


  return new Date(
    utcTimestamp
  );

}


/* ============================================================
   APPLY TIME
============================================================ */

function applyTimeToDate(
  date,
  timeString
) {

  if (
    !timeString ||
    timeString === '-'
  ) {

    return date;

  }


  const timeMatch =
    String(timeString)
      .match(
        /(\d{1,2}):(\d{2})/
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


  const result =
    new Date(date);


  result.setUTCHours(
    hours - 7,
    minutes,
    0,
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

  const now =
    new Date();


  const difference =
    targetDate.getTime() -
    now.getTime();


  if (difference <= 0) {

    finishCountdown();

    return;

  }


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
    return;
  }

  element.textContent =
    String(value)
      .padStart(
        2,
        '0'
      );

}


/* ============================================================
   COUNTDOWN SELESAI
============================================================ */

function finishCountdown() {

  if (countdownInterval) {

    clearInterval(
      countdownInterval
    );

    countdownInterval = null;

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


  const title =
    countdownFinished
      ?.querySelector('h3');

  const text =
    countdownFinished
      ?.querySelector('p');


  if (title) {

    title.textContent =
      'Tanggal Belum Diatur';

  }


  if (text) {

    text.textContent =
      'Silakan periksa tanggal acara pada Spreadsheet.';

  }

}


/* ============================================================
   LOADING
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
   ERROR
============================================================ */

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
