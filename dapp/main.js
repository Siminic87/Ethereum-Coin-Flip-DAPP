var web3 = new Web3(Web3.givenProvider);
var contractInstance;

$(document).ready(function() {
    window.ethereum.enable().then(function(accounts){
    contractInstance = new web3.eth.Contract(abi, "0x7b828E968ea457Bb0aE8607737b18b265C8b6864", {from: accounts[0]});
    console.log(contractInstance);
    });

    //When user starts game
    $("#start_button").click(startGame);
    $("#value_button").click(getValue);
    $("#fund_button").click(fundContract);
    $("#withdraw_button").click(emptyContract);

});

//Variable storing user's choice
var choice;

//Function run if heads is clicked
function headsClicked() {
    choice = 1;
    document.getElementById("current_choice").innerHTML = "Heads";
    document.getElementById("current_choice").style.fontWeight = "bold";
}

//Function run if tails is clicked
function tailsClicked() {
    choice = 2;
    document.getElementById("current_choice").innerHTML = "Tails";
    document.getElementById("current_choice").style.fontWeight = "bold";
}

//Function starting game
function startGame(){
    var bet = $("#bet_input").val();

    error(bet);

    var config = {
        value: web3.utils.toWei(bet, "ether")
    }

    //Passes in user's choice as parameter. 1 is heads 2 is tails
    contractInstance.methods.startGame(choice).send(config)

    .on("transactionHash", function(hash){
        console.log(hash);
    })

    .on("confirmation", function(confirmationNr){
        console.log(confirmationNr);
    })

    .on("receipt", function(receipt){
        console.log(receipt);
    })

    showResult();
}

//Function showing amount of eth won or lost
function showResult(){
    var bet = $("#bet_input").val();

    contractInstance.methods.getResult().call().then(function(res){

        if(res === "Win!"){
            $("#wonOrLost").text("You won: " + bet + " eth!");
        }

        if(res === "Lose!"){
            $("#wonOrLost").text("You lost: " + bet + " eth...");
        }
    })
}


//Function checking errors
function error(bet){
    if(isNaN(choice)){
        alert("Please choose a side");
    }

    if(bet < 0.1 || bet > 2.0){
        alert("Please place a proper bet");
        exit();
    }

}

//Function getting value of contract
function getValue(){
    contractInstance.methods.contractValue().call().then(function(val){
        val = val / 1000000000000000000
        $("#contractVal").text(val + " Eth");
    })
}

//Function allowing anyone to fund the contract
function fundContract(){

    var funding = $("#fund_input").val();

    if(funding <= 0){
        alert("Need to send more than 0 eth to contract");
        return;
    }

    var config = {
        value: web3.utils.toWei(funding, "ether")
    }

    contractInstance.methods.fundContract().send(config)

    .on("transactionHash", function(hash){
        console.log(hash);
    })

    .on("confirmation", function(confirmationNr){
        console.log(confirmationNr);
    })

    .on("receipt", function(receipt){
        console.log(receipt);
    })
}

//Function allowing owner to withdraw from the contract
function emptyContract() {

    contractInstance.methods.emptyContract().send()

}
