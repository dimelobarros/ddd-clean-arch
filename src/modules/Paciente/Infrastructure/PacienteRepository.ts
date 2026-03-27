import { Paciente } from "../Domain/Paciente";

export class PacienteRepository{

    private static pacientes: Paciente[] = [];


    // LISTAR PACIENTES:
    async listarPacientes(){
        return PacienteRepository.pacientes;
    }


    // INSERIR paciente:
    async inserirPaciente(paciente: Paciente){
        PacienteRepository.pacientes.push(paciente);
    }


    // BUSCAR POR ID:
    async buscarPacientePorId(idPaciente: number){
        return PacienteRepository.pacientes.find(pac => pac.id === idPaciente);
    }

    // REMOVER paciente:
    async removerPaciente(idPaciente: number){
        PacienteRepository.pacientes = PacienteRepository.pacientes.filter(pac => pac.id !== idPaciente);
    }

    // ATUALIZAR paciente:
    async atualizarPaciente(paciente: Paciente){

        // Buscando a posição em que o paciente solicitado para autualizar está dentro do array.
        const indice = PacienteRepository.pacientes.findIndex(pac => pac.id === paciente.id);

        if(indice !== -1){
            PacienteRepository.pacientes[indice] = paciente;
        } else{
            console.log('paciente não encontrado!');
        }
    }
}