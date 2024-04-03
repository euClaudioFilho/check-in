let participantes = [
    {
        nome: "Claudio Filho",
        email: "claudiosrfilho@gmail.com",
        dataInscricao: new Date(2024, 3, 2, 19, 23),
        dataCheckIn: new Date(2024, 3, 2, 20, 20),
    },
    {
        nome: "Andreia Rodrigues",
        email: "andreia@gmail.com",
        dataInscricao: new Date(2024, 2, 14, 19, 23),
        dataCheckIn: new Date(2024, 2, 24, 20, 20),
    },
    {
        nome: "Claudio Rodrigues",
        email: "claudio@gmail.com",
        dataInscricao: new Date(2023, 9, 20, 13, 10),
        dataCheckIn: new Date(2023, 9, 26, 20, 30),
    },
    {
        nome: "Sandro Vieira",
        email: "sandro@gmail.com",
        dataInscricao: new Date(2023, 11, 4, 19, 23),
        dataCheckIn: new Date(2023, 11, 5, 20, 20),
    },
    {
        nome: "Gabriela Marques",
        email: "gabriela@gmail.com",
        dataInscricao: new Date(2023, 4, 5, 19, 23),
        dataCheckIn: null,
    },
    {
        nome: "Gustavo Henrique",
        email: "gustavo@gmail.com",
        dataInscricao: new Date(2023, 5, 6, 19, 23),
        dataCheckIn: null,
    },
    {
        nome: "Leonardo Valesko",
        email: "leoeditor@gmail.com",
        dataInscricao: new Date(2023, 8, 7, 19, 23),
        dataCheckIn: null,
    },
    {
        nome: "Hugo Arsie",
        email: "hugo@gmail.com",
        dataInscricao: new Date(2023, 7, 8, 19, 23),
        dataCheckIn: null,
    },
    {
        nome: "Luan Bronze",
        email: "luan@gmail.com",
        dataInscricao: new Date(2023, 1, 10, 14, 39),
        dataCheckIn: null,
    },
    {
        nome: "Gabriel Almeida",
        email: "gabriel@gmail.com",
        dataInscricao: new Date(2023, 5, 10, 19, 23),
        dataCheckIn: null,
    },
];

const criarNovoParticipante = (participante) => {
    const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao);
    let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn);

    if (participante.dataCheckIn == null) {
        dataCheckIn = `
            <button data-email="${participante.email}" onclick="fazerCheckIn(event)">    
                Confirmar check-in
            </button>
        `;
    }

    return `
    <tr>

        <td>
            <b>${participante.nome}</b>
            <br>
            <small>${participante.email}</small>
        </td>

        <td>${dataInscricao}</td>
        <td>${dataCheckIn}</td>

    </tr>`;
};

const atualizarLista = (participantes) => {
    let output = "";

    for (let participante of participantes) {
        output = output + criarNovoParticipante(participante);
    }

    document.querySelector("tbody").innerHTML = output;
};

atualizarLista(participantes);

const adicionarParticipante = (event) => {
    event.preventDefault();
    const dadosFormulario = new FormData(event.target);

    const participante = {
        nome: dadosFormulario.get("nome"),
        email: dadosFormulario.get("email"),
        dataInscricao: new Date(),
        dataCheckIn: null,
    };

    const participanteExiste = participantes.find((p) => {
        return p.email == participante.email;
    });

    if (participanteExiste) {
        alert("Este usuário já existe!");
        event.target.querySelector('[name="nome"]').value = "";
        event.target.querySelector('[name="email"]').value = "";
        return;
    }

    participantes = [participante, ...participantes];
    atualizarLista(participantes);

    event.target.querySelector('[name="nome"]').value = "";
    event.target.querySelector('[name="email"]').value = "";
};

const fazerCheckIn = (event) => {
    const mensagemConfirmacao = "Deseja realizar o check-in?";

    if (confirm(mensagemConfirmacao) == false) {
        return;
    }

    const participante = participantes.find((p) => {
        return p.email == event.target.dataset.email;
    });

    participante.dataCheckIn = new Date();

    atualizarLista(participantes);
};
