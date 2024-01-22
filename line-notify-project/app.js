const axios = require('axios');

// URL ของ API ที่ต้องการดึงข้อมูล
const apiUrl = 'http://air4thai.pcd.go.th/forappV2/getAQI_JSON.php?stationID=76t';

// ทำ HTTP request เพื่อดึงข้อมูลจาก API
axios.get(apiUrl)
  .then(response => {
    // ดึงข้อมูลจาก response
    const data = response.data;
    console.log('ข้อมูลที่ดึงจาก API:', data);

    // ดึงค่า CO (คอนโซน) จากข้อมูล
    const coValue = data.AQILast.CO.value;
    console.log('ค่า CO (คอนโซน):', coValue);
  })
  .catch(error => {
    console.error('ไม่สามารถดึงข้อมูลจาก API ได้:', error);
  });
