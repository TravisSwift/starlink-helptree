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
    { name: "Change Service Plans",      key: "billing-change-plan",      type: "macro" },
    { name: "Update Service Address",    key: "billing-update-address",   type: "macro" },
    { name: "Transfer a Kit",            key: "billing-transfer-kit",     type: "macro" },
    { name: "Credit Referral",           key: "billing-credit-referral",  type: "macro" }
  ],

  promotions: [
    { name: "Credit Referral",           key: "promotions-credit-referral", type: "macro" },
    { name: "Authorized Retailers",      key: "promotions-authorized-retailers", type: "macro" }
  ],

  sales: [
    { name: "Add a User",                key: "sales-add-user",           type: "macro" },
    { name: "New Kit Activation",        key: "sales-new-kit-activation", type: "macro" },
    { name: "Links to Products",         key: "sales-product-links",      type: "macro" }
  ],

  shipping: [
    { name: "Kit Returns",               key: "shipping-kit-returns",     type: "macro" },
    { name: "How to Stow",               key: "shipping-how-to-stow",     type: "macro" },
    { name: "Return Label",              key: "shipping-return-label",    type: "macro" }
  ],

  troubleshooting: [
    { name: "Create Wi-Fi Name and Password", key: "troubleshooting-wifi-setup", type: "macro" },
    { name: "Factory Reset",                  key: "troubleshooting-factory-reset", type: "macro" },
    { name: "Split the Bands",                key: "troubleshooting-split-bands", type: "macro" },
    { name: "Standby Mode",                   key: "troubleshooting-standby-mode", type: "macro" },
    { name: "Advanced Speed Tests",           key: "troubleshooting-advanced-speed-tests", type: "macro" },
    { name: "Call Ping",                      key: "troubleshooting-call-ping", type: "macro" },
    { name: "After Hours",                    key: "troubleshooting-after-hours", type: "macro" }
  ]
};

const macros = {
  "billing-change-plan": "To change service plans:\n\n1. Log into your Starlink account\n2. Go to Manage Subscription\n3. Select the new plan and confirm the change",

  "billing-update-address": "To update service address:\n\n1. Log into your Starlink account\n2. Go to Service Address\n3. Update the address and submit for approval",

  "billing-transfer-kit": "To transfer a kit:\n\n1. Log into both accounts\n2. Go to Transfer Kit section\n3. Enter the kit ID and follow the instructions",

  "billing-credit-referral": "Credit Referral:\n\nRefer a friend through your account dashboard to receive service credit once they activate.",

  "promotions-credit-referral": "Credit Referral Program:\n\nLog into your account → Referrals section to generate your referral link.",

  "promotions-authorized-retailers": "Authorized Retailers:\n\nOnly purchase Starlink kits from the official Starlink website or authorized retailers to ensure full warranty coverage.",

  "sales-add-user": "To add a user:\n\n1. Log into your Starlink account\n2. Go to Users & Access\n3. Invite new user by email",

  "sales-new-kit-activation": "New Kit Activation:\n\n1. Plug in the new kit\n2. Download the Starlink app\n3. Follow the on-screen activation steps",

  "sales-product-links": "Product Links:\n\n• Standard Kit → https://www.starlink.com\n• Mini Kit → https://www.starlink.com/mini\n• High Performance Kit → Contact sales team",

  "shipping-kit-returns": "Kit Returns Process:\n\n1. Log into your account\n2. Go to Orders → Return Kit\n3. Follow the instructions to generate a return label",

  "shipping-how-to-stow": "How to Stow the Kit:\n\n1. Power down the system completely\n2. Carefully fold the dish\n3. Pack all components securely in the original packaging",

  "shipping-return-label": "To get a return label:\n\nLog into your Starlink account → My Orders → select the kit → Request Return → print the provided label",

  "troubleshooting-wifi-setup": "Create Wi-Fi Name and Password:\n\n1. Open the Starlink app\n2. Go to Settings → Wi-Fi\n3. Set your custom network name and strong password\n4. Apply changes",

  "troubleshooting-factory-reset": "Factory Reset:\n\nRouter: Hold the reset button for 10+ seconds until the lights flash.\nAfter reset, reconfigure using the Starlink app.",

  "troubleshooting-split-bands": "Split the Bands (2.4GHz / 5GHz):\n\nIn Starlink app: Settings → Wi-Fi → Advanced → Enable Separate Bands",

  "troubleshooting-standby-mode": "Standby Mode:\n\nIn Starlink app: Settings → Advanced → Standby Mode (toggle on/off)",

  "troubleshooting-advanced-speed-tests": "Advanced Speed Tests:\n\nUse the Starlink app → Run multiple speed tests at different times of day for best results.",

  "troubleshooting-call-ping": "Call Ping Test:\n\nIn Starlink app: Settings → Advanced → Run Ping Test to check latency and packet loss",

  "troubleshooting-after-hours": "After Hours Support:\n\nFor urgent issues outside business hours, use the in-app chat or submit a ticket."
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
    
    <textarea id="macro-text" spellcheck="false"
      style="width: 100%; height: 420px; background: #2d2d2d; color: #ddd; border: 1px solid #555; 
             border-radius: 8px; padding: 14px; font-family: system-ui; font-size: 15px; 
             line-height: 1.5; resize: vertical;">${originalText}</textarea>
    
    <button id="copy-btn" style="margin-top: 15px; padding: 14px 24px; background: #0b0; color: white; 
             border: none; border-radius: 6px; font-size: 16px; cursor: pointer; width: 100%;">
      Copy to Clipboard
    </button>
    
    <div style="margin-top: 12px; font-size: 13px; color: #aaa; text-align: center;">
      Text copied → Switch to your document and press <strong>Ctrl + V</strong>
    </div>
  `;

  const textarea = document.getElementById('macro-text');

  document.getElementById('back-from-preview').addEventListener('click', () => renderLevel(currentLevel));

  document.getElementById('copy-btn').addEventListener('click', () => {
    navigator.clipboard.writeText(textarea.value);
  });
}

function goBack() {
  if (history.length > 0) {
    currentLevel = history.pop();
    document.getElementById('title').textContent = currentLevel === 'main' ? 'Help Center' : currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1).replace(/-/g, ' ');
    renderLevel(currentLevel);
  }
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
  renderLevel('main');
});