"use strict"

let turno;
let giocoTerminato;

window.onload = function()
{
    generaTris();
}

function generaTris()
{
    console.log("entrato")
    let _divGioco = document.getElementById("divGioco");

    for(let i = 0; i < 3; i++)
    {
        let row = document.createElement("div");
        row.classList.add("row");
        for(let j = 0; j < 3; j++)
        {
            let quadrato = document.createElement("div");
            quadrato.classList.add("border", "col-sm-4", "quadrato");
            quadrato.style.height = "100px";
            quadrato.style.width = "100px";
            quadrato.id = "quadrato" + i + j;
            row.appendChild(quadrato);
            quadrato.addEventListener("click", function()
            {
                clickQuadrato(i, j);
            });
        }
        _divGioco.appendChild(row);
    }
    turno = "X";
    let alert = document.createElement("div");
    alert.classList.add("alert", "alert-success", "mx-auto", "mt-3");
    document.getElementById("wrapper").appendChild(alert);
    alert.style.width = "300px";
    alert.innerText = "TURNO GIOCATORE " + turno;

    let div = document.createElement("div");
    div.classList.add("mx-auto");
    div.style.width = "300px";
    let btn = document.createElement("button");
    btn.classList.add("btn", "btn-primary", "align-center");
    btn.innerText = "GIOCA ANCORA";
    btn.id = "btnGiocaAncora";
    btn.style.width = "300px";
    btn.addEventListener("click", pulisciTutto);
    div.appendChild(btn);
    document.getElementById("wrapper").appendChild(div);
    btn.disabled = true;
}

function clickQuadrato(i, j)
{
    if(giocoTerminato)
        return;

    let quadrato = document.getElementById("quadrato" + i + j);
    quadrato.innerText = turno;
    quadrato.style.fontSize = "30pt";
    quadrato.style.lineHeight = "100px";
    quadrato.classList.add("text-center");
    if(turno === "O")
        turno = "X";
    else
        turno = "O";
    document.getElementsByClassName("alert")[0].innerText = "TURNO GIOCATORE " + turno;

    if(controllaVittoria("X"))
        vittoria("HA VINTO X");
    if(controllaVittoria("O"))
        vittoria("HA VINTO O");
}

function controllaVittoria(simbolo)
{
    let quadrati = document.getElementsByClassName("quadrato");
    let vittoria = false;

    if(quadrati[0].innerText === simbolo && quadrati[1].innerText === simbolo && quadrati[2].innerText === simbolo)
        vittoria = true;
    else if(quadrati[3].innerText === simbolo && quadrati[4].innerText === simbolo && quadrati[5].innerText === simbolo)
        vittoria = true;
    else if(quadrati[6].innerText === simbolo && quadrati[7].innerText === simbolo && quadrati[8].innerText === simbolo)
        vittoria = true;
    else if(quadrati[0].innerText === simbolo && quadrati[3].innerText === simbolo && quadrati[6].innerText === simbolo)
        vittoria = true;
    else if(quadrati[1].innerText === simbolo && quadrati[4].innerText === simbolo && quadrati[7].innerText === simbolo)
        vittoria = true;
    else if(quadrati[2].innerText === simbolo && quadrati[5].innerText === simbolo && quadrati[8].innerText === simbolo)
        vittoria = true;
    else if(quadrati[0].innerText === simbolo && quadrati[4].innerText === simbolo && quadrati[8].innerText === simbolo)
        vittoria = true;
    else if(quadrati[2].innerText === simbolo && quadrati[4].innerText === simbolo && quadrati[6].innerText === simbolo)
        vittoria = true;

    console.log(vittoria);
    return vittoria;
}

function vittoria(msg)
{
    giocoTerminato = true;

    document.getElementById("btnGiocaAncora").disabled = false;

    document.getElementsByClassName("alert")[0].innerText = msg;
}

function pulisciTutto()
{
    for (let i = 0; i < 3; i++)
    {
        for (let j = 0; j < 3; j++)
        {
            document.getElementById("quadrato" + i + j).innerText = "";
        }
    }

    turno = "X";
    document.getElementsByClassName("alert")[0].innerText = "TURNO GIOCATORE " + turno;
    document.getElementById("btnGiocaAncora").disabled = true;
    giocoTerminato = false;
}