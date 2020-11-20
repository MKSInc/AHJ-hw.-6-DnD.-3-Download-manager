import file1 from '../files/Storage Standard.pdf';
import file2 from '../files/Streams Standard.pdf';
import file3 from '../files/XMLHttpRequest Standard.pdf';

const files = { file1, file2, file3 };

const els = {
  filesTable: null,
  fileLinks: null,
  totalFilesSize: null,
};

const selectors = {
  filesTable: '[data-id="files-table"]',
  fileRow: '[data-id="file-row"]',
  fileName: '[data-id="file-name"]',
  fileLink: '[data-id="file-link"]',
  totalFilesSize: '[data-id="total-files-size"]',
};

els.filesTable = document.querySelector(selectors.filesTable);

els.fileLinks = els.filesTable.querySelectorAll(selectors.fileLink);
els.fileLinks.forEach((fileLink) => {
  // eslint-disable-next-line no-param-reassign
  fileLink.href = files[fileLink.dataset.link];
  const fileRowEl = fileLink.closest(selectors.fileRow);
  const fileNameEl = fileRowEl.querySelector(selectors.fileName);
  // eslint-disable-next-line no-param-reassign
  fileLink.download = fileNameEl.innerHTML;
  // eslint-disable-next-line no-param-reassign
  fileLink.rel = 'noopener';
});

els.totalFilesSize = document.querySelector(selectors.totalFilesSize);

let totalFilesSize = 0;

function onFilesTableClick(event) {
  const { target } = event;

  if (!target.hasAttribute('data-id') || target.dataset.id !== 'file-link') return;

  const file = new File([target.href], '');
  const reader = new FileReader();
  reader.readAsDataURL(file);
  // eslint-disable-next-line no-console
  console.log('file size:', file.size);

  const fileSizeMb = file.size / 1024 / 1024;
  // eslint-disable-next-line no-console
  console.log('file size (MB):', fileSizeMb);

  totalFilesSize += fileSizeMb;
  els.totalFilesSize.textContent = `${totalFilesSize.toFixed(1)}`;
}

els.filesTable.addEventListener('click', onFilesTableClick);
