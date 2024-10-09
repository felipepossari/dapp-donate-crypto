// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

struct Campaign {
    address author;
    string title;
    string description;
    string videoUrl;
    string imageUrl;
    uint256 balance;
    bool active;
}

contract DonateCrypto {
    uint256 public fee = 100;
    uint256 public nextId = 0;

    mapping(uint256 => Campaign) public campaings;

    function addCampaing(
        string calldata title,
        string calldata description,
        string calldata videoUrl,
        string calldata imageUrl
    ) public {
        Campaign memory newCampaing;
        newCampaing.title = title;
        newCampaing.description = description;
        newCampaing.videoUrl = videoUrl;
        newCampaing.imageUrl = imageUrl;
        newCampaing.active = true;
        newCampaing.author = msg.sender;

        nextId++;
        campaings[nextId] = newCampaing;
    }

    function donate(uint256 id) public payable {
        require(msg.value > 0, "You must send a donation value > 0");
        require(campaings[id].active == true, "Cannot donate to this campaing");

        campaings[id].balance += msg.value;
    }

    function withdraw(uint256 id) public {
        Campaign memory campaign = campaings[id];
        require(campaign.author == msg.sender, "You do not have permission");
        require(campaign.active == true, "This campaign is closed");
        require(campaign.balance > 100, "This campaing does not have enough balance");

        // Convert author address in a payable address
        address payable recipient = payable(campaign.author);
        // Transfer balance to author address
        recipient.call{value: campaign.balance - fee}("");

        campaings[id].active = false;
    }
}
