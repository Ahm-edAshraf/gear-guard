const fs = require('fs');
const urls = [
  { url: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Canon_EOS_R6_14.jpg', name: 'camera.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Epson_EB-U04-5358.jpg', name: 'projector.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Sony_A_7_iii_full_frame_mirrorless_camera.jpg', name: 'camera2.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/3/30/%28Photography_equipment_Tripod_Photo_Camera_Tripod_photograph_in_a_studio%29.jpg', name: 'tripod.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Rode_Wireless_Go_II_microphones.jpg', name: 'mic.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/HDMI_CableEnd_02.jpg', name: 'hdmi.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Extension_cord.JPG', name: 'cord.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Logitech_Presenter.png', name: 'clicker.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/JBL_PartyBox_On-The-Go.jpg', name: 'speaker.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/DELL_XPS_13_and_15_%2837041682184%29.jpg', name: 'laptop.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Anker_PowerExpand_8-in-1-2186.jpg', name: 'hub.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Ring_Light_25280737679.jpg', name: 'ringlight.jpg' }
];

async function download() {
  for (const item of urls) {
    try {
      console.log('Downloading ' + item.name);
      const res = await fetch(item.url, {
        headers: { 'User-Agent': 'GearGuardCampus/1.0 (test@example.com)' }
      });
      if (res.ok) {
        const buffer = await res.arrayBuffer();
        fs.writeFileSync('public/' + item.name, Buffer.from(buffer));
        console.log('Saved ' + item.name + ' (' + buffer.byteLength + ' bytes)');
      } else {
        console.error('Failed ' + item.name + ' - ' + res.status + ' ' + res.statusText);
      }
    } catch (e) {
      console.error(e);
    }
  }
}
download();
