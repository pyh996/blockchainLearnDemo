const crypto = require('crypto');

class Blockchain {
    constructor() {
        this.blockchain = []
        this.data = []
        this.difficulty = 4
        const a = this.computedHash(0, '0', new Date().getTime(), 'hello world woniu-chain', 1)
        console.log(a)
    }

    // 挖矿
    mine() {
        //    1.生成新的区块
        //    2.不停的算Hash,知道符合条件难度,新增区块

    }

    // 生成新区块
    generateNewBlock() {

    }

    // 计算哈希
    computedHash(index, preHash, timestamp, data, nonce) {
        return crypto.createHash('sha256')
            .update(index + preHash + timestamp + data + nonce)
            .digest('hex')
    }

    // 校验区块
    isValidaBlock() {

    }

    // 校验区块链
    isValidChain() {

    }
}

let bc = new Blockchain()

