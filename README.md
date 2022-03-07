# VIETQR CODE GENERATOR

This application uses for creating VietQR code by giving the form your transfer information. It contains all the necessary information ensuring accurate, quick and safe payment. 

VietQR is a common trademark for payment and money transfer using QR Codes through the Napas network and its member banks as well as payment mediators and partners inside and outside Vietnam. It provides an API to generate the code according to Napas's standard.

Here is the link: https://hoangtanphat.github.io/vietqr-code-generator/

## 1. Frameworks / Libraries

In this project, I'm using:

- ReactJS
- Bootstrap / React Bootstrap
- VietQR.io API: Quick Link creator API and Bank name list API
 
## 2. VietQR API

### `Bank List API`

This uses for getting the correct information about all of the banks which VietQR provides. You can read the document here to know how to get the data: https://www.vietqr.io/danh-sach-api/api-danh-sach-ma-ngan-hang

### `Quick Link Creator API`
Syntax: https://img.vietqr.io/image/<BANK_ID>-<ACCOUNT_NO>-<TEMPLATE>.png?amount=<AMOUNT>&addInfo=<DESCRIPTION>&accountName=<ACCOUNT_NAME> 
- Bank_ID: Bank's short name or BIN Code (can get these information by using Bank List API).
- Account_No: Account number of the receiver.
- Template: The presentation form of the image file containing the QR Code.
- Amount: Transfer amount.
- Description: Transfer description.
- Account_name: Account name of the receiver.

For details please read here: https://www.vietqr.io/danh-sach-api/link-tao-ma-nhanh
  
Background image by <a href="https://unsplash.com/@orwhat?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Richard Horvath</a> on <a href="https://unsplash.com/s/photos/pink-and-blue?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
