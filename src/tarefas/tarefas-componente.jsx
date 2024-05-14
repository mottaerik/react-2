import { useRef, useState, useEffect } from "react";

function Tarefas() {
    const [listaTarefas, setListaTarefas] = useState([]);
    const [descricaoEditando, setDescricaoEditando] = useState(null);
    const descricaoTarefaInputRef = useRef();
    
    useEffect(() => {
        const tarefasSalvas = JSON.parse(localStorage.getItem("tarefa")) || [];
        setListaTarefas(tarefasSalvas);
    }, []);

    function adicionarTarefa() {
        const novaTarefa = {
            descricao: descricaoTarefaInputRef.current.value,
            finalizado: false
        };
        setListaTarefas([...listaTarefas, novaTarefa]);
        localStorageCadastro([...listaTarefas, novaTarefa]);
        descricaoTarefaInputRef.current.value = "";
    }

    function atualizarTarefa(tarefaAtual) {
        const novasTarefas = listaTarefas.map(tarefa => {
            if (tarefa === tarefaAtual) {
                return { ...tarefa, finalizado: !tarefa.finalizado };
            }
            return tarefa;
        });
        setListaTarefas(novasTarefas);

    }

    function removerTarefa(tarefaParaRemover) {
        const novasTarefas = listaTarefas.filter(tarefa => tarefa !== tarefaParaRemover);
        setListaTarefas(novasTarefas);
    }

    function editarTarefa(tarefaParaEditar) {
        setDescricaoEditando(tarefaParaEditar.descricao);
        setListaTarefas(listaTarefas.filter(tarefa => tarefa !== tarefaParaEditar));
    }

    function salvarTarefaEditada() {
        setListaTarefas([
            ...listaTarefas,
            {
                descricao: descricaoEditando,
                finalizado: false
            } 
        ]);
        setDescricaoEditando('');
    }

    function localStorageCadastro(tarefas) {
        localStorage.setItem("tarefa", JSON.stringify(tarefas));
    }

    return (
        <div>
            <input type="text" ref={descricaoTarefaInputRef} />
            <br></br>
            <br></br>
            <button onClick={adicionarTarefa}>Cadastrar</button>
            <div>
                {listaTarefas.map(tarefaAtual => (
                    <div key={tarefaAtual.descricao} style={{

                        backgroundColor: 'black',
                        textDecoration: tarefaAtual.finalizado ? 'line-through' : 'none'
                    }}>
                        <span onClick={() => atualizarTarefa(tarefaAtual)}>{tarefaAtual.descricao}</span>
                        <br></br>
                        <button onClick={() => removerTarefa(tarefaAtual)}>Remover</button>
                        <button onClick={() => editarTarefa(tarefaAtual)}>Editar</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Tarefas;
