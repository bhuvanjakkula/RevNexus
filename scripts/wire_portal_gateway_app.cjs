const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '../js/app.js');
let content = fs.readFileSync(appPath, 'utf8');

// 1. In init(), call this.setupPortalGateway()
const initTarget = `    this.setupTerminalStream();`;
const initReplacement = `    this.setupTerminalStream();
    this.setupPortalGateway();`;

content = content.replace(initTarget, initReplacement);

// 2. Add setupPortalGateway method before the end of the RevNexusApp class
const portalMethods = `
  setupPortalGateway() {
    this.portalMode = 'signin';

    const gatewayLayer = document.getElementById('portal-gateway-layer');
    const btnSkip = document.getElementById('btn-portal-skip-to-dashboard');
    const btnHeaderToggle = document.getElementById('btn-header-portal-toggle');
    const tabSignIn = document.getElementById('tab-gateway-signin');
    const tabSignUp = document.getElementById('tab-gateway-signup');
    const groupName = document.getElementById('gateway-group-name');
    const inputName = document.getElementById('gateway-input-name');
    const inputEmail = document.getElementById('gateway-input-email');
    const inputPass = document.getElementById('gateway-input-password');
    const selectCountry = document.getElementById('gateway-select-country');
    const inputMobile = document.getElementById('gateway-input-mobile');
    const btnTogglePass = document.getElementById('btn-gateway-toggle-pass');
    const btnSubmit = document.getElementById('btn-gateway-submit');
    const btnMaster = document.getElementById('btn-gateway-master-clearance');
    const headingTitle = document.getElementById('gateway-heading-title');
    const headingSub = document.getElementById('gateway-heading-subtitle');
    const emailHint = document.getElementById('gateway-email-hint');
    const passHint = document.getElementById('gateway-pass-hint');

    // Initially hide gateway if already logged in as authorized executive
    if (this.currentUser && this.currentUser.email === 'bhuvanjakkula@gmail.com') {
      if (gatewayLayer) gatewayLayer.classList.add('hidden');
    }

    if (btnSkip && gatewayLayer) {
      btnSkip.addEventListener('click', () => {
        gatewayLayer.classList.add('hidden');
        this.showToast('🚀 Entered RevNexus AI Live Workspace');
      });
    }

    if (btnHeaderToggle && gatewayLayer) {
      btnHeaderToggle.addEventListener('click', () => {
        gatewayLayer.classList.remove('hidden');
      });
    }

    // Toggle Sign In vs Sign Up
    if (tabSignIn && tabSignUp) {
      tabSignIn.addEventListener('click', () => {
        this.portalMode = 'signin';
        tabSignIn.classList.add('active');
        tabSignUp.classList.remove('active');
        if (groupName) groupName.style.display = 'none';
        if (headingTitle) headingTitle.textContent = 'Sign In to RevNexus AI';
        if (headingSub) headingSub.textContent = 'Enter your executive credentials to access your autonomous revenue workspace';
        if (btnSubmit) btnSubmit.textContent = '🔒 Access Executive Console';
      });

      tabSignUp.addEventListener('click', () => {
        this.portalMode = 'signup';
        tabSignUp.classList.add('active');
        tabSignIn.classList.remove('active');
        if (groupName) groupName.style.display = 'block';
        if (headingTitle) headingTitle.textContent = 'Create Your RevNexus AI Account';
        if (headingSub) headingSub.textContent = 'All customer plans include an exclusive 3 Months 100% Free Trial';
        if (btnSubmit) btnSubmit.textContent = '🚀 Sign Up & Start 3 Months Free Trial';
      });
    }

    // Password visibility toggle
    if (btnTogglePass && inputPass) {
      btnTogglePass.addEventListener('click', () => {
        const isPass = inputPass.type === 'password';
        inputPass.type = isPass ? 'text' : 'password';
        btnTogglePass.textContent = isPass ? 'Hide' : 'Show';
      });
    }

    // Email input check
    if (inputEmail) {
      inputEmail.addEventListener('input', () => {
        const val = inputEmail.value.trim().toLowerCase();
        if (val === 'bhuvanjakkula@gmail.com') {
          if (emailHint) {
            emailHint.textContent = '✅ Authorized executive account confirmed.';
            emailHint.style.color = 'var(--accent-emerald)';
          }
          if (passHint) {
            passHint.textContent = '✅ Passkey bypassed for authorized master executive.';
            passHint.style.color = 'var(--accent-emerald)';
          }
        } else {
          if (emailHint) {
            emailHint.textContent = this.portalMode === 'signup' 
              ? 'New tenant registration (3 Months Free Trial included).'
              : 'Enterprise tenant email.';
            emailHint.style.color = 'var(--text-muted)';
          }
        }
      });
    }

    // Master clearance button
    if (btnMaster && gatewayLayer) {
      btnMaster.addEventListener('click', () => {
        this.loginAsVipOwner();
        gatewayLayer.classList.add('hidden');
        this.showToast('⚡ Instant Master Clearance granted for bhuvanjakkula@gmail.com', 'success');
      });
    }

    // Form submit
    if (btnSubmit && gatewayLayer) {
      btnSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        const email = (inputEmail?.value || '').trim().toLowerCase();
        const password = inputPass?.value || '';
        const mobile = (inputMobile?.value || '').trim();
        const country = selectCountry?.value || '+1';
        const name = (inputName?.value || '').trim() || 'Executive Lead';

        if (!email) {
          this.showToast('⚠️ Please enter a valid work or personal email ID.', 'warning');
          return;
        }

        if (!mobile) {
          this.showToast('⚠️ Please enter your mobile phone number for 2FA and SLA routing.', 'warning');
          return;
        }

        if (email === 'bhuvanjakkula@gmail.com') {
          this.loginAsVipOwner();
          gatewayLayer.classList.add('hidden');
          return;
        }

        if (this.portalMode === 'signup') {
          this.currentUser = {
            name: name,
            email: email,
            phone: country + ' ' + mobile,
            trialActive: true,
            trialMonths: 3,
            isLoggedIn: true
          };
          try {
            localStorage.setItem('revnexus_user', JSON.stringify(this.currentUser));
          } catch(err) {}

          this.renderAuthProfile();
          gatewayLayer.classList.add('hidden');
          this.showToast(\`🎉 Welcome \${name}! Your 3 Months Free Trial is active. Accessing console...\`, 'success');
          if (this.logStreamEvent) {
            this.logStreamEvent('INFO', 'ACCOUNT_SIGNUP', \`New customer registered: \${email} (\${country} \${mobile}) - 3 Months Free Trial\`);
          }
        } else {
          // Sign In mode with unauthorized email
          this.showToast('🚫 Access Denied: Unrecognized email. Please Sign Up or contact bjtmusic12@gmail.com for clearance.', 'warning');
          if (emailHint) {
            emailHint.textContent = '❌ Access Denied: For enterprise clearance, contact support: bjtmusic12@gmail.com';
            emailHint.style.color = 'var(--accent-rose)';
          }
        }
      });
    }

    // Update Header Sign Out to return to Gateway Layer
    const btnHeaderAuth = document.getElementById('btn-header-auth');
    if (btnHeaderAuth && gatewayLayer) {
      btnHeaderAuth.addEventListener('click', (e) => {
        e.stopPropagation();
        this.currentUser = null;
        try {
          localStorage.removeItem('revnexus_user');
        } catch(err) {}
        gatewayLayer.classList.remove('hidden');
        this.showToast('👋 Signed out of executive session. Returning to portal gateway.');
      });
    }
  }
`;

// Insert portalMethods right before the closing brace of the RevNexusApp class
content = content.replace(/renderTerminalLogs\(\)\s*\{[\s\S]*?\}\s*\}\s*$/, (match) => {
  return match.slice(0, -1) + portalMethods + '\n}\n';
});

fs.writeFileSync(appPath, content, 'utf8');
console.log('Successfully wired setupPortalGateway into js/app.js');
