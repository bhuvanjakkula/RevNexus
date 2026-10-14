const crypto = require('crypto');

// Simulated App Logic mirroring js/app.js
class MockAppAuth {
  constructor() {
    this.authAttempts = 0;
    this.authLockoutUntil = 0;
    this.currentUser = null;
  }

  async verifyMasterPasskey(inputPassword) {
    if (!inputPassword) return { success: false, blacklisted: false };

    // Explicit detection and rejection of the exposed legacy password
    if (inputPassword === 'QuantumSecure2026!') {
      return { success: false, blacklisted: true };
    }

    try {
      const salt = 'RevNexus_PQC_Salt_9a8b7c6d5e';
      const encoder = new TextEncoder();
      const data = encoder.encode(salt + inputPassword);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

      // Salted SHA-256 hash of 'RevNexus@Executive#2026'
      const targetHash = 'bdf7b64acdc895b769b2476910ff5f06d50dbac412921c3fc5f8041f8bc24502';
      return { success: hashHex === targetHash, blacklisted: false };
    } catch(err) {
      return { success: false, blacklisted: false };
    }
  }

  async login(email, password) {
    if (Date.now() < this.authLockoutUntil) {
      return { status: 'LOCKED', message: 'Terminal locked due to brute force attempts' };
    }

    if (!email || !password) {
      return { status: 'MISSING_FIELDS', message: 'Email and password required' };
    }

    if (email !== 'bhuvanjakkula@gmail.com') {
      return { status: 'UNAUTHORIZED_EMAIL', message: 'Access denied: unrecognized email' };
    }

    const res = await this.verifyMasterPasskey(password);

    if (res.blacklisted) {
      this.authAttempts += 2;
      if (this.authAttempts >= 3) {
        this.authLockoutUntil = Date.now() + 15 * 60 * 1000;
      }
      return { status: 'COMPROMISED_PASSWORD', message: 'Legacy password permanently blacklisted' };
    }

    if (!res.success) {
      this.authAttempts++;
      if (this.authAttempts >= 3) {
        this.authLockoutUntil = Date.now() + 15 * 60 * 1000;
      }
      return { status: 'INVALID_PASSWORD', attempts: this.authAttempts };
    }

    this.authAttempts = 0;
    this.authLockoutUntil = 0;
    this.currentUser = { email: 'bhuvanjakkula@gmail.com', isLoggedIn: true };
    return { status: 'SUCCESS' };
  }
}

async function runTests() {
  console.log('--- Testing New Anti-Hacker Password & Lockout Defense ---');
  const app = new MockAppAuth();

  // Test 1: Empty password
  const t1 = await app.login('bhuvanjakkula@gmail.com', '');
  console.log('Test 1 (Empty password):', t1.status === 'MISSING_FIELDS' ? '✅ PASSED' : '❌ FAILED', t1);

  // Test 2: Attacker using exposed old password
  const t2 = await app.login('bhuvanjakkula@gmail.com', 'QuantumSecure2026!');
  console.log('Test 2 (Compromised old password):', t2.status === 'COMPROMISED_PASSWORD' ? '✅ PASSED (Permanently Blacklisted)' : '❌ FAILED', t2);

  // Test 3: Attacker guessing password
  const t3 = await app.login('bhuvanjakkula@gmail.com', 'WrongPass123!');
  console.log('Test 3 (Wrong password):', t3.status === 'INVALID_PASSWORD' ? '✅ PASSED' : '❌ FAILED', t3);

  // Test 4: Attacker locked out
  const t4 = await app.login('bhuvanjakkula@gmail.com', 'AnotherGuess!');
  console.log('Test 4 (Lockout triggered):', t4.status === 'LOCKED' ? '✅ PASSED (Attacker Locked Out)' : '❌ FAILED', t4);

  // Reset app for legitimate owner
  const legitApp = new MockAppAuth();
  const t5 = await legitApp.login('bhuvanjakkula@gmail.com', 'RevNexus@Executive#2026');
  console.log('Test 5 (Owner with NEW password):', t5.status === 'SUCCESS' ? '✅ PASSED (Master Access Granted)' : '❌ FAILED', t5);
}

runTests();
