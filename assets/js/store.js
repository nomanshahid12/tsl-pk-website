/* TSL.pk simple client-side data store (localStorage based) */

const DEFAULT_WHATSAPP_NUMBER = "923000000000"; // TODO: replace with real WhatsApp number (country code + number, no +)
const DEFAULT_BANK_ACCOUNT = {
  bank: "Meezan Bank",
  title: "TSL Speedometers",
  account: "PK00 MEZN 0000 0000 0000 0000"
};
const DEFAULT_PHONE = "+92 310 7331530";
const DEFAULT_ADDRESS = "Tyre Market, Sultan Ka Kot, Opposite Bank Al Habib, Chah Sultan, Rawalpindi - 46000, Pakistan";

function getWhatsappNumber(){
  return localStorage.getItem('tsl_wa_number') || DEFAULT_WHATSAPP_NUMBER;
}
function getBankAccount(){
  return JSON.parse(localStorage.getItem('tsl_bank') || JSON.stringify(DEFAULT_BANK_ACCOUNT));
}
function getPhone(){
  return localStorage.getItem('tsl_phone') || DEFAULT_PHONE;
}
function getAddress(){
  return localStorage.getItem('tsl_address') || DEFAULT_ADDRESS;
}
// Backward-compatible live accessors
Object.defineProperty(window, 'WHATSAPP_NUMBER', { get: getWhatsappNumber });
Object.defineProperty(window, 'BANK_ACCOUNT', { get: getBankAccount });

const STORE_KEYS = {
  products: "tsl_products",
  gallery: "tsl_gallery",
  social: "tsl_social",
  admin: "tsl_admin_pass"
};

function seedIfEmpty() {
  if (!localStorage.getItem(STORE_KEYS.products)) {
    const demoProducts = [
      {
        id: cryptoId(),
        title: "Toyota Corolla Digital Speedometer",
        category: "Speedometer",
        price: 15000,
        description: "Fully tested and calibrated digital meter for Toyota Corolla 2015-2020. Includes odometer correction and warning light reset.",
        images: ["https://images.unsplash.com/photo-1498887960847-2a5e46312788?w=800&auto=format&fit=crop"],
        videos: []
      },
      {
        id: cryptoId(),
        title: "Honda Civic Speedometer (Analog)",
        category: "Speedometer",
        price: 8500,
        description: "Genuine analog meter unit for Honda Civic, repaired and needle-calibrated with 1 year warranty.",
        images: ["https://images.unsplash.com/photo-1614567320876-3bc44e900247?w=800&auto=format&fit=crop"],
        videos: []
      },
      {
        id: cryptoId(),
        title: "Suzuki Mehran Speedometer",
        category: "Speedometer",
        price: 6000,
        description: "Genuine meter for Suzuki Mehran with fitting support. Programming included.",
        images: ["https://images.unsplash.com/photo-1541968047768-c92c393e0e79?w=800&auto=format&fit=crop"],
        videos: []
      }
    ];
    localStorage.setItem(STORE_KEYS.products, JSON.stringify(demoProducts));
  }
  const existingGallery = JSON.parse(localStorage.getItem(STORE_KEYS.gallery) || "[]");
  if (existingGallery.length === 0) {
    const demoGallery = [
      { id: cryptoId(), title: "Speedometer Repair Work 1", type: "video", url: "assets/videos/work-1.mp4" },
      { id: cryptoId(), title: "Speedometer Repair Work 2", type: "video", url: "assets/videos/work-2.mp4" },
      { id: cryptoId(), title: "Speedometer Repair Work 3", type: "video", url: "assets/videos/work-3.mp4" },
      { id: cryptoId(), title: "Speedometer Repair Work 4", type: "video", url: "assets/videos/work-4.mp4" },
      { id: cryptoId(), title: "Speedometer Repair Work 5", type: "video", url: "assets/videos/work-5.mp4" }
    ];
    localStorage.setItem(STORE_KEYS.gallery, JSON.stringify(demoGallery));
  }
  const existingSocial = JSON.parse(localStorage.getItem(STORE_KEYS.social) || "{}");
  if (!existingSocial.instagram) {
    existingSocial.facebook = existingSocial.facebook || "";
    existingSocial.instagram = "https://www.instagram.com/tazian_speedometer_lab.pk";
    existingSocial.youtube = existingSocial.youtube || "";
    existingSocial.tiktok = existingSocial.tiktok || "";
    localStorage.setItem(STORE_KEYS.social, JSON.stringify(existingSocial));
  }
  if (!localStorage.getItem(STORE_KEYS.admin)) {
    localStorage.setItem(STORE_KEYS.admin, "tsl@admin123");
  }
}

function cryptoId() {
  return "id_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function normalizeProduct(p) {
  if (!p.images) {
    p.images = p.image ? [p.image] : [];
  }
  if (!p.videos) {
    p.videos = p.video ? [p.video] : [];
  }
  return p;
}
function getProducts() {
  return JSON.parse(localStorage.getItem(STORE_KEYS.products) || "[]").map(normalizeProduct);
}
function saveProducts(list) {
  localStorage.setItem(STORE_KEYS.products, JSON.stringify(list));
}
function getGallery() {
  return JSON.parse(localStorage.getItem(STORE_KEYS.gallery) || "[]");
}
function saveGallery(list) {
  localStorage.setItem(STORE_KEYS.gallery, JSON.stringify(list));
}
function getSocial() {
  return JSON.parse(localStorage.getItem(STORE_KEYS.social) || "{}");
}
function saveSocial(obj) {
  localStorage.setItem(STORE_KEYS.social, JSON.stringify(obj));
}

function waLink(message) {
  return `https://wa.me/${getWhatsappNumber()}?text=${encodeURIComponent(message)}`;
}

function fmtPrice(n) {
  return "Rs. " + Number(n).toLocaleString("en-PK");
}

seedIfEmpty();
