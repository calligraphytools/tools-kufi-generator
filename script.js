document.addEventListener('DOMContentLoaded', function() {
  const gridContainer = document.getElementById('gridContainer');
  const penTool = document.getElementById('penTool');
  const eraserTool = document.getElementById('eraserTool');
  const colorPicker = document.getElementById('colorPicker');
  const saveButton = document.getElementById('saveButton');
  const rowInput = document.getElementById('rowInput');
  const colInput = document.getElementById('colInput');
  const resizeButton = document.getElementById('resizeButton');

  let currentTool = 'pen'; // Varsayılan kalem aracı

  // Izgara oluşturma fonksiyonu
  function createGrid(rows, cols) {
    gridContainer.innerHTML = ''; // Izgarayı temizle

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');

        // Kare üzerine tıklama olayı
        gridItem.addEventListener('mousedown', function() {
          if (currentTool === 'pen') {
            gridItem.style.backgroundColor = colorPicker.value;
          } else if (currentTool === 'eraser') {
            gridItem.style.backgroundColor = '#fff'; // Silgi, beyaz ile boyar
          }
        });

        gridContainer.appendChild(gridItem);
      }
    }
    gridContainer.style.gridTemplateColumns = `repeat(${cols}, 50px)`; // Sütun genişliği ayarı
  }

  // Varsayılan olarak 10x10 bir ızgara oluştur
  createGrid(32, 32);

  // Kalem aracı seçildiğinde
  penTool.addEventListener('click', function() {
    currentTool = 'pen';
    penTool.classList.add('active');
    eraserTool.classList.remove('active');
  });

  // Silgi aracı seçildiğinde
  eraserTool.addEventListener('click', function() {
    currentTool = 'eraser';
    eraserTool.classList.add('active');
    penTool.classList.remove('active');
  });

  // Renk seçildiğinde
  colorPicker.addEventListener('change', function() {
    currentTool = 'pen'; // Renk seçildiğinde varsayılan kalem aracı kullanılsın
    penTool.classList.add('active');
    eraserTool.classList.remove('active');
  });

  // Izgara boyutunu değiştirme butonuna basıldığında
  resizeButton.addEventListener('click', function() {
    const rows = parseInt(rowInput.value);
    const cols = parseInt(colInput.value);
    
    if (rows >= 1 && cols >= 1 && rows <= 128 && cols <= 128) { // Geçerli bir aralık kontrolü yapın
      createGrid(rows, cols);
    } else {
      alert('Satır ve sütun sayısı 1 ile 18 arasında olmalıdır.');
    }
  });

  // Kaydetme butonuna basıldığında
  saveButton.addEventListener('click', function() {
    const svgData = getSvgData(); // SVG verisini al
    downloadSvg(svgData, 'drawing.svg'); // SVG dosyasını indir
  });

  // SVG verisini oluşturma fonksiyonu
  function getSvgData() {
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(gridContainer);
    const svgBlob = new Blob([svgString], {type: 'image/svg+xml'});
    return URL.createObjectURL(svgBlob);
  }

  // SVG dosyasını indirme fonksiyonu
  function downloadSvg(svgUrl, filename) {
    const a = document.createElement('a');
    a.href = svgUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
});
