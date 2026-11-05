const brandSel = document.getElementById('brand-sel');
const modelSel = document.getElementById('model-sel');

brandSel.addEventListener('change', e => {
    data.brand = e.target.value;
    data.model = '';
    modelSel.innerHTML = '<option value="" disabled selected>-- Select Model --</option>';
    if (catalog[data.brand]) {
        catalog[data.brand].forEach(m => {
            let opt = document.createElement('option');
            opt.value = m; opt.textContent = m;
            modelSel.appendChild(opt);
        });
    }
});

modelSel.addEventListener('change', e => {
    data.model = e.target.value;
    data.base = prices[data.model] || 300;
});

function selectOpt(el, type, val, bonus) {
    Array.from(el.parentNode.children).forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    if (type === 'storage') { data.storage = val; data.bonus = bonus; }
    if (type === 'years') { data.ageYears = val; data.ageAdjustment = bonus; }
    if (type === 'screen') data.screen = val;
    if (type === 'body') data.body = val;
}

function resetAll() {
    step = 1;
    data = { brand: '', model: '', storage: '', bonus: 0, ageYears: '', ageAdjustment: 0, screen: -1, body: -1, base: 0 };
    brandSel.selectedIndex = 0;
    modelSel.innerHTML = '<option value="" disabled selected>-- Select brand first --</option>';
    document.querySelectorAll('.option-box').forEach(b => b.classList.remove('selected'));
    document.getElementById('nav-footer').classList.remove('hidden');
    updateView();
}
