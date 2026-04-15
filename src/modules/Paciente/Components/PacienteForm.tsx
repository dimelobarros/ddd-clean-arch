"use client"

import { DocumentoFieldset } from "@/modules/Documento/Components/DocumentoFieldset";
import { EnderecoFieldset } from "@/modules/Endereco/Components/EnderecoFieldset";
import { TelefoneFieldset } from "@/modules/Telefone/Components/TelefoneFieldset";
import { useState } from "react";

export function PacienteForm({ onSubmit }: any) {

    const [chaveFormulario, setChaveFormulario] = useState(0);

    const [nome, setNome] = useState("");
    const [genero, setGenero] = useState("");
    const [idade, setIdade] = useState("");
    const [peso, setPeso] = useState("");
    const [altura, setAltura] = useState("");

    const [documento, setDocumento] = useState<any>({});
    const [endereco, setEndereco] = useState<any>({});
    const [telefone, setTelefone] = useState<any>({});

    return (

        <form

            key={chaveFormulario} onSubmit={(e) => {
                e.preventDefault;

                // VALIDANDO DADOS ANTES DE SUBMETÊ-LOS:

                if (!nome || !genero || !idade || !peso || !altura) {
                    alert('Preencha todos os campos dos dados do paciente!');
                    return;
                }

                if (!documento?.numeroDocumento || !documento?.tipoDocumento) {
                    alert('Preencha todos os campos do Documento!');
                    return;
                }

                if (!endereco?.logradouro || !endereco?.numero) {
                    alert('Preencha os campos necessários do endereço do paciente!');
                    return;
                }

                onSubmit({
                    nome, genero, idade: Number(idade), peso: Number(peso), altura: Number(altura), documento, endereco, telefone
                });

                // LIMPAR OS CAMPOS DO FORMULÁRIO APÓS A INSERÇÃO:
                setNome("");
                setGenero("");
                setIdade("");
                setPeso("");
                setAltura("");
                setDocumento({});
                setEndereco({});
                setTelefone({});

                // FORÇAR O RESET DOS FIELDSETS PRESENTES NO FORMULÁRIO
                setChaveFormulario(chaveFormulario + 1);

            }} >

            Nome: <input type="text" value={nome} onChange={e => setNome(e.target.value)} /> <br />
            Gênero: <input type="text" value={genero} onChange={e => setGenero(e.target.value)} /> <br />
            Idade: <input type="number" value={idade} onChange={e => setIdade(e.target.value)} /> <br />
            Peso: <input type="number" value={peso} onChange={e => setPeso(e.target.value)} /> <br />
            Altura: <input type="number" value={altura} onChange={e => setAltura(e.target.value)} /> <br />

            <hr />

            <DocumentoFieldset onChange={setDocumento} />

            <hr />

            <EnderecoFieldset onChange={setEndereco} />

            <hr />

            <TelefoneFieldset onChange={setTelefone} /> <br />

            <button type="submit"> Salvar Paciente </button>
        </form >
    );
}