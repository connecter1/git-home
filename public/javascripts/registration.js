const registrationForm = document.querySelector('#registration_form');

if (registrationForm) {
  registrationForm.onsubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formObject = Object.fromEntries(formData.entries());

    console.log(formObject);

    try {
      const { data } = await axios({
        method: 'post',
        url: 'http://127.0.0.1:3001/users/registration',
        data: {
          ...formObject,
        },
      });

      console.log(data);

      window.location.href = 'http://127.0.0.1:3001/users/views/login';

    } catch (e) {
      handlerError(e);
      return;
    }
  };
}

function handlerError(e) {
  const errors = e?.response?.data?.errors;
  if (errors) {
    const errorSpans = document.querySelectorAll('span[id^="error_"]');

    errorSpans.forEach((errorSpan) => {
      errorSpan.innerText = '';
    });

    for (const [key, value] of Object.entries(errors)) {
      if (typeof value !== 'object') {
        const span = document.querySelector(`span#error_${key}`);
        if (span) {
          span.innerText = value;
        }
      } else {
        for (const [key2, value2] of Object.entries(value)) {
          const span = document.querySelector(`span#error_${key2}`);
          if (span) {
            span.innerText = value2;
          }
        }
      }
    }
    return { data: errors };
  }

  return { data: null };
}