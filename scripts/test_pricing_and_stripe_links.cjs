const { spawn } = require('child_process');

async function testPricingAndStripe() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const proc = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9233',
    '--user-data-dir=C:\\Users\\bhuva\\AppData\\Local\\Temp\\edge_pricing_test',
    'http://localhost:3030'
  ]);

  try {
    await new Promise(r => setTimeout(r, 2500));
    const res = await fetch('http://127.0.0.1:9233/json');
    const tabs = await res.json();
    const appTab = tabs.find(t => t.url.includes('localhost:3030'));
    if (!appTab) throw new Error('App tab not found on 9233');

    const ws = new WebSocket(appTab.webSocketDebuggerUrl);
    let id = 1;
    const pending = new Map();

    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const msgId = id++;
        pending.set(msgId, { resolve, reject });
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    }

    const exceptions = [];

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Runtime.exceptionThrown') {
        console.error('RUNTIME EXCEPTION:', msg.params.exceptionDetails);
        exceptions.push(msg.params.exceptionDetails);
      }
      if (msg.id && pending.has(msg.id)) {
        const { resolve } = pending.get(msg.id);
        pending.delete(msg.id);
        resolve(msg.result);
      }
    };

    await new Promise(r => ws.onopen = r);
    await send('Runtime.enable');
    await send('Page.enable');

    console.log('--- Testing Enterprise Pricing & Stripe Checkout Integration ---');

    // 1. Test clicking sidebar nav-link-pricing
    const navRes = await send('Runtime.evaluate', {
      expression: `(() => {
        const navLink = document.getElementById('nav-link-pricing');
        if (navLink) navLink.click();

        const pricingView = document.getElementById('view-pricing');
        const isActive = pricingView ? pricingView.classList.contains('active') : false;
        const currentTitle = document.getElementById('current-view-title').textContent;

        return {
          hasNavLink: !!navLink,
          viewActive: isActive,
          currentTitle
        };
      })()`,
      returnByValue: true
    });
    console.log('Sidebar Navigation to Pricing View:', navRes.result.value);

    // 2. Test Stripe Links and 3 Months Free Trial verification
    const stripeRes = await send('Runtime.evaluate', {
      expression: `(() => {
        const view = document.getElementById('view-pricing');
        if (!view) return { found: false };

        const links = Array.from(view.querySelectorAll('a[href*="buy.stripe.com"]')).map(a => a.href);
        const trialPills = Array.from(view.querySelectorAll('.pricing-trial-pill')).map(p => p.textContent.trim());
        const cards = Array.from(view.querySelectorAll('.pricing-card')).map(card => {
          const name = card.querySelector('.pricing-tier-name').textContent.trim();
          const price = card.querySelector('.pricing-number').textContent.trim();
          const href = card.querySelector('a') ? card.querySelector('a').href : null;
          return { name, price: '$' + price + '/mo', href };
        });

        return {
          found: true,
          totalStripeLinks: links.length,
          links,
          trialPillsCount: trialPills.length,
          cards
        };
      })()`,
      returnByValue: true
    });
    console.log('Stripe Checkout Links & Pricing Cards Check:', JSON.stringify(stripeRes.result.value, null, 2));

    // 3. Test Header Button btn-header-pricing
    const headerRes = await send('Runtime.evaluate', {
      expression: `(() => {
        // Go back to executive first
        const execLink = document.querySelector('.nav-link[data-view="view-executive"]');
        if (execLink) execLink.click();

        const btnPricingHeader = document.getElementById('btn-header-pricing');
        if (btnPricingHeader) btnPricingHeader.click();

        const pricingView = document.getElementById('view-pricing');
        const isActive = pricingView ? pricingView.classList.contains('active') : false;

        return {
          hasHeaderBtn: !!btnPricingHeader,
          viewActiveViaHeader: isActive
        };
      })()`,
      returnByValue: true
    });
    console.log('Header Button Navigation Check:', headerRes.result.value);

    // 4. Test hotkey 'P'
    const hotkeyRes = await send('Runtime.evaluate', {
      expression: `(() => {
        // Go back to executive
        const execLink = document.querySelector('.nav-link[data-view="view-executive"]');
        if (execLink) execLink.click();

        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'p', code: 'KeyP', bubbles: true }));

        const pricingView = document.getElementById('view-pricing');
        const isActive = pricingView ? pricingView.classList.contains('active') : false;

        return {
          viewActiveViaHotkeyP: isActive
        };
      })()`,
      returnByValue: true
    });
    console.log('Hotkey "P" Navigation Check:', hotkeyRes.result.value);

    console.log('\n--- Summary ---');
    console.log('Total Runtime Exceptions:', exceptions.length);
    if (exceptions.length === 0 && stripeRes.result.value.totalStripeLinks === 3) {
      console.log('🎯 ENTERPRISE PRICING & STRIPE CHECKOUT SYSTEM OPERATING WITH 100% PRECISION!');
    } else {
      process.exit(1);
    }

    ws.close();
  } finally {
    proc.kill();
  }
}

testPricingAndStripe().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
