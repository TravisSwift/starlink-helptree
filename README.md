# Starlink Help Tree - Agent Support Extension

**A smart, centralized knowledge tool for Starlink Support Agents**

### Overview

**Starlink Help Tree** is a browser extension designed to dramatically improve agent efficiency and response consistency. 

Instead of agents wasting time searching through scattered documents, One Note, or using Hot Keys, they now have instant access to approved, high-quality responses without leaving their browser — with one click
### Key Benefits

- **Significant Time Savings**  
  Agents no longer need to hunt for correct replies. Pre-approved macros are available instantly, directly increasing **responses per hour** — a core productivity metric.

- **Unified & Consistent Messaging**  
  All agents use the exact same wording and quality standards. Updates are managed centrally (by updating the extension), ensuring every customer receives consistent, accurate responses.

- **Editable & Flexible**  
  Agents can customize responses in the moment (for specific customer situations) before copying or pasting, the ability to personalize each reply is enhanced.

- **Fast Workflow**  
  One-click copy to clipboard + clear instructions for quick pasting into any system (Zendesk, Google Docs, email, chat, etc.).


### Features

- Clean, intuitive side panel interface
- Hierarchical category structure (Billing → Change Service Plans, Troubleshooting → Factory Reset, etc.)
- Fully editable response previews
- One-click "Copy to Clipboard"
- Professional, dark-themed design optimized for long support shifts
- Centrally maintained macros (easy to update for the whole team)

### How to Install (for Agents)

1. Download the latest version of the extension folder.
2. Open Chrome and go to `chrome://extensions/`
3. Enable **Developer mode** (top right)
4. Click **"Load unpacked"** and select the `starlink-helptree` folder.
5. Pin the extension icon for quick access.

The side panel will open when you click the Starlink Help Tree icon.

### How to Use

1. Click the Starlink Help Tree icon in the toolbar.
2. Navigate to the relevant category (e.g., **Troubleshooting** → **Factory Reset**).
3. Review / edit the response in the preview window.
4. Click **"Copy to Clipboard"**.
5. Switch to your ticket/chat/document and press **Ctrl + V**.

### For Team Leads / Admins

- All macros are stored in `sidebar.js` under the `macros` object.
- To update responses across the entire team, simply update the text in `macros`, repackage the extension, and redistribute.
- Future versions can include auto-update functionality or a central admin dashboard.

### Future Enhancements (Roadmap)

- Auto-update mechanism for macros
- Search functionality across all responses
- On-click paste instead of copy-paste
- Integration with Support Agent 
- Usage analytics (most-used macros, time saved, etc.)
- Dark/Light mode toggle

---

**Built to help Starlink Support Agents deliver faster, more consistent, and higher-quality customer service.**

*Version 1.0 — Initial Release*
