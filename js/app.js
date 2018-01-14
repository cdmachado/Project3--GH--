
const jobSelect = document.getElementById('title');
const referenceDiv = document.getElementById('reference-div');
const designSelect = document.getElementById('design');
const fieldset = document.getElementsByTagName('fieldset')[0];

jobSelect.addEventListener('change', () => {
  debugger;
  const optionIndex = jobSelect.options.selectedIndex;
  if (optionIndex === 5) {
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'other-title';
    input.placeholder = 'Your Job Role';
    fieldset.insertBefore(input, referenceDiv);
  } else if (optionIndex !== 5) {
      const input = document.getElementById('other-title');
      fieldset.removeChild(input);
  }
});

designSelect.addEventListener('change', () => {
    debugger;
    const optionIndex = designSelect.options.selectedIndex;
    const colorSelect = document.getElementById('color');
    const options = colorSelect.getElementsByTagName('option');
    if (optionIndex === 1) {
      for (let i = 3; i < 6; i++) {
        option[0].style.display = 'none';
        options[i+1].style.display = 'none';
        options[(i+1)-3].style.display = 'block';
      }
    } else if (optionIndex === 2) {
      for (let i = 0; i < 3; i++) {
        option[0].style.display = 'none';
        options[i+1].style.display = 'none';
        options[(i+1)+3].style.display = 'block';
      }
    }
});
