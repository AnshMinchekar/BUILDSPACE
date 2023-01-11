const { hexStripZeros } = require("ethers/lib/utils")

const main = async()=>{
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal") //complies the smart contract
    const waveContract = await waveContractFactory.deploy();//Deploys the smart contract
    await waveContract.deployed(); 
    console.log("Contract deployed to: ",waveContract.address);
    console.log("Contract deploted by: ",owner.address);

    await waveContract.getTotalWaves();

    const firstwaveTxn =await waveContract.wave();
    await firstwaveTxn.wait();

    await waveContract.getTotalWaves();

    const secondWaveTxn = await waveContract.connect(randomPerson).wave();
    await secondWaveTxn.wait();

    await waveContract.getTotalWaves();
};

const runMain = async() => {
    try{
        await main();
        process.exit(0); // exit Node process without error
    }catch (error){
        console.log(error);
        process.exit(1);//exit Node process while indicating 'Uncaught Fatal Exception' error
    }
};

runMain();