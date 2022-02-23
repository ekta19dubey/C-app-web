const crypto = require("crypto");
const base64 = require('base-64');
const utf8 = require('utf8');
const { json } = require("express");
const M_body = "there is two side of life either you live happily or live sadly.";
let encoded = base64.encode(M_body);
console.log(encoded)
const keyString = 'dGhlcmUgaXMgdHdvIHNpZGUgb2YgbGlmZSBlaXRoZXIgeW91IGxpdmUgaGFwcGlseSBvciBsaXZlIHNhZGx5Lg==';

const drypted_data = {};


drypted_data.decrypt = function (data, index_id) {
    console.log(data + '====================================');
    console.log(parseInt(index_id));
    console.log('====================================');
    let final_index_id = parseInt(index_id) + 25;
    console.log(final_index_id);
    let Key = keyString.substring(index_id, final_index_id);
    console.log(Key);
    // let iv = new Buffer('0000000000000000');
    let iv = new Buffer('68746D6C3E0A3C68746D6C3E0');
    //68746D6C3E0A3C68746D6C3E0
    var encodeKey = crypto.createHash('sha256').update(Key, 'utf8').digest();
    let cipher = crypto.createDecipheriv('aes-256-cbc', encodeKey, iv);
    //cipher.setAutoPadding(false);
    return cipher.update(data, 'base64', 'utf8') + (cipher.final('utf8'));

};

module.exports = drypted_data;




// const text = "6jXTrwEmEqouavrdUf56/ecsQBjIail6iV3oFbc2pPnDAKb/kfMPu+ZDlcAFxHEJMpnD4AZ8dTXAPmxTWAuIMkCj8wFwlB7ZZ4K2bCPK35RHsopGu62X+BBI0rK67tZcqkgoVEXaQY14e4YblmRmisNqaxBm4AWAelkwyGf92F2jnJ9cGmZNv4RcFIF2ncY5jPdIFt1sOqvdxXi3hTvSJnvfgQHOg+z7IrOJBWxwVXc=";






// var textToEncrypt = {
//     "imei": "212346545645",
//     "imsi": "5466564467767",
//     "phone_number": "7678435678",
//     "operator_type": "airtel",
//     "data_gather_frequency": "1",
//     "android_id": "4e4c5141b7cb261e",
//     "active_staus": "0",
//     "is_media": "1",
//     "audio_recoding_status": "0",
//     "screen_recording_status": "1",
//     "new_device_id": "4e4c5141kllb261e",
//     "old_device_id": "4e4c5141bopb261e"
// };
// var encryptionMethod = 'AES-256-CBC';
// var secret = "My32charPasswordAndInitVectorStr"; //must be 32 char length
// var iv = secret.substr(0, 16);

// var encryptedMessage = encrypt(JSON.stringify(textToEncrypt), encryptionMethod, secret, iv);
// var decryptedMessage = decrypt(encryptedMessage, encryptionMethod, secret, iv);



// console.log(encryptedMessage);
// console.log(decryptedMessage);

// const key = Buffer.from('xNRxA48aNYd33PXaODSutRNFyCu4cAe/InKT/Rx+bw0=', 'base64');
// const iv1 = Buffer.from('81dFxOpX7BPG1UpZQPcS6w==', 'base64');
// function decrypt_token(data) {
//     const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv1);
//     const decripted = decipher.update(data, 'base64', 'utf8') + decipher.final('utf8');
//     return decripted;
// }
// console.log('NodeJS decrypt: ', decrypt_token('hxdBZWB4eNn0lstyQU3cIX3WPj4ZLZu-C8qD02QEex8ahvMSMagFJnAGr2C16qMGsOLIcqypO8NX4Tn65DCrXGKrEL5i75tj6WoHGyWAzs0'));

// function decryptData(encrpted_data) {

//     var encodeKey = crypto.createHash('sha1').update('simpleText').digest('hex');
//     var cryptkey = Buffer.alloc(24);
//     // encodeKey.copy(cryptkey);

//     var decipher = crypto.createDecipheriv('aes-256-cbc', cryptkey, '');
//     decipher.setAutoPadding(true);
//     decoded = decipher.update(encrpted_data, 'base64', 'utf8');
//     decoded += decipher.final('utf8');

//     log.debug(JSON.stringify(decoded));

//     // return fn(decoded);
// }
// decryptData("9gmFZewT119s7Ij6shZbJPWtuplT7Bls+FYkqcp2rOQAXp2MLaUlu5gARQpi+IWj/YlCbo23FhSRn3X7WWRkQjRxJzFDyKYe0HT8gZthUbaevJO/1LDfpK1fFTOK/sB0GxgyIG9IHBjj55dGfxIEIt9wTQs5C7sgo6gmCJ9dTDDItTF+Pzhe4wHI5dwCE76LNX5Qez0sSu9J1enGPmGm3xOAT/nauEK2KmJyofvABWs=")






// reference to converting between buffers http://nodejs.org/api/buffer.html#buffer_new_buffer_str_encoding
// reference node crypto api http://nodejs.org/api/crypto.html#crypto_crypto_createcipheriv_algorithm_key_iv
// reference to ECB vs CBC cipher methods http://crypto.stackexchange.com/questions/225/should-i-use-ecb-or-cbc-encryption-mode-for-my-block-cipher

// var encrypt = function (data, key) {
//     var decodeKey = crypto.createHash('sha256').update(key, 'hex').digest();
//     //console.log(decodeKey)
//     var cipher = crypto.createCipheriv('aes-256-cbc', decodeKey, iv);
//     return cipher.update(data, 'utf8', 'hex') + (cipher.final('hex'));
// };


// var encrypt = function (plain_text, encryptionMethod, secret, iv) {
//     var encryptor = crypto.createCipheriv(encryptionMethod, secret, iv);
//     return encryptor.update(plain_text, 'utf8', 'base64') + encryptor.final('base64');
// };

// var decrypt = function (encryptedMessage, encryptionMethod, secret, iv) {
//     var decryptor = crypto.createDecipheriv(encryptionMethod, secret, iv);
//     return decryptor.update(encryptedMessage, 'base64', 'utf8') + decryptor.final('utf8');
// };


//var data = JSON.stringify(textToEncrypt)

//var cipher = encrypt(data, key);

// the string below was generated from the "main" in the java side
// console.log(decrypt(
// "BE66C03AFECE7B9C37E0FF186EBE7256BEFA5DD9EC6E3C6211B2CB54829A59E70A38C765B1ECBC2C55
//E22AF71296C7AD1AA7F605EF1B288E789D5142EA8C016B9304EEF125CF6E9D392DE806A8794EC3D60852ECA2137D6DB41A9962DD50000FDEF0E9CA728514B350179C7EF3128AEC7F6A58304E9AF01938CC8218CB9D856D25B904751FFEBEF42EB546A734EC90D7783991395338AEAF6B35BFD8DFD93801CA574E2782A8186B1CBBF2090122C25", key));


