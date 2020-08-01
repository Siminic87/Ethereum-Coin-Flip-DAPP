import "./Ownable.sol";
pragma solidity 0.5.12;

contract CoinFlip is Ownable {

    uint public randomNumber;
    bool resultBool;
    uint public contractValue;

    //Event logging result of coin flip
    event logFlipResult (string result, string randomChoice, string userChoice, uint bet);

    //Modifier making sure bet is at least minimum bet of 0.1 eth
    modifier minBet(uint bet){
        require(msg.value >= bet, "Bet needs to be more than 0.1 eth" );
        _;
    }

    //Modifier making sure bet is not larger than max bet of 2 eth
    modifier maxBet(uint bet){
        require(msg.value <= bet, "Bet needs to be 2 eth or less" );
        _;
    }

    //Modifier making sure bet is less than contract value
    modifier lessThanContractValue(uint value){
        require( msg.value < value, "Bet is more than value of contract");
        _;
    }

    //Function generating pseudo random number between 1 & 2
    function random() private view returns(uint) {
        return now % 2 + 1;
    }

    //Function getting result of bet
    function getResult() public view returns(string memory){
        string memory betResult;

        if(resultBool == true){
            betResult = "Win!";
        }
        else if(resultBool == false){
            betResult = "Lose!";
        }

        return(betResult);
    }

    //Function starting game, receiving payment and updating eth amount in contract after won or lost bet.
    function startGame(uint headsOrTails) public payable minBet(0.1 ether) maxBet(2 ether) lessThanContractValue(contractValue) {
        require(headsOrTails == 1 || headsOrTails == 2, "Choice needs to be 1 or 2");

        uint userChoice = headsOrTails;

        address payable player = msg.sender;
        uint bet = msg.value;
        uint payOut = bet * 2;
        string memory randChoicePrint;
        string memory userChoicePrint;

        randomNumber = random();

        if(userChoice == randomNumber){
            resultBool = true;
        }
        else{
            resultBool = false;
        }

        if(randomNumber == 2){
            randChoicePrint = "Heads";
        }
        else{
            randChoicePrint = "Tails";
        }

        if(userChoice == 2){
            userChoicePrint = "Heads";
        }
        else{
            userChoicePrint = "Tails";
        }

        //If player wins value of bet is subtracted from contracted and payed to player
        if (resultBool == true){
            emit logFlipResult("Winner", randChoicePrint, userChoicePrint, msg.value);
            player.transfer(payOut);
            contractValue -= bet;
        }

        //If player loses value of bet is added to contract value
        else if (resultBool == false){
            emit logFlipResult("Loser", randChoicePrint, userChoicePrint, msg.value);
            contractValue += bet;
        }
    }

    //Function allowing owner to empty contract
    function emptyContract() public onlyOwner returns(uint) {
        uint contractTotal = contractValue;
        contractValue = 0;
        msg.sender.transfer(contractTotal);
        return contractTotal;
    }

    //Function allowing anyone to fund contract
    function fundContract() public payable {
        contractValue += msg.value;
    }

}
