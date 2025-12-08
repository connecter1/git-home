const loginForm = document.querySelector('#login_form');

if (loginForm) {
  loginForm.onsubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formObject = Object.fromEntries(formData.entries());

    console.log(formObject);

    try {
      const { data } = await axios({
        method: 'post',
        url: '/users/login',
        data: {
          ...formObject,
          address: {
            city: formObject.city,
            state: formObject.state,
            country: formObject.country,
          },
        },
      });

      console.log(data);

      if (data) {
        window.location.href = '/posts';
      }

    } catch (e) {
      handlerError(e);
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
  }
}