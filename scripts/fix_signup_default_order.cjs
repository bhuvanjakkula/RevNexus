const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '../js/app.js');
let content = fs.readFileSync(appPath, 'utf8');

// Move tabSignUp.click() to the bottom of setupPortalGateway
content = content.replace(
  `    // Open First Web Page Layer on Sign Up by default\n    if (gatewayLayer) gatewayLayer.classList.remove('hidden');\n    if (tabSignUp) {\n      tabSignUp.click();\n    }`,
  `    // Open First Web Page Layer by default\n    if (gatewayLayer) gatewayLayer.classList.remove('hidden');`
);

const endTarget = `        this.showToast('👋 Signed out of executive session. Returning to portal gateway.');
      });
    }
  }`;

const endReplacement = `        this.showToast('👋 Signed out of executive session. Returning to portal gateway.');
      });
    }

    // Default to Sign Up tab active on first page load
    if (tabSignUp) {
      tabSignUp.click();
    }
  }`;

content = content.replace(endTarget, endReplacement);
fs.writeFileSync(appPath, content, 'utf8');
console.log('Successfully moved tabSignUp.click() to the end of setupPortalGateway');
