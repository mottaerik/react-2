import { useRef, useState, useEffect } from "react";

function Tarefas() {
    const [listaTarefas, setListaTarefas] = useState([]);
    const [descricaoEditando, setDescricaoEditando] = useState('');
    const descricaoTarefaInputRef = useRef();

    function adicionarTarefa() {
        const novaTarefaDescricao = descricaoTarefaInputRef.current.value;

        setListaTarefas([
            ...listaTarefas,
            {
                descricao: novaTarefaDescricao,
                finalizado: false
            }
        ]);

        localStorage.setItem("Tarefa", JSON.stringify(setListaTarefas));

        descricaoTarefaInputRef.current.value = ''; // Limpa o input quando cadastra a tarefa
    }

    var arr = [];

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

    return (
        <div>
            <input type="text" ref={descricaoTarefaInputRef} />
            <br></br>
            <br></br>
            <button onClick={descricaoEditando ? salvarTarefaEditada : adicionarTarefa}>
                {descricaoEditando ? "Salvar" : "Cadastrar"}
            </button>
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
