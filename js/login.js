  function togglePw(id, btn){
    const input = document.getElementById(id);
    const isPw = input.type === 'password';
    input.type = isPw ? 'text' : 'password';
    btn.textContent = isPw ? 'Ẩn' : 'Hiện';
  }