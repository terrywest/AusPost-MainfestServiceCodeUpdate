const axios = require('axios');
const fs = require('fs');
const manifest = require('./manifest.json');

// console.log(manifest.shipments)

// Set the script details here
const key = "43ed8822-6de0-41ab-9d43-0656550c95b3";
const pass = "A3294112";
const accNum = "0005417456";
const oldCode = "3D35";
const newCode = "3D85";
const shipID = "y2IK0EbemHMAAAFz5RIdruF1";

runRfunction();

async function runRfunction() {

  // Encode credetials to Base64
  const apicreds = Buffer.from(`${key}:${pass}`).toString('base64');

  // Query AP API to get shipment details
  const getURL = `https://digitalapi.auspost.com.au/shipping/v1/shipments?shipment_ids=${shipID}`;
  const orginalShip = await makeAPIRequest(getURL, "get", apicreds, accNum);
  // console.log(orginalShip)

  // Modify shipment details 
  let newShipment = {...orginalShip};
  let count = 0; 
  let update = false; // flag for pushing changes to AP
  orginalShip.shipments[0].items.map(item => {
    console.log(`Orginal charge code for item ${count}:${item.product_id}`)
    if(item.product_id === oldCode) {
      console.log("Old charge code found!")
      newShipment.shipments[0].items[count].product_id = newCode;
      update = true;
      console.log(`New charge code for item ${count}:${newShipment.shipments[0].items[count].product_id}`)
    }
    count++
  })

  
  
  if(update === true){
    // Push updated shipment to AP API
    const putURL = `https://digitalapi.auspost.com.au/shipping/v1/shipments/${shipID}`;
    const response = await makeAPIRequest(putURL, "put", apicreds, accNum, newShipment.shipments[0]);
    return response
  }


}

async function makeAPIRequest(URL, method, apicreds, accNum, data) {
   options = {
    headers: {
      "method": method,
      "authorization": `Basic ${apicreds}`,
      "account-number": accNum,
      'User-Agent': 'Neto' 
    }
   }

   if(method === "put") { // Switch for get vs put request

    return axios.put(URL, data, options)
    .then(
      function(res) {
        if (res.status !== 201) {
          console.log('Looks like there was a problem. Status Code: ' + res.status);
          console.log({res});
          return;
        } else {
          console.log("Updated status: " + res.statusText);
          return res.data;
        }
      }
    )
    .catch(function(err) {
      console.log('Error making put request:', err);
    });
   } else {

    return axios.get(URL, options)
    .then(
      function(res) {
        if (res.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' + res.status);
          return;
        } else {
          // console.log(res.data);
          return res.data;
        }
      }
    )
    .catch(function(err) {
      console.log('Error making get request:', err);
    });
   }


}
