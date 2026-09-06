/* TSL.pk simple client-side data store (localStorage based) */

const DEFAULT_WHATSAPP_NUMBER = "923107331530";
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
  if (localStorage.getItem('tsl_wa_number') === '923000000000') {
    localStorage.removeItem('tsl_wa_number');
  }
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

  if (!localStorage.getItem('tsl_products_batch2_added')) {
    const batch2 = [{"id":"id_batch2_05k8x","title":"Speedometer Unit #1","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-1.jpeg"],"videos":[]},{"id":"id_batch2_1nruu","title":"Speedometer Unit #2","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-2.jpeg"],"videos":[]},{"id":"id_batch2_27446","title":"Speedometer Unit #3","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-3.jpeg"],"videos":[]},{"id":"id_batch2_3iupi","title":"Speedometer Unit #4","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-4.jpeg"],"videos":[]},{"id":"id_batch2_4zm6a","title":"Speedometer Unit #5","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-5.jpeg"],"videos":[]},{"id":"id_batch2_544nt","title":"Speedometer Unit #6","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":[],"videos":["assets/videos/products/product-video-1.mp4"]},{"id":"id_batch2_6azd2","title":"Speedometer Unit #7","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-6.jpeg"],"videos":[]},{"id":"id_batch2_7wnxw","title":"Speedometer Unit #8","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-7.jpeg"],"videos":[]},{"id":"id_batch2_8due2","title":"Speedometer Unit #9","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-8.jpeg"],"videos":[]},{"id":"id_batch2_9j3y7","title":"Speedometer Unit #10","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-9.jpeg"],"videos":[]},{"id":"id_batch2_aqole","title":"Speedometer Unit #11","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-10.jpeg"],"videos":[]},{"id":"id_batch2_blb9w","title":"Speedometer Unit #12","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-11.jpeg"],"videos":[]},{"id":"id_batch2_cj8h2","title":"Speedometer Unit #13","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-12.jpeg"],"videos":[]},{"id":"id_batch2_dmonc","title":"Speedometer Unit #14","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-13.jpeg"],"videos":[]},{"id":"id_batch2_ebwfg","title":"Speedometer Unit #15","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-14.jpeg"],"videos":[]},{"id":"id_batch2_fsk9o","title":"Speedometer Unit #16","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-15.jpeg"],"videos":[]},{"id":"id_batch2_gee0p","title":"Speedometer Unit #17","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-16.jpeg"],"videos":[]},{"id":"id_batch2_h8qqi","title":"Speedometer Unit #18","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-17.jpeg"],"videos":[]},{"id":"id_batch2_in759","title":"Speedometer Unit #19","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-18.jpeg"],"videos":[]},{"id":"id_batch2_jgdtm","title":"Speedometer Unit #20","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-19.jpeg"],"videos":[]},{"id":"id_batch2_koppp","title":"Speedometer Unit #21","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-20.jpeg"],"videos":[]},{"id":"id_batch2_ltq51","title":"Speedometer Unit #22","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-21.jpeg"],"videos":[]},{"id":"id_batch2_m0fdf","title":"Speedometer Unit #23","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-22.jpeg"],"videos":[]},{"id":"id_batch2_nyio5","title":"Speedometer Unit #24","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-23.jpeg"],"videos":[]},{"id":"id_batch2_oleri","title":"Speedometer Unit #25","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-24.jpeg"],"videos":[]},{"id":"id_batch2_p5ula","title":"Speedometer Unit #26","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-25.jpeg"],"videos":[]},{"id":"id_batch2_qw2zw","title":"Speedometer Unit #27","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-26.jpeg"],"videos":[]},{"id":"id_batch2_r5859","title":"Speedometer Unit #28","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-27.jpeg"],"videos":[]},{"id":"id_batch2_sf5dx","title":"Speedometer Unit #29","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-28.jpeg"],"videos":[]},{"id":"id_batch2_tjze5","title":"Speedometer Unit #30","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-29.jpeg"],"videos":[]},{"id":"id_batch2_u8vg7","title":"Speedometer Unit #31","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-30.jpeg"],"videos":[]},{"id":"id_batch2_vq58u","title":"Speedometer Unit #32","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-31.jpeg"],"videos":[]},{"id":"id_batch2_wk74b","title":"Speedometer Unit #33","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-32.jpeg"],"videos":[]},{"id":"id_batch2_x97go","title":"Speedometer Unit #34","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-33.jpeg"],"videos":[]},{"id":"id_batch2_ysdyf","title":"Speedometer Unit #35","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-34.jpeg"],"videos":[]},{"id":"id_batch2_z1b93","title":"Speedometer Unit #36","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-35.jpeg"],"videos":[]},{"id":"id_batch2_10ccu2","title":"Speedometer Unit #37","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-36.jpeg"],"videos":[]},{"id":"id_batch2_11ipdf","title":"Speedometer Unit #38","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-37.jpeg"],"videos":[]},{"id":"id_batch2_123qhp","title":"Speedometer Unit #39","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-38.jpeg"],"videos":[]},{"id":"id_batch2_13x14b","title":"Speedometer Unit #40","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-39.jpeg"],"videos":[]},{"id":"id_batch2_14rqff","title":"Speedometer Unit #41","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-40.jpeg"],"videos":[]},{"id":"id_batch2_15cwt3","title":"Speedometer Unit #42","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-41.jpeg"],"videos":[]},{"id":"id_batch2_163hy3","title":"Speedometer Unit #43","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-42.jpeg"],"videos":[]},{"id":"id_batch2_17aryd","title":"Speedometer Unit #44","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-43.jpeg"],"videos":[]},{"id":"id_batch2_18awiv","title":"Speedometer Unit #45","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-44.jpeg"],"videos":[]},{"id":"id_batch2_19w3uy","title":"Speedometer Unit #46","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-45.jpeg"],"videos":[]},{"id":"id_batch2_1a2ys9","title":"Speedometer Unit #47","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-46.jpeg"],"videos":[]},{"id":"id_batch2_1buy1a","title":"Speedometer Unit #48","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-47.jpeg"],"videos":[]},{"id":"id_batch2_1c76hc","title":"Speedometer Unit #49","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":[],"videos":["assets/videos/products/product-video-2.mp4"]},{"id":"id_batch2_1dxxuy","title":"Speedometer Unit #50","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-48.jpeg"],"videos":[]},{"id":"id_batch2_1e161m","title":"Speedometer Unit #51","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-49.jpeg"],"videos":[]},{"id":"id_batch2_1f016o","title":"Speedometer Unit #52","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-50.jpeg"],"videos":[]},{"id":"id_batch2_1g10s0","title":"Speedometer Unit #53","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-51.jpeg"],"videos":[]},{"id":"id_batch2_1humt5","title":"Speedometer Unit #54","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-52.jpeg"],"videos":[]},{"id":"id_batch2_1irgbd","title":"Speedometer Unit #55","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-53.jpeg"],"videos":[]},{"id":"id_batch2_1jz0r0","title":"Speedometer Unit #56","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-54.jpeg"],"videos":[]},{"id":"id_batch2_1kwmqn","title":"Speedometer Unit #57","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-55.jpeg"],"videos":[]},{"id":"id_batch2_1l35z8","title":"Speedometer Unit #58","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":[],"videos":["assets/videos/products/product-video-3.mp4"]},{"id":"id_batch2_1mlomv","title":"Speedometer Unit #59","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":[],"videos":["assets/videos/products/product-video-4.mp4"]},{"id":"id_batch2_1nyo9h","title":"Speedometer Unit #60","category":"Speedometer","price":5000,"description":"Genuine repaired/tested speedometer unit. Contact us on WhatsApp for exact model and full details.","images":["assets/img/products/product-56.jpeg"],"videos":[]}];
    const existingProducts = JSON.parse(localStorage.getItem(STORE_KEYS.products) || '[]');
    localStorage.setItem(STORE_KEYS.products, JSON.stringify(existingProducts.concat(batch2)));
    localStorage.setItem('tsl_products_batch2_added', '1');
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
