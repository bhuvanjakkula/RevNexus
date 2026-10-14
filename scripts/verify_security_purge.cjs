const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

const checks = [
  { name: 'Gateway Email value is blank', pass: html.includes('id="gateway-input-email" class="form-input" placeholder="name@company.com" value=""') },
  { name: 'Gateway Password value is blank', pass: html.includes('id="gateway-input-password" class="form-input" placeholder="••••••••••••" value=""') },
  { name: 'Gateway Mobile value is blank', pass: html.includes('id="gateway-input-mobile" class="form-input" placeholder="Phone number" value=""') },
  { name: 'btn-gateway-master-clearance is removed', pass: !html.includes('btn-gateway-master-clearance') },
  { name: 'btn-quick-vip-owner is removed', pass: !html.includes('btn-quick-vip-owner') },
  { name: 'Auth Modal Email value is blank', pass: html.includes('id="auth-input-email" class="form-input" placeholder="name@company.com" value=""') },
  { name: 'No QuantumSecure2026! in index.html', pass: !html.includes('QuantumSecure2026!') },
  { name: 'No pre-filled bhuvanjakkula in index.html', pass: !html.includes('value="bhuvanjakkula@gmail.com"') }
];

let allPassed = true;
console.log('--- Security Audit Results ---');
checks.forEach(c => {
  console.log(`${c.pass ? '✅' : '❌'} ${c.name}`);
  if (!c.pass) allPassed = false;
});

if (!allPassed) {
  process.exit(1);
} else {
  console.log('\n🔒 ALL SECURITY AUDIT CRITERIA PASSED 100%!');
}
