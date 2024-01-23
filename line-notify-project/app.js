const axios = require('axios');

const apiUrl = 'http://air4thai.pcd.go.th/forappV2/getAQI_JSON.php?stationID=76t';
const lineNotifyToken = 'JFWWsvWuz0LHjfGhaMl93ikXj1XlgD9wnAqheq9YuQn'; // ใส่ Token ของคุณที่ได้จาก LINE Notify

async function fetchData() {
  try {
    const response = await axios.get(apiUrl);
    // ส่วนของข้อมูล PM2.5
    const pm25Value = response.data.AQILast.PM25.value;
    // Get the current date in the format "ว/ด/ป"
    const currentDateTime = new Date().toLocaleDateString('th-TH', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }) + ' เวลา ' + new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }) + ' น.';
    const coloredCircle = '🟠'; // Adjust the color and emoji as needed
    //await sendLineNotify(`ค่า PM2.5 ตอนนี้คือ: ${pm25Value}`);
    if (pm25Value >= 37) {

    let color;
    if (pm25Value >= 37 && pm25Value <= 75) {
      color = 'เริ่มมีผลกระทบต่อสุขภาพ (สีส้ม)';
    } else if (pm25Value > 75) {
      color = 'มีผลกระทบต่อสุขภาพ (สีแดง)';
    } else {
      color = 'ไม่ได้ระบุสี';
    }
    let sticker;
    if (pm25Value >= 37 && pm25Value <= 75) {
      sticker = '🟠🟠🟠🟠🟠🟠🟠🟠🟠🟠';
    } else if (pm25Value > 75) {
      sticker = '🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴';
    } else {
      sticker = 'ไม่ได้ระบุสี';
    }

    await sendLineNotify(` ${pm25Value} ug/m³
${color}

${sticker}

ขอความร่วมมือหน่วยงานที่เกี่ยวข้องเริ่มคัดกรองผู้ป่วยโรคจากฝุ่น PM2.5 
🖥
CC = เป็นผู้สัมผัสมลพิษทางอากาศ
📥
คลิ๊ก Consult คลินิกมลพิษ ห้อง 191 
🩻
ICD10 = Z581

อัพเดทวันที่ : ${currentDateTime} 
คุณภาพอากาศจาก Air4thai (กรมควบคุมมลพิษ)
ต.แม่ปะ อ.แม่สอด จ.ตาก`);
} else {
  console.log('pm25Value ไม่ถึง 37, ไม่ต้องส่ง LINE Notify');
}
} catch (error) {
console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error.message);
}
}

// ฟังก์ชันสำหรับส่งข้อความไปทาง LINE Notify
async function sendLineNotify(message) {
  try {
    const lineNotifyApiUrl = 'https://notify-api.line.me/api/notify';
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${lineNotifyToken}`
    };

    // ส่งข้อความไปทาง LINE Notify
    await axios.post(lineNotifyApiUrl, `message=${message}`, { headers });
    console.log('ส่งข้อความไปทาง LINE Notify สำเร็จ');
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการส่ง LINE Notify:', error.message);
  }
}

// เรียกใช้ฟังก์ชัน fetchData
fetchData();
