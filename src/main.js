const {Blockchain} = require('./blockchain');
const {Transaction} = require('./transaction');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('e94cc46fb111367474e34e6511c74dafed4836361eb50e2bf6aba846f4c78835');
const myWalletAddress = myKey.getPublic('hex');

let pardeepCoin = new Blockchain();

// pardeepCoin.createTransaction(new Transaction('address1', 'address2', 100));
// pardeepCoin.createTransaction(new Transaction('address2', 'address1', 50));

//const publicKey = '048c4d23d2dc04261f7594be1f274666794637697cef40d38c4ace26afb07e5364b1ee1911dd5f5173a4069dd42319814e15f11f32be60de77a031d5e379dfa246'

const tx1 = new Transaction(myWalletAddress, 'address1', 10);
tx1.signTransaction(myKey);
pardeepCoin.addTransaction(tx1);

console.log('\nStarting the miner...');
pardeepCoin.minePendingTransactions(myWalletAddress);

console.log('\nBalance of pardeep is', pardeepCoin.getBalanceOfAddress(myWalletAddress));

// console.log('\nStarting the miner again...');
// pardeepCoin.minePendingTransactions('pardeep-address');

//console.log('\nBalance of pardeep is', pardeepCoin.getBalanceOfAddress('pardeep-address'));

console.log(pardeepCoin.isChainValid());    