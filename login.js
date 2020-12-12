
console.log('Working')

const registrationForm = document.querySelector('form')


const name = document.getElementById('name')
const password = document.getElementById('password')

registrationForm.addEventListener('submit',(e)=> {
  e.preventDefault()
  
      password.className=name.className='form-control'
     
        if (name.value!='abcd') {
          name.className='form-control is-invalid'
        }
        if (password.value!='1234') {
          password.className='form-control is-invalid'
        }
        if (name.value==='abcd' && password.value==='1234') {
          window.location.href = 'index.html';
        }
      }
      )


