const sha256 = require('sha256');

class Block{

    constructor(index, timestamp, data, prevHash){

        this.data = data;
        this.timestamp = timestamp;
        this.index = index;
        this.prevHash = prevHash;

        this.thisHash = sha256(
            this.index + this.timestamp + this.data + this.prevHash
        );
    }
}

const createGenesisBlock = ()=>{
    new Block(0, Date.now(), 'This is the genesis block', '0');
}

const nextBlock = (lastBlock, data)=>{

    new Block(lastBlock.index+1, Date.now(), data, lastBlock.thisHash);
}
    
const createBlockChain = (num)=>{

    const blockChain = [createGenesisBlock()];
    let previousBlock = blockChain[0];

    for(let i=1; i<num; i++){

        const blockToAdd = nextBlock(previousBlock, `This is the Block #${i}`);
        blockChain.push(blockToAdd);
        previousBlock = blockToAdd;
    }

    console.log(blockChain);
}

const lengthOfBlocks = 20;
createBlockChain(lengthOfBlocks);