let currentLevel = 'main';
let history = [];

const tree = {
  main: [
    { name: "Billing",        key: "billing",        type: "category" },
    { name: "Promotions",     key: "promotions",     type: "category" },
    { name: "Sales",          key: "sales",          type: "category" },
    { name: "Shipping",       key: "shipping",       type: "category" },
    { name: "Troubleshooting",key: "troubleshooting", type: "category" }
  ],

  billing: [
    { name: "Payments",                  key: "billing-payments",         type: "macro" },
    { name: "Suspension",                key: "billing-suspension",       type: "macro" },
    { name: "Failed Payments",           key: "billing-failed-payments",  type: "macro" },
    { name: "Failed to update payment",  key: "billing-failed-update",    type: "macro" }
  ],

  troubleshooting: [
    { name: "PreCheck and Troubleshooting Template", key: "troubleshooting-precheck", type: "macro" },
    { name: "Factory Resets",                        key: "troubleshooting-factory-reset", type: "macro" },
    { name: "Reboot Gen 2 Kit",                      key: "troubleshooting-reboot-gen2", type: "macro" }
  ],

  promotions: [
    { name: "Current Promotions", key: "promotions-current", type: "macro" }
  ],

  sales: [
    { name: "New Customer Inquiries", key: "sales-new", type: "macro" }
  ],

  shipping: [
    { name: "Shipping Status", key: "shipping-status", type: "macro" },
    { name: "Delayed Package", key: "shipping-delayed", type: "macro" }
  ]
};

const macros = {
  "billing-payments": "To check or manage payments:\n\n1. Log into your Starlink account at starlink.com\n2. Go to the Billing section\n3. View payment history and upcoming charges",

  "billing-suspension": "Account suspension info:\n\nCommon causes: failed payments.\nTo resolve:\n1. Log in and clear any overdue balance\n2. Update payment method\n3. Wait up to 24 hours for reactivation",

  "billing-failed-payments": "Failed payment troubleshooting:\n\n1. Confirm card has funds and is not expired\n2. Try a different payment method\n3. Contact your bank if needed",

  "billing-failed-update": "Unable to update payment method:\n\n1. Try incognito window\n2. Clear browser cache & cookies\n3. Use a different browser",

  "troubleshooting-precheck": "Pre-check & Troubleshooting Template:\n\n1. Power cycle router and dish\n2. Check router light status\n3. Confirm no obstructions\n4. Run speed test in app\n5. Note any error codes",

  "troubleshooting-factory-reset": "Factory Reset Instructions:\n\nRouter: Hold reset button 10+ seconds until lights flash.\nDish: Usually via app under Advanced → Factory Reset.\n\nRe-setup required after reset.",

  "troubleshooting-reboot-gen2": "Reboot Gen 2 Kit Instructions:\n\n1. Unplug the kit from the power source.\n2. Wait 10 seconds.\n3. Plug it back in.\n\nRepeat this process **six times in a row**.\n\nAfter the sixth reboot, wait for the router light to turn solid white before testing the connection again.",

  "promotions-current": "Current promotions and offers can be found in your Starlink account dashboard.",

  "sales-new": "For new customer sales inquiries, direct them to https://www.starlink.com",

  "shipping-status": "To check shipping status:\n1. Log into your Starlink account\n2. Go to Orders / Shipping section\n3. Use the tracking number provided",

  "shipping-delayed": "For delayed shipping:\n1. Check tracking in your account\n2. Allow extra time during high-demand periods\n3. Contact support if no update"
};

function renderLevel(levelKey) {
  const content = document.getElementById('content');
  content.innerHTML = '';

  const items = tree[levelKey] || [];

  items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'category';
    div.textContent = item.name;

    div.addEventListener('click', () => {
      if (item.type === "macro") {
        showMacroPreview(item.name, macros[item.key]);
      } else {
        history.push(currentLevel);
        currentLevel = item.key;
        document.getElementById('title').textContent = item.name;
        renderLevel(currentLevel);
      }
    });

    content.appendChild(div);
  });

  if (currentLevel !== 'main') {
    const back = document.createElement('div');
    back.className = 'back';
    back.innerHTML = '← Back';
    back.addEventListener('click', goBack);
    content.prepend(back);
  }
}

function showMacroPreview(title, originalText) {
  const content = document.getElementById('content');
  
  content.innerHTML = `
    <div id="back-from-preview" style="margin-bottom: 15px; color: #0af; cursor: pointer;">← Back to list</div>
    <h2 style="margin: 10px 0 15px 0; color: #fff;">${title}</h2>
    
    <textarea id="macro-text" style="width: 100%; height: 380px; background: #2d2d2d; color: #ddd; border: 1px solid #555; border-radius: 8px; padding: 14px; font-family: system-ui; font-size: 15px; line-height: 1.5; resize: vertical;">${originalText}</textarea>
    
    <button id="copy-btn" style="margin-top: 15px; padding: 14px 24px; background: #0b0; color: white; border: none; border-radius: 6px; font-size: 16px; cursor: pointer; width: 100%;">
      Copy Edited Text to Clipboard
    </button>
  `;

  // Back button
  document.getElementById('back-from-preview').addEventListener('click', () => {
    renderLevel(currentLevel);
  });

  // Copy button - copies whatever is in the textarea (edited or not)
  document.getElementById('copy-btn').addEventListener('click', () => {
    const editedText = document.getElementById('macro-text').value;
    
    navigator.clipboard.writeText(editedText).then(() => {
      showToast("✅ Copied to clipboard!");
      // Auto return to list after copy (optional - remove setTimeout if you want to stay)
      setTimeout(() => {
        renderLevel(currentLevel);
      }, 1000);
    }).catch(() => {
      alert("Failed to copy to clipboard");
    });
  });
}

function goBack() {
  if (history.length > 0) {
    currentLevel = history.pop();
    document.getElementById('title').textContent = currentLevel === 'main' ? 'Help Center' : currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1).replace(/-/g, ' ');
    renderLevel(currentLevel);
  }
}

function showToast(message = "✅ Copied to clipboard!") {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.style.cssText = `
      position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%);
      background: #0b0; color: white; padding: 12px 24px; border-radius: 8px;
      font-size: 14px; box-shadow: 0 4px 12px rgba(0,0,0,0.5); z-index: 1000;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.style.display = 'block';
  setTimeout(() => { toast.style.display = 'none'; }, 2200);
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
  renderLevel('main');
});