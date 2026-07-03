document.addEventListener('DOMContentLoaded', () => {
  const scriptUrl = 'https://script.google.com/macros/s/AKfycbxSVZPAM0UTvwKpkwGDHz5K3W3tjTOh0STRlhiTxgwLu1KgV0wjgHmlvCUWhFExYy6kLw/exec';
  const form = document.querySelector('.bottom-block__form');

  if (!form) {
    return;
  }

  if (scriptUrl.includes('YOUR_SCRIPT_ID')) {
    console.warn('Google Apps Script URL is not configured in js/form-submit.js. Replace YOUR_SCRIPT_ID with your deployed script Web App ID.');
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = formData.get('name')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const mess = formData.get('mess')?.toString().trim();

    if (!name || !email || !mess) {
      alert('Please fill in all fields before sending.');
      return;
    }

    const payload = new URLSearchParams({
      name,
      email,
      mess,
    });

    console.log('Sending form data to Apps Script', { scriptUrl, name, email, mess });

    try {
      const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: payload,
      });

      const responseText = await response.text();

      if (!response.ok) {
        throw new Error(responseText || 'Request failed');
      }

      console.log(responseText);
      form.reset();
      alert('Đã lưu thành công');
    } catch (error) {
      console.error('Form submit failed', error);
      alert('Đã xảy ra lỗi khi gửi dữ liệu.');
    }
  });
});
