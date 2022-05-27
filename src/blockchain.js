const crypto = require('crypto');

// 创世区块
const initBlockchain = {
    index: 0,
    data: 'hello world',
    prevHash: '0',
    timestamp: 1536622963141,
    nonce: 1620,
    hash: '00002ba8cc2e45600624fc14b601d45b01878fad14f4d3b9da13c914ae4b4f8c'
}


class Blockchain {
    constructor() {
        this.blockchain = [initBlockchain]
        this.data = []
        this.difficulty = 4
        // const a = this.computedHash(0, '0', new Date().getTime(), 'hello world woniu-chain', 1)
        // console.log(a)
    }

    // 获取最新区块
    getLastBlock() {
        return this.blockchain[this.blockchain.length - 1]
    }

    // 挖矿
    mine() {
        //    1.生成新的区块
        //    2.不停的算Hash,知道符合条件的哈希值,获取记账权
        const newBlock = this.generateNewBlock()
        // 区块合法,并且区块链合法,就新增
        if (this.isValidaBlock(newBlock)) {
            this.blockchain.push(newBlock)
        } else {
            console.log('error------->', newBlock)
        }

    }

    // 生成新区块
    generateNewBlock() {
        let nonce = 0
        const index = this.blockchain.length
        const data = this.data
        const prevHash = this.getLastBlock().hash
        const timestamp = new Date().getTime()
        let hash = this.computedHash(index, prevHash, timestamp, data, nonce)
        while (hash.slice(0, this.difficulty) !== '0'.repeat(this.difficulty)) {
            nonce += 1
            hash = this.computedHash(index, prevHash, timestamp, data, nonce)

        }
        return {
            index,
            data,
            prevHash,
            timestamp,
            nonce,
            hash
        }
    }

    // 计算哈希
    computedHash(index, preHash, timestamp, data, nonce) {
        return crypto.createHash('sha256')
            .update(index + preHash + timestamp + data + nonce)
            .digest('hex')
    }

    // 校验区块
    isValidaBlock(newBlock) {
        //1.区块的index的党羽最新得多区块的index+1
        //2.区块的time 大于最新区块
        //3.最新区块得到的prevHash 等于最新区块的hash
        //4.区块的Hash值,符合难度要求
        const lastBlock = this.getLastBlock()
        if (newBlock.index !== lastBlock.index + 1) {
            return false
        } else if (newBlock.timestamp <= lastBlock.timestamp) {
            return false
        } else if (newBlock.prevHash !== lastBlock.hash) {
            return false
        } else if (newBlock.hash.slice(0, this.difficulty) !== '0'.repeat(this.difficulty)) { // 难度判定
            return false
        }
        return true
    }

    // 校验区块链
    isValidChain() {

    }
}

let bc = new Blockchain()
bc.mine()
bc.mine()
bc.mine()
bc.mine()
console.log("---->", bc.blockchain)
