# AusPost-MainfestServiceCodeUpdate
A tool for bulk updating Auspost service codes on shipment already created

With the AusPost API it is possible for the service code's on the account to change after a consignment has been submitted but before the order (manifest) has been created. This often causes an issue where an order cannot be created with those shipments, possibly leaving the merchant with unesscerry unmanifested fees.

This script allows you to quickly update the services code on a given list of unmanifested shipments.

### Instructions
*To use this script you will need to have node installed*

1. Clone this repo to your local environment
2. Install dependencies `npm install`
3. Set the script variables in index.js
4. Add consignment list to manifest.json
5. Run script (You can use code runner for in VScode https://github.com/formulahendry/vscode-code-runner.git)


### Common Errors

###### 412 status code response 
- This mean a precodition failed and will usually happen if the new services code is not available on the account