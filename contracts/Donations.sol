//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Donations {
    // Donation struct
    struct Donation {
        address owner;
        string title;
        string story;
        uint256 goal;
        uint256 deadline;
        uint256 collectedAmount;
        string image;
        address[] donators;
        uint256[] donations;
    }

    uint256 internal numberOfDonations = 0;
    mapping(uint256 => Donation) public donations; // key -> value

    // Events
    event Created(uint256 id);

    // Functions
    function getNumberOfDonations() public view returns (uint256) {
        return numberOfDonations;
    }

    function createDonation(
        address _owner,
        string memory _title,
        string memory _story,
        uint256 _goal,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        Donation storage donation = donations[numberOfDonations];

        require(
            _deadline >= block.timestamp * 1000,
            "The deadline must be in the future!"
        );

        donation.owner = _owner;
        donation.title = _title;
        donation.story = _story;
        donation.goal = _goal;
        donation.deadline = _deadline;
        donation.image = _image;

        numberOfDonations++;
        emit Created(numberOfDonations - 1);
        return numberOfDonations - 1;
    }

    function donateToDonation(uint256 _id) public payable {
        Donation storage donation = donations[_id];
        uint256 amountSent = msg.value;

        donation.donators.push(msg.sender);
        donation.donations.push(amountSent);

        (bool sent, ) = payable(donation.owner).call{value: amountSent}("");

        if (sent) {
            donation.collectedAmount = donation.collectedAmount + amountSent;
        }
    }

    function getDonators(uint256 _id)
        public
        view
        returns (address[] memory, uint256[] memory)
    {
        return (donations[_id].donators, donations[_id].donations);
    }

    function getAllCampaigns() public view returns (Donation[] memory) {
        // Create new array with specific size.
        Donation[] memory allDonations = new Donation[](numberOfDonations);

        for (uint256 index = 0; index < numberOfDonations; index++) {
            allDonations[index] = donations[index];
        }

        return allDonations;
    }
}
