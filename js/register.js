
  function togglePw(id, btn){
    const input = document.getElementById(id);
    const isPw = input.type === 'password';
    input.type = isPw ? 'text' : 'password';
    btn.textContent = isPw ? 'Ẩn' : 'Hiện';
  }
   function togglePw(id, btn){
    const input = document.getElementById(id);
    const isPw = input.type === 'password';
    input.type = isPw ? 'text' : 'password';
    btn.textContent = isPw ? 'Ẩn' : 'Hiện';
  }

  function checkStrength(val){
    const bars = [document.getElementById('s1'), document.getElementById('s2'), document.getElementById('s3')];
    let score = 0;
    if(val.length >= 8) score++;
    if(/[A-Z]/.test(val) && /[0-9]/.test(val)) score++;
    if(/[^A-Za-z0-9]/.test(val)) score++;
    const colors = ['#E24B4A', '#EF9F27', '#639922'];
    bars.forEach((b,i) => { b.style.background = i < score ? colors[score-1] : '#D6D9DD'; });
  }