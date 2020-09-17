# AusPost-MainfestServiceCodeUpdate
A tool for bulk updating Auspost service codes on shipment already created

With AusPost's API it is possible for the accounts service code to change after a consignment has been submitted but before the order (manifet) has been created. This often causes and issue where an order cannot be created with those shipment, possibly leaving the merchant with unesscerry unmanifested fees.

This script allows you to quickly update the services code on a given list of shipments.

To use this script you will need ot have node installed

1. Clone this repo
2. Install dependacies (npm install)
3. Set script variables in index.js
4. Add consignment list to manifest.json
5. Run script (code runner)

