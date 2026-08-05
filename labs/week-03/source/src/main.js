import './style.css';

const form = document.querySelector('#request-form');

// TODO 1: query preview/status/list elements
const previewName = document.querySelector('#preview-name');
const previewType = document.querySelector('#preview-type');
const previewDetails = document.querySelector('#preview-details');
const formStatus = document.querySelector('#form-status');
const requestList = document.querySelector('#request-list');

// TODO 2: readForm()
function readForm() {
  return {
    requesterName: form.requesterName.value,
    requestType: form.requestType.value,
    details: form.detailstextarea.value
  };
}

// TODO 3: renderPreview(data)
function renderPreview(data) {
  previewName.textContent = data.requesterName || 'ยังไม่ระบุชื่อ';
  previewType.textContent = data.requestType || 'ยังไม่เลือกประเภท';
  previewDetails.textContent = data.details || 'ยังไม่มีรายละเอียด';
}

// TODO 4: validate(data)
function validate(data) {
  const errors = [];
  if (!data.requesterName.trim()) {
    errors.push('Requester Name is required');
  }
  if (!data.requestType) {
    errors.push('Request Type is required');
  }
  if (!data.details.trim()) {
    errors.push('Details are required');
  }
  return errors;
}

// TODO 5: renderErrors(errors)
function renderErrors(errors) {
  formStatus.textContent = errors.join(', ');
}

// TODO 6: input and submit listeners

form.addEventListener('input', () => {
  const formData = readForm();
  renderPreview(formData);
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = readForm();
  const errors = validate(formData);
  if (errors.length > 0) {
    renderErrors(errors);
  } else {
    formStatus.textContent = 'Request submitted successfully!';
    // TODO: Add code to submit the form data
  }
});

console.log('LAB 3 starter ready', form);