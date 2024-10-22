const player = [{

    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS : 0    

},
{

    NOME: "Peach",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 2,
    PONTOS : 0
    

},
{

    NOME: "Yoshi",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 4,
    PODER: 3,
    PONTOS : 0
        
    
},
{

    NOME: "Bowser",
    VELOCIDADE: 5,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS : 0
        
    
},
{

    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS : 0
            
        
},
{

    NOME: "Donkey Kong",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS : 0
            
        
}
]

const player1 = player[0]
const player2 = player[4]


async function rollDice() {
    
    return Math.floor(Math.random() * 6) + 1

}


async function getRandonBlock() {
    
    let random = Math.random()
    let result


    switch (true) {
        case random < 0.33:
            result = "RETA"
            
            break;
        case random < 0.66:
            result = "CURVA"
            
            break;
        
        default:
            result = "CONFRONTO"
            break;
    }


    return result
}

async function getRandonDamage(winner, loser) {
    

    let random = Math.random()
    

    switch (true) {
        case random < 0.5:
            
            console.log(`${winner.NOME} venceu o confronto! ${loser.NOME} perdeu 1 ponto 🐢`)
            loser.PONTOS--
            
            break;
            
        default:
           
            console.log(`${winner.NOME} venceu o confronto! ${loser.NOME} perdeu 2 ponto 💣`)
            loser.PONTOS-= 2
            break;
    }


}

async function getRandonTurbo(winner) {


    let random = Math.random()
    

    switch (true) {
        case random < 0.5:
            
            console.log(`${winner.NOME} ganhou um ponto pelo nitro 💨`)
            winner.PONTOS++
            
            break;
            
        default:          
           
            break;
    }
    
}




async function logRollResult(characterName, block, diceResult, attribute) {
    
    console.log(`${characterName.NOME} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult+attribute}`)    

}


async function playerRaceEngine(char1, char2) {

    for (let round = 1; round <= 5; round++){
        
        console.log(
            `🏁 Rodada ${round} `
        )

        //sortear bloco
        let block = await getRandonBlock()
        console.log(`Bloco: ${block}`)




        // rolar os dados
    let diceResult1 = await rollDice()
    let diceResult2 = await rollDice()


    //teste de habilidade
    let totalTestSkill1 = 0
    let totalTestSkill2 = 0

    if (block === "RETA") {
        totalTestSkill1 = diceResult1 + char1.VELOCIDADE
        totalTestSkill2 = diceResult2 + char2.VELOCIDADE

        await logRollResult(player1,"velocidade",diceResult1,char1.VELOCIDADE)
        await logRollResult(player2,"velocidade",diceResult2,char2.VELOCIDADE)

        
    }
    else if (block === "CURVA") {
        
        totalTestSkill1 = diceResult1 + char1.MANOBRABILIDADE
        totalTestSkill2 = diceResult2 + char2.MANOBRABILIDADE

        await logRollResult(player1,"manobrabilidade",diceResult1,char1.MANOBRABILIDADE)
        await logRollResult(player2,"manobrabilidade",diceResult2,char2.MANOBRABILIDADE)
    }
    else {
        let powerResult1 = diceResult1 + char1.PODER
        let powerResult2 = diceResult2 + char2.PODER

        console.log(`${char1.NOME} confrontou com ${char2.NOME} 🥊`)
        await logRollResult(player1,"poder",diceResult1,char1.PODER)
        await logRollResult(player2, "poder", diceResult2, char2.PODER)
        
        if (powerResult1 > powerResult2) {
            if (true) {

                await getRandonDamage(char1, char2)
                
                if (char2.PONTOS < 0) {
                    char2.PONTOS= 0
                }

                await getRandonTurbo(char1)

            }
        }
        else if (powerResult2 > powerResult1) {
            if (true) {
               
                await getRandonDamage(char2,char1) 
                if (char1.PONTOS < 0) {
                    char1.PONTOS= 0
                }
                await getRandonTurbo(char2)

            }
        }
        else if (powerResult1 === powerResult2) {
            console.log("Deu empate")
        }
        
        }
        

        if (totalTestSkill1 > totalTestSkill2) {
        
            console.log(`${char1.NOME} marcou um ponto`)
            char1.PONTOS++
        }
        else if (totalTestSkill2 > totalTestSkill1) {
            
            console.log(`${char2.NOME} marcou um ponto`)
            char2.PONTOS++
        }
        else if (totalTestSkill1 === totalTestSkill2 && block =="RETA" || totalTestSkill1 === totalTestSkill2 && block =="CURVA" ) {
            console.log("Deu empate")
        }
        
        console.log("========================================================")
    }


    }       

    
async function declareWinner(char1, char2) {
    console.log(`Resultado final:`)
    console.log(`${char1.NOME}: ${char1.PONTOS} ponto(s)`)
    console.log(`${char2.NOME}: ${char2.PONTOS} ponto(s)`)


    if (char1.PONTOS > char2.PONTOS) {
        
        console.log(`${char1.NOME} venceu a corrida! Parabéns! 🏆🏆`)
    }
    else if (char2.PONTOS > char1.PONTOS) {
        
        console.log(`${char2.NOME} venceu a corrida! Parabéns! 🏆🏆`)
    }
    else {
        console.log("Ocorreu empate")
    }


}

(async function  main() {
    
    console.log(
        
        `🏁 Corrida entre ${player1.NOME} e ${player2.NOME} começando ... \n`
         
    )

    await playerRaceEngine(player1, player2)
    await declareWinner(player1,player2)

})()
