import Web3 from 'web3';
import ABI from './ABI.json';

const CONTRACT_ADDRESS = '0x74bb682Cb000E1f46931A9efAf184101Ba17bE36';

export async function login() {
    if (!window.ethereum) throw new Error('No metamask detected');

    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.requestAccounts();

    if (!accounts || !accounts.length) throw new Error('No accounts detected');

    localStorage.setItem('wallet', accounts[0]);
    return accounts[0];
}

function getContract() {
    const web3 = new Web3(window.ethereum);
    const from = localStorage.getItem('wallet');
    return new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from });
}

export async function addCampaing(campaign) {
    const contract = getContract();
    return contract.methods
    .addCampaing(campaign.title, 
        campaign.description, 
        campaign.videoUrl, 
        campaign.imageUrl).send();
}

export async function nextId() {
    const contract = getContract();
    return contract.methods.nextId().call();
}

export async function getCampaing(id) {
    const contract = getContract();
    return contract.methods.campaings(id).call();
}

export async function donate(id, amount) {
    await login();
    const contract = getContract();
    return contract.methods.donate(id).send({ value: Web3.utils.toWei(amount, 'ether') });
}