document.addEventListener('DOMContentLoaded', () => {
  const copyIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
  const checkIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

  const codeBlocks = document.querySelectorAll('.code-block');
  codeBlocks.forEach((block) => {
    if (block.id === 'snippetCode') return;

    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-code-btn';
    copyBtn.title = 'Copy to clipboard';
    copyBtn.innerHTML = copyIcon;
    block.appendChild(copyBtn);

    copyBtn.addEventListener('click', () => {
      const clone = block.cloneNode(true);
      const btnInClone = clone.querySelector('.copy-code-btn');
      if (btnInClone) btnInClone.remove();
      const textToCopy = clone.textContent.trim();
      navigator.clipboard.writeText(textToCopy).then(() => {
        copyBtn.innerHTML = checkIcon;
        copyBtn.classList.add('copied');
        setTimeout(() => {
          copyBtn.innerHTML = copyIcon;
          copyBtn.classList.remove('copied');
        }, 2000);
      });
    });
  });

  // Handle the dynamic responseBody in API Explorer
  const copyResponseBtn = document.getElementById('copyResponseBtn');
  const responseBody = document.getElementById('responseBody');
  if (copyResponseBtn && responseBody) {
    copyResponseBtn.addEventListener('click', () => {
      const textToCopy = responseBody.textContent.trim();
      if (!textToCopy) return; // Don't copy if empty
      
      navigator.clipboard.writeText(textToCopy).then(() => {
        copyResponseBtn.innerHTML = checkIcon;
        copyResponseBtn.classList.add('copied');
        setTimeout(() => {
          copyResponseBtn.innerHTML = copyIcon;
          copyResponseBtn.classList.remove('copied');
        }, 2000);
      });
    });
  }
});
