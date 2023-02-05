const Donations = artifacts.require('Donations')

contract('Donations contract', () => {
    let contract = ''
    // Test smart contract deploy
    it('Should deploy the smart contract successfully', async () => {
        const deployedContract = await Donations.deployed()
        console.log(`Donations contract address => ${deployedContract.address}`)
        assert(deployedContract !== '')
        contract = deployedContract
    })

    it('Should create a donation', async () => {
        const transaction = await contract.createDonation(
            '0x66afC5A05D544c09404E38005EE1c27F37f19fe1',
            'Test donation',
            'Test donation story',
            20000000000,
            1675638000000,
            'img.png'
        )

        console.log("Id of created donation => ", transaction.logs[0].args.id.toNumber())
        // transaction.logs[0].args.id.toNumber() => 
        // This is the way to access the returned value from non view function (After emit an event)
    })

    it('Should get number of donations', async () => {
        const total = await contract.getNumberOfDonations()
        console.log('Number of donations => ', total.toNumber())
    })


    it('Should donate to a donation', async () => {
        await contract.donateToDonation(0, { value: 20000000000 })
        await contract.donateToDonation(0, { value: 80023000 })
        await contract.donateToDonation(0, { value: 300000000 })
    })

    it('Should get donators and donations of an donation', async () => {
        const result = await contract.getAllCampaigns() 
        console.log(result)
    })
})