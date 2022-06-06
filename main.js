const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash).toString();
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, "06/06/2022", "Geneis Block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length ; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

let pardeepCoin = new Blockchain();
pardeepCoin.addBlock(new Block(1, "07/06/2022", {amount: 2}));
pardeepCoin.addBlock(new Block(2, "08/06/2022", {amount: 3}));

console.log(JSON.stringify(pardeepCoin, null, 4));

console.log('Is Blockchain Valid?' + pardeepCoin.isChainValid());

pardeepCoin.chain[1].data = {amount: 4};
pardeepCoin.chain[1].hash = pardeepCoin.chain[1].calculateHash();

console.log(JSON.stringify(pardeepCoin, null, 4));

console.log('Is Blockchain Valid?' + pardeepCoin.isChainValid());