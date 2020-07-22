# Ethereum Coin Flip DAPP
The “Ethereum Coin Flip DAPP” is an online game that allows users to bet fractions of the Cryptocurrency "Ether" on the outcome of a random coin flip (heads vs. tails). Winners get back double their bet and losers lose the bet amount, with bets ranging between 0.1 and 2 Ether.

## Demo
A live demo will soon be linked here..

## UX
The purpose of the Coin Flip DAPP is leisure time entertainment.

The Ethereum Coin Flip DAPP is a good entertainment application because it allows users to quickly place bets with their digital assets. Due to the decentralized nature of Ethereum, another added benefit is that the bet amount is never in the custody of a potentially dishonest centralized player and bet outcomes are determined by impartial smart contracts.

- As a user type, I want to quickly place bets on the outcome of a coin flip.
- As a user type, I want to be sure that nobody can steal my funds.
- As a user type, I want to be sure that the bet-outcome is fair.

### Screenshot:
#### Desktop
![Ethereum Coin Flip DAPP - Screenshot](media\Ethereum Coin Flipp DAPP.PNG)

## Features
The Online Marketing - Issue Tracker has various features that intend to allow users to get a quick overview of various bugs and feature requests that have been requested by other users. Users can then also post on vote on bugs and feature requests that they personally would like to see tended to by the developers.

### Existing Features
- Pseudo-random coin Flip via Ethereum smart contract
- Bet outcome picker as "Heads" and "Tails" buttons
- Bet amount setter via input form with preset amount range
- MetaMask cryptocurrency wallet integration for sending and receiving bet / win amounts

All features fully responsive on mobile devices (incl. tablets and smartphones).

### Features Left to Implement
- Truly randomized coin flip via Ethereum Oracle
- Outcome table
- More appealing graphical depiction of coin flip and bet outcome

## Technologies Used
- HTML
    - The project uses HTML code to allow structuring and display of the information presented on MarketingMan.ie.
- CSS
    - The project uses CSS code to visually design and animate the page's structure as defined by the HTML.
- [Bootstrap](https://bootswatch.com/superhero/)
    - The project uses the Bootstrap framework (v. 4.5.0) to save time in development by relying on standardized HTML and CSS elements that can be found in the library. The theme being used is "superhero".
- [Solidity](https://solidity.readthedocs.io/en/v0.5.12/)
    - The logic of the Ethereum smart contracts that used for determining bet outcome as well as sending and receiving bet amounts is written in the Solidity (0.5.12) coding language.
- [JavaScript](https://jquery.com/) & [Bootstrap javascript](https://getbootstrap.com/)
    - The project uses JavaScript coding language for enabling the website to interact with web3 technologies / smart contracts.
- [jQuery](https://jquery.com/) & [Bootstrap javascript](https://getbootstrap.com/)
    - The project uses jQuery (v. 3.4.1) and Boostrap javascript (v. 4.4.1) for dynamically inserting smart contract outcomes into the website.

## Testing
Manual testing revealed that placing bets, sending and receiving back funds funds from the contract work in all instances. The pages are accessible on all devices and all major browsers and look virtually the same on different browsers.

Bug was noticed was noticed after MetaMask started throwing "RPC Error: Error [ethjs-rpc] rpc error with payload" error after rearrangement of file structure and would therefore decline all transactions. It was later found that the nonce had become invalid and the MetaMask account used for interacting with Ganache needed to be reset in the settings deleting its transaction history.

## Deployment
This DAPP was deployed using the Truffle / Ganache Ethereum test blockchain.

To run locally, git clone files, launch Ganache, add project by selecting "truffle-config.js" in "truffle" folder in Ganache "contracts" section and press save and restart, open Windows or Mac command line interface, navigate to "truffle" folder and enter "truffle migrate" command, after successful migration of contracts, navigate to "dapp" folder and enter "py -m http.server", type "locahost:8000" into browser and run DAPP.

Do make sure that MetaMask has a Ganache test network account set up and that a private key from a Ganache test wallet with sufficient test ether was imported.

## Credits
Inspiration for visual layout of app taken from "mariopino" [github.com](https://github.com/mariopino/ethereum-coinflip)
