let queue = [];
let printerBusy = false;
let running = false;
let docId = 0;

const queueContainer = document.getElementById("queueContainer");
const logContainer = document.getElementById("log");
const statusText = document.getElementById("statusText");

document.getElementById("addDoc").onclick = addDocument;
document.getElementById("startBtn").onclick = () => { running = true; runPrinter(); };
document.getElementById("pauseBtn").onclick = () => { running = false; };
document.getElementById("resetBtn").onclick = reset;

function addDocument() {
  docId++;
  const newDoc = { id: docId, status: "waiting" };
  queue.push(newDoc);
  addLog(`Dokumen #${docId} ditambahkan ke antrian`);
  renderQueue();
}

function reset() {
  queue = [];
  printerBusy = false;
  running = false;
  docId = 0;
  logContainer.innerHTML = "";
  renderQueue();
  updateStatus();
}

function runPrinter() {
  if (!running || printerBusy) return;
  const nextDoc = queue.find((d) => d.status === "waiting");
  if (!nextDoc) return;

  nextDoc.status = "printing";
  printerBusy = true;
  addLog(`Printer mulai mencetak dokumen #${nextDoc.id}`);
  renderQueue();
  updateStatus();

  setTimeout(() => {
    nextDoc.status = "done";
    addLog(`Printer selesai mencetak dokumen #${nextDoc.id}`);
    printerBusy = false;
    renderQueue();
    updateStatus();
    runPrinter();
  }, 2000);
}

function renderQueue() {
  queueContainer.innerHTML = "";
  if (queue.length === 0) {
    queueContainer.innerHTML = `<span class="empty">Semua dokumen sudah diproses</span>`;
    return;
  }

  queue.forEach((doc) => {
    const el = document.createElement("div");
    el.className = `doc ${doc.status}`;
    el.textContent = `Dokumen #${doc.id} (${doc.status})`;
    queueContainer.appendChild(el);
  });
}

function updateStatus() {
  if (printerBusy) {
    statusText.textContent = "Busy";
  } else if (queue.length === 0) {
    statusText.textContent = "Idle (No jobs)";
  } else {
    statusText.textContent = "Menunggu tugas berikutnya";
  }
}

function addLog(message) {
  const line = document.createElement("div");
  line.textContent = `→ ${message}`;
  logContainer.prepend(line);
}

const titleText = "Simulasi Spooling Printer";
const titleEl = document.getElementById("typingTitle");

let i = 0;
function typeTitle() {
  if (i < titleText.length) {
    titleEl.textContent += titleText.charAt(i);
    i++;
    setTimeout(typeTitle, 200); 
  }
}

window.onload = typeTitle;
