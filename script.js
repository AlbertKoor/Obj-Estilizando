
  const tasks = [
    { title: "Comprar comida para o gato", type: "Urgente" },
    { title: "Consertar Computador", type: "Importante" },
    { title: "Beber água", type: "Normal" },
    { title: "Enviar relatório trimestral", type: "Importante" },
    { title: "Fazer exercícios físicos", type: "Normal" },
    { title: "Agendar consulta médica", type: "Urgente" },
    { title: "Ler pelo menos um capítulo de um livro", type: "Normal" },
    { title: "Limpar a despensa", type: "Importante" },
    { title: "Pagar a conta de energia", type: "Urgente" },
    { title: "Assistir a um documentário interessante", type: "Normal" },
  ];

  function createTaskItem(title, type) {
    const li = document.createElement('li');
    li.className = `task__item ${type.toLowerCase()}`;

    const div = document.createElement('div');
    div.className = 'task-info__container';

    const span = document.createElement('span');
    span.className = 'task-type';

    if (type.toLowerCase() === 'urgente') {
      span.classList.add('span-urgent');
    } else if (type.toLowerCase() === 'importante') {
      span.classList.add('span-important');
    } else if (type.toLowerCase() === 'normal') {
      span.classList.add('span-normal');
    }

    span.text = title;

    const p = document.createElement('p');
    p.textContent = title;

    const button = document.createElement('button');
    button.className = 'task__button--remove-task';
    button.innerHTML = '<img src="./assets/trash-icon.svg" alt="Lixo">';

    button.addEventListener('click', () => {
      const indexOf = tasks.findIndex((elem) => elem.title === title);
      if (indexOf !== -1) {
        tasks.splice(indexOf, 1);
        renderElements(tasks);
      }
    });


    /*// Exemplo bruto de como funciona o indexOf por baixo dos panos
    function indexOf(array, elemento) {
    for (let i = 0; i < array.length; i++) {
    if (array[i] === elemento) {
      return i; // Retorna a posição do elemento se for encontrado
    }
  }
  return -1; // Retorna -1 se o elemento não for encontrado
}*/



    div.appendChild(span);
    div.appendChild(p);
    li.appendChild(div);
    li.appendChild(button);

    return li;
  }

  function addTask(title, type) {
    tasks.push({ title, type });
    renderElements(tasks);
  }

  function renderElements(tasks) {
    const ulElement = document.querySelector('.tasks__list');
    ulElement.innerHTML = ''; 

    tasks.forEach(task => {
      const taskItem = createTaskItem(task.title, task.type);
      ulElement.appendChild(taskItem);
    });
  }

  const addButton = document.querySelector('.form__button--add-task');
  if (addButton) {
    addButton.addEventListener('click', (event) => {
      event.preventDefault();

      const inputTitle = document.querySelector('#input_title');
      const selectType = document.querySelector('.form__input--priority');

      const title = inputTitle.value.trim();
      const type = selectType.value.toLowerCase();

      if (title && type) {
        addTask(title, type);
        inputTitle.value = ''; 
        selectType.value = ''; 
      } else {
        console.warn('Preencha todos os campos.');
      }
    });
  } 
  renderElements(tasks);
