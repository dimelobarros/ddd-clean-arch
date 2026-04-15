"use client"

import { useEffect, useState } from "react"
import { ListarPacientes } from "../Application/ListarPacientes";
import { Endereco } from "@/modules/Endereco/Domain/Endereco";
import { InserirPaciente } from "../Application/InserirPaciente";
import { RemoverPaciente } from "../Application/RemoverPaciente";
import { PacienteForm } from "./PacienteForm";


export function PacienteList() {

    const [pacientes, setPacientes] = useState<any>([]);
    const [contadorId, setContadorId] = useState(1);

    async function carregarPacientes() {
        const uc = new ListarPacientes();
        const lista = await uc.execute();

        setPacientes([...(lista || [])]);
    }

    useEffect(() => {
        carregarPacientes();
    }, []);

    async function inserirPaciente(dados: any) {

        try {
            const endereco = new Endereco(1, dados.endereco.logradouro, dados.endereco.numero, dados.endereco.bairro, dados.endereco.cidade, dados.endereco.estado);

            const uc = new InserirPaciente();

            await uc.execute(contadorId, dados.nome, dados.genero, dados.idade, dados.peso, dados.altura, 1, dados.documento.numeroDocumento, dados.documento.tipoDocumento, endereco);

            setContadorId(contadorId + 1);

            await carregarPacientes();

        } catch (error) {
            console.log(error);
            alert('Erro ao inserir um paciente!');
        }

    }

    async function removerPaciente(id: number) {

        const uc = new RemoverPaciente();

        await uc.execute(id);

        await carregarPacientes();
    }

    return (
        <div>

            <PacienteForm onSubmit={inserirPaciente} />

            <hr />

            <h2> Lista de Pacientes do Sistema: </h2>

            {pacientes.lenght === 0 && <p> Nenhum paciente foi encontrado no sistema</p>}

            {pacientes.map((p: any) => (
                <div key={p.id}>
                    <strong> ID: </strong> {p.id} - <strong> NOME: </strong> {p.nome} <br />

                    <button onClick={() => removerPaciente(p.id)}> Remover paciente </button>
                </div>
            ))}

        </div>
    );
}