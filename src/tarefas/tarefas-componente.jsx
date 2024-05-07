import { useRef, useState } from "react";

function Tarefas() {
    const [listaTarefas, setListaTarefas] = useState([]);
    const descricaoTarefaInputRef = useRef()

    function adicionarTarefa() {
        const novaTarefaDescricao = descricaoTarefaInputRef.current.value;

        console.log(descricaoTarefaInputRef.current.value)
        listaTarefas.push(
            {
                descricao: descricaoTarefaInputRef.current.value,
                finalizado: false
            }
        );

        descricaoTarefaInputRef.current.value = '' // Limpa o input quando cadastra a tarefa

        setListaTarefas(listaTarefas.slice());
        console.log('Cadastrado');
    }

    function atualizarTarefa(tarefaAtual) {
        tarefaAtual.finalizado = !tarefaAtual.finalizado;
        setListaTarefas(listaTarefas.slice());
    }

    function pegaEstilo(tarefaAtual) {
        if (tarefaAtual.finalizado) {
            return 'line-through';
        }
        return 'none';
    }

    return (
        <div>
            <input type="text" ref={descricaoTarefaInputRef}/>
            <br></br>
            <button onClick={adicionarTarefa}>Cadastrar</button>
            <br />
            <div>
                {
                    listaTarefas.map(tarefaAtual => {
                        return <div style={
                            {
                                margin: '10px',
                                color: 'white',
                                backgroundColor: 'aqua',
                                textDecoration: pegaEstilo(tarefaAtual)
                            }
                        } onClick={() => atualizarTarefa(tarefaAtual)}>{tarefaAtual.descricao}</div>
                    })
                }
            </div>
        </div>
    );
}
export default Tarefas;