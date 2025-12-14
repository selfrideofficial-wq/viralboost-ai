function showTab(tab) {
  document.querySelectorAll('.tab').forEach(t => t.classList.add('hidden'));
  document.getElementById(tab).classList.remove('hidden');
}

function generate() {
  document.getElementById('result').classList.remove('hidden');
}
