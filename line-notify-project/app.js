const axios = require('axios');

const apiUrl = 'http://air4thai.pcd.go.th/forappV2/getAQI_JSON.php?stationID=76t';
const lineNotifyToken = 'xho7IehZg6awzMVZ1hqBLfwTP7s3T5eA2ayrZb1oLGU'; // ใส่ Token ของคุณที่ได้จาก LINE Notify

async function fetchData() {
  try {
    const response = await axios.get(apiUrl);

    // ส่วนของข้อมูล PM2.5
    const pm25Value = response.data.AQILast.PM25.value;

    // ส่งข้อมูล PM2.5 ไปแจ้งเตือนทาง LINE Notify
    await sendLineNotify(`ค่า PM2.5 ตอนนี้คือ: ${pm25Value}`);
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
