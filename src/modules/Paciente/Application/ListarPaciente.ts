import { PacienteRepository } from "../Infrastructure/PacienteRepository";

export class ListarDocumentos{

    constructor(private repository = new PacienteRepository())
    {}

    async execute(){
        return this.repository.listarPacientes();
    }
}